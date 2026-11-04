---
sidebar_position: 1
title: Finding your logs
---

# Log location

## Gnosis VPN app

If you are using the Gnosis VPN desktop app, logs can be exported directly from the application:

1. Open the Gnosis VPN app.
2. Click the **Settings** button with the gear icon.
3. In the **Troubleshooting** section, click **Export logs…**.
4. Attach the exported log file when reporting the issue.

The export is one compressed file with system information, the app logs, the service log and the worker logs. Worker logs are only included when you are the user running the client.

## Terminal

The service runs as root and writes to a system log. The worker runs as the user who started the client and writes to that user's home directory.

### macOS

If you are using Gnosis VPN on macOS without exporting logs from the desktop app, log files can be found in:

| Path                                                                     | Content                                        |
| ------------------------------------------------------------------------ | ---------------------------------------------- |
| `/Library/Logs/GnosisVPN/gnosisvpn.log`                                  | Service log.                                   |
| `~/Library/Logs/GnosisVPN/worker.log.YYYY-MM-DD`                         | Worker log, one file per day, the last 7 kept. |
| `~/Library/Logs/com.gnosisvpn.gnosisvpnclient/gnosis_vpn-app.<date>.log` | App log.                                       |
| `/Library/Logs/GnosisVPN/updates.log`                                    | Updater log.                                   |

#### Installer logs

If the issue occurred during installation, the macOS installer writes separate logs:

| Path                                                | Content                        |
| --------------------------------------------------- | ------------------------------ |
| `/Library/Logs/GnosisVPN/installer/installer.log`   | Main installer log.            |
| `/Library/Logs/GnosisVPN/installer/preinstall.log`  | Preinstall script output.      |
| `/Library/Logs/GnosisVPN/installer/postinstall.log` | Postinstall script output.     |
| `/Library/Logs/GnosisVPN/installer/migrate.log`     | Identity migration on upgrade. |

### Linux

If you are running Gnosis VPN on Linux without the desktop app, log files can be found in:

| Path                                                                     | Content                                        |
| ------------------------------------------------------------------------ | ---------------------------------------------- |
| `/var/log/gnosisvpn/gnosisvpn.log`                                       | Service log.                                   |
| `~/.local/state/gnosisvpn/worker.log.YYYY-MM-DD`                         | Worker log, one file per day, the last 7 kept. |
| `~/.local/state/com.gnosisvpn.gnosisvpnclient/gnosis_vpn-app.<date>.log` | App log.                                       |
| `/var/log/gnosisvpn/migrate.log`                                         | Identity migration on upgrade.                 |
