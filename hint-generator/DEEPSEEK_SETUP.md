# DeepSeek API 配置指南

## 🎯 为什么使用 DeepSeek？

- ✅ **免费额度大**: 每天500万tokens（是Gemini的10倍+）
- ✅ **中文优秀**: 专门优化过中文，历史知识准确
- ✅ **速度快**: 响应速度快，质量高
- ✅ **完全免费**: 个人使用完全免费

## 📝 配置步骤

### 1. 获取 DeepSeek API Key

1. 访问：https://platform.deepseek.com/
2. 点击右上角"注册/登录"
3. 使用手机号或邮箱注册
4. 登录后进入"API Keys"页面
5. 点击"创建新密钥"
6. 复制API Key（格式：`sk-xxxxxxxxxxxxxxxx`）

### 2. 配置到项目中

1. 打开 `hint-generator/config.js` 文件
2. 找到 `DEEPSEEK_API_KEY` 配置项
3. 将你的API Key粘贴进去：

```javascript
const CONFIG = {
    ADMIN_PASSWORD: "your-password",
    
    // DeepSeek API Key（优先使用）
    DEEPSEEK_API_KEY: "sk-xxxxxxxxxxxxxxxx",  // 👈 粘贴你的API Key
    
    // Gemini API Key（备用）
    GEMINI_API_KEY: "your-gemini-key",
    
    // ... 其他配置
};
```

4. 保存文件

### 3. 测试

1. 刷新 `hint-generator/index.html` 页面
2. 登录后查看右上角"当前模型"
3. 应该显示：**DeepSeek V3（中文优化，免费额度大）**
4. 尝试生成或评估提示词

## 🔄 自动切换机制

系统会按以下优先级自动切换：

1. **DeepSeek** - 优先使用（免费额度大）
2. **Gemini 2.0 Flash** - DeepSeek失败时切换
3. **Gemini 1.5 Pro** - 继续备用
4. **Gemini 1.5 Flash** - 最后备用

当某个服务失败时，会自动切换到下一个可用服务。

## ❓ 常见问题

### Q: DeepSeek 和 Gemini 哪个更好？

**对于中国历史内容：**
- DeepSeek 更好 - 中文优化，历史知识准确
- 免费额度更大（500万 vs 50万tokens/天）

**建议配置：**
- 主力使用 DeepSeek
- 保留 Gemini 作为备份

### Q: 如何查看当前使用的服务？

查看页面右上角的"当前模型"显示。

### Q: 如果DeepSeek配额用完了怎么办？

系统会自动切换到Gemini，无需手动操作。

### Q: 可以只用DeepSeek吗？

可以！只配置 `DEEPSEEK_API_KEY`，不配置 `GEMINI_API_KEY` 即可。

## 📊 API 额度对比

| 服务 | 免费额度 | 中文能力 | 历史知识 | 推荐度 |
|------|---------|---------|---------|--------|
| DeepSeek | 500万tokens/天 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| Gemini | 50万tokens/天 | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ |

## 🎉 完成！

配置完成后，你就可以享受更大的免费额度和更好的中文支持了！
