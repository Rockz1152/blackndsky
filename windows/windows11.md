---
layout: default
title: Windows 11
permalink: /windows11
---

[Windows 11]({{site.url}}/windows11){: .simple-pressed-button}
[Windows 10]({{site.url}}/windows10){: .simple-button}
[Tools]({{site.url}}/windows-tools){: .simple-button}

 Removes store apps | Turns off telemetry | Installs software | Finds missing drivers | Creates install media
:------------: | :------------: | :------------: | :------------: | :------------:
[CleanApps](https://github.com/Rockz1152/CleanApps/releases){:target="_blank"} | [O&O Shutup 10](https://www.oo-software.com/en/shutup10){:target="_blank"} | [Ninite](https://ninite.com/){:target="_blank"} | [Snappy Driver Installer Origin](https://www.glenn.delahoy.com/snappy-driver-installer-origin/){:target="_blank"} | [Windows 11 Media Creation Tool](https://www.microsoft.com/en-us/software-download/windows11){:target="_blank"}

Quicklinks: 
<a href="#appearance" class="simple-button-small">Appearance</a>
<a href="#standard" class="simple-button-small">Standard Setup</a>
<a href="#optional" class="simple-button-small">Optional Tweaks</a>
<a href="#maint" class="simple-button-small">Maintenance</a>
<span style="float: right; font-weight: bold; color: #555;">Version: 24H2</span>

## Installation

### Prepare Installation Media
- Download the [Media Creation Tool](https://www.microsoft.com/en-us/software-download/windows11){:target="_blank"}
- Select "USB Device" and wait for the installation media to be ready
- Boot to the USB device to start the install

### Out-of-Box Setup
Follow these steps to create a local user

- Make sure you are disconnected from the internet
- Press `[Shift]` + `[F10]` to open a command prompt
- Enter `oobe\bypassnro`
- After setup restarts
  - Select language and keyboard layout
  - Skip adding a second keyboard layout
  - Select `I don't have internet` and then `Continue with limited setup`
- Proceed to create a local user
- On the "Privacy" screen, turn off all settings
- After setup is complete, you may connect to the internet

<a name="appearance"></a>

----

## Appearance
_*Open a "Terminal (Admin)" prompt to run commands. Right click the start button, select "Terminal (Admin)"_

### Recommended
- Switch off Spotlight (changing wallpaper) - Open [Personalization](ms-settings:personalization) and select a theme or choose one from below
  - Dark mode
```
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\Themes" /v "CurrentTheme" /t REG_SZ /d "C:\WINDOWS\resources\Themes\dark.theme" /f
reg add "HKCU\SOFTWARE\Microsoft\Windows\CurrentVersion\Themes\Personalize" /v "AppsUseLightTheme" /t REG_DWORD /d 0 /f
reg add "HKCU\SOFTWARE\Microsoft\Windows\CurrentVersion\Themes\Personalize" /v "SystemUsesLightTheme" /t REG_DWORD /d 0 /f
Add-Type -TypeDefinition 'using System.Runtime.InteropServices; public class W { [DllImport("user32.dll", CharSet=CharSet.Auto)] public static extern int SystemParametersInfo(int uAction, int uParam, string lpvParam, int fuWinIni); public static void SetWallpaper(string path) { SystemParametersInfo(20, 0, path, 3); } }';
[W]::SetWallpaper("C:\Windows\Web\Wallpaper\Windows\img19.jpg"); Stop-Process -ProcessName explorer
```
  - Light mode
```
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\Themes" /v "CurrentTheme" /t REG_SZ /d "C:\WINDOWS\resources\Themes\aero.theme" /f
reg add "HKCU\SOFTWARE\Microsoft\Windows\CurrentVersion\Themes\Personalize" /v "AppsUseLightTheme" /t REG_DWORD /d 1 /f
reg add "HKCU\SOFTWARE\Microsoft\Windows\CurrentVersion\Themes\Personalize" /v "SystemUsesLightTheme" /t REG_DWORD /d 1 /f
Add-Type -TypeDefinition 'using System.Runtime.InteropServices; public class W { [DllImport("user32.dll", CharSet=CharSet.Auto)] public static extern int SystemParametersInfo(int uAction, int uParam, string lpvParam, int fuWinIni); public static void SetWallpaper(string path) { SystemParametersInfo(20, 0, path, 3); } }';
[W]::SetWallpaper("C:\Windows\Web\Wallpaper\Windows\img0.jpg"); Stop-Process -ProcessName explorer
```

<!-- Original force wallpaper refresh script - minified version is used above
$imgPath="C:\Windows\Web\Wallpaper\Windows\img19.jpg"
$code = @' 
using System.Runtime.InteropServices; 
namespace Win32{ 
    
     public class Wallpaper{ 
        [DllImport("user32.dll", CharSet=CharSet.Auto)] 
         static extern int SystemParametersInfo (int uAction , int uParam , string lpvParam , int fuWinIni) ; 
         
         public static void SetWallpaper(string thePath){ 
            SystemParametersInfo(20,0,thePath,3); 
         }
    }
 } 
'@
add-type $code 
#Apply the Change on the system 
[Win32.Wallpaper]::SetWallpaper($imgPath)
-->
- Add Computer and User icons to desktop, hide "Learn about this picture"
```
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\Explorer\HideDesktopIcons\NewStartPanel" /v "{20D04FE0-3AEA-1069-A2D8-08002B30309D}" /t REG_DWORD /d 0 /f
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\Explorer\HideDesktopIcons\NewStartPanel" /v "{59031a47-3f72-44a7-89c5-5595fe6b30ee}" /t REG_DWORD /d 0 /f
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\Explorer\HideDesktopIcons\NewStartPanel" /v "{2cc5ca98-6485-489a-920e-b3e88a6ccce3}" /t REG_DWORD /d 1 /f
Stop-Process -ProcessName explorer
```
- Compact Start Menu layout
```
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\Explorer\Advanced" /v "Start_Layout" /t REG_DWORD /d 1 /f
```
- Disable recently added apps and recommendations
```
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\Start" /v "ShowRecentList" /t REG_DWORD /d 0 /f
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\Explorer\Advanced" /v "Start_IrisRecommendations" /t REG_DWORD /d 0 /f
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\Explorer\Advanced" /v "Start_TrackDocs" /t REG_DWORD /d 0 /f
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\Explorer\Advanced" /v "Start_AccountNotifications" /t REG_DWORD /d 0 /f
```
- Add Settings and File Explorer to start
```
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\Start" /v "VisiblePlaces" /t REG_BINARY /d bc248a140cd68942a0806ed9bba2488286087352aa5143429f7b2776584659d4 /f
```
- Disable Search, Taskview, and Chat in Taskbar
```
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\Search" /v "SearchboxTaskbarMode" /t REG_DWORD /d 0 /f
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\Explorer\Advanced" /v "ShowTaskViewButton" /t REG_DWORD /d 0 /f
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\Explorer\Advanced" /v "TaskbarMn" /t REG_DWORD /d 0 /f
```
- Disable Widgets in Taskbar
  - Open [Taskbar Settings](ms-settings:taskbar)
  - Toggle **Widgets** `Off`
- Enable compact view in File Explorer
```
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\Explorer\Advanced" /v "UseCompactMode" /t REG_DWORD /d 1 /f
```

### Additional Changes
Choice depends on personal preference, try out each setting out if you are not sure

- Taskbar button location
  - Left
```
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\Explorer\Advanced" /v "TaskbarAl" /t REG_DWORD /d 0 /f
```
  - Center (Default)
```
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\Explorer\Advanced" /v "TaskbarAl" /t REG_DWORD /d 1 /f
```
- Classic Right Click Menu
  - Enable
```
reg add "HKCU\Software\Classes\CLSID\{86ca1aa0-34aa-4e8b-a509-50c905bae2a2}\InprocServer32" /f
Stop-Process -ProcessName explorer
```
  - Restore
```
reg delete "HKCU\Software\Classes\CLSID\{86ca1aa0-34aa-4e8b-a509-50c905bae2a2}" /f
Stop-Process -ProcessName explorer
```
<!-- https://gist.github.com/ThioJoe/f4b0799e2f0d95466f4c2bd4e46d1e67 -->
- Add new "Compress to..." menu to Classic Right Click
  - Add menu
```
reg add "HKEY_CLASSES_ROOT\*\shell\CompressToFullMenu_ForOldContextMenu" /v "CommandStateSync" /t REG_SZ /d "" /f
reg add "HKEY_CLASSES_ROOT\*\shell\CompressToFullMenu_ForOldContextMenu" /v "ExplorerCommandHandler" /t REG_SZ /d "{7AE6900F-6EB0-44A2-9CA1-DB2F7EF352AF}" /f
reg add "HKEY_CLASSES_ROOT\*\shell\CompressToFullMenu_ForOldContextMenu" /v "MUIVerb" /t REG_SZ /d "@Windows.UI.FileExplorer.dll,-51797" /f
reg add "HKEY_CLASSES_ROOT\*\shell\CompressToFullMenu_ForOldContextMenu" /v "Note" /t REG_SZ /d "Copied from original Command Store command: Windows.CompressTo" /f
reg add "HKEY_CLASSES_ROOT\Folder\shell\CompressToFullMenu_ForOldContextMenu" /v "CommandStateSync" /t REG_SZ /d "" /f
reg add "HKEY_CLASSES_ROOT\Folder\shell\CompressToFullMenu_ForOldContextMenu" /v "ExplorerCommandHandler" /t REG_SZ /d "{7AE6900F-6EB0-44A2-9CA1-DB2F7EF352AF}" /f
reg add "HKEY_CLASSES_ROOT\Folder\shell\CompressToFullMenu_ForOldContextMenu" /v "MUIVerb" /t REG_SZ /d "@Windows.UI.FileExplorer.dll,-51797" /f
reg add "HKEY_CLASSES_ROOT\Folder\shell\CompressToFullMenu_ForOldContextMenu" /v "Note" /t REG_SZ /d "Copied from original Command Store command: Windows.CompressTo" /f
```
  - Remove menu
```
reg delete "HKEY_CLASSES_ROOT\*\shell\CompressToFullMenu_ForOldContextMenu" /f
reg delete "HKEY_CLASSES_ROOT\Folder\shell\CompressToFullMenu_ForOldContextMenu" /f
```

### Microsoft Edge
- Changes to make Microsoft Edge usable
```
reg add "HKLM\SOFTWARE\Policies\Microsoft\Edge" /v "NewTabPageAllowedBackgroundTypes" /t REG_DWORD /d 3 /f
reg add "HKLM\SOFTWARE\Policies\Microsoft\Edge" /v "HubsSidebarEnabled" /t REG_DWORD /d 0 /f
reg add "HKLM\SOFTWARE\Policies\Microsoft\Edge" /v "EnableMediaRouter" /t REG_DWORD /d 0 /f
reg add "HKLM\SOFTWARE\Policies\Microsoft\Edge" /v "EdgeCollectionsEnabled" /t REG_DWORD /d 0 /f
reg add "HKLM\SOFTWARE\Policies\Microsoft\Edge" /v "ShowMicrosoftRewards" /t REG_DWORD /d 0 /f
reg add "HKLM\SOFTWARE\Policies\Microsoft\Edge" /v "ExperimentationAndConfigurationServiceControl" /t REG_DWORD /d 0 /f
reg add "HKLM\SOFTWARE\Policies\Microsoft\Edge" /v "BingAdsSuppression" /t REG_DWORD /d 1 /f
reg add "HKLM\SOFTWARE\Policies\Microsoft\Edge" /v "MicrosoftEdgeInsiderPromotionEnabled" /t REG_DWORD /d 0 /f
reg add "HKLM\SOFTWARE\Policies\Microsoft\Edge" /v "DefaultBrowserSettingEnabled" /t REG_DWORD /d 0 /f
reg add "HKLM\SOFTWARE\Policies\Microsoft\Edge" /v "EdgeWorkspacesEnabled" /t REG_DWORD /d 0 /f
reg add "HKLM\SOFTWARE\Policies\Microsoft\Edge" /v "EdgeShoppingAssistantEnabled" /t REG_DWORD /d 0 /f
reg add "HKLM\SOFTWARE\Policies\Microsoft\Edge" /v "SearchSuggestEnabled" /t REG_DWORD /d 0 /f
reg add "HKLM\SOFTWARE\Policies\Microsoft\Edge" /v "ConfigureDoNotTrack" /t REG_DWORD /d 1 /f
reg add "HKLM\SOFTWARE\Policies\Microsoft\Edge" /v "PaymentMethodQueryEnabled" /t REG_DWORD /d 0 /f
reg add "HKLM\SOFTWARE\Policies\Microsoft\Edge" /v "ResolveNavigationErrorsUseWebService" /t REG_DWORD /d 0 /f
reg add "HKLM\SOFTWARE\Policies\Microsoft\Edge" /v "AlternateErrorPagesEnabled" /t REG_DWORD /d 0 /f
reg add "HKLM\SOFTWARE\Policies\Microsoft\Edge" /v "UserFeedbackAllowed" /t REG_DWORD /d 0 /f
reg add "HKLM\SOFTWARE\Policies\Microsoft\Edge" /v "ShowRecommendationsEnabled" /t REG_DWORD /d 0 /f
reg add "HKLM\SOFTWARE\Policies\Microsoft\Edge" /v "ShowAcrobatSubscriptionButton" /t REG_DWORD /d 0 /f
reg add "HKLM\SOFTWARE\Policies\Microsoft\Edge" /v "PinBrowserEssentialsToolbarButton" /t REG_DWORD /d 0 /f
reg add "HKLM\SOFTWARE\Policies\Microsoft\Edge" /v "ShowPDFDefaultRecommendationsEnabled" /t REG_DWORD /d 0 /f
reg add "HKLM\SOFTWARE\Policies\Microsoft\Edge" /v "AddressBarMicrosoftSearchInBingProviderEnabled" /t REG_DWORD /d 0 /f
reg add "HKLM\SOFTWARE\Policies\Microsoft\Edge" /v "PersonalizationReportingEnabled" /t REG_DWORD /d 0 /f
reg add "HKLM\SOFTWARE\Policies\Microsoft\Edge" /v "WebWidgetAllowed" /t REG_DWORD /d 0 /f
reg add "HKLM\SOFTWARE\Policies\Microsoft\Edge" /v "WebWidgetIsEnabledOnStartup" /t REG_DWORD /d 0 /f
reg add "HKLM\SOFTWARE\Policies\Microsoft\Edge" /v "SearchbarAllowed" /t REG_DWORD /d 0 /f
reg add "HKLM\SOFTWARE\Policies\Microsoft\Edge" /v "SearchbarIsEnabledOnStartup" /t REG_DWORD /d 0 /f
reg add "HKLM\SOFTWARE\Policies\Microsoft\Edge" /v "PerformanceDetectorEnabled" /t REG_DWORD /d 0 /f
reg add "HKLM\SOFTWARE\Policies\Microsoft\Edge" /v "NewTabPageContentEnabled" /t REG_DWORD /d 0 /f
reg add "HKLM\SOFTWARE\Policies\Microsoft\Edge" /v "NewTabPageBingChatEnabled" /t REG_DWORD /d 0 /f
reg add "HKLM\SOFTWARE\Policies\Microsoft\Edge" /v "NewTabPageSearchBox" /t REG_SZ /d "redirect" /f
reg add "HKLM\SOFTWARE\Policies\Microsoft\Edge" /v "HideFirstRunExperience" /t REG_DWORD /d 1 /f
reg add "HKLM\SOFTWARE\Policies\Microsoft\Edge" /v "AutoImportAtFirstRun" /t REG_DWORD /d 4 /f
reg add "HKLM\SOFTWARE\Policies\Microsoft\Edge\Recommended" /v "ShowHomeButton" /t REG_DWORD /d 1 /f
```
- Open `edge://policy/` and click `Reload Policies` - Copy and paste link below to visit
```
edge://policy/
```

<a name="standard"></a>

----

## Standard Setup
_*Open a "Terminal (Admin)" prompt to run commands. Right click the start button, select "Terminal (Admin)"_

- Remove unwanted Windows Store apps with [CleanApps](https://github.com/Rockz1152/CleanApps/releases){:target="_blank"} script
- Update Apps in [Microsoft Store](ms-windows-store://downloadsandupdates)
- Install [Windows Updates](ms-settings:windowsupdate)
- Install drivers and reboot
- Install software with [Ninite](https://ninite.com/){:target="_blank"}
- Set a default Web browser in [Default apps](ms-settings:defaultapps)
- Turn off telemetry with [O&O Shutup 10](https://www.oo-software.com/en/shutup10){:target="_blank"}
  - Go to Actions > "Apply only recommended settings"
  - Current User
    - Windows Explorer > Disable ads in Windows Explorer/OneDrive
    - Search > Disable extensions of Windows search with Bing
    - Taskbar > Disable all
  - Local Machine
    - Windows Explorer > Disable all if you are not using OneDrive
    - Microsoft Defender and Microsoft SPyNet > Disable all
    - Taskbar > Disable all
    - Miscellaneous > Disable all except "Disable Network Connecting Status Indicator"
- Disable System Protection
```
Disable-ComputerRestore "C:"; vssadmin delete shadows /all /quiet | Out-Null
```
- Remove OneDrive **-- Optional**
```
Stop-Process -ProcessName OneDrive -ErrorAction SilentlyContinue
Start-Process "$Env:SystemRoot\System32\OneDriveSetup.exe" -ArgumentList "/uninstall" -Wait
```
- Remove Teams **-- Optional**
```
Get-AppxPackage MicrosoftTeams* | Remove-AppxPackage -AllUsers
Get-AppxPackage MSTeams* | Remove-AppxPackage -AllUsers
```
- Disable Remote Assistance
```
reg add "HKLM\SYSTEM\CurrentControlSet\Control\Remote Assistance" /v "fAllowToGetHelp" /t REG_DWORD /d 0 /f
```
- Enable Ultimate Performance power profile **-- Gaming Desktops Only**
```
$powerProfile = Get-CimInstance -Namespace "root\cimv2\power" -ClassName Win32_PowerPlan | Where-Object { $_.ElementName -eq "Ultimate Performance" }
if ($powerProfile -eq $null) {$result = powercfg -duplicatescheme e9a42b02-d5df-448d-aa00-03f14749eb61; if ($result -match "GUID: ([0-9a-fA-F-]+)") { powercfg -setactive $matches[1] }} else {
if ($powerProfile.InstanceID -match "([0-9a-fA-F]{8}-([0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12})") { powercfg -setactive $matches[1] }}
```
- Optimize system responsiveness and disable network throttling. **-- Gaming Desktops Only** <!-- Defaults: SystemResponsiveness=20 NetworkThrottlingIndex=10 -->
```
reg add "HKLM\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Multimedia\SystemProfile" /v SystemResponsiveness /t REG_DWORD /d 0 /f
reg add "HKLM\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Multimedia\SystemProfile" /v NetworkThrottlingIndex /t REG_DWORD /d 4294967295 /f
```
- Disable Offline Files **-- Pro only**
```
Set-Service -Name "CscService" -StartupType Disabled; Stop-Service -Name "CscService"
```
- Disable Preview Updates **-- Pro only**
```
reg add "HKLM\Software\Policies\Microsoft\Windows\WindowsUpdate" /v "DeferQualityUpdates" /t REG_DWORD /d 1 /f
reg add "HKLM\Software\Policies\Microsoft\Windows\WindowsUpdate" /v "DeferQualityUpdatesPeriodInDays" /t REG_DWORD /d 0 /f
reg add "HKLM\Software\Policies\Microsoft\Windows\WindowsUpdate" /v "PauseQualityUpdatesStartTime" /t REG_SZ /f
```
- Disable Windows Media Player Network Sharing Service
```
Set-Service -Name "WMPNetworkSvc" -StartupType Disabled; Stop-Service -Name "WMPNetworkSvc"
```
- Disable Windows Search service **-- If Not Using Outlook** <!-- Always disable after classic Outlook retirement -->
```
Set-Service -Name "WSearch" -StartupType Disabled; Stop-Service -Name "WSearch"
```
- Disable Telemetry and the Diagnostics Tracking Service <!-- The registry is also handled by Shutup10+ -->
```
Set-Service -Name "DiagTrack" -StartupType Disabled; Stop-Service -Name "DiagTrack"
reg add "HKLM\SOFTWARE\Policies\Microsoft\Windows\DataCollection" /v "AllowTelemetry" /t REG_DWORD /d 0 /f
reg add "HKLM\SOFTWARE\Policies\Microsoft\Windows\DataCollection" /v "LimitDiagnosticLogCollection" /t REG_DWORD /d 1 /f
reg add "HKLM\SOFTWARE\Policies\Microsoft\Windows\DataCollection" /v "DisableOneSettingsDownloads" /t REG_DWORD /d 1 /f
reg add "HKLM\SOFTWARE\Policies\Microsoft\Windows\DataCollection" /v "DoNotShowFeedbackNotifications" /t REG_DWORD /d 1 /f
reg add "HKCU\Software\Microsoft\Siuf\Rules" /v "NumberOfSIUFInPeriod" /t REG_DWORD /d 0 /f
```
- Configure Out-of-Box privacy settings
```
reg add "HKCU\SOFTWARE\Policies\Microsoft\Windows\CloudContent" /v DisableTailoredExperiencesWithDiagnosticData /t REG_DWORD /d 1 /f
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\AdvertisingInfo" /v "Enabled" /t REG_DWORD /d 0 /f
reg add "HKCU\Software\Microsoft\InputPersonalization" /v "RestrictImplicitTextCollection" /t REG_DWORD /d 1 /f
reg add "HKCU\Software\Microsoft\InputPersonalization" /v "RestrictImplicitInkCollection" /t REG_DWORD /d 1 /f
reg add "HKCU\Software\Microsoft\InputPersonalization\TrainedDataStore" /v "HarvestContacts" /t REG_DWORD /d 0 /f
reg add "HKCU\Software\Microsoft\Personalization\Settings" /v "AcceptedPrivacyPolicy" /t REG_DWORD /d 0 /f
```
- Disable Windows Error Reporting across the system
```
reg add "HKLM\SOFTWARE\Microsoft\Windows\Windows Error Reporting" /v Disabled /t REG_DWORD /d 1 /f; Disable-WindowsErrorReporting
```
- If running SSD and second HD, move pagefile to second HD **-- Optional**
- If running SSD disable Fast Startup
```
reg add "HKLM\SYSTEM\CurrentControlSet\Control\Session Manager\Power" /v "HiberbootEnabled" /t REG_DWORD /d 0 /f
```
- Disable automatic sign-in after updates and restarts
```
reg add "HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Policies\System" /v "DisableAutomaticRestartSignOn" /t REG_DWORD /d 1 /f
```
- Disable hibernation file **-- Recommended**
```
powercfg -h off
```
- Disable Copilot and Recall
```
reg add "HKLM\SOFTWARE\Policies\Microsoft\Edge" /v "HubsSidebarEnabled" /t REG_DWORD /d 0 /f
reg add "HKLM\SOFTWARE\Policies\Microsoft\Edge" /v "WebAppSettings" /t REG_SZ /f; Set-ItemProperty -Path "HKLM:\SOFTWARE\Policies\Microsoft\Edge" -Name "WebAppSettings" -Value '[{"manifest_id": "https://copilot.microsoft.com/?cmc", "run_on_os_login": "blocked", "force_unregister_os_integration": true}]' -Type String
reg add "HKCU\Software\Policies\Microsoft\Windows\WindowsCopilot" /v "TurnOffWindowsCopilot" /t REG_DWORD /d 1 /f
reg add "HKLM\Software\Policies\Microsoft\Windows\WindowsCopilot" /v "TurnOffWindowsCopilot" /t REG_DWORD /d 1 /f
reg add "HKCU\Software\Policies\Microsoft\Windows\WindowsAI" /v "DisableAIDataAnalysis" /t REG_DWORD /d 1 /f
reg add "HKLM\Software\Policies\Microsoft\Windows\WindowsAI" /v "DisableAIDataAnalysis" /t REG_DWORD /d 1 /f
dism /online /Disable-Feature /FeatureName:"Recall"; Get-WindowsOptionalFeature -Online | Where-Object {$_.FeatureName -eq "Recall"}
```
- Prevent preinstalled applications from returning and remove Start Menu suggestions
```
reg add "HKCU\SOFTWARE\Microsoft\Windows\CurrentVersion\ContentDeliveryManager" /v "ContentDeliveryAllowed" /t REG_DWORD /d 0 /f
reg add "HKCU\SOFTWARE\Microsoft\Windows\CurrentVersion\ContentDeliveryManager" /v "OemPreInstalledAppsEnabled" /t REG_DWORD /d 0 /f
reg add "HKCU\SOFTWARE\Microsoft\Windows\CurrentVersion\ContentDeliveryManager" /v "PreInstalledAppsEnabled" /t REG_DWORD /d 0 /f
reg add "HKCU\SOFTWARE\Microsoft\Windows\CurrentVersion\ContentDeliveryManager" /v "PreInstalledAppsEverEnabled" /t REG_DWORD /d 0 /f
reg add "HKCU\SOFTWARE\Microsoft\Windows\CurrentVersion\ContentDeliveryManager" /v "SilentInstalledAppsEnabled" /t REG_DWORD /d 0 /f
```
- Disable suggested content in the Settings app
```
reg add "HKCU\SOFTWARE\Microsoft\Windows\CurrentVersion\ContentDeliveryManager" /v "SystemPaneSuggestionsEnabled" /t REG_DWORD /d 0 /f
reg add "HKCU\SOFTWARE\Microsoft\Windows\CurrentVersion\ContentDeliveryManager" /v "SubscribedContent-310093Enabled" /t REG_DWORD /d 0 /f
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\ContentDeliveryManager" /v "SubscribedContent-314559Enabled" /t REG_DWORD /d 0 /f
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\ContentDeliveryManager" /v "SubscribedContent-338387Enabled" /t REG_DWORD /d 0 /f
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\ContentDeliveryManager" /v "SubscribedContent-338388Enabled" /t REG_DWORD /d 0 /f
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\ContentDeliveryManager" /v "SubscribedContent-338389Enabled" /t REG_DWORD /d 0 /f
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\ContentDeliveryManager" /v "SubscribedContent-338393Enabled" /t REG_DWORD /d 0 /f
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\ContentDeliveryManager" /v "SubscribedContent-353694Enabled" /t REG_DWORD /d 0 /f
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\ContentDeliveryManager" /v "SubscribedContent-353696Enabled" /t REG_DWORD /d 0 /f
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\ContentDeliveryManager" /v "SubscribedContent-353698Enabled" /t REG_DWORD /d 0 /f
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\ContentDeliveryManager" /v "SubscribedContentEnabled" /t REG_DWORD /d 0 /f
Delete-DeliveryOptimizationCache -Force
```
- Disable Game Bar
```
reg add "HKCU\Software\Microsoft\GameBar" /v "UseNexusForGameBarEnabled" /t REG_DWORD /d 0 /f
reg add "HKCU\System\GameConfigStore" /v "GameDVR_FSEBehavior" /t REG_DWORD /d 2 /f
reg add "HKCU\System\GameConfigStore" /v "GameDVR_Enabled" /t REG_DWORD /d 0 /f
reg add "HKCU\SOFTWARE\Microsoft\Windows\CurrentVersion\GameDVR" /v "AppCaptureEnabled" /t REG_DWORD /d 0 /f
```
- Disable "Quiet Hours", allows you to disable "Do not disturb"
```
reg add "HKCU\SOFTWARE\Microsoft\Windows\CurrentVersion\QuietHours" /v "Enabled" /t REG_DWORD /d 0 /f
```
- Disable prompting to sign-in with a Microsoft account
```
reg add "HKCU\SOFTWARE\Microsoft\Windows\CurrentVersion\UserProfileEngagement" /v "ScoobeSystemSettingEnabled" /t REG_DWORD /d 0 /f
```
- Disable reminders from "Windows Backup"
```
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\Notifications\Settings\MicrosoftWindows.Client.CBS_cw5n1h2txyewy!WindowsBackup" /v "Enabled" /t REG_DWORD /d 0 /f
```
- Set File Explorer to "**This PC**", uncheck "**Show recently used files**" and "**Show frequently used folders**"
```
reg add "HKCU\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\Advanced" /v "LaunchTo" /t REG_DWORD /d 1 /f
reg add "HKCU\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer" /v "ShowFrequent" /t REG_DWORD /d 0 /f
reg add "HKCU\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer" /v "ShowRecent" /t REG_DWORD /d 0 /f
```
- Add default folders back to "**This PC**" (Optional)
```
# --Desktop--
New-ItemProperty -Path "HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\MyComputer\NameSpace\{B4BFCC3A-DB2C-424C-B029-7FE99A87C641}" -Name "HideIfEnabled" -PropertyType String -Value "" -Force | Out-Null
New-ItemProperty -Path "HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\MyComputer\NameSpace\{B4BFCC3A-DB2C-424C-B029-7FE99A87C641}" -Name "HiddenByDefault" -PropertyType DWord -Value 0 -Force | Out-Null
# --Documents--
New-ItemProperty -Path "HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\MyComputer\NameSpace\{d3162b92-9365-467a-956b-92703aca08af}" -Name "HideIfEnabled" -PropertyType String -Value "" -Force | Out-Null
New-ItemProperty -Path "HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\MyComputer\NameSpace\{d3162b92-9365-467a-956b-92703aca08af}" -Name "HiddenByDefault" -PropertyType DWord -Value 0 -Force | Out-Null
# --Downloads--
New-ItemProperty -Path "HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\MyComputer\NameSpace\{088e3905-0323-4b02-9826-5d99428e115f}" -Name "HideIfEnabled" -PropertyType String -Value "" -Force | Out-Null
New-ItemProperty -Path "HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\MyComputer\NameSpace\{088e3905-0323-4b02-9826-5d99428e115f}" -Name "HiddenByDefault" -PropertyType DWord -Value 0 -Force | Out-Null
# --Music--
New-ItemProperty -Path "HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\MyComputer\NameSpace\{3dfdf296-dbec-4fb4-81d1-6a3438bcf4de}" -Name "HideIfEnabled" -PropertyType String -Value "" -Force | Out-Null
New-ItemProperty -Path "HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\MyComputer\NameSpace\{1CF1260C-4DD0-4ebb-811F-33C572699FDE}" -Name "HiddenByDefault" -PropertyType DWord -Value 0 -Force | Out-Null
New-ItemProperty -Path "HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\MyComputer\NameSpace\{3dfdf296-dbec-4fb4-81d1-6a3438bcf4de}" -Name "HiddenByDefault" -PropertyType DWord -Value 0 -Force | Out-Null
# --Pictures--
New-ItemProperty -Path "HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\MyComputer\NameSpace\{24ad3ad4-a569-4530-98e1-ab02f9417aa8}" -Name "HideIfEnabled" -PropertyType String -Value "" -Force | Out-Null
New-ItemProperty -Path "HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\MyComputer\NameSpace\{24ad3ad4-a569-4530-98e1-ab02f9417aa8}" -Name "HiddenByDefault" -PropertyType DWord -Value 0 -Force | Out-Null
# --Videos--
New-ItemProperty -Path "HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\MyComputer\NameSpace\{f86fa3ab-70d2-4fc7-9c99-fcbf05467f3a}" -Name "HideIfEnabled" -PropertyType String -Value "" -Force | Out-Null
New-ItemProperty -Path "HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\MyComputer\NameSpace\{f86fa3ab-70d2-4fc7-9c99-fcbf05467f3a}" -Name "HiddenByDefault" -PropertyType DWord -Value 0 -Force | Out-Null
```
- Remove "**Share**", "**Cast to Device**", "**Give access to**" from right click context menu
```
reg add "HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Shell Extensions\Blocked" /v "{e2bf9676-5f8f-435c-97eb-11607a5bedf7}" /t REG_SZ /f
reg add "HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Shell Extensions\Blocked" /v "{7AD84985-87B4-4a16-BE58-8B72A5B390F7}" /t REG_SZ /f
reg add "HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Shell Extensions\Blocked" /v "{f81e9010-6ea4-11ce-a7ff-00aa003ca9f6}" /t REG_SZ /f
Stop-Process -ProcessName explorer
```
- Set the correct Time Zone **--** Or you can choose from "**Adjust date/time**"
```
Set-TimeZone -Id "Eastern Standard Time"
```
```
Set-TimeZone -Id "Central Standard Time"
```
```
Set-TimeZone -Id "Mountain Standard Time"
```
```
Set-TimeZone -Id "US Mountain Standard Time" #Arizona
```
```
Set-TimeZone -Id "Pacific Standard Time"
```
- Sync from internet time
```
Start-Service -Name "W32Time"; W32tm /resync /force | Out-Null
```
- Disable un-needed scheduled tasks <!-- include XblGameSaveTask on business systems-->
```
Get-Scheduledtask 'Microsoft Compatibility Appraiser','Consolidator','UsbCeip','Microsoft-Windows-DiskDiagnosticDataCollector','QueueReporting',' DmClient','DmClientOnScenarioDownload','StartupAppTask','MareBackup','PcaPatchDbTask','ProgramDataUpdater','MapsUpdateTask','MapsToastTask','Proxy' -erroraction silentlycontinue | Disable-scheduledtask
```
- Disable Windows Defender Notifications
```
reg add "HKLM\SOFTWARE\Microsoft\Windows Defender Security Center\Notifications" /v "DisableEnhancedNotifications" /t REG_DWORD /d 1 /f
reg add "HKLM\SOFTWARE\Microsoft\Windows Defender Security Center\Virus and threat protection" /v "SummaryNotificationDisabled" /t REG_DWORD /d 1 /f
reg add "HKLM\SOFTWARE\Microsoft\Windows Defender Security Center\Virus and threat protection" /v "NoActionNotificationDisabled" /t REG_DWORD /d 1 /f
reg add "HKLM\SOFTWARE\Microsoft\Windows Defender Security Center\Virus and threat protection" /v "FilesBlockedNotificationDisabled" /t REG_DWORD /d 1 /f
reg add "HKCU\Software\Microsoft\Windows Defender Security Center\Account protection" /v "DisableNotifications" /t REG_DWORD /d 1 /f
reg add "HKCU\Software\Microsoft\Windows Defender Security Center\Account protection" /v "DisableWindowsHelloNotifications" /t REG_DWORD /d 1 /f
reg add "HKCU\Software\Microsoft\Windows Defender Security Center\Account protection" /v "DisableDynamiclockNotifications" /t REG_DWORD /d 1 /f
```
- Disable Core Isolation: Memory integrity **-- Optional, Improves Game Performance**
```
reg add "HKLM\SYSTEM\CurrentControlSet\Control\DeviceGuard\Scenarios\HypervisorEnforcedCodeIntegrity" /v "Enabled" /t REG_DWORD /d 0 /f
```
- Open [Windows Security Center](windowsdefender:) and dismiss any alerts
- Cleanup Windows components
```
Dism /Online /Cleanup-Image /StartComponentCleanup
```
- Run Disk Cleanup with "**Clean up system files**"
- Optimize drives
- Disable [Do not Disturb](ms-settings:notifications)
  - Toggle off `Do not disturb`
  - Expand "Turn on do not disturb automatically"
  - Toggle off all rules
- Reboot system

<a name="optional"></a>

----

## Optional Tweaks

### Disable Sticky Keys shortcuts
Disable shortcut keys that can interrupt gaming

- Go to [Keyboard](ms-settings:easeofaccess-keyboard) under Accessibility in Settings
- Click "Sticky Keys" and turn off all options
- Click "Filter Keys" and turn off all options
- Keep "Toggle Keys" off

### Disable lock screen when resuming from sleep
- Apply the change to the current power profile
```
powercfg /SETDCVALUEINDEX SCHEME_CURRENT SUB_NONE CONSOLELOCK 0
powercfg /SETACVALUEINDEX SCHEME_CURRENT SUB_NONE CONSOLELOCK 0
```
- Reboot the system to apply the change

----

<a name="maint"></a>
## Maintenance
- Install [Windows Updates](ms-settings:windowsupdate)
- Update Apps in [Microsoft Store](ms-windows-store://downloadsandupdates)
- Update software with [Ninite](https://ninite.com/){:target="_blank"}
- Check Windows system files, *[More information](https://support.microsoft.com/en-us/help/4026529/windows-10-using-system-file-checker){:target="_blank"}*
```
Dism /Online /Cleanup-Image /StartComponentCleanup
```
```
Dism /Online /Cleanup-Image /RestoreHealth
```
```
Dism /Online /Cleanup-Image /ScanHealth
```
```
sfc /scannow
```
Or optionally, run as one command:
```
Dism /Online /Cleanup-Image /StartComponentCleanup; Dism /Online /Cleanup-Image /RestoreHealth; Dism /Online /Cleanup-Image /ScanHealth; sfc /scannow
```
- Run Disk Cleanup with "**Clean up system files**"
- Optimize Drives
- Reboot system
