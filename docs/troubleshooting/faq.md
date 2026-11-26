---
sidebar_position: 2
title: FAQ
hide_table_of_contents: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {Issues, Issue} from '@site/src/components/Issues';

# Frequently asked questions

Open a question to see the answer.

<Issues>

<Issue id="move-identity-to-another-device" title="How do I move my identity to another device?">

Your identity links the client to your Safe and the funds in it. A new device creates its own identity, which is a new, unfunded account. To keep using your account, copy your identity folder from the old device to the new one.

The folder is named after the network. For the current release that is `piz-palu-prod`:

- macOS: `~/Library/Application Support/GnosisVPN/networks/piz-palu-prod/`
- Debian / Ubuntu: `~/.local/share/gnosisvpn/networks/piz-palu-prod/`

Copy the whole folder, not just the files in it. Other folders next to it, such as `piz-palu-prod.reset-<timestamp>`, are older identities set aside. You don't need them. The two devices can run different operating systems.

:::warning

Anyone with a copy of this folder can use your account and its funds. Keep the copy private. Use your identity on one device at a time: after the move, don't start the client on the old device again.

:::

`<backup>` below is where you keep the copy, such as a USB drive. Run the commands as the user who runs Gnosis VPN. Only the service commands need `sudo`.

**On the old device**

<Tabs>
<TabItem value="macos" label="macOS">

1. Stop the service:
   ```bash
   sudo launchctl bootout system/com.gnosisvpn.gnosisvpnclient
   ```
2. Copy your identity folder to `<backup>`:
   ```bash
   cp -R ~/Library/Application\ Support/GnosisVPN/networks/piz-palu-prod <backup>/
   ```

</TabItem>
<TabItem value="debian" label="Debian / Ubuntu">

1. Stop the service:
   ```bash
   sudo systemctl stop gnosisvpn.service
   ```
2. Copy your identity folder to `<backup>`:
   ```bash
   cp -R ~/.local/share/gnosisvpn/networks/piz-palu-prod <backup>/
   ```

</TabItem>
</Tabs>

**On the new device**

Install Gnosis VPN first, as described in the [installation guide](../get-started/installation.md). If the app shows a new account, don't fund it: your copied identity replaces it. Then:

<Tabs>
<TabItem value="macos" label="macOS">

1. Stop the service:
   ```bash
   sudo launchctl bootout system/com.gnosisvpn.gnosisvpnclient
   ```
2. Move aside the identity the new device created, and its safe folder. This keeps them as a backup. If `mv` reports `No such file or directory`, there is nothing to move:
   ```bash
   mv ~/Library/Application\ Support/GnosisVPN/networks/piz-palu-prod ~/Library/Application\ Support/GnosisVPN/networks/piz-palu-prod.replaced-$(date +%Y%m%d%H%M%S)
   ```
   ```bash
   mv ~/Library/Caches/GnosisVPN/networks/piz-palu-prod ~/Library/Caches/GnosisVPN/networks/piz-palu-prod.replaced-$(date +%Y%m%d%H%M%S)
   ```
   The safe folder holds the Safe of the new identity. With it moved aside, the client looks up the Safe of your copied identity on-chain.
3. Copy your identity folder into place and make it private to your account:
   ```bash
   mkdir -p ~/Library/Application\ Support/GnosisVPN/networks
   ```
   ```bash
   cp -R <backup>/piz-palu-prod ~/Library/Application\ Support/GnosisVPN/networks/
   ```
   ```bash
   chmod -R go-rwx ~/Library/Application\ Support/GnosisVPN
   ```
4. Start the service again:
   ```bash
   sudo launchctl bootstrap system /Library/LaunchDaemons/com.gnosisvpn.gnosisvpnclient.plist
   ```

</TabItem>
<TabItem value="debian" label="Debian / Ubuntu">

1. Stop the service:
   ```bash
   sudo systemctl stop gnosisvpn.service
   ```
2. Move aside the identity the new device created, and its safe folder. This keeps them as a backup. If `mv` reports `No such file or directory`, there is nothing to move:
   ```bash
   mv ~/.local/share/gnosisvpn/networks/piz-palu-prod ~/.local/share/gnosisvpn/networks/piz-palu-prod.replaced-$(date +%Y%m%d%H%M%S)
   ```
   ```bash
   mv ~/.cache/gnosisvpn/networks/piz-palu-prod ~/.cache/gnosisvpn/networks/piz-palu-prod.replaced-$(date +%Y%m%d%H%M%S)
   ```
   The safe folder holds the Safe of the new identity. With it moved aside, the client looks up the Safe of your copied identity on-chain.
3. Copy your identity folder into place and make it private to your account:
   ```bash
   mkdir -p ~/.local/share/gnosisvpn/networks
   ```
   ```bash
   cp -R <backup>/piz-palu-prod ~/.local/share/gnosisvpn/networks/
   ```
   ```bash
   chmod -R go-rwx ~/.local/share/gnosisvpn
   ```
4. Start the service again:
   ```bash
   sudo systemctl start gnosisvpn.service
   ```

</TabItem>
</Tabs>

Open the app and check **Settings → Usage**. It should show your account's balance, not a new, empty account.

</Issue>

</Issues>
