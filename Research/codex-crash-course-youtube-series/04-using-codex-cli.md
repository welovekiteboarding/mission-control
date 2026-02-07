# Video #4: Using the Codex CLI

**Original Video:** [OpenAI Codex Tutorial #4 - Using the Codex CLI](https://www.youtube.com/watch?v=hia0PznjGt8)
**Duration:** 10 minutes 48 seconds
**Channel:** Net Ninja (1.82M subscribers)
**Video ID:** `hia0PznjGt8`

---

## What You'll Learn

- What the Codex CLI is and how it differs from Codex Cloud
- Installing the Codex CLI (npm or Homebrew)
- Authenticating with your ChatGPT account
- Starting a Codex session from the terminal
- The Ask vs Assign workflow (questions vs tasks)
- Adding file context with the @ symbol
- Using images as visual context for component creation
- Git branch safety practices
- Approval modes: auto-approve vs manual approval
- Local development workflow with AI assistance

---

## Fabric Pattern: Extract Alpha

*Key actionable insights and production patterns:*

* Local agents are the future of coding
* CLI is just another interface for intelligence
* Install with npm or brew like normal tools
* Browser auth connects terminal to your account
* Ask questions to understand the codebase
* Assign tasks to actually write the code
* Use the at symbol to add context
* Feed it files to learn your patterns
* You can even feed it design screenshots
* Visuals become code through image context
* Always work on a separate git branch
* Branching lets you discard AI mistakes easily
* Manual approval is safer than auto mode
* Switch to auto approve only after trusting it
* It creates files, not just text snippets
* Local execution is faster than cloud editing
* It understands your specific tech stack automatically
* Good context is the secret to good code
* The agent reads code to modify it intelligently
* It feels like a pair programmer
* You control the pace with approval modes
* Design mockups become functional components instantly
* Standard tools make adoption feel totally natural
* Safety mechanisms prevent AI from breaking everything

---

## Fabric Pattern: Create Video Chapters

**00:00:00 - CODEX CLI OVERVIEW**
- Codex CLI: Local version of Codex
- Same Codex product, different interface
- Run locally on computer from terminal
- Make changes to local projects
- Contrast with Codex Cloud (remote execution)
- Similar to Claude Code workflow
- Coding agent that works locally

**[00:00](https://youtu.be/hia0PznjGt8?t=0)**

**00:00:30 - INSTALLATION METHODS**
- Two installation options available
- **Option 1: npm**
  ```bash
  npm install @openai/codex
  ```
- **Option 2: Homebrew (Mac)**
  ```bash
  brew install openai-codex
  ```
- Verify installation: `codex --version`
- Shows version number when successful

**[00:30](https://youtu.be/hia0PznjGt8?t=30)**

**00:01:00 - AUTHENTICATION FLOW**
- First-time use requires login
- Command: `codex auth login`
- Opens browser for authentication
- Authenticate with ChatGPT account
- Complete authentication flow
- Verify login: `codex auth whoami`
- Shows account details when successful

**[01:00](https://youtu.be/hia0PznjGt8?t=60)**

**00:01:30 - STARTING A SESSION**
- Navigate to project folder
- Demo: `cd` into Yumpair project
- Start Codex session: `codex`
- See welcome message
- Codex asks what you want to do
- Interactive prompt ready for commands

**[01:30](https://youtu.be/hia0PznjGt8?t=90)**

**00:02:00 - ASK VS ASSIGN**
- Similar to Codex Cloud options
- **Ask option:** Ask questions about codebase
- **Code/Assign option:** Assign coding tasks
- Additional options available:
  - Add context
  - Run a command
  - Get help
- Demo: Ask "What is this project about?"
- Codex analyzes code and provides summary
- Summary matches Codex Cloud analysis

**[02:00](https://youtu.be/hia0PznjGt8?t=120)**

**00:02:30 - ADDING FILE CONTEXT**
- Use @ symbol to add file context
- Example: `@components/button.tsx`
- Tells Codex to read and understand file
- Codex learns existing patterns
- Demo request: "Add an icon prop to the button component"
- Codex reads button component
- Understands context and patterns
- Modifies code maintaining style
- Updates props interface
- Adds rendering logic
- Maintains existing styling

**[02:30](https://youtu.be/hia0PznjGt8?t=150)**

**00:03:00 - IMAGE CONTEXT SUPPORT**
- Can add images as context
- Use @ symbol with image path
- Example: `@screenshots/card-design.png`
- Codex analyzes visual design
- Creates component based on mockup
- Demo: Create card component from design
- Codex analyzes layout structure
- Matches styling from design
- Creates placeholder content
- Powerful for design-to-code workflow

**[03:00](https://youtu.be/hia0PznjGt8?t=180)**

**00:03:30 - GIT BRANCHING TIP**
- Safety practice: Work on separate branch
- Before starting Codex session:
  ```bash
  git checkout -b feature/my-changes
  ```
- Work on that branch with Codex
- Benefits:
  - If something goes wrong, discard branch
  - Easy to start over
  - Safe experimentation
- When happy with changes:
  - Merge branch into main
  - Standard git workflow
- Safety tip for AI-assisted development

**[03:30](https://youtu.be/hia0PznjGt8?t=210)**

**00:04:00 - APPROVAL MODES**
- Two approval modes available
- **Auto-approve mode:**
  - Codex applies changes automatically
  - No permission required
  - Faster workflow
  - Less safe
- **Manual approval mode:**
  - Codex asks permission before each change
  - Slower workflow
  - Safer approach
- Recommendation:
  - Start with manual approval
  - Build trust in Codex
  - Switch to auto-approve when comfortable
- Control the pace of development

**[04:00](https://youtu.be/hia0PznjGt8?t=240)**

**00:04:20 - COURSE PROMO**
- Basics of Codex CLI covered
- Course availability: $3 buy or $9/month Pro
- First month half price with promo code
- Link in description
- Next lesson continues CLI features

**[04:20](https://youtu.be/hia0PznjGt8?t=260)**

---

## Core Wisdom and Key Insights

### The Local-First AI Development Paradigm

Codex CLI represents a fundamental shift in how we interact with AI coding tools:

**Cloud-Based (Codex Cloud):**
- Remote execution on servers
- Requires GitHub connection
- Works from any device
- Pull request workflow
- Slower feedback loop

**Local-Based (Codex CLI):**
- Local execution on your machine
- No GitHub dependency
- Requires local project clone
- Direct file modification
- Instant feedback loop

Both approaches have valid use cases:
- **Cloud:** Quick tasks, mobile work, remote projects
- **Local:** Active development, rapid iteration, integrated workflow

### The Standard Tool Integration

Codex CLI installs like any standard developer tool:

**Package Manager Installation:**
```bash
npm install @openai/codex          # npm
brew install openai-codex          # Homebrew
```

**This Matters Because:**
- No special installation process
- Familiar to developers
- Works with existing tooling
- Easy to update/uninstall
- Fits into standard workflows

**Verification:**
```bash
codex --version                    # Check installation
codex auth whoami                  # Check authentication
```

Standard tooling patterns mean faster adoption and less friction.

### The Browser Authentication Flow

The authentication process is elegant:

**Process:**
1. Run `codex auth login` in terminal
2. Browser opens automatically
3. Authenticate with ChatGPT account
4. Terminal receives authentication token
5. Ready to use

**Benefits:**
- Secure (no password handling in terminal)
- Familiar (OAuth flow)
- User-friendly (browser UI)
- One-time setup (persists across sessions)

This balance of security and usability is critical for developer tools.

### The Dual-Mode Interface Consistency

Codex CLI maintains consistency with Codex Cloud:

**Same Two Modes:**
1. **Ask Mode** - Questions about codebase
2. **Code/Assign Mode** - Actual coding tasks

**Why This Matters:**
- Learn once, apply anywhere
- Consistent mental model
- Switch between CLI and Cloud seamlessly
- Same capabilities, different interface

**Additional CLI Options:**
- Add context (files, images)
- Run commands
- Get help

The interface disappears, letting you focus on the task.

### The Context-Aware Intelligence

The @ symbol for context is powerful:

**File Context:**
```bash
@components/button.tsx
```
- Codex reads the file
- Understands existing patterns
- Maintains consistency
- Modifies intelligently

**Example Impact:**
- Without context: Creates generic button
- With context: Modifies existing button with patterns
- Result: Consistent with codebase style

**This is the key to good AI code:**
- Context > Instructions
- Understanding > Generation
- Patterns > Templates

### The Visual Context Revolution

Image context is a game-changer:

**Workflow:**
```bash
@screenshots/card-design.png
Create a card component based on this design
```

**What Happens:**
1. Codex analyzes image
2. Extracts layout structure
3. Identifies styling patterns
4. Creates matching component
5. Maintains design fidelity

**Implications:**
- Design → Code becomes seamless
- No manual translation needed
- Maintains design system consistency
- Accelerates frontend development

**This bridges the design-dev gap:**
- Designers speak in visuals
- Developers speak in code
- AI translates between both

### The Git Branch Safety Net

Working on branches is non-negotiable with AI:

**Safe Workflow:**
```bash
git checkout -b feature/my-changes    # Create branch
codex                                 # Start AI session
# ... make changes ...
git checkout main                      # Return to main
git merge feature/my-changes           # Merge if good
```

**If Something Goes Wrong:**
```bash
git checkout main                      # Abandon branch
git branch -D feature/my-changes       # Delete bad branch
```

**Why This Matters:**
- AI can make mistakes
- AI might misunderstand requirements
- AI could break things
- Easy recovery is essential

**Branching as Sandbox:**
- Experiment safely
- Iterate rapidly
- Discard if needed
- Merge if good

This is standard software practice amplified by AI risk.

### The Approval Mode Spectrum

Two modes represent a safety-speed tradeoff:

**Manual Approval (Start Here):**
- ✅ Safer
- ✅ Learn what AI does
- ✅ Catch mistakes early
- ✅ Build understanding
- ❌ Slower
- ❌ More interaction needed

**Auto-Approve (Advanced Users):**
- ✅ Faster
- ✅ Less interaction
- ✅ Trusted workflow
- ❌ Riskier
- ❌ Less oversight
- ❌ Harder to catch mistakes

**Recommendation:**
1. Start with manual approval
2. Learn AI's patterns
3. Build trust over time
4. Switch to auto when comfortable
5. Can switch back anytime

**The Human Control Knob:**
- You control the pace
- You decide the safety level
- You can adjust anytime
- No commitment to one mode

### The Pair Programming Metaphor

Codex CLI feels like pair programming:

**Similarities:**
- Someone to bounce ideas off
- Someone to write code with
- Someone to review your work
- Someone to learn from

**Differences:**
- Available 24/7
- Never gets tired
- Knows everything (almost)
- Works at your pace

**The Workflow:**
1. You explain what you want
2. AI writes the code
3. You review and guide
4. AI adjusts based on feedback
5. Iterate until good

This is collaborative development, not replacement.

### The File Creation Capability

Codex creates actual files, not snippets:

**Example:**
- Request: "Create a reusable button component"
- Result: `components/button.tsx` file created
- Content: Complete component with types, props, styling

**What Gets Created:**
- File structure
- Component code
- TypeScript types
- Props interfaces
- Styling (Tailwind CSS)
- Usage examples (sometimes)

**This Matters Because:**
- Not just code snippets
- Production-ready files
- Proper project structure
- Ready to use immediately

### The Tech Stack Understanding

Codex automatically detects your stack:

**From the Demo:**
- Identified: Next.js, React, Tailwind CSS
- Understood: Component patterns
- Applied: TypeScript types
- Maintained: Styling conventions

**No Explicit Instructions Needed:**
- Reads `package.json`
- Analyzes imports
- Observes patterns
- Applies consistently

**This Reduces Friction:**
- No need to explain stack
- No need to provide patterns
- No need to specify conventions
- Just tell it what to build

### The Iterative Improvement Loop

Context enables iterative improvement:

**First Iteration:**
```bash
Create a button component
```
Result: Basic button component

**Second Iteration:**
```bash
@components/button.tsx
Add an icon prop
```
Result: Enhanced button with icon

**The Loop:**
1. Build something
2. Provide context
3. Request enhancement
4. AI improves intelligently
5. Repeat

**This is How Development Works:**
- Rarely perfect on first try
- Iterate based on understanding
- Improve incrementally
- Context guides improvements

### The Speed Advantage

Local execution is faster than cloud:

**Cloud Workflow:**
- Request → Server queue → Processing → PR → Review → Test → Merge
- Time: Minutes to hours

**Local Workflow:**
- Request → Instant processing → File created → Test → Use
- Time: Seconds to minutes

**When Speed Matters:**
- Rapid prototyping
- Learning/exploration
- Small iterations
- Active development

**When Cloud Works Better:**
- Large tasks
- Remote work
- Mobile access
- Team collaboration

### The Design-to-Code Pipeline

Image context creates a new workflow:

**Traditional:**
1. Designer creates mockup
2. Developer interprets design
3. Developer writes code
4. Back-and-forth on details
5. Eventually matches design

**AI-Assisted:**
1. Designer creates mockup
2. Developer provides image to AI
3. AI creates component from design
4. Minor adjustments if needed
5. Done

**Time Savings:**
- Eliminates interpretation step
- Reduces back-and-forth
- Maintains design fidelity
- Accelerates handoff

### The Learning Opportunity

Using Codex CLI teaches development:

**From Observing AI:**
- Code structure patterns
- TypeScript best practices
- Component design patterns
- Styling approaches

**From Context Results:**
- How context affects output
- What makes good instructions
- How to iterate effectively
- When to provide examples

**Over Time:**
- Better mental models
- Stronger coding skills
- Faster development
- Better code quality

AI becomes a learning tool, not just a productivity tool.

### The Safety Mechanisms

Multiple safety layers protect your code:

**Layer 1: Git Branches**
- Isolation from main
- Easy recovery
- Safe experimentation

**Layer 2: Approval Modes**
- Manual approval by default
- Review before apply
- Control over changes

**Layer 3: Context Awareness**
- AI reads before writing
- Maintains patterns
- Consistent modifications

**Layer 4: Human Review**
- You check the output
- You decide to merge
- You maintain standards

**Defense in Depth:**
- No single point of failure
- Multiple safety checks
- Human always in control
- Easy to undo mistakes

---

## Detailed Installation Guide

### Prerequisites
- Node.js and npm (for npm installation)
- Homebrew (for brew installation, Mac only)
- ChatGPT Plus or Pro account
- Basic terminal familiarity

### Installation Method 1: npm

```bash
# Install Codex CLI
npm install -g @openai/codex

# Verify installation
codex --version

# Expected output: codex version X.X.X
```

### Installation Method 2: Homebrew (Mac)

```bash
# Install Codex CLI
brew install openai-codex

# Verify installation
codex --version

# Expected output: codex version X.X.X
```

### Authentication

```bash
# Start authentication flow
codex auth login

# Browser will open - authenticate with ChatGPT account

# Verify authentication
codex auth whoami

# Expected output: Your account details
```

---

## Command Reference

### Basic Commands

```bash
codex                    # Start a Codex session
codex --version          # Check version
codex auth login         # Authenticate
codex auth whoami        # Check authentication status
```

### Session Commands

During a Codex session, you can:
- **Ask a question** - Get codebase information
- **Assign a task** - Make code changes
- **Add context** - Provide files or images
- **Run a command** - Execute terminal commands
- **Get help** - Show available options

---

## Context Patterns

### File Context

```bash
# Single file
@components/button.tsx

# Multiple files
@components/button.tsx @components/card.tsx

# With instruction
@components/button.tsx
Add an icon prop to the button
```

### Image Context

```bash
# Design mockup
@screenshots/design.png

# With instruction
@screenshots/card-design.png
Create a card component based on this design
```

### Combined Context

```bash
# File + Image
@components/button.tsx @screenshots/new-button.png
Update the button to match this design

# Multiple files + instruction
@components/button.tsx @types/button.ts
Add a disabled state to the button
```

---

## Workflow Examples

### Example 1: Create New Component

```bash
# Start session
codex

# Assign task
> Create a reusable button component with TypeScript

# Result: components/button.tsx created
```

### Example 2: Modify Existing Component

```bash
# Start session
codex

# Add context and task
> @components/button.tsx
> Add an icon prop and onClick handler

# Result: Button component updated intelligently
```

### Example 3: Design to Code

```bash
# Start session
codex

# Add image context and task
> @designs/navbar.png
> Create a navbar component based on this design

# Result: Navbar component matching design
```

---

## Best Practices

### DO ✅
- Always work on a separate git branch
- Start with manual approval mode
- Provide context with @ symbol for better results
- Test AI-generated code before committing
- Review changes before merging to main
- Use image context for design fidelity
- Verify authentication before starting session
- Keep context files relevant to the task
- Iterate based on AI understanding
- Learn from AI patterns and approaches

### DON'T ❌
- Work directly on main branch
- Start with auto-approve mode
- Provide vague instructions without context
- Merge untested code
- Assume AI is always correct
- Skip manual review
- Forget to create git branch
- Overwhelm AI with too much context
- Ignore safety mechanisms
- Blindly trust AI output

---

## Safety Guidelines

### Before Starting
1. Create new git branch
2. Ensure you're on correct branch
3. Verify authentication
4. Choose appropriate approval mode

### During Session
1. Review each change before approving
2. Test functionality after changes
3. Provide clear context when needed
4. Ask questions before assigning tasks

### After Session
1. Review all changes made
2. Test thoroughly
3. Commit if satisfied
4. Merge to main if good
5. Delete branch if bad

---

## Troubleshooting

### Installation Issues
- **Problem:** Command not found
- **Solution:** Verify installation path, restart terminal

### Authentication Issues
- **Problem:** Not authenticated
- **Solution:** Run `codex auth login` again

### Context Not Working
- **Problem:** AI doesn't understand context
- **Solution:** Verify file paths, use absolute paths if needed

### Poor Code Quality
- **Problem:** AI generates bad code
- **Solution:** Provide more context, be more specific in instructions

---

## Comparison: CLI vs Cloud

| Feature | Codex CLI | Codex Cloud |
|---------|-----------|-------------|
| **Execution** | Local | Remote |
| **Speed** | Fast | Slower |
| **Requirements** | Local project | GitHub repo |
| **Workflow** | Direct file edits | Pull requests |
| **Access** | Terminal only | Browser + mobile |
| **Best For** | Active development | Quick tasks, remote work |
| **Context** | Files + images | Repository files |
| **Safety** | Git branches | PR reviews |

---

## Production Considerations

### Team Adoption
- Establish CLI usage guidelines
- Agree on approval mode policies
- Create standard context patterns
- Document successful workflows

### Project Integration
- Add to onboarding documentation
- Create project-specific context guides
- Establish git branch conventions
- Define code review processes

### Performance
- Monitor AI impact on development speed
- Track code quality improvements
- Measure time savings
- Adjust workflows based on data

---

*Generated: February 3, 2026*
*Source: Net Ninja OpenAI Codex Tutorial Series*
*Video ID: hia0PznjGt8*
