---
sidebar_position: 1
title: Reporting issues
---

# Reporting issues

Bug reports should include enough information to understand what happened, when it happened, and how to reproduce it. Before opening a new report, check whether the issue has already been reported.

## Where to report

Use GitHub Discussions first for user reports, questions, and reproducible issues.

- [Gnosis VPN GitHub Discussions](https://github.com/gnosis/gnosis_vpn/discussions)
- [Category: Issues & Bug Reports](https://github.com/gnosis/gnosis_vpn/discussions/categories/issues-bug-reports)

If the issue is confirmed or requires developer tracking, it may later be moved or linked to a GitHub Issue.

Official support channels may also be used if provided during onboarding, for example:

- Telegram → [@GnosisVPN_Support](https://t.me/GnosisVPN_Support)
- Signal → `GnosisVPN_Support.01`
- Email → `support@gnosisvpn.com`

Use the support channel that was provided to you during testing or onboarding.

## What logs to include

Include logs from the affected environment.

**Export logs from the Gnosis VPN app:**

1. Open the Gnosis VPN app.
2. Click the **Settings** button with the gear icon.
3. Open the **Logs** tab.
4. Click **Export service logs**.
5. Attach the exported log file when reporting the issue.

**Or find the log file based on your environment:**

- macOS: `/Library/Logs/GnosisVPN/gnosisvpn.log`
- Linux without GUI: `/var/log/gnosisvpn/gnosisvpn.log`

## How to describe reproduction steps

When reporting an issue, describe the steps as clearly and simply as possible. The report should explain what action was performed, what was expected to happen, what actually happened, and whether the issue is reproducible.

### Title

Use a short, clear title that starts with `[Bug]:`. Examples:

- `[Bug]: Connected, but websites do not load`
- `[Bug]: Connection takes more than 2 minutes`
- `[Bug]: App reconnects repeatedly after connecting`
- `[Bug]: Selected location is not available`

### Issue description

Describe the problem in a clear and simple way. Include:

- What you were trying to do
- What happened instead
- Whether the issue happened once or repeatedly
- Any visible error messages or unusual app behavior
- Screenshots or screen recordings, if useful

> Example: I connected to the Netherlands – Amsterdam exit location. The app showed "Connected", but websites did not load. The issue happened several times after reconnecting.

### Steps to reproduce

List the exact steps needed to reproduce the issue.

**Example (GUI):**

1. Open the Gnosis VPN app.
2. Select Netherlands – Amsterdam as the exit location.
3. Click Connect.
4. Wait until the app shows Connected.
5. Open a website in the browser.

**Example (CLI / without GUI):**

1. Start the Gnosis VPN service.
2. Connect to an exit location using the CLI.
3. Run `gnosis_vpn-ctl status`.
4. Check internet access in the browser or another application.

### Environment / versions

Include information about your system and Gnosis VPN version:

- Operating system
- Gnosis VPN package version
- Installation type: desktop app / CLI / headless
- Exit node
- Approximate time of the issue

> Example: OS: Ubuntu 24.04 · Package version: x.xx.x · Installation type: desktop app · Exit location: Netherlands – Amsterdam · Time: 2026-05-21 12:40

### Acknowledgement

Before submitting the report, confirm that you have searched for existing issues and discussions. In the GitHub form, check **"I have searched for existing issues and discussions."**

A clear report with logs, version information, and reproduction steps makes it easier to understand and resolve the issue.
