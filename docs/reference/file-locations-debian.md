---
sidebar_position: 2
title: File locations (Debian)
---

# File locations on Debian / Ubuntu

This page lists every file and directory the Debian package creates, for users who want to audit the installation or locate specific files.

## Directories created by the installer

| Folder                      | Purpose                   | Owner       | Permissions    | Notes                                                                      |
| --------------------------- | ------------------------- | ----------- | -------------- | -------------------------------------------------------------------------- |
| `/etc/gnosisvpn/`           | Configuration directory   | `root:root` | `0755`         | Env files, network configs, `version.txt` and the `config.toml` symlink    |
| `/var/lib/gnosisvpn/`       | Service working directory | `root:root` | `0755`         | Holds no identity, see the notes below                                     |
| `/var/log/gnosisvpn/`       | Log directory             | `root:root` | `0755`         | `gnosisvpn.log` (service log) and `migrate.log` (identity migration)       |
| `/run/gnosisvpn/`           | Runtime directory         | `root:root` | `0755`         | Created by systemd: `gnosisvpn.sock`, `daemon.lock`, `teardown-state.json` |
| `/etc/apt/keyrings/`        | APT signing keys          | `root:root` | `0644` (file)  | `gnosisvpn-archive-keyring.gpg`, copied during postinstall                 |
| `/etc/apt/sources.list.d/`  | APT repository source     | `root:root` | `0644` (file)  | `gnosisvpn.sources`, written during postinstall                            |
| `/usr/share/gnosisvpn/`     | Shared package resources  | `root:root` | `0644` (files) | The APT keyring and the `networks` list                                    |
| `/usr/share/doc/gnosisvpn/` | Documentation             | `root:root` | `0644` (files) | Copyright and changelog; removed on uninstall                              |

- The `config-*.toml` files in `/etc/gnosisvpn/` are `root:root` `0644`.
- After an upgrade from a single-user release, `/var/lib/gnosisvpn/` keeps the previous identity as `.config.migrated-<timestamp>` (or `.config.<timestamp>.bak` after a reset), `root` `0700`.
- The APT channel comes from `/etc/gnosisvpn/version.txt`. `stable` uses both mirrors, `https://download.vpn.gnosis.eth.limo/linux/apt` and `https://download.gnosisvpn.io/linux/apt`. `snapshot` and `experimental` use only `https://download.gnosisvpn.io/linux/apt`.

## Key files placed into existing system directories

| Path                                                | Purpose                          | Notes                                                               |
| --------------------------------------------------- | -------------------------------- | ------------------------------------------------------------------- |
| `/usr/lib/systemd/system/gnosisvpn.service`         | Systemd unit                     | Runs `gnosis_vpn-root` as `root`; enabled at install                |
| `/usr/lib/systemd/system/gnosisvpn-logrotate.timer` | Log rotation timer               | Checks the service log size every minute                            |
| `/etc/logrotate.d/gnosisvpn`                        | Log rotation policy              | Rotates `gnosisvpn.log` hourly or at 1 GB, keeps 12, gzip           |
| `/etc/gnosisvpn/config.toml`                        | Symlink to active network config | Points to `config-<network>.toml` for the network chosen at install |
| `/etc/gnosisvpn/gnosisvpn.env`                      | Service environment variables    | `RUST_LOG=info`, logs to `gnosisvpn.log`, static routing forced     |
| `/etc/gnosisvpn/gnosisvpn-dynamic.env`              | Generated environment overrides  | Network endpoint; overrides `gnosisvpn.env`, `0644`                 |
| `/etc/gnosisvpn/version.txt`                        | Installed version                | Picks the APT channel during postinstall                            |
| `/usr/share/gnosisvpn/networks`                     | Networks the package ships       | Space-separated, first is the default; replaced on upgrade          |
| `/etc/sysctl.d/99-gnosisvpn-bbr.conf`               | TCP congestion control           | Enables BBR and `fq` system-wide                                    |
| `/var/lib/dpkg/info/gnosisvpn.*`                    | dpkg package records             | dpkg's installed-file list and maintainer scripts                   |
| `/usr/bin/gnosis_vpn-migrate`                       | Identity migration tool          | `root:root`; migrates and resets identities                         |
| `/usr/bin/gnosis_vpn-update`                        | Updater                          | `root:root`                                                         |

- `gnosisvpn-dynamic.env` is written during postinstall. It takes precedence over `gnosisvpn.env`, which is left untouched so upgrades don't prompt.
- `/var/lib/dpkg/info/gnosisvpn.*` is created by dpkg, not by the package. dpkg runs these maintainer scripts on install, upgrade and removal.

## Per-user files

The worker runs as the user who starts the client, so each user has their own identity, one per network. `<network>` is the network folder the client creates.

| Path                                            | Content                                             | Permissions                      |
| ----------------------------------------------- | --------------------------------------------------- | -------------------------------- |
| `~/.local/share/gnosisvpn/networks/<network>/`  | Identity: `hopr.id` and `hopr.pass`                 | Directories `0700`, files `0600` |
| `~/.cache/gnosisvpn/networks/<network>/`        | Safe: `hopr.safe`                                   | Directories `0700`, files `0600` |
| `~/.local/state/gnosisvpn/`                     | Worker log `worker.log.YYYY-MM-DD`, the last 7 kept | `0700`                           |
| `~/.config/com.gnosisvpn.gnosisvpnclient/`      | App settings, `settings.json`                       |                                  |
| `~/.local/state/com.gnosisvpn.gnosisvpnclient/` | App logs, `gnosis_vpn-app.<date>.log`               |                                  |

The service can only write under `/home` and `/var/home`. A home directory elsewhere is not supported.

## Removing and purging

- `apt remove` keeps `/etc/gnosisvpn`, `/var/lib/gnosisvpn` and `/var/log/gnosisvpn`.
- `apt purge` deletes `/etc/gnosisvpn` and `/var/log/gnosisvpn`, and moves any previous identity (`/var/lib/gnosisvpn/.config*`) to `/var/backups/gnosisvpn/<timestamp>/`, `root` `0700`. `/var/lib/gnosisvpn` itself is removed only if nothing else is left in it.
- Neither touches the per-user files above.
