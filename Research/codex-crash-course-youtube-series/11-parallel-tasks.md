# Video #11: Running Tasks in Parallel

**Original Video:** [Running Tasks in Parallel - Net Ninja OpenAI Codex Tutorial](https://www.youtube.com/watch?v=Xt7BZYhJXkg)

## What You'll Learn

- How to run multiple Codex Cloud tasks in parallel simultaneously
- Understanding isolated containers for each parallel task
- Potential merge conflicts when running parallel tasks
- Asking Codex to suggest component ideas for refactoring
- Firing off multiple tasks from AI-generated suggestions
- Managing and reviewing parallel task results
- Benefits of cloud-based parallel execution
- Creating pull requests from parallel tasks
- Current state of local vs cloud Codex tools
- Best practices for AI coding assistance
- Avoiding over-reliance on AI tools
- Maintaining manual coding skills
- Pro tip prompt for parallelizing low-conflict tasks

---

## Video Chapters

### [00:00] SERIES RECAP
Overview of what has been covered in the Codex series so far: remote tasks in isolated containers, CLI local work, extension usage (local and remote), and GitHub PR review.

**Key Timestamps:**
- [00:00](https://youtu.be/Xt7BZYhJXkg?t=0) - Introduction and series recap
- [00:02](https://youtu.be/Xt7BZYhJXkg?t=2) - Codex cloud runs remote tasks in isolated containers
- [00:04](https://youtu.be/Xt7BZYhJXkg?t=4) - Codex CLI for local project work
- [00:06](https://youtu.be/Xt7BZYhJXkg?t=6) - Codex extension for local and remote triggering
- [00:08](https://youtu.be/Xt7BZYhJXkg?t=8) - Codex can review pull requests directly on GitHub
- [00:10](https://youtu.be/Xt7BZYhJXkg?t=10) - Before finishing, showing one of the big benefits of Codex Cloud
- [00:17](https://youtu.be/Xt7BZYhJXkg?t=17) - Covering Codex review of pull requests
- [00:21](https://youtu.be/Xt7BZYhJXkg?t=21) - Quick look at big benefit of using Codex Cloud
- [00:24](https://youtu.be/Xt7BZYhJXkg?t=24) - Main benefit: Fire off multiple tasks at once in parallel

### [00:24] PARALLEL TASKS INTRO
Introduction to running multiple tasks simultaneously in Codex Cloud. Each task gets its own isolated container.

**Key Timestamps:**
- [00:24](https://youtu.be/Xt7BZYhJXkg?t=24) - Big benefit: Multiple tasks running in parallel
- [00:25](https://youtu.be/Xt7BZYhJXkg?t=25) - Can fire off multiple tasks at once to run in parallel
- [00:28](https://youtu.be/Xt7BZYhJXkg?t=28) - Don't have to run one task at a time and wait
- [00:30](https://youtu.be/Xt7BZYhJXkg?t=30) - Can run four, five, or more tasks at one time
- [00:32](https://youtu.be/Xt7BZYhJXkg?t=32) - Each task has its own isolated container
- [00:36](https://youtu.be/Xt7BZYhJXkg?t=36) - Each task runs within its own isolated container
- [00:38](https://youtu.be/Xt7BZYhJXkg?t=38) - Each task has its own isolated container to run within
- [00:42](https://youtu.be/Xt7BZYhJXkg?t=42) - Tasks won't be stepping on each other's toes

**Pro tip (low-conflict parallelism prompt):**
Use this exact prompt in Codex before firing parallel tasks:
`suggest disjunct tasks (that can be done in parallel without merge conflict risk) to solve this issues…`

### [00:44] MERGE CONFLICT WARNINGS
Considerations for potential conflicts when merging parallel tasks that might edit the same lines of code.

**Key Timestamps:**
- [00:44](https://youtu.be/Xt7BZYhJXkg?t=44) - Only thing to think about: Possibility of conflict
- [00:47](https://youtu.be/Xt7BZYhJXkg?t=47) - Possibility of conflict when merging features
- [00:48](https://youtu.be/Xt7BZYhJXkg?t=48) - Possibility of conflict when merging a few features
- [00:50](https://youtu.be/Xt7BZYhJXkg?t=50) - Each task could edit the same lines of code theoretically
- [00:52](https://youtu.be/Xt7BZYhJXkg?t=52) - Possibility of conflict when merging features one after another
- [00:54](https://youtu.be/Xt7BZYhJXkg?t=54) - Each task could edit the same lines of code
- [00:57](https://youtu.be/Xt7BZYhJXkg?t=57) - Possibility much lower if tasks work on entirely different features
- [01:00](https://youtu.be/Xt7BZYhJXkg?t=60) - If tasks working on entirely different features, possibility much lower
- [01:02](https://youtu.be/Xt7BZYhJXkg?t=62) - Tasks working on different features reduces conflict risk

### [01:04] GENERATING UI IDEAS
Asking Codex to analyze the codebase and suggest three different reusable UI components as parallel tasks.

**Key Timestamps:**
- [01:04](https://youtu.be/Xt7BZYhJXkg?t=64) - Demo: Start by asking Codex a question
- [01:06](https://youtu.be/Xt7BZYhJXkg?t=66) - Paste in question prompt
- [01:08](https://youtu.be/Xt7BZYhJXkg?t=68) - "Can you look at the codebase and suggest three different reusable UI components we can make for the project as three different tasks on Codex?"
- [01:11](https://youtu.be/Xt7BZYhJXkg?t=71) - Suggest three different reusable UI components
- [01:12](https://youtu.be/Xt7BZYhJXkg?t=72) - Three different tasks on Codex
- [01:15](https://youtu.be/Xt7BZYhJXkg?t=75) - Hit the "Ask" button
- [01:17](https://youtu.be/Xt7BZYhJXkg?t=77) - Codex looks at project code
- [01:20](https://youtu.be/Xt7BZYhJXkg?t=80) - Codex comes up with three ideas
- [01:22](https://youtu.be/Xt7BZYhJXkg?t=82) - Pause recording while Codex does its work
- [01:25](https://youtu.be/Xt7BZYhJXkg?t=85) - Start up again when Codex sends answer
- [01:27](https://youtu.be/Xt7BZYhJXkg?t=87) - Pause while Codex analyzes codebase
- [01:28](https://youtu.be/Xt7BZYhJXkg?t=88) - Pausing recording while Codex works

### [01:33] REVIEWING COMPONENT IDEAS
Codex returns with three component ideas, each with its own button to start the task automatically.

**Key Timestamps:**
- [01:33](https://youtu.be/Xt7BZYhJXkg?t=93) - Recording started again, Codex finished
- [01:34](https://youtu.be/Xt7BZYhJXkg?t=94) - Codex finished and came up with three different ideas
- [01:35](https://youtu.be/Xt7BZYhJXkg?t=95) - Three different ideas generated
- [01:37](https://youtu.be/Xt7BZYhJXkg?t=97) - Each idea has its own little button
- [01:39](https://youtu.be/Xt7BZYhJXkg?t=99) - Button right here to start that task
- [01:41](https://youtu.be/Xt7BZYhJXkg?t=101) - Really nice feature
- [01:44](https://youtu.be/Xt7BZYhJXkg?t=104) - Codex generates a prompt for us
- [01:47](https://youtu.be/Xt7BZYhJXkg?t=107) - Generates prompt to make this particular component
- [01:49](https://youtu.be/Xt7BZYhJXkg?t=109) - First idea: Create a hero section component
- [01:51](https://youtu.be/Xt7BZYhJXkg?t=111) - First component idea revealed
- [01:55](https://youtu.be/Xt7BZYhJXkg?t=115) - Second idea: Create a blog card component for lists
- [01:57](https://youtu.be/Xt7BZYhJXkg?t=117) - Second component idea
- [01:59](https://youtu.be/Xt7BZYhJXkg?t=119) - Third idea: Tag inputs on form
- [02:02](https://youtu.be/Xt7BZYhJXkg?t=122) - Third component idea explained
- [02:04](https://youtu.be/Xt7BZYhJXkg?t=124) - Unique behavior with pills
- [02:06](https://youtu.be/Xt7BZYhJXkg?t=126) - Extract into tag input component
- [02:07](https://youtu.be/Xt7BZYhJXkg?t=127) - Refactoring suggestion
- [02:10](https://youtu.be/Xt7BZYhJXkg?t=130) - Could extract that into a tag input component

### [02:12] FIRING OFF TASKS
Clicking each button to fire off all three tasks concurrently. Tasks visible in dashboard running simultaneously.

**Key Timestamps:**
- [02:12](https://youtu.be/Xt7BZYhJXkg?t=132) - Fire off all tasks concurrently
- [02:14](https://youtu.be/Xt7BZYhJXkg?t=134) - Click on each one like that
- [02:18](https://youtu.be/Xt7BZYhJXkg?t=138) - Go back to dashboard
- [02:21](https://youtu.be/Xt7BZYhJXkg?t=141) - All three tasks visible in dashboard
- [02:23](https://youtu.be/Xt7BZYhJXkg?t=143) - All three tasks now right here
- [02:24](https://youtu.be/Xt7BZYhJXkg?t=144) - Working on each one independently
- [02:28](https://youtu.be/Xt7BZYhJXkg?t=168) - In its own container
- [02:30](https://youtu.be/Xt7BZYhJXkg?t=150) - All going on at once
- [02:32](https://youtu.be/Xt7BZYhJXkg?t=152) - Hard to do locally even with AI
- [02:34](https://youtu.be/Xt7BZYhJXkg?t=154) - Sure there would be ways to do it
- [02:36](https://youtu.be/Xt7BZYhJXkg?t=156) - Really easy to fire off three tasks all at once
- [02:39](https://youtu.be/Xt7BZYhJXkg?t=159) - Easy to fire off three tasks at once

### [02:42] CHECKING TASK RESULTS
Two tasks have finished. Can click on each to review code, create PRs, and preview locally.

**Key Timestamps:**
- [02:42](https://youtu.be/Xt7BZYhJXkg?t=162) - Two of them have finished
- [02:44](https://youtu.be/Xt7BZYhJXkg?t=164) - Click on one to take a look
- [02:45](https://youtu.be/Xt7BZYhJXkg?t=165) - Take a look at the code
- [02:47](https://youtu.be/Xt7BZYhJXkg?t=167) - Sometimes leaves snapshot of what it's done
- [02:50](https://youtu.be/Xt7BZYhJXkg?t=170) - Didn't really need snapshot this time
- [02:52](https://youtu.be/Xt7BZYhJXkg?t=172) - Just refactoring and putting in components
- [02:53](https://youtu.be/Xt7BZYhJXkg?t=173) - Refactoring work
- [02:55](https://youtu.be/Xt7BZYhJXkg?t=175) - Could go through code
- [02:56](https://youtu.be/Xt7BZYhJXkg?t=176) - Could create a PR for this
- [02:58](https://youtu.be/Xt7BZYhJXkg?t=178) - Could create PR
- [02:59](https://youtu.be/Xt7BZYhJXkg?t=179) - Go back over here
- [03:02](https://youtu.be/Xt7BZYhJXkg?t=182) - Look at this one
- [03:04](https://youtu.be/Xt7BZYhJXkg?t=184) - Was it this one or was it this one
- [03:06](https://youtu.be/Xt7BZYhJXkg?t=186) - Not quite sure which one
- [03:08](https://youtu.be/Xt7BZYhJXkg?t=188) - This one as well
- [03:11](https://youtu.be/Xt7BZYhJXkg?t=191) - Could create a PR for this one as well
- [03:13](https://youtu.be/Xt7BZYhJXkg?t=193) - Go back over here
- [03:14](https://youtu.be/Xt7BZYhJXkg?t=194) - Still working on this task
- [03:16](https://youtu.be/Xt7BZYhJXkg?t=196) - You get the point
- [03:17](https://youtu.be/Xt7BZYhJXkg?t=197) - Could go in there
- [03:19](https://youtu.be/Xt7BZYhJXkg?t=199) - Create a PR for that
- [03:22](https://youtu.be/Xt7BZYhJXkg?t=202) - Preview everything locally if wanted
- [03:24](https://youtu.be/Xt7BZYhJXkg?t=204) - In local workspace
- [03:26](https://youtu.be/Xt7BZYhJXkg?t=206) - Review code on GitHub
- [03:27](https://youtu.be/Xt7BZYhJXkg?t=207) - Merge it and all that kind of jazz

### [03:27] CLOUD TASK BENEFITS
Major benefits of Codex Cloud: spin up tasks from anywhere (phone, laptop), run in parallel, review later.

**Key Timestamps:**
- [03:27](https://youtu.be/Xt7BZYhJXkg?t=207) - One of really good things about Codex
- [03:30](https://youtu.be/Xt7BZYhJXkg?t=210) - Spin up tasks from anywhere
- [03:32](https://youtu.be/Xt7BZYhJXkg?t=212) - On phone, on laptop
- [03:33](https://youtu.be/Xt7BZYhJXkg?t=213) - When thought comes
- [03:35](https://youtu.be/Xt7BZYhJXkg?t=215) - Don't have to be in code
- [03:37](https://youtu.be/Xt7BZYhJXkg?t=217) - Different tasks running in parallel
- [03:39](https://youtu.be/Xt7BZYhJXkg?t=219) - Come back at later point in time
- [03:41](https://youtu.be/Xt7BZYhJXkg?t=221) - Review code, test it out
- [03:43](https://youtu.be/Xt7BZYhJXkg?t=223) - Merge into repo if want to
- [03:47](https://youtu.be/Xt7BZYhJXkg?t=227) - Finish series with words about Codex

### [03:48] LOCAL TOOL STATUS
Assessment of Codex local tools (CLI and extension): still work in progress, expected changes, rough experience.

**Key Timestamps:**
- [03:48](https://youtu.be/Xt7BZYhJXkg?t=228) - Finish series with words about Codex and Agentic coding
- [03:50](https://youtu.be/Xt7BZYhJXkg?t=230) - First: Using Codex locally with CLI tool and extension
- [03:52](https://youtu.be/Xt7BZYhJXkg?t=232) - Still very much a work in progress
- [03:55](https://youtu.be/Xt7BZYhJXkg?t=235) - Expect plenty of changes over next months
- [03:57](https://youtu.be/Xt7BZYhJXkg?t=237) - Experience could be smoothed out
- [04:00](https://youtu.be/Xt7BZYhJXkg?t=240) - Especially connection with cloud service
- [04:02](https://youtu.be/Xt7BZYhJXkg?t=242) - Definitely think experience could be smoothed out
- [04:04](https://youtu.be/Xt7BZYhJXkg?t=244) - Smoothing out especially when it comes to cloud service connection
- [04:06](https://youtu.be/Xt7BZYhJXkg?t=246) - Connection with cloud service
- [04:07](https://youtu.be/Xt7BZYhJXkg?t=247) - Experience could be smoothed out a little bit

### [04:08] CLOUD SELLING POINTS
Main advantages of Codex Cloud: spin up remote tasks from anywhere, multiple tasks and variations, work while you're not.

**Key Timestamps:**
- [04:08](https://youtu.be/Xt7BZYhJXkg?t=248) - Secondly: Codex Cloud
- [04:11](https://youtu.be/Xt7BZYhJXkg?t=251) - Main selling point for me
- [04:13](https://youtu.be/Xt7BZYhJXkg?t=253) - Spin up remote tasks from anywhere
- [04:15](https://youtu.be/Xt7BZYhJXkg?t=255) - Spin up multiple tasks as well
- [04:18](https://youtu.be/Xt7BZYhJXkg?t=258) - Don't have to be working on project locally
- [04:20](https://youtu.be/Xt7BZYhJXkg?t=260) - Could just do it from laptop on phone
- [04:22](https://youtu.be/Xt7BZYhJXkg?t=262) - When ideas hit me
- [04:23](https://youtu.be/Xt7BZYhJXkg?t=263) - Run multiple tasks
- [04:26](https://youtu.be/Xt7BZYhJXkg?t=266) - Multiple variations of those tasks
- [04:28](https://youtu.be/Xt7BZYhJXkg?t=268) - Get to work while I'm not working
- [04:30](https://youtu.be/Xt7BZYhJXkg?t=270) - Work while not working
- [04:32](https://youtu.be/Xt7BZYhJXkg?t=272) - Just review them when back at desk
- [04:34](https://youtu.be/Xt7BZYhJXkg?t=274) - Bring down to local workspace when back at desk
- [04:35](https://youtu.be/Xt7BZYhJXkg?t=275) - That's nice

### [04:37] CHECKING AI OUTPUT
Always check AI-generated work, stay in the loop, expect to iterate prompts multiple times.

**Key Timestamps:**
- [04:37](https://youtu.be/Xt7BZYhJXkg?t=277) - Third: No matter what AI tool or coding agent
- [04:39](https://youtu.be/Xt7BZYhJXkg?t=279) - Always check work it produces
- [04:42](https://youtu.be/Xt7BZYhJXkg?t=282) - Stay in the loop
- [04:44](https://youtu.be/Xt7BZYhJXkg?t=284) - AI can get things wrong
- [04:46](https://youtu.be/Xt7BZYhJXkg?t=286) - Sometimes takes three or four iterations
- [04:49](https://youtu.be/Xt7BZYhJXkg?t=289) - Three or four iterations of different prompts
- [04:51](https://youtu.be/Xt7BZYhJXkg?t=291) - Get results that I want
- [04:53](https://youtu.be/Xt7BZYhJXkg?t=293) - Much like nudging junior developer
- [04:55](https://youtu.be/Xt7BZYhJXkg?t=295) - Nudge junior developer in right direction
- [04:56](https://youtu.be/Xt7BZYhJXkg?t=296) - Few times if going off track

### [04:58] AVOID OVER-RELIANCE
Don't let AI atrophy your coding skills. Keep manual coding fresh. AI won't write all code - understanding remains key.

**Key Timestamps:**
- [04:58](https://youtu.be/Xt7BZYhJXkg?t=298) - Finally: Do not over rely on AI
- [05:00](https://youtu.be/Xt7BZYhJXkg?t=300) - Personally think really important
- [05:03](https://youtu.be/Xt7BZYhJXkg?t=303) - Keep manual coding skills
- [05:04](https://youtu.be/Xt7BZYhJXkg?t=304) - Knowledge of field fresh
- [05:06](https://youtu.be/Xt7BZYhJXkg?t=306) - Over reliance hamper that
- [05:08](https://youtu.be/Xt7BZYhJXkg?t=308) - Over reliance on AI to write all code
- [05:11](https://youtu.be/Xt7BZYhJXkg?t=311) - At start of 2025, experts predicted
- [05:13](https://youtu.be/Xt7BZYhJXkg?t=313) - By end of year AI would write virtually all code
- [05:16](https://youtu.be/Xt7BZYhJXkg?t=316) - Certainly doesn't feel true right now
- [05:18](https://youtu.be/Xt7BZYhJXkg?t=318) - Don't think going to be true over next several months
- [05:20](https://youtu.be/Xt7BZYhJXkg?t=320) - Even if AI does start writing all code
- [05:22](https://youtu.be/Xt7BZYhJXkg?t=322) - Should still understand code it generates
- [05:24](https://youtu.be/Xt7BZYhJXkg?t=324) - In order to review it
- [05:26](https://youtu.be/Xt7BZYhJXkg?t=326) - Debug it and adapt the code
- [05:30](https://youtu.be/Xt7BZYhJXkg?t=330) - Need to know how application works
- [05:32](https://youtu.be/Xt7BZYhJXkg?t=332) - For that reason
- [05:34](https://youtu.be/Xt7BZYhJXkg?t=334) - Continuing to code manually important
- [05:36](https://youtu.be/Xt7BZYhJXkg?t=336) - Learning new skills yourself important
- [05:40](https://youtu.be/Xt7BZYhJXkg?t=340) - Especially important these days
- [05:42](https://youtu.be/Xt7BZYhJXkg?t=342) - Learning new skills yourself especially important
- [05:44](https://youtu.be/Xt7BZYhJXkg?t=344) - Continuing to code manually
- [05:46](https://youtu.be/Xt7BZYhJXkg?t=346) - Especially important these days

### [05:47] OUTRO AND SPONSORSHIP
Series conclusion, call to action (share, subscribe, like), and Net Ninja Pro promotion.

**Key Timestamps:**
- [05:47](https://youtu.be/Xt7BZYhJXkg?t=347) - Really really hope you enjoyed series
- [05:49](https://youtu.be/Xt7BZYhJXkg?t=349) - Learned something along the way
- [05:51](https://youtu.be/Xt7BZYhJXkg?t=351) - If you did please please please don't forget
- [05:52](https://youtu.be/Xt7BZYhJXkg?t=352) - Share subscribe and like
- [05:54](https://youtu.be/Xt7BZYhJXkg?t=354) - Really means a lot
- [05:56](https://youtu.be/Xt7BZYhJXkg?t=356) - Want to access all YouTube courses without adverts
- [05:58](https://youtu.be/Xt7BZYhJXkg?t=358) - Also get premium courses
- [06:00](https://youtu.be/Xt7BZYhJXkg?t=360) - Early access courses as well
- [06:03](https://youtu.be/Xt7BZYhJXkg?t=363) - Can do at netinja.dev
- [06:05](https://youtu.be/Xt7BZYhJXkg?t=365) - Sign up for Net Ninja Pro
- [06:08](https://youtu.be/Xt7BZYhJXkg?t=368) - Just $9 a month
- [06:10](https://youtu.be/Xt7BZYhJXkg?t=370) - Half price first month with promo code
- [06:13](https://youtu.be/Xt7BZYhJXkg?t=373) - Access every course without YouTube adverts
- [06:16](https://youtu.be/Xt7BZYhJXkg?t=376) - Exclusive courses not found anywhere else
- [06:18](https://youtu.be/Xt7BZYhJXkg?t=378) - Premium courses on Udemy
- [06:20](https://youtu.be/Xt7BZYhJXkg?t=380) - Early access to YouTube courses
- [06:22](https://youtu.be/Xt7BZYhJXkg?t=382) - Link down below
- [06:24](https://youtu.be/Xt7BZYhJXkg?t=384) - Really hope enjoyed series
- [06:32](https://youtu.be/Xt7BZYhJXkg?t=392) - See you in very next one
- [06:40](https://youtu.be/Xt7BZYhJXkg?t=400) - Video end

---

## Extracted Alpha (Key Insights)

### Parallel Execution
- **Run multiple coding tasks in parallel now** - Cloud capability
- **Isolated containers stop tasks stepping on toes** - Safe concurrent execution
- **Conflicts are rare if features differ** - Reduced merge risk
- **Cloud makes parallel execution much easier** - Simplified workflow
- **Parallelism is the real cloud killer feature** - Major productivity boost
- **Container isolation ensures safe parallel processing** - Technical foundation
- **Treat tasks as independent background jobs** - Async mindset

### Workflow Benefits
- **Spawn remote tasks from your phone instantly** - Mobile development
- **Fire tasks from anywhere, not just code** - Location independence
- **Fire and forget tasks for later review** - Async development
- **Let AI code while you do nothing** - Passive productivity
- **Shift focus from writing to reviewing code** - Role evolution

### AI-Assisted Development
- **Ask AI to suggest tasks for you** - Intelligent planning
- **Extract reusable components via AI suggestions** - Refactoring help
- **AI spots refactoring opportunities you might miss** - Fresh perspective
- **Snapshots help verify what the agent did** - Transparency
- **Always review AI code before merging** - Quality control

### Best Practices & Philosophy
- **Treat AI like a junior needing guidance** - Mentorship approach
- **Expect to iterate prompts to get results** - Refinement required
- **Don't let AI atrophy your coding skills** - Maintain expertise
- **Understanding code is key to debugging it** - Foundation matters
- **You need manual skills to adapt code** - Essential capability

### Product Assessment
- **Local tools are still rough around edges** - Early stage
- **Predictions of AI writing all code are wrong** - Realistic outlook
- **Over-reliance risks skill degradation** - Important warning

---

## Key Learnings Summary

### Parallel Task Execution

**Core Concept:**
Codex Cloud's standout feature is the ability to run multiple tasks simultaneously in isolated containers. Each task operates independently without interfering with others.

**Benefits:**
- Run 4-5+ tasks at once instead of waiting sequentially
- Each task gets its own isolated container environment
- Can fire tasks from anywhere (phone, laptop) not just from code
- Tasks run while you're doing other things
- Review and merge results when convenient

**Considerations:**
- Potential merge conflicts if tasks edit same code lines
- Risk is lower when working on different features
- Still need to review each task's output

### AI-Assisted Component Suggestions

**Workflow:**
1. Ask Codex to analyze codebase and suggest reusable components
2. Codex generates task ideas with pre-written prompts
3. Each idea has a button to immediately start that task
4. Fire off multiple tasks concurrently
5. Review results, create PRs, preview locally

**Example Components:**
- Hero section component
- Blog card component for lists
- Tag input component (extracting unique pill behavior)

### Development Philosophy

**Local Tools Status:**
- CLI and extension still "very much work in progress"
- Expect changes over coming months
- Connection with cloud service needs smoothing
- Rough edges currently

**Cloud Advantages:**
- Main selling point: Spin up tasks from anywhere
- Run multiple tasks and variations simultaneously
- Work gets done while you're not working
- Review and integrate when back at desk

**AI Best Practices:**
- Always check AI-generated work
- Stay in the loop - don't blindly accept
- Expect 3-4 prompt iterations to get desired results
- Treat AI like a junior developer needing guidance
- Can get things wrong - review essential

**Maintaining Skills:**
- Don't over-rely on AI to write all code
- Keep manual coding skills fresh
- Continue learning new skills yourself
- Understanding code crucial for reviewing, debugging, adapting
- Early 2025 prediction of AI writing all code hasn't materialized
- Even if AI writes code, you need to understand it

### Practical Takeaways

**For Parallel Tasks:**
- Use AI to suggest component refactoring opportunities
- Fire off multiple tasks at once from suggestions
- Each task runs in isolated container
- Review code, create PRs, test locally
- Merge if satisfied

**For Workflow:**
- Spin up tasks from phone/laptop when ideas hit
- Let tasks run in background
- Come back later to review and integrate
- Preview in local workspace before merging

**For AI Usage:**
- Always review output before merging
- Expect to iterate prompts
- Stay actively involved in process
- Maintain manual coding skills
- Understanding remains essential

---

## Final Thoughts from Series

### Codex Assessment

**Local Tools (CLI & Extension):**
- Still early stage
- Rough around edges
- Cloud integration needs work
- Expected improvements coming

**Codex Cloud:**
- Main benefit: Parallel task execution
- Fire tasks from anywhere
- Multiple simultaneous tasks
- Work while you're not

### AI Coding Reality Check

**What Works:**
- Parallel execution in cloud
- AI suggestions for refactoring
- Component extraction ideas
- Remote task spawning

**What Doesn't:**
- AI writing all code (2025 prediction wrong)
- Perfect output on first try
- Complete replacement of developer skills

**Best Practices:**
- Always review AI work
- Stay in the loop
- Iterate prompts as needed
- Maintain manual coding skills
- Understanding code essential

### Future Outlook

**Expected Improvements:**
- Smoother local/cloud integration
- Better connection stability
- More features in extension
- Enhanced parallel task management

**Constant Principles:**
- Review before merging
- Keep skills fresh
- Understand generated code
- Stay actively involved

---

*Document generated from Net Ninja OpenAI Codex Tutorial Video #11*
*Transcript processed with fabric patterns: extract_alpha, create_video_chapters*
*Final video in the Codex Crash Course series*
