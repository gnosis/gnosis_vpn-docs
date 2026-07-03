---
sidebar_position: 4
title: Managing the client
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Managing the client

Common lifecycle operations for the Gnosis VPN client: restarting the service, upgrading, and uninstalling.

## Restarting the client service

<Tabs groupId="operating-systems">
<TabItem value="macos" label="macOS">

In a terminal, run:

```bash
sudo launchctl kickstart -k system/com.gnosisvpn.gnosisvpnclient
```

</TabItem>
<TabItem value="debian" label="Debian / Ubuntu">

In a terminal, run:

```bash
sudo systemctl restart gnosisvpn.service
```

</TabItem>
</Tabs>

## Upgrading

:::warning

Before installing a newer version of Gnosis VPN, the older version must first be uninstalled (see below). On Debian/Ubuntu, this does not apply if you installed via the APT repository — there you simply run `sudo apt upgrade`.

:::

1. Uninstall the currently installed version (see below).
2. Install the new version following the [installation guide](installation.md).

## Uninstalling

<Tabs groupId="operating-systems">
<TabItem value="macos" label="macOS">

In a terminal, run:

```bash
sudo /Library/Application\ Support/GnosisVPN/uninstall.sh
```

</TabItem>
<TabItem value="debian" label="Debian / Ubuntu">

In a terminal, run:

```bash
sudo apt remove gnosisvpn
```

</TabItem>
</Tabs>

## Where your identity is stored

<Tabs groupId="operating-systems">
<TabItem value="macos" label="macOS">

The identity is stored in `/Library/Application Support/GnosisVPN/.config`. To get there:

```bash
sudo su -
cd /Library/Application\ Support/GnosisVPN/
```

</TabItem>
<TabItem value="debian" label="Debian / Ubuntu">

Application state lives in `/var/lib/gnosisvpn/`.

</TabItem>
</Tabs>

For a complete list of files and directories used by Gnosis VPN, see the reference pages for [macOS](../reference/file-locations-macos.md) and [Debian](../reference/file-locations-debian.md).
