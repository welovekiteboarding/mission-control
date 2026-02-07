# cloud-agent-push-fails-with-missing-origin-remote

## Summary
Cloud tasks created PRs successfully, but **updating** those PRs failed because the cloud task repos had **no configured Git remote** (`git remote -v` returned no output). Adding `origin` manually works in the task, but push may still fail if credentials are not available. This behavior is inconsistent with the expected cloud workflow and should be treated as an environment issue or product bug rather than a user workflow requirement.

## Observed Symptoms
- Cloud tasks created PRs (PRs 1–5) successfully.
- Attempting to push updates from the same cloud tasks failed with:
  - `git push` → “No configured push destination”
  - `git remote -v` → no output
- Manually adding remote succeeded:
  - `git remote add origin https://github.com/welovekiteboarding/mission-control.git`
  - `git remote -v` then showed `origin` for fetch/push

## Environment Facts (from Codex settings)
- Repository: `welovekiteboarding/mission-control`
- Agent internet access: **On (unrestricted)**
- Cloud environment exists and is selected

## Why This Is Not Explained by Internet Access
Internet access is enabled in the environment, yet the repo clone still had **no remote**. That means this is **not** simply a network toggle issue.

## Impact
- PR creation can succeed, but PR **updates** from the same cloud task can fail.
- Follow‑up changes require either:
  - manual remote configuration inside the task, or
  - local updates and pushes from the desktop environment.

## Confirmed Workarounds
### Workaround A — Add remote in the cloud task
Run inside the cloud task:
```bash
git remote add origin https://github.com/welovekiteboarding/mission-control.git
git remote -v
git push -u origin HEAD
```
If `git push` fails due to auth, you must update locally.

### Workaround B — Update locally
1. Apply or re‑implement the fixes locally.
2. Run tests locally.
3. Push from the desktop repo (works; verified).

### Workaround C — Restart tasks in correct environment (still verify)
When starting cloud tasks:
1. Select the correct environment (`welovekiteboarding/mission-control`).
2. Immediately run `git remote -v`.
3. If no remote, apply Workaround A or switch to local updates.

## Recommended Workflow (Optimal)
### For new cloud tasks
1. Start task in correct cloud environment.
2. Preflight:
   - `git remote -v`
   - if empty, add origin (Workaround A).
3. Do work and **push updates** to the existing PR branch.

### If any push fails
1. Stop cloud updates.
2. Apply changes locally.
3. Run tests locally.
4. Push locally and update PR.

### For updating an existing PR from local
1. Apply cloud changes locally.
2. Check out the PR branch locally:
   - `git fetch origin pull/<PR#>/head:pr-<PR#>`
   - `git switch pr-<PR#>`
3. Commit and push to update the PR:
   - `git add -A`
   - `git commit -m "fix: ..."`
   - `git push -u origin pr-<PR#>`

## Notes on PRs
- Keep PRs **open** if you expect updates to the same branch.
- Closing or merging can cause update behavior to be inconsistent.

## Action Items
- If this persists, open a support report with:
  - environment screenshot (internet access enabled)
  - `git remote -v` output showing no remote
  - PR creation success vs update failure
