/**
 * 中国皇帝猜谜游戏 - 管理员认证管理器
 * 处理管理员密码验证和会话管理
 */

/**
 * 管理员认证管理器类
 * 负责处理密码验证、会话管理和安全控制
 */
class AdminAuthManager {
    constructor() {
        // 管理员密码（在实际应用中应该使用更安全的方式存储）
        this.adminPassword = '46576255';
        
        // 会话管理
        this.sessionKey = 'admin_authenticated';
        this.sessionTimeout = 24 * 60 * 60 * 1000; // 24小时
        
        // DOM元素引用
        this.modal = null;
        this.passwordInput = null;
        this.errorMessage = null;
        this.confirmBtn = null;
        this.cancelBtn = null;
        this.toggleBtn = null;
        
        // 状态管理
        this.isAuthenticated = false;
        this.authenticationPromise = null;
        
        // 绑定方法上下文
        this.init = this.init.bind(this);
        this.showPasswordModal = this.showPasswordModal.bind(this);
        this.hidePasswordModal = this.hidePasswordModal.bind(this);
        this.handlePasswordSubmit = this.handlePasswordSubmit.bind(this);
        this.handlePasswordCancel = this.handlePasswordCancel.bind(this);
        this.togglePasswordVisibility = this.togglePasswordVisibility.bind(this);
        this.validatePassword = this.validatePassword.bind(this);
        this.setAuthenticated = this.setAuthenticated.bind(this);
        this.clearAuthentication = this.clearAuthentication.bind(this);
        this.checkAuthentication = this.checkAuthentication.bind(this);
        this.showError = this.showError.bind(this);
        this.clearError = this.clearError.bind(this);
    }
    
    /**
     * 初始化认证管理器
     */
    init() {
        console.log('初始化管理员认证管理器...');
        
        // 获取DOM元素
        this.modal = document.getElementById('admin-password-modal');
        this.passwordInput = document.getElementById('admin-password-input');
        this.errorMessage = document.getElementById('password-error-message');
        this.confirmBtn = document.getElementById('admin-password-confirm-btn');
        this.cancelBtn = document.getElementById('admin-password-cancel-btn');
        this.toggleBtn = document.getElementById('toggle-password-visibility');
        
        if (!this.modal || !this.passwordInput || !this.errorMessage || 
            !this.confirmBtn || !this.cancelBtn || !this.toggleBtn) {
            console.error('管理员认证模态框元素不完整');
            return false;
        }
        
        // 绑定事件监听器
        this.bindEvents();
        
        // 检查现有认证状态
        this.checkAuthentication();
        
        console.log('管理员认证管理器初始化完成');
        return true;
    }
    
    /**
     * 绑定事件监听器
     */
    bindEvents() {
        // 确认按钮
        this.confirmBtn.addEventListener('click', this.handlePasswordSubmit);
        
        // 取消按钮
        this.cancelBtn.addEventListener('click', this.handlePasswordCancel);
        
        // 密码可见性切换
        this.toggleBtn.addEventListener('click', this.togglePasswordVisibility);
        
        // 密码输入框事件
        this.passwordInput.addEventListener('input', this.clearError);
        this.passwordInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                this.handlePasswordSubmit();
            } else if (e.key === 'Escape') {
                e.preventDefault();
                this.handlePasswordCancel();
            }
        });
        
        // 模态框遮罩层点击关闭
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.handlePasswordCancel();
            }
        });
        
        // 全局键盘事件
        document.addEventListener('keydown', (e) => {
            if (this.modal.style.display !== 'none' && e.key === 'Escape') {
                this.handlePasswordCancel();
            }
        });
    }
    
    /**
     * 请求管理员认证
     * @returns {Promise<boolean>} 认证是否成功
     */
    async requestAuthentication() {
        console.log('请求管理员认证...');
        
        // 如果已经认证，直接返回成功
        if (this.isAuthenticated) {
            console.log('已经认证，直接允许访问');
            return true;
        }
        
        // 如果已经有认证请求在进行中，返回现有的Promise
        if (this.authenticationPromise) {
            console.log('认证请求已在进行中，等待结果...');
            return this.authenticationPromise;
        }
        
        // 创建新的认证Promise
        this.authenticationPromise = new Promise((resolve, reject) => {
            this.authenticationResolve = resolve;
            this.authenticationReject = reject;
        });
        
        // 显示密码输入模态框
        this.showPasswordModal();
        
        try {
            const result = await this.authenticationPromise;
            return result;
        } catch (error) {
            console.log('认证被取消或失败:', error);
            return false;
        } finally {
            this.authenticationPromise = null;
            this.authenticationResolve = null;
            this.authenticationReject = null;
        }
    }
    
    /**
     * 显示密码输入模态框
     */
    showPasswordModal() {
        console.log('显示密码输入模态框');
        
        // 重置表单状态
        this.passwordInput.value = '';
        this.passwordInput.type = 'password';
        this.toggleBtn.textContent = '👁️';
        this.clearError();
        
        // 显示模态框
        this.modal.style.display = 'flex';
        
        // 聚焦到密码输入框
        setTimeout(() => {
            this.passwordInput.focus();
        }, 100);
        
        // 添加显示动画类
        setTimeout(() => {
            this.modal.classList.add('show');
        }, 10);
    }
    
    /**
     * 隐藏密码输入模态框
     */
    hidePasswordModal() {
        console.log('隐藏密码输入模态框');
        
        // 移除显示动画类
        this.modal.classList.remove('show');
        
        // 延迟隐藏模态框
        setTimeout(() => {
            this.modal.style.display = 'none';
        }, 300);
    }
    
    /**
     * 处理密码提交
     */
    async handlePasswordSubmit() {
        console.log('处理密码提交...');
        
        const password = this.passwordInput.value.trim();
        
        if (!password) {
            this.showError('请输入密码');
            this.passwordInput.focus();
            return;
        }
        
        // 禁用按钮防止重复提交
        this.confirmBtn.disabled = true;
        this.confirmBtn.textContent = '验证中...';
        
        try {
            // 验证密码
            const isValid = await this.validatePassword(password);
            
            if (isValid) {
                console.log('密码验证成功');
                
                // 设置认证状态
                this.setAuthenticated();
                
                // 隐藏模态框
                this.hidePasswordModal();
                
                // 解析认证Promise
                if (this.authenticationResolve) {
                    this.authenticationResolve(true);
                }
                
                // 显示成功消息
                this.showSuccessMessage('认证成功，欢迎管理员！');
                
            } else {
                console.log('密码验证失败');
                
                // 显示错误
                this.showError('密码错误，请重试');
                
                // 添加错误动画
                this.passwordInput.classList.add('error');
                setTimeout(() => {
                    this.passwordInput.classList.remove('error');
                }, 500);
                
                // 清空密码输入框并聚焦
                this.passwordInput.value = '';
                this.passwordInput.focus();
            }
            
        } catch (error) {
            console.error('密码验证过程中发生错误:', error);
            this.showError('验证过程中发生错误，请重试');
            
        } finally {
            // 恢复按钮状态
            this.confirmBtn.disabled = false;
            this.confirmBtn.textContent = '确认';
        }
    }
    
    /**
     * 处理密码取消
     */
    handlePasswordCancel() {
        console.log('取消密码输入');
        
        // 隐藏模态框
        this.hidePasswordModal();
        
        // 拒绝认证Promise
        if (this.authenticationReject) {
            this.authenticationReject(new Error('用户取消认证'));
        }
    }
    
    /**
     * 切换密码可见性
     */
    togglePasswordVisibility() {
        if (this.passwordInput.type === 'password') {
            this.passwordInput.type = 'text';
            this.toggleBtn.textContent = '🙈';
            this.toggleBtn.title = '隐藏密码';
        } else {
            this.passwordInput.type = 'password';
            this.toggleBtn.textContent = '👁️';
            this.toggleBtn.title = '显示密码';
        }
    }
    
    /**
     * 验证密码
     * @param {string} password - 输入的密码
     * @returns {Promise<boolean>} 密码是否正确
     */
    async validatePassword(password) {
        // 模拟异步验证过程
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // 简单的密码比较（在实际应用中应该使用更安全的方式）
        return password === this.adminPassword;
    }
    
    /**
     * 设置认证状态
     */
    setAuthenticated() {
        console.log('设置认证状态为已认证');
        
        this.isAuthenticated = true;
        
        // 保存到会话存储
        const authData = {
            authenticated: true,
            timestamp: Date.now(),
            expires: Date.now() + this.sessionTimeout
        };
        
        try {
            sessionStorage.setItem(this.sessionKey, JSON.stringify(authData));
        } catch (error) {
            console.warn('无法保存认证状态到会话存储:', error);
        }
    }
    
    /**
     * 清除认证状态
     */
    clearAuthentication() {
        console.log('清除认证状态');
        
        this.isAuthenticated = false;
        
        // 从会话存储中移除
        try {
            sessionStorage.removeItem(this.sessionKey);
        } catch (error) {
            console.warn('无法从会话存储中移除认证状态:', error);
        }
    }
    
    /**
     * 检查认证状态
     * @returns {boolean} 是否已认证
     */
    checkAuthentication() {
        try {
            const authDataStr = sessionStorage.getItem(this.sessionKey);
            
            if (!authDataStr) {
                this.isAuthenticated = false;
                return false;
            }
            
            const authData = JSON.parse(authDataStr);
            
            // 检查是否过期
            if (Date.now() > authData.expires) {
                console.log('认证已过期，清除状态');
                this.clearAuthentication();
                return false;
            }
            
            // 认证仍然有效
            this.isAuthenticated = authData.authenticated === true;
            console.log('检查认证状态:', this.isAuthenticated ? '已认证' : '未认证');
            
            return this.isAuthenticated;
            
        } catch (error) {
            console.warn('检查认证状态时发生错误:', error);
            this.clearAuthentication();
            return false;
        }
    }
    
    /**
     * 显示错误消息
     * @param {string} message - 错误消息
     */
    showError(message) {
        this.errorMessage.textContent = message;
        this.errorMessage.style.display = 'block';
    }
    
    /**
     * 清除错误消息
     */
    clearError() {
        this.errorMessage.style.display = 'none';
        this.errorMessage.textContent = '';
    }
    
    /**
     * 显示成功消息
     * @param {string} message - 成功消息
     */
    showSuccessMessage(message) {
        // 创建临时成功消息元素
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.textContent = message;
        successDiv.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: linear-gradient(135deg, #27ae60 0%, #229954 100%);
            color: white;
            padding: 1rem 2rem;
            border-radius: 8px;
            font-weight: 600;
            z-index: 10001;
            box-shadow: 0 4px 15px rgba(39, 174, 96, 0.3);
            animation: messageSlideIn 0.3s ease-out;
        `;
        
        document.body.appendChild(successDiv);
        
        // 3秒后自动移除
        setTimeout(() => {
            if (successDiv.parentNode) {
                successDiv.style.opacity = '0';
                successDiv.style.transform = 'translateX(-50%) translateY(-20px)';
                setTimeout(() => {
                    successDiv.parentNode.removeChild(successDiv);
                }, 300);
            }
        }, 3000);
    }
    
    /**
     * 获取认证状态信息（用于调试）
     * @returns {Object} 认证状态信息
     */
    getAuthInfo() {
        return {
            isAuthenticated: this.isAuthenticated,
            hasSession: !!sessionStorage.getItem(this.sessionKey),
            sessionTimeout: this.sessionTimeout
        };
    }
    
    /**
     * 销毁认证管理器
     */
    destroy() {
        // 清除认证状态
        this.clearAuthentication();
        
        // 移除事件监听器
        if (this.confirmBtn) {
            this.confirmBtn.removeEventListener('click', this.handlePasswordSubmit);
        }
        
        if (this.cancelBtn) {
            this.cancelBtn.removeEventListener('click', this.handlePasswordCancel);
        }
        
        if (this.toggleBtn) {
            this.toggleBtn.removeEventListener('click', this.togglePasswordVisibility);
        }
        
        if (this.passwordInput) {
            this.passwordInput.removeEventListener('input', this.clearError);
        }
        
        // 清空引用
        this.modal = null;
        this.passwordInput = null;
        this.errorMessage = null;
        this.confirmBtn = null;
        this.cancelBtn = null;
        this.toggleBtn = null;
        
        console.log('管理员认证管理器已销毁');
    }
}

// 将类暴露到全局作用域
window.AdminAuthManager = AdminAuthManager;