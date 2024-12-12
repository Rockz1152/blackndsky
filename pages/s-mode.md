---
layout: default
title: "Disable Windows S mode"
permalink: /s-mode
---

> ### **No Microsoft Account Needed**
>
> Windows S mode is a cut-down version of Windows that only runs Microsoft-verified apps from the Microsoft Store. This limitation prevents you from creating a local user during setup, forcing you to sign-in with a Microsoft account. The official way of disabling S mode also requires a Microsoft account. This document will help you disable S-Mode without using a Microsoft account.

Try these steps first

- Disable secure boot in the BIOS
- Boot and check if S mode is enabled
- After S mode is disabled, re-enable secure boot in the BIOS

If S mode is still enabled, continue with the following steps

- Install or boot Windows to OOBE
- Use `[Win] + [R]` to open run and enter `ms-settings:`
  - Navigate to `System > Recovery > Advanced startup > Restart now`
- Select `Troubleshoot > Advanced Options > Command Prompt`
- In Command Prompt, run `regedit`
  - Highlight `HKEY_LOCAL_MACHINE` in the Registry Editor
  - Go to `File > Load Hive`
  - Navigate to `C:\Windows\System32\Config\SYSTEM`
  - Name it `Offline System`
  - Navigate to `HKEY_LOCAL_MACHINE\Offline System\ControlSet001\Control\CI\Policy`
  - Set `SkuPolicyRequired` to `0`
  - Highlight `Offline System` and go to `File > Unload Hive`
- Close any windows and restart the system
- Verify S mode is disabled
- Re-enable secure boot in the BIOS
