---
layout: default
title: "Mozilla Firefox"
permalink: /firefox
---

[Mozilla Firefox]({{site.url}}/firefox){: .simple-pressed-button}
[Google Chrome]({{site.url}}/chrome){: .simple-button}
[Microsoft Edge]({{site.url}}/edge){: .simple-button}
[uBlock Origin]({{site.url}}/ublock){: .simple-button}

<sup>_Version 12/10/24_</sup>

> ### **Author's Note**
>
> _Mozilla Firefox is recommended over Google Chrome and Microsoft Edge for its enhanced ad-blocking capabilities._

## Installation

Install with `winget` or use [Ninite](https://ninite.com/){:target="_blank"}
```
winget install mozilla.firefox --accept-package-agreements --accept-source-agreements
```
Open Firefox

- Click `Continue`
- Select the options you want and click `Save and Continue`
- Continue through the onboarding process or close the tab
- Right click the "Firefox View" button in the top left and select `Remove from Toolbar`
- Right click the "Show sidebar" button to the left of the back arrow and select `Remove from Toolbar`

----

## Theme
- If you don't like the current theme you can change it
  - Options Menu > Add-ons and themes > Themes on the left
  - Enable a theme to try it out
- If you don't like the default Dark theme, try this one instead [https://addons.mozilla.org/en-US/firefox/addon/old-dark-theme/](https://addons.mozilla.org/en-US/firefox/addon/old-dark-theme/){:target="_blank"}
```
https://addons.mozilla.org/en-US/firefox/addon/old-dark-theme/
```

----

## Appearance
_*This section is Optional_

- Right click some empty space on the top bar and select `Customize Toolbar`
- Click `Toolbars` at the bottom
  - Check `Menu Bar` optionally
  - Set `Bookmarks Toolbar` to `Always Show`
- Remove white space squares in top toolbar by dragging them to the box underneath
- Drag `Home` to toolbar next to reload
- Click `Done`

----

## Settings
Click the Options Menu in top right corner > Settings

General

- Startup
  - (Optional) Enable `Open previous windows and tabs`
  - Uncheck `Open Firefox automatically when your computer starts up`
- Tabs
  - (Optional) Uncheck `Show an image preview when you hover on a tab`
  - Uncheck `Use AI to suggest tabs and a name for tab groups`
- Browsing
  - (Optional) Uncheck `Control media via keyboard, headset, or virtual interface` to disable Media Hotkeys
  - Uncheck `Recommend extensions as you browse`
  - Uncheck `Recommend features as you browse`
  - Uncheck `Enable link previews`

Home

- New Windows and Tabs
  - Set "Homepage and new windows" to `Firefox Home (Default)`
  - Make sure "New tabs" is set to `Firefox Home (Default)`
- Firefox Home Content, Uncheck:
  - `Weather` (Optional)
  - `Shortcuts` (Optional)
  - `Recommended stories`
  - `Support Firefox`
  - `Recent activity`

Search

- Default Search Engine
  - Select preferred Default Search Engine
  - My recommendation: `DuckDuckGo`
- Search Suggestions
  - Uncheck `Show search suggestions`
  - (Optional) Uncheck `Show recent searches`
- Address Bar -- Firefox Suggest
  - Uncheck `Search engines`
  - Uncheck `Quick actions`
  - Uncheck `Suggestions from Firefox`
  - Uncheck `Suggestions from sponsors`
  - Make sure `Improve the Firefox Suggest experience` is disabled
- Search Shortcuts
  - Uncheck everything

Privacy & Security

- Website Privacy Preferences
  - Check `Tell websites not to sell or share my data`
- Permissions
  - Location > Settings > Check `Block new requests asking to access your location` > Click `Save Changes`
  - Notifications > Settings > Check `Block new requests asking to allow notifications` > Click `Save Changes`
- Firefox Data Collection and Use
  - Uncheck all settings
- Website Advertising Preferences
  - Make sure `Allow websites to perform privacy-preserving ad measurement` is disabled
- Enable DNS over HTTPS using (Optional):
  - Select `Max Protection`

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
- Disable "More from Mozilla"
  - Change `browser.preferences.moreFromMozilla` to `false`
  - ```
browser.preferences.moreFromMozilla
```
- Disable "Firefox Labs"
  - Change `browser.preferences.experimental` to `false`
  - ```
browser.preferences.experimental
```
- Disable Tab Groups
  - Change `browser.tabs.groups.enabled` to `false`
  - ```
browser.tabs.groups.enabled
```
- Disable sites asking to handle email links (Optional)
  - _*This also prevents "mailto:" links from working_
  - Change `network.protocol-handler.external.mailto` to `false`
  - ```
network.protocol-handler.external.mailto
```
- Disable Tab Preview (Optional)
  - Change `browser.tabs.hoverPreview.enabled` to `false`
  - ```
browser.tabs.hoverPreview.enabled
```

Once you have finished configuring your settings, close and reopen Firefox

----

## uBlock Origin

Install

- Open the Firefox Add-ons page [https://addons.mozilla.org/en-US/firefox/addon/ublock-origin/](https://addons.mozilla.org/en-US/firefox/addon/ublock-origin/){:target="_blank"}
```
https://addons.mozilla.org/en-US/firefox/addon/ublock-origin/
```
- Click `Add to Firefox`
- In the popup click `Add`
- On the second popup check `Allow this extension to run in Private Windows` and click `Okay`

Pin

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
- Set "Firefox will" to  `Never remember history`
- Select `Restart Firefox now`
