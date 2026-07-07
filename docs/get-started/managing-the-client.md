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

<Tabs groupId="upgrading">
<TabItem value="macos" label="macOS">

To upgrade Gnosis VPN, download and run the latest installer, following the same steps as in the [installation guide](installation.md). The installer will replace your existing version while preserving your configuration and identity.

</TabItem>
<TabItem value="debian" label="Debian / Ubuntu">

In a terminal, run:

```bash
sudo apt upgrade gnosisvpn
```

</TabItem>
</Tabs>

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