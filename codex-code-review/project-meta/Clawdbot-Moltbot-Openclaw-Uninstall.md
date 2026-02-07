# Clawdbot / Moltbot / OpenClaw Uninstall and Deletion Guide
Generated: 2026-02-01
Session ID (for resume): ab3dd4e9-2544-4e0d-93cb-6fa553d4d9da

This document consolidates:
- Official uninstall/delete instructions for Clawdbot and OpenClaw (the current name after Moltbot).
- Relevant community context from Reddit (non-authoritative, informational only).
- Local machine inventory of Clawdbot/OpenClaw-related files discovered on this system.
- A concrete removal plan tailored to the local findings.

Note: Official docs are authoritative for uninstall steps. Reddit is included only because it was requested; do not treat it as official guidance.

---

## Official uninstall: Clawdbot (docs.clawd.bot)

Official docs describe two uninstall paths: an easy path when the CLI is still installed, and a manual path when the service remains but the CLI is gone. The easy path recommends the built-in uninstaller and includes a non-interactive mode. The manual path lists service removal and cleanup steps.  citeturn0search1

### Easy path (CLI installed)

Recommended (built-in uninstaller):  citeturn0search1

```bash
clawdbot uninstall
```

Non-interactive (automation / npx):  citeturn0search1

```bash
clawdbot uninstall --all --yes --non-interactive
npx -y clawdbot uninstall --all --yes --non-interactive
```

Manual steps (same result):  citeturn0search1

```bash
# 1) Stop gateway service
clawdbot daemon stop

# 2) Uninstall gateway service
clawdbot daemon uninstall

# 3) Delete state + config
rm -rf "${CLAWDBOT_STATE_DIR:-$HOME/.clawdbot}"

# 4) Delete workspace (optional)
rm -rf ~/clawd

# 5) Remove CLI install (pick one)
npm rm -g clawdbot
pnpm remove -g clawdbot
bun remove -g clawdbot

# 6) Remove macOS app (if installed)
rm -rf /Applications/Clawdbot.app
```

Notes from docs: if you used profiles, repeat step 3 for each `~/.clawdbot-<profile>` directory; in remote mode, run steps 1-4 on the gateway host.  citeturn0search1

### Manual service removal (CLI not installed)

macOS launchd removal (default label `com.clawdbot.gateway`):  citeturn0search1

```bash
launchctl bootout gui/$UID/com.clawdbot.gateway
rm -f ~/Library/LaunchAgents/com.clawdbot.gateway.plist
```

Linux systemd user unit removal and Windows task removal are also documented in the same guide.  citeturn0search1

### CLI uninstall reference

The CLI uninstall reference confirms `clawdbot uninstall` plus `--all`, `--yes`, and `--dry-run`.  citeturn0search2

The CLI index also lists uninstall scopes such as `--service`, `--state`, `--workspace`, `--app`, and `--non-interactive` (requires `--yes` and explicit scopes or `--all`).  citeturn0search4

---

## Official uninstall: OpenClaw (docs.openclaw.ai)

OpenClaw is the current name after Moltbot. The OpenClaw uninstall guide mirrors Clawdbot’s structure (easy path + manual service removal) with updated command names and labels.  citeturn0search0

### Easy path (CLI installed)

Recommended (built-in uninstaller):  citeturn0search0

```bash
openclaw uninstall
```

Non-interactive (automation / npx):  citeturn0search0

```bash
openclaw uninstall --all --yes --non-interactive
npx -y openclaw uninstall --all --yes --non-interactive
```

Manual steps (same result):  citeturn0search0

```bash
# 1) Stop gateway service
openclaw gateway stop

# 2) Uninstall gateway service
openclaw gateway uninstall

# 3) Delete state + config
rm -rf "${OPENCLAW_STATE_DIR:-$HOME/.openclaw}"

# 4) Delete workspace (optional)
rm -rf ~/.openclaw/workspace

# 5) Remove CLI install (pick one)
npm rm -g openclaw
pnpm remove -g openclaw
bun remove -g openclaw

# 6) Remove macOS app (if installed)
rm -rf /Applications/OpenClaw.app
```

Notes from docs: if you used profiles, repeat step 3 for each `~/.openclaw-<profile>` directory; in remote mode, run steps 1-4 on the gateway host.  citeturn0search0

### Manual service removal (CLI not installed)

macOS launchd removal uses a Moltbot-era label and notes legacy OpenClaw labels may exist:  citeturn0search0

```bash
launchctl bootout gui/$UID/bot.molt.gateway
rm -f ~/Library/LaunchAgents/bot.molt.gateway.plist
```

The guide advises removing any legacy `com.openclaw.*` plists if present.  citeturn0search0

### CLI uninstall reference

The OpenClaw CLI uninstall reference mirrors Clawdbot’s flags, including `--all`, `--yes`, and `--dry-run`.  citeturn0search3

---

## Reddit context (non-authoritative)

These threads provide community context on the renames and migration chatter but are not official uninstall guidance:

- Rename thread: "ClawdBot -> MoltBot -> OpenClaw" discussion.  citeturn1reddit13
- Migration discussion from Clawdbot to OpenClaw, including suggestions to copy workspace files.  citeturn1reddit12

---

## Local machine inventory (found on this Mac)

Discovered files and directories associated with Clawdbot/OpenClaw on this machine:

### Services / launchd
- `/Users/welovekiteboarding/Library/LaunchAgents/com.clawdbot.gateway.plist`

Launchd plist details (local inspection):
- Label: `com.clawdbot.gateway`
- Node entry point: `/opt/homebrew/lib/node_modules/clawdbot/dist/entry.js`
- Logs:
  - `/Users/welovekiteboarding/.clawdbot/logs/gateway.log`
  - `/Users/welovekiteboarding/.clawdbot/logs/gateway.err.log`

### CLI / global install
- `/opt/homebrew/bin/clawdbot` (symlink)
- `/opt/homebrew/lib/node_modules/clawdbot/`

### State / config / workspace
- `/Users/welovekiteboarding/.clawdbot/`
- `/Users/welovekiteboarding/clawd` (workspace)

### Local repo / directories
- `/Users/welovekiteboarding/Documents/Development/openclaw` (currently empty directory)

### Notes and research artifacts (optional to delete)
- `/Users/welovekiteboarding/Documents/Obsidian Vault/Clawdbot/` (notes)
- `/Users/welovekiteboarding/Documents/Obsidian Vault/Development/Clawdbot/`
- `/Users/welovekiteboarding/.claude/MEMORY/RESEARCH/2026-01/*clawdbot*` (research notes)

### Not found (from searches)
- No `openclaw` or `moltbot` CLI binaries were detected in `/opt/homebrew/bin`.
- No `~/.openclaw` state directory found.

---

## Removal plan tailored to this machine

Use the official uninstall flow first, then verify and clean up leftovers.

### Phase 1: Official uninstall (preferred)

1) If the Clawdbot CLI still exists, run the built-in uninstaller (interactive or non-interactive).  citeturn0search1

```bash
clawdbot uninstall
# or non-interactive
clawdbot uninstall --all --yes --non-interactive
```

2) If you want a preview, use the dry run option:  citeturn0search2turn0search4

```bash
clawdbot uninstall --dry-run
```

### Phase 2: Manual service removal (if anything remains)

If the service is still running after uninstall, remove it manually on macOS:  citeturn0search1

```bash
launchctl bootout gui/$UID/com.clawdbot.gateway
rm -f ~/Library/LaunchAgents/com.clawdbot.gateway.plist
```

If you later find OpenClaw/Moltbot launchd items, use the OpenClaw guide label (`bot.molt.gateway`) and delete any legacy `com.openclaw.*` plists.  citeturn0search0

### Phase 3: Delete local state and workspace

Based on official docs and local findings:

```bash
rm -rf "${CLAWDBOT_STATE_DIR:-$HOME/.clawdbot}"
rm -rf ~/clawd
```

### Phase 4: Remove global CLI install

```bash
npm rm -g clawdbot
pnpm remove -g clawdbot
bun remove -g clawdbot
```

### Phase 5: Optional user-owned artifacts

Delete only if you want to remove personal notes/research:

```bash
rm -rf "/Users/welovekiteboarding/Documents/Obsidian Vault/Clawdbot"
rm -rf "/Users/welovekiteboarding/Documents/Obsidian Vault/Development/Clawdbot"
rm -rf "/Users/welovekiteboarding/.claude/MEMORY/RESEARCH/2026-01"/*clawdbot*
```

---

## Verification checklist

After cleanup, confirm:
- No launchd entries for `com.clawdbot.*`, `bot.molt.*`, or `com.openclaw.*`.  citeturn0search1turn0search0
- `clawdbot` and `openclaw` commands are not found.
- `~/.clawdbot` and `~/clawd` are gone.
- No OpenClaw state dir exists unless you intentionally keep it (`~/.openclaw`).  citeturn0search0

---

## Notes

- Clawdbot and OpenClaw docs both provide complete uninstall and manual service removal steps. Always prefer the built-in uninstaller when possible.  citeturn0search1turn0search0
- If you used profiles, remember to remove `~/.clawdbot-<profile>` or `~/.openclaw-<profile>` directories.  citeturn0search1turn0search0
