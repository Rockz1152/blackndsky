---
layout: default
title: Ubuntu Server
permalink: /linux
---

[Ubuntu]({{site.url}}/linux){: .simple-pressed-button}
[Debian]({{site.url}}/debian){: .simple-button}

## Download Installer
- New releases only support 64-bit systems
- Download the latest LTS release from [https://releases.ubuntu.com/?C=M;O=D](https://releases.ubuntu.com/?C=M;O=D){:target="_blank"}
  - Select the `Server install image` link on the right after choosing a release
- Current server install image: [https://releases.ubuntu.com/focal/ubuntu-20.04.2-live-server-amd64.iso](https://releases.ubuntu.com/focal/ubuntu-20.04.2-live-server-amd64.iso){:target="_blank"}

----

## Installation
- Boot the installation media and wait for the installer to finish loading
- Proceed through the setup prompts until you reach the "SSH Setup" page
  - Check `Install OpenSSH server`
- On the "Featured Server Snaps" page, leave everything unchecked and select `Done`
- Wait for the install to finish
- When the orange top bar reads "Install complete!", select `Reboot Now`
- Press `Enter` to reboot the system
- Wait for the system to finish booting up and login
- Get the IP of your server using `ip a` and connect using putty or another SSH client

### Expand Hard Disk
- If you have no intention of using LVM snapshots or other features, reclaim the missing hard disk space
```
sudo lvextend -l +100%FREE /dev/ubuntu-vg/ubuntu-lv
```

### Updates
- Make a script that can be launched as `~/update-system.sh` to install system updates
```
echo 'sudo sh -c "apt update;apt upgrade -y;apt autoremove --purge -y;"' > ~/update-system.sh
chmod u+x ~/update-system.sh
```

----

## Timezone
- The timezone is set to Coordinated Universal Time, or UTC, by default
- It needs to be localized after the install
  - We can do this by either running a command for a specific timezone
  - Or run an interactive prompt to select the timezone

**Via Commands**

- Eastern Standard Time
```
sudo timedatectl set-timezone US/Eastern; cat /etc/timezone; date
```
- Central Standard Time
```
sudo timedatectl set-timezone US/Central; cat /etc/timezone; date
```
- Mountain Standard Time
```
sudo timedatectl set-timezone US/Mountain; cat /etc/timezone; date
```
- Pacific Standard Time
```
sudo timedatectl set-timezone US/Pacific; cat /etc/timezone; date
```

**Interactive**

- Or you can set the timezone interactively
```
sudo dpkg-reconfigure tzdata
```

----

## Software Packages
- All tasks in one command, this will take a few minutes to run
```
sudo sh -c "sed -i 's/^ENABLED=.*/ENABLED=0/' /etc/default/motd-news; chmod -x /etc/update-motd.d/*; apt autoremove --purge -y cloud-init multipath-tools snapd landscape-common; rm -rf /etc/cloud; apt update; apt install -y ncdu zip unzip p7zip-full unrar-free neofetch; apt full-upgrade -y; reboot"
```
- See the Command Breakdown below for more information, otherwise continue on to Networking

### Command Breakdown
- Turn off Message of the Day on login
```
sudo sed -i 's/^ENABLED=.*/ENABLED=0/' /etc/default/motd-news
sudo chmod -x /etc/update-motd.d/*
```
- Remove unneeded server packages
```
sudo apt autoremove --purge -y cloud-init multipath-tools snapd landscape-common
sudo rm -rf /etc/cloud
```
- Install additional software packages
```
sudo apt update
sudo apt install -y ncdu zip unzip p7zip-full unrar-free neofetch
```
- Install package updates and reboot
```
sudo apt full-upgrade -y
sudo reboot
```

----

## Networking
- Run `ip link` first to retrieve the name of your network interface and make note of it
- Edit netplan's config file
```
sudo vim /etc/netplan/00-installer-config.yaml
```
- Substitute `ens3` for the name of your network interface, and `192.168.0.XX` with your preferred IP address
```
network:
  version: 2
  renderer: networkd
  ethernets:
    ens18:
      dhcp4: no
      addresses:
        - 192.168.0.XX/24
      gateway4: 192.168.0.1
      nameservers:
          addresses: [8.8.8.8, 1.1.1.1]
```
_*When editing Yaml files, make sure you follow the YAML code indent standards._
_*If the syntax is not correct, the changes will not be applied._
- Apply and verify the changes by running:
```
sudo netplan apply; ip a
```

----

## Cockpit
_*Optional_

- Cockpit allows you to manage the server through a web page
- For new users this may be a more friendly interface to manage their server with
- Install cockpit
```
sudo apt install cockpit -y
```
- Cockpit requires NetworkManager to function properly so we'll make the changes to use it
```nowrap
sudo sed -i 's!renderer: networkd!renderer: NetworkManager!g' /etc/netplan/00-installer-config.yaml
```

- Update services
```
sudo systemctl enable network-manager.service
sudo systemctl start network-manager.service
sudo systemctl disable systemd-networkd.service
sudo systemctl stop systemd-networkd.service
```
- Run netplan and check for errors
```
sudo netplan apply
```
- Reboot the system
```
sudo reboot
```
- Login and verify services
```
systemctl status network-manager | grep Active:
systemctl status systemd-networkd | grep Active:
```
- Use `ip a` to find your server's ip address and then open a webpage to `<Server IP>:9090`

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
