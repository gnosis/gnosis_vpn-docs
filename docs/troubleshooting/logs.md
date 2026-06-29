---
sidebar_position: 1
title: Finding your logs
---

# Log location

## Gnosis VPN app

If you are using the Gnosis VPN desktop app, logs can be exported directly from the application:

1. Open the Gnosis VPN app.
2. Click the **Settings** button with the gear icon.
3. Open the **Logs** tab.
4. Click **Export service logs**.
5. Attach the exported log file when reporting the issue.

## Terminal

### macOS

If you are using Gnosis VPN on macOS without exporting logs from the desktop app, log files can be found in:

```
/Library/Logs/GnosisVPN/gnosisvpn.log
```

#### Installer logs

If the issue occurred during installation, the macOS installer writes separate logs:

| Path | Content |
| --- | --- |
| `/Library/Logs/GnosisVPN/installer/installer.log` | Main installer log. |
| `/Library/Logs/GnosisVPN/installer/preinstall.log` | Preinstall script output. |
| `/Library/Logs/GnosisVPN/installer/postinstall.log` | Postinstall script output. |

### Linux

If you are running Gnosis VPN on Linux without the desktop app, service logs are stored on the system at:

```
/var/log/gnosisvpn/gnosisvpn.log
```
