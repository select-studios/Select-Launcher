param([switch]$Elevated)

function Test-Admin {
    $currentUser = New-Object Security.Principal.WindowsPrincipal $([Security.Principal.WindowsIdentity]::GetCurrent())
    $currentUser.IsInRole([Security.Principal.WindowsBuiltinRole]::Administrator)
}

if ((Test-Admin) -eq $false)  {
    if ($elevated) {
        # tried to elevate, did not work, aborting
    } else {
        Start-Process powershell.exe -Verb RunAs -ArgumentList ('-noprofile -noexit -file "{0}" -elevated' -f ($myinvocation.MyCommand.Definition))
    }
    exit
}

'running with full privileges'

Write-Host "Starting installation - Installing required certificates"

$AppVersion="Major.Minor.Build"
$CertPath="SelectLauncher.UWP_$($AppVersion).0_x86_x64.cer"

Import-Certificate -FilePath "$($PSScriptRoot)\$($CertPath)" -CertStoreLocation "Cert:\LocalMachine\Root\"
invoke-expression -Command $PSScriptRoot"\Install.ps1"