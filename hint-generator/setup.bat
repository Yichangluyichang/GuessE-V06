@echo off
chcp 65001 >nul
echo ========================================
echo 皇帝提示词生成器 - 快速设置
echo ========================================
echo.

REM 检查 config.js 是否已存在
if exist config.js (
    echo [警告] config.js 已存在！
    echo.
    set /p overwrite="是否要覆盖现有配置？(Y/N): "
    if /i not "%overwrite%"=="Y" (
        echo 设置已取消。
        pause
        exit /b
    )
)

REM 复制配置文件
echo [1/3] 正在创建配置文件...
copy config.example.js config.js >nul
if errorlevel 1 (
    echo [错误] 无法创建配置文件！
    pause
    exit /b 1
)
echo [✓] 配置文件创建成功！
echo.

REM 提示用户输入密码
echo [2/3] 设置管理员密码
set /p password="请输入管理员密码: "
if "%password%"=="" (
    echo [错误] 密码不能为空！
    pause
    exit /b 1
)
echo.

REM 提示用户输入 API Key
echo [3/3] 设置 Gemini API Key
echo.
echo 如何获取 API Key：
echo 1. 访问 https://makersuite.google.com/app/apikey
echo 2. 登录 Google 账号
echo 3. 点击 "Create API Key"
echo 4. 复制生成的 API Key
echo.
set /p apikey="请粘贴你的 Gemini API Key: "
if "%apikey%"=="" (
    echo [错误] API Key 不能为空！
    pause
    exit /b 1
)
echo.

REM 使用 PowerShell 更新配置文件
echo [处理中] 正在更新配置文件...
powershell -Command "(Get-Content config.js) -replace 'your-password-here', '%password%' | Set-Content config.js"
powershell -Command "(Get-Content config.js) -replace 'your-gemini-api-key-here', '%apikey%' | Set-Content config.js"

echo.
echo ========================================
echo [✓] 设置完成！
echo ========================================
echo.
echo 你的配置：
echo - 管理员密码: %password%
echo - API Key: %apikey:~0,20%...
echo.
echo ⚠️ 重要提醒：
echo 1. 请妥善保管你的密码和 API Key
echo 2. 不要将 config.js 上传到 GitHub
echo 3. 不要分享给他人
echo.
echo 下一步：
echo 1. 双击 index.html 打开工具
echo 2. 使用你设置的密码登录
echo.
pause
