/**
 * 中国皇帝猜谜游戏 - 游戏状态管理器
 * 负责游戏状态的保存、加载和更新，支持页面刷新后状态恢复
 * 需求: 8.1, 8.2, 8.3, 8.4
 */

/**
 * 游戏状态管理器类
 * 管理游戏的当前状态，包括保存、加载和更新功能
 */
class GameStateManager {
    constructor() {
        this.storageKey = 'chinese-emperor-game-state';
        this.currentState = null;
        this.isStorageAvailable = this.checkStorageAvailability();
        
        // 初始化状态
        this.initializeState();
    }
    
    /**
     * 检查localStorage是否可用
     * @returns {boolean} 是否可用
     */
    checkStorageAvailability() {
        try {
            const testKey = '__storage_test__';
            localStorage.setItem(testKey, 'test');
            localStorage.removeItem(testKey);
            return true;
        } catch (error) {
            console.warn('localStorage不可用，将使用内存存储:', error);
            this.handleStorageError('localStorage不可用: ' + error.message);
            return false;
        }
    }
    
    /**
     * 初始化游戏状态
     * 尝试从存储中加载状态，如果失败则创建新状态
     */
    initializeState() {
        try {
            const savedState = this.loadState();
            if (savedState && this.validateGameState(savedState)) {
                this.currentState = savedState;
                console.log('已加载保存的游戏状态');
            } else {
                this.currentState = window.GameTypes.createInitialGameState();
                console.log('创建新的游戏状态');
            }
        } catch (error) {
            console.error('初始化游戏状态失败:', error);
            this.currentState = window.GameTypes.createInitialGameState();
        }
    }
    
    /**
     * 获取当前游戏状态
     * @returns {GameState} 当前游戏状态的深拷贝
     */
    getCurrentState() {
        return window.GameTypes.deepClone(this.currentState);
    }
    
    /**
     * 更新游戏状态
     * @param {Partial<GameState>} newState - 要更新的状态部分
     * @returns {GameState} 更新后的状态
     */
    updateState(newState) {
        if (!newState || typeof newState !== 'object') {
            throw new Error('无效的状态更新数据');
        }
        
        // 合并新状态到当前状态
        const updatedState = {
            ...this.currentState,
            ...newState
        };
        
        // 验证更新后的状态
        if (!this.validateGameState(updatedState)) {
            throw new Error('状态更新后验证失败');
        }
        
        this.currentState = updatedState;
        
        // 自动保存状态
        this.saveState();
        
        return window.GameTypes.deepClone(this.currentState);
    }
    
    /**
     * 保存游戏状态到存储
     * @returns {boolean} 是否保存成功
     */
    saveState() {
        if (!this.isStorageAvailable) {
            console.warn('存储不可用，无法保存游戏状态');
            return false;
        }
        
        try {
            const stateToSave = {
                ...this.currentState,
                timestamp: Date.now()
            };
            
            const serializedState = JSON.stringify(stateToSave);
            localStorage.setItem(this.storageKey, serializedState);
            
            console.log('游戏状态已保存');
            return true;
        } catch (error) {
            console.error('保存游戏状态失败:', error);
            this.handleStorageError('保存游戏状态失败: ' + error.message);
            return false;
        }
    }
    
    /**
     * 从存储中加载游戏状态
     * @returns {GameState|null} 加载的游戏状态，如果失败返回null
     */
    loadState() {
        if (!this.isStorageAvailable) {
            return null;
        }
        
        try {
            const serializedState = localStorage.getItem(this.storageKey);
            if (!serializedState) {
                return null;
            }
            
            const parsedState = JSON.parse(serializedState);
            
            // 移除时间戳字段（仅用于调试）
            if (parsedState.timestamp) {
                delete parsedState.timestamp;
            }
            
            return parsedState;
        } catch (error) {
            console.error('加载游戏状态失败:', error);
            this.handleDataCorruption('加载游戏状态失败: ' + error.message, serializedState);
            return null;
        }
    }
    
    /**
     * 重置游戏状态为初始状态
     * @returns {GameState} 重置后的状态
     */
    resetState() {
        this.currentState = window.GameTypes.createInitialGameState();
        this.saveState();
        console.log('游戏状态已重置');
        return window.GameTypes.deepClone(this.currentState);
    }
    
    /**
     * 清除存储中的游戏状态
     * @returns {boolean} 是否清除成功
     */
    clearStoredState() {
        if (!this.isStorageAvailable) {
            return false;
        }
        
        try {
            localStorage.removeItem(this.storageKey);
            console.log('已清除存储的游戏状态');
            return true;
        } catch (error) {
            console.error('清除存储状态失败:', error);
            return false;
        }
    }
    
    /**
     * 验证游戏状态的有效性
     * @param {any} state - 要验证的状态
     * @returns {boolean} 是否有效
     */
    validateGameState(state) {
        if (!state || typeof state !== 'object') {
            return false;
        }
        
        // 检查必需的属性
        const requiredProperties = [
            'currentEmperor',
            'currentHintIndex', 
            'currentRoundScore',
            'totalScore',
            'gamePhase',
            'wrongGuesses',
            'currentEmperorIndex',
            'usedEmperorIds',
            'maxEmperorsPerRound'
        ];
        
        for (const prop of requiredProperties) {
            if (!(prop in state)) {
                console.warn(`游戏状态缺少必需属性: ${prop}`);
                return false;
            }
        }
        
        // 验证数据类型
        if (typeof state.currentHintIndex !== 'number' || state.currentHintIndex < 0) {
            console.warn('currentHintIndex 必须是非负数');
            return false;
        }
        
        if (typeof state.currentRoundScore !== 'number' || state.currentRoundScore < 0) {
            console.warn('currentRoundScore 必须是非负数');
            return false;
        }
        
        if (typeof state.totalScore !== 'number' || state.totalScore < 0) {
            console.warn('totalScore 必须是非负数');
            return false;
        }
        
        if (typeof state.currentEmperorIndex !== 'number' || state.currentEmperorIndex < 0) {
            console.warn('currentEmperorIndex 必须是非负数');
            return false;
        }
        
        if (typeof state.maxEmperorsPerRound !== 'number' || state.maxEmperorsPerRound <= 0) {
            console.warn('maxEmperorsPerRound 必须是正数');
            return false;
        }
        
        if (!Array.isArray(state.wrongGuesses)) {
            console.warn('wrongGuesses 必须是数组');
            return false;
        }
        
        if (!Array.isArray(state.usedEmperorIds)) {
            console.warn('usedEmperorIds 必须是数组');
            return false;
        }
        
        // 验证游戏阶段
        const validPhases = Object.values(window.GameTypes.GamePhase);
        if (!validPhases.includes(state.gamePhase)) {
            console.warn(`无效的游戏阶段: ${state.gamePhase}`);
            return false;
        }
        
        // 验证皇帝数据（如果存在）
        if (state.currentEmperor !== null) {
            if (!this.validateEmperor(state.currentEmperor)) {
                console.warn('当前皇帝数据无效');
                return false;
            }
        }
        
        return true;
    }
    
    /**
     * 验证皇帝数据的有效性
     * @param {any} emperor - 要验证的皇帝数据
     * @returns {boolean} 是否有效
     */
    validateEmperor(emperor) {
        if (!emperor || typeof emperor !== 'object') {
            return false;
        }
        
        const requiredProperties = ['id', 'name', 'templeName', 'posthumousName', 'reignNames', 'hints'];
        
        for (const prop of requiredProperties) {
            if (!(prop in emperor)) {
                return false;
            }
        }
        
        // 验证数组属性
        if (!Array.isArray(emperor.reignNames) || !Array.isArray(emperor.hints)) {
            return false;
        }
        
        // 验证字符串属性
        const stringProperties = ['id', 'name', 'templeName', 'posthumousName'];
        for (const prop of stringProperties) {
            if (typeof emperor[prop] !== 'string' || emperor[prop].trim() === '') {
                return false;
            }
        }
        
        return true;
    }
    
    /**
     * 获取状态统计信息（用于调试）
     * @returns {Object} 状态统计信息
     */
    getStateStats() {
        return {
            hasCurrentEmperor: this.currentState.currentEmperor !== null,
            currentHintIndex: this.currentState.currentHintIndex,
            currentRoundScore: this.currentState.currentRoundScore,
            totalScore: this.currentState.totalScore,
            gamePhase: this.currentState.gamePhase,
            wrongGuessesCount: this.currentState.wrongGuesses.length,
            storageAvailable: this.isStorageAvailable,
            currentEmperorIndex: this.currentState.currentEmperorIndex,
            maxEmperorsPerRound: this.currentState.maxEmperorsPerRound,
            usedEmperorsCount: this.currentState.usedEmperorIds.length
        };
    }
    
    /**
     * 处理存储错误
     * @param {string} message - 错误消息
     */
    handleStorageError(message) {
        if (window.game && window.game.errorHandler) {
            window.game.errorHandler.handleError({
                type: window.ErrorTypes.STORAGE_ERROR,
                severity: window.ErrorSeverity.MEDIUM,
                message: message,
                context: 'game_state_storage'
            });
        } else {
            console.error('存储错误:', message);
        }
    }
    
    /**
     * 处理数据损坏错误
     * @param {string} message - 错误消息
     * @param {any} corruptedData - 损坏的数据
     */
    handleDataCorruption(message, corruptedData) {
        if (window.game && window.game.errorHandler) {
            window.game.errorHandler.handleError({
                type: window.ErrorTypes.DATA_CORRUPTION,
                severity: window.ErrorSeverity.HIGH,
                message: message,
                corruptedData: corruptedData,
                context: 'game_state_integrity'
            });
        } else {
            console.error('数据损坏:', message, corruptedData);
            // 基础恢复：重置状态
            this.currentState = window.GameTypes.createInitialGameState();
        }
    }
}

// 导出到全局作用域
window.GameStateManager = GameStateManager;