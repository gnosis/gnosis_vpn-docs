---
sidebar_position: 1
title: Using your own Blokli
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Using your own Blokli

Gnosis VPN reads everything it needs from Gnosis Chain, such as your Safe, your balances, your payment channels and the exit nodes registered on-chain, through **Blokli**, the HOPR on-chain indexer and GraphQL API. By default, the client uses the hosted Blokli for its network, `https://blokli.piz-palu.gnosisvpn.io` for `piz-palu-prod`.

You can run your own Blokli and point the client at it instead. The client then sends its on-chain queries to your Blokli and no longer depends on the hosted one.

If you run a Gnosis VPN exit node, its Blokli needs two extra settings. See [Run Blokli for an exit node](#run-blokli-for-an-exit-node).

## Before you start

1. **Run Blokli and wait for its first sync.** Follow the HOPR guide [Run Blokli locally](https://docs.hoprnet.org/node/run-blokli-locally) up to and including [Wait for the first sync](https://docs.hoprnet.org/node/run-blokli-locally#wait-for-the-first-sync). Skip its [Connect your node to Blokli](https://docs.hoprnet.org/node/run-blokli-locally#connect-your-node-to-blokli) section: it is for HOPRd nodes, and this page replaces it for Gnosis VPN.

2. **Index the network your client uses.** The current release runs on `piz-palu-prod`, the network the HOPR guide sets up. The client names your identity folder after the network Blokli reports, so a Blokli that indexes another network gives you a new, unfunded identity instead of your funded one.

3. **Check that Blokli is ready.** On the machine running Blokli, run:

   ```bash
   curl http://localhost:8080/readyz
   ```

   Continue when the response shows `"status":"ready"`. Until then, the client can't start and keeps retrying.

## Choose your Blokli URL

The client needs Blokli's base URL, without `/graphql`:

| Where Blokli runs                          | Blokli URL                                                                  |
| ------------------------------------------ | --------------------------------------------------------------------------- |
| On the same computer as Gnosis VPN         | `http://localhost:8080`                                                     |
| On another machine in your network         | `http://<BLOKLI_IP>:8080`, where `<BLOKLI_IP>` is that machine's IP address |
| Behind your own HTTPS proxy or on a domain | `https://<your-blokli-domain>`                                              |

- If you [changed Blokli's port](https://docs.hoprnet.org/node/run-blokli-locally#change-the-default-ports), use that port instead of `8080`.
- If Blokli runs on another machine, allow its port in that machine's firewall. The connection is plain HTTP, so use it only on a network you trust.
- The host name must resolve to an IPv4 address. The client doesn't connect to Blokli over IPv6.

## Point the client at your Blokli

The Blokli URL is a setting of the client service, so it applies to every user on the computer. Changing it restarts the service, which drops an active VPN connection.

<Tabs groupId="operating-systems" queryString="os">
<TabItem value="macos" label="macOS">

The URL is set in the service definition, `/Library/LaunchDaemons/com.gnosisvpn.gnosisvpnclient.plist`.

1. Replace the URL, using your Blokli URL in place of `http://localhost:8080`:

   ```bash
   sudo plutil -replace EnvironmentVariables.GNOSISVPN_HOPR_BLOKLI_URL -string "http://localhost:8080" /Library/LaunchDaemons/com.gnosisvpn.gnosisvpnclient.plist
   ```

2. Check the new value:

   ```bash
   plutil -extract EnvironmentVariables.GNOSISVPN_HOPR_BLOKLI_URL raw /Library/LaunchDaemons/com.gnosisvpn.gnosisvpnclient.plist
   ```

3. Reload the service so it reads the changed file. A restart with `launchctl kickstart` keeps the old URL.

   ```bash
   sudo launchctl bootout system /Library/LaunchDaemons/com.gnosisvpn.gnosisvpnclient.plist
   ```

   ```bash
   sudo launchctl bootstrap system /Library/LaunchDaemons/com.gnosisvpn.gnosisvpnclient.plist
   ```

   If `bootstrap` fails with `Input/output error`, the service hasn't finished stopping yet. Wait a few seconds and run it again.

:::caution
Installing a new version of Gnosis VPN replaces this file and sets the hosted Blokli again. Repeat these steps after every upgrade.
:::

</TabItem>
<TabItem value="debian" label="Debian / Ubuntu">

The URL is set in `/etc/gnosisvpn/gnosisvpn-dynamic.env`, which the package writes during installation. To change it, reinstall the package with your URL, using your Blokli URL in place of `http://localhost:8080`:

1. Refresh the package list:

   ```bash
   sudo apt update
   ```

2. Reinstall Gnosis VPN with your Blokli URL:

   ```bash
   sudo env GNOSISVPN_HOPR_BLOKLI_URL=http://localhost:8080 apt-get install --reinstall gnosisvpn
   ```

   The package checks the URL, writes it and starts the service again.

3. Check the new value:

   ```bash
   cat /etc/gnosisvpn/gnosisvpn-dynamic.env
   ```

   The file should contain `GNOSISVPN_HOPR_BLOKLI_URL=` followed by your URL.

Upgrades with `apt upgrade` keep your URL. Re-running the [install script](../get-started/installation.md) with `--network` replaces it with the hosted Blokli of that network.

</TabItem>
</Tabs>

## Check that the client uses your Blokli

Start the client from the app or with `gnosis_vpn-ctl`, then open your [worker log](../troubleshooting/logs.md).

- A line with `blokli network` and `piz-palu-prod` means the client reached your Blokli and runs on the right network.
- `blokli network not queryable - retrying`, followed by your URL, means the client can't query your Blokli yet. Check that Blokli is running, that `/readyz` reports `ready`, and that the URL and port are right. The client keeps retrying, so it starts on its own once Blokli answers.

## Switch back to the hosted Blokli

Repeat the steps in [Point the client at your Blokli](#point-the-client-at-your-blokli) with the hosted URL, `https://blokli.piz-palu.gnosisvpn.io`.

On macOS, installing Gnosis VPN again also restores it.

## Run Blokli for an exit node

Exit nodes are paid through PIX payments, which settle through the Curvy contracts on Gnosis Chain. Blokli indexes these contracts only when you turn this on, so a Blokli for an exit node needs two extra settings.

Follow the HOPR guide [Run Blokli locally](https://docs.hoprnet.org/node/run-blokli-locally), with these changes:

1. **Turn on Curvy indexing before the first start.** After the guide's [Set up Blokli](https://docs.hoprnet.org/node/run-blokli-locally#set-up-blokli) steps, and before you start Blokli, open `docker-compose.yml` in the `docker` folder of the Blokli repository. Under the `bloklid` service, add two lines to its `environment` section and keep the line already there:

   ```yaml title="docker-compose.yml" {4-5}
   bloklid:
     environment:
       RUST_LOG: info,blokli_chain_indexer=debug
       BLOKLI_CURVY_AGGREGATOR: "0x3f2B578C6844b8D65b67dba4107db61D51b9020C"
       BLOKLI_INDEXER_ENABLE_CURVY_INDEXING: "true"
   ```

   - `BLOKLI_CURVY_AGGREGATOR` is the Curvy Aggregator contract. Blokli finds the other Curvy contracts from it when it starts.
   - `BLOKLI_INDEXER_ENABLE_CURVY_INDEXING` makes Blokli index the Curvy notes and nullifiers that PIX payments create, along with the HOPR data.

2. **Start Blokli and check the setting.** Continue with the guide's [Start Blokli](https://docs.hoprnet.org/node/run-blokli-locally#start-blokli) and [Wait for the first sync](https://docs.hoprnet.org/node/run-blokli-locally#wait-for-the-first-sync). In the configuration Blokli prints at startup, next to `network: piz-palu-prod`, check for:

   ```text
   indexer.enable_curvy_indexing: true
   ```

3. **Connect your exit node.** Your exit node runs HOPRd, so follow the guide's [Connect your node to Blokli](https://docs.hoprnet.org/node/run-blokli-locally#connect-your-node-to-blokli) to set its `blokli_url`. With the DAppNode exit node package, enter the URL in the setup wizard's **Blokli provider URL (advanced)** field instead.

:::caution
Blokli can't add Curvy indexing to data it has already indexed without it. If you add the settings to a Blokli that has synced before, it refuses to index, and its log shows `Missing address/topic info in log topic info table`. To fix this, delete the indexed data and sync again from the start. This repeats the whole first sync.

```bash
docker compose down -v
```

```bash
docker compose up -d
```

:::
