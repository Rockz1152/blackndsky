---
layout: default
title: Windows 10
permalink: /windows10
---

[Windows 11]({{site.url}}/windows11){: .simple-button}
[Windows 10]({{site.url}}/windows10){: .simple-pressed-button}
[Tools]({{site.url}}/windows-tools){: .simple-button}

 Removes store apps | Turns off telemetry | Installs software | Finds missing drivers | Creates install media
:------------: | :------------: | :------------: | :------------: | :------------:
[CleanApps](https://github.com/Rockz1152/CleanApps/releases){:target="_blank"} | [O&O Shutup 10](https://www.oo-software.com/en/shutup10){:target="_blank"} | [Ninite](https://ninite.com/){:target="_blank"} | [Snappy Driver Installer Origin](https://www.glenn.delahoy.com/snappy-driver-installer-origin/){:target="_blank"} | [Windows 10 Media Creation Tool](https://www.microsoft.com/en-us/software-download/windows10){:target="_blank"}

Quicklinks: <a href="#optional-tweaks" Class="simple-button-small">Optional Tweaks</a><a href="#maintenance" Class="simple-button-small">Maintenance</a>

## Prepare Installation Media
- Download the [Media Creation Tool](https://www.microsoft.com/en-us/software-download/windows10){:target="_blank"}
- Select "USB Device" and wait for the installation media to be ready
- Boot to the USB device to start the install

## Standard Setup
_*Open a "Windows Powershell (Admin)" prompt to run commands. Right click the start button, select "Windows Powershell (Admin)"_

- Remove unwanted Windows Store apps with [CleanApps](https://github.com/Rockz1152/CleanApps/releases){:target="_blank"} script
- Update Apps in [Microsoft Store](ms-windows-store://downloadsandupdates)
- Remove OneDrive **-- Optional**
- Install [Windows Updates](ms-settings:windowsupdate)
- Install drivers and reboot
- Install software with [Ninite](https://ninite.com/){:target="_blank"}
- Set a default Web browser in [Default apps](ms-settings:defaultapps)
- Turn off telemetry with [O&O Shutup 10](https://www.oo-software.com/en/shutup10){:target="_blank"}
- Disable Windows Spotlight
```
reg add "HKCU\SOFTWARE\Policies\Microsoft\Windows\CloudContent" /v DisableWindowsSpotlightFeatures /t REG_DWORD /d 1 /f
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\Explorer\HideDesktopIcons\NewStartPanel" /v "{2cc5ca98-6485-489a-920e-b3e88a6ccce3}" /t REG_DWORD /d 1 /f
Add-Type -TypeDefinition 'using System.Runtime.InteropServices; public class W { [DllImport("user32.dll", CharSet=CharSet.Auto)] public static extern int SystemParametersInfo(int uAction, int uParam, string lpvParam, int fuWinIni); public static void SetWallpaper(string path) { SystemParametersInfo(20, 0, path, 3); } }'; [W]::SetWallpaper("C:\Windows\Web\Wallpaper\Windows\img0.jpg"); Stop-Process -ProcessName explorer;
```
- Disable System Protection
```
Disable-ComputerRestore "C:"; vssadmin delete shadows /all /quiet | Out-Null
```
- Disable Remote Assistance
```
reg add "HKLM\SYSTEM\CurrentControlSet\Control\Remote Assistance" /v "fAllowToGetHelp" /t REG_DWORD /d 0 /f
```
- Set power profile to High Perf. **-- Optional, Desktop only**
```
powercfg -SETACTIVE 8c5e7fda-e8bf-4a96-9a85-a6e23a8c635c
```
- Set hard disk sleep to never **-- Desktop only**
```
powercfg -change -disk-timeout-ac 0; powercfg -change -disk-timeout-dc 0
```
- Disable Offline Files **-- Pro only**
```
Set-Service -Name "CscService" -StartupType Disabled; Stop-Service -Name "CscService"
```
- Disable Windows Media Player Network Sharing Service
```
Set-Service -Name "WMPNetworkSvc" -StartupType Disabled; Stop-Service -Name "WMPNetworkSvc"
```
- Disable Superfetch/SysMain service if **Gaming PC**
```
Set-Service -Name "SysMain" -StartupType Disabled; Stop-Service -Name "SysMain"
```
- Disable Windows Search service **if not using Outlook**
```
Set-Service -Name "WSearch" -StartupType Disabled; Stop-Service -Name "WSearch"
```
- Disable the Diagnostics Tracking Service
```
Set-Service -Name "DiagTrack" -StartupType Disabled; Stop-Service -Name "DiagTrack"
```
- Disable Windows Error Reporting across the system
```
Disable-WindowsErrorReporting
```
- If running SSD and second HD, move pagefile to second HD **-- Optional**
- If running SSD disable Fast Startup
```
reg add "HKLM\SYSTEM\CurrentControlSet\Control\Session Manager\Power" /v "HiberbootEnabled" /t REG_DWORD /d 0 /f
```
- Disable hibernation file **-- Recommended**
```
powercfg -h off
```
- Disable Windows 11 upgrade notice
```
schtasks /change /tn "\Microsoft\Windows\WindowsUpdate\RUXIM\PLUGScheduler" /disable 2>$null
```
<!-- Set Windows 10 release to 22H2
reg add "HKLM\SOFTWARE\Policies\Microsoft\Windows\WindowsUpdate" /v "TargetReleaseVersion" /t REG_DWORD /d 1 /f
reg add "HKLM\SOFTWARE\Policies\Microsoft\Windows\WindowsUpdate" /v "TargetReleaseVersionInfo" /t REG_SZ /d "22H2" /f
reg add "HKLM\SOFTWARE\Policies\Microsoft\Windows\WindowsUpdate" /v "ProductVersion" /t REG_SZ /d "Windows 10" /f -->
- Disable Copilot
```
reg add "HKLM\SOFTWARE\Policies\Microsoft\Edge" /v "HubsSidebarEnabled" /t REG_DWORD /d 0 /f
reg add "HKLM\SOFTWARE\Policies\Microsoft\Edge" /v "WebAppSettings" /t REG_SZ /f; Set-ItemProperty -Path "HKLM:\SOFTWARE\Policies\Microsoft\Edge" -Name "WebAppSettings" -Value '[{"manifest_id": "https://copilot.microsoft.com/?cmc", "run_on_os_login": "blocked", "force_unregister_os_integration": true}]' -Type String
reg add "HKCU\Software\Policies\Microsoft\Windows\WindowsCopilot" /v "TurnOffWindowsCopilot" /t REG_DWORD /d 1 /f
reg add "HKLM\Software\Policies\Microsoft\Windows\WindowsCopilot" /v "TurnOffWindowsCopilot" /t REG_DWORD /d 1 /f
```
- Disable Preview Updates **-- Pro only**
```
reg add "HKLM\Software\Policies\Microsoft\Windows\WindowsUpdate" /v "DeferQualityUpdates" /t REG_DWORD /d 1 /f
reg add "HKLM\Software\Policies\Microsoft\Windows\WindowsUpdate" /v "DeferQualityUpdatesPeriodInDays" /t REG_DWORD /d 0 /f
reg add "HKLM\Software\Policies\Microsoft\Windows\WindowsUpdate" /v "PauseQualityUpdatesStartTime" /t REG_SZ /f
```
- Turn off recently added apps in Start Menu, and Start Menu suggestions
```
reg add "HKLM\SOFTWARE\Policies\Microsoft\Windows\Explorer" /v "HideRecentlyAddedApps" /t REG_DWORD /d 1 /f
reg add "HKCU\SOFTWARE\Microsoft\Windows\CurrentVersion\ContentDeliveryManager" /v "SystemPaneSuggestionsEnabled" /t REG_DWORD /d 0 /f
reg add "HKCU\SOFTWARE\Microsoft\Windows\CurrentVersion\ContentDeliveryManager" /v "SubscribedContent-338388Enabled" /t REG_DWORD /d 0 /f
```
- Disable "Meet Now" and "News and Interests"
```
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\Policies\Explorer" /v "HideSCAMeetNow" /t REG_DWORD /d 1 /f
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\Feeds" /v "ShellFeedsTaskbarViewMode" /t REG_DWORD /d 2 /f
Stop-Process -ProcessName explorer
```
- Disable Game Bar
```
reg add "HKCU\Software\Microsoft\GameBar" /v "UseNexusForGameBarEnabled" /t REG_DWORD /d 0 /f
reg add "HKCU\System\GameConfigStore" /v "GameDVR_FSEBehavior" /t REG_DWORD /d 2 /f
reg add "HKCU\System\GameConfigStore" /v "GameDVR_Enabled" /t REG_DWORD /d 0 /f
reg add "HKCU\SOFTWARE\Microsoft\Windows\CurrentVersion\GameDVR" /v "AppCaptureEnabled" /t REG_DWORD /d 0 /f
```
- Disable prompting to sign-in with a Microsoft account
```
reg add "HKCU\SOFTWARE\Microsoft\Windows\CurrentVersion\UserProfileEngagement" /v "ScoobeSystemSettingEnabled" /t REG_DWORD /d 0 /f
reg add "HKCU\SOFTWARE\Microsoft\Windows\CurrentVersion\ContentDeliveryManager" /v "SubscribedContent-310093Enabled" /t REG_DWORD /d 0 /f
reg add "HKCU\SOFTWARE\Microsoft\Windows\CurrentVersion\ContentDeliveryManager" /v "SubscribedContent-338389Enabled" /t REG_DWORD /d 0 /f
```
- Disable backup reminders from "Windows Backup"
```
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\Notifications\Settings\MicrosoftWindows.Client.CBS_cw5n1h2txyewy!WindowsBackup" /v "Enabled" /t REG_DWORD /d 0 /f
```
- Add Computer and User icons to desktop
```
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\Explorer\HideDesktopIcons\NewStartPanel" /v "{20D04FE0-3AEA-1069-A2D8-08002B30309D}" /t REG_DWORD /d 0 /f
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\Explorer\HideDesktopIcons\NewStartPanel" /v "{59031a47-3f72-44a7-89c5-5595fe6b30ee}" /t REG_DWORD /d 0 /f
Stop-Process -ProcessName explorer
```
- Set File Explorer to "**This PC**", uncheck "**Show recently used files**" and "**Show frequently used folders**"
```
reg add "HKCU\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\Advanced" /v "LaunchTo" /t REG_DWORD /d 1 /f
reg add "HKCU\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer" /v "ShowFrequent" /t REG_DWORD /d 0 /f
reg add "HKCU\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer" /v "ShowRecent" /t REG_DWORD /d 0 /f
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
- Disable unneeded tasks
```
Get-Scheduledtask 'Microsoft Compatibility Appraiser','Consolidator','UsbCeip','Microsoft-Windows-DiskDiagnosticDataCollector','QueueReporting','XblGameSaveTask' -erroraction silentlycontinue | Disable-scheduledtask
```
- Cleanup Windows components
```
Dism /Online /Cleanup-Image /StartComponentCleanup
```
- Run Disk Cleanup with "**Clean up system files**"
- Optimize drives
- Hide Action Center icon in [Taskbar Settings](ms-settings:taskbar) **-- Optional**
- Disable [Focus Assist](ms-settings:quiethours) notifications
  - Toggle off all "Automatic rules"
  - Uncheck "Show me a summary..." at the bottom
- Open [Windows Security Center](windowsdefender:) **>** Settings **>** Manage Notifications
  - Turn off `Get informational notifications`
  - Turn off `Get account protection notifications`
- Reboot system

----

## Optional Tweaks

### Disable lock screen when resuming from sleep
Add or Remove "Require a password on wakeup" in Power Options using Command Prompt

- Open an elevated command prompt.
- Run the following command:
```
powercfg -attributes SUB_NONE 0E796BDB-100D-47D6-A2D5-F7D2DAA51F51 -ATTRIB_HIDE
```
  - If you want to remove the menu item from Power Options, change `-ATTRIB_HIDE` to `+ATTRIB_HIDE` and run the command again
- Then navigate to advanced power options to make the change
  - `Start Button` **>** `Windows System` **>** `Control Panel`
  - `System and Security` **>**`Power Options`
  - `Change plan settings` (on the active plan) **>** `Change advanced power settings`
  - Click `Change settings that are currently unavailable`
  - Change the setting for `Require a password on wakeup`

### Disable Sticky Keys shortcuts
Disable the shortcut keys that can interrupt gaming

- Go to [Keyboard settings](ms-settings:easeofaccess-keyboard) in the Ease of Access page of Settings
- Uncheck "Allow the shortcut key to start..." for:
  - Sticky Keys
  - Toggle Keys
  - Filter Keys

### Remove OneDrive folder from File Explorer
Removes the "OneDrive" folder icon on the left side of Windows Explorer that can sometimes linger after OneDrive is uninstalled
```
reg add "HKEY_CLASSES_ROOT\CLSID\{018D5C66-4533-4307-9B53-224DE2ED1FE6}" /v System.IsPinnedToNameSpaceTree /t REG_DWORD /d 0 /f
```

### Disable automatic Windows Updates
- Windows 10 Pro/Enterprise
  - Add the following registry entry:
```
reg add "HKLM\SOFTWARE\Policies\Microsoft\Windows\WindowsUpdate\AU" /v "NoAutoUpdate" /t REG_DWORD /d 1 /f
```
  - To re-enable, delete the registry entry:
```
reg delete "HKLM\SOFTWARE\Policies\Microsoft\Windows\WindowsUpdate\AU" /v "NoAutoUpdate" /f
```
- Windows 10 Home - Over WiFi only
  - WiFi only because Windows ignores metered status on wired connections
  - `Settings` **>** `Network & Internet` **>** `Wi-Fi`
  - Select Wi-Fi network and then click `Properties`
  - Turn on `Set as metered connection`

----

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
