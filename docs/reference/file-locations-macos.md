---
sidebar_position: 1
title: File locations (macOS)
---

# File locations on macOS

This page lists every file and directory the macOS installer creates, for users who want to audit the installation or locate specific files.

## Directories created by the installer

| Folder                                    | Purpose                              | Owner                 | Permissions | Notes                                                                                                                            |
| ----------------------------------------- | ------------------------------------ | --------------------- | ----------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `/Library/Application Support/GnosisVPN/` | Application state and home directory | `gnosisvpn:gnosisvpn` | `0750`      | Service working directory; also set as `TMPDIR` and `HOME` for the daemon. The identity is stored in the `.config` subdirectory. |
| `/Library/Logs/GnosisVPN/`                | Service log directory                | `gnosisvpn:gnosisvpn` | `0755`      | `gnosisvpn.log` written here; rotated via newsyslog at 100 MB, 10 copies                                                         |
| `/Library/Logs/GnosisVPN/installer/`      | Installer log directory              | `root:wheel`          | `0755`      | `installer.log` written during install/uninstall steps                                                                           |
| `/etc/gnosisvpn/`                         | Configuration directory              | `root:gnosisvpn`      | —           | Network config templates and `config.toml` symlink; `/etc` is a symlink to `/private/etc` on macOS                               |
| `/etc/gnosisvpn/templates/`               | Network config templates             | `root:gnosisvpn`      | —           | `jura.toml.template`, `rotsee.toml.template`, `dufour.toml.template`                                                             |

## Key files placed into existing system directories

| Path                                                         | Purpose                                  | Notes                                                                                                         |
| ------------------------------------------------------------ | ---------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `/usr/local/bin/gnosis_vpn-root`                             | Main VPN daemon binary                   | `root:wheel`, `0750`                                                                                          |
| `/usr/local/bin/gnosis_vpn-worker`                           | Worker process binary                    | `root:gnosisvpn`, `0750`                                                                                      |
| `/usr/local/bin/gnosis_vpn-ctl`                              | CLI control tool                         | `gnosisvpn:gnosisvpn`, `0755`                                                                                 |
| `/usr/local/bin/gnosis_vpn-manager`                          | Management utility script                | `root:gnosisvpn`, `0755`                                                                                      |
| `/usr/local/bin/{wg,wg-quick,wireguard-go}`                  | Bundled WireGuard tools                  | `root:wheel`, `0755`; bundled so no separate WireGuard install is needed                                      |
| `/Library/LaunchDaemons/com.gnosisvpn.gnosisvpnclient.plist` | LaunchDaemon service definition          | Loaded and enabled at boot, runs as root                                                                      |
| `/etc/newsyslog.d/gnosisvpn.conf`                            | Log rotation policy                      | 100 MB threshold, 10 rotations                                                                                |
| `/etc/sudoers.d/gnosis-vpn`                                  | Sudoers drop-in for launchctl operations | Allows the `gnosisvpn` group to run specific `launchctl` subcommands without a password; `root:wheel`, `0440` |
| `/etc/gnosisvpn/config.toml`                                 | Symlink to active network config         | Points to `templates/jura.toml.template` (default network: `jura`)                                            |
| `/Applications/Gnosis VPN.app`                               | GUI application bundle                   | Extracted from archive during postinstall; `root:admin`, `0755`                                               |
| `/var/run/gnosisvpn.pid`                                     | Daemon PID file                          | Written by the daemon at startup                                                                              |
