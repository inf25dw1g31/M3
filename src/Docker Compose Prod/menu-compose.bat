@echo off
setlocal EnableExtensions

cd /d "%~dp0"

set "COMPOSE_FILE=docker-compose.yml"
if exist "docker-compose.prod.yml" set "COMPOSE_FILE=docker-compose.prod.yml"

set "ENV_OPT="
if exist ".env" set "ENV_OPT=--env-file .env"

:MENU
echo.
echo ==========================================
echo Docker Compose - Menu
echo ==========================================
echo Pasta: %cd%
echo Compose: %COMPOSE_FILE%
if defined ENV_OPT (
  echo Env: .env
) else (
  echo Env: sem .env
)
echo ------------------------------------------
echo 1 - UP (pull + up -d)
echo 2 - DOWN
echo 3 - RESTART
echo 4 - STATUS (ps)
echo 5 - LOGS (Ctrl+C para sair)
echo 6 - BUILD
echo 7 - REBUILD (up -d --build)
echo 8 - APAGAR TUDO (down -v --rmi all)
echo 9 - SAIR
echo ==========================================
echo.

docker version >nul 2>&1
if errorlevel 1 (
  echo ERRO: Docker nao esta a responder. Abre o Docker Desktop.
  pause
  goto MENU
)

set "opt="
set /p opt=Escolhe uma opcao (1-9): 

if "%opt%"=="1" goto DO_UP
if "%opt%"=="2" goto DO_DOWN
if "%opt%"=="3" goto DO_RESTART
if "%opt%"=="4" goto DO_STATUS
if "%opt%"=="5" goto DO_LOGS
if "%opt%"=="6" goto DO_BUILD
if "%opt%"=="7" goto DO_REBUILD
if "%opt%"=="8" goto DO_CLEAN
if "%opt%"=="9" goto END

echo Opcao invalida.
pause
goto MENU

:DO_UP
echo --- PULL ---
docker compose -f "%COMPOSE_FILE%" %ENV_OPT% pull
echo --- UP ---
docker compose -f "%COMPOSE_FILE%" %ENV_OPT% up -d
pause
goto MENU

:DO_DOWN
docker compose -f "%COMPOSE_FILE%" %ENV_OPT% down
pause
goto MENU

:DO_RESTART
docker compose -f "%COMPOSE_FILE%" %ENV_OPT% down
docker compose -f "%COMPOSE_FILE%" %ENV_OPT% up -d
pause
goto MENU

:DO_STATUS
docker compose -f "%COMPOSE_FILE%" %ENV_OPT% ps
pause
goto MENU

:DO_LOGS
echo Ctrl+C para sair dos logs e voltar ao menu...
docker compose -f "%COMPOSE_FILE%" %ENV_OPT% logs -f --tail=200
pause
goto MENU

:DO_BUILD
docker compose -f "%COMPOSE_FILE%" %ENV_OPT% build
pause
goto MENU

:DO_REBUILD
docker compose -f "%COMPOSE_FILE%" %ENV_OPT% up -d --build
pause
goto MENU

:DO_CLEAN
echo ISTO APAGA containers + volumes + imagens do projeto.
set "c="
set /p c=Escreve SIM para confirmar: 
if /I not "%c%"=="SIM" goto MENU
docker compose -f "%COMPOSE_FILE%" %ENV_OPT% down -v --rmi all --remove-orphans
pause
goto MENU

:END
endlocal
exit /b 0
