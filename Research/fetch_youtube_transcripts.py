#!/usr/bin/env python3
"""
Fetch YouTube transcripts using YouTube's internal transcript API
"""

import requests
import re
import json
import urllib.parse

def get_video_id(url):
    """Extract video ID from various YouTube URL formats"""
    if "watch?v=" in url:
        return url.split("watch?v=")[1].split("&")[0]
    elif "youtu.be/" in url:
        return url.split("youtu.be/")[1].split("?")[0]
    return url

def format_timestamp(seconds):
    """Convert seconds to [HH:MM:SS.mmm] format"""
    hours = int(seconds // 3600)
    minutes = int((seconds % 3600) // 60)
    secs = seconds % 60
    return f"[{hours:02d}:{minutes:02d}:{secs:06.3f}]"

def fetch_youtube_transcript(video_id):
    """
    Fetch transcript using YouTube's internal API
    """
    try:
        # First, get the video page to extract the caption track URL
        video_url = f"https://www.youtube.com/watch?v={video_id}"
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }

        response = requests.get(video_url, headers=headers)
        response.raise_for_status()

        # Extract the caption tracks using regex
        # YouTube stores caption tracks in the JavaScript variable 'ytInitialPlayerResponse'
        pattern = r'"captionTracks":\s*\[(.*?)\]'
        match = re.search(pattern, response.text)

        if not match:
            return {'error': 'No caption tracks found'}

        caption_data = match.group(1)

        # Extract the baseUrl for English captions
        # Look for English language code
        en_pattern = r'"lang":"en"[^}]*"baseUrl":"([^"]+)"'
        en_match = re.search(en_pattern, caption_data)

        if not en_match:
            # Try to find any caption track
            base_url_pattern = r'"baseUrl":"([^"]+)"'
            base_url_match = re.search(base_url_pattern, caption_data)
            if not base_url_match:
                return {'error': 'No caption base URL found'}
            base_url = base_url_match.group(1).replace('\\u0026', '&').replace('\\', '')
        else:
            base_url = en_match.group(1).replace('\\u0026', '&').replace('\\', '')

        # Fetch the transcript
        transcript_response = requests.get(base_url, headers=headers)
        transcript_response.raise_for_status()

        # Parse the XML transcript
        import xml.etree.ElementTree as ET
        root = ET.fromstring(transcript_response.content)

        transcript_lines = []
        raw_segments = []

        for text_elem in root.findall('.//text'):
            start = float(text_elem.get('start', 0))
            duration = float(text_elem.get('dur', 0))
            text = text_elem.text or ''

            # Clean up the text
            text = re.sub(r'<[^>]+>', '', text)  # Remove HTML tags
            text = text.replace('&amp;', '&').replace('&lt;', '<').replace('&gt;', '>')

            timestamp = format_timestamp(start)
            formatted_line = f"{timestamp} ({duration:.2f}s) {text}"
            transcript_lines.append(formatted_line)

            raw_segments.append({
                'start': start,
                'duration': duration,
                'text': text
            })

        return {
            'video_id': video_id,
            'transcript': transcript_lines,
            'raw': raw_segments,
            'total_segments': len(transcript_lines)
        }

    except Exception as e:
        return {'error': str(e)}

def main():
    # Video URLs for Net Ninja OpenAI Codex Tutorial videos 5-8
    videos = [
        ("Video #5: CLI Commands & Resuming Sessions", "https://www.youtube.com/watch?v=jAaF58zobxE"),
        ("Video #6: Using the AGENTS.md file", "https://www.youtube.com/watch?v=w3Oi4LzWkqg"),
        ("Video #7: Codex IDE Extension", "https://www.youtube.com/watch?v=6vF-YvE-qJQ"),
        ("Video #8: Context, Reasoning & TODO's", "https://www.youtube.com/watch?v=DwMEeqw_hvI"),
    ]

    all_results = {}

    for title, url in videos:
        print(f"\n{'='*80}")
        print(f"Fetching: {title}")
        print(f"URL: {url}")
        print(f"{'='*80}\n")

        video_id = get_video_id(url)
        result = fetch_youtube_transcript(video_id)

        if 'error' in result:
            print(f"❌ ERROR: {result['error']}")
            all_results[title] = {
                'url': url,
                'video_id': video_id,
                'error': result['error']
            }
        else:
            print(f"✅ SUCCESS: Fetched {result['total_segments']} transcript segments\n")

            # Print first few lines as preview
            print("Preview (first 10 segments):")
            for line in result['transcript'][:10]:
                print(f"  {line}")

            if len(result['transcript']) > 10:
                print(f"\n  ... and {len(result['transcript']) - 10} more segments")

            all_results[title] = {
                'url': url,
                'video_id': video_id,
                'transcript': result['transcript'],
                'raw_segments': result['raw'],
                'total_segments': result['total_segments']
            }

    # Save to JSON file
    output_file = '/Users/welovekiteboarding/Documents/Development/openclaw/transcripts_with_timestamps.json'
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(all_results, f, indent=2, ensure_ascii=False)

    print(f"\n\n✅ All transcripts saved to: {output_file}")

    return all_results

if __name__ == "__main__":
    results = main()
