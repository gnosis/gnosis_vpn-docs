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

<Tabs groupId="operating-systems" queryString>
<TabItem value="macos" label="macOS">

1. Download the latest `GnosisVPN-Installer.pkg` from the [downloads page](https://download.vpn.gnosis.eth.limo/) or the [latest GitHub release](https://github.com/gnosis/gnosis_vpn/releases/latest).
2. Double-click `GnosisVPN-Installer.pkg` to launch the installer. Follow the on-screen steps and click **Install**.
3. When the installation finishes, the Gnosis VPN app starts automatically. You can also launch it anytime from the **Applications** folder.

For a full list of files and directories the installer creates, see the [macOS reference page](../reference/file-locations-macos.md).

</TabItem>
<TabItem value="debian" label="Debian / Ubuntu">

**Install with one command**: this adds the Gnosis VPN APT repository, installs the signing key, and installs the package, so future releases arrive via your regular `sudo apt upgrade`:

```bash
curl -fsSL https://download.gnosisvpn.io/linux/install.sh | bash
```

The script prompts for sudo access itself when it needs it. Supported on 64-bit amd64 and arm64. This installs the `stable` channel by default. For the pre-release `snapshot` channel, see [Snapshot channel installation](#snapshot-channel-installation) below.

**Verify and run it yourself (optional)**: if you'd rather not pipe `curl` straight into `bash`, download and check the script first (requires `curl` and `sha256sum`):

1. Download and verify the install script:

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

3. Then execute it (it will prompt for sudo access itself):

   ```bash
   bash install.sh
   ```

4. Launch the Gnosis VPN app from your application menu, or from the
   terminal:

   ```bash
   gnosis_vpn-app
   ```

## Release channel installation

```bash
sudo install -d -m 0755 /etc/apt/keyrings

sudo curl -fsSLo /etc/apt/keyrings/gnosisvpn-archive-keyring.gpg \
  https://download.vpn.gnosis.eth.limo/linux/apt/gnosisvpn-archive-keyring.gpg

sudo tee /etc/apt/sources.list.d/gnosisvpn.sources > /dev/null <<'EOF'
Types: deb
URIs: https://download.vpn.gnosis.eth.limo/linux/apt
Suites: stable
Components: main
Architectures: amd64
Signed-By: /etc/apt/keyrings/gnosisvpn-archive-keyring.gpg
EOF

sudo apt update

sudo apt install gnosisvpn
```

Replace `amd64` with `arm64` if that's your machine's architecture.

## Snapshot channel installation

This is experimental: `snapshot` tracks pre-release builds that haven't been promoted to `stable` yet.

```bash
sudo install -d -m 0755 /etc/apt/keyrings

sudo curl -fsSLo /etc/apt/keyrings/gnosisvpn-archive-keyring.gpg \
  https://download.gnosisvpn.io/linux/apt/gnosisvpn-archive-keyring.gpg

sudo tee /etc/apt/sources.list.d/gnosisvpn.sources > /dev/null <<'EOF'
Types: deb
URIs: https://download.gnosisvpn.io/linux/apt
Suites: snapshot
Components: snapshot
Architectures: amd64
Signed-By: /etc/apt/keyrings/gnosisvpn-archive-keyring.gpg
EOF

sudo apt update

sudo apt install gnosisvpn
```

Replace `amd64` with `arm64` if that's your machine's architecture.

For a full list of files and directories the installer creates, see the [Debian reference page](../reference/file-locations-debian.md).

</TabItem>
</Tabs>

### After installing

Your Gnosis VPN account must be funded before you can connect. See [Funding your account](funding.md) for the next step.

## Onboarding tool

Participants in our tester program can use the Gnosis VPN self-onboarding tool:

[https://self-onboarding.gnosisvpn.com](https://self-onboarding.gnosisvpn.com)

The onboarding tool guides you through the setup process and helps you prepare everything needed to install and use Gnosis VPN.

You can use this option if you have been given a login and password for the Gnosis VPN onboarding tool. Access via the onboarding tool is currently gated. If you have not been given onboarding credentials but still want to use Gnosis VPN, you can use the manual installation option above.

To join the tester pool, please visit [https://vpn.gnosis.eth.limo](https://vpn.gnosis.eth.limo) and complete the form.
