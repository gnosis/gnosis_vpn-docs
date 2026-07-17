---
sidebar_position: 1
title: Overview
---

# What is Gnosis VPN?

Gnosis VPN is a privacy-focused VPN built on the HOPR mixnet. It lets you route internet traffic through HOPR-based infrastructure instead of sending it through a single centralized VPN provider. The aim is to provide a familiar VPN experience while reducing the amount of metadata exposed to any single party. For a detailed account of what each party in the system can and cannot see — and what this design does not protect against — read [Privacy and threat model](./privacy-and-threat-model.md).

## How it differs from a traditional VPN

Traditional VPNs usually create an encrypted tunnel between you and one VPN provider. This can hide your IP address from websites, but it also means the VPN provider may be able to observe connection metadata.

Gnosis VPN takes a different approach by using HOPR as the routing layer underneath the VPN client. This reduces reliance on a single trusted operator and is designed to limit what can be observed about your activity, including where traffic comes from, where it exits, and when communication happens.
