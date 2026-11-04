---
sidebar_position: 1
title: File locations (macOS)
---

# File locations on macOS

This page lists every file and directory the macOS installer creates, for users who want to audit the installation or locate specific files.

## Directories created by the installer

| Folder                                    | Purpose                   | Owner        | Permissions | Notes                                                                                                                                                                                                                                                                             |
| ----------------------------------------- | ------------------------- | ------------ | ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/Library/Application Support/GnosisVPN/` | Service working directory | `root:wheel` | `0755`      | Holds the uninstall and helper scripts, the installer's network choice (`installer/`) and updater state. After an upgrade from a single-user release it keeps the previous identity as `.config.migrated-<timestamp>` (or `.config.<timestamp>.bak` after a reset), `root` `0700` |
| `/Library/Logs/GnosisVPN/`                | Service log directory     | `root:wheel` | `0755`      | `gnosisvpn.log` (service log) and `updates.log` (updater); rotated via newsyslog                                                                                                                                                                                                  |
| `/Library/Logs/GnosisVPN/installer/`      | Installer log directory   | `root:wheel` | `0755`      | `installer.log`, `preinstall.log`, `postinstall.log` and `migrate.log` (identity migration on upgrade)                                                                                                                                                                            |
| `/etc/gnosisvpn/`                         | Configuration directory   | `root:wheel` | `0755`      | Network configs and the `config.toml` symlink; `/etc` is a symlink to `/private/etc` on macOS                                                                                                                                                                                     |
| `/etc/gnosisvpn/templates/`               | Network config templates  | `root:wheel` | `0755`      | One `<network>.toml.template` per shipped network                                                                                                                                                                                                                                 |

## Key files placed into existing system directories

| Path                                                         | Purpose                             | Notes                                                                                                                                                                                |
| ------------------------------------------------------------ | ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `/usr/local/bin/gnosis_vpn-root`                             | Main VPN daemon binary              | `root:wheel`, `0750`                                                                                                                                                                 |
| `/usr/local/bin/gnosis_vpn-worker`                           | Worker process binary               | `root:wheel`, `0755`                                                                                                                                                                 |
| `/usr/local/bin/gnosis_vpn-ctl`                              | CLI control tool                    | `root:wheel`, `0755`                                                                                                                                                                 |
| `/usr/local/bin/gnosis_vpn-update`                           | Updater                             | `root:wheel`, `0755`                                                                                                                                                                 |
| `/usr/local/bin/gnosis_vpn-migrate`                          | Identity migration tool             | `root:wheel`, `0755`; moves the previous single-user identity into a user's home on upgrade and resets identities                                                                    |
| `/usr/local/bin/gnosis_vpn-manager`                          | Management utility script           | `root:wheel`, `0755`                                                                                                                                                                 |
| `/Library/LaunchDaemons/com.gnosisvpn.gnosisvpnclient.plist` | LaunchDaemon service definition     | Loaded and enabled at boot, runs as root                                                                                                                                             |
| `/etc/newsyslog.d/gnosisvpn.conf`                            | Log rotation policy                 | `gnosisvpn.log` at 1 GB, 12 rotations                                                                                                                                                |
| `/etc/sudoers.d/gnosis-vpn`                                  | Sudoers drop-in for service control | Allows the `gnosisvpn` group to run specific `launchctl` and `gnosis_vpn-update` commands without a password; `root:wheel`, `0440`. The installer adds the console user to the group |
| `/etc/gnosisvpn/config.toml`                                 | Symlink to active network config    | Points to `<network>.toml` for the network chosen at install                                                                                                                         |
| `/Applications/Gnosis VPN.app`                               | GUI application bundle              | Extracted from archive during postinstall; `root:admin`, `0755`                                                                                                                      |
| `/var/run/gnosisvpn.sock`                                    | Control socket                      | Created by the daemon at startup                                                                                                                                                     |
| `/var/run/gnosisvpn.pid`                                     | Daemon PID file                     | Written by the daemon at startup                                                                                                                                                     |
| `/var/run/gnosisvpn/`                                        | Runtime directory                   | `daemon.lock` and `teardown-state.json`                                                                                                                                              |

## Per-user files

The worker runs as the user who starts the client, so each user has their own identity, one per network. `<network>` is the network folder the client creates.

| Path                                                           | Content                                             | Permissions                      |
| -------------------------------------------------------------- | --------------------------------------------------- | -------------------------------- |
| `~/Library/Application Support/GnosisVPN/networks/<network>/`  | Identity: `hopr.id` and `hopr.pass`                 | Directories `0700`, files `0600` |
| `~/Library/Caches/GnosisVPN/networks/<network>/`               | Safe: `hopr.safe`                                   | Directories `0700`, files `0600` |
| `~/Library/Logs/GnosisVPN/`                                    | Worker log `worker.log.YYYY-MM-DD`, the last 7 kept | `0700`                           |
| `~/Library/Application Support/com.gnosisvpn.gnosisvpnclient/` | App settings, `settings.json`                       |                                  |
| `~/Library/Logs/com.gnosisvpn.gnosisvpnclient/`                | App logs, `gnosis_vpn-app.<date>.log`               |                                  |

## Uninstalling

The uninstall script removes the binaries, the launchd plists, `/etc/gnosisvpn` (backed up to `~/gnosis-vpn-config-backup-<timestamp>` first), `/Library/Logs/GnosisVPN`, the sudoers file, the `gnosisvpn` group and the app bundle.

It keeps `/Library/Application Support/GnosisVPN` and every user's files under `~/Library`.
