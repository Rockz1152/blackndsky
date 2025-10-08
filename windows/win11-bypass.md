---
layout: default
title: "Bypass Windows 11 Hardware Requirements"
permalink: /win11-bypass
---

For systems that don't meet the unreasonable requirements from Microsoft - [https://www.microsoft.com/en-us/windows/windows-11-specifications](https://www.microsoft.com/en-us/windows/windows-11-specifications){:target="_blank"}

## Clean Installation With USB Media
- Boot to USB media
- Press `[Shift]` + `[F10]` to open a command prompt
- Enter `regedit`
- Create a new `Key` at `HKEY_LOCAL_MACHINE\System\Setup\` called `LabConfig`
- Create the following `DWORD 32-bit` values:
  - `BypassTPMCheck` = `1`
  - `BypassSecureBootCheck` = `1`
  - `BypassCPUCheck` = `1`
- Close the Registry Editor
- Close the Command Prompt
- Proceed with the installation
- Head back to the [Windows 11]({{site.url}}/windows11) page
<!-- additional registry entries if needed
HKEY_LOCAL_MACHINE\System\Setup\LabConfig
"BypassTPMCheck"=dword:00000001
"BypassSecureBootCheck"=dword:00000001
"BypassRAMCheck"=dword:00000001
"BypassStorageCheck"=dword:00000001
"BypassCPUCheck"=dword:00000001
-->

## Windows 10 to 11 In-place Upgrade
Source: https://gist.github.com/asheroto/5087d2a38b311b0c92be2a4f23f92d3e

Remove failed compatibility checks
```
Remove-Item -Path "HKLM:\SOFTWARE\Microsoft\Windows NT\CurrentVersion\AppCompatFlags\CompatMarkers" -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item -Path "HKLM:\SOFTWARE\Microsoft\Windows NT\CurrentVersion\AppCompatFlags\Shared" -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item -Path "HKLM:\SOFTWARE\Microsoft\Windows NT\CurrentVersion\AppCompatFlags\TargetVersionUpgradeExperienceIndicators" -Recurse -Force
```

Allow upgrades on unsupported TPM or CPU
```
reg add "HKLM\System\Setup\MoSetup" /v "AllowUpgradesWithUnsupportedTPMOrCPU" /t REG_DWORD /d 1 /f
```

Set Upgrade Eligibility flag in HKCU
```
reg add "HKCU\Software\Microsoft\PCHC" /v "UpgradeEligibility" /t REG_DWORD /d 1 /f
```

Simulate hardware compatibility
```
New-Item -Path "HKLM:\SOFTWARE\Microsoft\Windows NT\CurrentVersion\AppCompatFlags\HwReqChk" -Force
New-ItemProperty -Path "HKLM:\SOFTWARE\Microsoft\Windows NT\CurrentVersion\AppCompatFlags\HwReqChk" `
  -Name "HwReqChkVars" `
  -PropertyType MultiString `
  -Value @(
    "SQ_SecureBootCapable=TRUE",
    "SQ_SecureBootEnabled=TRUE",
    "SQ_TpmVersion=2",
    "SQ_RamMB=8192"
  ) `
  -Force
```

## Rufus
Rufus can also skip hardware checks among other things when creating media from a .iso <!-- https://arstechnica.com/gadgets/2022/06/usb-installer-tool-removes-windows-11s-microsoft-account-requirements-and-more/ -->

- In the bottom left corner, click the box labeled "Under Windows User Experience"
- Check all options and click `OK`
