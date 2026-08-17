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

<Tabs groupId="operating-systems">
<TabItem value="macos" label="macOS">

1. Download the latest `GnosisVPN-Installer.pkg` from the [downloads page](https://download.vpn.gnosis.eth.limo/) or the [latest GitHub release](https://github.com/gnosis/gnosis_vpn/releases/latest).
2. Double-click `GnosisVPN-Installer.pkg` to launch the installer. Follow the on-screen steps and click **Install**.
3. When the installation finishes, the Gnosis VPN app starts automatically. You can also launch it anytime from the **Applications** folder.

</TabItem>
<TabItem value="debian" label="Debian / Ubuntu">

**Via the APT repository (recommended)** — the app then receives updates automatically the `sudo apt upgrade`:

1. Download and verify the install script, which adds the Gnosis VPN APT
   repository and installs the package (requires `curl` and `sha256sum`):

   ```bash
   curl -fsSLO https://download.gnosisvpn.io/linux/install.sh && \
   curl -fsSLO https://download.gnosisvpn.io/linux/install.sh.sha256 && \
   sha256sum -c install.sh.sha256
   ```

   `install.sh: OK` means the checksum is correct.

2. You can optionally inspect the script to see what it does before executing it:

   ```bash
   less install.sh
   ```

3. Then execute it:

   ```bash
   sudo bash install.sh
   ```

4. Launch the Gnosis VPN app from your application menu, or from the
   terminal:

   ```bash
   gnosis_vpn-app
   ```

**Or install the package manually** — note that you won't receive automatic
updates and will need to repeat these steps for each new release:

1. Download the latest `gnosisvpn_<arch>.deb` package from the [downloads page](https://download.vpn.gnosis.eth.limo/) or the [latest GitHub release](https://github.com/gnosis/gnosis_vpn/releases/latest).

2. Install the package (adjust the path and `<arch>` to match your download):

   ```bash
   sudo apt install ~/Downloads/gnosisvpn_<arch>.deb
   ```

3. Launch the Gnosis VPN app from your application menu, or from the
   terminal:

   ```bash
   gnosis_vpn-app
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
