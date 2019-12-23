---
layout: default
title: Handbrake
permalink: /handbrake
---
<!-- # <center>Handbrake</center> -->

## Installation

**Windows:** Get installer from website

- [https://handbrake.fr/downloads.php](https://handbrake.fr/downloads.php)
- [https://ninite.com](https://ninite.com)

**Linux:** `sudo apt install -y handbrake`

## Configuration
Open Handbrake and cancel source selection

`Tools` **>** `Preferences`

**General**

- On Startup
  - Uncheck `Check for Updates`

- When Done
  - *(Optional)* Play a sound when (each encode or the queue) completes

**Output Files**

- Check `Automatically name output files`
- Set a `Default Path` e.g. "C:\Users\John\Downloads"
- Set `File Format` to `{source}`
- Set `MP4 File Extension` to `Always use MP4`

## Media Conversion

- Click `Open Source`
- Select single media or media folder
- `Presets` **>** `Devices` **>** `Roku XXX Resolution`
- For single media - Click `Start`
- For batch conversion
  - Click the down arrow next to `Add to Queue` **>** `Add all`
  - In Handbrake or the Queue windows, click `Start`

## DVD Ripping
### Download and Install **libdvdcss-2.dll**
**Windows**

32-Bit

- [http://download.videolan.org/pub/libdvdcss/1.2.12/win32/libdvdcss-2.dll](http://download.videolan.org/pub/libdvdcss/1.2.12/win32/libdvdcss-2.dll)
- Alternative download from Dropbox [libdvdcss-2-32Bit.zip](https://www.dropbox.com/s/nrp5ky1rcjxmiuh/libdvdcss-2-32Bit.zip?dl=1)
- Install to: `C:\Program Files (x86)\HandBrake`

64-Bit

- [http://download.videolan.org/pub/libdvdcss/1.2.12/win64/libdvdcss-2.dll](http://download.videolan.org/pub/libdvdcss/1.2.12/win64/libdvdcss-2.dll)
- Alternative download from Dropbox [libdvdcss-2-64Bit.zip](https://www.dropbox.com/s/9qfq7zzh9nscjqm/libdvdcss-2-64Bit.zip?dl=1)
- Install to: `C:\Program Files\HandBrake`

**Debian Linux**

Install from videolan

- Download from: [http://download.videolan.org/pub/debian/stable/](http://download.videolan.org/pub/debian/stable/){:target="_blank"}
  - 64-Bit `libdvdcss2_1.2.13-0_amd64.deb`
  - 32-Bit `libdvdcss2_1.2.13-0_i386.deb`
- Install `sudo dpkg -i libdvdcss2_version_arch_.deb`

Or build from source

- Add contrib and non-free packages to apt
  - Edit sources.list `sudo vi /etc/apt/sources.list`
  - Add `contrib non-free` to the end of each `deb` and `deb-src` line
- Update apt `sudo apt update`
- Install the package `sudo apt install libdvd-pkg`
  - Select `Yes` to enable automatic upgrades with apt
- Configure with `sudo dpkg-reconfigure libdvd-pkg`
 - Select `Yes` to start the build.
 - Wait 15 **-** 30 seconds for the build to complete

**Enable libdvdcss**

`Tools` **>** `Preferences` **>** `Advanced` **>** &nbsp; **DVD Reading**

- Check the box next to `Disable LibDVDNav`
- This allows libdvdcss to bypass disc protection

### Create or Import DVD Rip Preset
**Import the preset**

- Download the preset file <a href="{{site.url}}/misc/Handbrake-DVD-Rip.json" download>Handbrake-DVD-Rip.json</a>
- Open Handbrake and select `Cancel` in the bottom left corner
- On the top toolbar select `Presets` **>** `Import from file`
- Navigate to the downloaded preset file and click `Open`
- Select the preset by going to `Presets` **>** `Custom Presets` **>** `DVD Rip`

**Manually create the preset** [*More information*](https://www.thewebernets.com/2019/02/10/easiest-best-optimal-settings-for-handbrake-dvd-video-conversion-updated-feb19/){:target="_blank"}

- Open Handbrake and select DVD drive in source selection
- `Presets` **>** `Devices` **>** `Roku 480p30`
- **Summary** tab 
  - Format **-** `MP4`
  - Check **-** `Align A/V Start`
- **Dimensions** tab
  - Cropping **-** `Automatic`
- **Filters** tab
  - Detelecine **-** `Off`
  - Interlace Detection **-** `Default`
  - Deinterlace **-** `Decomb` Preset **-** `Default`
  - Denoise **-** `hqdn3d` Preset **-** `Medium`
  - Sharpen **-** `Off`
  - Deblock **-** `Off`
- **Video** tab
  - Video 
    - Video Codec **-** `H.264 (x264)`
    - Framerate (FPS) **-** `Same as source` **>** `Constant Framerate`
  - Quality 
    - `Constant Quality` **-** `18`
    - If the output file is too large, increase the setting to `20`. This lowers the quality and lowers the output file size.
  - Optimise Video
    - Encoder Preset **-** `VerySlow`
    - Encoder Tune **-** `Film`
    - Encoder Profile **-** `High`
    - Encoder Level **-** `3.1`
    - Extra Options **-** `ref=5:bframes=5`
- **Audio** tab
  - Single track
  - Codec `AAC (avcodec)` `Bitrate` `160`
  - Mixdown `Stereo`
- **Subtitles** tab
  - `Foreign Audio Scan` **-** Check `Forced Only`, `Burn in`
- **Chapters** tab 
  - Chapter Markers **-** Uncheck `Create chapter markers`
- **Presets** **-** `Save New Preset`
  - Name: `DVD Rip`

### Rip DVD
- Open Handbrake and select DVD drive in source selection
- `Presets` **>** `Custom Presets` **>** `DVD Rip`
  - *(Optional)* Disable subtitle scan **-** `Subtitles` tab **-** click red `X` on `Foreign Audio Scan`
  - If you really don't want subtitles, this will save some time.
- Click `Start Encode`
