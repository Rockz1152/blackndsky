---
layout: default
title: "Waterfox"
permalink: /waterfox
---

[Mozilla Firefox]({{site.url}}/firefox){: .simple-button}
[Waterfox]({{site.url}}/waterfox){: .simple-pressed-button}
[Google Chrome]({{site.url}}/chrome){: .simple-button}
[Microsoft Edge]({{site.url}}/edge){: .simple-button}
[uBlock Origin]({{site.url}}/ublock){: .simple-button}

<sup>_Version 12/17/25_</sup>

> ### **Author's Note**
>
> _Waterfox is a no-nonsense, privacy driven fork of Firefox. That means no spying on user activity, no telemetry, no analytics, no experiments, and no AI._

## Installation
Install with `winget` or download from [https://www.waterfox.com/download/](https://www.waterfox.com/download/){:target="_blank"}
```
winget install -e Waterfox --accept-package-agreements --accept-source-agreements
```
Open Waterfox

- Click `Let's Get Started`
- Import browser data if you want or click `Skip` in the lower right corner
- Select a theme and click `Save and Continue`
- Click `Continue`
- Leave both boxes checked for defaults and click `Continue`
  - For the popups from Windows, click `Yes` and `Done`
  - In the Settings App that opened automatically, click `Set default` at the top and then close Settings
- In Waterfox, click `Continue` and then `Start Browsing`

----

## Appearance
_*This section is Optional_

- If you don't like the default Dark theme, try this one instead [https://addons.mozilla.org/en-US/firefox/addon/old-dark-theme/](https://addons.mozilla.org/en-US/firefox/addon/old-dark-theme/){:target="_blank"}
```
https://addons.mozilla.org/en-US/firefox/addon/old-dark-theme/
```
- Right click some empty space on the top bar and select `Customize Toolbar`
- Click `Toolbars` at the bottom
  - Optionally check `Menu Bar`
  - Set `Bookmarks Toolbar` to `Always Show`
- Click `Density` and select `Normal`
- Optionally add white space squares to the top toolbar by dragging them from the center box
- Drag `Home` to the toolbar next to reload
- Click `Done`

----

## Settings
Click the Options Menu in top right corner > Settings

General

- Startup
  - (Optional) Uncheck `Open previous windows and tabs`
- Tabs
  - Uncheck `Enable Container Tabs`
  - (Optional) Uncheck `Show an image preview when you hover on a tab`
- Browsing
  - (Optional) Uncheck `Control media via keyboard, headset, or virtual interface` to disable Media Hotkeys

Home

- New Windows and Tabs
  - Set "Homepage and new windows" to `Waterfox Home (Default)`
  - Make sure "New tabs" is set to `Waterfox Home (Default)`
- Waterfox Home Content
  - Check `Web Search`
  - Uncheck `Shortcuts` and `Recent activity`

Search

- Default Search Engine
  - Select preferred Default Search Engine
  - My recommendation: `DuckDuckGo`
  - Check `Use this search engine in Private Windows`
- Search Suggestions
  - Uncheck `Show search suggestions`
  - (Optional) Uncheck `Show recent searches`
- Address Bar
  - Uncheck `Search engines`
  - Uncheck `Quick actions`
- Search Shortcuts
  - Uncheck everything

Privacy & Security

- Permissions
  - Location > Settings > Check `Block new requests asking to access your location` > Click `Save Changes`
  - Notifications > Settings > Check `Block new requests asking to allow notifications` > Click `Save Changes`

Look & Feel

- Theme
  - Select `Lepton Style`
- Icons
  - Check `Hide All Icons`

----

## Advanced Changes
In the address bar type: `about:config` or copy the link from below
```
about:config
```
On the "Proceed with caution" page, click `Accept the Risk and Continue` or press Enter on the keyboard

Search for the setting and double click `true|false` to toggle the boolean

- Disable Firefox Accounts
  - Change `identity.fxaccounts.enabled` to `false`
  - ```
identity.fxaccounts.enabled
```
- Disable sites asking to handle email links (Optional)
  - _*This also prevents "mailto:" links from working_
  - Change `network.protocol-handler.external.mailto` to `false`
  - ```
network.protocol-handler.external.mailto
```

Once you have finished configuring your settings, restart Waterfox

----

## uBlock Origin

Install

- Open the Firefox Add-ons page [https://addons.mozilla.org/en-US/firefox/addon/ublock-origin/](https://addons.mozilla.org/en-US/firefox/addon/ublock-origin/){:target="_blank"}
```
https://addons.mozilla.org/en-US/firefox/addon/ublock-origin/
```
- Click `Add to Firefox`
- In the popup check `Allow this extension to run in Private Windows` and click `Add`
- In the second popup, leave `Pin extension to toolbar` checked and click `OK`
  - If uBlock doesn't show on the toolbar, click the Overflow Menu button
  - Right click the uBlock icon and select `Unpin from Overflow Menu`

Configure

- See the [uBlock Origin]({{site.url}}/ublock){:target="_blank"} article

----

## Automatically Clear History

Settings > Privacy & Security > Scroll down to "History"

- Clear any history first
  - Click `Clear History`
  - Change "When" to `Everything`
  - Select all boxes and click `Clear`
- Set "Waterfox will" to `Never remember history`
- Select `Restart Waterfox now`
