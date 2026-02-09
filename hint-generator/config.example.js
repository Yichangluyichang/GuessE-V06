/**
 * 配置文件示例
 * 
 * ⚠️ 重要：config.js 已被添加到 .gitignore，永远不会被上传到 GitHub
 * 
 * 使用步骤：
 * 1. 复制此文件并重命名为 config.js
 * 2. 填入你的实际密码和 API Key
 * 3. 保存文件
 * 4. 在浏览器中打开 index.html
 */

const CONFIG = {
    // 管理员密码 - 用于登录工具
    ADMIN_PASSWORD: "your-password-here",
    
    // AI 服务配置 - 按优先级排序
    // 系统会自动从第一个开始尝试，失败后切换到下一个
    
    // DeepSeek API Key - 推荐优先使用（免费额度大，中文好）
    // 获取地址：https://platform.deepseek.com/
    DEEPSEEK_API_KEY: "your-deepseek-api-key-here",
    
    // Google Gemini API Key - 备用方案
    // 获取地址：https://makersuite.google.com/app/apikey
    GEMINI_API_KEY: "your-gemini-api-key-here",
    
    // Firebase 配置 - 用于云端数据存储
    FIREBASE_CONFIG: {
        apiKey: "AIzaSyDZiE27_pWzxTRtNFTNMA54xNBXXof3DXE",
        authDomain: "guesse-81748.firebaseapp.com",
        databaseURL: "https://guesse-81748-default-rtdb.asia-southeast1.firebasedatabase.app",
        projectId: "guesse-81748",
        storageBucket: "guesse-81748.firebasestorage.app",
        messagingSenderId: "706697908529",
        appId: "1:706697908529:web:22467cbd8e398ad51ce010",
        measurementId: "G-32L5V7RWKP"
    }
};
