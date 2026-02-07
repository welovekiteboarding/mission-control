# Video #2: Running Cloud Tasks

**Original Video:** [OpenAI Codex Tutorial #2 - Running Cloud Tasks](https://www.youtube.com/watch?v=aPXvW7uxQio)
**Duration:** 6 minutes 43 seconds
**Channel:** Net Ninja (1.82M subscribers)
**Video ID:** `aPXvW7uxQio`

---

## What You'll Learn

- The two modes in Codex Cloud: "Ask" vs "Code" tabs
- How to use Ask mode to analyze codebases without making changes
- How to use Code mode to assign coding tasks that create pull requests
- Understanding Codex's analysis process through real-time logs
- The complete workflow: task → remote container → pull request → review → merge
- Testing changes locally by fetching remote branches
- Proper git workflow integration with Codex tasks
- Archiving completed tasks to keep dashboard clean

---

## Fabric Pattern: Extract Alpha

*Key actionable insights and production-ready patterns:*

* Separate reading and writing modes for safety
* Use Ask to instantly summarize unknown codebases
* AI infers tech stack from file structure automatically
* Code mode creates pull requests automatically
* Never let AI edit the main branch directly
* Treat AI output like a junior developer - review everything
* Always review the diff before merging
* Fetch and test the branch locally first before merging
* Standard git workflow applies to AI branches
* AI updates state management logic without explicit prompts
* TypeScript types get updated automatically without prompting
* AI matches existing CSS frameworks automatically for consistency
* View logs to see how AI reasons through problems
* AI handles branch creation and naming conventions
* AI installs new dependencies if needed during task execution
* AI provides summaries of the changes made in pull requests
* Merge only after manual verification works locally
* Archive tasks to keep the dashboard clean
* AI reads multiple files to understand full context
* Start with questions before assigning code tasks
* Ask tab is safe for understanding code without risk
* Turn natural language requests into code PRs
* Bridges the gap between chat interface and git workflow
* Human in the loop is still mandatory for quality

---

## Fabric Pattern: Create Video Chapters

**00:00:00 - App Overview & Goals**
- Current state of Yumpair Next.js application
- Simple form with ingredient input and submit button
- Ingredients stored in list (no database persistence)
- Goal: Add description field and tags field to form
- Current functionality: Add ingredient → display in list

**[00:00](https://youtu.be/aPXvW7uxQio?t=0)**

**00:00:35 - Ask vs Code Tabs**
- Two options when clicking "New Task" button
- Ask tab (default): Ask questions about codebase
- Code tab: Assign coding tasks for modifications
- Fundamental distinction: Reading vs Writing
- Ask mode: No code changes, safe exploration
- Code mode: Makes changes, creates pull requests

**[00:35](https://youtu.be/aPXvW7uxQio?t=35)**

**00:01:10 - Using Ask Feature**
- Example questions: Project summary, tech stack, component explanations
- Ask mode only reads code, provides information
- Safe to use without worrying about modifications
- Demo: Ask for project summary
- Codex analyzes code and provides comprehensive overview

**[01:10](https://youtu.be/aPXvW7uxQio?t=70)**

**00:01:50 - Using Code Feature**
- Switch to Code tab for actual modifications
- Assign coding tasks for Codex to work on
- Code changes will be made
- Pull request will be created
- Demo request: Add description textarea and tags input field

**[01:50](https://youtu.be/aPXvW7uxQio?t=110)**

**00:02:25 - Reviewing Pull Request**
- Codex task status shows "running" during execution
- Click "View Details" to see real-time logs
- Log shows: Analyzing codebase, reading files, planning changes
- Creating branches, creating pull requests
- Making code changes, installing dependencies
- Task completion status changes to "completed"
- Click "View Pull Request" to see changes on GitHub

**[02:25](https://youtu.be/aPXvW7uxQio?t=145)**

**00:03:00 - Testing Locally**
- Review code diff on GitHub before merging
- Codex provides summary of changes made
- Recommendation: Test locally before merging
- Git workflow: `git fetch` to get remote branches
- `git checkout [branch-name]` to switch to Codex branch
- Branch naming: `codex/[ID]` format
- `npm install` to ensure dependencies
- `npm run dev` to start local dev server
- Test changes in browser (localhost:3000)

**[03:00](https://youtu.be/aPXvW7uxQio?t=180)**

**00:03:40 - Merging Changes**
- Demo test: Add ingredient with description and tags
- Verify functionality works as expected
- If satisfied: Merge pull request on GitHub
- Click "Merge pull request" and confirm
- Switch back to main locally: `git checkout main`
- Pull latest changes: `git pull`
- Local main branch now up to date

**[03:40](https://youtu.be/aPXvW7uxQio?t=220)**

**00:04:00 - Course Promotion**
- Archive completed task in Codex Cloud
- Click three dots → Select archive
- Task removed from active tasks list
- Basic workflow summary: Ask/Assign → Review → Test → Merge → Archive
- Course availability: $3 buy or $9/month Pro subscription
- First month half price with promo code

**[04:00](https://youtu.be/aPXvW7uxQio?t=240)**

---

## Fabric Pattern: Extract Wisdom

**Core Wisdom and Key Insights:**

### The Dual-Mode Safety Architecture

Codex Cloud implements a critical safety feature through its two-tab design:

**Ask Mode (Read-Only)**
- Safe exploration of codebase without risk
- Get summaries, tech stack identification, component explanations
- AI analyzes entire codebase holistically
- Zero modification risk
- Perfect for onboarding to new projects

**Code Mode (Write-Enabled)**
- Actual code modifications
- Pull request workflow ensures review
- Never touches main branch directly
- Human remains in control through merge decision

This separation mirrors the read/write distinction in programming - a fundamental safety pattern.

### The Pull Request as Safety Net

The PR workflow is not administrative overhead - it's the primary safety mechanism:

1. **Codex creates branch** - Isolates changes from main
2. **Codex implements changes** - Works in isolation
3. **PR created** - Human reviews before integration
4. **Local testing** - Verify functionality in real environment
5. **Merge decision** - Human decides if changes are good
6. **Archive task** - Clean workspace for next task

This workflow ensures AI coding assistants enhance rather than replace human judgment.

### The Holistic Codebase Understanding

Codex demonstrates remarkable ability to understand entire projects:

**Tech Stack Inference**
- Automatically identifies Next.js, React, Tailwind CSS
- No manual configuration required
- Reads package.json, imports, file structure

**Component Relationships**
- Identifies main component (Ingredient Form)
- Understands state management flow
- Recognizes lack of database persistence

**Contextual Modifications**
- Updates TypeScript types when adding fields
- Maintains existing CSS framework consistency
- Updates state management logic appropriately
- Installs dependencies if needed

This holistic understanding prevents the "change one thing, break another" problem.

### The Transparency Through Logging

The "View Details" logs reveal AI reasoning process:

```
1. Analyzing codebase structure
2. Reading various files to understand project
3. Planning the changes
4. Creating new branches
5. Creating pull requests
6. Making the code changes
7. Installing dependencies if needed
8. Completing the task
```

This transparency is crucial for:
- Debugging when AI makes mistakes
- Understanding AI's interpretation of requests
- Learning from AI's approach
- Building trust in AI assistance

### The Junior Developer Mindset

Treat Codex like a junior developer:

**Good Practices:**
- Review all code diffs before merging
- Test functionality locally before integration
- Ask questions before assigning tasks
- Provide clear, detailed requirements
- Check the work, not just the summary

**Reality Check:**
- AI can make mistakes
- AI might misunderstand requirements
- AI doesn't know your full context
- AI needs human guidance and oversight

This mindset prevents over-reliance on AI while leveraging its capabilities.

### The Git Workflow Integration

Codex doesn't replace git - it integrates with existing workflows:

**Standard Commands Apply:**
```bash
git fetch                    # Get remote branches
git checkout codex/[id]      # Switch to AI branch
npm install                  # Install dependencies
npm run dev                  # Test locally
git checkout main            # Return to main
git pull                     # Update main
```

**Branch Naming Convention:**
- Format: `codex/[ID]`
- Automatic and descriptive
- Easy to identify AI-generated branches

This integration means AI becomes part of existing tooling, not a separate system.

### The Test-Local-First Philosophy

The video emphasizes local testing before merging:

**Why This Matters:**
- AI doesn't run your app
- AI can't verify user experience
- AI might miss edge cases
- You know your requirements better

**Testing Process:**
1. Checkout the branch
2. Install dependencies
3. Run dev server
4. Test the actual functionality
5. Verify in browser
6. Only then merge

This prevents "it worked in the PR but not in production" issues.

### The Natural Language to Code Bridge

Codex transforms natural language directly into code changes:

**Example Request:**
"Add a description textarea and a tags input field to the ingredient form."

**AI Execution:**
- Adds description textarea component
- Adds tags input field
- Updates component state
- Updates TypeScript types
- Applies Tailwind CSS styling
- Creates PR with summary

This bridges the gap between what you want and what you get.

### The Dependency Management

Codex handles dependencies automatically:

**If Needed:**
- Installs new packages
- Updates package.json
- Runs npm install
- Ensures everything works

**No Manual Intervention:**
- AI determines what's needed
- AI adds dependencies
- AI installs packages
- Everything just works

This reduces the "forgot to install dependency" errors.

### The State Management Intelligence

Adding form fields requires state updates - Codex handles this:

**Automatic Updates:**
- Adds state for new fields
- Updates form handlers
- Maintains existing state
- No broken functionality

**TypeScript Integration:**
- Updates interface definitions
- Maintains type safety
- No type errors introduced

This shows understanding of React patterns, not just syntax.

### The CSS Framework Consistency

Codex matches existing styling:

**Observes:**
- Tailwind CSS is in use
- Existing class patterns
- Component styling approach

**Applies:**
- Consistent Tailwind classes
- Matches existing design system
- No jarring visual changes

This prevents "looks different from rest of app" problems.

### The Multi-File Coordination

Adding form fields touches multiple files - Codex coordinates:

**Files Modified:**
- Component file (form JSX)
- Type definitions (TypeScript interfaces)
- State management (React hooks)
- Styling (CSS classes)

**Coordination:**
- All files updated consistently
- Cross-file references maintained
- No broken imports

This demonstrates understanding of project architecture.

### The Task Archival Practice

Clean workspace = clean mind:

**After Completion:**
- Archive the task
- Remove from active list
- Dashboard stays organized
- Ready for next task

**Why This Matters:**
- Reduces cognitive load
- Prevents confusion about what's active
- Maintains project hygiene

### The Iterative Workflow Pattern

The video demonstrates a repeatable pattern:

1. **Understand Current State** - Review what exists
2. **Define Requirements** - Know what you want
3. **Ask Questions** - Understand codebase first
4. **Assign Task** - Give clear instructions
5. **Monitor Progress** - Watch the logs
6. **Review Changes** - Check the diff
7. **Test Locally** - Verify functionality
8. **Merge if Good** - Integrate changes
9. **Archive Task** - Clean workspace

This pattern can be repeated for any development task.

### The Production Reality Check

The demo app uses local state only - no database:

**AI Recognizes:**
- No API routes present
- No database connection
- Local state storage
- No persistence layer

**Implication:**
- AI understands architecture patterns
- AI identifies what's missing
- AI can suggest improvements
- But AI works within existing constraints

This shows AI works with reality, not ideals.

---

## Detailed Workflow Guide

### Step 1: Use Ask Mode First

Before making changes, understand your codebase:

**Good Ask Questions:**
- "Provide a summary of this project"
- "What tech stack is being used?"
- "How does the [component name] work?"
- "What are the main components in this app?"

**What You Get:**
- Project overview
- Tech stack identification
- Component explanations
- File structure analysis
- No code modifications

### Step 2: Switch to Code Mode

When ready to make changes:

**Click:** New Task → Code tab

**Write Clear Request:**
```
Add a description textarea and a tags input field
to the ingredient form.
```

**What Happens:**
- Codex analyzes request
- Plans implementation
- Creates branch
- Makes changes
- Creates PR

### Step 3: Monitor Task Execution

**Watch Status:**
- "Running" during execution
- "Completed" when done

**View Details:**
- See real-time logs
- Understand AI process
- Track progress

### Step 4: Review Pull Request

**On GitHub:**
- Review code diff
- Check all changed files
- Read AI summary
- Understand what was done

**What to Check:**
- Code quality
- Implementation approach
- Missing edge cases
- Consistency with existing code

### Step 5: Test Locally

**Fetch Branch:**
```bash
git fetch
git checkout codex/[branch-name]
npm install
npm run dev
```

**Test Functionality:**
- Open localhost:3000
- Try the new features
- Verify everything works
- Check for edge cases

### Step 6: Merge if Satisfied

**On GitHub:**
- Click "Merge pull request"
- Confirm merge
- Changes integrated to main

### Step 7: Update Local Main

```bash
git checkout main
git pull
```

### Step 8: Archive Task

**In Codex Cloud:**
- Click three dots on task
- Select "Archive"
- Task removed from active list

---

## Key Commands Reference

### Git Workflow
```bash
git fetch                           # Get remote branches
git checkout codex/[id]             # Switch to AI branch
git checkout main                   # Return to main branch
git pull                            # Update main branch
```

### Development
```bash
npm install                         # Install dependencies
npm run dev                         # Start dev server
```

### Branch Naming
- Format: `codex/[ID]`
- Example: `codex/abc123def456`
- Found in PR title on GitHub

---

## Best Practices

### DO ✅
- Use Ask mode to understand codebase first
- Review all code diffs before merging
- Test changes locally before merging
- Provide clear, detailed requirements
- Monitor task logs to understand process
- Archive completed tasks
- Follow standard git workflow
- Treat AI like a junior developer

### DON'T ❌
- Skip reviewing code diffs
- Merge without testing locally
- Assign vague tasks
- Assume AI is always right
- Let AI directly edit main branch
- Forget to archive completed tasks
- Skip local testing
- Trust AI blindly

---

## Common Patterns

### Adding Form Fields
1. Ask AI to add fields
2. AI updates: Component, State, Types, Styles
3. Test form submission
4. Verify data flow
5. Merge if working

### Understanding Codebase
1. Start with Ask mode
2. Request project summary
3. Ask about specific components
4. Review tech stack
5. Then assign tasks

### Iterative Development
1. Make small changes per task
2. Test each change
3. Merge incrementally
4. Build complexity gradually
5. Maintain working state

---

## Production Considerations

### Before Using in Production
- Establish review guidelines
- Define testing requirements
- Set up branch protection rules
- Create coding standards
- Train team on workflow

### Team Workflow
- Assign tasks to specific team members
- Review each other's AI-generated code
- Document AI-assisted decisions
- Track AI task patterns
- Share successful prompts

---

*Generated: February 3, 2026*
*Source: Net Ninja OpenAI Codex Tutorial Series*
*Video ID: aPXvW7uxQio*
