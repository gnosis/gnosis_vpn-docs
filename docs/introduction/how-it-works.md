---
sidebar_position: 4
title: How it works
---

# How does Gnosis VPN work?

Gnosis VPN operates by replacing the traditional, centralized VPN model with a decentralized, multi-hop routing system. Instead of trusting a single company's server with your traffic, Gnosis VPN separates the connection process across three distinct layers: your local Client, the decentralized HOPR Network, and an independent Exit node.

## Establishing a connection

1. **Connection initiation and local setup.** When you start a connection via the app or CLI (`gnosis_vpn-ctl`), your device's root system service (`gnosis_vpn-root`) takes charge. To keep your system secure, it spawns an unprivileged worker process (`gnosis_vpn-worker`) that handles the actual application logic and network communication.

2. **Secure handshake via the mixnet.** Instead of connecting directly to a VPN server, the worker process routes its initial communication through the HOPR mixnet. It uses this decentralized network of independent nodes to securely reach your selected exit node. Over this secure HOPR path, the worker registers your client's WireGuard public key and opens the necessary TCP and UDP sessions.

3. **Establishing the WireGuard tunnel.** Once the exit node accepts the connection and registers your key, the worker signals the root service to bring up the local VPN interface. Simultaneously, the exit node configures its side of the connection. This establishes a secure WireGuard tunnel between your device and the exit node, with the HOPR network acting as the transport layer in between.

## The traffic flow

Once the connection is fully established, your internet traffic follows a unique, privacy-preserving path:

- **From your device:** data enters the local WireGuard tunnel.
- **Through the HOPR network:** the data is relayed across multiple independent nodes in the HOPR mixnet. This multi-hop process protects your metadata, making it difficult for anyone to trace your activity or correlate network patterns.
- **To the exit node:** the traffic arrives at the exit node (the Gnosis VPN server), which acts as the bridge between the HOPR network and the regular web.
- **To the public internet:** the exit node forwards your traffic to its final destination. Websites will see the IP address and geographical location of the exit node, not your actual device.

When websites respond, the data travels back through the exit node, back across the HOPR mixnet, and finally to your device. By never relying on a single trusted intermediary, this architecture keeps your browsing activity private.
