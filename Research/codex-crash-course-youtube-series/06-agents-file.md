# Video #6: Using the AGENTS.md File

**Original Video:** [Using the AGENTS.md file](https://www.youtube.com/watch?v=NlNuoH5PPl4)

## What You'll Learn

- What the agents.md file is and why it's important for AI coding agents
- How the agents.md file acts as a README specifically written for AI agents
- Understanding project structure documentation for agents
- How Codex automatically uses the agents.md file as context
- Comparing agents.md across different tools (Claude Code's claw.md, Copilot's instructions)
- The movement toward standardization with agents.md across AI coding tools
- Using the `/init` command to automatically generate agents.md files
- How Codex scans your codebase to infer coding styles and preferences
- Customizing the generated agents.md file for your specific project needs
- Committing agents.md to GitHub for Codex Cloud usage
- Maintaining and updating agents.md as your project evolves
- Preventing AI from using outdated methods by keeping agents.md current

---

## 🎯 Extracted Alpha Points

- [Think of agents.md as a readme for bots](https://youtu.be/NlNuoH5PPl4?t=20)
- [It helps agents slot into your workflow](https://youtu.be/NlNuoH5PPl4?t=30)
- [Codex automatically pulls this file into prompts](https://youtu.be/NlNuoH5PPl4?t=50)
- [It gives agents memory and project context](https://youtu.be/NlNuoH5PPl4?t=35)
- [Other tools use similar files like claw.md](https://youtu.be/NlNuoH5PPl4?t=40)
- [Agents.md is becoming a standard across tools](https://youtu.be/NlNuoH5PPl4?t=45)
- [Stop juggling files for different coding agents](https://youtu.be/NlNuoH5PPl4?t=50)
- [One file can work across multiple tools](https://youtu.be/NlNuoH5PPl4?t=52)
- [The init command scans your codebase automatically](https://youtu.be/NlNuoH5PPl4?t=125)
- [It scaffolds guidelines based on existing code](https://youtu.be/NlNuoH5PPl4?t=128)
- [It infers testing preferences and coding styles](https://youtu.be/NlNuoH5PPl4?t=130)
- [Sometimes it adds personal preferences you must edit](https://youtu.be/NlNuoH5PPl4?t=132)
- [Commit the file to your GitHub repository](https://youtu.be/NlNuoH5PPl4?t=140)
- [Cloud tasks require this file for context](https://youtu.be/NlNuoH5PPl4?t=145)
- [Keep the file in your project root](https://youtu.be/NlNuoH5PPl4?t=22)
- [It tells the agent how your codebase works](https://youtu.be/NlNuoH5PPl4?t=24)
- [Never create the file and then forget it](https://youtu.be/NlNuoH5PPl4?t=155)
- [Update the file as your project evolves](https://youtu.be/NlNuoH5PPl4?t=158)
- [Stale files make the agent go off track](https://youtu.be/NlNuoH5PPl4?t=162)
- [It prevents agents from using outdated methods](https://youtu.be/NlNuoH5PPl4?t=165)
- [Update it when you add new libraries](https://youtu.be/NlNuoH5PPl4?t=168)
- [It is crucial for maintaining long-term consistency](https://youtu.be/NlNuoH5PPl4?t=30)
- [Define exactly how you want them to code](https://youtu.be/NlNuoH5PPl4?t=28)
- [It acts as a little cheat sheet](https://youtu.be/NlNuoH5PPl4?t=32)

---

## 📺 Video Chapters

- **[00:00:00](https://youtu.be/NlNuoH5PPl4?t=0)** - WHAT IS AGENTS.MD
- **[00:00:20](https://youtu.be/NlNuoH5PPl4?t=20)** - PURPOSE OF FILE
- **[00:01:10](https://youtu.be/NlNuoH5PPl4?t=70)** - TOOL COMPARISON
- **[00:01:35](https://youtu.be/NlNuoH5PPl4?t=95)** - STANDARDIZATION GOALS
- **[00:02:00](https://youtu.be/NlNuoH5PPl4?t=120)** - RUNNING INIT COMMAND
- **[00:02:15](https://youtu.be/NlNuoH5PPl4?t=135)** - SCANNING CODEBASE
- **[00:02:40](https://youtu.be/NlNuoH5PPl4?t=160)** - REVIEWING STRUCTURE
- **[00:03:15](https://youtu.be/NlNuoH5PPl4?t=195)** - CODING STYLES
- **[00:03:50](https://youtu.be/NlNuoH5PPl4?t=230)** - COMMITTING TO GITHUB
- **[00:04:15](https://youtu.be/NlNuoH5PPl4?t=255)** - MAINTAINING FILE

---

## 💡 Extracted Wisdom

### Summary

The speaker explains the `agents.md` file for AI coding agents and demonstrates generating it using the Codex CLI tool.

### Key Ideas

- The [`agents.md` file](https://youtu.be/NlNuoH5PPl4?t=20) acts like a README but specifically for AI coding agents to read
- This file lives in the project root to help guide the AI agent's specific workflow
- It informs the agent about [codebase structure](https://youtu.be/NlNuoH5PPl4?t=24), build commands, and your preferred coding styles
- [Codex automatically uses this file](https://youtu.be/NlNuoH5PPl4?t=55) as context for any given task or prompt provided
- Other tools like Claude Code use similar files like [`claw.md`](https://youtu.be/NlNuoH5PPl4?t=40) for project instructions
- Copilot uses `copilot instructions.md` to achieve similar project-wide context goals for developers
- The [`agents.md` file aims to be a standard](https://youtu.be/NlNuoH5PPl4?t=45) across different AI coding tools today
- A unified file prevents juggling different instruction files for different AI coding agents
- The [`init` command](https://youtu.be/NlNuoH5PPl4?t=125) scans the codebase to scaffold the file automatically for you
- Codex infers guidelines like testing preferences and code styles from the project structure
- The generated file includes sections for [project structure and module organization](https://youtu.be/NlNuoH5PPl4?t=160) details
- It details specific locations for routes, layouts, and reusable UI components in the app
- The file lists building, testing, and development commands found in the project configuration
- It suggests [coding styles and naming conventions](https://youtu.be/NlNuoH5PPl4?t=195), such as using Pascal case for classes
- The file provides testing guidelines specifying exactly where to place new test files
- It also includes commit and pull request guidelines for maintaining consistency across teams
- You should [commit this file to GitHub](https://youtu.be/NlNuoH5PPl4?t=140) for remote Codex cloud tasks usage
- Codex cloud looks for this file to use as context for remote operations
- The file should be updated as the project evolves and changes over time
- New libraries or frameworks used should be added to the agents file immediately
- [Keeping the file updated](https://youtu.be/NlNuoH5PPl4?t=160) prevents the agent from using outdated or wrong methods
- The file serves as a cheat sheet for the AI to understand your preferences
- Standardization allows one file to work across multiple AI coding platforms effectively now
- The `init` command saves time by auto-generating the initial configuration for developers
- Manual review of the generated file is necessary to ensure accuracy and relevance
- The agent uses the file to slot into your specific coding workflow seamlessly

### Key Insights

- **Standardizing AI instruction files** creates interoperability between different coding tools and platforms
- **AI agents require explicit context** to function effectively within specific project environments
- **Automating documentation generation** bridges the gap between code and AI understanding capabilities
- **Treating AI configuration as code** ensures version control and team consistency standards
- **The future of development** involves maintaining a dialogue with AI via text files
- **Context injection** is a critical mechanism for enhancing AI performance and accuracy levels
- **Project evolution** necessitates dynamic updates to AI instruction sets to remain relevant
- **Unifying AI instruction protocols** reduces cognitive load for developers using multiple tools
- **AI agents function best** when provided with a structured map of the codebase
- **The `agents.md` file represents a shift** towards human-AI collaborative coding standards
- **Explicitly defining coding styles** helps AI maintain consistency with human-written code bases
- **The `init` command demonstrates** the capability of AI to analyze and infer patterns

### Notable Quotes

> "think of an agents file as a bit like a readme but instead of being written for humans it's written for the coding agents" - [00:12](https://youtu.be/NlNuoH5PPl4?t=12)

> "it tells the one of those commands was the init command which generates an agents.md file for us in this project." - [00:08](https://youtu.be/NlNuoH5PPl4?t=8)

> "it lives in your project, usually in the root folder, and it tells the agent how your codebase works" - [00:18](https://youtu.be/NlNuoH5PPl4?t=18)

> "what commands it should use to build and test things, what coding styles you prefer, how your project is structured" - [00:20](https://youtu.be/NlNuoH5PPl4?t=20)

> "It's basically like a little cheat sheet that helps the agent slot into your workflow and code" - [00:26](https://youtu.be/NlNuoH5PPl4?t=26)

> "And whenever you ask Codeex to do something either locally or on Codex cloud, it's going to look for that file" - [00:32](https://youtu.be/NlNuoH5PPl4?t=32)

> "it's going to use any information inside that file as context within your prompts and any task that you give it." - [00:34](https://youtu.be/NlNuoH5PPl4?t=34)

> "If you've used any other AI coding agents like Claude Code or Copilot, you have probably seen similar kinds of files" - [00:36](https://youtu.be/NlNuoH5PPl4?t=36)

> "In Clawed Code, we use a claw.md file for projectwide instructions." - [00:39](https://youtu.be/NlNuoH5PPl4?t=39)

> "And in copilot, we use a copilot instructions markdown file for the same kind of uh stuff." - [00:40](https://youtu.be/NlNuoH5PPl4?t=40)

> "And these all serve a similar purpose, right? In that they give each agent memory and concise project context." - [00:43](https://youtu.be/NlNuoH5PPl4?t=43)

> "Where they differ is that the agents.mmd file is being pushed as a standard across different AI coding tools." - [00:46](https://youtu.be/NlNuoH5PPl4?t=46)

> "so that instead of juggling these different files for different coding agents, the idea is that we can have just a unified agents file" - [00:50](https://youtu.be/NlNuoH5PPl4?t=50)

> "So let's head back to the code then and use the codec cli to scaffold an agents file for us." - [01:22](https://youtu.be/NlNuoH5PPl4?t=82)

> "And when we use this command, codeex is automatically going to scan the codebase and scaffold the file for us" - [01:24](https://youtu.be/NlNuoH5PPl4?t=84)

> "Sometimes it might add its own personal preferences as well. So you have to rein those in a little bit" - [01:27](https://youtu.be/NlNuoH5PPl4?t=87)

> "it's written some fairly comprehensive guidelines. It's a little lean, but you can always add to this later." - [01:38](https://youtu.be/NlNuoH5PPl4?t=98)

> "So for example, the project structure and module organization talks about where different things live." - [01:40](https://youtu.be/NlNuoH5PPl4?t=100)

> "basically this is all generic stuff but all it's doing is looking at our current uh project as it is" - [01:49](https://youtu.be/NlNuoH5PPl4?t=109)

> "probably commit this agents file to your GitHub repository if you want the Codex cloud to use it" - [01:52](https://youtu.be/NlNuoH5PPl4?t=112)

> "whenever you ask it to do something on the cloud it's going to look for this file automatically" - [01:54](https://youtu.be/NlNuoH5PPl4?t=114)

> "by the way, this file isn't something you should just create and forget about." - [02:08](https://youtu.be/NlNuoH5PPl4?t=128)

> "As your project changes and evolves, you should update your agent file as well" - [02:10](https://youtu.be/NlNuoH5PPl4?t=130)

> "Because if you don't keep the file up to date, then codeex might go off track" - [02:12](https://youtu.be/NlNuoH5PPl4?t=132)

### Recommended Habits

- Use the `init` command to generate the initial agents file for new projects
- Review the auto-generated agents file for accuracy and remove unwanted AI preferences
- Commit the agents file to the repository for cloud task consistency
- Update the agents file when introducing new libraries or frameworks to projects
- Modify the agents file if the project structure changes significantly over time
- Keep the agents file in sync with the actual codebase structure
- Use the agents file to enforce specific coding styles and conventions strictly
- Define build and test commands clearly within the agents file for reference
- Add specific commit guidelines to the agents file for better team alignment
- Treat the agents file as a living document for the project lifecycle
- Ensure the agents file is placed in the root of the project directory
- Use the agents file to explain complex module organization to the AI agent
- Regularly check that the AI follows the instructions in the file correctly
- Add testing locations and procedures to the agents file for guidance
- Use the agents file to standardize prompts across different team members involved

### Key Facts

- The Codex CLI tool includes an `init` command for generating configuration files
- The `agents.md` file is designed to be read by AI coding agents
- Codex automatically scans the codebase to infer project details for the file
- The file typically resides in the root directory of the project folder
- Claude Code uses a `claw.md` file for similar project instructions setup
- Copilot uses a `copilot instructions.md` file for agent configuration purposes
- The `agents.md` standard aims to unify configuration across different coding tools
- Codex uses the file content as context for every prompt and task
- The generated file includes sections for project structure and commands details
- It also includes coding style, naming conventions, and testing guidelines sections
- Committing the file to GitHub enables Codex cloud to access it remotely
- The file must be updated manually when the project evolves significantly
- Outdated agents files can cause the AI to perform incorrect actions
- The `init` command requires user approval for certain actions during generation
- The file helps agents understand build, test, and development workflows clearly

### References

- Codex CLI tool
- `init` command
- `agents.md` file
- Claude Code
- `claw.md`
- Copilot
- `copilot instructions.md`
- GitHub
- Codex cloud
- App folder
- Route segments
- Layout
- Global CSS file
- UI components
- Test folder
- Pascal case

### Recommendations

- Generate an `agents.md` file using the Codex CLI `init` command immediately
- Place the `agents.md` file in the root directory of your project
- Commit the `agents.md` file to your GitHub repository for backup
- Review the auto-generated content to ensure it matches your project preferences
- Update the file whenever you change your project structure or layout
- Add specific instructions for new libraries to the agents file manually
- Use the file to enforce consistent coding styles across the project
- Document the location of test files within the agents file clearly
- Include build and test commands for the AI to reference easily
- Keep the file updated to prevent the AI from using outdated methods
- Use the standard `agents.md` format for better tool interoperability benefits
- Leverage the file to reduce repetitive prompting of the AI agent
- Define pull request guidelines within the file for team consistency
- Treat the file as part of your source code management process
- Use the file to explain the architecture of complex applications to AI

---

*Document generated from Net Ninja OpenAI Codex Tutorial Video #6*
