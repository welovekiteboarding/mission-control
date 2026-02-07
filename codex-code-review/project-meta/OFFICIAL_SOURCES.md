# Official Sources - Codex Code Review

This document lists all official sources used to compile best practices for Codex automated code review.

## Primary Official Documentation

### 1. OpenAI Codex GitHub Integration
**URL:** https://developers.openai.com/codex/integrations/github/
**Last Updated:** 2025
**Key Topics:**
- Native GitHub integration via `@codex review`
- AGENTS.md review guidelines
- Priority levels (P0, P1)
- Focus area customization with `@codex review for <special instruction>`

### 2. Codex GitHub Action
**URL:** https://developers.openai.com/codex/github-action/
**Last Updated:** 2025
**Key Topics:**
- `openai/codex-action@v1`
- Prerequisites and permissions
- Safety strategies and sandboxing
- Troubleshooting guide

### 3. Codex SDK Code Review Cookbook
**URL:** https://developers.openai.com/cookbook/examples/codex/build_code_review_with_codex_sdk
**Last Updated:** October 2025
**Key Topics:**
- Structured outputs with JSON schema
- GitHub Actions, GitLab, and Jenkins examples
- The official code review prompt
- Model recommendation: `gpt-5.2-codex`

## Video Resources

### 4. Automatic Code Reviews with OpenAI Codex
**URL:** https://www.youtube.com/watch?v=HwbSWVg5Ln4
**Presenters:** Maja Trębacz and Romain Huet
**Format:** Video tutorial
**Key Topics:**
- Setting up automatic PR reviews
- Configuration walkthrough

## Community Sources

### 5. Reddit Discussions (r/codex, r/OpenAI, r/ChatGPTCoding)
**Key Threads:**
- [Automated Code Review for Salesforce](https://www.reddit.com/r/codex/comments/1pzimgc/)
- [Auto Approve Commands in Codex](https://www.reddit.com/r/OpenAI/comments/1n2eocl/)
- [Automating Daily Codex Routine](https://www.reddit.com/r/codex/comments/1qhvy6u/)

### 6. Medium Article
**URL:** https://dibishks.medium.com/openai-codex-code-review-how-to-use-it-to-supercharge-your-code-quality-afbcd0a8336b
**Author:** Dibeesh KS
**Published:** November 5, 2025
**Key Topics:**
- Context-aware intelligent reviews
- Beyond syntax checking
- Reducing bugs human reviewers miss

### 7. Comprehensive Guide
**URL:** https://moiid.com/en/openai-codex-chatgpt-guide-2025-ultimate-ai-coding-assistant-for-developers-and-teams/
**Published:** September 4, 2025
**Key Topics:**
- Team collaboration features
- Mobile coding workflows
- Integration with ChatGPT Canvas

## Official GitHub Repositories

### 8. openai/codex-action
**Repository:** https://github.com/openai/codex-action
**Purpose:** Official GitHub Action for running Codex in CI/CD pipelines
**Features:**
- Automatic CLI installation
- Responses API proxy
- Safety strategy configuration

### 9. openai/codex (CLI)
**Repository:** https://github.com/openai/codex
**Purpose:** Official Codex CLI
**Releases:** Latest version and versioned releases available

---

*This document serves as a reference for all sources used in creating this best-practices guide. All recommendations in this repository are based on these official sources.*
