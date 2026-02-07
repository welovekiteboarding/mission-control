#!/usr/bin/env python3
"""
Fetch YouTube transcripts using yt-dlp with CORRECT video IDs
"""

import subprocess
import json
import re
import requests

def format_timestamp(seconds):
    """Convert seconds to [HH:MM:SS.mmm] format"""
    hours = int(seconds // 3600)
    minutes = int((seconds % 3600) // 60)
    secs = seconds % 60
    return f"[{hours:02d}:{minutes:02d}:{secs:06.3f}]"

def fetch_transcript_with_ytdlp(video_url):
    """Fetch transcript using yt-dlp"""
    try:
        # Run yt-dlp to get transcript info
        cmd = [
            'yt-dlp',
            '--write-info-json',
            '--skip-download',
            '--print', 'json',
            video_url
        ]

        result = subprocess.run(cmd, capture_output=True, text=True)

        if result.returncode != 0:
            return {'error': f'yt-dlp failed: {result.stderr}'}

        # Parse the JSON output
        if not result.stdout.strip():
            return {'error': 'No output from yt-dlp'}

        # Get the last non-empty line which should be the JSON
        lines = [l for l in result.stdout.strip().split('\n') if l.strip()]
        if not lines:
            return {'error': 'No valid JSON in output'}

        try:
            info = json.loads(lines[-1])
        except json.JSONDecodeError as e:
            return {'error': f'Failed to parse JSON: {e}\nOutput was: {lines[-1][:200]}'}

        # Check if subtitles are available
        subtitles = None
        if 'subtitles' in info and info['subtitles']:
            subtitles = info['subtitles']
        elif 'automatic_captions' in info and info['automatic_captions']:
            subtitles = info['automatic_captions']

        if not subtitles:
            return {'error': 'No subtitles or automatic captions available'}

        # Try to get English subtitles
        subtitle_lang = None
        for lang in ['en', 'en-US', 'en-GB']:
            if lang in subtitles:
                subtitle_lang = lang
                break

        if not subtitle_lang and subtitles:
            # Use the first available language
            subtitle_lang = list(subtitles.keys())[0]

        if not subtitle_lang:
            return {'error': 'No suitable subtitle language found'}

        # Get the subtitle URL
        subtitle_data = subtitles[subtitle_lang]
        if isinstance(subtitle_data, list) and len(subtitle_data) > 0:
            subtitle_url = subtitle_data[0].get('url')
        elif isinstance(subtitle_data, dict):
            subtitle_url = subtitle_data.get('url')
        else:
            return {'error': f'Unexpected subtitle format: {type(subtitle_data)}'}

        if not subtitle_url:
            return {'error': 'No subtitle URL found'}

        # Download the subtitle content
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
        subtitle_response = requests.get(subtitle_url, headers=headers)
        subtitle_response.raise_for_status()

        # Parse the subtitle content (usually in SRV or VTT format)
        content = subtitle_response.text

        # Parse WebVTT format
        transcript_lines = []
        raw_segments = []

        # Split by double newlines to get blocks
        blocks = re.split(r'\n\n+', content.strip())

        for block in blocks:
            lines = block.strip().split('\n')
            if len(lines) < 2:
                continue

            # First line is usually the timestamp
            timestamp_line = lines[0]
            # Parse timestamp like "00:00:00.000 --> 00:00:02.500"
            timestamp_match = re.search(r'(\d+):(\d+):(\d+)\.(\d+)\s*-->\s*(\d+):(\d+):(\d+)\.(\d+)', timestamp_line)

            if timestamp_match:
                start_h, start_m, start_s, start_ms = map(int, timestamp_match.groups()[:4])
                end_h, end_m, end_s, end_ms = map(int, timestamp_match.groups()[4:8])

                start_seconds = start_h * 3600 + start_m * 60 + start_s + start_ms / 1000
                end_seconds = end_h * 3600 + end_m * 60 + end_s + end_ms / 1000
                duration = end_seconds - start_seconds

                # Get the text (all lines after the timestamp)
                text = '\n'.join(lines[1:])
                # Clean up VTT formatting
                text = re.sub(r'<[^>]+>', '', text)
                text = re.sub(r'\{[^}]+\}', '', text)
                text = text.strip()

                if text:
                    timestamp = format_timestamp(start_seconds)
                    formatted_line = f"{timestamp} ({duration:.2f}s) {text}"
                    transcript_lines.append(formatted_line)

                    raw_segments.append({
                        'start': start_seconds,
                        'duration': duration,
                        'text': text
                    })

        if not transcript_lines:
            return {'error': 'Failed to parse subtitle content'}

        return {
            'video_id': info.get('id', ''),
            'title': info.get('title', ''),
            'channel': info.get('channel', ''),
            'transcript': transcript_lines,
            'raw': raw_segments,
            'total_segments': len(transcript_lines)
        }

    except Exception as e:
        import traceback
        return {'error': f'{str(e)}\n{traceback.format_exc()}'}

def main():
    # CORRECT Video URLs for Net Ninja OpenAI Codex Tutorial videos 5-8
    videos = [
        ("Video #5: CLI Commands & Resuming Sessions", "https://www.youtube.com/watch?v=htNz7uazonY"),
        ("Video #6: Using the AGENTS.md file", "https://www.youtube.com/watch?v=NlNuoH5PPl4"),
        ("Video #7: Codex IDE Extension", "https://www.youtube.com/watch?v=6vF-YvE-qJQ"),  # Original ID
        ("Video #8: Context, Reasoning & TODO's", "https://www.youtube.com/watch?v=kbv6Rn7lHkI"),
    ]

    all_results = {}

    for title, url in videos:
        print(f"\n{'='*80}")
        print(f"Fetching: {title}")
        print(f"URL: {url}")
        print(f"{'='*80}\n")

        result = fetch_transcript_with_ytdlp(url)

        if 'error' in result:
            print(f"❌ ERROR: {result['error']}")
            all_results[title] = {
                'url': url,
                'error': result['error']
            }
        else:
            print(f"✅ SUCCESS: Fetched {result['total_segments']} transcript segments")
            print(f"   Title: {result.get('title', 'N/A')}")
            print(f"   Channel: {result.get('channel', 'N/A')}")
            print(f"   Video ID: {result.get('video_id', 'N/A')}\n")

            # Print first few lines as preview
            print("Preview (first 10 segments):")
            for line in result['transcript'][:10]:
                print(f"  {line}")

            if len(result['transcript']) > 10:
                print(f"\n  ... and {len(result['transcript']) - 10} more segments")

            all_results[title] = {
                'url': url,
                'video_id': result.get('video_id', ''),
                'title': result.get('title', ''),
                'channel': result.get('channel', ''),
                'transcript': result['transcript'],
                'raw_segments': result['raw'],
                'total_segments': result['total_segments']
            }

    # Save to JSON file
    output_file = '/Users/welovekiteboarding/Documents/Development/openclaw/correct_transcripts.json'
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(all_results, f, indent=2, ensure_ascii=False)

    print(f"\n\n✅ All transcripts saved to: {output_file}")

    # Also create a readable text file
    text_file = '/Users/welovekiteboarding/Documents/Development/openclaw/transcripts_readable.txt'
    with open(text_file, 'w', encoding='utf-8') as f:
        for title, data in all_results.items():
            f.write(f"\n{'='*80}\n")
            f.write(f"{title}\n")
            f.write(f"URL: {data['url']}\n")
            if 'error' in data:
                f.write(f"ERROR: {data['error']}\n")
            else:
                f.write(f"Title: {data.get('title', 'N/A')}\n")
                f.write(f"Channel: {data.get('channel', 'N/A')}\n")
                f.write(f"Total Segments: {data['total_segments']}\n")
                f.write(f"\nTRANSCRIPT:\n")
                f.write(f"{'-'*80}\n")
                for line in data['transcript']:
                    f.write(f"{line}\n")
            f.write(f"\n")

    print(f"✅ Readable version saved to: {text_file}")

    return all_results

if __name__ == "__main__":
    results = main()
