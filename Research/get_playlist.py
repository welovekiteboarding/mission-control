#!/usr/bin/env python3
"""
Fetch the Net Ninja OpenAI Codex Tutorial playlist to get correct video IDs
"""

import subprocess
import json
import re

def get_playlist_videos(playlist_url):
    """Get all videos from a YouTube playlist"""
    try:
        cmd = [
            'yt-dlp',
            '--flat-playlist',
            '--print', 'json',
            playlist_url
        ]

        result = subprocess.run(cmd, capture_output=True, text=True)

        if result.returncode != 0:
            return {'error': f'yt-dlp failed: {result.stderr}'}

        # Parse all JSON lines (one per video)
        videos = []
        for line in result.stdout.strip().split('\n'):
            if line.strip():
                try:
                    video_info = json.loads(line)
                    videos.append({
                        'id': video_info.get('id', ''),
                        'title': video_info.get('title', ''),
                        'url': f"https://www.youtube.com/watch?v={video_info.get('id', '')}",
                        'duration': video_info.get('duration', 0),
                        'uploader': video_info.get('uploader', ''),
                        'playlist_index': video_info.get('playlist_index', 0)
                    })
                except json.JSONDecodeError:
                    continue

        return {'videos': videos}

    except Exception as e:
        import traceback
        return {'error': f'{str(e)}\n{traceback.format_exc()}'}

def main():
    # Net Ninja OpenAI Codex Tutorial playlist
    playlist_url = "https://www.youtube.com/playlist?list=PL4cUxeGkcC9iDBeA8IyR1IE1kl4w5IDEG"

    print(f"Fetching playlist: {playlist_url}\n")

    result = get_playlist_videos(playlist_url)

    if 'error' in result:
        print(f"❌ ERROR: {result['error']}")
        return

    videos = result['videos']
    print(f"✅ Found {len(videos)} videos in the playlist\n")

    # Print all videos
    print("="*80)
    print("Playlist Contents:")
    print("="*80)

    for i, video in enumerate(videos, 1):
        duration_str = f"{video['duration']}s" if video['duration'] else "N/A"
        print(f"{i}. {video['title']}")
        print(f"   URL: {video['url']}")
        print(f"   Duration: {duration_str}")
        print(f"   Video ID: {video['id']}")
        print()

    # Extract videos 5-8
    if len(videos) >= 8:
        target_videos = videos[4:8]  # 0-indexed, so 4-7 gives us videos 5-8

        print("="*80)
        print("Videos #5-8:")
        print("="*80)

        for i, video in enumerate(target_videos, start=5):
            print(f"\nVideo #{i}: {video['title']}")
            print(f"URL: {video['url']}")
            print(f"Video ID: {video['id']}")

        # Save to file
        output = {
            'playlist_url': playlist_url,
            'total_videos': len(videos),
            'videos_5_8': [
                {
                    'number': i + 5,
                    'title': video['title'],
                    'url': video['url'],
                    'video_id': video['id']
                }
                for i, video in enumerate(target_videos)
            ]
        }

        output_file = '/Users/welovekiteboarding/Documents/Development/openclaw/playlist_videos.json'
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(output, f, indent=2, ensure_ascii=False)

        print(f"\n\n✅ Saved to: {output_file}")
    else:
        print(f"\n⚠️  Playlist only has {len(videos)} videos, need at least 8")

if __name__ == "__main__":
    main()
