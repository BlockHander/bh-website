@echo off
setlocal

:: 1. Self-elevate to Administrator if not already running elevated
net session >nul 2>&1
if %errorlevel% neq 0 (
    echo Requesting Administrator privileges...
    powershell -NoProfile -ExecutionPolicy Bypass -Command "Start-Process -FilePath '%~f0' -Verb RunAs"
    exit /b
)

echo Disabling Parallels hardware OpenGL ICD (prl_gldd.dll)...

:: 2. Run embedded PowerShell to take ownership and rename OpenGLDriverName keys
powershell -NoProfile -ExecutionPolicy Bypass -Command ^
  "$ErrorActionPreference = 'Stop';" ^
  "$cs = 'using System; using System.Runtime.InteropServices; public class Tok { [DllImport(\"advapi32.dll\", SetLastError=true)] public static extern bool AdjustTokenPrivileges(IntPtr h, bool d, ref TP n, int l, IntPtr p, IntPtr r); [DllImport(\"kernel32.dll\")] public static extern IntPtr GetCurrentProcess(); [DllImport(\"advapi32.dll\", SetLastError=true)] public static extern bool OpenProcessToken(IntPtr h, int a, ref IntPtr t); [DllImport(\"advapi32.dll\", SetLastError=true)] public static extern bool LookupPrivilegeValue(string h, string n, ref long l); [StructLayout(LayoutKind.Sequential, Pack=1)] public struct TP { public int C; public long L; public int A; } public static void En() { IntPtr t = IntPtr.Zero; OpenProcessToken(GetCurrentProcess(), 0x28, ref t); TP p = new TP { C = 1, A = 2 }; LookupPrivilegeValue($null, 'SeTakeOwnershipPrivilege', ref p.L); AdjustTokenPrivileges(t, $false, ref p, 0, IntPtr.Zero, IntPtr.Zero); } }';" ^
  "Add-Type $cs; [Tok]::En();" ^
  "$base = 'SYSTEM\CurrentControlSet\Control\Class\{4d36e968-e325-11ce-bfc1-08002be10318}';" ^
  "$admin = New-Object System.Security.Principal.NTAccount('BUILTIN', 'Administrators');" ^
  "$rule = New-Object System.Security.AccessControl.RegistryAccessRule($admin, [System.Security.AccessControl.RegistryRights]::FullControl, [System.Security.AccessControl.InheritanceFlags]::ContainerInherit, [System.Security.AccessControl.PropagationFlags]::None, [System.Security.AccessControl.AccessControlType]::Allow);" ^
  "$changed = $false;" ^
  "Get-ChildItem \"HKLM:\$base\" -ErrorAction SilentlyContinue | Where-Object { $_.PSChildName -match '^\d{4}$' } | ForEach-Object {" ^
  "  $sub = \"$base\$($_.PSChildName)\"; $psp = \"HKLM:\$sub\";" ^
  "  $rk = [Microsoft.Win32.Registry]::LocalMachine.OpenSubKey($sub, [Microsoft.Win32.RegistryKeyPermissionCheck]::ReadWriteSubTree, [System.Security.AccessControl.RegistryRights]::TakeOwnership);" ^
  "  $acl = $rk.GetAccessControl(); $acl.SetOwner($admin); $rk.SetAccessControl($acl); $rk.Close();" ^
  "  $rk = [Microsoft.Win32.Registry]::LocalMachine.OpenSubKey($sub, [Microsoft.Win32.RegistryKeyPermissionCheck]::ReadWriteSubTree, [System.Security.AccessControl.RegistryRights]::ChangePermissions);" ^
  "  $acl = $rk.GetAccessControl(); $acl.SetAccessRule($rule); $rk.SetAccessControl($acl); $rk.Close();" ^
  "  $props = Get-ItemProperty -Path $psp;" ^
  "  foreach ($n in @('OpenGLDriverName', 'OpenGLDriverNameWow')) {" ^
  "    if ($props.PSObject.Properties.Name -contains $n) {" ^
  "      if ($props.PSObject.Properties.Name -contains \"${n}_disabled\") { Remove-ItemProperty -Path $psp -Name \"${n}_disabled\" }" ^
  "      Rename-ItemProperty -Path $psp -Name $n -NewName \"${n}_disabled\";" ^
  "      Write-Host \"Disabled $n in $($_.PSChildName)\" -ForegroundColor Green;" ^
  "      $changed = $true" ^
  "    }" ^
  "  }" ^
  "};" ^
  "if (-not $changed) { Write-Host 'No active OpenGLDriverName entries found (already disabled).' -ForegroundColor Yellow; exit 2 }"

if %errorlevel% equ 0 (
    echo.
    echo Registry updated successfully. Rebooting Windows in 5 seconds...
    shutdown /r /t 5 /c "Applying Parallels OpenGL software rendering fix for Spartan '14"
) else if %errorlevel% equ 2 (
    echo.
    echo No reboot needed. Press any key to close...
    pause >nul
) else (
    echo.
    echo Something went wrong updating the registry. Press any key to close...
    pause >nul
)