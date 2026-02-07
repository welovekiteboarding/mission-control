# Video #5: CLI Commands & Resuming Sessions

**Original Video:** [CLI Commands & Resuming Sessions](https://www.youtube.com/watch?v=htNz7uazonY)

## What You'll Learn

- Built-in slash commands available in the Codex CLI
- How to manage Codex CLI sessions (status, model selection, approvals)
- Using the `/status` command to view workspace, account, and token usage information
- Switching between different GPT5 models with varying reasoning levels
- Configuring approval modes (auto, read only, full access)
- Resuming previous Codex CLI sessions
- Searching through session history
- Understanding session context management and the `/compact` command
- Viewing git diffs directly in the terminal
- Managing MCP (Model Context Protocol) servers
- Best practices for session organization and context management

---

## 🎯 Extracted Alpha Points

- [Long sessions bloat context and degrade decisions](https://youtu.be/htNz7uazonY?t=100)
- [Compact history to save tokens and sharpen focus](https://youtu.be/htNz7uazonY?t=100)
- [Create separate sessions for each distinct feature](https://youtu.be/htNz7uazonY?t=290)
- [Resume sessions to jump back into specific features](https://youtu.be/htNz7uazonY?t=310)
- [Search session history to find past work quickly](https://youtu.be/htNz7uazonY?t=535)
- [Auto mode grants the agent unchecked write access](https://youtu.be/htNz7uazonY?t=230)
- [Full access grants the agent network permissions](https://youtu.be/htNz7uazonY?t=240)
- [Read only mode forces the AI to ask permission](https://youtu.be/htNz7uazonY?t=235)
- [Check status to monitor token usage and limits](https://youtu.be/htNz7uazonY?t=240)
- [MCP servers extend the agent's capabilities via plugins](https://youtu.be/htNz7uazonY?t=220)
- [The init command creates a local agents config](https://youtu.be/htNz7uazonY?t=90)
- [Use the at sign to add file context](https://youtu.be/htNz7uazonY?t=200)
- [Switch models to trade speed for reasoning depth](https://youtu.be/htNz7uazonY?t=240)
- [View git diffs directly inside the terminal interface](https://youtu.be/htNz7uazonY?t=195)
- [Providers rush tools to market before finishing polish](https://youtu.be/htNz7uazonY?t=375)
- [Hitting context limits forces you to compact sessions](https://youtu.be/htNz7uazonY?t=175)
- [Sandboxing restricts where the agent is allowed to play](https://youtu.be/htNz7uazonY?t=145)
- [One feature per session keeps your work organized](https://youtu.be/htNz7uazonY?t=290)
- [CLI tools offer speed over graphical guidance](https://youtu.be/htNz7uazonY?t=45)
- [Monitor token usage to keep API costs predictable](https://youtu.be/htNz7uazonY?t=240)
- [Slash commands provide quick control over agent behavior](https://youtu.be/htNz7uazonY?t=55)
- [Expect frequent updates as tools find their feet](https://youtu.be/htNz7uazonY?t=380)
- [You currently cannot delete old session history](https://youtu.be/htNz7uazonY?t=355)
- [Codex CLI mimics Claude Code's slash commands](https://youtu.be/htNz7uazonY?t=45)

---

## 📺 Video Chapters

- **[00:00:00](https://youtu.be/htNz7uazonY?t=0)** - INTRO TO CODEX
- **[00:00:30](https://youtu.be/htNz7uazonY?t=30)** - SLASH COMMANDS
- **[00:01:00](https://youtu.be/htNz7uazonY?t=60)** - COMPACT COMMAND
- **[00:01:30](https://youtu.be/htNz7uazonY?t=90)** - GIT DIFFS
- **[00:02:00](https://youtu.be/htNz7uazonY?t=120)** - MENTION COMMAND
- **[00:02:30](https://youtu.be/htNz7uazonY?t=150)** - STATUS COMMAND
- **[00:03:00](https://youtu.be/htNz7uazonY?t=180)** - MODEL SELECTION
- **[00:03:30](https://youtu.be/htNz7uazonY?t=210)** - APPROVAL MODES
- **[00:04:00](https://youtu.be/htNz7uazonY?t=240)** - QUITTING SESSIONS
- **[00:04:30](https://youtu.be/htNz7uazonY?t=270)** - RESUMING SESSIONS
- **[00:05:10](https://youtu.be/htNz7uazonY?t=310)** - SEARCHING SESSIONS
- **[00:05:40](https://youtu.be/htNz7uazonY?t=340)** - DELETING SESSIONS
- **[00:06:10](https://youtu.be/htNz7uazonY?t=370)** - PRODUCT MATURITY

---

## 💡 Extracted Wisdom

### Summary

Instructor demonstrates Codex CLI commands like status, model selection, approvals, and session management, comparing it to Claude Code.

### Key Ideas

- The Codex CLI uses slash commands similar to Claude Code for executing built-in functions
- The [init command](https://youtu.be/htNz7uazonY?t=90) creates an agents.md file for future agent configurations in the project
- The [status command](https://youtu.be/htNz7uazonY?t=150) displays workspace, account, model, and token usage details clearly
- Approval modes control how much autonomy the AI has over file edits
- [Auto mode](https://youtu.be/htNz7uazonY?t=230) allows the AI to read, edit, and run commands freely
- [Read only mode](https://youtu.be/htNz7uazonY?t=235) restricts the AI to answering questions without making changes
- [Full access mode](https://youtu.be/htNz7uazonY?t=240) grants automatic network access alongside file editing permissions
- The [model command](https://youtu.be/htNz7uazonY?t=180) allows switching between different GPT5 reasoning variations available
- The [compact command](https://youtu.be/htNz7uazonY?t=100) summarizes chat history to prevent context window bloat issues
- Long sessions can accumulate context and negatively impact AI decision-making capabilities
- [Context limits](https://youtu.be/htNz7uazonY?t=175) restrict how much information an AI model can process simultaneously
- The [diff command](https://youtu.be/htNz7uazonY?t=195) displays git diffs directly within the terminal interface view
- The [mention command](https://youtu.be/htNz7uazonY?t=200) adds files as context, acting like the at sign
- [MCP command](https://youtu.be/htNz7uazonY?t=220) lists configured Model Context Protocol servers for the current project
- Users can [resume previous sessions](https://youtu.be/htNz7uazonY?t=310) by typing `codex resume` in the terminal
- Resuming sessions allows developers to continue work on specific distinct features
- The CLI tool currently lacks a built-in feature to delete old sessions
- The instructor feels the Codex CLI is still finding its feet
- Market pressure drives providers to release tools before they are fully polished
- Codex defaults to the GPT5 codex model with medium reasoning enabled
- The mention command seems redundant given the faster at sign alternative
- Token usage statistics track input prompts and AI output consumption accurately
- Sandbox settings define where and how the AI is allowed to operate
- Developers often use separate sessions for each distinct feature in a project
- Searching through previous sessions helps locate specific work contexts quickly
- The compact command is essential for maintaining performance in long sessions
- OpenAI will likely add more commands as the product matures further
- Codex CLI experience is very similar to using Claude Code slash commands

### Key Insights

- **AI coding tools are evolving rapidly**, often releasing unfinished features to compete
- **Context management is critical** for maintaining AI performance in long coding sessions
- **Granular permission settings** allow developers to balance automation with safety and control
- **The ability to resume sessions** mirrors human workflow continuity in complex projects
- **Similarities between tools like Codex and Claude** suggest a standardizing UX pattern
- **Token usage transparency** helps developers understand the cost of their AI interactions
- **Redundant commands in new software** often indicate shifting design priorities during development
- **Model selection flexibility** empowers users to optimize for cost or reasoning depth
- **The rush to market** creates a landscape of powerful but imperfect tools
- **Session isolation per feature** improves organization and context relevance for AI agents
- **Built-in git integration** streamlines the development workflow within the AI terminal
- **Context window limitations** necessitate tools that actively summarize and compress history

### Notable Quotes

> "So, we've got the Codex CLI CLI up and running now, which we started using in the previous lesson" - [00:00](https://youtu.be/htNz7uazonY?t=0)

> "And again, if you've ever used Claude Code, it's a pretty similar experience to their own commands" - [00:20](https://youtu.be/htNz7uazonY?t=20)

> "slash commands as they're called, because each command starts with a slash." - [00:27](https://youtu.be/htNz7uazonY?t=27)

> "Now I'm just going to exit the current codec session by pressing Ctrl + c." - [00:34](https://youtu.be/htNz7uazonY?t=34)

> "the first thing codex does is suggest trying out some of these different commands." - [00:46](https://youtu.be/htNz7uazonY?t=46)

> "The second one is the status command which shows a bit of information about the current session." - [00:58](https://youtu.be/htNz7uazonY?t=58)

> "Then we've got the approvals command which we can use to set up automatic approvals for codecs" - [01:04](https://youtu.be/htNz7uazonY?t=64)

> "And finally the model command which lets us choose an open AAI model to work with." - [01:11](https://youtu.be/htNz7uazonY?t=71)

> "default this is set to the GPT5 codeex model at the time of recording." - [01:16](https://youtu.be/htNz7uazonY?t=76)

> "the compact command to squash the chat history into a compact summary to reduce the overall session context." - [01:32](https://youtu.be/htNz7uazonY?t=92)

> "useful because as your sessions go on for longer, the context of the session accumulates and gets a bit bloated." - [01:38](https://youtu.be/htNz7uazonY?t=98)

> "when that happens, it can affect AI decision-making when it comes to code edits." - [01:44](https://youtu.be/htNz7uazonY?t=104)

> "And you can also eventually hit the context limit, which is how much context an AI model can process" - [01:49](https://youtu.be/htNz7uazonY?t=109)

> "the diff command for showing git diffs directly in the terminal." - [02:01](https://youtu.be/htNz7uazonY?t=121)

> "the mention command to add files as context to a prompt." - [02:06](https://youtu.be/htNz7uazonY?t=126)

> "this is actually just the same as using the at sign which is much quicker than running this command." - [02:10](https://youtu.be/htNz7uazonY?t=130)

> "The MCP command which lists out all the MCP servers configured for Codex in this project." - [02:18](https://youtu.be/htNz7uazonY?t=138)

> "Right now it's on auto, which means it can read files, make edits, and run commands automatically" - [02:09](https://youtu.be/htNz7uazonY?t=229)

> "Full access: where you give Codex full access to do what it wants with automatic network access as well." - [02:25](https://youtu.be/htNz7uazonY?t=245)

> "I would have a different session for every distinct feature I want Codeex... to work on." - [02:57](https://youtu.be/htNz7uazonY?t=297)

> "in codeex to resume a session, we can just type codeex in here. And then after that, resume" - [03:05](https://youtu.be/htNz7uazonY?t=305)

> "I don't think there's a way built into the Codeex CLI to delete old sessions" - [03:29](https://youtu.be/htNz7uazonY?t=329)

> "I feel like Codeex as a whole is still trying to find its feet a little bit" - [03:44](https://youtu.be/htNz7uazonY?t=344)

> "the CLI tool does feel maybe a little bit unfinished" - [03:49](https://youtu.be/htNz7uazonY?t=349)

> "different providers are just so desperate to get their tools out onto the market as quickly as possible" - [03:55](https://youtu.be/htNz7uazonY?t=355)

### Recommended Habits

- Use separate sessions for each distinct feature in a coding project
- Regularly check status to monitor token usage and current model settings
- Use the compact command to manage context window in long sessions
- Set approval modes to auto for trusted workspaces to increase speed
- Switch to read only mode when you only need to ask questions
- Utilize the at sign instead of the mention command for speed
- Resume previous sessions to continue work on specific features efficiently
- Search for specific keywords when filtering through many past sessions
- Use git diff commands to review changes before committing them
- Select specific GPT5 models based on the reasoning depth required
- Exit the CLI session using the quick command or Ctrl + c
- Push branches to GitHub and merge them after completing features
- Pull down the most recent version of the main branch frequently
- Keep the workspace clean to ensure the AI sandbox functions correctly
- Check configured MCP servers to understand available project integrations
- Avoid long sessions without compacting to prevent AI decision degradation
- Use the init command to set up agent files for new projects
- Compare similar tools like Claude Code to understand feature parity
- Be aware that new CLI tools may lack features like session deletion
- Adapt workflows to accommodate the current limitations of AI coding tools

### Key Facts

- Codex CLI commands start with a forward slash symbol
- The init command creates a file named agents.md
- The status command shows information about the current active session
- Approvals command sets up automatic permissions for file edits
- The model command allows users to select an OpenAI model
- Default model for Codex CLI is GPT5 codex at recording time
- The compact command reduces session context by summarizing history
- Context accumulation can negatively affect AI decision-making capabilities
- AI models have a specific context limit they can process
- The diff command shows git diffs directly inside the terminal
- The mention command adds files as context to the prompt
- Using the at sign is a faster alternative to mention command
- MCP command lists Model Context Protocol servers for the project
- Logout command signs the user out of the Codex CLI
- The quick command quits the current active CLI session
- Codex CLI has fewer commands than Claude Code currently
- There is no built-in way to delete old sessions yet
- Codex CLI allows resuming previous sessions via specific commands
- Users can search and filter through their previous session history
- The tool provides token usage statistics for input and output
- Sandbox settings define where Codex is allowed to access files
- Auto approval mode permits reading, editing, and running commands
- Full access mode includes automatic network access permissions
- The instructor compares the CLI experience to Claude Code frequently
- GPT5 models offer different degrees of reasoning for users

### References

- Codex CLI
- Claude Code
- agents.md
- GitHub
- GPT5
- MCP (Model Context Protocol)
- Git
- OpenAI

### Recommendations

- Use the compact command frequently to manage session context effectively
- Create separate sessions for each distinct feature you are developing
- Utilize the at sign for quickly adding files to the context
- Check the status command to monitor your token usage regularly
- Adjust approval modes based on the trust level of the workspace
- Resume previous sessions to maintain context for ongoing project features
- Search through session history to find specific past work quickly
- Select the appropriate GPT5 reasoning model for your specific task
- Be patient with new AI tools as they are often unfinished
- Use the diff command to review code changes within the terminal
- Configure MCP servers to extend the functionality of the Codex CLI
- Use read only mode when you only need information from the AI
- Enable full access mode only when network access is absolutely required
- Keep your CLI client updated to access the latest features
- Organize your workflow to minimize context window overflow issues
- Compare features between Codex and Claude Code to choose the best tool
- Exit sessions cleanly using the quick command to return to the terminal
- Push and merge branches frequently to integrate AI-assisted changes
- Initialize agent files to customize behavior for specific project needs
- Avoid letting sessions run too long without compacting the history
- Use the init command to set up your project structure correctly

---

*Document generated from Net Ninja OpenAI Codex Tutorial Video #5*
