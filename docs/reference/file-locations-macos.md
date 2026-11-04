---
sidebar_position: 1
title: File locations (macOS)
---

# File locations on macOS

This page lists every file and directory the macOS installer creates, for users who want to audit the installation or locate specific files.

## Directories created by the installer

| Folder                                    | Purpose                   | Owner        | Permissions | Notes                                                                            |
| ----------------------------------------- | ------------------------- | ------------ | ----------- | -------------------------------------------------------------------------------- |
| `/Library/Application Support/GnosisVPN/` | Service working directory | `root:wheel` | `0755`      | Helper scripts, `installer/` network choice, updater state                       |
| `/Library/Logs/GnosisVPN/`                | Service log directory     | `root:wheel` | `0755`      | `gnosisvpn.log` (service log) and `updates.log` (updater); rotated via newsyslog |
| `/Library/Logs/GnosisVPN/installer/`      | Installer log directory   | `root:wheel` | `0755`      | `installer.log`, `preinstall.log`, `postinstall.log`, `migrate.log`              |
| `/etc/gnosisvpn/`                         | Configuration directory   | `root:wheel` | `0755`      | Network configs and the `config.toml` symlink                                    |
| `/etc/gnosisvpn/templates/`               | Network config templates  | `root:wheel` | `0755`      | One `<network>.toml.template` per shipped network                                |

- After an upgrade from a single-user release, `/Library/Application Support/GnosisVPN/` keeps the previous identity as `.config.migrated-<timestamp>` (or `.config.<timestamp>.bak` after a reset), `root` `0700`.
- `/etc` is a symlink to `/private/etc` on macOS.

## Key files placed into existing system directories

| Path                                                         | Purpose                             | Notes                                                           |
| ------------------------------------------------------------ | ----------------------------------- | --------------------------------------------------------------- |
| `/usr/local/bin/gnosis_vpn-root`                             | Main VPN daemon binary              | `root:wheel`, `0750`                                            |
| `/usr/local/bin/gnosis_vpn-worker`                           | Worker process binary               | `root:wheel`, `0755`                                            |
| `/usr/local/bin/gnosis_vpn-ctl`                              | CLI control tool                    | `root:wheel`, `0755`                                            |
| `/usr/local/bin/gnosis_vpn-update`                           | Updater                             | `root:wheel`, `0755`                                            |
| `/usr/local/bin/gnosis_vpn-migrate`                          | Identity migration tool             | `root:wheel`, `0755`; migrates and resets identities            |
| `/usr/local/bin/gnosis_vpn-manager`                          | Management utility script           | `root:wheel`, `0755`                                            |
| `/Library/LaunchDaemons/com.gnosisvpn.gnosisvpnclient.plist` | LaunchDaemon service definition     | Loaded and enabled at boot, runs as root                        |
| `/etc/newsyslog.d/gnosisvpn.conf`                            | Log rotation policy                 | `gnosisvpn.log` at 1 GB, 12 rotations                           |
| `/etc/sudoers.d/gnosis-vpn`                                  | Sudoers drop-in for service control | Passwordless service control for the `gnosisvpn` group; `0440`  |
| `/etc/gnosisvpn/config.toml`                                 | Symlink to active network config    | Points to `<network>.toml` for the network chosen at install    |
| `/Applications/Gnosis VPN.app`                               | GUI application bundle              | Extracted from archive during postinstall; `root:admin`, `0755` |
| `/var/run/gnosisvpn.sock`                                    | Control socket                      | Created by the daemon at startup                                |
| `/var/run/gnosisvpn.pid`                                     | Daemon PID file                     | Written by the daemon at startup                                |
| `/var/run/gnosisvpn/`                                        | Runtime directory                   | `daemon.lock` and `teardown-state.json`                         |

- The sudoers drop-in lets the `gnosisvpn` group run specific `launchctl` and `gnosis_vpn-update` commands without a password. The installer adds the console user to the group.

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
