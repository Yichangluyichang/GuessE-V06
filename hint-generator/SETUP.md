# 快速设置指南

## 第一步：创建配置文件

在 `hint-generator` 文件夹中，复制 `config.example.js` 为 `config.js`：

**Windows 命令行：**
```cmd
cd hint-generator
copy config.example.js config.js
```

**或者手动操作：**
1. 右键点击 `config.example.js`
2. 选择"复制"
3. 在同一文件夹中粘贴
4. 重命名为 `config.js`

## 第二步：获取 Google Gemini API Key

1. 打开浏览器，访问：https://makersuite.google.com/app/apikey
2. 使用你的 Google 账号登录
3. 点击 "Create API Key" 按钮
4. 选择一个项目（或创建新项目）
5. 复制生成的 API Key（类似：AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX）

⚠️ **重要**：请妥善保管这个 API Key，不要分享给他人！

## 第三步：编辑配置文件

用文本编辑器（记事本、VS Code 等）打开 `config.js`，修改以下内容：

```javascript
const CONFIG = {
    // 1. 设置你的管理员密码（用于登录工具）
    ADMIN_PASSWORD: "your-password-here",  // 改成你想要的密码
    
    // 2. 粘贴你的 Gemini API Key
    GEMINI_API_KEY: "your-gemini-api-key-here",  // 粘贴刚才复制的 API Key
    
    // 3. Firebase 配置已经填好，不需要修改
    FIREBASE_CONFIG: { ... }
};
```

**示例：**
```javascript
const CONFIG = {
    ADMIN_PASSWORD: "mySecretPassword123",
    GEMINI_API_KEY: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    FIREBASE_CONFIG: { ... }
};
```

保存文件。

## 第四步：运行工具

1. 在文件管理器中找到 `hint-generator` 文件夹
2. 双击 `index.html` 文件
3. 浏览器会自动打开工具
4. 输入你在配置文件中设置的密码
5. 点击"登录"

## 第五步：开始使用

登录成功后，你会看到4个标签页：

1. **生成新皇帝** - 输入皇帝名称，AI 自动生成完整数据
2. **添加提示词** - 为已有皇帝添加新的提示词
3. **评估提示词** - AI 评估提示词质量并提供改进建议
4. **编辑管理** - 手动编辑和管理提示词

## 常见问题

### Q: 我忘记密码了怎么办？
A: 打开 `config.js` 文件，查看或修改 `ADMIN_PASSWORD` 的值。

### Q: API Key 在哪里找？
A: 访问 https://makersuite.google.com/app/apikey，登录后可以看到你的 API Key。

### Q: 工具无法打开怎么办？
A: 确保：
1. `config.js` 文件存在
2. 配置文件格式正确（没有语法错误）
3. 使用现代浏览器（Chrome、Edge、Firefox）

### Q: AI 生成失败怎么办？
A: 检查：
1. API Key 是否正确
2. 网络连接是否正常
3. 是否超过 API 使用限制（每分钟15次）

### Q: 如何查看错误信息？
A: 按 F12 打开浏览器开发者工具，查看"控制台"标签页的错误信息。

## 安全提醒

⚠️ **永远不要将 config.js 上传到 GitHub 或分享给他人！**

这个文件包含：
- 你的管理员密码
- 你的 Google API Key

如果不小心泄露了 API Key：
1. 立即访问 https://makersuite.google.com/app/apikey
2. 删除泄露的 API Key
3. 创建新的 API Key
4. 更新 config.js 文件

## 需要帮助？

如果遇到问题：
1. 检查浏览器控制台的错误信息（按 F12）
2. 确认配置文件格式正确
3. 确认网络连接正常
4. 确认 API Key 有效

---

设置完成！现在你可以开始使用皇帝提示词生成器了。🎉
