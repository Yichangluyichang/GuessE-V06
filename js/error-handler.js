/**
 * 中国皇帝猜谜游戏 - 全局错误处理系统
 * 实现localStorage错误处理、数据损坏恢复机制和用户友好的错误信息
 */

/**
 * 错误类型枚举
 */
const ErrorTypes = {
    STORAGE_ERROR: 'storage_error',
    DATA_CORRUPTION: 'data_corruption',
    GAME_STATE_ERROR: 'game_state_error',
    NETWORK_ERROR: 'network_error',
    VALIDATION_ERROR: 'validation_error',
    INITIALIZATION_ERROR: 'initialization_error',
    UNKNOWN_ERROR: 'unknown_error'
};

/**
 * 错误严重程度枚举
 */
const ErrorSeverity = {
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high',
    CRITICAL: 'critical'
};

/**
 * 全局错误处理器类
 * 提供统一的错误处理、恢复机制和用户通知
 */
class ErrorHandler {
    constructor() {
        this.errorLog = [];
        this.maxLogSize = 100;
        this.useMemoryStorage = false;
        this.memoryStorage = new Map();
        this.isInitialized = false;
        
        // 错误处理策略映射
        this.errorStrategies = new Map([
            [ErrorTypes.STORAGE_ERROR, this.handleStorageError.bind(this)],
            [ErrorTypes.DATA_CORRUPTION, this.handleDataCorruption.bind(this)],
            [ErrorTypes.GAME_STATE_ERROR, this.handleGameStateError.bind(this)],
            [ErrorTypes.VALIDATION_ERROR, this.handleValidationError.bind(this)],
            [ErrorTypes.INITIALIZATION_ERROR, this.handleInitializationError.bind(this)],
            [ErrorTypes.UNKNOWN_ERROR, this.handleUnknownError.bind(this)]
        ]);
        
        // 绑定方法上下文
        this.init = this.init.bind(this);
        this.handleError = this.handleError.bind(this);
        this.setupGlobalErrorHandlers = this.setupGlobalErrorHandlers.bind(this);
    }
    
    /**
     * 初始化错误处理器
     * @returns {boolean} 初始化是否成功
     */
    init() {
        try {
            console.log('初始化全局错误处理器...');
            
            // 设置全局错误处理器
            this.setupGlobalErrorHandlers();
            
            // 检查localStorage可用性
            this.checkStorageAvailability();
            
            this.isInitialized = true;
            console.log('错误处理器初始化完成');
            return true;
            
        } catch (error) {
            console.error('错误处理器初始化失败:', error);
            return false;
        }
    }
    
    /**
     * 设置全局错误处理器
     */
    setupGlobalErrorHandlers() {
        // 捕获未处理的JavaScript错误
        window.addEventListener('error', (event) => {
            this.handleError({
                type: ErrorTypes.UNKNOWN_ERROR,
                severity: ErrorSeverity.HIGH,
                message: event.message,
                source: event.filename,
                line: event.lineno,
                column: event.colno,
                error: event.error,
                context: 'global_error_handler'
            });
        });
        
        // 捕获未处理的Promise拒绝
        window.addEventListener('unhandledrejection', (event) => {
            this.handleError({
                type: ErrorTypes.UNKNOWN_ERROR,
                severity: ErrorSeverity.HIGH,
                message: event.reason?.message || '未处理的Promise拒绝',
                error: event.reason,
                context: 'unhandled_promise_rejection'
            });
        });
        
        console.log('全局错误处理器已设置');
    }
    
    /**
     * 检查localStorage可用性
     */
    checkStorageAvailability() {
        try {
            const testKey = '__error_handler_test__';
            localStorage.setItem(testKey, 'test');
            localStorage.removeItem(testKey);
            this.useMemoryStorage = false;
            console.log('localStorage可用');
        } catch (error) {
            console.warn('localStorage不可用，启用内存存储模式');
            this.useMemoryStorage = true;
            this.handleStorageError({
                type: ErrorTypes.STORAGE_ERROR,
                severity: ErrorSeverity.MEDIUM,
                message: 'localStorage不可用',
                error: error,
                context: 'storage_availability_check'
            });
        }
    }
    
    /**
     * 主要错误处理方法
     * @param {Object} errorInfo - 错误信息对象
     */
    handleError(errorInfo) {
        try {
            // 记录错误
            this.logError(errorInfo);
            
            // 根据错误类型执行相应的处理策略
            const strategy = this.errorStrategies.get(errorInfo.type);
            if (strategy) {
                strategy(errorInfo);
            } else {
                this.handleUnknownError(errorInfo);
            }
            
        } catch (handlerError) {
            console.error('错误处理器本身发生错误:', handlerError);
            this.showCriticalError('系统错误处理失败，请刷新页面');
        }
    }
    
    /**
     * 记录错误到日志
     * @param {Object} errorInfo - 错误信息
     */
    logError(errorInfo) {
        const logEntry = {
            timestamp: new Date().toISOString(),
            ...errorInfo,
            userAgent: navigator.userAgent,
            url: window.location.href
        };
        
        this.errorLog.push(logEntry);
        
        // 限制日志大小
        if (this.errorLog.length > this.maxLogSize) {
            this.errorLog = this.errorLog.slice(-this.maxLogSize);
        }
        
        // 输出到控制台
        console.error('错误记录:', logEntry);
    }
    
    /**
     * 处理存储错误
     * @param {Object} errorInfo - 错误信息
     */
    handleStorageError(errorInfo) {
        console.warn('处理存储错误:', errorInfo.message);
        
        // 启用内存存储模式
        this.useMemoryStorage = true;
        
        // 通知用户
        this.showWarning('数据存储功能不可用，游戏数据将不会保存到本地。刷新页面后数据将丢失。');
        
        // 尝试恢复基本功能
        this.initializeMemoryStorage();
    }
    
    /**
     * 处理数据损坏错误
     * @param {Object} errorInfo - 错误信息
     */
    handleDataCorruption(errorInfo) {
        console.warn('处理数据损坏错误:', errorInfo.message);
        
        try {
            // 备份损坏的数据（如果可能）
            this.backupCorruptedData(errorInfo.corruptedData);
            
            // 清除损坏的数据
            this.clearCorruptedStorage();
            
            // 重置为默认数据
            this.resetToDefaults();
            
            // 通知用户
            this.showError('检测到数据损坏，已自动重置为默认数据。您的游戏进度可能会丢失。');
            
        } catch (recoveryError) {
            console.error('数据恢复失败:', recoveryError);
            this.showCriticalError('数据恢复失败，请清除浏览器数据后重新加载页面');
        }
    }
    
    /**
     * 处理游戏状态错误
     * @param {Object} errorInfo - 错误信息
     */
    handleGameStateError(errorInfo) {
        console.warn('处理游戏状态错误:', errorInfo.message);
        
        try {
            // 尝试修复状态
            const fixedState = this.attemptStateRepair(errorInfo.invalidState);
            
            if (fixedState) {
                console.log('游戏状态已修复');
                this.showInfo('游戏状态已自动修复');
                return fixedState;
            } else {
                // 无法修复，重置状态
                this.resetGameState();
                this.showInfo('游戏状态已重置，请重新开始游戏');
            }
            
        } catch (repairError) {
            console.error('状态修复失败:', repairError);
            this.resetGameState();
            this.showError('游戏状态修复失败，已重置游戏');
        }
    }
    
    /**
     * 处理验证错误
     * @param {Object} errorInfo - 错误信息
     */
    handleValidationError(errorInfo) {
        console.warn('处理验证错误:', errorInfo.message);
        
        // 根据验证错误的严重程度决定处理方式
        if (errorInfo.severity === ErrorSeverity.CRITICAL) {
            this.handleDataCorruption(errorInfo);
        } else {
            // 显示用户友好的错误信息
            const userMessage = this.getUserFriendlyMessage(errorInfo);
            this.showWarning(userMessage);
        }
    }
    
    /**
     * 处理初始化错误
     * @param {Object} errorInfo - 错误信息
     */
    handleInitializationError(errorInfo) {
        console.error('处理初始化错误:', errorInfo.message);
        
        // 尝试降级初始化
        try {
            this.attemptFallbackInitialization();
            this.showWarning('系统以降级模式启动，部分功能可能不可用');
        } catch (fallbackError) {
            console.error('降级初始化也失败:', fallbackError);
            this.showCriticalError('系统初始化失败，请刷新页面重试');
        }
    }
    
    /**
     * 处理未知错误
     * @param {Object} errorInfo - 错误信息
     */
    handleUnknownError(errorInfo) {
        console.error('处理未知错误:', errorInfo.message);
        
        // 记录详细信息用于调试
        this.logError({
            ...errorInfo,
            additionalInfo: {
                stack: errorInfo.error?.stack,
                timestamp: Date.now(),
                gameState: this.getGameStateSnapshot()
            }
        });
        
        // 显示通用错误信息
        this.showError('发生未知错误，如果问题持续存在，请刷新页面');
    }
    
    /**
     * 初始化内存存储
     */
    initializeMemoryStorage() {
        this.memoryStorage.clear();
        console.log('内存存储已初始化');
    }
    
    /**
     * 备份损坏的数据
     * @param {any} corruptedData - 损坏的数据
     */
    backupCorruptedData(corruptedData) {
        try {
            const backupKey = `corrupted_backup_${Date.now()}`;
            const backupData = {
                timestamp: new Date().toISOString(),
                data: corruptedData
            };
            
            if (this.useMemoryStorage) {
                this.memoryStorage.set(backupKey, backupData);
            } else {
                localStorage.setItem(backupKey, JSON.stringify(backupData));
            }
            
            console.log('损坏数据已备份:', backupKey);
        } catch (error) {
            console.error('备份损坏数据失败:', error);
        }
    }
    
    /**
     * 清除损坏的存储数据
     */
    clearCorruptedStorage() {
        try {
            const keysToRemove = [
                'chinese-emperor-game-data',
                'chinese-emperor-game-state'
            ];
            
            for (const key of keysToRemove) {
                if (this.useMemoryStorage) {
                    this.memoryStorage.delete(key);
                } else {
                    localStorage.removeItem(key);
                }
            }
            
            console.log('损坏的存储数据已清除');
        } catch (error) {
            console.error('清除损坏数据失败:', error);
        }
    }
    
    /**
     * 重置为默认数据
     */
    resetToDefaults() {
        try {
            // 触发默认数据重新初始化
            if (window.game && window.game.gameController) {
                window.game.gameController.database.clear();
                window.game.gameController.database.initializeDefaultData();
                window.game.gameController.stateManager.resetState();
            }
            
            console.log('已重置为默认数据');
        } catch (error) {
            console.error('重置默认数据失败:', error);
            throw error;
        }
    }
    
    /**
     * 尝试修复游戏状态
     * @param {any} invalidState - 无效的状态
     * @returns {Object|null} 修复后的状态，如果无法修复返回null
     */
    attemptStateRepair(invalidState) {
        if (!invalidState || typeof invalidState !== 'object') {
            return null;
        }
        
        try {
            // 创建基础状态
            const repairedState = window.GameTypes.createInitialGameState();
            
            // 尝试保留有效的数据
            if (typeof invalidState.totalScore === 'number' && invalidState.totalScore >= 0) {
                repairedState.totalScore = invalidState.totalScore;
            }
            
            if (typeof invalidState.currentRoundScore === 'number' && invalidState.currentRoundScore >= 0) {
                repairedState.currentRoundScore = Math.min(invalidState.currentRoundScore, 100);
            }
            
            if (Array.isArray(invalidState.wrongGuesses)) {
                repairedState.wrongGuesses = invalidState.wrongGuesses.filter(guess => 
                    typeof guess === 'string' && guess.trim() !== ''
                );
            }
            
            console.log('状态修复成功');
            return repairedState;
            
        } catch (error) {
            console.error('状态修复失败:', error);
            return null;
        }
    }
    
    /**
     * 重置游戏状态
     */
    resetGameState() {
        try {
            if (window.game && window.game.gameController && window.game.gameController.stateManager) {
                window.game.gameController.stateManager.resetState();
            }
            console.log('游戏状态已重置');
        } catch (error) {
            console.error('重置游戏状态失败:', error);
        }
    }
    
    /**
     * 尝试降级初始化
     */
    attemptFallbackInitialization() {
        // 启用内存存储模式
        this.useMemoryStorage = true;
        this.initializeMemoryStorage();
        
        // 禁用可能有问题的功能
        console.log('降级初始化完成');
    }
    
    /**
     * 获取用户友好的错误信息
     * @param {Object} errorInfo - 错误信息
     * @returns {string} 用户友好的错误信息
     */
    getUserFriendlyMessage(errorInfo) {
        const messageMap = {
            [ErrorTypes.STORAGE_ERROR]: '数据存储功能暂时不可用',
            [ErrorTypes.DATA_CORRUPTION]: '数据出现问题，已自动修复',
            [ErrorTypes.GAME_STATE_ERROR]: '游戏状态异常，已自动调整',
            [ErrorTypes.VALIDATION_ERROR]: '输入数据格式不正确',
            [ErrorTypes.INITIALIZATION_ERROR]: '系统初始化遇到问题',
            [ErrorTypes.UNKNOWN_ERROR]: '发生未知错误'
        };
        
        return messageMap[errorInfo.type] || '发生错误';
    }
    
    /**
     * 获取游戏状态快照（用于错误报告）
     * @returns {Object} 游戏状态快照
     */
    getGameStateSnapshot() {
        try {
            if (window.game && window.game.getAppInfo) {
                return window.game.getAppInfo();
            }
            return { error: '无法获取游戏状态' };
        } catch (error) {
            return { error: '获取状态快照失败' };
        }
    }
    
    /**
     * 显示成功消息
     * @param {string} message - 消息内容
     */
    showSuccess(message) {
        this.showNotification(message, 'success');
    }
    
    /**
     * 显示信息消息
     * @param {string} message - 消息内容
     */
    showInfo(message) {
        this.showNotification(message, 'info');
    }
    
    /**
     * 显示警告消息
     * @param {string} message - 消息内容
     */
    showWarning(message) {
        this.showNotification(message, 'warning');
    }
    
    /**
     * 显示错误消息
     * @param {string} message - 消息内容
     */
    showError(message) {
        this.showNotification(message, 'error');
    }
    
    /**
     * 显示严重错误消息
     * @param {string} message - 消息内容
     */
    showCriticalError(message) {
        this.showNotification(message, 'critical');
        
        // 严重错误时也显示浏览器原生对话框
        setTimeout(() => {
            alert('严重错误: ' + message);
        }, 100);
    }
    
    /**
     * 显示通知消息
     * @param {string} message - 消息内容
     * @param {string} type - 消息类型
     */
    showNotification(message, type = 'info') {
        try {
            // 尝试使用UI渲染器显示消息
            if (window.game && window.game.uiRenderer && window.game.uiRenderer.isInitialized) {
                switch (type) {
                    case 'success':
                        window.game.uiRenderer.showSuccess(message);
                        break;
                    case 'warning':
                        window.game.uiRenderer.showWarning(message);
                        break;
                    case 'error':
                    case 'critical':
                        window.game.uiRenderer.showError(message);
                        break;
                    default:
                        window.game.uiRenderer.showInfo(message);
                }
                return;
            }
        } catch (error) {
            console.error('使用UI渲染器显示消息失败:', error);
        }
        
        // 降级处理：创建简单的通知元素
        this.showFallbackNotification(message, type);
    }
    
    /**
     * 显示降级通知（直接操作DOM）
     * @param {string} message - 消息内容
     * @param {string} type - 消息类型
     */
    showFallbackNotification(message, type) {
        try {
            // 移除现有的错误通知
            const existingNotification = document.querySelector('.error-handler-notification');
            if (existingNotification) {
                existingNotification.remove();
            }
            
            // 创建通知元素
            const notification = document.createElement('div');
            notification.className = 'error-handler-notification';
            
            // 设置样式
            const colors = {
                success: { bg: '#4CAF50', text: 'white' },
                info: { bg: '#2196F3', text: 'white' },
                warning: { bg: '#FF9800', text: 'white' },
                error: { bg: '#F44336', text: 'white' },
                critical: { bg: '#D32F2F', text: 'white' }
            };
            
            const color = colors[type] || colors.info;
            
            notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: ${color.bg};
                color: ${color.text};
                padding: 16px 20px;
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.3);
                z-index: 10000;
                max-width: 400px;
                font-family: Arial, sans-serif;
                font-size: 14px;
                line-height: 1.4;
                word-wrap: break-word;
            `;
            
            notification.textContent = message;
            
            // 添加到页面
            document.body.appendChild(notification);
            
            // 自动移除（严重错误除外）
            if (type !== 'critical') {
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.remove();
                    }
                }, type === 'error' ? 8000 : 5000);
            }
            
        } catch (error) {
            console.error('显示降级通知失败:', error);
            // 最后的降级：使用console和alert
            console.log(`${type.toUpperCase()}: ${message}`);
            if (type === 'critical' || type === 'error') {
                alert(message);
            }
        }
    }
    
    /**
     * 获取错误日志
     * @param {number} limit - 返回的日志条数限制
     * @returns {Array} 错误日志数组
     */
    getErrorLog(limit = 10) {
        return this.errorLog.slice(-limit);
    }
    
    /**
     * 清除错误日志
     */
    clearErrorLog() {
        this.errorLog = [];
        console.log('错误日志已清除');
    }
    
    /**
     * 获取错误处理器状态
     * @returns {Object} 状态信息
     */
    getStatus() {
        return {
            isInitialized: this.isInitialized,
            useMemoryStorage: this.useMemoryStorage,
            errorLogSize: this.errorLog.length,
            memoryStorageSize: this.memoryStorage.size
        };
    }
}

// 导出到全局作用域
window.ErrorHandler = ErrorHandler;
window.ErrorTypes = ErrorTypes;
window.ErrorSeverity = ErrorSeverity;