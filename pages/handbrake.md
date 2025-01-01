---
layout: default
title: Handbrake
permalink: /handbrake
---

## Installation

**Windows:** Get installer from website

- [https://handbrake.fr/downloads.php](https://handbrake.fr/downloads.php)
- [https://ninite.com](https://ninite.com)

**Linux:** `sudo apt install -y handbrake`

----

## Configuration
Open Handbrake and cancel the source selection dialogue

Click `Tools` **>** `Preferences`

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

----

## Media Conversion

- Click `Open Source`
- Select single media or media folder
- `Presets` **>** `Devices` **>** `Roku XXX Resolution`
- For single media - Click `Start`
- For batch conversion
  - Click the down arrow next to `Add to Queue` **>** `Add all`
  - In Handbrake or the Queue windows, click `Start`

### Convert MKV with Subtitles

- Select the preset you want to convert the video to
- On the "Summary" tab, change the container to `MKV`
  - Optionally on the "Video" tab, change the "Encoder Preset" slider to "Very Slow"
- On the "Subtitles" tab, change "Foreign Audio Scan" to the English subtitles track
- Uncheck `Forced Only` and `Burn In`
- Start the transcode

----

## Optimized Encoding
In order to create the highest quality file without wasting any space, it's best to utilize Multi-Pass encoding. Multi-pass encoding in HandBrake optimizes video compression by analyzing the video in multiple passes. The first pass gathers data to improve bitrate distribution, while the subsequent pass ensures higher quality and better file size efficiency.

- Preset
  - `Roku 720p30 Surround` or `Roku 1080p30 Surround` depending on source file
- Summary
  - Format: `MKV`
  - Leave "Passthru Common Metadata" checked
- Video
  - Video Encorder: Leave `H.264(x264)` as it maximizes compatibility
    - If compatibility isn't a concern, select `H.265(x265)` instead for better compression
  - Encoder Preset: `Very Slow` _*Use for best results_
  - Avg Bitrate (kbps): `2000`
  - Check: `Multi-Pass Encoding` and `Turbo analysis pass`
- Subtitles
  - Change "Foreign Audio Scan" to any available English subtitles track, otherwise click the `X` on the far right to remove it

Click `Start Encode` to begin

Note: Multi-Pass Encoding takes a very long time to process. Expect transcoding sessions to last 4-6 hours per title.

----

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

_*Please note this .dll will need to be reinstalled after Handbrake updates on Windows systems_

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
