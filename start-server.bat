@echo off
echo ====================================
echo 부스트웹 개발 서버 시작
echo ====================================
echo.

REM 현재 디렉토리 확인
cd /d "%~dp0"

REM node_modules 확인
if not exist "node_modules" (
    echo node_modules가 없습니다. 의존성을 설치합니다...
    call npm install
    echo.
)

REM 개발 서버 실행
echo 개발 서버를 시작합니다...
echo 브라우저가 자동으로 열립니다.
echo.
echo 서버를 중지하려면 Ctrl+C를 누르세요.
echo.

call npm run dev

pause

