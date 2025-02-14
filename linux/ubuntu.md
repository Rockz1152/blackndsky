---
layout: default
title: Ubuntu Server
permalink: /ubuntu
---

[Ubuntu]({{site.url}}/ubuntu){: .simple-pressed-button}
[Debian]({{site.url}}/debian){: .simple-button}
[Mint]({{site.url}}/mint){: .simple-button}
[xRDP]({{site.url}}/xrdp){: .simple-button}

## Download Installer
- New releases only support 64-bit systems
- Download the latest LTS release from [https://releases.ubuntu.com](https://releases.ubuntu.com){:target="_blank"}
  - Select the `Server install image` after choosing a release
- Current server install image: [https://releases.ubuntu.com/noble/ubuntu-24.04-live-server-amd64.iso](https://releases.ubuntu.com/noble/ubuntu-24.04-live-server-amd64.iso){:target="_blank"}

----

## Installation
- Boot the installation media and wait for the installer to finish loading
- Proceed through the setup prompts until you reach the "Choose type of install" page
  - Leave `Ubuntu Server` selected
- Guided storage configuration
  - You can leave this at the default settings and then fix the hard disk later if you want
  - Otherwise you can specify that the install actually use the entire disk
  - Select `Custom storage layout`
  - Highlight `Free space` and press Enter
  - Select `Add GPT Partition`
  - Leave "Size" blank and select `Create`, this will use the entire disk properly
- Proceed through the setup prompts until you reach the "SSH Setup" page
  - Check `Install OpenSSH server`
- On the "Featured Server Snaps" page, leave everything unchecked and select `Done`
- Wait for the install to finish
- When the orange top bar reads "Install complete!", select `Reboot Now`
- Press `Enter` to reboot the system
- Wait for the system to finish booting up and login
- Get the IP of your server using `ip a` and connect using putty or another SSH client

### Updates
- Make a script that can be launched as `~/update-system.sh` to install system updates
```
echo 'sudo sh -c "export DEBIAN_FRONTEND=noninteractive; apt update; apt upgrade -y; apt autoremove --purge -y;"' > $HOME/update-system.sh; chmod u+x $HOME/update-system.sh
```
- Make a script to cleanup old kernels when necessary
```
echo 'bash -c "$(wget -qLO - https://raw.githubusercontent.com/Rockz1152/Ubuntu/main/kernel-clean.sh)"' > $HOME/kernel-clean.sh && chmod u+x $HOME/kernel-clean.sh
```

----

## Timezone
- The timezone is set to Coordinated Universal Time, or UTC, by default
- It needs to be localized after the install
  - We can do this by either running a command for a specific timezone
  - Or run an interactive prompt to select the timezone

### Commands
- Eastern Standard Time
```
sudo timedatectl set-timezone America/New_York; echo $(timedatectl | grep "Time zone"); date
```
- Central Standard Time
```
sudo timedatectl set-timezone America/Chicago; echo $(timedatectl | grep "Time zone"); date
```
- Mountain Standard Time
```
sudo timedatectl set-timezone America/Denver; echo $(timedatectl | grep "Time zone"); date
```
- Arizona Time
```
sudo timedatectl set-timezone America/Phoenix; echo $(timedatectl | grep "Time zone"); date
```
- Pacific Standard Time
```
sudo timedatectl set-timezone America/Los_Angeles; echo $(timedatectl | grep "Time zone"); date
```

### Interactive
- Or you can set the timezone interactively
```
sudo dpkg-reconfigure tzdata
```

----

## Software Packages
Run the automated script
```
curl -sL https://raw.githubusercontent.com/Rockz1152/Ubuntu/main/ubuntu_setup.sh | sudo /bin/bash
```

Manual steps for the script above

- Turn off Message-of-the-Day on login
```
sudo sed -i 's/session    optional     pam_motd.so/# session    optional     pam_motd.so/g' /etc/pam.d/sshd
sudo sed -i 's/PrintMotd yes/PrintMotd no/g' /etc/ssh/sshd_config
```
- Disable "Ubuntu Pro" advertisement in apt
```
sudo dpkg-divert --divert /etc/apt/apt.conf.d/20apt-esm-hook.conf.bak --rename --local /etc/apt/apt.conf.d/20apt-esm-hook.conf
```
- Remove unneeded server packages
```
sudo DEBIAN_FRONTEND=noninteractive apt autoremove --purge -y cloud-init multipath-tools snapd landscape-common; sudo rm -rf /etc/cloud
```
- Install package updates
```
sudo apt update; sudo DEBIAN_FRONTEND=noninteractive apt full-upgrade -y
```
- Install additional software packages
```
sudo DEBIAN_FRONTEND=noninteractive apt install -y ncdu zstd zip unzip p7zip-full unrar-free neofetch
```
- Install guest agents if you are running the server in a VM
  - VMWare
```
sudo DEBIAN_FRONTEND=noninteractive apt install -y open-vm-tools
```
  - Proxmox
```
sudo DEBIAN_FRONTEND=noninteractive apt install -y qemu-guest-agent
```
- Reboot server
```
sudo reboot
```

----

## Networking
- Run `ip link` first to retrieve the name of your network interface and make note of it
- Edit netplan's config file
```
sudo nano /etc/netplan/00-installer-config.yaml
```
- Add the network configuration in YAML format as below:
```
network:
    version: 2
    renderer: networkd
    ethernets:
      ens18:
        dhcp4: no
        addresses:
          - 192.168.0.XX/24
        nameservers:
          addresses: [1.1.1.1, 8.8.8.8]
        routes:
          - to: default
            via: 192.168.0.1
```
  - _*When editing Yaml files, make sure you follow the YAML code indent standards._
  - _*If the syntax is not correct, the changes will not be applied._
- Be sure to update the following:
  - Under "ethernets" update `ens18` with the name of your network interface
  - Under "addresses" update `192.168.0.XX` with your preferred host IP address
  - Under "routes" update `192.168.0.1` to your default gateway
- Apply and verify the changes by running:
```
sudo netplan apply; ip a
```

----

## Disable IPv6 (Optional)
- Make the change in the GRUB config
```
sudo sed -i 's!GRUB_CMDLINE_LINUX_DEFAULT=""!GRUB_CMDLINE_LINUX_DEFAULT="ipv6.disable=1"!' /etc/default/grub
```
- Update GRUB and reboot
```
sudo update-grub && sudo reboot
```

----

## Cockpit (Optional)
- Cockpit allows you to manage the server through a web page
- For new users this may be a more friendly interface to manage their server with
- Install cockpit
```
sudo apt install cockpit cockpit-pcp -y
```
- Cockpit requires NetworkManager to function properly so we'll make the changes to use it
```
sudo sed -i 's!renderer: networkd!renderer: NetworkManager!g' /etc/netplan/01-netcfg.yaml
```
- Update services
```
sudo systemctl enable NetworkManager.service
sudo systemctl start NetworkManager.service
sudo systemctl disable systemd-networkd.service
sudo systemctl stop systemd-networkd.service
```
- Run netplan to check for errors
```
sudo netplan apply
```
- Reboot the system
```
sudo reboot
```
- Login and verify services
```
systemctl status NetworkManager | grep Active:
systemctl status systemd-networkd | grep Active:
```
- Login to your server using the web address: `<Server IP>:9090`

----

## Release Upgrade
- Release upgrades are the process of upgrading Ubuntu to a newer version.
- Canonical, the company that maintains Ubuntu, has two update channels
  - Standard which releases a new version every 6 months
  - LTS (Long Term Support) which releases a new version every 2 years
  - LTS releases are recommended for server installs since they are supported for 5 years
- To perform a release upgrade, simply run this command
```
sudo do-release-upgrade
```
- Follow the prompts, a restart is required at the end

----

## Reclaim Disk Space
- If during the install you didn't allocate the entire disk to the root partition and have no intention of using LVM snapshots or other features, you can reclaim the missing hard disk space
```
sudo lvextend -l +100%FREE /dev/ubuntu-vg/ubuntu-lv
```
- Expand the filesystem
```
sudo resize2fs /dev/ubuntu-vg/ubuntu-lv
```
- Verify free space with `df -h`
