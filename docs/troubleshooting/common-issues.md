---
sidebar_position: 2
title: Common issues
---

# Common issues

## Connected but no internet (or unstable)

The VPN reports a connected state, but internet access is missing or drops in and out.

### Symptoms

- The client status shows "Connected", but web browsers display timeout errors.
- Internet routing functions intermittently or drops completely every few minutes.
- IP verification websites (e.g. `ifconfig.me`, `icanhazip.com`) fail to load.

### Resolution steps

**macOS and Linux with GUI**

1. **Switch exit nodes:** click the location dropdown and select an alternative node with the lowest available latency (ms).
2. **Verify wallet balance:** click the wallet icon in the top-right corner. Ensure your account balance is sufficient; top up if it is depleted.
3. **Hard restart:** completely terminate the application. Right-click the Gnosis VPN tray icon, select **Quit**, and relaunch the application.

**Linux without GUI**

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

If this behavior persists, attach your client logs to your support ticket. See [Finding your logs](./logs.md).

## Connection handshake takes over 60 seconds

The client hangs indefinitely in a "Connecting" state when attempting to establish a tunnel with an exit node.

### Symptoms

- The interface or terminal status stays frozen in the connecting phase for over 1–2 minutes.
- Specific geographic locations fail to hand over traffic, while others connect instantly.
- Connection eventually succeeds, but only after an unacceptable delay.

### Resolution steps

**macOS and Linux with GUI**

1. Click the wallet icon to verify your account balance.
2. Pick an alternate exit node with lower latency.
3. Restart the app via the tray icon menu if it remains frozen.

**Linux without GUI**

1. Inspect the handshake state:
   ```
   gnosis_vpn-ctl status
   ```
2. Force a reconnection to a different node endpoint:
   ```
   gnosis_vpn-ctl connect --node <alternative_node_id>
   ```

If this behavior persists, attach your client logs to your support ticket. See [Finding your logs](./logs.md).
