/**
 * 中国皇帝猜谜游戏 - 提示词历史管理器
 * 管理游戏中已显示的提示词历史记录，支持查看和导航功能
 * 需求: 11.1, 11.2, 11.5
 */

/**
 * 提示词历史管理器类
 * 管理已显示的提示词历史记录
 */
class HintHistoryManager {
    constructor() {
        // 历史记录状态
        this.displayedHints = [];
        this.isHistoryVisible = false;
        this.currentViewIndex = 0;
        
        // 绑定方法上下文
        this.addDisplayedHint = this.addDisplayedHint.bind(this);
        this.getDisplayedHints = this.getDisplayedHints.bind(this);
        this.clearHistory = this.clearHistory.bind(this);
        this.canShowHistory = this.canShowHistory.bind(this);
        this.showHistoryView = this.showHistoryView.bind(this);
        this.hideHistoryView = this.hideHistoryView.bind(this);
        this.navigateToHint = this.navigateToHint.bind(this);
    }
    
    /**
     * 添加已显示的提示词到历史记录
     * @param {Object} hint - 提示词对象
     * @param {number} index - 显示索引 (0-based)
     */
    addDisplayedHint(hint, index) {
        if (!hint || typeof hint !== 'object') {
            throw new Error('无效的提示词对象');
        }
        
        if (typeof index !== 'number' || index < 0) {
            throw new Error('无效的显示索引');
        }
        
        // 创建显示提示词记录
        const displayedHint = {
            hint: {
                id: hint.id,
                content: hint.content,
                difficulty: hint.difficulty,
                order: hint.order
            },
            displayIndex: index + 1, // 转换为1-based索引
            timestamp: Date.now()
        };
        
        // 检查是否已存在相同索引的记录
        const existingIndex = this.displayedHints.findIndex(dh => dh.displayIndex === displayedHint.displayIndex);
        
        if (existingIndex >= 0) {
            // 更新现有记录
            this.displayedHints[existingIndex] = displayedHint;
            console.log(`更新提示词历史记录 ${displayedHint.displayIndex}: ${hint.content}`);
        } else {
            // 添加新记录
            this.displayedHints.push(displayedHint);
            console.log(`添加提示词历史记录 ${displayedHint.displayIndex}: ${hint.content}`);
        }
        
        // 按显示索引排序
        this.displayedHints.sort((a, b) => a.displayIndex - b.displayIndex);
    }
    
    /**
     * 获取所有已显示的提示词
     * @returns {DisplayedHint[]} 已显示提示词列表的深拷贝
     */
    getDisplayedHints() {
        return this.displayedHints.map(dh => ({
            hint: { ...dh.hint },
            displayIndex: dh.displayIndex,
            timestamp: dh.timestamp
        }));
    }
    
    /**
     * 清空历史记录
     */
    clearHistory() {
        console.log('清空提示词历史记录');
        this.displayedHints = [];
        this.isHistoryVisible = false;
        this.currentViewIndex = 0;
    }
    
    /**
     * 检查是否可以显示历史记录
     * @returns {boolean} 是否可以显示历史记录
     */
    canShowHistory() {
        return this.displayedHints.length >= 2;
    }
    
    /**
     * 显示历史查看界面
     */
    showHistoryView() {
        if (!this.canShowHistory()) {
            console.warn('提示词数量不足，无法显示历史记录');
            return false;
        }
        
        console.log('显示提示词历史查看界面');
        this.isHistoryVisible = true;
        this.currentViewIndex = this.displayedHints.length - 1; // 默认显示最新的提示词
        return true;
    }
    
    /**
     * 隐藏历史查看界面
     */
    hideHistoryView() {
        console.log('隐藏提示词历史查看界面');
        this.isHistoryVisible = false;
        this.currentViewIndex = 0;
    }
    
    /**
     * 导航到指定的提示词
     * @param {number} index - 提示词索引 (0-based)
     * @returns {DisplayedHint|null} 指定的提示词记录
     */
    navigateToHint(index) {
        if (typeof index !== 'number' || index < 0 || index >= this.displayedHints.length) {
            console.warn(`无效的提示词索引: ${index}`);
            return null;
        }
        
        this.currentViewIndex = index;
        const displayedHint = this.displayedHints[index];
        
        console.log(`导航到提示词 ${displayedHint.displayIndex}: ${displayedHint.hint.content}`);
        return {
            hint: { ...displayedHint.hint },
            displayIndex: displayedHint.displayIndex,
            timestamp: displayedHint.timestamp
        };
    }
    
    /**
     * 获取当前查看的提示词
     * @returns {DisplayedHint|null} 当前查看的提示词记录
     */
    getCurrentViewHint() {
        if (this.currentViewIndex < 0 || this.currentViewIndex >= this.displayedHints.length) {
            return null;
        }
        
        const displayedHint = this.displayedHints[this.currentViewIndex];
        return {
            hint: { ...displayedHint.hint },
            displayIndex: displayedHint.displayIndex,
            timestamp: displayedHint.timestamp
        };
    }
    
    /**
     * 导航到上一个提示词
     * @returns {DisplayedHint|null} 上一个提示词记录
     */
    navigateToPrevious() {
        if (this.currentViewIndex > 0) {
            return this.navigateToHint(this.currentViewIndex - 1);
        }
        return null;
    }
    
    /**
     * 导航到下一个提示词
     * @returns {DisplayedHint|null} 下一个提示词记录
     */
    navigateToNext() {
        if (this.currentViewIndex < this.displayedHints.length - 1) {
            return this.navigateToHint(this.currentViewIndex + 1);
        }
        return null;
    }
    
    /**
     * 获取历史状态信息
     * @returns {Object} 历史状态信息
     */
    getHistoryState() {
        return {
            displayedHints: this.getDisplayedHints(),
            isHistoryVisible: this.isHistoryVisible,
            currentViewIndex: this.currentViewIndex,
            canShowHistory: this.canShowHistory(),
            totalHints: this.displayedHints.length
        };
    }
    
    /**
     * 获取难度文本
     * @param {string} difficulty - 难度级别
     * @returns {string} 难度文本
     */
    getDifficultyText(difficulty) {
        const difficultyMap = {
            'hard': '困难',
            'medium': '中等',
            'easy': '简单'
        };
        
        return difficultyMap[difficulty] || '未知';
    }
    
    /**
     * 获取历史统计信息
     * @returns {Object} 历史统计信息
     */
    getHistoryStats() {
        const stats = {
            total: this.displayedHints.length,
            hard: 0,
            medium: 0,
            easy: 0
        };
        
        this.displayedHints.forEach(dh => {
            const difficulty = dh.hint.difficulty;
            if (stats.hasOwnProperty(difficulty)) {
                stats[difficulty]++;
            }
        });
        
        return stats;
    }
    
    /**
     * 验证历史记录的完整性
     * @returns {boolean} 历史记录是否完整
     */
    validateHistory() {
        // 检查显示索引是否连续
        for (let i = 0; i < this.displayedHints.length; i++) {
            const expectedIndex = i + 1;
            if (this.displayedHints[i].displayIndex !== expectedIndex) {
                console.warn(`提示词历史记录索引不连续: 期望 ${expectedIndex}, 实际 ${this.displayedHints[i].displayIndex}`);
                return false;
            }
        }
        
        // 检查每个记录的完整性
        for (const dh of this.displayedHints) {
            if (!dh.hint || !dh.hint.content || !dh.hint.difficulty) {
                console.warn('提示词历史记录数据不完整:', dh);
                return false;
            }
            
            if (typeof dh.displayIndex !== 'number' || dh.displayIndex <= 0) {
                console.warn('提示词历史记录显示索引无效:', dh);
                return false;
            }
            
            if (typeof dh.timestamp !== 'number' || dh.timestamp <= 0) {
                console.warn('提示词历史记录时间戳无效:', dh);
                return false;
            }
        }
        
        return true;
    }
    
    /**
     * 重置历史管理器
     */
    reset() {
        this.clearHistory();
        console.log('提示词历史管理器已重置');
    }
}

// 导出到全局作用域
window.HintHistoryManager = HintHistoryManager;