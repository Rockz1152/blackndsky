---
layout: default
title: "Mozilla Firefox"
permalink: /firefox
---

[Mozilla Firefox]({{site.url}}/firefox){: .simple-pressed-button}
[Google Chrome]({{site.url}}/chrome){: .simple-button}
[Microsoft Edge]({{site.url}}/edge){: .simple-button}
[uBlock Origin]({{site.url}}/ublock){: .simple-button}

<sup>_Version 10/22/24_</sup>

> ### **Author's Note**
>
> _Mozilla Firefox is recommended over Google Chrome and Microsoft Edge due to better support for Ad blocking_

## Installation

Install with `winget` or use [Ninite](https://ninite.com/){:target="_blank"}
```
winget install mozilla.firefox --accept-package-agreements --accept-source-agreements
```
Open Firefox

- Select the options you want and click `Save and Continue`
- Continue through the onboarding process or close the tab
- Right click the "Firefox View" button in the top left and select `Remove from Toolbar`

----

## Theme
- If you don't like the current theme you can change it
  - Options Menu > Add-ons and themes > Themes on the left
  - Enable a theme to try it out
- If you don't like the default Dark theme, try the one below
- Visit [https://addons.mozilla.org/en-US/firefox/addon/old-dark-theme/](https://addons.mozilla.org/en-US/firefox/addon/old-dark-theme/){:target="_blank"} and install the theme
  - Additional changes can be found at: [https://github.com/anewuser/firefox-clean-dark-theme](https://github.com/anewuser/firefox-clean-dark-theme){:target="_blank"} but are not required

----

## Appearance

- Right click some empty space on the top bar and select `Customize Toolbar`
- (Optional) Click `Toolbars` at the bottom
  - Check `Menu Bar` optionally
  - Set `Bookmarks Toolbar` to `Always Show`
- (Optional) Remove white space squares in top toolbar by dragging them to the box underneath
- (Optional) Drag `Home` to toolbar next to reload
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
- Browsing
  - (Optional) Uncheck `Control media via keyboard, headset, or virtual interface` to disable Media Hotkeys
  - Uncheck `Recommend extensions as you browse`
  - Uncheck `Recommend features as you browse`

Home

- New Windows and Tabs
  - Set "Homepage and new windows" to `Firefox Home (Default)`
  - Make sure "New tabs" is set to `Firefox Home (Default)`
- Firefox Home Content, Uncheck:
  - `Sponsored shortcuts`
  - `Shortcuts` (Optional)
  - `Weather` (Optional)
  - `Sponsored stories`
  - `Recommended stories`
  - `Recent activity`

Search

- Default Search Engine
  - Select preferred Default Search Engine
- Search Suggestions
  - Uncheck `Show trending search suggestions`
  - Uncheck `Show search suggestions ahead of browsing history in address bar results`
  - Uncheck `Show search suggestions`
  - (Optional) Uncheck `Show recent searches`
- Address Bar -- Firefox Suggest
  - Uncheck `Search engines`
  - Uncheck `Suggestions from Firefox`
  - Uncheck `Suggestions from sponsors`
- Search Shortcuts
  - Uncheck everything

Privacy & Security

- Website Privacy Preferences
  - Check `Tell websites not to sell or share my data`
  - Check `Send websites a "Do Not Track" request`
- Permissions
  - Location > Settings > Check `Block new requests asking to access your location`
  - Notifications > Settings > Check `Block new requests asking to allow notifications`
- Firefox Data Collection and Use
  - Uncheck all settings
- Website Advertising Preferences
  - Uncheck `Allow websites to perform privacy-preserving ad measurement`
- Enable DNS over HTTPS using:
  - (Optional) Select `Max Protection`

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
- Disable Pocket
  - Change `extensions.pocket.enabled` to `false`
  - ```
extensions.pocket.enabled
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
- Disable sites asking to handle email links
  - Change `network.protocol-handler.external.mailto` to `false`
  - ```
network.protocol-handler.external.mailto
```
- Disable tab preview (Optional)
  - Change `browser.tabs.hoverPreview.enabled` to `false`
  - ```
browser.tabs.hoverPreview.enabled
```

Once you have finished configuring your settings, close and reopen Firefox

- Click the hamburger menu in the top right corner > `Exit`
- Reopen Firefox

----

## uBlock Origin

Install

- Open the Firefox Add-ons page
  - [https://addons.mozilla.org/en-US/firefox/addon/ublock-origin/](https://addons.mozilla.org/en-US/firefox/addon/ublock-origin/){:target="_blank"}
- Click `Add to Firefox`
- In the popup click `Add`
- On the second popup check `Allow this extension to run in Private Windows` and click `Okay`

Pin

- If uBlock doesn't show on the toolbar, click the Overflow Menu button
- Right click the uBlock icon and select `Unpin from Overflow Menu`

Configure

- See the [uBlock Origin]({{site.url}}/ublock) article

----

## Automatically Clear History

Settings > Privacy & Security > Scroll down to "History"

- Clear any history first
  - Click `Clear History`
  - Change "When" to `Everything`
  - Select all boxes and click `Clear`
- Set "Firefox will" to  `Never remember history`
- Select `Restart Firefox now`
