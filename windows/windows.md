---
layout: default
title: Windows 10
permalink: /windows
---

[Configuration]({{site.url}}/windows){: .simple-pressed-button}
[Tools]({{site.url}}/windows-tools){: .simple-button}

 Removes store apps | Turns off telemetry | Installs software | Finds missing drivers | Creates install media
:------------: | :------------: | :------------: | :------------: | :------------:
[CleanAppsHome](https://github.com/Rockz1152/blackndsky/blob/master/_files/CleanAppsHome.zip){:target="_blank"} | [O&O Shutup 10](https://www.oo-software.com/en/shutup10){:target="_blank"} | [Ninite](https://ninite.com/){:target="_blank"} | [Snappy Driver Installer Origin](https://www.snappy-driver-installer.org/download/){:target="_blank"} | [Windows Media Creation Tool](https://www.microsoft.com/en-us/software-download/windows10){:target="_blank"}

## Standard Checklist
*Open a "Windows Powershell (Admin)" prompt to run commands*  
*Right click the start button, select "Windows Powershell (Admin)"*

- Update Windows Store and Apps
- Remove unwanted Windows Store apps with **CleanAppsHome** script
- Remove OneDrive **-- Optional**
- Install Windows Updates
- Install drivers and reboot
- Disable System Protection
```
Disable-ComputerRestore "C:"; vssadmin delete shadows /all /quiet
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
- If running SSD and second HD, move pagefile to second HD
- If running SSD disable Fast Startup
```
reg add "HKLM\SYSTEM\CurrentControlSet\Control\Session Manager\Power" /v "HiberbootEnabled" /t REG_DWORD /d 0 /f
```
- Disable hibernation file **-- Recommended**
```
powercfg -h off
```
- Turn off recently added apps in Start Menu, and Start Menu suggestions
```
reg add "HKEY_LOCAL_MACHINE\SOFTWARE\Policies\Microsoft\Windows\Explorer" /v "HideRecentlyAddedApps" /t REG_DWORD /d 1 /f
reg add "HKEY_CURRENT_USER\SOFTWARE\Microsoft\Windows\CurrentVersion\ContentDeliveryManager" /v "SystemPaneSuggestionsEnabled" /t REG_DWORD /d 0 /f
reg add "HKEY_CURRENT_USER\SOFTWARE\Microsoft\Windows\CurrentVersion\ContentDeliveryManager" /v "SubscribedContent-338388Enabled" /t REG_DWORD /d 0 /f
```
- Disable Game Bar
```
reg add "HKEY_CURRENT_USER\Software\Microsoft\GameBar" /v "UseNexusForGameBarEnabled" /t REG_DWORD /d 0 /f
reg add "HKEY_CURRENT_USER\System\GameConfigStore" /v "GameDVR_FSEBehavior" /t REG_DWORD /d 2 /f
reg add "HKEY_CURRENT_USER\System\GameConfigStore" /v "GameDVR_Enabled" /t REG_DWORD /d 0 /f
reg add "HKEY_CURRENT_USER\SOFTWARE\Microsoft\Windows\CurrentVersion\GameDVR" /v "AppCaptureEnabled" /t REG_DWORD /d 0 /f
```
- Hide Action Center icon **-- Optional**
- Add Computer and User icons to desktop
```
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\Explorer\HideDesktopIcons\NewStartPanel" /v "{20D04FE0-3AEA-1069-A2D8-08002B30309D}" /t REG_DWORD /d 0 /f
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\Explorer\HideDesktopIcons\NewStartPanel" /v "{59031a47-3f72-44a7-89c5-5595fe6b30ee}" /t REG_DWORD /d 0 /f
Stop-Process -ProcessName explorer
```
- Set File Explorer to "**This PC**", uncheck "**Show recently used files**" and "**Show frequently used folders**"
```
reg add "HKEY_CURRENT_USER\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\Advanced" /v "LaunchTo" /t REG_DWORD /d 1 /f
reg add "HKEY_CURRENT_USER\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer" /v "ShowFrequent" /t REG_DWORD /d 0 /f
reg add "HKEY_CURRENT_USER\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer" /v "ShowRecent" /t REG_DWORD /d 0 /f
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
- Disable unneeded tasks
```
Get-Scheduledtask 'Microsoft Compatibility Appraiser','Consolidator','UsbCeip','Microsoft-Windows-DiskDiagnosticDataCollector','QueueReporting','XblGameSaveTask' -erroraction silentlycontinue | Disable-scheduledtask
```
- Run Disk Cleanup with "**Clean up system files**"  
If "**Windows Update Cleanup**" was not available in Disk Cleanup, run it manually with:
```
Dism /Online /Cleanup-Image /StartComponentCleanup
```
- Optimize drives
- Reboot system

## Maintenance
- Run Windows Update
- Update Windows Store Apps
- Update software with [Ninite](https://ninite.com/){:target="_blank"}
- Check Windows system files, *[More information](https://support.microsoft.com/en-us/help/4026529/windows-10-using-system-file-checker){:target="_blank"}*
```
sfc /scannow
```
```
Dism /Online /Cleanup-Image /StartComponentCleanup
```
```
Dism /Online /Cleanup-Image /RestoreHealth
```
```
Dism /Online /Cleanup-Image /ScanHealth
```
Or optionally, run as one command:
```nowrap
sfc /scannow; Dism /Online /Cleanup-Image /StartComponentCleanup; Dism /Online /Cleanup-Image /RestoreHealth; Dism /Online /Cleanup-Image /ScanHealth
```
- Run disk cleanup on system files
- Optimize Drives
- Reboot system

## Optional Tweaks

### Remove "**Share**" on right click context menu
- Open an elevated command prompt
- Run the following command:
```
reg delete HKEY_CLASSES_ROOT\*\shellex\ContextMenuHandlers\ModernSharing /f
```

### Disable password when resuming from sleep
Add or Remove "Require a password on wakeup" in Power Options using Command Prompt

- Open an elevated command prompt.
- Run the following command:
```
powercfg -attributes SUB_NONE 0E796BDB-100D-47D6-A2D5-F7D2DAA51F51 -ATTRIB_HIDE
```
  - If you want to remove the menu item from Power Options, change `-ATTRIB_HIDE` to `+ATTRIB_HIDE` and run the command again
- Then navigate to advanced power options to make the change
  - `Control Panel` **>** `System and Security` **>**`Power Options`
  - `Change plan settings` (on the active plan) **>** `Change advanced power settings`

### Remove OneDrive folder from File Explorer
Removes the "OneDrive" folder icon on the left side of Windows Explorer that can sometimes linger after OneDrive is uninstalled
```
reg add "HKEY_CLASSES_ROOT\CLSID\{018D5C66-4533-4307-9B53-224DE2ED1FE6}" /v System.IsPinnedToNameSpaceTree /t REG_DWORD /d 0 /f
```

### Disable Windows Update
You can't actually disable Windows Update, but you can trick it into not downloading it's updates. Goto:
- `Settings`
- `Network & Internet`
- `Wi-Fi` or `Ethernet`
  - If Wi-Fi `Manage known networks`
  - Select Wi-Fi network and then click `Properties`
- Turn on `Set as metered connection`
