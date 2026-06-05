---
sidebar_position: 3
title: Architecture
---

# Architecture overview

Gnosis VPN is a decentralized VPN built on top of the HOPR mixnet, designed to provide privacy-preserving internet access without relying on centralized infrastructure.

Unlike a traditional VPN, where traffic usually goes through servers controlled by one company, Gnosis VPN uses a decentralized network of independent nodes. This helps reduce reliance on a single provider and improves privacy.

Gnosis VPN is composed of several main components:

- **Client** — the user-facing application or CLI and local components such as Root and Worker.
- **The HOPR network** — provides the decentralized routing layer.
- **Exits** — exit nodes, which run the Gnosis VPN server side and forward VPN traffic to the public internet.

![Gnosis VPN architecture: the Client (App UI/CLI, Root System Service, Worker Process) connects through the HOPR network to the Exit nodes.](/img/gnosis_vpn_architecture.png)

## Client

The client runs on your device and is responsible for managing the VPN connection. It includes the user-facing application or CLI, as well as local components that prepare and maintain the connection. The client offers three binaries:

- `gnosis_vpn-root`
- `gnosis_vpn-worker`
- `gnosis_vpn-ctl` (CLI)

The client system service (`gnosis_vpn-root`) runs with root privileges and takes care of routing setup. It spawns the worker process (`gnosis_vpn-worker`), which is responsible for the application logic. The control application (`gnosis_vpn-ctl`) is used to manage the client and its connections.

## The HOPR network

Gnosis VPN routes traffic through the HOPR mixnet — a decentralized network designed to protect both data and metadata. Instead of a single tunnel, traffic is relayed across multiple independent nodes, making it difficult to trace user activity or correlate network patterns. Gnosis VPN is implemented as a service layer on top of this network, rather than replacing it.

## Exits

Exit nodes are the server-side endpoints of a Gnosis VPN connection. They receive the VPN connection from the client side and forward your traffic to the public internet. In the Gnosis VPN architecture, an exit node runs the Gnosis VPN server component together with a WireGuard server.

During connection setup, the client-side Worker communicates with the selected exit node, registers the client's WireGuard public key, and opens the required network sessions. After that, the local VPN interface can be brought up on your device.

An exit node is responsible for:

- Accepting the client connection
- Registering the client's WireGuard public key
- Managing the WireGuard server-side configuration
- Forwarding VPN traffic to the public internet
- Returning responses back to the client through the VPN path

The visible IP address and location are determined by the exit node's network connection. For example, if the selected exit node is hosted in a specific region, websites will usually see traffic as coming from that region.

:::info
Exit nodes should not be described as ordinary HOPR relay nodes. In this context, they are Gnosis VPN server-side nodes that use the HOPR-based connection flow and provide the final path from the VPN tunnel to the public internet.
:::

Their availability and performance may depend on several factors, including server uptime, public reachability, network configuration, WireGuard configuration, and the selected route through the network.
