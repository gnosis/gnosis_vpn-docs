---
sidebar_position: 2
title: Installation
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Installation

There are currently two ways to install and set up Gnosis VPN El Dorado.

## Manual installation

This route is open to everyone but assumes some technical knowledge. You'll download the client yourself, install it manually, and fund your VPN account with tokens before connecting.

:::warning Upgrading from an older version?

Uninstall the older version first — this step is mandatory before installing a newer version. See [Managing the client](managing-the-client.md).

:::

<Tabs groupId="operating-systems">
<TabItem value="macos" label="macOS">

1. Download the latest `GnosisVPN-Installer.pkg` from the [downloads page](https://downloads.vpn.gnosis.eth.limo/) or the [latest GitHub release](https://github.com/gnosis/gnosis_vpn/releases/latest).
2. Double-click the downloaded file to run the installer.

</TabItem>
<TabItem value="debian" label="Debian / Ubuntu">

**Via the APT repository (recommended)** — you then get updates through `apt upgrade`:

```bash
curl -fsSL https://download.gnosisvpn.io/linux/install.sh | sudo bash
```

**Or install the package by hand:**

1. Download the latest `gnosisvpn_<arch>.deb` package from the [downloads page](https://downloads.vpn.gnosis.eth.limo/) or the [latest GitHub release](https://github.com/gnosis/gnosis_vpn/releases/latest).
2. Run the installation procedure:

```bash
# assuming download to the default location; replace <arch> with your architecture
sudo apt install ~/Downloads/gnosisvpn_<arch>.deb
```

</TabItem>
</Tabs>

For a full list of files and directories the installer creates, see the reference pages for [macOS](../reference/file-locations-macos.md) and [Debian](../reference/file-locations-debian.md).

### After installing

Your Gnosis VPN account must be funded before you can connect. See [Funding your account](funding.md) for the next step.

## Onboarding tool

Participants in our tester program can use the Gnosis VPN self-onboarding tool:

[https://self-onboarding.gnosisvpn.com](https://self-onboarding.gnosisvpn.com)

The onboarding tool guides you through the setup process and helps you prepare everything needed to install and use Gnosis VPN.

You can use this option if you have been given a login and password for the Gnosis VPN onboarding tool. Access via the onboarding tool is currently gated. If you have not been given onboarding credentials but still want to use Gnosis VPN, you can use the manual installation option above.

To join the tester pool, please visit [https://vpn.gnosis.eth.limo](https://vpn.gnosis.eth.limo) and complete the form.
