---
layout: default
title: "Windows Recovery Environment"
permalink: /winre
---

In January of 2024, Microsoft released KB5034441 after little to no testing. This update, when ran against a default installation of Windows 10, it would fail due to a lack of free space in the Windows Recovery Environment partition. This page contains the steps to fix this issue.

Microsoft did offer instructions, however they contain a technical error and are hard to understand. Original instructions: [https://support.microsoft.com/en-us/topic/kb5028997-instructions-to-manually-resize-your-partition-to-install-the-winre-update-400faa27-9343-461c-ada9-24c8229763bf](https://support.microsoft.com/en-us/topic/kb5028997-instructions-to-manually-resize-your-partition-to-install-the-winre-update-400faa27-9343-461c-ada9-24c8229763bf){:target="_blank"}

### Manual steps to fix KB5034441 installation failure

**WARNING**: Proceed with caution, I take no responsibility for any damage that may occur. Please note these instructions only apply to systems with a WinRE partition at the end of the hard disk.

Check disk and recovery environment status
- Check which disk and partition WinRE status is currently installed to, run `reagentc /info`
- Here, the number after "harddisk" and "partition" is the index of the disk and partition WinRE is on.
- Then disable the WinRE, run `reagentc /disable`
- Verify it's disabled, run `reagentc /info`

Shrink the OS partition and remove the old WinRE partition
- Run `diskpart`
- Run `list disk`
- To select the OS disk, run `sel disk<OS disk index>`. This should be the same disk index as WinRE.
- To check the partition under the OS disk and find the OS partition, run `list part`
- To select the OS partition, run `sel part<OS partition index>`
- Run `shrink desired=400 minimum=400`
- To select the WinRE partition, run `sel part<WinRE partition index>`
- To delete the WinRE partition, run `delete partition override`

Create new recovery partition
- First, check if the disk partition style is a GUID Partition Table (GPT) or a Master Boot Record (MBR).
- To do that, run `list disk`. Check if there is an asterisk character (*) in the "Gpt" column.
- If there is an asterisk character (*), then the drive is GPT. Otherwise, the drive is MBR.
- If your disk is GPT
  - Run `create partition primary id=de94bba4-06d1-4d40-a16a-bfd50179d6ac`
  - Run `format quick fs=ntfs label="Windows RE tools"`
  - Run `gpt attributes =0x8000000000000001`
- If your disk is MBR
  - Run `create partition primary`
  - Run `format quick fs=ntfs label="Windows RE tools"`
  - Run `set id=27`
- Verify the partition layout with `list part` and `list vol`

Re-enable WindowsRE
- Exit from diskpart, run `exit`
- To re-enable WinRE, run `reagentc /enable`
- To confirm where WinRE is installed, run `reagentc /info`
- Install KB5034441 from Windows Update.

### Recovery partition at the font of the disk?
Read all steps before attempting. In this scenario, you will have to:
- Follow the steps in the guide above until you're about to shrink the OS partition.
- Change the `shrink` command step to be `shrink desired=950 minimum=950`
- Remove the recovery partition at the front of the disk with the commands provided.
- Using Disk Manager, replace the recovery partition's space with an unformatted RAW volume, don't assign a letter or format it, in this scenario the disk space is lost.
- Continue from the "Create new recovery partition" step.
