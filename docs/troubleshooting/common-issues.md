---
sidebar_position: 2
title: Common issues
hide_table_of_contents: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {Issues, Issue} from '@site/src/components/Issues';

# Common issues

Find the problem that matches your symptoms and open it for the fix.

<Issues>

<Issue id="connected-but-no-internet" title="Connected, but no internet (or unstable)">

The VPN reports a connected state, but internet access is missing or drops in and out.

**Symptoms**

- The client status shows "Connected", but web browsers display timeout errors.
- Internet routing functions intermittently or drops completely every few minutes.
- IP verification websites (e.g. `ifconfig.me`, `icanhazip.com`) fail to load.

**Resolution steps — macOS and Linux with GUI**

1. **Switch exit nodes:** click the location dropdown and select an alternative node with the lowest available latency (ms).
2. **Verify wallet balance:** click the wallet icon in the top-right corner. Ensure your account balance is sufficient; top up if it is depleted.
3. **Hard restart:** completely terminate the application. Right-click the Gnosis VPN tray icon, select **Quit**, and relaunch the application.

**Resolution steps — Linux without GUI**

1. Check your node and wallet status — verify your Safe and channel balances with your active exit node:
   ```
   gnosis_vpn-ctl balance
   ```
2. If your balance is sufficient, restart the background service to flush stuck routing tables:
   ```
   # Linux
   sudo systemctl restart gnosisvpn.service

   # macOS
   sudo launchctl kickstart -k system/com.gnosisvpn.gnosisvpnclient
   ```

</Issue>

<Issue id="slow-handshake" title="Connection handshake takes over 60 seconds">

The client hangs indefinitely in a "Connecting" state when attempting to establish a tunnel with an exit node.

**Symptoms**

- The interface or terminal status stays frozen in the connecting phase for over 1–2 minutes.
- Specific geographic locations fail to hand over traffic, while others connect instantly.
- Connection eventually succeeds, but only after an unacceptable delay.

**Resolution steps — macOS and Linux with GUI**

1. Click the wallet icon to verify your account balance.
2. Pick an alternate exit node with lower latency.
3. Restart the app via the tray icon menu if it remains frozen.

**Resolution steps — Linux without GUI**

1. Inspect the handshake state:
   ```
   gnosis_vpn-ctl status
   ```
2. Force a reconnection to a different node endpoint:
   ```
   gnosis_vpn-ctl connect --node <alternative_node_id>
   ```

</Issue>

<Issue id="app-scaling-linux" title="App looks too big, too small, or incorrectly scaled (Linux)">

The Gnosis VPN app is built on GTK3, which runs through the legacy X11 compatibility layer on Wayland. This can cause incorrect scaling when display scaling is set manually.

**Resolution steps**

Find the scaling option for legacy (X11) apps in your desktop environment's display settings and set it to **"Scaled by the system"**.

On KDE, this is typically found under **Display Configuration**:

![KDE legacy X11 app scaling setting](https://github.com/user-attachments/assets/1fa3e541-dbb8-45aa-bad8-7877d57a9a93)

</Issue>

<Issue id="titlebar-hairline-linux" title="Hairline transparent line below the title bar (Linux)">

On some Linux desktops, a 1-pixel fully transparent line can appear just below the window's title bar. It's easiest to notice when another window is directly behind Gnosis VPN, since whatever is behind shows through that single pixel row.

This happens because the app window doesn't set a custom title bar, so it uses your desktop's native GTK client-side decorations (CSD). GTK CSD windows get rounded corners and a drop shadow drawn by the compositor as an alpha-blended mask around the window. That mask's edge sits right at the boundary between the GTK-drawn title bar and the embedded WebKitGTK content area, and its antialiasing doesn't line up exactly with where the webview starts painting — leaving a single device-pixel row with no opaque paint, so the compositor blends in whatever is behind the window.

This is a known class of rendering artifact with GTK CSD + WebKitGTK (and shows up in other Linux apps built the same way, including Electron/Chromium apps with rounded CSD corners). It's purely cosmetic and does not affect the VPN connection or app functionality.

</Issue>

<Issue id="critical-error-during-initialization" title="Critical error during initialization after updating">

The client fails to start after an update and shows **Critical error during initialization**. This happens when you have used an earlier release of Gnosis VPN: the latest release runs on a different network, but your machine still holds the identity created on the old one. The safe belonging to that identity does not exist on the new network, so startup fails and retries in a loop.

**Symptoms**

- The app shows **Critical error during initialization**, with a construction or chain error mentioning the network endpoint.
- Syncing appears to resume on its own, then the same error returns shortly after.
- The service log repeats the same failure every 10 seconds:
   ```
   INFO  hopr_lib::builder: registering safe with this node safe_addr=<safe_address>
   ERROR hopr_lib::builder: safe registration failed safe_addr=<safe_address> error=safe registration error: safe <safe_address> does not exist
   WARN  hopr_chain_connector::connector: chain subscription stream ended, marking chain health as degraded
   ERROR gnosis_vpn_lib::hopr::api: error=Construction error: chain error: safe registration error: safe <safe_address> does not exist
   ERROR gnosis_vpn_lib::core: hopr runner failed to start - trying again in 10 seconds
   ```

**Resolution steps**

Resetting the client means backing up the identity, removing the original, and letting the client generate a new one on the current network.

:::warning

These steps discard the identity the client is currently using. Complete the backup and confirm it exists before running the removal command — the backup is what lets support restore your previous identity if it is ever needed.

:::

<Tabs groupId="operating-systems">
<TabItem value="macos" label="macOS">

1. Stop the service:
   ```bash
   sudo launchctl bootout system/com.gnosisvpn.gnosisvpnclient
   ```
2. Back up your current identity. The backup is written next to the identity, not inside it, so the next step cannot delete it:
   ```bash
   sudo cp -a /Library/Application\ Support/GnosisVPN/.config /Library/Application\ Support/GnosisVPN/.config.backup
   ```
3. Confirm the backup exists before continuing:
   ```bash
   sudo ls -la /Library/Application\ Support/GnosisVPN/.config.backup
   ```
4. Remove the current identity:
   ```bash
   sudo rm -rf /Library/Application\ Support/GnosisVPN/.config
   ```
5. Start the service again:
   ```bash
   sudo launchctl bootstrap system /Library/LaunchDaemons/com.gnosisvpn.gnosisvpnclient.plist
   ```

</TabItem>
<TabItem value="debian" label="Debian / Ubuntu">

1. Stop the service:
   ```bash
   sudo systemctl stop gnosisvpn.service
   ```
2. Back up your current identity. The backup is written next to the identity, not inside it, so the next step cannot delete it:
   ```bash
   sudo cp -a /var/lib/gnosisvpn/.config /var/lib/gnosisvpn/.config.backup
   ```
3. Confirm the backup exists before continuing:
   ```bash
   sudo ls -la /var/lib/gnosisvpn/.config.backup
   ```
4. Remove the current identity:
   ```bash
   sudo rm -rf /var/lib/gnosisvpn/.config
   ```
5. Start the service again:
   ```bash
   sudo systemctl start gnosisvpn.service
   ```

</TabItem>
</Tabs>

The client generates a new identity on the current network at the next start. This is a fresh account, so you need to fund it before you can connect — see [Funding your account](../get-started/funding.md).

</Issue>

</Issues>

## Still not working?

If the steps above don't resolve it, attach your client logs to your support ticket. See [Finding your logs](./logs.md) and [Reporting issues](../reporting/reporting-issues.md).
