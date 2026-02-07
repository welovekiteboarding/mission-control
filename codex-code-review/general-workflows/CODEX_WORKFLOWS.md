# Codex Workflows & Best Practices

**Based on official OpenAI documentation and cookbooks. Updated December 2025.**

---

## Table of Contents

1. [Core Philosophy](#core-philosophy)
2. [Official Workflows](#official-workflows)
3. [Best Practices](#best-practices)
4. [Prompting Guide](#prompting-guide)
5. [Configuration Files](#configuration-files)
6. [Multi-Agent Systems](#multi-agent-systems)
7. [Tools & Integrations](#tools--integrations)
8. [Security & Safety](#security--safety)

---

## Core Philosophy

> "Codex works best when you treat it like a teammate with explicit context and a clear definition of 'done.'"

**Source:** [Codex Workflows](https://developers.openai.com/codex/workflows/)

### Key Principles

1. **Explicit Context** - Provide clear, detailed context about what you want
2. **Clear Definition of Done** - Specify what completion looks like
3. **Break Complex Work into Smaller Steps** - Easier to test and review
4. **Version Control Workflow** - Work on feature branches, keep git status clean

---

## Official Workflows

### Workflow 1: Understanding Code

**Use when:** Onboarding, inheriting a service, reasoning about protocols/data models

#### IDE Extension Workflow (Fastest)

1. Open the most relevant files
2. Select the code you care about (optional but recommended)
3. Prompt Codex:

````
Explain how the request flows through the selected code.

Include:
- a short summary of the responsibilities of each module involved
- what data is validated and where
- one or two "gotchas" to watch for when changing this
```

**Verification:** Ask for a diagram or checklist to validate quickly

#### CLI Workflow

```bash
codex
```

```text
I need to understand the protocol used by this service. Read @foo.ts @schema.ts and explain the schema and request/response flow. Focus on required vs optional fields and backward compatibility rules.
```

**Source:** [Codex Workflows](https://developers.openai.com/codex/workflows/)

---

### Workflow 2: Bug Fixing

**Use when:** You have a failing behavior you can reproduce locally

#### CLI Workflow (Tight Loop)

```bash
codex
```

```text
Bug: Clicking "Save" on the settings screen sometimes shows "Saved" but doesn't persist the change.

Repro:
1) Start the app: npm run dev
2) Go to /settings
3) Toggle "Enable alerts"
4) Click Save
5) Refresh the page: the toggle resets

Constraints:
- Do not change the API shape.
- Keep the fix minimal and add a regression test if feasible.

Start by reproducing the bug locally, then propose a patch and run checks.
```

**Key Point:** Codex should re-run the repro steps after the fix

**Verification:**

```text
After the fix, run lint + the smallest relevant test suite. Report the commands and results.
```

**Source:** [Codex Workflows](https://developers.openai.com/codex/workflows/)

---

### Workflow 3: Writing Tests

**Use when:** You want to be very explicit about the scope you want tested

#### IDE Extension Workflow (Selection-Based)

1. Open the file with the function
2. Select the lines that define the function
3. Choose "Add to Codex Thread" from command palette
4. Prompt Codex:

```text
Write a unit test for this function. Follow conventions used in other tests.
```

#### CLI Workflow (Path + Line Range)

```bash
codex
```

```text
Add a test for the invert_list function in @transform.ts. Cover the happy path plus edge cases.
```

**Source:** [Codex Workflows](https://developers.openai.com/codex/workflows/)

---

### Workflow 4: UI Prototyping from Screenshots

**Use when:** You have a design mock, screenshot, or UI reference

#### CLI Workflow (Image + Prompt)

1. Save your screenshot locally (e.g., `./specs/ui.png`)
2. Run `codex`
3. Drag the image file into the terminal to attach it
4. Follow up with constraints:

```text
Create a new dashboard based on this image.

Constraints:
- Use react, vite, and tailwind. Write the code in typescript.
- Match spacing, typography, and layout as closely as possible.

Deliverables:
- A new route/page that renders the UI
- Any small components needed
- README.md with instructions to run it locally
```

**Best Practices:**
- The image provides visual requirements, but specify implementation constraints
- Include non-obvious behavior in text (hover states, validation rules, keyboard interactions)

**Verification:**

```text
Start the dev server and tell me the local URL/route to view the prototype.
```

**Source:** [Codex Workflows](https://developers.openai.com/codex/workflows/)

---

### Workflow 5: Iterative UI Development

**Use when:** You want a tight "design → tweak → refresh → tweak" loop

#### CLI Workflow (Run Vite, Then Iterate)

1. Start Codex: `codex`
2. Start dev server in separate terminal: `npm run dev`
3. Prompt with small iterations:

```text
Propose 2-3 styling improvements for the landing page.
```

```text
Go with option 2.
Change only the header:
- make the typography more editorial
- increase whitespace
- ensure it still looks good on mobile
```

```text
Next iteration: reduce visual noise.
Keep the layout, but simplify colors and remove any redundant borders.
```

**Best Practices:**
- Review changes in the browser "live" as the code is updated
- Commit changes you like, revert those you don't
- Tell Codex if you revert or modify so it doesn't overwrite

**Source:** [Codex Workflows](https://developers.openai.com/codex/workflows/)

---

### Workflow 6: Local Planning + Cloud Delegation

**Use when:** You want to design carefully (local), then outsource long implementation (cloud)

#### Local Planning (IDE)

1. Commit or stash your current work
2. Ask Codex to produce a refactor plan:

```text
$plan

We need to refactor the auth subsystem to:
- split responsibilities (token parsing vs session loading vs permissions)
- reduce circular imports
- improve testability

Constraints:
- No user-visible behavior changes
- Keep public APIs stable
- Include a step-by-step migration plan
```

3. Review and negotiate:

```text
Revise the plan to:
- specify exactly which files move in each milestone
- include a rollback strategy
```

#### Cloud Delegation (IDE → Cloud)

1. Set up Codex cloud environment
2. Click cloud icon beneath prompt composer
3. Enter prompt with existing context:

```text
Implement Milestone 1 from the plan.
```

4. Review cloud diff, iterate if needed
5. Create PR directly from cloud or pull changes locally

**Source:** [Codex Workflows](https://developers.openai.com/codex/workflows/)

---

### Workflow 7: Local Code Review

**Use when:** You want a second set of eyes before committing

#### CLI Workflow (Review Your Working Tree)

```bash
codex
```

```text
/review
```

**Optional: Custom focus**

```text
/review Focus on edge cases and security issues
```

**Verification:** Apply fixes, then rerun `/review` to confirm issues resolved

**Source:** [Codex Workflows](https://developers.openai.com/codex/workflows/)

---

### Workflow 8: GitHub PR Review

**Use when:** You want review feedback without pulling the branch locally

**Prerequisite:** Enable Codex Code Review on your repository

#### GitHub Workflow

1. Open the pull request on GitHub
2. Leave a comment tagging Codex:

```text
@codex review
```

**Optional: More explicit instructions**

```text
@codex review for security vulnerabilities and security concerns
```

**Source:** [Codex Workflows](https://developers.openai.com/codex/workflows/)

---

### Workflow 9: Documentation Updates

**Use when:** You need accurate, clear doc changes

#### IDE or CLI Workflow

1. Identify doc files to change
2. Prompt with scope and validation:

```text
Update the "advanced features" documentation to provide authentication troubleshooting guidance. Verify that all links are valid.
```

**Verification:** Read the rendered page

**Source:** [Codex Workflows](https://developers.openai.com/codex/workflows/)

---

## Best Practices

### Core Principles

1. **Treat Codex like a teammate** - Not a tool, but a collaborator
2. **Provide explicit context** - More context = better results
3. **Define "done" clearly** - Specify what completion looks like
4. **Break complex work into smaller steps** - For easier testing and review
5. **Use version control properly** - Work on feature branches, keep git clean

### When to Use Each Codex Surface

| Surface | Best For | Context Handling |
|---------|---------|------------------|
| **IDE Extension** | Fast local exploration, selection-based work | Automatically includes open files |
| **CLI** | Transcript + shell commands, local workflows | Mention paths explicitly or use `@` / `mention` |
| **Cloud** | Long-running tasks, parallel processing | Can carry over local context |

### Prompt Structure

Good prompts include:

1. **Context** - What is this about?
2. **Constraints** - What should/shouldn't happen?
3. **Deliverables** - What exactly should be produced?
4. **Verification** - How do we confirm it works?

**Example:**

```text
Update the authentication logic to use JWT tokens.

Context:
- Current system uses session-based auth
- We're moving to stateless API tokens

Constraints:
- Do not change the database schema
- Keep the login API endpoint the same
- Maintain backward compatibility for existing sessions

Deliverables:
- Updated auth service with JWT validation
- Migration guide for existing sessions
- Updated tests for the new flow

Verification:
- All existing tests pass
- New tests cover JWT validation
- Manual test with existing session cookie
```

---

## Prompting Guide

### Recommended Starter Prompt

**From official Codex Prompting Guide (December 2025):**

```text
You are Codex, based on GPT-5. You are running as a coding agent in the Codex CLI on a user's computer.

# General

- When searching for text or files, prefer using `rg` or `rg --files` because `rg` is much faster than alternatives
- If a tool exists for an action, prefer to use the tool instead of shell commands
- When multiple tool calls can be parallelized, use make these tool calls in parallel instead of sequential
- Code chunks may include inline line numbers in the form "Lxxx:LINE_CONTENT" - treat the "Lxxx:" prefix as metadata
- Default expectation: deliver working code, not just a plan

# Autonomy and Persistence

- You are an autonomous senior engineer: once given a direction, proactively gather context, plan, implement, test, and refine
- Persist until the task is fully handled end-to-end within the current turn whenever feasible
- Bias to action: default to implementing with reasonable assumptions; do not end with clarifications unless blocked
- Avoid excessive looping or repetition

# Code Implementation

- Act as a discerning engineer: optimize for correctness, clarity, and reliability over speed
- Conform to the codebase conventions: follow existing patterns, helpers, naming, formatting
- Comprehensiveness: cover all relevant surfaces so behavior stays consistent
- Behavior-safe defaults: preserve intended behavior; gate intentional changes and add tests
- Tight error handling: no broad catches or silent defaults; propagate errors explicitly
- Efficient edits: read enough context before changing; batch logical edits together
- Keep type safety: changes should always pass build and type-check
- Reuse: search first before adding new helpers or logic
```

**Source:** [Codex Prompting Guide](https://developers.openai.com/cookbook/examples/gpt-5/codex_prompting_guide/)

### Key Prompting Best Practices

1. **Think first, batch everything** - Plan all files needed before reading
2. **Use parallel tool calls** - Read multiple files together
3. **Be specific about tool use** - Use dedicated tools over terminal commands
4. **Avoid excessive status updates** - Deliverables over explanations
5. **Present work clearly** - Concise, friendly coding teammate tone

### File Reference Format

When referencing files:

```text
Accepted: absolute, workspace-relative, a/ or b/ diff prefixes, or bare filename/suffix
Optionally include line/column: :line[:column] or #Lline[Ccolumn]
Examples: src/app.ts, src/app.ts:42, b/server/index.js#L10
```

**Source:** [Codex Prompting Guide](https://developers.openai.com/cookbook/examples/gpt-5/codex_prompting_guide/)

---

## Configuration Files

### AGENTS.md

**Purpose:** Custom instructions to guide Codex on code organization and commands

**How it works:**
- Codex CLI automatically enumerates `AGENTS.md` files
- Files are pulled from `~/.codex` plus each directory from repo root to CWD
- Later directories override earlier ones
- Each becomes a user-role message in conversation history

**Format:**

```markdown
# AGENTS.md instructions for <directory>

## Review guidelines

- Don't log PII
- Verify that authentication middleware wraps every route
- Treat typos in documentation as P1 issues

## Code style

- Use TypeScript strict mode
- Prefer composition over inheritance
- Add JSDoc comments for public APIs
```

**Source:** [Codex Prompting Guide](https://developers.openai.com/cookbook/examples/gpt-5/codex_prompting_guide/)

### PLANS.md

**Purpose:** For multi-hour problem solving - verify Codex's approach before implementation

**When to use:** Complex refactors, migrations, large-scale changes

**Best practices:**
1. Make sure current work is committed or stashed
2. Ask Codex to produce a plan
3. Review and negotiate changes
4. Approve before implementation

**Source:** [Codex Workflows](https://developers.openai.com/codex/workflows/)

---

## Multi-Agent Systems

### Overview

**From official cookbook:** "Developers strive for consistency in everything they do. With Codex CLI and the Agents SDK, that consistency can now scale like never before."

**Enables:**
- Consistency and repeatability via scoped context for each agent
- Scalable orchestration of single and multi-agent systems
- Observability & auditability via full agentic stack trace

**Source:** [Building Consistent Workflows](https://developers.openai.com/cookbook/examples/codex/codex_mcp_agents_sdk/building_consistent_workflows_codex_cli_agents_sdk/)

### Single-Agent Example

```python
developer_agent = Agent(
    name="Game Developer",
    instructions=(
        "You are an expert in building simple games using basic html + css + javascript with no dependencies. "
        "Save your work in a file called index.html in the current directory. "
        "Always call codex with \"approval-policy\": \"never\" and \"sandbox\": \"workspace-write\""
    ),
    mcp_servers=[codex_mcp_server],
)

designer_agent = Agent(
    name="Game Designer",
    instructions=(
        "You are an indie game connoisseur. Come up with an idea for a single page html + css + javascript game. "
        "Format your request as a 3 sentence design brief and call the Game Developer coder with your idea."
    ),
    model="gpt-5",
    handoffs=[developer_agent],
)

result = await Runner.run(designer_agent, "Implement a fun new game!")
```

### Multi-Agent Orchestration

**Team structure:**

| Agent | Role |
|-------|------|
| **Project Manager** | Breaks down tasks, creates requirements, coordinates work |
| **Designer** | Produces UI/UX specifications |
| **Frontend Developer** | Implements UI/UX |
| **Backend Developer** | Implements APIs and logic |
| **Tester** | Validates outputs against acceptance criteria |

**Key Pattern:** Gated handoffs where Project Manager enforces that artifacts exist before moving to next agent

**Source:** [Building Consistent Workflows](https://developers.openai.com/cookbook/examples/codex/codex_mcp_agents_sdk/building_consistent_workflows_codex_cli_agents_sdk/)

---

## Tools & Integrations

### MCP (Model Context Protocol)

Codex CLI can be run as an MCP server, exposing two tools:
- `codex()` - for creating a conversation
- `codex-reply()` - for continuing a conversation

**Setup:**

```python
async with MCPServerStdio(
    name="Codex CLI",
    params={
        "command": "npx",
        "args": ["-y", "codex", "mcp-server"],
    },
    client_session_timeout_seconds=360000,
) as codex_mcp_server:
    # Use codex_mcp_server with agents
    pass
```

**Source:** [Building Consistent Workflows](https://developers.openai.com/cookbook/examples/codex/codex_mcp_agents_sdk/building_consistent_workflows_codex_cli_agents_sdk/)

### GitHub Integration

**Native Code Review:**
1. Enable Codex Code Review in repository settings
2. Comment `@codex review` on PR
3. Codex leaves review with inline comments
4. Use `@codex review for <special instruction>` for focus areas

**GitHub Action:**
```yaml
- uses: openai/codex-action@main
  with:
    openai-api-key: ${{ secrets.OPENAI_API_KEY }}
    prompt-file: codex-prompt.md
    output-schema-file: codex-output-schema.json
    sandbox: read-only
```

**Source:** [Codex GitHub Action](https://developers.openai.com/codex/github-action/)

---

## Security & Safety

### Version Control Best Practices

**From official security documentation:**

1. **Keep git status clean** - Commit or stash before delegating
2. **Work on feature branches** - Never modify main directly
3. **Review changes before committing** - Always check what Codex changed
4. **Never revert changes you didn't make** - Unless explicitly requested
5. **Avoid destructive commands** - Never use `git reset --hard` or `git checkout --` without approval

### Editing Constraints

**Official prompt guidelines:**

- Default to ASCII when editing files
- Add succinct code comments for complex code only
- Use `apply_patch` for single file edits
- You may be in a dirty git worktree - respect existing changes
- Do not amend commits unless requested
- If unexpected changes appear, STOP and ask user

**Source:** [Codex Prompting Guide](https://developers.openai.com/cookbook/examples/gpt-5/codex_prompting_guide/)

---

## Sources

1. [Codex Workflows](https://developers.openai.com/codex/workflows/) - Official workflow documentation
2. [Codex Prompting Guide](https://developers.openai.com/cookbook/examples/gpt-5/codex_prompting_guide/) - Updated December 4, 2025
3. [Building Consistent Workflows with Codex CLI & Agents SDK](https://developers.openai.com/cookbook/examples/codex/codex_mcp_agents_sdk/building_consistent_workflows_codex_cli_agents_sdk/) - October 1, 2025
4. [Codex GitHub Integration](https://developers.openai.com/codex/integrations/github/) - Native GitHub review setup
5. [Codex GitHub Action](https://developers.openai.com/codex/github-action/) - CI/CD integration
6. [Codex CLI Features](https://developers.openai.com/codex/cli/features/) - CLI documentation
7. [Codex Security](https://developers.openai.com/codex/security/) - Security guidelines

---

*Last updated: February 2026*
