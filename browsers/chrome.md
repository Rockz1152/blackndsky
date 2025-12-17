---
layout: default
title: "Google Chrome"
permalink: /chrome
---

[Mozilla Firefox]({{site.url}}/firefox){: .simple-button}
[Waterfox]({{site.url}}/waterfox){: .simple-button}
[Google Chrome]({{site.url}}/chrome){: .simple-pressed-button}
[Microsoft Edge]({{site.url}}/edge){: .simple-button}
[uBlock Origin]({{site.url}}/ublock){: .simple-button}

<sup>_Version 12/10/24_</sup>

## Installation
Install with `winget` or use [Ninite](https://ninite.com/){:target="_blank"}
```
winget install google.chrome --accept-package-agreements --accept-source-agreements
```
Open Chrome

- Select `Don't sign in` in the bottom right corner
- Select `Set as Default` or `skip`
  - If you chose to make Chrome the default browser, click `Set default` in the Windows settings popup
- Click `Got it` for the "Enhanced ad privacy in Chrome" popup

----

## Appearance
Choose a theme

- Settings > Appearance > Theme
- Or use the "Just Black" theme from Google [https://chrome.google.com/webstore/detail/just-black/aghfnjkcakhmadgdomlmlhhaocbkloab](https://chrome.google.com/webstore/detail/just-black/aghfnjkcakhmadgdomlmlhhaocbkloab){:target="_blank"}
```
https://chrome.google.com/webstore/detail/just-black/aghfnjkcakhmadgdomlmlhhaocbkloab
```

Additional Changes

- Options > Settings > Appearance
  - Check `Show home button`
  - Check `Show bookmarks bar`
  - Uncheck `Show tab groups in bookmarks bar`
  - Uncheck `Automatically pin new tab groups created on any device to the bookmarks bar`
- Right click the bookmarks bar and uncheck:
  - `Show reading list`
  - `Show apps shortcut`
- (Optional) On the new tab page click `Customize Chrome`
  - Select `Shortcuts` on the left
  - Turn on `Hide Shortcuts`

----

## Settings
Privacy

- Settings > Privacy and Security > Site Settings > Permissions
  - Location > `Don't allow sites to see your location`
  - Notifications > `Don't allow sites to send notifications`
- Settings > Privacy and Security > Third-party cookies
  - Under "Advanced" enable `Send a "Do Not Track" request with your browsing traffic`

Change Search Provider (Optional)

- Settings > Search engine > Click `Change`
- Select a search engine from the list such as `DuckDuckGo`
- Click `Set as default`

----

## Additional Settings
Disable AI mode
```
reg add "HKLM\Software\Policies\Google\Chrome" /v "AIModeSettings" /t REG_DWORD /d 1 /f
reg add "HKLM\Software\Policies\Google\Chrome" /v "GenAILocalFoundationalModelSettings" /t REG_DWORD /d 1 /f
reg add "HKLM\Software\Policies\Google\Chrome" /v "GeminiSettings" /t REG_DWORD /d 1 /f
```

Disable Casting
```
reg add "HKLM\Software\Policies\Google\Chrome" /v "EnableMediaRouter" /t REG_DWORD /d 0 /f
```

Disable Ads tracking
```
reg add "HKLM\Software\Policies\Google\Chrome" /v "PrivacySandboxPromptEnabled" /t REG_DWORD /d 0 /f
reg add "HKLM\Software\Policies\Google\Chrome" /v "PrivacySandboxAdTopicsEnabled" /t REG_DWORD /d 0 /f
reg add "HKLM\Software\Policies\Google\Chrome" /v "PrivacySandboxSiteEnabledAdsEnabled" /t REG_DWORD /d 0 /f
reg add "HKLM\Software\Policies\Google\Chrome" /v "PrivacySandboxAdMeasurementEnabled" /t REG_DWORD /d 0 /f
```

----

## uBlock Origin Lite
> ### Author's Note
> _Due to recent changes in Chromium-based browsers, which no longer support Manifest V2 extensions, Mozilla Firefox is now recommended for its enhanced ad-blocking capabilities. As a result, Chromium-based browsers only officially support uBlock Origin Lite, a Manifest V3-compliant extension._

Install

- Open the Chrome Web Store page [https://chromewebstore.google.com/detail/ublock-origin-lite/ddkjiahejlhfcafbddmgiahcphecmpfh](https://chromewebstore.google.com/detail/ublock-origin-lite/ddkjiahejlhfcafbddmgiahcphecmpfh){:target="_blank"}
```
https://chromewebstore.google.com/detail/ublock-origin-lite/ddkjiahejlhfcafbddmgiahcphecmpfh
```
- Click `Add to Chrome`
- In the popup click `Add extension`

Pin

- Click the extensions widget on the top bar
- Next to uBlock Origin, click the `Pin` button

Incognito Mode

- Click Options > Extensions > Manage Extensions
- Under uBlock Origin click `Details`
- Scroll down and enable `Allow in Incognito`

Configure

- See the [uBlock Origin Lite]({{site.url}}/ublock#lite){:target="_blank"} article

----

## Auto Clearing History
Source: [https://chromeenterprise.google/policies/?policy=ClearBrowsingDataOnExitList](https://chromeenterprise.google/policies/?policy=ClearBrowsingDataOnExitList){:target="_blank"}

Data that can be cleared automatically

- browsing_history
- download_history
- cookies_and_other_site_data
- cached_images_and_files
- autofill
- password_signin
- site_settings
- hosted_app_data

```
reg add "HKLM\Software\Policies\Google\Chrome" /v "SyncDisabled" /t REG_DWORD /d 1 /f
reg add "HKLM\SOFTWARE\Policies\Google\Chrome\ClearBrowsingDataOnExitList" /v 1 /t REG_SZ /d "browsing_history" /f
reg add "HKLM\SOFTWARE\Policies\Google\Chrome\ClearBrowsingDataOnExitList" /v 2 /t REG_SZ /d "download_history" /f
reg add "HKLM\SOFTWARE\Policies\Google\Chrome\ClearBrowsingDataOnExitList" /v 3 /t REG_SZ /d "cookies_and_other_site_data" /f
reg add "HKLM\SOFTWARE\Policies\Google\Chrome\ClearBrowsingDataOnExitList" /v 4 /t REG_SZ /d "cached_images_and_files" /f
reg add "HKLM\SOFTWARE\Policies\Google\Chrome\ClearBrowsingDataOnExitList" /v 5 /t REG_SZ /d "autofill" /f
reg add "HKLM\SOFTWARE\Policies\Google\Chrome\ClearBrowsingDataOnExitList" /v 6 /t REG_SZ /d "password_signin" /f
reg add "HKLM\SOFTWARE\Policies\Google\Chrome\ClearBrowsingDataOnExitList" /v 7 /t REG_SZ /d "site_settings" /f
reg add "HKLM\SOFTWARE\Policies\Google\Chrome\ClearBrowsingDataOnExitList" /v 8 /t REG_SZ /d "hosted_app_data" /f
```
