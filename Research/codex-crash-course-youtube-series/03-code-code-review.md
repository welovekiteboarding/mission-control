# Video #3: Code Code Review

**Original Video:** [OpenAI Codex Tutorial #3 - Code Code Review](https://www.youtube.com/watch?v=t_NcBWq03YI)
**Duration:** 6 minutes 37 seconds
**Channel:** Net Ninja (1.82M subscribers)
**Video ID:** `t_NcBWq03YI`

---

## What You'll Learn

- How to enable Codex Review for specific repositories
- Two ways to trigger code reviews: automatic vs manual
- Understanding automatic reviews on all pull requests
- Manual review triggering with @codex review command
- How Codex provides code improvement suggestions
- Asking Codex to address its own feedback
- The self-improving AI workflow: create → review → fix → merge
- Integration with GitHub pull request workflow

---

## Fabric Pattern: Extract Alpha

*Key actionable insights and production patterns:*

* AI reviewing its own code is powerful and transformative
* Automated reviews save massive amounts of human time
* Trigger reviews with simple natural language commands
* The tool catches subtle edge case bugs humans miss
* AI can actually fix the bugs it finds automatically
* This creates a closed loop of improvement
* Humans shift to approving rather than editing
* Simple syntax commands control complex AI behavior
* The gap between writing and reviewing vanishes
* It suggests handling API failures automatically
* It enforces better file naming conventions
* The AI adds commits to fix issues
* This removes the drudgery of code review
* Settings give you granular repository control
* Manual triggers keep humans in the loop
* Automatic triggers handle the routine stuff well
* The AI acts like a tireless intern reviewer
* Code quality rises without human effort
* Reviews happen instantly upon pull request creation
* It turns suggestions into actual code
* The merge is the only human touch
* It prevents overwriting files via timestamps
* Self-reviewing AI is the future of coding
* Iteration becomes free with automated feedback loops

---

## Fabric Pattern: Create Video Chapters

**00:00:00 - INTRO TO CODEX**
- Recap: Codex Cloud runs tasks, makes code changes, opens PRs
- New topic: Codex reviewing its own PRs directly on GitHub
- Integration between Codex Cloud and GitHub
- Self-reviewing AI capability demonstration

**[00:00](https://youtu.be/t_NcBWq03YI?t=0)**

**00:00:25 - ENABLING CODE REVIEW**
- Navigate to Settings → Code Review option
- View repositories with Codex review enabled
- Click "Add Repository" button to enable
- Select repository from list (demo: Yumpair)
- Click "Add Repository" to confirm
- Codex review now enabled for selected repo

**[00:25](https://youtu.be/t_NcBWq03YI?t=25)**

**00:00:55 - AUTOMATIC REVIEW TRIGGER**
- Automatic review: Reviews every PR in enabled repositories
- Demo task: Add validation to ingredient form
- Task description: "Add validation to the ingredient form to ensure all fields are required"
- Submit task and wait for completion
- Codex adds validation and opens PR
- Automatic review triggers immediately

**[00:55](https://youtu.be/t_NcBWq03YI?t=55)**

**00:01:20 - VIEWING REVIEW RESULTS**
- View pull request after task completion
- Scroll down to see Codex's review
- Review comments visible in PR conversation
- Example suggestion: "Add error handling for edge cases where the API might fail"
- Codex catches potential issues automatically

**[01:20](https://youtu.be/t_NcBWq03YI?t=80)**

**00:01:45 - MANUAL REVIEW SETUP**
- Second way to trigger review: Manual comment
- Create new task for demo: Export ingredients to JSON file
- Task description: "Add a feature to export the ingredient list to a JSON file"
- Submit task and wait for PR creation
- This time: Manually trigger review instead of waiting

**[01:45](https://youtu.be/t_NcBWq03YI?t=105)**

**00:02:05 - TRIGGERING MANUAL REVIEW**
- Pull request is now open
- Leave a comment to trigger manual review
- Comment syntax: `@codex review`
- Post the comment
- Codex reviews the pull request on demand
- Wait for review completion

**[02:05](https://youtu.be/t_NcBWq03YI?t=125)**

**00:02:30 - ADDRESSING FEEDBACK**
- Review complete: View Codex's suggestions
- Example suggestion: "Add file naming with timestamp to avoid overwriting files"
- New feature: Ask Codex to address its own feedback
- Comment syntax: `@codex address this feedback`
- Post the comment
- Codex updates PR to implement suggestions

**[02:30](https://youtu.be/t_NcBWq03YI?t=150)**

**00:02:45 - IMPLEMENTING CHANGES**
- Wait for Codex to update the pull request
- Update complete: New commit added
- Click on commit to view changes
- See the specific improvements made
- Demo: Timestamp added to filename
- Before: `ingredients.json`
- After: `ingredients_[timestamp].json`
- Prevents file overwriting issues

**[02:45](https://youtu.be/t_NcBWq03YI?t=165)**

**00:03:00 - MERGING THE PR**
- Review all changes manually
- Verify improvements are correct
- If satisfied: Merge the pull request
- Scroll down and click "Merge pull request"
- Confirm merge
- Changes integrated into main branch
- Workflow complete

**[03:00](https://youtu.be/t_NcBWq03YI?t=180)**

**00:03:15 - COURSE PROMOTION**
- Codex review feature demonstrated
- Self-improving AI workflow shown
- Course availability: $3 buy or $9/month Pro
- First month half price with promo code
- Link in description

**[03:15](https://youtu.be/t_NcBWq03YI?t=195)**

---

## Fabric Pattern: Extract Wisdom

**Core Wisdom and Key Insights:**

### The Self-Reviewing AI Paradigm

Codex Review represents a fundamental shift in AI-assisted development:

**Traditional Workflow:**
```
Human writes code → Human reviews → Human fixes issues → Human merges
```

**Codex Workflow:**
```
Human asks AI → AI writes code → AI reviews code → AI fixes issues → Human merges
```

This is not automation - it's **autonomous development with human oversight**.

### The Two Trigger Modes

**Automatic Review:**
- Enabled per repository in settings
- Triggers on every PR automatically
- No human intervention needed
- Consistent quality enforcement
- Set it and forget it

**Manual Review:**
- Triggered via `@codex review` comment
- Human decides when review is needed
- On-demand quality checks
- Flexible workflow control
- Keeps human in the loop

Both modes serve different use cases:
- Automatic: Ongoing quality standards
- Manual: Specific concerns or second opinions

### The Closed-Loop Improvement

The most powerful feature is the feedback loop:

1. **AI Creates** → Writes initial code
2. **AI Reviews** → Finds issues in own code
3. **AI Fixes** → Addresses the issues found
4. **Human Approves** → Final quality gate

This loop means:
- AI improves its own output
- Iteration becomes essentially free
- Quality rises without human effort
- Human becomes approver, not editor

### The Natural Language Interface

Controlling AI review through comments is elegant:

```
@codex review                    # Trigger review
@codex address this feedback    # Fix the issues
```

This natural language interface means:
- No special syntax to learn
- Intuitive for all developers
- Works within existing PR workflow
- Feels like talking to a colleague

### The Quality Suggestions

Codex catches real issues:

**Example 1: API Error Handling**
- Suggestion: Add error handling for API failures
- Edge case: What if the API is down?
- Impact: Prevents app crashes
- Category: Resilience

**Example 2: File Naming**
- Suggestion: Add timestamp to filename
- Problem: `ingredients.json` overwrites previous export
- Solution: `ingredients_[timestamp].json`
- Impact: Prevents data loss
- Category: User Experience

These aren't nitpicks - they're real improvements.

### The Commit-Based Fix Process

When Codex addresses feedback:

**Process:**
1. Creates new commit (not amendment)
2. Adds descriptive commit message
3. Updates PR with changes
4. Maintains clean git history

**Benefits:**
- Transparent what was fixed
- Clean git history
- Easy to review changes
- Can revert specific fixes

### The Human Role Shift

With AI review, human role changes:

**From:**
- Writing initial code
- Finding bugs
- Fixing issues
- Reviewing everything

**To:**
- Defining requirements
- Reviewing AI output
- Approving changes
- Handling edge cases

This is **elevation**, not replacement. Humans focus on high-value tasks.

### The Integration with GitHub

Codex Review integrates seamlessly:

**Native GitHub Features Used:**
- Pull request comments
- Review comments
- Commits
- Merge buttons

**No New UI:**
- Works in GitHub interface
- No separate platform needed
- Developers stay in familiar environment
- Reduces context switching

### The Time Savings

Traditional code review is time-consuming:

**Human Review Process:**
- Open PR
- Read code
- Find issues
- Write comments
- Wait for fixes
- Re-review
- Merge

**AI Review Process:**
- Open PR
- AI reviews automatically
- AI fixes issues
- Human reviews
- Merge

The time savings come from:
- Instant review (no waiting)
- Automated fixes (no back-and-forth)
- Consistent quality (no fatigue)

### The Quality Consistency

AI review doesn't get tired:

**Human Review:**
- First PR: Thorough review
- Tenth PR: Still thorough
- Fiftieth PR: Getting tired
- Hundredth PR: Rushing through

**AI Review:**
- First PR: Thorough review
- Tenth PR: Thorough review
- Fiftieth PR: Thorough review
- Hundredth PR: Thorough review

Consistent quality regardless of volume.

### The Edge Case Detection

AI catches issues humans miss:

**Why?**
- AI doesn't make assumptions
- AI checks all paths
- AI considers all scenarios
- AI doesn't get distracted

**Example:**
- Human: "API call works, done"
- AI: "What if API fails? Need error handling"

This paranoia is valuable in production code.

### The Learning Opportunity

Reviewing AI suggestions teaches developers:

**From Suggestions:**
- Best practices
- Edge cases to consider
- Security implications
- Performance optimizations
- Code patterns

**Over Time:**
- Developers write better initial code
- Fewer issues to fix
- Higher baseline quality
- Collective improvement

### The Safety Net

Even with AI review, humans maintain control:

**Human Always Can:**
- Review suggestions
- Reject changes
- Modify fixes
- Merge decision
- Override AI

**AI Cannot:**
- Merge to main directly
- Force changes through
- Bypass human review
- Access protected branches

Human remains the final authority.

### The Scalability Question

AI review scales infinitely:

**Human Review:**
- 10 PRs/day = Manageable
- 50 PRs/day = Overwhelming
- 100 PRs/day = Impossible

**AI Review:**
- 10 PRs/day = Thorough
- 50 PRs/day = Thorough
- 100 PRs/day = Thorough
- 1000 PRs/day = Thorough

This enables larger teams and faster shipping.

### The Cost-Benefit Analysis

**Cost:**
- Enable review (one-time setup)
- Review suggestions (minimal time)
- Merge PR (standard process)

**Benefits:**
- Instant reviews
- Automated fixes
- Consistent quality
- Edge case detection
- Time savings
- Scalability
- Learning opportunity

The ROI is overwhelmingly positive.

### The Future Implications

This feature points to the future:

**Current State:**
- AI writes code
- AI reviews code
- AI fixes issues
- Human approves

**Near Future:**
- More sophisticated reviews
- Security analysis
- Performance optimization
- Test generation
- Documentation

**Long Term:**
- Autonomous feature development
- Self-maintaining codebases
- Self-optimizing systems
- Minimal human intervention

### The Team Workflow Impact

AI review changes team dynamics:

**Before:**
- Senior dev reviews junior dev code
- Bottleneck on senior dev time
- Junior dev waits for feedback
- Slower iteration cycles

**After:**
- AI reviews all code immediately
- Senior dev reviews AI feedback
- Junior dev gets instant feedback
- Faster iteration cycles
- Senior dev focuses on architecture

### The Onboarding Value

New team members benefit:

**Traditional Onboarding:**
- Write code
- Wait for review
- Get feedback
- Learn patterns
- Repeat

**AI-Assisted Onboarding:**
- Write code
- Get instant AI review
- Learn from suggestions
- Internalize patterns
- Improve faster

Accelerated learning curve for new developers.

### The Codebase Evolution

Over time, codebases improve:

**Cycle:**
1. AI catches issues
2. Developers learn from suggestions
3. Developers write better code
4. Fewer issues to catch
5. Higher baseline quality

**Result:**
- Rising quality floor
- Consistent patterns
- Fewer bugs
- Easier maintenance

### The Complementary Nature

AI review complements human review:

**AI Strengths:**
- Consistency
- Speed
- Edge cases
- Pattern recognition
- Unlimited attention

**Human Strengths:**
- Context understanding
- Business logic
- User experience
- Strategic decisions
- Creativity

Together, they're better than either alone.

---

## Detailed Workflow Guide

### Setup: Enable Codex Review

**Step 1: Access Settings**
1. Go to Codex Cloud
2. Click "Settings" link
3. Select "Code Review" option

**Step 2: Add Repository**
1. Click "Add Repository" button
2. Select repository from list
3. Click "Add Repository" to confirm

**Step 3: Verification**
- Repository appears in enabled list
- All PRs will now be reviewed automatically

### Automatic Review Workflow

**How It Works:**
1. Developer opens PR (or AI creates PR)
2. Codex automatically reviews
3. Review comments appear in PR
4. Developer reviews suggestions
5. Merge if satisfied

**When to Use:**
- Ongoing development
- Continuous integration
- Quality enforcement
- Large teams

### Manual Review Workflow

**How It Works:**
1. Open pull request
2. Add comment: `@codex review`
3. Wait for review completion
4. Review suggestions
5. Decide on next steps

**When to Use:**
- Second opinion needed
- Specific concerns
- After manual changes
- Quality gates

### Addressing Feedback Workflow

**How It Works:**
1. Review Codex suggestions
2. Add comment: `@codex address this feedback`
3. Wait for updates
4. Review new commit
5. Merge if satisfied

**What Happens:**
- Codex creates new commit
- Implements suggested fixes
- Updates PR
- Maintains clean history

---

## Command Reference

### Review Commands

```bash
@codex review                    # Trigger manual review
@codex address this feedback    # Fix the issues found
```

### Where to Use
- Pull request comments
- PR conversation thread
- Any comment section in PR

---

## Best Practices

### DO ✅
- Enable Codex Review for all repositories
- Review AI suggestions before merging
- Ask AI to address its own feedback
- Use manual review for specific concerns
- Test changes after merging
- Use automatic review for ongoing quality
- Keep human as final approver
- Learn from AI suggestions

### DON'T ❌
- Merge without reviewing suggestions
- Assume AI is always correct
- Skip testing after AI fixes
- Enable review without understanding workflow
- Treat AI as replacement for human review
- Ignore edge cases AI finds
- Blindly accept all suggestions

---

## Common Patterns

### Quality Enforcement
1. Enable automatic review
2. Let AI catch issues
3. Review suggestions
4. Merge improvements
5. Iterate

### Edge Case Handling
1. Create feature
2. AI reviews
3. AI suggests edge cases
4. Ask AI to address
5. Merge robust code

### Learning Pattern
1. Write code
2. AI reviews
3. Read suggestions
4. Learn patterns
5. Apply next time

---

## Production Considerations

### Before Production Use
- Test on non-critical repositories first
- Establish review guidelines
- Define what suggestions to accept
- Train team on workflow
- Monitor quality improvements

### Team Adoption
- Start with automatic review
- Add manual review as needed
- Review AI feedback in team meetings
- Share successful patterns
- Document learnings

---

## Integration Notes

### GitHub Integration
- Native GitHub PR workflow
- No external tools needed
- Works with branch protection rules
- Respects repository settings

### Settings Management
- Per-repository enablement
- Granular control
- Easy to toggle on/off
- Settings persist

---

*Generated: February 3, 2026*
*Source: Net Ninja OpenAI Codex Tutorial Series*
*Video ID: t_NcBWq03YI*
