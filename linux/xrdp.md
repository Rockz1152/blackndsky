---
layout: default
title: xRDP Remote Desktop
permalink: /xrdp
---

[Ubuntu]({{site.url}}/ubuntu){: .simple-button}
[Debian]({{site.url}}/debian){: .simple-button}
[Mint]({{site.url}}/mint){: .simple-button}
[xRDP]({{site.url}}/xrdp){: .simple-pressed-button}

## About
xRDP is a free and open-source implementation of Microsoft RDP (Remote Desktop Protocol) server that enables operating systems other than Microsoft Windows (such as Linux and BSD-style operating systems) to provide a fully functional RDP-compatible remote desktop experience.

### Supported distributions
xRDP supports Debian and Ubuntu based distributions of Linux with official support for the following

- [Linux Mint 21+]({{site.url}}/mint){:target="_blank"}
- [Zorin OS 17+](https://zorin.com/os/download/){:target="_blank"}
- Ubuntu 20.04+
- Debian 12+
- Kubuntu 20.04+
- Ubuntu Budgie 20.04+
- Ubuntu Mate 20.04+
- Xubuntu 20.04+
- Lubuntu 20.04+
- Pop!_OS  22.04+

----

## Installation
Source: [https://c-nergy.be/products.html](https://c-nergy.be/products.html){:target="_blank"}

Download latest release from [https://www.c-nergy.be/repository.html](https://www.c-nergy.be/repository.html){:target="_blank"} with `wget <link>`e.g., for version 1.5.1 you would run
```
wget https://www.c-nergy.be/downloads/xRDP/xrdp-installer-1.5.1.zip
```

Extract script
```
unzip xrdp-installer-X.X.X.zip
```

Run the install script
- Do not run the install script over SSH, you must be logged in locally
- Do not run the install script as root with sudo, the script will prompt elevate itself when necessary

```
bash xrdp-installer-X.X.X.sh -l -s
```
- The `-l` customizes the login screen over Remote Desktop
- The `-s` enables audio over Remote Desktop

Hide `thinclient_drives` from the desktop
```
sudo sed -i 's!FuseMountName=thinclient_drives!FuseMountName=.thinclient_drives!' /etc/xrdp/sesman.ini
```
- This is part of the FuseMount system which is used for the copying-and-pasting of files and the clipboard

Reboot the system
```
sudo reboot
```

xRDP should be ready to use

----

## Change RDP port in xRDP
To change xRDP's port from the default of `3389`, edit the following file and adjust the value of `PORT=`
```
sudo nano /etc/xrdp/xrdp.ini
```
Save the file and restart the system
```
sudo reboot
```
