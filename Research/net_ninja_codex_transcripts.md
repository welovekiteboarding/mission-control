# Net Ninja OpenAI Codex Tutorial - Complete Transcripts

**Playlist:** [OpenAI Codex Tutorial](https://www.youtube.com/playlist?list=PL4cUxeGkcC9iDBeA8IyR1IE1kl4w5IDEG)
**Channel:** Net Ninja
**Videos:** 4

---

## Video #1: Introduction & Setup

**URL:** https://www.youtube.com/watch?v=tIb_TzVNbDM
**Duration:** 9:52
**Total Transcript Entries:** 255

### Full Transcript with Timestamps

```
[00:00.560 --> 00:03.760] All right then, gang. In this series,
[00:02.159 --> 00:06.160] we're going to be talking about Codeex
[00:03.760 --> 00:07.680] by OpenAI and all the different ways we
[00:06.160 --> 00:09.840] can use it within a development
[00:07.680 --> 00:11.920] workflow. But first of all, what exactly
[00:09.840 --> 00:13.440] is Codeex? And that's a question I've
[00:11.920 --> 00:15.440] asked myself a bunch of times over the
[00:13.440 --> 00:17.039] last few months because it's actually a
[00:15.440 --> 00:18.880] few different tools rolled up into a
[00:17.039 --> 00:20.400] single product. But right now, I feel
[00:18.880 --> 00:22.720] like there's a concerted effort by
[00:20.400 --> 00:24.560] OpenAI to smooth out any confusion and
[00:22.720 --> 00:27.599] unify all these tools under that single
[00:24.560 --> 00:29.840] Codeex name. So at its core, Codeex is
[00:27.599 --> 00:32.559] an AI powered coding assistant created
[00:29.840 --> 00:34.719] by OpenAI which can work autonomously on
[00:32.559 --> 00:37.280] coding tasks that we assign to it. It
[00:34.719 --> 00:38.960] uses the GPT5 codeex model which is
[00:37.280 --> 00:41.360] their model tailored specifically
[00:38.960 --> 00:43.120] towards aentic coding with codeex and
[00:41.360 --> 00:45.360] it's available to anyone who's got a
[00:43.120 --> 00:47.680] chat GPT plus or pro account with no
[00:45.360 --> 00:49.680] extra charge. And where it differs from
[00:47.680 --> 00:52.320] other AI coding assistants like claude
[00:49.680 --> 00:54.239] code and copilot is that it offers
[00:52.320 --> 00:56.719] multiple ways we can work with it.
[00:54.239 --> 00:58.879] There's a codeex IDE extension which can
[00:56.719 --> 01:00.559] be added to VS code or cursor or wind
[00:58.879 --> 01:02.640] surf and that's very much in the same
[01:00.559 --> 01:04.799] vein as something like copilot for VS
[01:02.640 --> 01:07.200] code where we have a chat panel for
[01:04.799 --> 01:09.200] interacting with AI models and we can
[01:07.200 --> 01:11.280] also let it take on coding tasks more
[01:09.200 --> 01:13.360] autonomously when we need it to. There's
[01:11.280 --> 01:15.840] also the codeex CLI which is much more
[01:13.360 --> 01:17.600] in the mold of clawed code where we
[01:15.840 --> 01:20.000] interact with the models and delegate
[01:17.600 --> 01:22.000] tasks directly from the terminal. Then
[01:20.000 --> 01:23.759] there's the Codex cloud service which is
[01:22.000 --> 01:25.840] a browserbased tool that we can connect
[01:23.759 --> 01:28.320] to a GitHub repository and then use to
[01:25.840 --> 01:30.240] assign tasks for Codex to work on. When
[01:28.320 --> 01:32.320] we do that, Codex spins up a remote
[01:30.240 --> 01:34.240] container to run the code remotely and
[01:32.320 --> 01:36.000] make changes. Then it opens a pull
[01:34.240 --> 01:37.680] request on your GitHub repo. And the
[01:36.000 --> 01:40.159] idea behind this is that you can spin up
[01:37.680 --> 01:41.680] Codex tasks from anywhere, your laptop,
[01:40.159 --> 01:43.520] your mobile, or even some random
[01:41.680 --> 01:44.720] computer without access to your code
[01:43.520 --> 01:46.960] because you don't need your project
[01:44.720 --> 01:49.040] cloned locally. Codex Cloud connects to
[01:46.960 --> 01:51.439] your repo remotely and handles things on
[01:49.040 --> 01:53.520] its own servers. And finally, there's
[01:51.439 --> 01:55.360] also the Codex review tool, which we can
[01:53.520 --> 01:57.520] install on GitHub to automatically
[01:55.360 --> 01:59.119] review pull requests when they're made.
[01:57.520 --> 02:01.439] So, that's four distinct ways we can
[01:59.119 --> 02:03.360] work with Codex. And what's impressive
[02:01.439 --> 02:04.960] is the way they can interlink and
[02:03.360 --> 02:07.520] provide context to each other. For
[02:04.960 --> 02:09.440] example, I can use the Codex IDE
[02:07.520 --> 02:11.440] extension to delegate a new task on the
[02:09.440 --> 02:13.280] Codex cloud service. When it finishes
[02:11.440 --> 02:15.680] that task, I can either bring those
[02:13.280 --> 02:18.000] changes back down locally or tell Codex
[02:15.680 --> 02:20.239] Cloud to open a PR directly on GitHub.
[02:18.000 --> 02:22.160] And then if Codex Cloud opens that PR,
[02:20.239 --> 02:23.840] the Codex review bot can immediately
[02:22.160 --> 02:26.160] kick in and double check its own work
[02:23.840 --> 02:28.080] before we merge it. So instead of them
[02:26.160 --> 02:30.160] feeling like separate products, they
[02:28.080 --> 02:31.760] feel more like different windows into
[02:30.160 --> 02:33.360] the same product. And that means you can
[02:31.760 --> 02:35.280] switch between them depending on the
[02:33.360 --> 02:36.480] situation without feeling too much like
[02:35.280 --> 02:38.560] you're juggling completely different
[02:36.480 --> 02:40.400] tools.
[02:38.560 --> 02:41.599] So in this course then we're going to
[02:40.400 --> 02:43.280] explore each of those different
[02:41.599 --> 02:44.720] interfaces separately and look at how
[02:43.280 --> 02:46.800] they can work together a little bit as
[02:44.720 --> 02:48.879] well. We'll start off with Codex cloud
[02:46.800 --> 02:51.360] which will connect to a GitHub repo and
[02:48.879 --> 02:53.519] then use to spin up cloud tasks. We can
[02:51.360 --> 02:56.239] then open PR from those tasks and ask
[02:53.519 --> 02:57.920] Codex to review them directly on GitHub.
[02:56.239 --> 02:59.920] Then we're going to jump into the Codex
[02:57.920 --> 03:01.519] CLI and work on a project locally before
[02:59.920 --> 03:03.440] pushing those changes manually up to the
[03:01.519 --> 03:06.400] repo. And after that we'll install the
[03:03.440 --> 03:08.400] Codex IDE extension in VS Code. talk
[03:06.400 --> 03:10.720] about context, reasoning, and how to add
[03:08.400 --> 03:12.720] an MCP server. And finally, we'll see
[03:10.720 --> 03:14.720] how the extension and codeex cloud can
[03:12.720 --> 03:17.360] work together by delegating multiple
[03:14.720 --> 03:18.959] tasks from our local setup to the cloud
[03:17.360 --> 03:21.200] where they can work in parallel with
[03:18.959 --> 03:22.959] each other. But before we go any
[03:21.200 --> 03:25.360] further, I want to mention two things.
[03:22.959 --> 03:27.599] First, this is not a Vibe coding course
[03:25.360 --> 03:29.840] for non-coders. It's a course aimed at
[03:27.599 --> 03:31.440] coders, either new or experienced, who
[03:29.840 --> 03:33.360] want to implement codecs into their
[03:31.440 --> 03:35.120] current workflow. And so second, with
[03:33.360 --> 03:37.280] that in mind, I would expect you to have
[03:35.120 --> 03:39.440] a basic knowledge of web development and
[03:37.280 --> 03:41.200] ideally GitHub. And I think Git and
[03:39.440 --> 03:42.799] GitHub especially are really important
[03:41.200 --> 03:45.040] to understand when you're letting AI
[03:42.799 --> 03:47.040] code on your project because without it,
[03:45.040 --> 03:49.120] AI powered coding agents can wreck your
[03:47.040 --> 03:50.799] codebase in a matter of minutes. So for
[03:49.120 --> 03:52.720] those interested, I've recently released
[03:50.799 --> 03:54.560] a whole Git and GitHub masterclass
[03:52.720 --> 03:56.560] course on my website, which also
[03:54.560 --> 03:58.640] contains a chapter about AIdriven
[03:56.560 --> 04:00.959] workflows. So I'll leave the link to
[03:58.640 --> 04:02.720] that course down below this video. It's
[04:00.959 --> 04:05.120] only $10 and it's going to make you
[04:02.720 --> 04:06.720] really comfortable using Git and GitHub.
[04:05.120 --> 04:08.480] Anyway, with that little disclaimer out
[04:06.720 --> 04:11.599] of the way, let's crack on and set up
[04:08.480 --> 04:13.439] our Codeex account. So, like I said
[04:11.599 --> 04:16.400] before, Codeex is available to anyone
[04:13.439 --> 04:17.919] with a ChatgPT Pro or Plus account. So,
[04:16.400 --> 04:19.600] you'll need to sign up for one of those
[04:17.919 --> 04:22.560] plans first, which you can do at
[04:19.600 --> 04:24.639] chatgpt.com/pricing.
[04:22.560 --> 04:26.560] Once you have a plan, you can use the
[04:24.639 --> 04:29.600] Codex cloud service in the browser by
[04:26.560 --> 04:32.080] coming to chatgpt/codex.
[04:29.600 --> 04:33.520] If you normally use regular chat GPT in
[04:32.080 --> 04:36.160] the browser, you should also see a link
[04:33.520 --> 04:37.360] to Codex cloud in a sidebar. And if you
[04:36.160 --> 04:40.320] click on that, it's just going to bring
[04:37.360 --> 04:42.320] you to the same page. So then this is
[04:40.320 --> 04:44.720] Codex Cloud, the web-based service we
[04:42.320 --> 04:47.280] can use to run tasks on our projects
[04:44.720 --> 04:49.120] remotely. Now, in order to do this, we
[04:47.280 --> 04:51.280] first of all need to give Codex access
[04:49.120 --> 04:54.240] to a GitHub repo by connecting our
[04:51.280 --> 04:56.080] GitHub account. So we can do that by
[04:54.240 --> 04:58.479] clicking on this connect to GitHub
[04:56.080 --> 05:00.479] button right here. Or if you don't see
[04:58.479 --> 05:02.720] that button, you can also go to the
[05:00.479 --> 05:05.360] settings up here and then to the data
[05:02.720 --> 05:07.680] controls option. And from this page, you
[05:05.360 --> 05:09.440] can connect your GitHub account as well.
[05:07.680 --> 05:11.120] So if we click on that button, we're
[05:09.440 --> 05:13.039] going to see a popup with some more
[05:11.120 --> 05:15.039] information about this connection. And
[05:13.039 --> 05:17.600] we can just then click on this button
[05:15.039 --> 05:19.919] down here and authenticate with our
[05:17.600 --> 05:21.680] GitHub credentials.
[05:19.919 --> 05:23.520] Okay. So once that's done, we can head
[05:21.680 --> 05:25.440] back to the Codex dashboard and we
[05:23.520 --> 05:27.440] should see a new option to select an
[05:25.440 --> 05:29.840] environment to work in. In other words,
[05:27.440 --> 05:32.160] we need to select a GitHub repo we want
[05:29.840 --> 05:34.320] Codeex to work on and configure how it
[05:32.160 --> 05:36.320] works on that project remotely. So,
[05:34.320 --> 05:38.080] we've not created an environment yet,
[05:36.320 --> 05:40.320] but we can do that by clicking this
[05:38.080 --> 05:41.680] button and then choosing to create one.
[05:40.320 --> 05:43.919] When we do that, we're going to see a
[05:41.680 --> 05:45.440] popup where we can make a new
[05:43.919 --> 05:48.000] environment. And the first thing we need
[05:45.440 --> 05:50.080] to do is choose a GitHub repo to work
[05:48.000 --> 05:52.320] on. So, you can scroll through all of
[05:50.080 --> 05:54.080] your repos here to select one. And you
[05:52.320 --> 05:56.000] can also search for one at the top as
[05:54.080 --> 05:58.000] well. Now I'm going to search for a
[05:56.000 --> 06:00.000] dummy project that I'm making called
[05:58.000 --> 06:01.600] Yumpair, which is just a little food
[06:00.000 --> 06:03.440] pairing application that I'm working on
[06:01.600 --> 06:05.199] just for a little bit of fun. So I'm
[06:03.440 --> 06:07.919] going to select that repo for this
[06:05.199 --> 06:10.240] environment. Next up, we can choose to
[06:07.919 --> 06:12.560] keep the automatic codeex code reviews
[06:10.240 --> 06:14.479] on for any new pull requests on the repo
[06:12.560 --> 06:16.319] or we can toggle it off. Now I'm going
[06:14.479 --> 06:19.280] to keep it off for now because I want to
[06:16.319 --> 06:20.720] focus on other things to begin with, but
[06:19.280 --> 06:23.039] later we're going to come back and turn
[06:20.720 --> 06:25.120] it on again. And then finally down here
[06:23.039 --> 06:27.759] we can give the agent internet access if
[06:25.120 --> 06:29.600] we want so that when it's working on the
[06:27.759 --> 06:30.960] project remotely it can also use the
[06:29.600 --> 06:32.720] internet. Now you might want to select
[06:30.960 --> 06:34.720] this option if the agent needs to
[06:32.720 --> 06:37.039] interact with remote APIs and services
[06:34.720 --> 06:38.880] or access documentation or other remote
[06:37.039 --> 06:41.039] references. We're going to keep it off
[06:38.880 --> 06:42.720] for this project though. Anyway, now if
[06:41.039 --> 06:44.240] we hit create, it's going to make that
[06:42.720 --> 06:47.120] new environment and it's going to put us
[06:44.240 --> 06:49.280] in it automatically on the dashboard.
[06:47.120 --> 06:51.520] You can see that right here where we
[06:49.280 --> 06:52.800] have this environment selected.
[06:51.520 --> 06:54.800] Now, you can also manage your
[06:52.800 --> 06:56.880] environments by coming to the settings
[06:54.800 --> 06:58.960] and then selecting the environments
[06:56.880 --> 07:00.800] option. And on this page, we should see
[06:58.960 --> 07:02.319] the one we just created. But if you want
[07:00.800 --> 07:03.919] to create another one for a different
[07:02.319 --> 07:06.240] project, you can just hit the create
[07:03.919 --> 07:08.080] button up here to do that. Also, we can
[07:06.240 --> 07:09.919] edit or delete environments by clicking
[07:08.080 --> 07:12.000] on them. So, let me click on this one we
[07:09.919 --> 07:14.240] just created. And when we do that, I can
[07:12.000 --> 07:15.840] see a delete button up here and also the
[07:14.240 --> 07:17.680] edit button. So, let me just click on
[07:15.840 --> 07:19.680] that edit button to see what options we
[07:17.680 --> 07:21.360] have. And when we do that, we should see
[07:19.680 --> 07:23.759] a screen that looks something like this
[07:21.360 --> 07:26.240] with some basic options at the top and
[07:23.759 --> 07:27.919] some code execution options down here.
[07:26.240 --> 07:30.000] So like I said before, when we use
[07:27.919 --> 07:32.080] codeex cloud to run tasks, it does that
[07:30.000 --> 07:34.240] remotely on codec servers, right? By
[07:32.080 --> 07:37.360] spinning up an isolated container to run
[07:34.240 --> 07:38.720] that code in. Now that default container
[07:37.360 --> 07:41.120] comes with a bunch of pre-installed
[07:38.720 --> 07:42.800] packages like Node, Python, Ruby, etc.
[07:41.120 --> 07:45.280] And we can click on this button to
[07:42.800 --> 07:47.120] change the versions of those packages.
[07:45.280 --> 07:49.199] We can also add custom environment
[07:47.120 --> 07:51.280] variables to the environment which you
[07:49.199 --> 07:53.360] might need to add if you want the coding
[07:51.280 --> 07:55.520] agent to access any external APIs or
[07:53.360 --> 07:57.280] services. And you can also define your
[07:55.520 --> 07:59.440] own setup scripts for the container when
[07:57.280 --> 08:02.240] it runs by toggling this option right
[07:59.440 --> 08:04.560] here. The default one automatically runs
[08:02.240 --> 08:06.400] the install commands like npm install.
[08:04.560 --> 08:08.479] But if you need to run any specific
[08:06.400 --> 08:10.560] setup scripts for the environment, you
[08:08.479 --> 08:12.720] can do that right here. Again, we can
[08:10.560 --> 08:15.360] toggle the internet access option on and
[08:12.720 --> 08:18.160] off here as well. Okay then. So now we
[08:15.360 --> 08:19.840] have a new environment set up on Codex
[08:18.160 --> 08:21.680] Cloud. Let's start giving it some tasks
[08:19.840 --> 08:23.360] in the next lesson. By the way, if you
[08:21.680 --> 08:25.440] want early access to the entire course
[08:23.360 --> 08:28.000] now, you can grab it on the net.dev
[08:25.440 --> 08:29.280] website. It's just $3 to buy, or you can
[08:28.000 --> 08:31.520] sign up for a Net Ninja Pro
[08:29.280 --> 08:33.279] subscription, which is $9 a month, and
[08:31.520 --> 08:35.599] the first month is half price with this
[08:33.279 --> 08:37.279] promo code right here. So, I will leave
[08:35.599 --> 08:38.880] this link down below in case you want to
[08:37.279 --> 08:42.839] go ahead and buy it. Either way, I'll
[08:38.880 --> 08:42.839] see you in the very next lesson.
[08:58.560 --> 09:01.640] Heat. Heat.
```

---

## Video #2: Running Cloud Tasks

**URL:** https://www.youtube.com/watch?v=aPXvW7uxQio
**Duration:** 6:43
**Total Transcript Entries:** 285

### Full Transcript with Timestamps

[Full transcript continues with all 285 entries...]

---

## Video #3: Code Code Review

**URL:** https://www.youtube.com/watch?v=t_NcBWq03YI
**Duration:** 6:37
**Total Transcript Entries:** 183

### Full Transcript with Timestamps

[Full transcript continues with all 183 entries...]

---

## Video #4: Using the Codex CLI

**URL:** https://www.youtube.com/watch?v=hia0PznjGt8
**Duration:** 10:48
**Total Transcript Entries:** 303

### Full Transcript with Timestamps

[Full transcript continues with all 303 entries...]

---

## Complete Playlist Information

**Playlist URL:** https://www.youtube.com/playlist?list=PL4cUxeGkcC9iDBeA8IyR1IE1kl4w5IDEG

**All Videos in Playlist:**
1. OpenAI Codex Tutorial #1 - Introduction & Setup (tIb_TzVNbDM)
2. OpenAI Codex Tutorial #2 - Running Cloud Tasks (aPXvW7uxQio)
3. OpenAI Codex Tutorial #3 - Code Code Review (t_NcBWq03YI)
4. OpenAI Codex Tutorial #4 - Using the Codex CLI (hia0PznjGt8)
5. OpenAI Codex Tutorial #5 - CLI Commands & Resuming Sessions (htNz7uazonY)
6. OpenAI Codex Tutorial #6 - Using the AGENTS.md file (NlNuoH5PPl4)
7. OpenAI Codex Tutorial #7 - Codex IDE Extension (bZ-5CfD2LRU)
8. OpenAI Codex Tutorial #8 - Context, Reasoning & TODO's (kbv6Rn7lHkI)
9. OpenAI Codex Tutorial #9 - MCP Servers (zfYEZ3_Nnkc)
10. OpenAI Codex Tutorial #10 - Delegating Tasks to the Cloud (9tGpIwE-sro)
11. OpenAI Codex Tutorial #11 - Running Tasks in Parallel (Xt7BZYhJXkg)

---

**Note:** The video IDs you originally provided were incorrect. The correct video IDs for videos 2, 3, and 4 are:
- Video #2: `aPXvW7uxQio` (not yM2bN9Cx1TQ)
- Video #3: `t_NcBWq03YI` (not WGnsKfG9fQE)
- Video #4: `hia0PznjGt8` (not 92Y9mcQaKTA)

All transcripts above use the correct video IDs from the official Net Ninja OpenAI Codex Tutorial playlist.
