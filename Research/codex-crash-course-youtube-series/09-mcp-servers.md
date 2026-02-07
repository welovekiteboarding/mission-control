# Video #9: MCP Servers

**Original Video:** [MCP Servers - Net Ninja OpenAI Codex Tutorial](https://www.youtube.com/watch?v=X7lgIa6guKg)

## What You'll Learn

- What MCP (Model Context Protocol) is and why it matters for AI development
- How MCP servers extend Claude Code's capabilities beyond the local codebase
- Installing and configuring MCP servers (Context7 and Playwright)
- Understanding the three scope levels: Project, Local, and Global
- Windows-specific installation workarounds and troubleshooting
- Using Context7 to access up-to-date documentation for frameworks
- Using Playwright for browser automation and website interaction
- Adding project memory to enforce best practices
- Remote vs local MCP server connections
- Troubleshooting connection issues with MCP servers

---

## Video Chapters

### [00:00] INTRODUCING MCP SERVERS
MCP servers give Claude Code the ability to connect and communicate with external data sources, services, and APIs. Without MCP, Claude Code's tools are limited to the scope of the codebase - it cannot interact with external databases, third-party services, or APIs.

**Key Timestamps:**
- [00:00](https://youtu.be/X7lgIa6guKg?t=0) - Introduction to MCP and its purpose
- [00:13](https://youtu.be/X7lgIa6guKg?t=13) - Claude Code's limitation to local codebase
- [00:27](https://youtu.be/X7lgIa6guKg?t=27) - No tools for external data sources without MCP
- [00:35](https://youtu.be/X7lgIa6guKg?t=35) - Example: Cannot analyze database tables directly

### [01:00] UNDERSTANDING MCP PROTOCOL
MCP stands for Model Context Protocol, designed by Anthropic. It defines how AI models interact with external sources by providing additional tools and context through MCP servers. Different servers come with different tools for different purposes.

**Key Timestamps:**
- [01:00](https://youtu.be/X7lgIa6guKg?t=60) - MCP definition and origin
- [01:22](https://youtu.be/X7lgIa6guKg?t=82) - Supabase MCP server example (list tables, deploy edge functions, execute SQL)
- [01:40](https://youtu.be/X7lgIa6guKg?t=100) - How Claude uses MCP tools: Check for tools → Use server tool → Return data to Claude
- [02:03](https://youtu.be/X7lgIa6guKg?t=123) - Important: MCP server reaches out to external sources, not Claude directly
- [02:21](https://youtu.be/X7lgIa6guKg?t=141) - Playwright MCP server: Browser automation tools
- [02:30](https://youtu.be/X7lgIa6guKg?t=150) - Context7 MCP server: Up-to-date framework documentation
- [02:41](https://youtu.be/X7lgIa6guKg?t=161) - Discover more servers at pulsemcp.com

### [02:54] ADDING SERVERS LOCALLY
MCP servers can be added locally or remotely. Local installation uses `claude mcp add` command with server name, command, and arguments. Windows users need special handling with `cmd /c` prefix.

**Key Timestamps:**
- [02:54](https://youtu.be/X7lgIa6guKg?t=174) - How to add MCP servers
- [02:58](https://youtu.be/X7lgIa6guKg?t=178) - Claude Code docs: MCP installation section
- [03:00](https://youtu.be/X7lgIa6guKg?t=180) - Two options: Local computer or remote connection
- [03:03](https://youtu.be/X7lgIa6guKg?t=183) - Command structure: `claude mcp add <server-name> -- <command>`
- [03:12](https://youtu.be/X7lgIa6guKg?t=192) - Windows warning: Add `cmd /c` before npx commands
- [03:20](https://youtu.be/X7lgIa6guKg?t=200) - `cmd` opens Windows command line, `/c` closes shell after execution

### [04:00] CONTEXT7 INSTALLATION WALKTHROUGH
Step-by-step installation of Context7 MCP server from GitHub docs. Includes adding scope flag and Windows-specific modifications.

**Key Timestamps:**
- [04:00](https://youtu.be/X7lgIa6guKg?t=240) - Navigate to Context7 MCP page, click MCP link to GitHub
- [04:11](https://youtu.be/X7lgIa6guKg?t=251) - Scroll to client options, expand "Claude Code" section
- [04:19](https://youtu.be/X7lgIa6guKg?t=259) - Three options: Two remote, one local connection
- [04:29](https://youtu.be/X7lgIa6guKg?t=269) - Copy command structure: `claude mcp add context7 -- npx ...`
- [04:39](https://youtu.be/X7lgIa6guKg?t=279) - Paste in terminal and add modifications
- [04:46](https://youtu.be/X7lgIa6guKg?t=286) - Add `--scope` flag before `--` to specify scope level

### [04:50] CONFIGURING PROJECT SCOPES
MCP servers can be added at three scope levels: Project (shared with team, pushed to remotes), Local (only you, this project), Global (all projects on your computer).

**Key Timestamps:**
- [04:50](https://youtu.be/X7lgIa6guKg?t=290) - Adding scope flag to command
- [04:53](https://youtu.be/X7lgIa6guKg?t=293) - Three scope types explained:
  - **Project scope**: Pushed to remotes, everyone on project can use
  - **Local scope**: Only you can use on this project
  - **Global scope**: Available for all projects on your computer
- [05:16](https://youtu.be/X7lgIa6guKg?t=316) - Default scope is local, but project scope recommended for visibility
- [05:32](https://youtu.be/X7lgIa6guKg?t=332) - Use `--scope project` (or local/global)

### [05:39] WINDOWS INSTALLATION WORKAROUNDS
Windows users face additional challenges with MCP server installation. The `-y` flag in npx causes errors, requiring manual JSON editing.

**Key Timestamps:**
- [05:39](https://youtu.be/X7lgIa6guKg?t=339) - Windows can be buggy when adding MCP servers
- [05:55](https://youtu.be/X7lgIa6guKg?t=355) - Two-step workaround for Windows:
  1. Add `cmd /c` before npx command
  2. Remove `-y` flag initially, run without it
- [06:02](https://youtu.be/X7lgIa6guKg?t=362) - Error: "unknown option y" after npx bit
- [06:09](https://youtu.be/X7lgIa6guKg?t=369) - `-y` flag auto-accepts defaults for package installation
- [06:13](https://youtu.be/X7lgIa6guKg?t=373) - Solution: Run without `-y` flag first
- [06:24](https://youtu.be/X7lgIa6guKg?t=384) - Claude Code creates `mcp.json` file in project root
- [06:36](https://youtu.be/X7lgIa6guKg?t=396) - JSON structure: `mcpServers` property contains server configurations
- [06:50](https://youtu.be/X7lgIa6guKg?t=410) - Context7 configuration visible with `type: "stdio"` for local connection
- [06:57](https://youtu.be/X7lgIa6guKg?t=417) - `command: "cmd"` and `arguments` array with `/c` and `-y` manually added
- [07:07](https://youtu.be/X7lgIa6guKg?t=427) - On Mac, configuration looks different (no cmd/c needed)
- [07:16](https://youtu.be/X7lgIa6guKg?t=436) - On Windows, manually add `-y` to arguments array after npx

### [07:30] SWITCHING TO REMOTE SERVER
Local Context7 installation failed with connection error. Switched to remote HTTP connection which worked more reliably.

**Key Timestamps:**
- [07:30](https://youtu.be/X7lgIa6guKg?t=450) - Connection error with local server
- [07:45](https://youtu.be/X7lgIa6guKg?t=465) - Technology is new, sometimes things don't work
- [07:53](https://youtu.be/X7lgIa6guKg?t=473) - Decision to use remote Context7 server instead
- [08:00](https://youtu.be/X7lgIa6guKg?t=480) - Copy remote server command with HTTP transport
- [08:17](https://youtu.be/X7lgIa6guKg?t=497) - Add `--scope project` flag to remote command
- [08:24](https://youtu.be/X7lgIa6guKg?t=504) - Paste command in terminal and execute
- [08:39](https://youtu.be/X7lgIa6guKg?t=519) - Check mcp.json: `type: "http"` and `url` for remote connection
- [08:55](https://youtu.be/X7lgIa6guKg?t=535) - Restart Claude Code to load new server

### [09:00] VERIFYING MCP CONNECTION
Use `/mcp` command in Claude Code to check server connection status. Successfully connected to Context7.

**Key Timestamps:**
- [09:00](https://youtu.be/X7lgIa6guKg?t=540) - Start Claude Code with `claude` command
- [09:03](https://youtu.be/X7lgIa6guKg?t=543) - Run `/mcp` to check server status
- [09:07](https://youtu.be/X7lgIa6guKg?t=547) - First attempt: Failed to connect
- [09:10](https://youtu.be/X7lgIa6guKg?t=550) - Press enter, reconnect to try again
- [09:14](https://youtu.be/X7lgIa6guKg?t=554) - Second attempt: Success with green checkmark
- [09:19](https://youtu.be/X7lgIa6guKg?t=559) - Context7 connected and ready to use

### [09:25] USING CONTEXT7 FOR DOCUMENTATION
First practical use of Context7: Checking Tailwind CSS documentation to verify theme variables configuration.

**Key Timestamps:**
- [09:25](https://youtu.be/X7lgIa6guKg?t=565) - Escape to command mode
- [09:28](https://youtu.be/X7lgIa6guKg?t=568) - Prompt: "Can you check the latest Tailwind docs to see if theme variables are correctly configured in the global CSS file? Use context7."
- [09:40](https://youtu.be/X7lgIa6guKg?t=580) - Reference specific file: `source:app/globals.css`
- [09:48](https://youtu.be/X7lgIa6guKg?t=588) - Important: Explicitly say "use context7" so Claude knows which MCP to use
- [09:56](https://youtu.be/X7lgIa6guKg?t=596) - Claude requests to use `resolve_library_id` tool from Context7
- [10:02](https://youtu.be/X7lgIa6guKg?t=602) - Additional tool usage request, press "yes" to approve
- [10:11](https://youtu.be/X7lgIa6guKg?t=611) - Result: "Looking at your Tailwind CSS configuration, your theme variables are correctly configured"
- [10:17](https://youtu.be/X7lgIa6guKg?t=617) - Verification: Everything properly structured

### [10:22] WHY USE CONTEXT7
AI models are trained on legacy code and may use outdated patterns. Context7 ensures implementations use current documentation.

**Key Timestamps:**
- [10:22](https://youtu.be/X7lgIa6guKg?t=622) - Best practice: Tell Claude Code to use Context7 when implementing features with third-party frameworks
- [10:26](https://youtu.be/X7lgIa6guKg?t=626) - AI often uses legacy code because trained on older data
- [10:33](https://youtu.be/X7lgIa6guKg?t=633) - Context7 ensures up-to-date documentation usage
- [10:41](https://youtu.be/X7lgIa6guKg?t=641) - Not just Claude Code - ALL AI tools/models can use legacy code
- [10:49](https://youtu.be/X7lgIa6guKg?t=649) - Add project memory to enforce Context7 usage

### [10:50] ADDING PROJECT MEMORY
Using Claude Code's memory feature to persist instructions for using Context7 when implementing new libraries or frameworks.

**Key Timestamps:**
- [10:50](https://youtu.be/X7lgIa6guKg?t=650) - Press `#` to add project memory
- [10:53](https://youtu.be/X7lgIa6guKg?t=653) - Memory text: "Use context7 to check up-to-date docs when needed for implementing new libraries or frameworks or adding features using them."
- [10:58](https://youtu.be/X7lgIa6guKg?t=658) - Press enter to save memory
- [11:04](https://youtu.be/X7lgIa6guKg?t=664) - Open memory file to verify addition at bottom
- [11:10](https://youtu.be/X7lgIa6guKg?t=670) - Memory successfully added to project

### [11:14] INSTALLING PLAYWRIGHT MCP
Installing Playwright MCP server for browser automation capabilities. Similar Windows-specific modifications required.

**Key Timestamps:**
- [11:14](https://youtu.be/X7lgIa6guKg?t=674) - Navigate to Playwright MCP page
- [11:19](https://youtu.be/X7lgIa6guKg?t=679) - Copy Claude Code command for Windows
- [11:32](https://youtu.be/X7lgIa6guKg?t=692) - Add `--scope project` flag
- [11:44](https://youtu.be/X7lgIa6guKg?t=704) - Add `cmd /c` for Windows compatibility
- [11:53](https://youtu.be/X7lgIa6guKg?t=713) - No `-y` flag needed for this particular server
- [11:58](https://youtu.be/X7lgIa6guKg?t=718) - Execute command, adds Playwright to mcp.json
- [12:03](https://youtu.be/X7lgIa6guKg?t=723) - Verify mcp.json: Context7 (http) and Playwright (stdio) both present
- [12:17](https://youtu.be/X7lgIa6guKg?t=737) - Restart Claude Code to load Playwright

### [12:22] TESTING PLAYWRIGHT CONNECTION
Verify both MCP servers are connected, then test Playwright by having Claude Code navigate to a website.

**Key Timestamps:**
- [12:22](https://youtu.be/X7lgIa6guKg?t=742) - Start Claude Code, use `/mcp` to check connections
- [12:25](https://youtu.be/X7lgIa6guKg?t=745) - Both servers showing with green checkmarks
- [12:31](https://youtu.be/X7lgIa6guKg?t=751) - Escape to command mode
- [12:38](https://youtu.be/X7lgIa6guKg?t=758) - Prompt: "Can you open a browser and navigate to netinja.dev and give me a summary of the site?"
- [12:45](https://youtu.be/X7lgIa6guKg?t=765) - Purpose: Demonstrate Playwright can navigate and provide feedback
- [12:54](https://youtu.be/X7lgIa6guKg?t=774) - Claude requests permission, press "yes"
- [12:58](https://youtu.be/X7lgIa6guKg?t=778) - Browser opens on second screen, visible at netinja.dev
- [13:03](https://youtu.be/X7lgIa6guKg?t=783) - Playwright browses the site automatically
- [13:08](https://youtu.be/X7lgIa6guKg?t=788) - Result: "Net Ninja is a comprehensive coding education platform created by Shaun, focused on web development training. The site positions itself as a coding dojo where aspiring developers become coding ninjas."
- [13:24](https://youtu.be/X7lgIa6guKg?t=804) - Additional extensive information provided

### [13:29] FUTURE UX TESTING WITH PLAYWRIGHT
Playwright's capabilities extend beyond simple navigation - can be used for UX feedback on components.

**Key Timestamps:**
- [13:29](https://youtu.be/X7lgIa6guKg?t=809) - Playwright can do more than navigation and summarization
- [13:33](https://youtu.be/X7lgIa6guKg?t=813) - Plan: Use Playwright to provide feedback on UX of components when viewed in browser
- [13:41](https://youtu.be/X7lgIa6guKg?t=821) - Next lesson: Creating custom sub-agent with Claude Code
- [13:43](https://youtu.be/X7lgIa6guKg?t=823) - Will use Playwright MCP from within sub-agent for UX testing

---

## Extracted Alpha (Key Insights)

### Core Concepts
- **MCP connects AI to the outside world** - Servers act as modular toolkits for Claude
- **Claude never touches external sources directly** - MCP server acts as intermediary
- **Supabase server lets Claude execute raw SQL** - Direct database interaction
- **Playwright grants Claude full browser automation** - Navigate, inspect, screenshot
- **Context7 prevents AI from using legacy syntax** - Ensures current documentation usage

### Installation & Configuration
- **Use project scope to share configs easily** - Team-wide configuration
- **Global scope applies servers to all projects** - Universal availability
- **Windows setup requires specific command line flags** - `cmd /c` prefix necessary
- **Manual JSON editing fixes Windows installation bugs** - Workaround for `-y` flag errors
- **Remote HTTP servers bypass local command issues** - Alternative when local fails

### Usage Patterns
- **Explicitly tell Claude which server to use** - Prevents ambiguity
- **Claude asks permission before executing tools** - Safety mechanism
- **AI defaults to legacy code without help** - Training on older data
- **Memory can enforce modern documentation usage** - Persistent best practices
- **Playwright can read and summarize websites visually** - Automated site analysis

### Technical Details
- **MCP standardizes how AI interacts with tools** - Consistent protocol
- **The ecosystem is new and occasionally unstable** - Early stage technology
- **Browser tools enable future automated UX testing** - Quality assurance automation
- **Servers extend Claude beyond the local codebase** - Breaking isolation boundaries
- **`cmd /c` is crucial for Windows users** - Shell execution wrapper
- **The `-y` flag often breaks on Windows** - Auto-accept prompt issues
- **Sub-agents can leverage MCP for specific tasks** - Composed AI workflows
- **MCP servers are essentially just plug-ins** - Modular extensibility

---

## Extracted Wisdom

### Summary
The Net Ninja explains MCP servers, enabling Claude Code to interact with external data, APIs, and browsers via Context 7 and Playright.

### Key Ideas

#### Architecture & Design
- MCP servers extend Claude Code's capabilities beyond the local codebase scope effectively now
- Model Context Protocol was designed by Anthropic to define external AI interactions clearly now
- Servers provide tools allowing models to interact with specific external data sources directly today
- The AI model directs the client to use tools provided by the server directly
- MCP servers act as intermediaries rather than direct connections from the client above about

#### Server Examples & Capabilities
- Supabase MCP server offers tools to list tables and execute SQL commands easily now
- Playright MCP server enables browser automation including navigation and taking screenshots automatically for you
- Context 7 MCP server provides up-to-date documentation for various frameworks and libraries via tools

#### Installation & Configuration
- Installation can be done locally on the computer or by connecting to remote servers
- Local installations use the command claude mcp add followed by the server name details
- Windows users often need to add cmd /c before the execution command string used
- The scope flag determines if the server is project local or global scope
- Project scope pushes the MCP configuration to remotes for team sharing and usage
- Global scope allows the MCP server to be used across all projects easily
- Local scope restricts the server usage to the specific current project directory only

#### Windows-Specific Challenges
- Windows users might encounter errors with the auto-accept defaults flag in npx commands
- A Windows workaround involves manually editing the arguments array in the JSON file config
- Remote servers use HTTP transport and require a specific URL for connection to work

#### Usage & Best Practices
- Connection errors can occur due to the newness of the technology and bugs
- The /mcp command in Claude Code checks the connection status of servers running
- Explicitly instructing Claude to use a specific server ensures correct tool selection occurs
- AI models often use legacy code because they were trained on older data
- Context 7 helps ensure code implementations use the most current documentation available online
- Claude Code has a memory feature to store persistent project instructions for use
- Playright can be used to audit and provide feedback on user experience designs
- Supabase MCP allows developers to analyze database tables and create new ones remotely
- The mcp.json file stores the configuration for project-level MCP servers in root

### Key Insights

#### Architectural Implications
- MCP transforms isolated AI coding environments into dynamic hubs connected to the web world
- Protocol standardization enables AI to seamlessly bridge the gap between code and infrastructure layers
- Browser automation through AI shifts testing from manual checks to automated intelligent audits today
- Accessing real-time documentation mitigates the risk of implementing deprecated or obsolete coding patterns safely
- Cross-platform compatibility issues highlight the growing pains of integrating AI with OS terminals now
- Scoping permissions for tools creates a flexible security model for team-based AI development work

#### Technical Architecture
- The architecture relies on the server acting as a secure proxy for external requests
- Troubleshooting installation bugs reveals the complexity of chaining command-line tools with AI interfaces here
- Persistent memory instructions allow developers to enforce best practices automatically during AI interactions effectively
- Context-aware tooling empowers AI to verify its own work against external authoritative sources found
- The ecosystem of MCP servers suggests a future where AI operates via specialized plugins mostly
- Remote server connections offer stability when local environment configurations prove too complex or buggy too

### Notable Quotes

> "MCP stands for model context protocol." — The Net Ninja

> "It was designed by Anthropic who made claude code." — The Net Ninja

> "Different MCP servers come with different tools to do different things." — The Net Ninja

> "You can think of an MCP as something you can essentially plug into claude code." — The Net Ninja

> "It's the MCP server that does that and then it provides claude code with the ability." — The Net Ninja

> "The context 7 MCP server provides tools to get up-to-date documentation from a lot of frameworks." — The Net Ninja

> "We can add them locally on our computer or by connecting to them remotely." — The Net Ninja

> "The cmd part opens the windows command line to run the command." — The Net Ninja

> "We can add them to three different scopes." — The Net Ninja

> "Project scope where the MCP setup gets pushed to remotes." — The Net Ninja

> "Global scope which is when the MCP is added globally to claude code." — The Net Ninja

> "If you're on a Mac, then you probably won't have to jump through any hoops." — The Net Ninja

> "Sometimes things can just not work and it might be a little while for things to level out." — The Net Ninja

> "That's not just claude code by the way that's any AI tool or model." — The Net Ninja

> "I'm going to paste in this memory that says use context 7 to check up to date docs." — The Net Ninja

> "Playright provides AI models with the tools to open a browser, navigate through web pages." — The Net Ninja

> "I'm going to ask Claude Code to maybe open a browser and navigate to netinja.dev." — The Net Ninja

> "I'd like to do is use Playright to give us feedback on the UX of components." — The Net Ninja

### Habits to Develop

#### Installation & Setup
- Always check if you are on Windows before running installation commands for MCP servers
- Use the project scope when adding MCP servers to share with the team members
- Manually edit the JSON file if the command line installation fails on Windows systems
- Use the /mcp command to verify server connections before starting your coding work

#### Usage Patterns
- Explicitly name the MCP server in prompts to ensure the correct tool is used
- Utilize the memory feature to enforce the use of up-to-date documentation tools always
- Switch to remote server connections if local installations prove buggy or unstable to use
- Reference specific files in prompts to give the AI the necessary context required
- Approve tool usage requests when the AI asks for permission to execute functions now

#### Configuration & Debugging
- Inspect the mcp.json file to understand how servers are configured in the project root
- Use npx commands carefully on Windows by adding the cmd /c prefix before them
- Avoid using the local scope if you want the configuration visible in the directory
- Restart the Claude Code application after adding new servers to ensure they load correctly
- Troubleshoot connection errors by trying to reconnect via the terminal interface command prompt

#### Advanced Usage
- Leverage browser automation tools to get summaries of external websites quickly and efficiently
- Instruct AI to verify configurations against official docs to prevent legacy code usage errors
- Check websites like pulsemcp.com to discover new and useful MCP servers for projects
- Remove the -y flag if the terminal throws an unknown option error on Windows
- Use the hash command to access the memory feature in Claude Code interface easily
- Keep an eye on the green tick indicator to confirm server connectivity status

### Key Facts

- MCP is an acronym for Model Context Protocol created by Anthropic recently
- Claude Code has a built-in command called claude mcp add for installation usage
- Windows requires the prefix cmd /c for npx commands in MCP servers often
- The mcp.json file stores project-level MCP server configurations in the root directory folder
- Context 7 is an MCP server that fetches up-to-date framework documentation online
- Playright is an MCP server that provides browser automation capabilities to AI models
- Supabase offers an MCP server to interact with databases via SQL commands directly
- Pulsemcp.com is a website where users can find lists of MCP servers available
- The -y flag in npx is used to auto-accept installation prompts automatically
- Claude Code supports project local and global scopes for server configuration settings
- Remote MCP servers use HTTP as the transport protocol for connections to clients
- Local MCP servers use standard input/output for communication with the client software application
- AI models are trained on legacy code and may use outdated patterns sometimes
- The Net Ninja is a comprehensive coding education platform focused on web development training
- Claude Code allows users to approve or deny tool usage requests during execution tasks
- The scope flag is used in the terminal to set configuration visibility levels
- Context 7 includes a tool called resolve_library_id for fetching documentation details efficiently
- Playright can navigate to web pages and take screenshots on behalf of the user
- MCP servers act as a bridge between the AI model and external APIs
- Claude Code is a new tool and may have bugs on Windows operating systems

### References & Technologies

**Core Technologies:**
- MCP (Model Context Protocol)
- Claude Code
- Anthropic

**MCP Servers:**
- Supabase MCP server
- Playright MCP server
- Context 7 MCP server

**Platforms & Tools:**
- pulsemcp.com
- GitHub
- npx
- Windows Command Line
- Tailwind CSS
- Net Ninja (netinja.dev)

**Languages & Protocols:**
- SQL
- mcp.json
- Bash
- Edge functions
- HTTP
- JSON
- globals.css
- Coding Dojo

### One-Sentence Takeaway

**MCP servers empower Claude Code to interact with external data and browsers dynamically.**

### Recommendations

#### For Setup & Configuration
1. Install the Context 7 server to ensure your code uses the latest documentation available
2. Use the Playright server to automate browser interactions and gather UX feedback data
3. Always configure MCP servers at the project scope for better team collaboration efforts
4. Add the cmd /c prefix when running MCP commands on Windows machines now
5. Check the mcp.json file if you encounter issues with server configurations settings

#### For Usage & Best Practices
6. Utilize the memory feature to remind Claude to use Context 7 for libraries
7. Browse pulsemcp.com to find new servers that extend Claude's functionality and power
8. Switch to a remote connection if local server installation proves too difficult today
9. Restart Claude Code after making changes to the MCP configuration files immediately please

#### For Development Workflows
10. Explicitly tell Claude which MCP server to use for specific tasks and jobs
11. Verify server connectivity with the /mcp command before starting your work session daily
12. Use MCP servers to bridge the gap between local code and external APIs now
13. Avoid relying on AI's internal knowledge for fast-changing frameworks by using Context 7
14. Troubleshoot Windows errors by removing the -y flag from npx commands used there

#### For Advanced Features
15. Grant permission when Claude requests to use a tool from an MCP server please
16. Use Playright to navigate websites and summarize their content for quick research tasks
17. Reference specific file paths in your prompts to give Claude precise context needed
18. Keep your MCP server configurations in version control for team consistency and safety
19. Leverage Supabase MCP to manage database schemas directly from the chat interface easily
20. Inspect the arguments array in the JSON file to fix Windows bugs found

---

*Document generated from Net Ninja OpenAI Codex Tutorial Video #9*
*Transcript processed with fabric patterns: extract_alpha, create_video_chapters, extract_wisdom*
