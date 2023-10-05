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

Quicklinks: <a href="#optional" Class="simple-button-small">Optional Tweaks</a><a href="#maint" Class="simple-button-small">Maintenance</a>

## Installation

### Optional No-Bloatware Install

- Make sure you are disconnected from the internet
- Boot install media
- Select `English (World)` for region
- Proceed through the installation
- Complete the [Out-of-Box Setup](#oobe) steps in the section below
- Set your region to re-enable the Windows Store
  - _*You must connect the network before setting the region or the bloatware apps will install_
  - Settings >> Time & Language >> Language & Region >> Region >> Select `United States`

<a name="oobe"></a>
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

----

## Appearance
_*Open a "Windows Terminal (Admin)" prompt to run commands. Right click the start button, select "Windows Terminal (Admin)"_

### Recommended
- Start Layout
```
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\Explorer\Advanced" /v "Start_Layout" /t REG_DWORD /d 1 /f
```
- Disable recently added apps and recommendations
```
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\Start" /v "ShowRecentList" /t REG_DWORD /d 0 /f
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\Explorer\Advanced" /v "Start_IrisRecommendations" /t REG_DWORD /d 0 /f
```
- Add Settings and File Explorer to start
```
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\Start" /v "VisiblePlaces" /t REG_BINARY /d bc248a140cd68942a0806ed9bba2488286087352aa5143429f7b2776584659d4 /f
```

<!-- Settings only
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\Start" /v "VisiblePlaces" /t REG_BINARY /d 86087352aa5143429f7b2776584659d4 /f
-->

- Disable Search, Taskview, Widgets, and Chat in Taskbar
```
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\Search" /v "SearchboxTaskbarMode" /t REG_DWORD /d 0 /f
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\Explorer\Advanced" /v "ShowTaskViewButton" /t REG_DWORD /d 0 /f
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\Explorer\Advanced" /v "TaskbarDa" /t REG_DWORD /d 0 /f
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\Explorer\Advanced" /v "TaskbarMn" /t REG_DWORD /d 0 /f
```
- Enable dark mode
```
reg add "HKCU\SOFTWARE\Microsoft\Windows\CurrentVersion\Themes\Personalize" /v "AppsUseLightTheme" /t REG_DWORD /d 0 /f
reg add "HKCU\SOFTWARE\Microsoft\Windows\CurrentVersion\Themes\Personalize" /v "SystemUsesLightTheme" /t REG_DWORD /d 0 /f
Stop-Process -ProcessName explorer
```
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
- Disable System Protection
```
Disable-ComputerRestore "C:"; vssadmin delete shadows /all /quiet | Out-Null
```
- Remove OneDrive **-- Optional**
```
Stop-Process -ProcessName OneDrive
Start-Process "$Env:SystemRoot\System32\OneDriveSetup.exe" -ArgumentList "/uninstall" -Wait
```
- Remove Teams **-- Optional**
```
Get-AppxPackage MicrosoftTeams* | Remove-AppxPackage -AllUsers
```
- Disable Remote Assistance
```
reg add "HKLM\SYSTEM\CurrentControlSet\Control\Remote Assistance" /v "fAllowToGetHelp" /t REG_DWORD /d 0 /f
```
- Enable Ultimate Performance power profile **-- Desktops Only**
```
$powerProfile = Get-CimInstance -Namespace "root\cimv2\power" -ClassName Win32_PowerPlan | Where-Object { $_.ElementName -eq "Ultimate Performance" }
if ($powerProfile -eq $null) {$result = powercfg -duplicatescheme e9a42b02-d5df-448d-aa00-03f14749eb61; if ($result -match "GUID: ([0-9a-fA-F-]+)") { powercfg -setactive $matches[1] }} else {
if ($powerProfile.InstanceID -match "([0-9a-fA-F]{8}-([0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12})") { powercfg -setactive $matches[1] }}
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
<!-- - Disable Superfetch/SysMain service if **Gaming PC**
```
Set-Service -Name "SysMain" -StartupType Disabled; Stop-Service -Name "SysMain"
``` -->
- Disable Windows Search service **-- If Not Using Outlook**
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
- Disable automatic sign-in after updates and restarts
```
reg add "HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Policies\System" /v "DisableAutomaticRestartSignOn" /t REG_DWORD /d 1 /f
```
- Disable hibernation file **-- Recommended**
```
powercfg -h off
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
reg add "HKCU\SOFTWARE\Microsoft\Windows\CurrentVersion\ContentDeliveryManager" /v "SubscribedContent-310093Enabled" /t REG_DWORD /d 0 /f
reg add "HKCU\SOFTWARE\Microsoft\Windows\CurrentVersion\ContentDeliveryManager" /v "SubscribedContent-338389Enabled" /t REG_DWORD /d 0 /f
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

----

<a name="optional"></a>
## Optional Tweaks

### Disable Sticky Keys shortcuts
Disable shortcut keys that can interrupt gaming

- Go to [Keyboard](ms-settings:easeofaccess-keyboard) under Accessibility in Settings
- Click "Sticky Keys" and turn off all options
- Click "Filter Keys" and turn off all options
- Keep "Toggle Keys" off

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
