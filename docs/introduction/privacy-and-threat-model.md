---
sidebar_position: 5
title: Privacy and threat model
---

# Privacy and threat model

Gnosis VPN is designed to prevent any single party from seeing both who you are and what you are accessing. No system protects against everything, and honest limits matter more for a privacy tool than broad claims. This page describes what each party in the system can and cannot observe, which adversaries the design does and does not defend against, and which questions are still open during the El Dorado beta.

:::info Beta status
El Dorado is beta software. Some protections described here are still being tested and hardened, and some operational properties (such as current cover-traffic levels) are not yet measured or published. Where that is the case, this page says so explicitly rather than assuming the best case.
:::

## What Gnosis VPN is designed to protect against

- **Your ISP or local network observer** learning which websites and services you use. They can see that you are sending encrypted traffic into the HOPR network, but not its destination or content.
- **Destination websites** learning your IP address and location. They see the exit node's IP address, not yours.
- **Any single relay operator** reconstructing your activity. Each HOPR relay only sees encrypted packets and its immediate neighbours in the route, not the full path from you to the destination.
- **A traditional VPN provider's position of total visibility.** Unlike a single-provider VPN, no one operator sits in a position to observe your identity, your destinations, and your timing all at once.

## What each party can see

<!-- TODO(engineering): confirm each row below against the current El Dorado
     deployment before publishing. Rows marked "needs confirmation" are
     inferred from the architecture, not verified. -->

| Party | Can see | Cannot see |
|---|---|---|
| Your ISP / local network | That your device exchanges encrypted traffic with HOPR entry points; traffic volume and timing | Destinations, content, which exit node you use |
| HOPR entry relay | Your IP address; that you are using HOPR; encrypted packets and the next hop | Your destination, the exit node, content <!-- TODO(engineering): confirm entry relay cannot identify traffic as Gnosis VPN traffic --> |
| Intermediate HOPR relays | Encrypted packets; previous and next hop | Your IP, the destination, content, the full route |
| Exit node | Destination IP addresses and ports; traffic timing and volume; full content of non-HTTPS traffic; connection metadata of HTTPS traffic | Your IP address and identity <!-- TODO(engineering): confirm what the exit-server "user statistics" command exposes to operators --> |
| Destination websites | The exit node's IP address and location; whatever your browser or app reveals (cookies, fingerprinting, logins) | Your real IP address |
| On-chain observers (Gnosis Chain) | Funding addresses, channel balances, and payment-channel activity for your VPN account | Your traffic, destinations, or content <!-- TODO(engineering): confirm what session-level linkability exists between on-chain activity and exit-node sessions --> |
| Gnosis VPN services (onboarding, indexing) | <!-- TODO(engineering): document what the onboarding and indexing services log and retain --> | |

## What Gnosis VPN does not protect against

- **The exit node sees where your traffic goes.** HOPR conceals the relationship between you and the exit node — it does not eliminate the exit node. The exit sees destination IPs and timing for all of your traffic, and the full content of any connection that is not itself encrypted (use HTTPS).
- **What you reveal at the application layer.** Logging into an account, browser fingerprinting, cookies, and WebRTC can identify you to a website regardless of how your traffic is routed.
- **A sufficiently powerful global observer.** Like all mixnets, HOPR's protection against an adversary who can watch traffic at many points in the network at once depends on the size of the network and the amount of simultaneous traffic. <!-- TODO(engineering): state current cover-traffic behaviour in the El Dorado deployment, or state explicitly that levels are not yet published -->
- **Colluding parties.** Certain combinations of parties can weaken the guarantees above — for example an entry relay colluding with an exit node, or an on-chain observer correlating payment activity with an exit operator's records. <!-- TODO(engineering): enumerate which collusion scenarios break which guarantees -->
- **Compromise of your own device.** Malware or an attacker with access to your machine sees your traffic before it enters the tunnel.

## Trust assumptions

- **Exit node operators.** Exit nodes are operated independently of the HOPR relays that route your traffic. <!-- TODO(team): document who operates exit nodes, admission requirements, jurisdictions, logging and retention policy -->
- **Relay operators.** The privacy of the mixnet layer assumes relays are run by many independent operators and that your route's relays do not all collude.
- **Payment layer.** Accounts are funded with wxHOPR and xDAI on Gnosis Chain. On-chain activity is public by design; see [Funding your account](../get-started/funding.md) for wallet-privacy guidance. <!-- TODO(engineering): document whether repeated sessions are linkable via the payment layer and whether the exit learns the payer's on-chain identity -->

## Open items during the beta

The following are not yet documented or independently verified. They are listed here so you can make an informed decision rather than assume protection that has not been demonstrated:

- Measured anonymity-set size and cover-traffic levels in the current deployment.
- A leak-protection specification: DNS handling, IPv6 behaviour, kill-switch semantics during startup, crashes, reconnects, and exit switching.
- An independent end-to-end security assessment of the complete system (client, root-service boundary, HOPR integration, exit server).

If your safety depends on strong anonymity guarantees, do not rely on beta software. Gnosis VPN in its current state is appropriate for reducing routine metadata exposure, not for high-risk threat models.
