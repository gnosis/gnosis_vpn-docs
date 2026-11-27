---
sidebar_position: 5
title: Privacy model
---

# Privacy model

Gnosis VPN is a WireGuard tunnel for your whole device, carried over the HOPR network. Your device joins the network as a node, chooses a route and mixes its own packets before sending them through a relay to the exit you picked. The client's mixer holds packets for up to about 1 ms, and relays hold them for up to 20 ms by default.

The aim is that no single party holds both WHO you are (your IP address, and anything that ties the account to you) and WHAT you do (the sites and services you reach). This page sets out who sees which of the two today, where that separation depends on trust, and what you can change yourself.

## Who sees what

| Party                       | WHO                                                                               | WHAT                                                         | Notes                                                           |
| --------------------------- | --------------------------------------------------------------------------------- | ------------------------------------------------------------ | --------------------------------------------------------------- |
| Your internet provider      | Your IP address, and that you use Gnosis VPN                                      | Nothing                                                      | The same is true of any VPN.                                    |
| Relays                      | Your IP address and when you are online                                           | Nothing                                                      | The relay on your route also knows which exit you use.          |
| The exit                    | A session pseudonym. Exit operators can also see client IP addresses (see below). | Sites and services, DNS lookups, anything sent without HTTPS | With HTTPS the exit sees which site, not the content.           |
| DNS resolver                | The exit's address, not yours                                                     | Your lookups                                                 | Cloudflare (1.1.1.1) and Google (8.8.8.8) unless you change it. |
| Blokli server               | Your IP address                                                                   | Nothing                                                      | Sees the chain data your client asks for.                       |
| Anyone reading Gnosis Chain | Your VPN account and the wallet that funded it                                    | Nothing                                                      | Shows when and roughly how much the account is used.            |
| Curvy relayer               | Normally the exit's address                                                       | Nothing                                                      | Sees the timing of payments to exits and could refuse them.     |

Operators decide what their own relays and exits record, and the node software can export per-session metrics if an operator turns that on. Assume an operator can keep whatever the node sees.

## Sessions and payment

Each connection is a session under a random pseudonym chosen by your client. The exit replies along single-use return paths supplied by the client, so the exit never needs the client's address, and everything in one session reaches the exit under that one pseudonym. A session ends when you disconnect or switch exit, and the next session gets a new pseudonym and a new WireGuard key. When a connection drops and the client reconnects by itself, the client keeps the key and tries to continue the same session.

You pay per use in wxHOPR from an account on Gnosis Chain, which consists of a key generated on your device and a Safe that holds the funds. There is no cash or card option. Exits are paid through PIX, in blocks of about 660 MB per session. The client pays out of a balance it keeps in Curvy, a third-party shielded pool, into a one-off address, so the chain does not show which account paid which exit. Curvy's relayer submits those payments on the client's behalf.

## Where you’re trusting that this separation is maintained

Some current features of Gnosis VPN do still require a measure of trust. We have attempted to list and explain these below. We are working hard to mitigate these for everyone. Some can already be mitigated by making wise choices in setup and usage (see Hardening Your Setup).

We do not intend to make excuses, but for context we do also note that these trust assumptions are generally much worse elsewhere.

### One relay by default

**What it is:** With one relay on the route, the relay's operator knows your IP address and which exit you use, and the exit's operator knows what you do.

**Who could use it:** One operator running both nodes, or two operators who share records. The client favours faster relays, so an operator with several fast relays is chosen more often.

**By comparison:** A VPN company is in that position on every route it offers, its multi-hop routes included, because it runs every server.

**Mitigation:** You can add relays today by starting the service with `--allow-experimental`, at some cost in speed and price. Routes that step up to a target number of relays automatically are on the roadmap. Whether the default changes has not been decided.

### Operators can see your IP address

**What it is:** To measure routes, the client contacts relays and exits directly and probes them every few seconds, so their operators can see that a given IP address uses Gnosis VPN, and when.

**Who could use it:** Any relay or exit operator, although an IP address alone says nothing about what its user does. An exit operator carries your traffic and can also see client IP addresses, so could attempt to work out which IP address a session's traffic belongs to.

**By comparison:** Every website you visit learns your IP address, and a VPN company learns the IP address of every customer.

**Mitigation:** Reducing the number of nodes a client contacts directly is on the roadmap.

### The Blokli server

**What it is:** The client reads Gnosis Chain and submits its transactions through a Blokli server, which it contacts outside the tunnel. The server's operator sees your IP address and the chain data your client asks for, and the client takes Blokli's word for which keys belong to which exit.

**Who could use it:** Whoever controls the Blokli server. Seeing your IP address takes that operator no effort, whereas putting the server between you and an exit would take a deliberate attack. The default Blokli server is hosted by **[dev to confirm which entity]**.

**By comparison:** A wallet's RPC provider sees its users' IP addresses and wallet addresses in the same way.

**Status:** You can run your own Blokli server today (see Hardening your setup). The trust then moves to the Gnosis Chain RPC endpoint behind your server, or to nobody if that endpoint is your own node.

### Timing

**What it is:** Someone who can watch your connection and your exit's connection at the same moment can try to match them by timing and volume.

**Who could use it:** In practice, a large network operator or a state.

**By comparison:** Low-latency networks in general do not defend against this kind of observer.

**Status:** Cover traffic nodes on the HOPR network send bursts of packets through relays, which pays the relays, checks that they are reachable and gives a basic level of cover. In the current configuration each relay receives a 10-second burst about every 20 minutes **[dev to confirm this configuration is deployed]**. Clients could also generate cover traffic of their own. The code for that exists in the HOPR libraries but is not part of current builds.

## What the chain shows

Gnosis Chain is public. Anyone can see your VPN account, each payment into it and the wallet the payment came from, and the account's payment-channel activity shows when and roughly how much the account is used. What the account says about you depends on how you fund it: an account funded from a wallet in your name can be traced to you, and one funded from a fresh wallet is a key with a balance. A VPN company holds the equivalent record privately, tied to a card or an email address.

## Bootstrap mode

Bootstrap mode does not exist yet. It is planned as a setting, off by default, that routes you through relays and exits run by Gnosis so that the app can be tried on a stable path. With bootstrap mode on, Gnosis would see both WHO and WHAT. No relays or exits run by HOPR or Gnosis are in operation at present **[dev to confirm]**.

## Status

Gnosis VPN is in early access on macOS (Apple Silicon) and on Debian and Ubuntu Linux. If being identified would put you in danger, hold off until the single-relay default and the direct contact with every relay and exit have both changed. The code is public ([gnosis_vpn-client](https://github.com/gnosis/gnosis_vpn-client), [hoprnet](https://github.com/hoprnet/hoprnet)) and releases are signed. This page is updated when any of the above changes.
