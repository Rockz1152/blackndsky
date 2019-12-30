---
layout: default
title: Linux
permalink: /linux
---

# <center>Debian Quickstart</center>

## Download Installer ISO:
* Debian 9: [https://cdimage.debian.org/cdimage/archive/9.9.0/amd64/iso-cd/debian-9.9.0-amd64-netinst.iso](https://cdimage.debian.org/cdimage/archive/9.9.0/amd64/iso-cd/debian-9.9.0-amd64-netinst.iso)
* Debian 10: [https://cdimage.debian.org/cdimage/archive/10.0.0/amd64/iso-cd/debian-10.0.0-amd64-netinst.iso](https://cdimage.debian.org/cdimage/archive/10.0.0/amd64/iso-cd/debian-10.0.0-amd64-netinst.iso)

## Packages
- Choose only `OpenSSH Server`
- If installing a desktop environment see the [Debian with MATE](#debian-with-mate) section at the bottom.

## Script Summary
- Runs apt update
- Installs base software
- Turns off SSH MotD
- Sets up vim and bash
- Manually configure Network

## Running the Provision Script
See [Debian.txt]({{site.url}}{{page.url}}/Debian.txt){:target="_blank"} for full script

```
sudo apt install curl -y
curl -sL {{site.url}}{{page.url}}/Debian.txt | sudo bash && exec bash
```
Remove open-vm-tools if the install is bare metal
```
sudo apt autoremove open-vm-tools -y
```

A reboot is recommended after provisioning but not required
`sudo reboot now`

## Configure Network
Open the network interface config file
```
sudo vim /etc/network/interfaces
```

Change `dhcp` to `static` in the following section
```
auto ens32
iface ens32 inet dhcp
```

Add the missing interface information
```
auto ens32
iface ens32 inet static
address 192.168.0.XX
netmask 255.255.255.0
gateway 192.168.0.1
dns-nameservers 8.8.8.8 8.8.4.4
```

Reboot and connect with SSH

## Debian with MATE ##
At package selection, choose
- `Debian Desktop Environment`
- `MATE`
- `OpenSSH Server`

After Install
- System **>** Preferences **>** Look and Feel **>** Appearance
- Choose **"Black MATE"** or **"Blue-Submarine"**

Install MATE Tweak
 - `sudo apt install mate-tweak`

Disable desktop composition
- Control Center **>** Look and Feel **>** MATE Tweak **>** Windows **>** Window Manager **>** Choose `Marco(No compositor)`
