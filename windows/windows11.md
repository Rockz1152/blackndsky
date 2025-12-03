---
layout: default
title: Windows 11
permalink: /windows11
---

[Windows 11]({{site.url}}/windows11){: .simple-pressed-button}
[Windows 10]({{site.url}}/windows10){: .simple-button}
[Tools]({{site.url}}/windows-tools){: .simple-button}
<span style="float: right; font-weight: bold; color: #555;">Version: 25H2</span>

 Removes store apps | Turns off telemetry | Installs software | Finds missing drivers | Creates install media
:------------: | :------------: | :------------: | :------------: | :------------:
[CleanApps](https://github.com/Rockz1152/CleanApps/releases){:target="_blank"} | [O&O Shutup 10](https://www.oo-software.com/en/shutup10){:target="_blank"} | [Ninite](https://ninite.com/){:target="_blank"} | [Snappy Driver Installer Origin](https://www.glenn.delahoy.com/snappy-driver-installer-origin/){:target="_blank"} | [Windows 11 Media Creation Tool](https://www.microsoft.com/en-us/software-download/windows11){:target="_blank"}

Quicklinks:
<a href="#initial-updates" class="simple-button-small">Initial Updates</a>
<a href="#appearance" class="simple-button-small">Appearance</a>
<a href="#privacy" class="simple-button-small">Privacy</a>
<a href="#system" class="simple-button-small">System</a>
<a href="#optional" class="simple-button-small">Optional</a>
<a href="#finishing-up" class="simple-button-small">Finishing Up</a>
<a href="#tweaks" class="simple-button-small">Tweaks</a>
<a href="#maintenance" class="simple-button-small">Maintenance</a>

## Installation

### Prepare Installation Media
- Download the [Media Creation Tool](https://www.microsoft.com/en-us/software-download/windows11){:target="_blank"}
- Select "USB Device" and wait for the installation media to be ready
- Boot to the USB device to start the install

Use the link below if you need to bypass Microsoft's hardware requirements

- [Bypass Windows 11 Hardware Requirements]({{site.url}}/win11-bypass)

### Out-of-Box Setup
Follow these steps to create a local user

- Press `[Shift]` + `[F10]` to open a command prompt
- Enter `start ms-cxh:localonly`
- Proceed to create a local user
- On the "Privacy" screen, turn off all settings

----

> ### **How to run commands**
> Open a "Terminal (Admin)" prompt to run commands. Right click on the start button and select "Terminal (Admin)"

## Initial Updates
- Remove unwanted Windows Store apps
```
$RemoveApps = "Microsoft.MixedReality.Portal|Microsoft.Wallet|Microsoft.WindowsCamera|Microsoft.BingNews|Microsoft.GetHelp|Microsoft.Getstarted|Microsoft.YourPhone|Microsoft.Messaging|Microsoft.Microsoft3DViewer|Microsoft.MicrosoftOfficeHub|Microsoft.MicrosoftSolitaireCollection|Microsoft.NetworkSpeedTest|Microsoft.News|Microsoft.Office.Lens|Microsoft.Office.OneNote|Microsoft.Office.Sway|Microsoft.OneConnect|Microsoft.People|Microsoft.Print3D|Microsoft.RemoteDesktop|Microsoft.SkypeApp|Microsoft.Office.Todo.List|Microsoft.Whiteboard|Microsoft.WindowsAlarms|microsoft.windowscommunicationsapps|Microsoft.WindowsFeedbackHub|Microsoft.WindowsMaps|Microsoft.BingWeather|Microsoft.549981C3F5F10|Microsoft.Advertising.Xaml|Microsoft.Copilot|Microsoft.Windows.DevHome|CandyCrush|EclipseManager|ActiproSoftwareLLC|AdobeSystemsIncorporated.AdobePhotoshopExpress|Duolingo-LearnLanguagesforFree|PandoraMediaInc|BubbleWitch3Saga|Wunderlist|Flipboard|Twitter|Facebook|Spotify|Minecraft|Royal Revolt|Sway|Speed Test|Dolby|Disney|Clipchamp.Clipchamp|Microsoft.PowerAutomateDesktop|Microsoft.Todos|MicrosoftCorporationII.MicrosoftFamily|Microsoft.BingSearch"
Get-AppxPackage | where-object {$_.Name -match $RemoveApps} | Remove-AppxPackage
```
  - You can also use the [CleanApps](https://github.com/Rockz1152/CleanApps/releases){:target="_blank"} script to remove or reinstall the apps
  - See [Github](https://github.com/Rockz1152/CleanApps){:target="_blank"} for a full list of apps removed
- Update Apps in the [Microsoft Store](ms-windows-store://downloadsandupdates)
- Install [Windows Updates](ms-settings:windowsupdate) and reboot
- Install drivers and reboot

## Appearance

### Recommended
- Switch off Spotlight (changing wallpaper) - Open [Personalization](ms-settings:personalization) and select a theme or choose one from below
  - Dark mode
```
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\Themes" /v "CurrentTheme" /t REG_SZ /d "C:\WINDOWS\resources\Themes\dark.theme" /f
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\Themes\Personalize" /v "AppsUseLightTheme" /t REG_DWORD /d 0 /f
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\Themes\Personalize" /v "SystemUsesLightTheme" /t REG_DWORD /d 0 /f
Add-Type -TypeDefinition 'using System.Runtime.InteropServices; public class W { [DllImport("user32.dll", CharSet=CharSet.Auto)] public static extern int SystemParametersInfo(int uAction, int uParam, string lpvParam, int fuWinIni); public static void SetWallpaper(string path) { SystemParametersInfo(20, 0, path, 3); } }';
[W]::SetWallpaper("C:\Windows\Web\Wallpaper\Windows\img19.jpg"); Stop-Process -ProcessName explorer
```
  - Light mode
```
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\Themes" /v "CurrentTheme" /t REG_SZ /d "C:\WINDOWS\resources\Themes\aero.theme" /f
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\Themes\Personalize" /v "AppsUseLightTheme" /t REG_DWORD /d 1 /f
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\Themes\Personalize" /v "SystemUsesLightTheme" /t REG_DWORD /d 1 /f
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
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\Explorer\Advanced" /v "Start_AccountNotifications" /t REG_DWORD /d 0 /f
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\Explorer\Advanced" /v "Start_IrisRecommendations" /t REG_DWORD /d 0 /f
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\Explorer\Advanced" /v "Start_TrackDocs" /t REG_DWORD /d 0 /f
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\Explorer\Advanced" /v "Start_TrackProgs" /t REG_DWORD /d 0 /f
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\Explorer\Advanced" /v "Start_RecoPersonalizedSites" /t REG_DWORD /d 0 /f
```
- Add Settings and File Explorer to start
```
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\Start" /v "VisiblePlaces" /t REG_BINARY /d bc248a140cd68942a0806ed9bba2488286087352aa5143429f7b2776584659d4 /f
```
- Disable Search, Taskview, Widgets, and Chat in Taskbar
```
reg add "HKLM\Software\Policies\Microsoft\Dsh" /v "AllowNewsAndInterests" /t REG_DWORD /d 0 /f
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\Search" /v "SearchboxTaskbarMode" /t REG_DWORD /d 0 /f
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\Explorer\Advanced" /v "ShowTaskViewButton" /t REG_DWORD /d 0 /f
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\Explorer\Advanced" /v "TaskbarMn" /t REG_DWORD /d 0 /f
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\Policies\Explorer" /v "HideSCAMeetNow" /t REG_DWORD /d 1 /f
reg add "HKLM\Software\Microsoft\Windows\CurrentVersion\Policies\Explorer" /v "HideSCAMeetNow" /t REG_DWORD /d 1 /f
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\Explorer\Advanced\People" /v "PeopleBand" /t REG_DWORD /d 0 /f
```
- Enable compact view in File Explorer
```
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\Explorer\Advanced" /v "UseCompactMode" /t REG_DWORD /d 1 /f
```
- Set File Explorer to "**This PC**", uncheck "**Show recently used files**" and "**Show frequently used folders**"
```
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\Explorer\Advanced" /v "LaunchTo" /t REG_DWORD /d 1 /f
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\Explorer" /v "ShowFrequent" /t REG_DWORD /d 0 /f
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\Explorer" /v "ShowRecent" /t REG_DWORD /d 0 /f
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\Explorer" /v "ShowCloudFilesInQuickAccess" /t REG_DWORD /d 0 /f
```
- Add default folders back to "**This PC**"
```
# --Desktop--
New-ItemProperty -Path "HKLM:\Software\Microsoft\Windows\CurrentVersion\Explorer\MyComputer\NameSpace\{B4BFCC3A-DB2C-424C-B029-7FE99A87C641}" -Name "HideIfEnabled" -PropertyType String -Value "" -Force | Out-Null
New-ItemProperty -Path "HKLM:\Software\Microsoft\Windows\CurrentVersion\Explorer\MyComputer\NameSpace\{B4BFCC3A-DB2C-424C-B029-7FE99A87C641}" -Name "HiddenByDefault" -PropertyType DWord -Value 0 -Force | Out-Null
# --Documents--
New-ItemProperty -Path "HKLM:\Software\Microsoft\Windows\CurrentVersion\Explorer\MyComputer\NameSpace\{d3162b92-9365-467a-956b-92703aca08af}" -Name "HideIfEnabled" -PropertyType String -Value "" -Force | Out-Null
New-ItemProperty -Path "HKLM:\Software\Microsoft\Windows\CurrentVersion\Explorer\MyComputer\NameSpace\{d3162b92-9365-467a-956b-92703aca08af}" -Name "HiddenByDefault" -PropertyType DWord -Value 0 -Force | Out-Null
# --Downloads--
New-ItemProperty -Path "HKLM:\Software\Microsoft\Windows\CurrentVersion\Explorer\MyComputer\NameSpace\{088e3905-0323-4b02-9826-5d99428e115f}" -Name "HideIfEnabled" -PropertyType String -Value "" -Force | Out-Null
New-ItemProperty -Path "HKLM:\Software\Microsoft\Windows\CurrentVersion\Explorer\MyComputer\NameSpace\{088e3905-0323-4b02-9826-5d99428e115f}" -Name "HiddenByDefault" -PropertyType DWord -Value 0 -Force | Out-Null
# --Music--
New-ItemProperty -Path "HKLM:\Software\Microsoft\Windows\CurrentVersion\Explorer\MyComputer\NameSpace\{3dfdf296-dbec-4fb4-81d1-6a3438bcf4de}" -Name "HideIfEnabled" -PropertyType String -Value "" -Force | Out-Null
New-ItemProperty -Path "HKLM:\Software\Microsoft\Windows\CurrentVersion\Explorer\MyComputer\NameSpace\{1CF1260C-4DD0-4ebb-811F-33C572699FDE}" -Name "HiddenByDefault" -PropertyType DWord -Value 0 -Force | Out-Null
New-ItemProperty -Path "HKLM:\Software\Microsoft\Windows\CurrentVersion\Explorer\MyComputer\NameSpace\{3dfdf296-dbec-4fb4-81d1-6a3438bcf4de}" -Name "HiddenByDefault" -PropertyType DWord -Value 0 -Force | Out-Null
# --Pictures--
New-ItemProperty -Path "HKLM:\Software\Microsoft\Windows\CurrentVersion\Explorer\MyComputer\NameSpace\{24ad3ad4-a569-4530-98e1-ab02f9417aa8}" -Name "HideIfEnabled" -PropertyType String -Value "" -Force | Out-Null
New-ItemProperty -Path "HKLM:\Software\Microsoft\Windows\CurrentVersion\Explorer\MyComputer\NameSpace\{24ad3ad4-a569-4530-98e1-ab02f9417aa8}" -Name "HiddenByDefault" -PropertyType DWord -Value 0 -Force | Out-Null
# --Videos--
New-ItemProperty -Path "HKLM:\Software\Microsoft\Windows\CurrentVersion\Explorer\MyComputer\NameSpace\{f86fa3ab-70d2-4fc7-9c99-fcbf05467f3a}" -Name "HideIfEnabled" -PropertyType String -Value "" -Force | Out-Null
New-ItemProperty -Path "HKLM:\Software\Microsoft\Windows\CurrentVersion\Explorer\MyComputer\NameSpace\{f86fa3ab-70d2-4fc7-9c99-fcbf05467f3a}" -Name "HiddenByDefault" -PropertyType DWord -Value 0 -Force | Out-Null
```
- Remove "**Home**" and "**Gallery**" from File Explorer side bar
```
reg delete "HKLM\Software\Microsoft\Windows\CurrentVersion\Explorer\Desktop\NameSpace\{f874310e-b6b7-47dc-bc84-b9e6b38f5903}" /f
reg delete "HKLM\Software\Microsoft\Windows\CurrentVersion\Explorer\Desktop\NameSpace\{e88865ea-0e1c-4e20-9aa6-edcd0212c87c}" /f
```
- Remove "**Share**", "**Cast to Device**", "**Give access to**" from right click context menu
```
reg add "HKLM\Software\Microsoft\Windows\CurrentVersion\Shell Extensions\Blocked" /v "{e2bf9676-5f8f-435c-97eb-11607a5bedf7}" /t REG_SZ /f
reg add "HKLM\Software\Microsoft\Windows\CurrentVersion\Shell Extensions\Blocked" /v "{7AD84985-87B4-4a16-BE58-8B72A5B390F7}" /t REG_SZ /f
reg add "HKLM\Software\Microsoft\Windows\CurrentVersion\Shell Extensions\Blocked" /v "{f81e9010-6ea4-11ce-a7ff-00aa003ca9f6}" /t REG_SZ /f
Stop-Process -ProcessName explorer
```

### Additional Changes
Choice depends on personal preference, try out each setting if you are not sure

- Taskbar button location
  - Left
```
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\Explorer\Advanced" /v "TaskbarAl" /t REG_DWORD /d 0 /f
Stop-Process -ProcessName explorer
```
  - Center (Default)
```
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\Explorer\Advanced" /v "TaskbarAl" /t REG_DWORD /d 1 /f
Stop-Process -ProcessName explorer
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
New-Item -Path "HKLM:\Software\Classes\*\shell\CompressToFullMenu_ForOldContextMenu" -Force | Out-Null; New-ItemProperty -LiteralPath "HKLM:\Software\Classes\*\shell\CompressToFullMenu_ForOldContextMenu" -Name "CommandStateSync" -PropertyType String -Value "" -Force | Out-Null; reg add "HKEY_CLASSES_ROOT\*\shell\CompressToFullMenu_ForOldContextMenu" /v "ExplorerCommandHandler" /t REG_SZ /d "{7AE6900F-6EB0-44A2-9CA1-DB2F7EF352AF}" /f; reg add "HKEY_CLASSES_ROOT\*\shell\CompressToFullMenu_ForOldContextMenu" /v "MUIVerb" /t REG_SZ /d "@Windows.UI.FileExplorer.dll,-51797" /f; reg add "HKEY_CLASSES_ROOT\*\shell\CompressToFullMenu_ForOldContextMenu" /v "Note" /t REG_SZ /d "Copied from original Command Store command: Windows.CompressTo" /f;
New-Item -Path "HKLM:\Software\Classes\Folder\shell\CompressToFullMenu_ForOldContextMenu" -Force | Out-Null; New-ItemProperty -LiteralPath "HKLM:\Software\Classes\Folder\shell\CompressToFullMenu_ForOldContextMenu" -Name "CommandStateSync" -PropertyType String -Value "" -Force | Out-Null; reg add "HKEY_CLASSES_ROOT\Folder\shell\CompressToFullMenu_ForOldContextMenu" /v "ExplorerCommandHandler" /t REG_SZ /d "{7AE6900F-6EB0-44A2-9CA1-DB2F7EF352AF}" /f; reg add "HKEY_CLASSES_ROOT\Folder\shell\CompressToFullMenu_ForOldContextMenu" /v "MUIVerb" /t REG_SZ /d "@Windows.UI.FileExplorer.dll,-51797" /f; reg add "HKEY_CLASSES_ROOT\Folder\shell\CompressToFullMenu_ForOldContextMenu" /v "Note" /t REG_SZ /d "Copied from original Command Store command: Windows.CompressTo" /f;
```
  - Remove menu
```
reg delete "HKEY_CLASSES_ROOT\*\shell\CompressToFullMenu_ForOldContextMenu" /f
reg delete "HKEY_CLASSES_ROOT\Folder\shell\CompressToFullMenu_ForOldContextMenu" /f
```
- Snap layouts bar at the top of the screen
  - Disable
```
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\Explorer\Advanced" /v "EnableSnapBar" /t REG_DWORD /d 0 /f; Stop-Process -ProcessName explorer
```
  - Enable
```
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\Explorer\Advanced" /v "EnableSnapBar" /t REG_DWORD /d 1 /f; Stop-Process -ProcessName explorer
```
- Snap layouts flyout from the maximize button
  - Disable
```
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\Explorer\Advanced" /v "EnableSnapAssistFlyout" /t REG_DWORD /d 0 /f; Stop-Process -ProcessName explorer
```
  - Enable
```
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\Explorer\Advanced" /v "EnableSnapAssistFlyout" /t REG_DWORD /d 1 /f; Stop-Process -ProcessName explorer
```

### Microsoft Edge
- Changes to make Microsoft Edge usable
```
reg add "HKLM\Software\Policies\Microsoft\Edge" /v "Microsoft365CopilotChatIconEnabled" /t REG_DWORD /d 0 /f
reg add "HKLM\Software\Policies\Microsoft\Edge" /v "ComposeInlineEnabled" /t REG_DWORD /d 0 /f
reg add "HKLM\Software\Policies\Microsoft\Edge" /v "NewTabPageHideDefaultTopSites" /t REG_DWORD /d 1 /f
reg add "HKLM\Software\Policies\Microsoft\Edge" /v "DiagnosticData" /t REG_DWORD /d 0 /f
reg add "HKLM\Software\Policies\Microsoft\Edge" /v "EdgeAssetDeliveryServiceEnabled" /t REG_DWORD /d 0 /f
reg add "HKLM\Software\Policies\Microsoft\Edge" /v "WalletDonationEnabled" /t REG_DWORD /d 0 /f
reg add "HKLM\Software\Policies\Microsoft\Edge" /v "MicrosoftEditorProofingEnabled" /t REG_DWORD /d 0 /f
reg add "HKLM\Software\Policies\Microsoft\Edge" /v "AutofillAddressEnabled" /t REG_DWORD /d 0 /f
reg add "HKLM\Software\Policies\Microsoft\Edge" /v "AutofillCreditCardEnabled" /t REG_DWORD /d 0 /f
reg add "HKLM\Software\Policies\Microsoft\Edge" /v "QuickSearchShowMiniMenu" /t REG_DWORD /d 0 /f
reg add "HKLM\Software\Policies\Microsoft\Edge" /v "TabServicesEnabled" /t REG_DWORD /d 0 /f
reg add "HKLM\Software\Policies\Microsoft\Edge" /v "NewTabPageAllowedBackgroundTypes" /t REG_DWORD /d 3 /f
reg add "HKLM\Software\Policies\Microsoft\Edge" /v "HubsSidebarEnabled" /t REG_DWORD /d 0 /f
reg add "HKLM\Software\Policies\Microsoft\Edge" /v "CopilotPageContext" /t REG_DWORD /d 0 /f
reg add "HKLM\Software\Policies\Microsoft\Edge" /v "EnableMediaRouter" /t REG_DWORD /d 0 /f
reg add "HKLM\Software\Policies\Microsoft\Edge" /v "EdgeCollectionsEnabled" /t REG_DWORD /d 0 /f
reg add "HKLM\Software\Policies\Microsoft\Edge" /v "ShowMicrosoftRewards" /t REG_DWORD /d 0 /f
reg add "HKLM\Software\Policies\Microsoft\Edge" /v "ExperimentationAndConfigurationServiceControl" /t REG_DWORD /d 0 /f
reg add "HKLM\Software\Policies\Microsoft\Edge" /v "BingAdsSuppression" /t REG_DWORD /d 1 /f
reg add "HKLM\Software\Policies\Microsoft\Edge" /v "MicrosoftEdgeInsiderPromotionEnabled" /t REG_DWORD /d 0 /f
reg add "HKLM\Software\Policies\Microsoft\Edge" /v "DefaultBrowserSettingEnabled" /t REG_DWORD /d 0 /f
reg add "HKLM\Software\Policies\Microsoft\Edge" /v "EdgeWorkspacesEnabled" /t REG_DWORD /d 0 /f
reg add "HKLM\Software\Policies\Microsoft\Edge" /v "EdgeShoppingAssistantEnabled" /t REG_DWORD /d 0 /f
reg add "HKLM\Software\Policies\Microsoft\Edge" /v "SearchSuggestEnabled" /t REG_DWORD /d 0 /f
reg add "HKLM\Software\Policies\Microsoft\Edge" /v "ConfigureDoNotTrack" /t REG_DWORD /d 1 /f
reg add "HKLM\Software\Policies\Microsoft\Edge" /v "PaymentMethodQueryEnabled" /t REG_DWORD /d 0 /f
reg add "HKLM\Software\Policies\Microsoft\Edge" /v "ResolveNavigationErrorsUseWebService" /t REG_DWORD /d 0 /f
reg add "HKLM\Software\Policies\Microsoft\Edge" /v "AlternateErrorPagesEnabled" /t REG_DWORD /d 0 /f
reg add "HKLM\Software\Policies\Microsoft\Edge" /v "UserFeedbackAllowed" /t REG_DWORD /d 0 /f
reg add "HKLM\Software\Policies\Microsoft\Edge" /v "ShowRecommendationsEnabled" /t REG_DWORD /d 0 /f
reg add "HKLM\Software\Policies\Microsoft\Edge" /v "ShowAcrobatSubscriptionButton" /t REG_DWORD /d 0 /f
reg add "HKLM\Software\Policies\Microsoft\Edge" /v "PinBrowserEssentialsToolbarButton" /t REG_DWORD /d 0 /f
reg add "HKLM\Software\Policies\Microsoft\Edge" /v "ShowPDFDefaultRecommendationsEnabled" /t REG_DWORD /d 0 /f
reg add "HKLM\Software\Policies\Microsoft\Edge" /v "AddressBarMicrosoftSearchInBingProviderEnabled" /t REG_DWORD /d 0 /f
reg add "HKLM\Software\Policies\Microsoft\Edge" /v "PersonalizationReportingEnabled" /t REG_DWORD /d 0 /f
reg add "HKLM\Software\Policies\Microsoft\Edge" /v "WebWidgetAllowed" /t REG_DWORD /d 0 /f
reg add "HKLM\Software\Policies\Microsoft\Edge" /v "WebWidgetIsEnabledOnStartup" /t REG_DWORD /d 0 /f
reg add "HKLM\Software\Policies\Microsoft\Edge" /v "SearchbarAllowed" /t REG_DWORD /d 0 /f
reg add "HKLM\Software\Policies\Microsoft\Edge" /v "SearchbarIsEnabledOnStartup" /t REG_DWORD /d 0 /f
reg add "HKLM\Software\Policies\Microsoft\Edge" /v "PerformanceDetectorEnabled" /t REG_DWORD /d 0 /f
reg add "HKLM\Software\Policies\Microsoft\Edge" /v "NewTabPageContentEnabled" /t REG_DWORD /d 0 /f
reg add "HKLM\Software\Policies\Microsoft\Edge" /v "NewTabPageBingChatEnabled" /t REG_DWORD /d 0 /f
reg add "HKLM\Software\Policies\Microsoft\Edge" /v "NewTabPageSearchBox" /t REG_SZ /d "redirect" /f
reg add "HKLM\Software\Policies\Microsoft\Edge" /v "HideFirstRunExperience" /t REG_DWORD /d 1 /f
reg add "HKLM\Software\Policies\Microsoft\Edge" /v "AutoImportAtFirstRun" /t REG_DWORD /d 4 /f
reg add "HKLM\Software\Policies\Microsoft\Edge\Recommended" /v "ShowHomeButton" /t REG_DWORD /d 1 /f
```
- Edge will reload the policies automatically within a few minutes
  - You can force update them if you visit `edge://policy/` and click `Reload Policies`
  - Copy and paste link below in a new tab to visit
```
edge://policy/
```

----

## Privacy
- Configure Out-of-Box privacy settings
```
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\AdvertisingInfo" /v "Enabled" /t REG_DWORD /d 0 /f
reg add "HKLM\Software\Microsoft\Windows\CurrentVersion\AdvertisingInfo" /v "Enabled" /t REG_DWORD /d 0 /f
reg add "HKCU\Software\Microsoft\input\TIPC" /v "Enabled" /t REG_DWORD /d 0 /f
reg add "HKLM\Software\Microsoft\SQMClient\Windows" /v "CEIPEnable" /t REG_DWORD /d 0 /f
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\CapabilityAccessManager\ConsentStore\location" /v "Value" /t REG_SZ /d "Deny" /f
reg add "HKLM\Software\Microsoft\Windows\CurrentVersion\CapabilityAccessManager\ConsentStore\location" /v "Value" /t REG_SZ /d "Deny" /f
reg add "HKLM\System\Maps" /v "AutoUpdateEnabled" /t REG_DWORD /d 0 /f
reg add "HKLM\Software\Policies\Microsoft\Windows\Maps" /v "AutoDownloadAndUpdateMapData" /t REG_DWORD /d 0 /f
reg add "HKLM\Software\Policies\Microsoft\Windows\Maps" /v "AllowUntriggeredNetworkTrafficOnSettingsPage" /t REG_DWORD /d 0 /f
reg add "HKLM\System\CurrentControlSet\Services\lfsvc\Service\Configuration" /v "Status" /t REG_DWORD /d 0 /f
reg add "HKLM\Software\Policies\Microsoft\Windows\LocationAndSensors" /v "DisableLocation" /t REG_DWORD /d 1 /f
reg add "HKLM\Software\Policies\Microsoft\Windows\LocationAndSensors" /v "DisableWindowsLocationProvider" /t REG_DWORD /d 1 /f
reg add "HKLM\Software\Policies\Microsoft\Windows\LocationAndSensors" /v "DisableLocationScripting" /t REG_DWORD /d 1 /f
reg add "HKLM\Software\Microsoft\Windows NT\CurrentVersion\Sensor\Overrides\{BFA794E4-F964-4FDB-90F6-51056BFE4B44}" /v "SensorPermissionState" /t REG_DWORD /d 0 /f
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\Privacy" /v "TailoredExperiencesWithDiagnosticDataEnabled" /t REG_DWORD /d 0 /f
reg add "HKLM\Software\Microsoft\Windows\CurrentVersion\Privacy" /v "TailoredExperiencesWithDiagnosticDataEnabled" /t REG_DWORD /d 0 /f
reg add "HKCU\Software\Policies\Microsoft\Windows\CloudContent" /v DisableTailoredExperiencesWithDiagnosticData /t REG_DWORD /d 1 /f
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\CapabilityAccessManager\ConsentStore\userAccountInformation" /v "Value" /t REG_SZ /d "Deny" /f
reg add "HKLM\Software\Microsoft\Windows\CurrentVersion\CapabilityAccessManager\ConsentStore\userAccountInformation" /v "Value" /t REG_SZ /d "Deny" /f
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\CapabilityAccessManager\ConsentStore\appDiagnostics" /v "Value" /t REG_SZ /d "Deny" /f
reg add "HKLM\Software\Microsoft\Windows\CurrentVersion\CapabilityAccessManager\ConsentStore\appDiagnostics" /v "Value" /t REG_SZ /d "Deny" /f
```
- Disable Feedback, Telemetry, and the Diagnostics Tracking Service
```
Set-Service -Name "DiagTrack" -StartupType Disabled; Stop-Service -Name "DiagTrack"
Set-Service -Name "dmwappushservice" -StartupType Disabled; Stop-Service -Name "dmwappushservice"
reg add "HKLM\Software\Microsoft\Windows\CurrentVersion\Policies\DataCollection" /v "AllowTelemetry" /t REG_DWORD /d 0 /f
reg add "HKLM\Software\Policies\Microsoft\Windows\AppCompat" /v "AITEnable" /t REG_DWORD /d 0 /f
reg add "HKLM\Software\Policies\Microsoft\Windows\DataCollection" /v "AllowTelemetry" /t REG_DWORD /d 0 /f
reg add "HKLM\Software\Policies\Microsoft\Windows\DataCollection" /v "LimitDiagnosticLogCollection" /t REG_DWORD /d 1 /f
reg add "HKLM\Software\Policies\Microsoft\Windows\DataCollection" /v "DisableOneSettingsDownloads" /t REG_DWORD /d 1 /f
reg add "HKLM\Software\Policies\Microsoft\Windows\DataCollection" /v "DoNotShowFeedbackNotifications" /t REG_DWORD /d 1 /f
reg add "HKCU\Software\Microsoft\Siuf\Rules" /v "NumberOfSIUFInPeriod" /t REG_DWORD /d 0 /f
reg add "HKCU\Software\Microsoft\Siuf\Rules" /v "PeriodInNanoSeconds" /t REG_DWORD /d 0 /f
reg add "HKCU\Software\Microsoft\MediaPlayer\Preferences" /v "UsageTracking" /t REG_DWORD /d 0 /f
reg add "HKLM\Software\Policies\Microsoft\Windows\AppCompat" /v "DisableInventory" /t REG_DWORD /d 1 /f
reg add "HKLM\System\CurrentControlSet\Control\WMI\Autologger\AutoLogger-Diagtrack-Listener" /v "Start" /t REG_DWORD /d 0 /f
```
- Disable WiFi Sense and reporting to Microsoft
```
reg add "HKLM\Software\Microsoft\PolicyManager\default\WiFi\AllowWiFiHotSpotReporting" /v "Value" /t REG_DWORD /d 0 /f
reg add "HKLM\Software\Microsoft\PolicyManager\default\WiFi\AllowAutoConnectToWiFiSenseHotspots" /v "Value" /t REG_DWORD /d 0 /f
reg add "HKLM\Software\Microsoft\WcmSvc\wifinetworkmanager\config" /v "AutoConnectAllowedOEM" /t REG_DWORD /d 0 /f
```
- Disable Cortana, Keyboard & Handwriting Insights
```
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\Windows Search" /v "CortanaConsent" /t REG_DWORD /d 0 /f
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\CPSS\Store\InkingAndTypingPersonalization" /v "Value" /t REG_DWORD /d 0 /f
reg add "HKCU\Software\Microsoft\InputPersonalization" /v "RestrictImplicitTextCollection" /t REG_DWORD /d 1 /f
reg add "HKCU\Software\Microsoft\InputPersonalization" /v "RestrictImplicitInkCollection" /t REG_DWORD /d 1 /f
reg add "HKCU\Software\Microsoft\InputPersonalization\TrainedDataStore" /v "HarvestContacts" /t REG_DWORD /d 0 /f
reg add "HKCU\Software\Microsoft\Personalization\Settings" /v "AcceptedPrivacyPolicy" /t REG_DWORD /d 0 /f
reg add "HKCU\Software\Microsoft\input\Settings" /v "InsightsEnabled" /t REG_DWORD /d 0 /f
reg add "HKLM\Software\Policies\Microsoft\Windows\TabletPC" /v "PreventHandwritingDataSharing" /t REG_DWORD /d 1 /f
reg add "HKLM\Software\Policies\Microsoft\Windows\HandwritingErrorReports" /v "PreventHandwritingErrorReports" /t REG_DWORD /d 1 /f
reg add "HKLM\Software\Policies\Microsoft\InputPersonalization" /v "AllowInputPersonalization" /t REG_DWORD /d 0 /f
reg add "HKLM\Software\Policies\Microsoft\Windows\Windows Search" /v "AllowSearchToUseLocation" /t REG_DWORD /d 0 /f
reg add "HKLM\Software\Policies\Microsoft\Windows\Windows Search" /v "DisableWebSearch" /t REG_DWORD /d 1 /f
reg add "HKLM\Software\Policies\Microsoft\Windows\Windows Search" /v "ConnectedSearchUseWeb" /t REG_DWORD /d 0 /f
reg add "HKLM\Software\Microsoft\Speech_OneCore\Preferences" /v "ModelDownloadAllowed" /t REG_DWORD /d 0 /f
reg add "HKLM\Software\Policies\Microsoft\Speech" /v "AllowSpeechModelUpdate" /t REG_DWORD /d 0 /f
reg add "HKLM\Software\Policies\Microsoft\Windows\Windows Search" /v "AllowCloudSearch" /t REG_DWORD /d 0 /f
reg add "HKLM\Software\Policies\Microsoft\Windows\Windows Search" /v "AllowCortanaAboveLock" /t REG_DWORD /d 0 /f
reg add "HKLM\Software\Policies\Microsoft\Windows\Windows Search" /v "EnableDynamicContentInWSB" /t REG_DWORD /d 0 /f
```
- Disable Cloud Content search
```
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\Search" /v "BingSearchEnabled" /t REG_DWORD /d 0 /f
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\SearchSettings" /v "IsAADCloudSearchEnabled" /t REG_DWORD /d 0 /f
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\SearchSettings" /v "IsDeviceSearchHistoryEnabled" /t REG_DWORD /d 0 /f
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\SearchSettings" /v "IsDynamicSearchBoxEnabled" /t REG_DWORD /d 0 /f
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\SearchSettings" /v "IsMSACloudSearchEnabled" /t REG_DWORD /d 0 /f
reg add "HKCU\Software\Policies\Microsoft\Windows\Explorer" /v "DisableSearchBoxSuggestions" /t REG_DWORD /d 1 /f
```
- Disable Activity History and Clipboard Suggestions
```
reg add "HKCU\Software\Microsoft\Clipboard" /v "EnableClipboardHistory" /t REG_DWORD /d 0 /f
reg add "HKLM\Software\Policies\Microsoft\Windows\System" /v "AllowClipboardHistory" /t REG_DWORD /d 0 /f
reg add "HKLM\Software\Policies\Microsoft\Windows\System" /v "AllowCrossDeviceClipboard" /t REG_DWORD /d 0 /f
reg add "HKLM\Software\Policies\Microsoft\Windows\System" /v "EnableActivityFeed" /t REG_DWORD /d 0 /f
reg add "HKLM\Software\Policies\Microsoft\Windows\System" /v "PublishUserActivities" /t REG_DWORD /d 0 /f
reg add "HKLM\Software\Policies\Microsoft\Windows\System" /v "UploadUserActivities" /t REG_DWORD /d 0 /f
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\SmartActionPlatform\SmartClipboard" /v "Disabled" /t REG_DWORD /d 1 /f
```
- Disable synchronization of Windows Settings
```
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\SettingSync" /v "SyncPolicy" /t REG_DWORD /d 5 /f
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\SettingSync\Groups\Personalization" /v "Enabled" /t REG_DWORD /d 0 /f
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\SettingSync\Groups\BrowserSettings" /v "Enabled" /t REG_DWORD /d 0 /f
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\SettingSync\Groups\Credentials" /v "Enabled" /t REG_DWORD /d 0 /f
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\SettingSync\Groups\Language" /v "Enabled" /t REG_DWORD /d 0 /f
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\SettingSync\Groups\Accessibility" /v "Enabled" /t REG_DWORD /d 0 /f
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\SettingSync\Groups\Windows" /v "Enabled" /t REG_DWORD /d 0 /f
```
- Disable Lock Screen Notifications, Ads, and Lock Screen Camera
```
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\Notifications\Settings" /v "NOC_GLOBAL_SETTING_ALLOW_CRITICAL_TOASTS_ABOVE_LOCK" /t REG_DWORD /d 0 /f
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\Notifications\Settings" /v "NOC_GLOBAL_SETTING_ALLOW_TOASTS_ABOVE_LOCK" /t REG_DWORD /d 0 /f
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\ContentDeliveryManager" /v "RotatingLockScreenOverlayEnabled" /t REG_DWORD /d 0 /f
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\ContentDeliveryManager" /v "RotatingLockScreenEnabled" /t REG_DWORD /d 0 /f
reg add "HKLM\Software\Policies\Microsoft\Windows\Personalization" /v "NoLockScreenCamera" /t REG_DWORD /d 1 /f
```
- Disable Windows AI, Copilot and Recall
```
reg add "HKLM\Software\Policies\Microsoft\Edge" /v "Microsoft365CopilotChatIconEnabled" /t REG_DWORD /d 0 /f
reg add "HKLM\Software\Policies\Microsoft\Edge" /v "ComposeInlineEnabled" /t REG_DWORD /d 0 /f
reg add "HKLM\Software\Policies\Microsoft\Edge" /v "HubsSidebarEnabled" /t REG_DWORD /d 0 /f
reg add "HKLM\SOFTWARE\Policies\Microsoft\Edge" /v "CopilotPageContext" /t REG_DWORD /d 0 /f
reg add "HKLM\Software\Policies\Microsoft\Edge" /v "WebAppSettings" /t REG_SZ /f; Set-ItemProperty -Path "HKLM:\Software\Policies\Microsoft\Edge" -Name "WebAppSettings" -Value '[{"manifest_id": "https://copilot.microsoft.com/?cmc", "run_on_os_login": "blocked", "force_unregister_os_integration": true}]' -Type String
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\Explorer\Advanced" /v "ShowCopilotButton" /t REG_DWORD /d 0 /f
reg add "HKCU\Software\Policies\Microsoft\Windows\WindowsCopilot" /v "TurnOffWindowsCopilot" /t REG_DWORD /d 1 /f
reg add "HKLM\Software\Policies\Microsoft\Windows\WindowsCopilot" /v "TurnOffWindowsCopilot" /t REG_DWORD /d 1 /f
reg add "HKCU\Software\Policies\Microsoft\Windows\WindowsAI" /v "DisableAIDataAnalysis" /t REG_DWORD /d 1 /f
reg add "HKLM\Software\Policies\Microsoft\Windows\WindowsAI" /v "DisableAIDataAnalysis" /t REG_DWORD /d 1 /f
reg add "HKLM\Software\Policies\Microsoft\Windows\WindowsAI" /v "AllowRecallEnablement" /t REG_DWORD /d 0 /f
reg add "HKLM\Software\Microsoft\Windows\CurrentVersion\Policies\Paint" /v "DisableImageCreator" /t REG_DWORD /d 1 /f
reg add "HKLM\Software\Microsoft\Windows\CurrentVersion\Policies\Paint" /v "DisableCocreator" /t REG_DWORD /d 1 /f
reg add "HKLM\Software\Microsoft\Windows\CurrentVersion\Policies\Paint" /v "DisableGenerativeFill" /t REG_DWORD /d 1 /f
reg add "HKLM\SOFTWARE\Policies\WindowsNotepad" /v "DisableAIFeatures" /t REG_DWORD /d 1 /f
dism /online /Disable-Feature /FeatureName:"Recall"; Get-WindowsOptionalFeature -Online | Where-Object {$_.FeatureName -eq "Recall"}
```
- Prevent preinstalled applications from returning and remove Start Menu suggestions
```
reg add "HKLM\Software\Policies\Microsoft\Windows\CloudContent" /v "DisableCloudOptimizedContent" /t REG_DWORD /d 1 /f
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\ContentDeliveryManager" /v "FeatureManagementEnabled" /t REG_DWORD /d 0 /f
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\ContentDeliveryManager" /v "ContentDeliveryAllowed" /t REG_DWORD /d 0 /f
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\ContentDeliveryManager" /v "OemPreInstalledAppsEnabled" /t REG_DWORD /d 0 /f
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\ContentDeliveryManager" /v "PreInstalledAppsEnabled" /t REG_DWORD /d 0 /f
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\ContentDeliveryManager" /v "PreInstalledAppsEverEnabled" /t REG_DWORD /d 0 /f
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\ContentDeliveryManager" /v "SilentInstalledAppsEnabled" /t REG_DWORD /d 0 /f
```
- Disable suggested content in the Settings app
```
reg add "HKLM\Software\Microsoft\PolicyManager\current\device\Bluetooth" /v "AllowAdvertising" /t REG_DWORD /d 0 /f
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\Explorer\Advanced" /v "ShowSyncProviderNotifications" /t REG_DWORD /d 0 /f
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\ContentDeliveryManager" /v "SystemPaneSuggestionsEnabled" /t REG_DWORD /d 0 /f
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\ContentDeliveryManager" /v "SubscribedContent-310093Enabled" /t REG_DWORD /d 0 /f
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\ContentDeliveryManager" /v "SubscribedContent-314559Enabled" /t REG_DWORD /d 0 /f
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\ContentDeliveryManager" /v "SubscribedContent-314563Enabled" /t REG_DWORD /d 0 /f
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\ContentDeliveryManager" /v "SubscribedContent-338387Enabled" /t REG_DWORD /d 0 /f
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\ContentDeliveryManager" /v "SubscribedContent-338388Enabled" /t REG_DWORD /d 0 /f
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\ContentDeliveryManager" /v "SubscribedContent-338389Enabled" /t REG_DWORD /d 0 /f
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\ContentDeliveryManager" /v "SubscribedContent-338393Enabled" /t REG_DWORD /d 0 /f
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\ContentDeliveryManager" /v "SubscribedContent-353694Enabled" /t REG_DWORD /d 0 /f
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\ContentDeliveryManager" /v "SubscribedContent-353696Enabled" /t REG_DWORD /d 0 /f
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\ContentDeliveryManager" /v "SubscribedContent-353698Enabled" /t REG_DWORD /d 0 /f
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\ContentDeliveryManager" /v "SubscribedContentEnabled" /t REG_DWORD /d 0 /f
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\ContentDeliveryManager" /v "SoftLandingEnabled" /t REG_DWORD /d 0 /f
```
- Disable password reveal button and user steps recorder
```
reg add "HKLM\Software\Policies\Microsoft\Windows\CredUI" /v "DisablePasswordReveal" /t REG_DWORD /d 1 /f
reg add "HKLM\Software\Policies\Microsoft\Windows\AppCompat" /v "DisableUAR" /t REG_DWORD /d 1 /f
```
- Disable prompting to sign-in with a Microsoft account
```
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\UserProfileEngagement" /v "ScoobeSystemSettingEnabled" /t REG_DWORD /d 0 /f
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\SystemSettings\AccountNotifications" /v "EnableAccountNotifications" /t REG_DWORD /d 0 /f
```
- Disable Microsoft SpyNet reporting
```
reg add "HKLM\Software\Policies\Microsoft\Windows Defender\Spynet" /v "SpyNetReporting" /t REG_DWORD /d 0 /f
reg add "HKLM\Software\Policies\Microsoft\Windows Defender\Spynet" /v "SubmitSamplesConsent" /t REG_DWORD /d 2 /f
reg add "HKLM\Software\Policies\Microsoft\MRT" /v "DontReportInfectionInformation" /t REG_DWORD /d 1 /f
```
- Disable Windows Defender Notifications
```
reg add "HKLM\Software\Microsoft\Windows Defender Security Center\Notifications" /v "DisableEnhancedNotifications" /t REG_DWORD /d 1 /f
reg add "HKLM\Software\Microsoft\Windows Defender Security Center\Virus and threat protection" /v "SummaryNotificationDisabled" /t REG_DWORD /d 1 /f
reg add "HKLM\Software\Microsoft\Windows Defender Security Center\Virus and threat protection" /v "NoActionNotificationDisabled" /t REG_DWORD /d 1 /f
reg add "HKLM\Software\Microsoft\Windows Defender Security Center\Virus and threat protection" /v "FilesBlockedNotificationDisabled" /t REG_DWORD /d 1 /f
reg add "HKCU\Software\Microsoft\Windows Defender Security Center\Account protection" /v "DisableNotifications" /t REG_DWORD /d 1 /f
reg add "HKCU\Software\Microsoft\Windows Defender Security Center\Account protection" /v "DisableWindowsHelloNotifications" /t REG_DWORD /d 1 /f
reg add "HKCU\Software\Microsoft\Windows Defender Security Center\Account protection" /v "DisableDynamiclockNotifications" /t REG_DWORD /d 1 /f
reg add "HKCU\Software\Microsoft\Windows Security Health\State" /v "AccountProtection_MicrosoftAccount_Disconnected" /t REG_DWORD /d 1 /f
reg add "HKCU\Software\Microsoft\Windows Security Health\State" /v "Hardware_DataEncryption_AddMsa" /t REG_DWORD /d "0" /f
reg add "HKCU\Software\Microsoft\Edge\SmartScreenPuaEnabled" /ve /t REG_DWORD /d "1" /f
```
- Disable Notification Suggestions, Notifications from "Suggested" and "Windows Backup"
```
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\Notifications\Settings\Windows.ActionCenter.SmartOptOut" /v "Enabled" /t REG_DWORD /d 0 /f
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\Notifications\Settings\Windows.SystemToast.Suggested" /v "Enabled" /t REG_DWORD /d 0 /f
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\Notifications\Settings\MicrosoftWindows.Client.CBS_cw5n1h2txyewy!WindowsBackup" /v "Enabled" /t REG_DWORD /d 0 /f
```

----

## System
- Disable hibernation file **-- Recommended**
```
powercfg -h off
```
- Disable Offline Files **-- Pro only**
```
Set-Service -Name "CscService" -StartupType Disabled -ErrorAction SilentlyContinue; Stop-Service -Name "CscService" -ErrorAction SilentlyContinue
```
- Disable Fast Startup
```
reg add "HKLM\System\CurrentControlSet\Control\Session Manager\Power" /v "HiberbootEnabled" /t REG_DWORD /d 0 /f
```
- Disable System Protection
```
Disable-ComputerRestore "$Env:SystemDrive"; vssadmin delete shadows /all /quiet | Out-Null
```
- Disable Remote Assistance
```
reg add "HKLM\System\CurrentControlSet\Control\Remote Assistance" /v "fAllowToGetHelp" /t REG_DWORD /d 0 /f
reg add "HKLM\System\CurrentControlSet\Control\Remote Assistance" /v "fAllowFullControl" /t REG_DWORD /d 0 /f
reg add "HKLM\Software\Policies\Microsoft\Windows NT\Terminal Services" /v "fAllowToGetHelp" /t REG_DWORD /d 0 /f
```
- Disable 260 character path limit
```
reg add "HKLM\System\CurrentControlSet\Control\FileSystem" /v "LongPathsEnabled" /t REG_DWORD /d 1 /f
```
- Disable Windows Error Reporting across the system
```
Disable-WindowsErrorReporting; reg add "HKLM\Software\Microsoft\Windows\Windows Error Reporting" /v "Disabled" /t REG_DWORD /d 1 /f
```
- Disable Key Management Service Online Activation
```
reg add "HKLM\Software\Policies\Microsoft\Windows NT\CurrentVersion\Software Protection Platform" /v "NoGenTicket" /t REG_DWORD /d 1 /f
```
- Disable OneDrive access to network before login
```
reg add "HKLM\Software\Microsoft\OneDrive" /v "PreventNetworkTrafficPreUserSignIn" /t REG_DWORD /d 1 /f
```
- Disable Windows Media Player Network Sharing Service
```
Set-Service -Name "WMPNetworkSvc" -StartupType Disabled; Stop-Service -Name "WMPNetworkSvc"
```
- Disable Smartphone integration
```
reg add "HKLM\Software\Policies\Microsoft\Windows\System" /v "EnableMmx" /t REG_DWORD /d 0 /f
reg add "HKLM\Software\Policies\Microsoft\Windows\Messaging" /v "AllowMessageSync" /t REG_DWORD /d 0 /f
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\Mobility" /v "CrossDeviceEnabled" /t REG_DWORD /d 0 /f
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\Mobility" /v "PhoneLinkEnabled" /t REG_DWORD /d 0 /f
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\Mobility" /v "OptedIn" /t REG_DWORD /d 0 /f
```
- Disable Game Bar
```
reg add "HKCU\Software\Microsoft\GameBar" /v "UseNexusForGameBarEnabled" /t REG_DWORD /d 0 /f
reg add "HKCU\System\GameConfigStore" /v "GameDVR_FSEBehavior" /t REG_DWORD /d 2 /f
reg add "HKCU\System\GameConfigStore" /v "GameDVR_Enabled" /t REG_DWORD /d 0 /f
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\GameDVR" /v "AppCaptureEnabled" /t REG_DWORD /d 0 /f
reg add "HKLM\Software\Policies\Microsoft\Windows\GameDVR" /v "AllowGameDVR" /t REG_DWORD /d 0 /f
```
- Disable automatic archiving of unused apps
```
reg add "HKLM\Software\Policies\Microsoft\Windows\Appx" /v "AllowAutomaticAppArchiving" /t REG_DWORD /d 0 /f
```
- Stop Program Compatibility and Push Notifications background services
```
Set-Service -Name PcaSvc -StartupType Manual
Set-Service -Name WpnService -StartupType Manual
Get-Service 'PcaSvc','WpnService' | Stop-Service
```
- Disable un-needed scheduled tasks <!-- include 'XblGameSaveTask' on business systems | May need to add 'Microsoft Compatibility Appraiser Exp' -->
```
Get-ScheduledTask 'Microsoft Compatibility Appraiser','Consolidator','UsbCeip','Microsoft-Windows-DiskDiagnosticDataCollector','QueueReporting','DmClient','DmClientOnScenarioDownload','StartupAppTask','MareBackup','PcaPatchDbTask','ProgramDataUpdater','MapsUpdateTask','MapsToastTask','Proxy' -ErrorAction SilentlyContinue | Disable-ScheduledTask
```
- Set the correct Time Zone **--** Or you can choose in [Date & time](ms-settings:dateandtime)
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

----

## Optional
These sections are optional. Only execute their code if you want the change

- If running an SSD and a second HD, move the pagefile to the second HD **-- Optional**
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
- Disable Windows Search service **-- If Not Using Classic Outlook** <!-- Always disable after classic Outlook retirement -->
```
Set-Service -Name "WSearch" -StartupType Disabled; Stop-Service -Name "WSearch"
```
- Set a Power Profile for desktop PCs (Choose one)
  - Ultimate Performance **-- Gaming Desktops Only**
```
$powerProfile = Get-CimInstance -Namespace "root\cimv2\power" -ClassName Win32_PowerPlan | Where-Object { $_.ElementName -eq "Ultimate Performance" }
if ($powerProfile -eq $null) {$result = powercfg -duplicatescheme e9a42b02-d5df-448d-aa00-03f14749eb61; if ($result -match "GUID: ([0-9a-fA-F-]+)") { powercfg -setactive $matches[1] }} else {
if ($powerProfile.InstanceID -match "([0-9a-fA-F]{8}-([0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12})") { powercfg -setactive $matches[1] }}
```
  - High Performance with no disk sleep **-- Desktops Only**
```
powercfg -SETACTIVE 8c5e7fda-e8bf-4a96-9a85-a6e23a8c635c; powercfg -change -disk-timeout-ac 0; powercfg -change -disk-timeout-dc 0
```
- Optimize system responsiveness and disable network throttling. **-- Gaming Desktops Only** <!-- Defaults: SystemResponsiveness=20 NetworkThrottlingIndex=10 -->
```
reg add "HKLM\Software\Microsoft\Windows NT\CurrentVersion\Multimedia\SystemProfile" /v "SystemResponsiveness" /t REG_DWORD /d 0 /f
reg add "HKLM\Software\Microsoft\Windows NT\CurrentVersion\Multimedia\SystemProfile" /v "NetworkThrottlingIndex" /t REG_DWORD /d 4294967295 /f
```
- Disable Core Isolation: Memory integrity **-- Optional, Improves Game Performance**
```
reg add "HKLM\System\CurrentControlSet\Control\DeviceGuard\Scenarios\HypervisorEnforcedCodeIntegrity" /v "Enabled" /t REG_DWORD /d 0 /f
```

----

## Finishing Up
- Disable automatic sign-in after updates and restarts
```
reg add "HKLM\Software\Microsoft\Windows\CurrentVersion\Policies\System" /v "DisableAutomaticRestartSignOn" /t REG_DWORD /d 1 /f
```
- Disable Windows Update via peer-to-peer
```
reg add "HKLM\Software\Microsoft\Windows\CurrentVersion\DeliveryOptimization\Config" /v "DODownloadMode" /t REG_DWORD /d 0 /f
reg add "HKLM\Software\Policies\Microsoft\Windows\DeliveryOptimization" /v "DODownloadMode" /t REG_DWORD /d 0 /f
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\DeliveryOptimization" /v "SystemSettingsDownloadMode" /t REG_DWORD /d 0 /f
Delete-DeliveryOptimizationCache -Force
```
- Disable Preview Updates **-- Pro only**
```
reg add "HKLM\Software\Policies\Microsoft\Windows\WindowsUpdate" /v "DeferQualityUpdates" /t REG_DWORD /d 1 /f
reg add "HKLM\Software\Policies\Microsoft\Windows\WindowsUpdate" /v "DeferQualityUpdatesPeriodInDays" /t REG_DWORD /d 0 /f
reg add "HKLM\Software\Policies\Microsoft\Windows\WindowsUpdate" /v "PauseQualityUpdatesStartTime" /t REG_SZ /f
```
- Cleanup Windows components
```
Dism /Online /Cleanup-Image /StartComponentCleanup
```
- Remove any additional bloatware
- Install software with [Ninite](https://ninite.com/){:target="_blank"}
- Setup [Firefox]({{site.url}}/firefox){:target="_blank"} or [Chrome]({{site.url}}/chrome){:target="_blank"} if you prefer either over Microsoft Edge
  - You can always set a default Web browser in [Default apps](ms-settings:defaultapps)
  - Search for your app in the list, click it and select `Set default`
- Open [Windows Security Center](windowsdefender:) and dismiss any alerts
- Disable [Do not Disturb](ms-settings:notifications)
  - Toggle off `Do not disturb`
  - Expand "Turn on do not disturb automatically"
  - Toggle off all rules
- Run Disk Cleanup with "**Clean up system files**"
```
cleanmgr
```
- Optimize drives to complete the setup
```
dfrgui
```

----

## Tweaks

### Disable Sticky Keys shortcuts
Disable shortcut keys that can interrupt gaming

- Go to [Keyboard](ms-settings:easeofaccess-keyboard) under Accessibility in Settings
- Click "Sticky Keys" and turn off all options
- Click "Filter Keys" and turn off all options
- Keep "Toggle Keys" off

### Disable lock screen when resuming from sleep
- Applies the change to the current power profile
```
powercfg /SETDCVALUEINDEX SCHEME_CURRENT SUB_NONE CONSOLELOCK 0
powercfg /SETACVALUEINDEX SCHEME_CURRENT SUB_NONE CONSOLELOCK 0
```
- Reboot the system to apply the change

### Disable F1 help in some Microsoft apps
- This mainly prevents `[F1]` from opening tabs while on the desktop
```
New-Item -Path "HKCU:\Software\Classes\Typelib\{8cec5860-07a1-11d9-b15e-000d56bfe6ee}\1.0\0\win32" -Force | Out-Null
Set-ItemProperty -Path "HKCU:\Software\Classes\Typelib\{8cec5860-07a1-11d9-b15e-000d56bfe6ee}\1.0\0\win32" -Name "(Default)" -Value "" | Out-Null
New-Item -Path "HKCU:\Software\Classes\Typelib\{8cec5860-07a1-11d9-b15e-000d56bfe6ee}\1.0\0\win64" -Force | Out-Null
Set-ItemProperty -Path "HKCU:\Software\Classes\Typelib\{8cec5860-07a1-11d9-b15e-000d56bfe6ee}\1.0\0\win64" -Name "(Default)" -Value "" | Out-Null
```

### Enable Location
- Some Websites and Apps require Location access in order to work
```
reg add "HKLM\Software\Policies\Microsoft\Windows\LocationAndSensors" /v "DisableLocation" /t REG_DWORD /d 0 /f
reg add "HKLM\Software\Policies\Microsoft\Windows\LocationAndSensors" /v "DisableWindowsLocationProvider" /t REG_DWORD /d 0 /f
reg add "HKLM\Software\Policies\Microsoft\Windows\LocationAndSensors" /v "DisableLocationScripting" /t REG_DWORD /d 0 /f
```

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
