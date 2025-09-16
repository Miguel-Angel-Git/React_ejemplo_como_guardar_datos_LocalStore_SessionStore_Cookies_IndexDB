@echo off
setlocal

:: Pide el mensaje del commit
set /p commit_msg=Introduce el mensaje del commit: 

:: Si no se escribe nada, aborta
if "%commit_msg%"=="" (
    echo Escribe un mensaje de commit.
    exit /b 1
)

:: Ejecuta los comandos de Git
git add .
git commit -m "%commit_msg%"
git push origin main
echo.
echo ✅ Código subido: "%commit_msg%"
pause