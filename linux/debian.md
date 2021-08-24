---
layout: default
title: Debian
permalink: /debian
---

[Ubuntu]({{site.url}}/linux){: .simple-button}
[Debian]({{site.url}}/debian){: .simple-pressed-button}

## Download Installer
- Debian 10: [https://cdimage.debian.org/debian-cd/current/amd64/iso-cd/](https://cdimage.debian.org/debian-cd/current/amd64/iso-cd/){:target="_blank"}
- Get the current `debian-XX.X.X-amd64-netinst.iso`

### Firmware Included
- If you are installing on a laptop and need extra drivers for WiFi, get the appropriate installer from:
  - [https://cdimage.debian.org/cdimage/unofficial/non-free/cd-including-firmware/current/](https://cdimage.debian.org/cdimage/unofficial/non-free/cd-including-firmware/current/){:target="_blank"}
- Select your cpu `architecture` and then the `iso-cd` subfolder
- Look for `firmware-XX.X.X-XXXX-netinst.iso`

### Older releases
- Debian 10: [https://cdimage.debian.org/cdimage/archive/10.10.0/amd64/iso-cd/debian-10.10.0-amd64-netinst.iso](https://cdimage.debian.org/cdimage/archive/10.10.0/amd64/iso-cd/debian-10.10.0-amd64-netinst.iso)
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
- See [Debian.txt]({{site.url}}/linux/Debian.txt){:target="_blank"} for full script

### Running the Provision Script
- Install curl and run the script
```
sudo apt install curl -y
```
```
curl -sL {{site.url}}/linux/Debian.txt | sudo bash && exec bash
```
- Remove open-vm-tools if the install is bare metal
```
sudo apt autoremove --purge -y open-vm-tools
```
- A reboot is recommended after provisioning but not required `sudo reboot`

----

## Configure Static Network
- Run `ip link` to retrieve the name of your network interface and substitute as necessary
- Open the network interface config file
```
sudo vim /etc/network/interfaces
```
- If your interface already has an entry, change `dhcp` to `static`
```
auto ens32
iface ens32 inet dhcp
```
- Add the following information substituting `ens32` for your interface
```
auto ens32
iface ens32 inet static
address 192.168.0.XX
netmask 255.255.255.0
gateway 192.168.0.1
dns-nameservers 8.8.8.8 1.1.1.1
```
- Reboot with `sudo reboot`

----

## Debian with MATE
At software selection, choose
- `Debian Desktop Environment`
- `MATE`
- `OpenSSH Server`
- `Standard System Utilities`

After Install
- System **>** Preferences **>** Look and Feel **>** Appearance
- Choose **"Black MATE"** or **"Blue-Submarine"**

Install MATE Tweak
 - `sudo apt install mate-tweak`

Disable desktop composition
- Control Center **>** Look and Feel **>** MATE Tweak **>** Windows **>** Window Manager **>** Choose `Marco(No compositor)`

----

## Release Upgrades

### Resources
- https://wiki.debian.org/DebianUpgrade
- Release code names can be found here: https://wiki.debian.org/DebianReleases#Production_Releases
- Consult wiki if source links change between releases. e.g. https://wiki.debian.org/DebianBullseye#Links

### Upgrade
- Fully upgrades and cleanup any packages on the system
```
sudo sh -c "apt update; apt full-upgrade -y; apt autoremove --purge -y"
```
- Update source files to new release code name
```
sudo sed -i 's/<OldName>/<NewName>/g' /etc/apt/sources.list
```
  - Buster to Bullseye:
```
sudo sed -i 's!buster!bullseye!g' /etc/apt/sources.list
sudo sed -i 's!bullseye/updates!bullseye-security!g'  /etc/apt/sources.list
```
- Upgrade to the new release
```
sudo sh -c "apt clean; apt update; apt upgrade --without-new-pkgs -y; apt full-upgrade -y; apt autoremove --purge -y"
```
  - When prompted "Restart services during package upgrades without asking?" select `Yes`
  - If prompted to overwrite existing configuration files, select `N` which is the default
- Reboot when complete `sudo reboot`
- Rerun the Debian provision script to setup dotfiles
```
curl -sL https://www.dropbox.com/s/s57r4beopxs1gjn/Debian.txt | sudo bash && exec bash
```
- Verify the upgrade `cat /etc/os-release`
