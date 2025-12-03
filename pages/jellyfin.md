---
layout: default
title: "Jellyfin Media Server"
permalink: /jellyfin
---

> ### **Warning**
>
> _This article is under construction and may be missing important information_

Install type: <a href="#baremetal" Class="simple-button-small">Bare Metal</a><a href="#lxc" Class="simple-button-small">Proxmox LXC Container</a>

----

<a name="baremetal"></a>
## Bare Metal Installation
Source: https://jellyfin.org/docs/general/installation/linux#repository-manual

- Install base packages
```
sudo apt install -y curl gnupg
```
- Import the GPG signing key (signed by the Jellyfin Team):
```
sudo mkdir -p /etc/apt/keyrings
```
```
curl -fsSL https://repo.jellyfin.org/jellyfin_team.gpg.key | sudo gpg --dearmor -o /etc/apt/keyrings/jellyfin.gpg
```
- Add a repository configuration at `/etc/apt/sources.list.d/jellyfin.sources`
```
export VERSION_OS="$( awk -F'=' '/^ID=/{ print $NF }' /etc/os-release )"
export VERSION_CODENAME="$( awk -F'=' '/^VERSION_CODENAME=/{ print $NF }' /etc/os-release )"
export DPKG_ARCHITECTURE="$( dpkg --print-architecture )"
cat <<EOF | sudo tee /etc/apt/sources.list.d/jellyfin.sources
Types: deb
URIs: https://repo.jellyfin.org/${VERSION_OS}
Suites: ${VERSION_CODENAME}
Components: main
Architectures: ${DPKG_ARCHITECTURE}
Signed-By: /etc/apt/keyrings/jellyfin.gpg
EOF
```
- Update APT repositories
```
sudo apt update
```
- Install Jellyfin
```
sudo apt install -y jellyfin
```
- Adjust logging levels
```
sudo sed -i 's/"MinimumLevel": "Information"/"MinimumLevel": "Error"/g' /etc/jellyfin/logging.json
```
- Check service status
```
systemctl status --no-pager jellyfin
```
- Increase "inotify watchers"
```
echo 'fs.inotify.max_user_watches=524288' | sudo tee -a /etc/sysctl.d/99-jellyfin.conf && sudo sysctl --system
```
- Verify `max_user_watches`
```
cat /proc/sys/fs/inotify/max_user_watches
```
  - Should return `524288`

### Crontab Update
- Add the jellyfin update command to the root crontab to enable automatic updates
- Use `sudo crontab -e` to edit the crontab and add the following to the bottom:
```
# Update jellyfin
0 6 * * * apt-get update >/dev/null 2>&1; apt-get -y --with-new-pkgs upgrade jellyfin jellyfin-server >/dev/null 2>&1;
```
- The `0 6` in the command indicate **6:00 AM** and can be adjusted
- For example **8:30 PM** would be `30 20 * * *`. The thee `*`s indicate the command runs every day at the time specified
- See https://crontab.guru if you need help with time syntax
- You can verify the crontab by running
```
sudo crontab -l
```

### Setup Jellyfin
...

### Hardware Acceleration - Bare Metal

Resources:
https://jellyfin.org/docs/general/administration/hardware-acceleration/
https://jellyfin.org/docs/general/administration/hardware-acceleration/amd#configure-on-linux-host

Make sure at least one `renderD*` device exists in `/dev/dri`
```
ls -l /dev/dri
```

Check the supported VA-API codecs:
```
sudo /usr/lib/jellyfin-ffmpeg/vainfo --display drm --device /dev/dri/renderD128
```
- Should return `vainfo: Supported profile and entrypoints`

Check the Vulkan runtime status:
```
sudo /usr/lib/jellyfin-ffmpeg/ffmpeg -v debug -init_hw_device drm=dr:/dev/dri/renderD128 -init_hw_device vulkan@dr
```
- Should return data for `GPU listing:`

Install prerequisites
```
sudo apt install -y va-driver-all ocl-icd-libopencl1 intel-opencl-icd vainfo intel-gpu-tools radeontop
```

Add the `jellyfin` user to the `render` and `video` group, then restart the `jellyfin` service:
```
sudo usermod -aG render jellyfin
sudo usermod -aG video jellyfin
sudo systemctl restart jellyfin
```

Enable hardware transcoding

- Dashboard > Playback > Transcoding
- Set "Hardware Acceleration" to "Video Acceleration API(VAAPI)" or "Intel QSC" depending on CPU
- Make sure VA-API Device is: /dev/dri/renderD128
- Check: "HEVC"
- Check: "Enable hardware encoding"

#### Verify
There is no reliable way to read the occupancy of the VCE/UVD/VCN engines on AMD GPU on Linux. But you can still verify this by reading other engines with the `radeontop` or `intel_gpu_top`

- Play a video in the Jellyfin web client and trigger a video transcoding by setting a lower resolution or bitrate.
- Use the `radeontop` or `intel_gpu_top` command to check the occupancy of 3D engines.

----

<a name="lxc"></a>
## Proxmox LXC Container Installation
