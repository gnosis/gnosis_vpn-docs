---
sidebar_position: 5
title: Hardening your setup
---

# Hardening your setup

This page lists what you can do to reduce how much any one party learns about you when you use Gnosis VPN. Some of it is configuration and some of it is how you use the app. The Privacy model explains the reasoning behind each item. Where an item names a setting, the setting lives in `/etc/gnosisvpn/config.toml` unless the item says otherwise.

## Funding

- Fund the account from a wallet that isn't tied to you. The funding page describes one way to move ETH into a fresh wallet through Privacy Pools. A fresh funding wallet removes the link between your everyday wallet and the VPN account, although the account's own activity stays visible on chain.
- If you want to start again with a new account, spend or move the balance first. The account lasts as long as its identity file, and deleting that file makes the funds unreachable from that client.

## Sessions

The exit sees everything in one session under a single pseudonym, so how you use sessions affects how much of your activity one exit can connect.

- Keep activities you don't want connected in separate sessions. To the exit, one session is one visitor.
- Start a new session yourself when you want a clean break. Disconnecting and connecting again, or choosing another exit, gives the new session a new pseudonym and a new WireGuard key.
- Don't count on a dropped connection to separate two activities. When the client reconnects by itself, it keeps the same WireGuard key and tries to continue the same session.
- Choose a different exit when the separation matters. A new pseudonym hides little from an exit operator who has already carried your earlier session and can see client IP addresses, whereas a different exit operator has carried none of that session.
- Don't sign in to an account that identifies you during a session you want kept apart from your name. The exit sees which sites a session visits, and the site knows who signed in.

## Network

- Run your own Blokli server and point the client at it with `GNOSISVPN_HOPR_BLOKLI_URL`. The hosted server then no longer sees your IP address or tells your client which keys belong to an exit. Your Blokli server needs a Gnosis Chain RPC endpoint, and that endpoint's provider sees its queries unless the endpoint is your own node. Running your own Blokli server does not change what relay and exit operators can see, or what the chain shows.
- Pin an exit you have reason to trust by adding a `[destinations.<name>]` entry with the exit's address. Values in your config take priority over what the exit publishes about itself.
- Add a second relay by giving a destination `path = { hops = 2 }` and starting the service with `--allow-experimental`. Expect lower speed and a higher price per GB.
- Avoid `hops = 0` for anything private, since it connects you straight to the exit. The client refuses `hops = 0` unless it was started with `--allow-insecure`.
- Set your own DNS resolvers under `[wireguard]` with `dns = { overwrite = true, servers = "..." }`, or turn on encrypted DNS in your browser. Otherwise exits send lookups to Cloudflare (1.1.1.1) and Google (8.8.8.8).
- Use HTTPS. The exit can read anything sent over plain http, and with HTTPS the exit sees only which site you connect to.
- Set `lan_lockdown = true` under `[connection]` on networks you don't trust. By default, devices on your local network stay reachable outside the tunnel.
- Leave bootstrap mode off for anything private once it exists, because Gnosis would then run both your relay and your exit.

## Software

- Verify the release signature before installing, or build from source: [gnosis_vpn-client](https://github.com/gnosis/gnosis_vpn-client), [hoprnet](https://github.com/hoprnet/hoprnet).
