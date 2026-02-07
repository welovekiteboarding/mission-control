#!/usr/bin/env python3
"""
Fetch transcript for video #7 with correct ID
"""

import subprocess
import os
import json
import re

def format_timestamp(seconds):
    """Convert seconds to [HH:MM:SS.mmm] format"""
    hours = int(seconds // 3600)
    minutes = int((seconds % 3600) // 60)
    secs = seconds % 60
    return f"[{hours:02d}:{minutes:02d}:{secs:06.3f}]"

def fetch_transcript_ytdlp(video_url, video_title):
    """Fetch transcript using yt-dlp's subtitle download"""
    try:
        # Create a temp directory
        temp_dir = f'/tmp/ytdlp_{video_title.replace(" ", "_")[:20]}'
        os.makedirs(temp_dir, exist_ok=True)

        # Download English subtitles
        cmd = [
            'yt-dlp',
            '--write-subs',
            '--write-auto-subs',
            '--sub-langs', 'en',
            '--skip-download',
            '--output', f'{temp_dir}/video',
            video_url
        ]

        result = subprocess.run(cmd, capture_output=True, text=True)

        if result.returncode != 0:
            return {'error': f'yt-dlp failed: {result.stderr}'}

        # Find the downloaded VTT file
        vtt_files = [f for f in os.listdir(temp_dir) if f.endswith('.vtt')]

        if not vtt_files:
            return {'error': 'No VTT files downloaded'}

        # Use the first VTT file
        vtt_file = os.path.join(temp_dir, vtt_files[0])

        with open(vtt_file, 'r', encoding='utf-8') as f:
            content = f.read()

        # Parse WebVTT format
        transcript_lines = []
        raw_segments = []

        # Split by double newlines to get blocks
        blocks = re.split(r'\n\n+', content.strip())

        for block in blocks:
            lines = block.strip().split('\n')
            if len(lines) < 2:
                continue

            # First line might be a timestamp identifier, look for the timestamp line
            timestamp_line = None
            text_start_idx = 0

            for i, line in enumerate(lines):
                if '-->' in line:
                    timestamp_line = line
                    text_start_idx = i + 1
                    break

            if not timestamp_line:
                continue

            # Parse timestamp like "00:00:00.000 --> 00:00:02.500"
            timestamp_match = re.search(r'(\d+):(\d+):(\d+)\.(\d+)\s*-->\s*(\d+):(\d+):(\d+)\.(\d+)', timestamp_line)

            if timestamp_match:
                start_h, start_m, start_s, start_ms = map(int, timestamp_match.groups()[:4])
                end_h, end_m, end_s, end_ms = map(int, timestamp_match.groups()[4:8])

                start_seconds = start_h * 3600 + start_m * 60 + start_s + start_ms / 1000
                end_seconds = end_h * 3600 + end_m * 60 + end_s + end_ms / 1000
                duration = end_seconds - start_seconds

                # Get the text (all lines after the timestamp)
                text = '\n'.join(lines[text_start_idx:])
                # Clean up VTT formatting
                text = re.sub(r'<[^>]+>', '', text)
                text = re.sub(r'\{[^}]+\}', '', text)
                text = re.sub(r'NOTE\s+[^\n]*', '', text)  # Remove NOTE lines
                text = text.strip()

                if text and not text.startswith('NOTE'):
                    timestamp = format_timestamp(start_seconds)
                    formatted_line = f"{timestamp} ({duration:.2f}s) {text}"
                    transcript_lines.append(formatted_line)

                    raw_segments.append({
                        'start': start_seconds,
                        'duration': duration,
                        'text': text
                    })

        # Clean up temp directory
        import shutil
        shutil.rmtree(temp_dir, ignore_errors=True)

        if not transcript_lines:
            return {'error': 'Failed to parse subtitle content'}

        return {
            'transcript': transcript_lines,
            'raw': raw_segments,
            'total_segments': len(transcript_lines)
        }

    except Exception as e:
        import traceback
        return {'error': f'{str(e)}\n{traceback.format_exc()}'}

def main():
    # Video #7 with CORRECT ID
    title = "Video #7: Codex IDE Extension"
    url = "https://www.youtube.com/watch?v=bZ-5CfD2LRU"

    print(f"\n{'='*80}")
    print(f"Fetching: {title}")
    print(f"URL: {url}")
    print(f"{'='*80}\n")

    result = fetch_transcript_ytdlp(url, title)

    if 'error' in result:
        print(f"❌ ERROR: {result['error']}")
    else:
        print(f"✅ SUCCESS: Fetched {result['total_segments']} transcript segments\n")

        # Print first few lines as preview
        print("Preview (first 10 segments):")
        for line in result['transcript'][:10]:
            print(f"  {line}")

        if len(result['transcript']) > 10:
            print(f"\n  ... and {len(result['transcript']) - 10} more segments")

        # Load existing results
        output_file = '/Users/welovekiteboarding/Documents/Development/openclaw/final_transcripts.json'
        with open(output_file, 'r', encoding='utf-8') as f:
            all_results = json.load(f)

        # Add video #7
        all_results[title] = {
            'url': url,
            'transcript': result['transcript'],
            'raw_segments': result['raw'],
            'total_segments': result['total_segments']
        }

        # Save updated results
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(all_results, f, indent=2, ensure_ascii=False)

        print(f"\n\n✅ Video #7 transcript added to: {output_file}")

        # Update readable text file
        text_file = '/Users/welovekiteboarding/Documents/Development/openclaw/transcripts_final.txt'
        with open(text_file, 'a', encoding='utf-8') as f:
            f.write(f"\n{'='*80}\n")
            f.write(f"{title}\n")
            f.write(f"URL: {url}\n")
            f.write(f"Total Segments: {result['total_segments']}\n")
            f.write(f"\nTRANSCRIPT:\n")
            f.write(f"{'-'*80}\n")
            for line in result['transcript']:
                f.write(f"{line}\n")
            f.write(f"\n")

        print(f"✅ Readable version updated: {text_file}")

if __name__ == "__main__":
    main()
