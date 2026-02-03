/**
 * 中国皇帝猜谜游戏 - 菜单导航管理器
 * 处理返回主菜单功能，包括确认对话框和完全状态重置
 * 需求: 12.4, 12.5, 12.6, 12.7
 */

/**
 * 菜单导航管理器类
 * 管理返回主菜单的确认对话框和状态重置功能
 */
class MenuNavigationManager {
    constructor() {
        // DOM 元素缓存
        this.elements = {};
        
        // 状态
        this.isInitialized = false;
        this.isConfirmationVisible = false;
        
        // 回调函数
        this.callbacks = {
            onReturnToMenu: null,
            onResetGameState: null
        };
        
        // 绑定方法上下文
        this.init = this.init.bind(this);
        this.showReturnToMenuConfirmation = this.showReturnToMenuConfirmation.bind(this);
        this.handleReturnToMenuConfirm = this.handleReturnToMenuConfirm.bind(this);
        this.handleReturnToMenuCancel = this.handleReturnToMenuCancel.bind(this);
        this.resetGameStateCompletely = this.resetGameStateCompletely.bind(this);
        this.returnToStartScreen = this.returnToStartScreen.bind(this);
    }
    
    /**
     * 初始化菜单导航管理器
     * @param {Object} callbacks - 回调函数
     * @returns {boolean} 初始化是否成功
     */
    init(callbacks = {}) {
        try {
            console.log('初始化菜单导航管理器...');
            
            // 设置回调函数
            this.callbacks = { ...this.callbacks, ...callbacks };
            
            // 缓存DOM元素
            this.cacheElements();
            
            // 绑定事件监听器
            this.bindEvents();
            
            this.isInitialized = true;
            console.log('菜单导航管理器初始化完成');
            return true;
            
        } catch (error) {
            console.error('菜单导航管理器初始化失败:', error);
            this.isInitialized = false;
            return false;
        }
    }
    
    /**
     * 缓存DOM元素引用
     */
    cacheElements() {
        const elementIds = [
            // 确认对话框相关元素
            'return-to-menu-modal',
            'return-to-menu-confirm-btn',
            'return-to-menu-cancel-btn',
            'modal-overlay',
            
            // 返回主菜单按钮（在各个界面中）
            'return-to-menu-game-btn',
            'return-to-menu-result-btn', 
            'return-to-menu-history-btn'
        ];
        
        for (const id of elementIds) {
            const element = document.getElementById(id);
            if (!element) {
                // 某些元素可能不存在，这是正常的（会在后续创建）
                console.warn(`DOM元素不存在: ${id}`);
                continue;
            }
            this.elements[id] = element;
        }
    }
    
    /**
     * 绑定事件监听器
     */
    bindEvents() {
        // 确认对话框按钮事件
        if (this.elements['return-to-menu-confirm-btn']) {
            this.elements['return-to-menu-confirm-btn'].addEventListener('click', this.handleReturnToMenuConfirm);
        }
        
        if (this.elements['return-to-menu-cancel-btn']) {
            this.elements['return-to-menu-cancel-btn'].addEventListener('click', this.handleReturnToMenuCancel);
        }
        
        // 模态框背景点击关闭
        if (this.elements['modal-overlay']) {
            this.elements['modal-overlay'].addEventListener('click', (e) => {
                if (e.target === this.elements['modal-overlay']) {
                    this.handleReturnToMenuCancel();
                }
            });
        }
        
        // 返回主菜单按钮事件（在各个界面中）
        if (this.elements['return-to-menu-game-btn']) {
            this.elements['return-to-menu-game-btn'].addEventListener('click', this.showReturnToMenuConfirmation);
        }
        
        if (this.elements['return-to-menu-result-btn']) {
            this.elements['return-to-menu-result-btn'].addEventListener('click', this.showReturnToMenuConfirmation);
        }
        
        if (this.elements['return-to-menu-history-btn']) {
            this.elements['return-to-menu-history-btn'].addEventListener('click', this.showReturnToMenuConfirmation);
        }
        
        // ESC键关闭确认对话框
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isConfirmationVisible) {
                this.handleReturnToMenuCancel();
            }
        });
    }
    
    /**
     * 显示返回主菜单确认对话框
     * 需求: 12.4 - 显示确认对话框询问是否确定退出当前游戏
     */
    showReturnToMenuConfirmation() {
        console.log('显示返回主菜单确认对话框');
        
        if (!this.isInitialized) {
            console.error('菜单导航管理器未初始化');
            return;
        }
        
        try {
            // 创建确认对话框（如果不存在）
            this.createConfirmationModal();
            
            // 显示模态框
            const modal = this.elements['return-to-menu-modal'];
            const overlay = this.elements['modal-overlay'];
            
            if (modal && overlay) {
                overlay.style.display = 'flex';
                modal.style.display = 'block';
                
                // 添加显示动画
                setTimeout(() => {
                    overlay.classList.add('show');
                    modal.classList.add('show');
                }, 10);
                
                this.isConfirmationVisible = true;
                
                // 聚焦到取消按钮（默认安全选项）
                if (this.elements['return-to-menu-cancel-btn']) {
                    this.elements['return-to-menu-cancel-btn'].focus();
                }
            }
            
        } catch (error) {
            console.error('显示确认对话框失败:', error);
        }
    }
    
    /**
     * 处理确认返回主菜单
     * 需求: 12.5, 12.7 - 返回到开始界面并完全重置游戏状态
     * @returns {ReturnToMenuResult} 返回主菜单结果
     */
    handleReturnToMenuConfirm() {
        console.log('确认返回主菜单');
        
        try {
            // 隐藏确认对话框
            this.hideConfirmationModal();
            
            // 完全重置游戏状态
            const resetSuccess = this.resetGameStateCompletely();
            
            // 返回到开始界面
            const returnSuccess = this.returnToStartScreen();
            
            // 执行回调
            if (this.callbacks.onReturnToMenu) {
                this.callbacks.onReturnToMenu();
            }
            
            const result = {
                confirmed: true,
                gameStateReset: resetSuccess,
                returnedToStart: returnSuccess
            };
            
            console.log('返回主菜单完成', result);
            return result;
            
        } catch (error) {
            console.error('返回主菜单失败:', error);
            return {
                confirmed: true,
                gameStateReset: false,
                returnedToStart: false,
                error: error.message
            };
        }
    }
    
    /**
     * 处理取消返回主菜单
     * 需求: 12.6 - 关闭对话框并保持当前游戏状态不变
     */
    handleReturnToMenuCancel() {
        console.log('取消返回主菜单');
        
        try {
            // 隐藏确认对话框
            this.hideConfirmationModal();
            
            // 游戏状态保持不变，不需要额外操作
            
        } catch (error) {
            console.error('取消返回主菜单失败:', error);
        }
    }
    
    /**
     * 完全重置游戏状态
     * 需求: 12.5, 12.7 - 清空所有游戏数据包括当前游戏进度和累计分数
     * @returns {boolean} 重置是否成功
     */
    resetGameStateCompletely() {
        console.log('完全重置游戏状态...');
        
        try {
            // 清空localStorage中的游戏数据
            const gameDataKeys = [
                'gameState',
                'scoreHistory',
                'hintHistory',
                'currentGameSession'
            ];
            
            for (const key of gameDataKeys) {
                try {
                    localStorage.removeItem(key);
                } catch (storageError) {
                    console.warn(`清空localStorage键失败: ${key}`, storageError);
                }
            }
            
            // 执行重置回调
            if (this.callbacks.onResetGameState) {
                this.callbacks.onResetGameState();
            }
            
            console.log('游戏状态完全重置完成');
            return true;
            
        } catch (error) {
            console.error('重置游戏状态失败:', error);
            return false;
        }
    }
    
    /**
     * 返回到开始界面
     * 需求: 12.5 - 返回到开始界面
     * @returns {boolean} 返回是否成功
     */
    returnToStartScreen() {
        console.log('返回到开始界面...');
        
        try {
            // 隐藏所有屏幕
            const screens = document.querySelectorAll('.screen');
            screens.forEach(screen => screen.classList.remove('active'));
            
            // 显示开始屏幕
            const startScreen = document.getElementById('start-screen');
            if (startScreen) {
                startScreen.classList.add('active');
            }
            
            // 重置分数显示
            const currentScoreElement = document.getElementById('current-score');
            const totalScoreElement = document.getElementById('total-score');
            
            if (currentScoreElement) {
                currentScoreElement.textContent = '100';
            }
            
            if (totalScoreElement) {
                totalScoreElement.textContent = '0';
            }
            
            // 清空输入框
            const guessInput = document.getElementById('guess-input');
            if (guessInput) {
                guessInput.value = '';
            }
            
            // 清空错误猜测列表
            const wrongList = document.getElementById('wrong-list');
            if (wrongList) {
                wrongList.innerHTML = '';
            }
            
            console.log('已返回到开始界面');
            return true;
            
        } catch (error) {
            console.error('返回开始界面失败:', error);
            return false;
        }
    }
    
    /**
     * 创建确认对话框模态框
     */
    createConfirmationModal() {
        // 检查是否已存在
        if (this.elements['return-to-menu-modal']) {
            return;
        }
        
        // 创建模态框背景
        const overlay = document.createElement('div');
        overlay.id = 'modal-overlay';
        overlay.className = 'modal-overlay';
        overlay.style.display = 'none';
        
        // 创建确认对话框
        const modal = document.createElement('div');
        modal.id = 'return-to-menu-modal';
        modal.className = 'confirmation-modal';
        modal.style.display = 'none';
        
        modal.innerHTML = `
            <div class="modal-header">
                <h3>确认返回主菜单</h3>
            </div>
            <div class="modal-body">
                <p>您确定要返回主菜单吗？</p>
                <p class="warning-text">当前游戏进度和累计分数将会丢失！</p>
            </div>
            <div class="modal-footer">
                <button id="return-to-menu-cancel-btn" class="secondary-btn">取消</button>
                <button id="return-to-menu-confirm-btn" class="primary-btn danger">确定返回</button>
            </div>
        `;
        
        // 添加到页面
        overlay.appendChild(modal);
        document.body.appendChild(overlay);
        
        // 更新元素缓存
        this.elements['modal-overlay'] = overlay;
        this.elements['return-to-menu-modal'] = modal;
        this.elements['return-to-menu-confirm-btn'] = document.getElementById('return-to-menu-confirm-btn');
        this.elements['return-to-menu-cancel-btn'] = document.getElementById('return-to-menu-cancel-btn');
        
        // 重新绑定事件
        this.bindEvents();
    }
    
    /**
     * 隐藏确认对话框
     */
    hideConfirmationModal() {
        const modal = this.elements['return-to-menu-modal'];
        const overlay = this.elements['modal-overlay'];
        
        if (modal && overlay) {
            // 添加隐藏动画
            overlay.classList.remove('show');
            modal.classList.remove('show');
            
            // 延迟隐藏
            setTimeout(() => {
                overlay.style.display = 'none';
                modal.style.display = 'none';
            }, 300);
        }
        
        this.isConfirmationVisible = false;
    }
    
    /**
     * 设置回调函数
     * @param {Object} callbacks - 回调函数对象
     */
    setCallbacks(callbacks) {
        this.callbacks = { ...this.callbacks, ...callbacks };
    }
    
    /**
     * 获取当前状态
     * @returns {Object} 当前状态信息
     */
    getCurrentState() {
        return {
            isInitialized: this.isInitialized,
            isConfirmationVisible: this.isConfirmationVisible
        };
    }
    
    /**
     * 清理资源
     */
    destroy() {
        // 移除事件监听器
        if (this.isInitialized) {
            // 移除确认对话框相关事件
            if (this.elements['return-to-menu-confirm-btn']) {
                this.elements['return-to-menu-confirm-btn'].removeEventListener('click', this.handleReturnToMenuConfirm);
            }
            
            if (this.elements['return-to-menu-cancel-btn']) {
                this.elements['return-to-menu-cancel-btn'].removeEventListener('click', this.handleReturnToMenuCancel);
            }
            
            // 移除返回主菜单按钮事件
            if (this.elements['return-to-menu-game-btn']) {
                this.elements['return-to-menu-game-btn'].removeEventListener('click', this.showReturnToMenuConfirmation);
            }
            
            if (this.elements['return-to-menu-result-btn']) {
                this.elements['return-to-menu-result-btn'].removeEventListener('click', this.showReturnToMenuConfirmation);
            }
            
            if (this.elements['return-to-menu-history-btn']) {
                this.elements['return-to-menu-history-btn'].removeEventListener('click', this.showReturnToMenuConfirmation);
            }
        }
        
        // 移除模态框
        if (this.elements['modal-overlay']) {
            document.body.removeChild(this.elements['modal-overlay']);
        }
        
        // 清空引用
        this.elements = {};
        this.callbacks = {};
        this.isInitialized = false;
        
        console.log('菜单导航管理器已清理');
    }
}

// 导出到全局作用域
window.MenuNavigationManager = MenuNavigationManager;