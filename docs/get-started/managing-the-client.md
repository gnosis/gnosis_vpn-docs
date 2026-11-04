---
sidebar_position: 4
title: Managing the client
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Managing the client

Common lifecycle operations for the Gnosis VPN client: restarting the service, upgrading, and uninstalling.

## Restarting the client service

<Tabs groupId="operating-systems" queryString="os">
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

<Tabs groupId="upgrading" queryString>
<TabItem value="macos" label="macOS">

To upgrade Gnosis VPN, download and run the latest installer, following the same steps as in the [installation guide](installation.md). The installer will replace your existing version while preserving your configuration and identity. When upgrading from a release that kept one identity for the whole computer, the installer moves that identity to the user logged in at the screen. If nobody was logged in, see [My account is missing after upgrading from an earlier release](../troubleshooting/common-issues.md#identity-not-migrated).

</TabItem>
<TabItem value="debian" label="Debian / Ubuntu">

In a terminal, run:

1. Refresh your system's package list so it knows about the latest Gnosis VPN release:

   ```bash
   sudo apt update
   ```

2. Upgrade Gnosis VPN:

   ```bash
   sudo apt upgrade gnosisvpn
   ```

When upgrading from a release that kept one identity for the whole computer, the upgrade moves that identity to the user logged in at the desktop. If nobody was logged in, see [My account is missing after upgrading from an earlier release](../troubleshooting/common-issues.md#identity-not-migrated).

</TabItem>
</Tabs>

## Uninstalling

<Tabs groupId="operating-systems" queryString="os">
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

Uninstalling does not remove the identities stored in each user's home directory. See the file locations for [macOS](../reference/file-locations-macos.md) and [Debian](../reference/file-locations-debian.md).
