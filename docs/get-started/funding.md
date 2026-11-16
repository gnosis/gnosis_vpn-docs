---
sidebar_position: 3
title: Funding your account
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Funding your account

After installation, your Gnosis VPN account must be funded before you can connect. Gnosis VPN runs on Gnosis Chain and needs two tokens there: **wxHOPR**, which pays the nodes that carry your traffic, and **xDAI**, which pays network fees.

:::tip Privacy consideration

If you want stronger privacy, consider separating your everyday wallet from the one you use to fund your Gnosis VPN account. Because blockchain transactions are public, it's best to reduce onchain links between identities before acquiring HOPR.

For example, you can use [privacypools.com](https://privacypools.com) to deposit ETH from your regular wallet into a pool on Ethereum mainnet, wait until your transaction blends with others, and then withdraw to a fresh wallet. To improve privacy, avoid withdrawing a unique amount. Choose a common denomination (e.g. 0.01 ETH) that many others are likely to use. You can then use the ETH in the new wallet to acquire HOPR and fund your Gnosis VPN account while keeping identities more separate.

This makes it harder to link your everyday wallet to your Gnosis VPN usage, but it does not guarantee anonymity. Your privacy level depends on factors like pool size, timing, amount selection, and your overall onchain behavior.

:::

## Funding your account for the first time

When you first open the app, it shows **Fund your VPN** with two ways to fund:

- **Open funding site** opens the [funding site](https://funding.vpn.gnosis.eth.limo/) with your VPN address filled in. Pay with a token you already hold, on Gnosis Chain, Ethereum, Arbitrum, Base, Optimism, Polygon, BNB Chain or Linea. The site converts it and delivers wxHOPR, plus a little xDAI for fees, to your VPN address.
- **Send funds directly** shows your VPN address as text and QR code, your current wxHOPR and xDAI balances, and how much of each to send at least. Send both tokens to that one address, on Gnosis Chain only: tokens sent on another network won't arrive.

Funds usually arrive within about 2 minutes. The app then finds your best route.

## Topping up your account

1. Open the Gnosis VPN app and go to **Settings → Usage**.
2. Under **Funding**, choose **Open funding site** or **Add funds directly**. They work as described above.

The Usage tab also warns when xDAI for fees runs low.

## Getting wxHOPR and xDAI yourself

Only needed if you send funds directly and don't hold these tokens yet.

### Step 1: Buy HOPR and DAI

Buy HOPR and DAI on Ethereum Mainnet using:

- a centralized exchange (e.g. Coinbase), or
- a decentralized exchange such as [CowSwap](https://swap.cow.fi/).

### Step 2: Bridge tokens to Gnosis Chain

You can bridge your tokens using one of the following options.

**Option A: Use the Gnosis Chain Bridge**

1. Go to the [Gnosis Chain Bridge](https://bridge.gnosischain.com/).
2. Connect your wallet on Ethereum Mainnet.
3. Select DAI and bridge it to Gnosis Chain. Once completed, you will have xDAI.
4. Stay on the Gnosis Chain Bridge.
5. Select HOPR and bridge it to Gnosis Chain. Once completed, you will have xHOPR.

**Option B: Use Trust Wallet**

1. Open Trust Wallet.
2. Use the built-in Swap / Bridge feature.
3. Bridge DAI → xDAI and HOPR → xHOPR. Trust Wallet will guide you through the process and handle the cross-chain transfer.

### Step 3: Wrap xHOPR to wxHOPR

1. Open [https://wrapper.hoprnet.org/](https://wrapper.hoprnet.org/)
2. Connect your wallet on Gnosis Chain.
3. Convert xHOPR → wxHOPR.

## Funding via the faucet

If you have been given a secret code, you can also fund your Gnosis VPN account via the faucet:

[https://faucet.vpn.gnosis.eth.limo](https://faucet.vpn.gnosis.eth.limo)

## Your identity

Every Gnosis VPN node manages access to the tokens it needs to function via a Safe smart account powered by HOPR Safe Staking. Your identity key is what links your client to that Safe, which handles payment channels and ticket settlement on Gnosis Chain.

:::warning Warning!
If the identity file is deleted or lost, the client generates a new one, meaning any funds, open payment channels, or Safe association tied to the old identity are no longer reachable from that client and can't be restored.
:::

Where your identity is stored:

Each user on the computer has their own identity, one per network. `<network>` is the network folder the client creates.

<Tabs groupId="operating-systems" queryString="os">
<TabItem value="macos" label="macOS">

- Identity (`hopr.id` and `hopr.pass`): `~/Library/Application Support/GnosisVPN/networks/<network>/`
- Safe (`hopr.safe`): `~/Library/Caches/GnosisVPN/networks/<network>/`

</TabItem>
<TabItem value="debian" label="Debian / Ubuntu">

- Identity (`hopr.id` and `hopr.pass`): `~/.local/share/gnosisvpn/networks/<network>/`
- Safe (`hopr.safe`): `~/.cache/gnosisvpn/networks/<network>/`

</TabItem>
</Tabs>

For a complete list of files and directories used by Gnosis VPN, see the reference pages for [macOS](../reference/file-locations-macos.md) and [Debian](../reference/file-locations-debian.md).
