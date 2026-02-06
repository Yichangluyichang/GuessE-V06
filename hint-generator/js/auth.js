/**
 * 认证模块
 * 处理密码验证和登录逻辑
 */

class AuthManager {
    constructor() {
        this.isAuthenticated = false;
        this.init();
    }

    /**
     * 初始化认证管理器
     */
    init() {
        this.bindEvents();
    }

    /**
     * 绑定事件
     */
    bindEvents() {
        const loginBtn = document.getElementById('login-btn');
        const passwordInput = document.getElementById('password-input');
        const logoutBtn = document.getElementById('logout-btn');

        if (loginBtn) {
            loginBtn.addEventListener('click', () => this.handleLogin());
        }

        if (passwordInput) {
            passwordInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.handleLogin();
                }
            });
        }

        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => this.handleLogout());
        }
    }

    /**
     * 处理登录
     */
    handleLogin() {
        const passwordInput = document.getElementById('password-input');
        const errorDiv = document.getElementById('login-error');
        const password = passwordInput.value;

        console.log('尝试登录，输入密码长度:', password.length);
        console.log('配置的密码:', CONFIG.ADMIN_PASSWORD);
        console.log('密码匹配:', password === CONFIG.ADMIN_PASSWORD);

        // 验证密码
        if (this.validatePassword(password)) {
            console.log('密码验证通过，切换到应用界面');
            this.isAuthenticated = true;
            this.showAppScreen();
            passwordInput.value = '';
            if (errorDiv) {
                errorDiv.style.display = 'none';
            }
        } else {
            console.log('密码验证失败');
            this.isAuthenticated = false;
            if (errorDiv) {
                errorDiv.textContent = '密码错误，请重试';
                errorDiv.style.display = 'block';
            }
            passwordInput.value = '';
            passwordInput.focus();
        }
    }

    /**
     * 验证密码
     * @param {string} password - 输入的密码
     * @returns {boolean} 密码是否正确
     */
    validatePassword(password) {
        // 从配置文件获取密码
        if (typeof CONFIG === 'undefined' || !CONFIG.ADMIN_PASSWORD) {
            console.error('配置文件未加载或密码未设置');
            return false;
        }

        return password === CONFIG.ADMIN_PASSWORD;
    }

    /**
     * 显示应用界面
     */
    showAppScreen() {
        const loginScreen = document.getElementById('login-screen');
        const appScreen = document.getElementById('app-screen');

        if (loginScreen) {
            loginScreen.classList.remove('active');
        }

        if (appScreen) {
            appScreen.classList.add('active');
        }
    }

    /**
     * 处理登出
     */
    handleLogout() {
        this.isAuthenticated = false;
        const loginScreen = document.getElementById('login-screen');
        const appScreen = document.getElementById('app-screen');

        if (appScreen) {
            appScreen.classList.remove('active');
        }

        if (loginScreen) {
            loginScreen.classList.add('active');
        }

        // 清空密码输入框
        const passwordInput = document.getElementById('password-input');
        if (passwordInput) {
            passwordInput.value = '';
        }
    }

    /**
     * 检查是否已认证
     * @returns {boolean} 是否已认证
     */
    checkAuth() {
        return this.isAuthenticated;
    }
}

// 导出到全局作用域
if (typeof window !== 'undefined') {
    window.AuthManager = AuthManager;
}
