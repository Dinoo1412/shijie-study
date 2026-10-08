@echo off
chcp 65001 >nul
cd /d "%~dp0"
python --version >nul 2>&1
if errorlevel 1 (
  py server.py --open
) else (
  python server.py --open
)
if errorlevel 1 (
  echo 启动失败。请确认已安装 Python 3，或直接双击 index.html 打开学习页面。
  pause
)
