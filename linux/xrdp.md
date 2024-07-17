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
To change xRDP's port, edit the following file and adjust the value of `PORT=`
```
sudo nano /etc/xrdp/xrdp.ini
```
Save the file and restart the system
```
sudo reboot
```

----

## Limit access with Firewall
Debian users will need to install UFW
```
sudo apt install -y ufw
```

Make sure firewall is enabled
```
sudo ufw enable
```
- Enabling the firewall will not disconnect current sessions but will prevent new sessions from being established.
- If you are using SSH, be sure to add a rule for SSH
```
sudo ufw allow 22/tcp
```

Check firewall status
```
sudo ufw status
```

Port `3389` should already be allowed. This is the default port that Remote Desktop Protocol (RDP) uses. If you need to re-add this rule, this command will allow access from any address.
```
sudo ufw allow 3389/tcp
```

Allow port 3389 from specific IP address
```
sudo ufw allow from <IP_address> to any port 3389/tcp
```
- Change `3389` to any custom port you want to use with RDP
- To allow from a range of IPs, use the address formatted as a subnet or CIDR address
- e.g. `192.168.0.0/255.255.0.0` or `192.168.0.0/16`

Check firewall status to see your rules
```
sudo ufw status
```

### Remove a firewall rule
Here is an example command to remove a firewall rule
```
sudo ufw delete allow 3389/tcp
```
- `sudo ufw delete` This part specifies you are trying to delete a rule
- `allow 3389/tcp` This part specifies you are deleting the rule: `allow` traffic to port `3389/tcp`

Verify the rules are deleted with
```
sudo ufw status
```
