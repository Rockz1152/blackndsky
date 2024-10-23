---
layout: default
title: "uBlock Origin"
permalink: /ublock
---

[Mozilla Firefox]({{site.url}}/firefox){: .simple-button}
[Google Chrome]({{site.url}}/chrome){: .simple-button}
[Microsoft Edge]({{site.url}}/edge){: .simple-button}
[uBlock Origin]({{site.url}}/ublock){: .simple-pressed-button}

<sup>_Version 10/22/24_</sup>

## Configure
- Click the red uBlock shield and then click the small 3 gears icon under the I/O button labeled `Open the dashboard`
- Select the `Filter lists` tab
- Expand "Built-in", make sure all boxes are checked
- Expand "Ads", check all boxes
- Expand "Privacy", check all boxes except "Block access to LAN"
- Expand "Malware protection, security", check all boxes
- Under "Multipurpose", leave just "Peter Lowe's Ad and tracking server list" checked
- Expand "Cookie notices", check all boxes
- Expand "Social widgets", check all boxes
- Expand "Annoyances", check all boxes
- Click `Apply changes` at the top

### Youtube (Optional)
Block Live Chat and side panel

- Click the `My filters` tab and paste the following:
```
! Youtube
!! Hide live chat
www.youtube.com###chat
www.youtube.com/live_chat
!! Hide side panel in theater mode
www.youtube.com###panels-full-bleed-container
```
- Click `Apply changes` at the top

Block Youtube Shorts <!-- https://github.com/gijsdev/ublock-hide-yt-shorts/blob/master/list.txt -->

- Source: [https://github.com/gijsdev/ublock-hide-yt-shorts](https://github.com/gijsdev/ublock-hide-yt-shorts){:target="_blank"}
- On the `Filter lists` tab, click `Import` at the bottom and paste
```
https://raw.githubusercontent.com/gijsdev/ublock-hide-yt-shorts/master/list.txt
```
- Click `Apply changes` at the top

<a name="lite"></a>

----

## uBlock Origin Lite

Coming soon...


