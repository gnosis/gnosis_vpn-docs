---
sidebar_position: 2
title: File locations (Debian)
---

# File locations on Debian / Ubuntu

This page lists every file and directory the Debian package creates, for users who want to audit the installation or locate specific files.

## Directories created by the installer

| Folder | Purpose | Owner | Permissions | Notes |
|--------|---------|-------|-------------|-------|
| `/etc/gnosisvpn/` | Configuration directory | `gnosisvpn:gnosisvpn` | `0755` | Contains env file, network config files, and a `config.toml` symlink pointing to the active network |
| `/var/lib/gnosisvpn/` | State and cache directory | `gnosisvpn:gnosisvpn` | `0775` | Service working directory; holds `.cache/wg0_gnosisvpn.conf` (WireGuard config written at runtime) |
| `/var/log/gnosisvpn/` | Log directory | `gnosisvpn:gnosisvpn` | `0755` | `gnosisvpn.log` is written here; rotated daily, 7-day retention |
| `/run/gnosisvpn/` | Runtime directory | `root:root` | `0755` | Created by systemd at service start, not by the installer scripts |
| `/etc/apt/keyrings/` | APT signing keys | `root:root` | `0644` (file) | `gnosisvpn-archive-keyring.gpg` copied from bundled `/usr/share/gnosisvpn/` during postinstall |
| `/etc/apt/sources.list.d/` | APT repository source | `root:root` | `0644` (file) | `gnosisvpn.sources` written during postinstall; URI `https://download.gnosisvpn.io/linux/apt`, suite `stable`, component `main` |
| `/etc/apparmor.d/local/` | AppArmor local drop-ins | `root:root` | `0644` (file) | `wg-quick` drop-in allowing wg-quick to read `/var/lib/gnosisvpn/.cache/wg0_gnosisvpn.conf`; Ubuntu-only |
| `/usr/share/gnosisvpn/` | Shared package resources | `root:root` | `0644` (files) | Bundles the APT keyring GPG file used during postinstall |
| `/usr/share/doc/gnosisvpn/` | Documentation | `root:root` | `0644` (files) | Copyright notice and changelog; removed on uninstall (not purge) |

## Key files placed into existing system directories

| Path | Purpose | Notes |
|------|---------|-------|
| `/usr/lib/systemd/system/gnosisvpn.service` | Systemd unit | Enabled and started post-install |
| `/etc/logrotate.d/gnosisvpn` | Log rotation policy | Daily, 7 days, gzip |
| `/etc/gnosisvpn/config.toml` | Symlink to active network config | Points to `config-jura.toml` (default network: `jura`) |
| `/etc/gnosisvpn/gnosisvpn.env` | Service environment variables | `RUST_LOG=info`, log to `/var/log/gnosisvpn/gnosisvpn.log`, static routing forced |
