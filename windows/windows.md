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
- Update Windows Store and Apps
- Remove unwanted Windows Store apps with CleanAppsHome script
- Install Windows Updates
- Install drivers and reboot
- Disable System Protection
- Disable Remote Assistance
- Set power profile to High Perf. **--** Optional, Desktop only
- Set hard disk sleep to never **--** Desktop only
- Disable offline files **--** Pro only
- Disable Windows Media Player Network Sharing Service
- Disable Superfetch/SysMain service if gaming PC
- Disable Windows Search service if not using Outlook
- Disable Windows Error Reporting with PowerShell **--** `Disable-WindowsErrorReporting`
- If running SSD and second HD, move pagefile to second HD
- If running SSD disable Fast Startup
- Disable hibernation file **--** `powercfg -h off`
- Turn off Start Menu suggestions and recently added apps
- Disable Game Bar
- Hide Action Center icon **--** Optional
- Add Computer and User icons to desktop
- In Folder Options, 
  - Change "Open File Explorer" to "This PC"
  - Uncheck "Show recently used files" under Privacy
  - Uncheck "Show frequently used folders" under Privacy
- Set the correct Time Zone
- Run Disk Cleanup
- Cleanup Windows Update **--** `dism /online /cleanup-image /StartComponentCleanup`
- Optimize drives

## Maintenance
- Run Windows Update
- Update Windows Store Apps
- Update software with [Ninite](https://ninite.com/){:target="_blank"}
- Check Windows system files *[More information](https://support.microsoft.com/en-us/help/4026529/windows-10-using-system-file-checker){:target="_blank"}*. Run in an elevated command prompt:
```
dism /online /cleanup-image /StartComponentCleanup
dism /online /cleanup-image /RestoreHealth
sfc /scannow
```
- Run disk cleanup on system files
- Optimize Drives

## Optional Tweaks

### Remove "Share" on right click context menu
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
- If you want to remove the menu item from Power Options, change `-ATTRIB_HIDE` to `+ATTRIB_HIDE` and run the command again (This is the default setting)

### Remove OneDrive Folder in Explorer
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
