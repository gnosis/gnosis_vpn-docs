---
sidebar_position: 2
title: File locations (Debian)
---

# File locations on Debian / Ubuntu

This page lists every file and directory the Debian package creates, for users who want to audit the installation or locate specific files.

## Directories created by the installer

| Folder                      | Purpose                   | Owner       | Permissions    | Notes                                                                                                                                                                                                                                                                                                          |
| --------------------------- | ------------------------- | ----------- | -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/etc/gnosisvpn/`           | Configuration directory   | `root:root` | `0755`         | Contains the env files, the network config files, `version.txt` and a `config.toml` symlink pointing to the active network; the `config-*.toml` files inside are `root:root` `0644`                                                                                                                            |
| `/var/lib/gnosisvpn/`       | Service working directory | `root:root` | `0755`         | Holds no identity. After an upgrade from a single-user release it keeps the previous identity as `.config.migrated-<timestamp>` (or `.config.<timestamp>.bak` after a reset), `root` `0700`                                                                                                                    |
| `/var/log/gnosisvpn/`       | Log directory             | `root:root` | `0755`         | `gnosisvpn.log` (service log) and `migrate.log` (identity migration on upgrade)                                                                                                                                                                                                                                |
| `/run/gnosisvpn/`           | Runtime directory         | `root:root` | `0755`         | Created by systemd at service start, not by the installer scripts. Holds the control socket `gnosisvpn.sock`, `daemon.lock` and `teardown-state.json`                                                                                                                                                          |
| `/etc/apt/keyrings/`        | APT signing keys          | `root:root` | `0644` (file)  | `gnosisvpn-archive-keyring.gpg` copied from bundled `/usr/share/gnosisvpn/` during postinstall                                                                                                                                                                                                                 |
| `/etc/apt/sources.list.d/`  | APT repository source     | `root:root` | `0644` (file)  | `gnosisvpn.sources` written during postinstall; the channel comes from `/etc/gnosisvpn/version.txt`. `stable` uses both mirrors (`https://download.vpn.gnosis.eth.limo/linux/apt` and `https://download.gnosisvpn.io/linux/apt`), `snapshot` and `experimental` only `https://download.gnosisvpn.io/linux/apt` |
| `/usr/share/gnosisvpn/`     | Shared package resources  | `root:root` | `0644` (files) | Bundles the APT keyring GPG file and the `networks` list used during postinstall                                                                                                                                                                                                                               |
| `/usr/share/doc/gnosisvpn/` | Documentation             | `root:root` | `0644` (files) | Copyright notice and changelog; removed on uninstall (not purge)                                                                                                                                                                                                                                               |

## Key files placed into existing system directories

| Path                                                | Purpose                          | Notes                                                                                                                                                                  |
| --------------------------------------------------- | -------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/usr/lib/systemd/system/gnosisvpn.service`         | Systemd unit                     | Runs `gnosis_vpn-root` as `root`; enabled and started post-install                                                                                                     |
| `/usr/lib/systemd/system/gnosisvpn-logrotate.timer` | Log rotation timer               | Checks the service log size every minute                                                                                                                               |
| `/etc/logrotate.d/gnosisvpn`                        | Log rotation policy              | Rotates `gnosisvpn.log` hourly or at 1 GB, keeps 12, gzip                                                                                                              |
| `/etc/gnosisvpn/config.toml`                        | Symlink to active network config | Points to `config-<network>.toml` for the network chosen at install                                                                                                    |
| `/etc/gnosisvpn/gnosisvpn.env`                      | Service environment variables    | `RUST_LOG=info`, log to `/var/log/gnosisvpn/gnosisvpn.log`, static routing forced                                                                                      |
| `/etc/gnosisvpn/gnosisvpn-dynamic.env`              | Generated environment overrides  | Written during postinstall, `root:root` `0644`. Holds the network endpoint and takes precedence over `gnosisvpn.env`, which is left untouched so upgrades don't prompt |
| `/etc/gnosisvpn/version.txt`                        | Installed version                | Read during postinstall to pick the APT channel (`stable`, `snapshot` or `experimental`)                                                                               |
| `/usr/share/gnosisvpn/networks`                     | Networks the package ships       | Space-separated list, first entry is the default network; replaced on every upgrade                                                                                    |
| `/etc/sysctl.d/99-gnosisvpn-bbr.conf`               | TCP congestion control           | Enables BBR and the `fq` queueing discipline system-wide; applied during postinstall                                                                                   |
| `/var/lib/dpkg/info/gnosisvpn.*`                    | dpkg package records             | Created by dpkg, not by the package: the list of installed files and the maintainer scripts dpkg runs on install, upgrade and removal                                  |
| `/usr/bin/gnosis_vpn-migrate`                       | Identity migration tool          | `root:root`; moves the previous single-user identity into a user's home on upgrade and resets identities                                                               |
| `/usr/bin/gnosis_vpn-update`                        | Updater                          | `root:root`                                                                                                                                                            |

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
