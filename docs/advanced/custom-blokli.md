---
sidebar_position: 1
title: Using your own Blokli
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Using your own Blokli

Gnosis VPN reads everything it needs from Gnosis Chain, such as your Safe, your balances, your payment channels, your PIX payments and the exit nodes registered on-chain, through **Blokli**, the HOPR on-chain indexer and GraphQL API. By default, the client uses the hosted Blokli for its network, `https://blokli.piz-palu.gnosisvpn.io` for `piz-palu-prod`.

You can run your own Blokli and point the client at it instead. The client then sends its on-chain queries to your Blokli and no longer depends on the hosted one.

## Where to run Blokli

Run Blokli on a separate machine that your computer reaches through its router, such as a server or a VPS.

:::caution
Gnosis VPN can't use a Blokli on the same computer or on the same local network yet. When you connect, it routes Blokli traffic outside the tunnel through your router, which cuts off `localhost` on macOS and makes the connection fail on Linux.
:::

## Set up Blokli

1. **Follow the HOPR guide's setup.** On the machine that will run Blokli, follow [Set up Blokli](https://docs.hoprnet.org/node/run-blokli-locally#set-up-blokli) in the HOPR guide [Run Blokli locally](https://docs.hoprnet.org/node/run-blokli-locally). Keep `network = "piz-palu-prod"` in the configuration: it is the network the current release runs on. The client names your identity folder after the network Blokli reports, so a Blokli that indexes another network gives you a new, unfunded identity instead of your funded one.

2. **Turn on Curvy indexing before the first start.** Gnosis VPN pays for traffic with PIX payments, which settle through the Curvy contracts on Gnosis Chain. The client reads its PIX payment notes from Blokli, so without Curvy indexing, payments fail. Blokli indexes these contracts only when you turn this on.

   Open `docker-compose.yml` in the `docker` folder of the Blokli repository. Under the `bloklid` service, add two lines to its `environment` section and keep the line already there:

   ```yaml title="docker-compose.yml" {4-5}
   bloklid:
     environment:
       RUST_LOG: info,blokli_chain_indexer=debug
       BLOKLI_CURVY_AGGREGATOR: "0x3f2B578C6844b8D65b67dba4107db61D51b9020C"
       BLOKLI_INDEXER_ENABLE_CURVY_INDEXING: "true"
   ```

   - `BLOKLI_CURVY_AGGREGATOR` is the Curvy Aggregator contract. Blokli finds the other Curvy contracts from it when it starts.
   - `BLOKLI_INDEXER_ENABLE_CURVY_INDEXING` makes Blokli index the Curvy notes and nullifiers that PIX payments create, along with the HOPR data.

3. **Start Blokli and wait for the first sync.** Follow the guide's [Start Blokli](https://docs.hoprnet.org/node/run-blokli-locally#start-blokli) and [Wait for the first sync](https://docs.hoprnet.org/node/run-blokli-locally#wait-for-the-first-sync). In the configuration Blokli prints at startup, next to `network: piz-palu-prod`, check for:

   ```text
   indexer.enable_curvy_indexing: true
   ```

   Skip the guide's [Connect your node to Blokli](https://docs.hoprnet.org/node/run-blokli-locally#connect-your-node-to-blokli) section: it is for HOPRd nodes, and this page replaces it for Gnosis VPN.

4. **Check that Blokli is ready.** On the machine running Blokli, run:

   ```bash
   curl http://localhost:8080/readyz
   ```

   Continue when the response shows `"status":"ready"`. Until then, the client can't start and keeps retrying.

:::caution
Blokli can't add Curvy indexing to data it has already indexed without it. If you add the settings to a Blokli that has synced before, it refuses to index, and its log shows `Missing address/topic info in log topic info table`. To fix this, delete the indexed data and sync again from the start. This repeats the whole first sync.

```bash
docker compose down -v
```

```bash
docker compose up -d
```

:::

## Choose your Blokli URL

Reach Blokli through a public IP address or a domain. The client needs Blokli's base URL, without `/graphql`:

| Address                         | Blokli URL                     |
| ------------------------------- | ------------------------------ |
| A public IP address             | `http://<PUBLIC_IP>:8080`      |
| A domain, behind an HTTPS proxy | `https://<your-blokli-domain>` |

`<PUBLIC_IP>` is the public IPv4 address of the machine running Blokli, or of the router in front of it. A domain must point at that same address.

Before you use the URL, make sure that:

- **The port is forwarded.** If the machine running Blokli is behind a router, for example at home or in an office, forward Blokli's port on that router to the machine: `8080` for a public IP, or your HTTPS proxy's port, usually `443`, for a domain. A VPS with its own public IP needs no forwarding.
- **The firewall allows the port** on the machine running Blokli.
- **The URL has the right port.** If you [changed Blokli's port](https://docs.hoprnet.org/node/run-blokli-locally#change-the-default-ports) or forward a different one, use that port instead of `8080`.
- **The address is IPv4.** The client doesn't connect to Blokli over IPv6, so a domain needs an IPv4 (`A`) record.

:::note
The HOPR guide serves Blokli over plain HTTP. With a public IP, anyone on the way can read and change your on-chain queries. A domain with an HTTPS proxy avoids this.

If Blokli runs behind the same router as the computer running Gnosis VPN, the router must support NAT loopback, also called hairpin NAT, to reach its own public address.
:::

## Point the client at your Blokli

The Blokli URL is a setting of the client service, so it applies to every user on the computer. Changing it restarts the service, which drops an active VPN connection.

<Tabs groupId="operating-systems" queryString="os">
<TabItem value="macos" label="macOS">

The URL is set in the service definition, `/Library/LaunchDaemons/com.gnosisvpn.gnosisvpnclient.plist`.

1. Replace the URL, using your Blokli URL in place of `https://blokli.example.com`:

   ```bash
   sudo plutil -replace EnvironmentVariables.GNOSISVPN_HOPR_BLOKLI_URL -string "https://blokli.example.com" /Library/LaunchDaemons/com.gnosisvpn.gnosisvpnclient.plist
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

The URL is set in `/etc/gnosisvpn/gnosisvpn-dynamic.env`, which the package writes during installation. To change it, reinstall the package with your URL, using your Blokli URL in place of `https://blokli.example.com`:

1. Refresh the package list:

   ```bash
   sudo apt update
   ```

2. Reinstall Gnosis VPN with your Blokli URL:

   ```bash
   sudo env GNOSISVPN_HOPR_BLOKLI_URL=https://blokli.example.com apt-get install --reinstall gnosisvpn
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
