---
layout: default
title: Debian
permalink: /debian
---

[Ubuntu]({{site.url}}/ubuntu){: .simple-button}
[Debian]({{site.url}}/debian){: .simple-pressed-button}

## Download Installer
- Debian 11: [https://cdimage.debian.org/debian-cd/current/amd64/iso-cd/](https://cdimage.debian.org/debian-cd/current/amd64/iso-cd/){:target="_blank"}
- Get the current `debian-XX.X.X-amd64-netinst.iso`

### Firmware Included
- If you are installing on a laptop and need extra drivers for WiFi, get the appropriate installer from:
  - [https://cdimage.debian.org/cdimage/unofficial/non-free/cd-including-firmware/current/](https://cdimage.debian.org/cdimage/unofficial/non-free/cd-including-firmware/current/){:target="_blank"}
- Select your cpu `architecture` and then the `iso-cd` subfolder
- Look for `firmware-XX.X.X-XXXX-netinst.iso`

### Older releases
- Debian 10: [https://cdimage.debian.org/cdimage/archive/10.10.0/amd64/iso-cd/debian-10.10.0-amd64-netinst.iso](https://cdimage.debian.org/cdimage/archive/10.10.0/amd64/iso-cd/debian-10.10.0-amd64-netinst.iso)
- Debian 9: [https://cdimage.debian.org/cdimage/archive/9.13.0/amd64/iso-cd/debian-9.13.0-amd64-netinst.iso](https://cdimage.debian.org/cdimage/archive/9.13.0/amd64/iso-cd/debian-9.13.0-amd64-netinst.iso)

----

## Installation
- At the boot menu, select `Install` and not "Graphical Install"
- Choose only `SSH Server` at software selection
- If installing a desktop environment see the [Debian with MATE](#debian-with-mate) section at the bottom.

----

## Provision Script

### Script Summary
- Runs apt update
- Installs base software
- Turns off SSH MotD
- Sets up vim and bash
- Installs guest tools if running a virtual machine
- See [Github](https://github.com/Rockz1152/Debian){:target="_blank"} for full script

### Running the Provision Script
- Install curl and run the script
```
sudo apt install -y curl
```
```
curl -sL https://raw.githubusercontent.com/Rockz1152/Debian/main/setup.sh | sudo bash && exec bash
```
- A reboot is recommended after provisioning but not required `sudo reboot`

----

## Updates
- Make a script that can be launched as `~/update-system.sh` to install system updates
```
echo 'sudo sh -c "apt update;apt upgrade -y;apt autoremove --purge -y;"' > $HOME/update-system.sh
chmod u+x $HOME/update-system.sh
```

----

## Configure Static Network
- Run `ip link` to retrieve the name of your network interface and substitute as necessary
- Open the network interface config
```
sudo nano /etc/network/interfaces
```
- If your interface already has an entry, change `dhcp` to `static`
```
iface net# inet dhcp
```
  - Otherwise you'll need to add your own lines
  - Debian 10 and older:
```
auto net#
iface net# inet static
```
  - Debian 11 and newer:
```
allow-hotplug net#
iface net# inet static
```
- Add the following information after the `iface net# inet static` line
```
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
- The official wiki page for release upgrades: [https://wiki.debian.org/DebianUpgrade](https://wiki.debian.org/DebianUpgrade){:target="_blank"}
- Release code names and wiki pages: [https://wiki.debian.org/DebianReleases#Production_Releases](https://wiki.debian.org/DebianReleases#Production_Releases){:target="_blank"}
- Check the current release wiki page for any updates to the sources.list file.
  - e.g. [https://wiki.debian.org/DebianBullseye#Links](https://wiki.debian.org/DebianBullseye#Links){:target="_blank"}

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
```
```
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
curl -sL {{site.url}}/linux/Debian.txt | sudo bash && exec bash
```
- Verify the upgrade `cat /etc/os-release`
