---
layout: default
title: Linux
permalink: /linux
---

# <center>Debian Quickstart</center>

## Download Installer
- Debian 10: [https://cdimage.debian.org/debian-cd/current/amd64/iso-cd/](https://cdimage.debian.org/debian-cd/current/amd64/iso-cd/){:target="_blank"}
- Get the current `debian-10.X.0-amd64-netinst.iso`

### Firmware Included
- If you are installing on a laptop and need extra drivers for WiFi, get the appropriate installer from:
  - [https://cdimage.debian.org/cdimage/unofficial/non-free/cd-including-firmware/current/](https://cdimage.debian.org/cdimage/unofficial/non-free/cd-including-firmware/current/){:target="_blank"}
- Select your cpu architecture and then the **iso-cd/** subfolder
- Look for `firmware-10.X.0-XXXX-netinst.iso`

### Older releases

- Debian 9: [https://cdimage.debian.org/cdimage/archive/9.13.0/amd64/iso-cd/debian-9.13.0-amd64-netinst.iso](https://cdimage.debian.org/cdimage/archive/9.13.0/amd64/iso-cd/debian-9.13.0-amd64-netinst.iso)
- Debian 8: [https://cdimage.debian.org/cdimage/archive/8.11.1/amd64/iso-cd/debian-8.11.1-amd64-netinst.iso](https://cdimage.debian.org/cdimage/archive/8.11.1/amd64/iso-cd/debian-8.11.1-amd64-netinst.iso)

----

## Installation
- At the boot menu, select `Install` and not "Graphical Install"
- If installing a desktop environment see the [Debian with MATE](#debian-with-mate) section at the bottom.
- Choose only `OpenSSH Server` at software selection

----

## Provision Script

### Script Summary
- Runs apt update
- Installs base software
- Turns off SSH MotD
- Sets up vim and bash
- Does not configure the network
- See [Debian.txt]({{site.url}}{{page.url}}/Debian.txt){:target="_blank"} for full script

### Running the Provision Script
- Install curl and run the script
```
sudo apt install curl -y
curl -sL {{site.url}}{{page.url}}/Debian.txt | sudo bash && exec bash
```
- Remove open-vm-tools if the install is bare metal
```
sudo apt autoremove open-vm-tools -y
```
- A reboot is recommended after provisioning but not required `sudo reboot now`

----

## Configure Network
- Open the network interface config file
```
sudo vim /etc/network/interfaces
```
- Change `dhcp` to `static` in the following section
```
auto ens32
iface ens32 inet dhcp
```
- If `auto ens32` is missing, run `ip link` to retrieve the name of your network interface and substitute as necessary
- Add the missing interface information
```
auto ens32
iface ens32 inet static
address 192.168.0.XX
netmask 255.255.255.0
gateway 192.168.0.1
dns-nameservers 8.8.8.8 1.1.1.1
```
- Reboot and connect with SSH `sudo reboot now`

----

## Debian with MATE
At software selection, choose
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
