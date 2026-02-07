#!/usr/bin/env python3
"""
Fetch YouTube transcripts with timestamps for Net Ninja OpenAI Codex Tutorial videos
"""

from youtube_transcript_api import YouTubeTranscriptApi
from youtube_transcript_api.formatters import TextFormatter, SRTFormatter, JSONFormatter
import json
import sys

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

def fetch_transcript_with_timestamps(video_url):
    """Fetch transcript with timestamps for a YouTube video"""
    video_id = get_video_id(video_url)

    try:
        # Fetch transcript using the new API
        ytt_api = YouTubeTranscriptApi()
        transcript = ytt_api.fetch(video_id, languages=['en'], preserve_formatting=False)

        # Convert to list of dicts
        transcript_data = transcript.to_manually_created_timestamps()

        # Format with timestamps
        formatted_lines = []
        for entry in transcript_data:
            timestamp = format_timestamp(entry['start'])
            text = entry['text']
            duration = entry['duration']
            formatted_lines.append(f"{timestamp} ({duration:.2f}s) {text}")

        return {
            'video_id': video_id,
            'url': video_url,
            'transcript': formatted_lines,
            'raw': transcript_data
        }

    except Exception as e:
        return {
            'video_id': video_id,
            'url': video_url,
            'error': str(e),
            'transcript': None
        }

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

        result = fetch_transcript_with_timestamps(url)

        if result['transcript']:
            print(f"✅ SUCCESS: Fetched {len(result['transcript'])} transcript segments\n")

            # Print first few lines as preview
            print("Preview (first 5 segments):")
            for line in result['transcript'][:5]:
                print(f"  {line}")

            all_results[title] = result
        else:
            print(f"❌ ERROR: {result.get('error', 'Unknown error')}")
            all_results[title] = result

    # Save to JSON file
    output_file = '/Users/welovekiteboarding/Documents/Development/openclaw/transcripts_output.json'
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(all_results, f, indent=2, ensure_ascii=False)

    print(f"\n\n✅ All transcripts saved to: {output_file}")

    return all_results

if __name__ == "__main__":
    results = main()
