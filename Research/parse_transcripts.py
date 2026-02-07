#!/usr/bin/env python3
"""
Parse YouTube transcript JSON3 files and format with readable timestamps.
"""

import json
import sys

def format_timestamp(seconds):
    """Convert seconds to MM:SS.mmm format"""
    minutes = int(seconds // 60)
    secs = seconds % 60
    return f"{minutes:02d}:{secs:06.3f}"

def parse_json3_transcript(filepath):
    """Parse a YouTube JSON3 transcript file"""
    with open(filepath, 'r') as f:
        data = json.load(f)

    events = data.get('events', [])
    transcript_entries = []

    for event in events:
        segs = event.get('segs', [])
        if not segs:
            continue

        # Get start time
        t_start_ms = event.get('tStartMs', 0)
        t_start_sec = t_start_ms / 1000.0

        # Get duration (estimated from last segment)
        d_duration_ms = event.get('dDurationMs', 0)
        if d_duration_ms == 0:
            # Estimate duration based on segment length
            d_duration_ms = 3000  # Default 3 seconds
        t_end_sec = (t_start_ms + d_duration_ms) / 1000.0

        # Combine text from all segments
        text = ''.join(seg.get('utf8', '') for seg in segs)

        # Clean up text
        text = text.strip()
        if text:
            transcript_entries.append({
                'start': t_start_sec,
                'end': t_end_sec,
                'text': text
            })

    return transcript_entries

def format_transcript(entries):
    """Format transcript entries with timestamps"""
    output = []
    for entry in entries:
        start = format_timestamp(entry['start'])
        end = format_timestamp(entry['end'])
        output.append(f"[{start} --> {end}] {entry['text']}")
    return output

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python3 parse_transcripts.py <json3_file> <video_title>")
        sys.exit(1)

    json3_file = sys.argv[1]
    video_title = sys.argv[2]

    print("=" * 80)
    print(f"VIDEO: {video_title}")
    print("=" * 80)

    entries = parse_json3_transcript(json3_file)
    formatted = format_transcript(entries)

    for line in formatted:
        print(line)

    print(f"\nTotal entries: {len(formatted)}")
