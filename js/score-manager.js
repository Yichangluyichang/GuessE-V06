/**
 * 中国皇帝猜谜游戏 - 计分管理系统
 * 处理游戏计分逻辑，包括轮次分数初始化、扣分、累计等功能
 */

/**
 * 计分管理器类
 * 负责管理游戏的计分逻辑和分数状态
 */
class ScoreManager {
    constructor() {
        this.currentRoundScore = 0;
        this.totalScore = 0;
        this.scoreHistory = [];
        this.isRoundActive = false;
        
        // 常量配置
        this.INITIAL_ROUND_SCORE = 100;
        this.WRONG_ANSWER_PENALTY = 10;
        this.MIN_ROUND_SCORE = 0;
        
        // 绑定方法上下文
        this.startNewRound = this.startNewRound.bind(this);
        this.deductPoints = this.deductPoints.bind(this);
        this.addRoundScore = this.addRoundScore.bind(this);
        this.getCurrentRoundScore = this.getCurrentRoundScore.bind(this);
        this.getTotalScore = this.getTotalScore.bind(this);
    }
    
    /**
     * 开始新轮次
     * 将当前轮次分数设置为100分
     */
    startNewRound() {
        this.currentRoundScore = this.INITIAL_ROUND_SCORE;
        this.isRoundActive = true;
        
        console.log(`新轮次开始，当前轮次分数: ${this.currentRoundScore}`);
    }
    
    /**
     * 扣除分数（错误答案时调用）
     * 从当前轮次分数中扣除10分，确保不会低于0分
     * @returns {number} 扣除后的当前轮次分数
     */
    deductPoints() {
        if (!this.isRoundActive) {
            console.warn('轮次未激活，无法扣除分数');
            return this.currentRoundScore;
        }
        
        const previousScore = this.currentRoundScore;
        this.currentRoundScore = Math.max(
            this.MIN_ROUND_SCORE, 
            this.currentRoundScore - this.WRONG_ANSWER_PENALTY
        );
        
        const actualDeduction = previousScore - this.currentRoundScore;
        console.log(`扣除分数: ${actualDeduction}，当前轮次分数: ${this.currentRoundScore}`);
        
        return this.currentRoundScore;
    }
    
    /**
     * 添加轮次分数到总分（正确答案时调用）
     * 将当前轮次剩余分数加入总分，并结束当前轮次
     */
    addRoundScore() {
        if (!this.isRoundActive) {
            console.warn('轮次未激活，无法添加分数');
            return;
        }
        
        const roundScore = this.currentRoundScore;
        this.totalScore += roundScore;
        this.scoreHistory.push(roundScore);
        this.isRoundActive = false;
        
        console.log(`轮次结束，获得分数: ${roundScore}，总分: ${this.totalScore}`);
    }
    
    /**
     * 轮次失败（未能猜对）
     * 不将任何分数加入总分，结束当前轮次
     */
    failRound() {
        if (!this.isRoundActive) {
            console.warn('轮次未激活');
            return;
        }
        
        this.scoreHistory.push(0); // 记录失败轮次
        this.isRoundActive = false;
        
        console.log(`轮次失败，未获得分数，总分保持: ${this.totalScore}`);
    }
    
    /**
     * 获取当前轮次分数
     * @returns {number} 当前轮次分数
     */
    getCurrentRoundScore() {
        return this.currentRoundScore;
    }
    
    /**
     * 获取总分数
     * @returns {number} 累计总分数
     */
    getTotalScore() {
        return this.totalScore;
    }
    
    /**
     * 获取分数历史记录
     * @returns {number[]} 每轮次的分数记录
     */
    getScoreHistory() {
        return [...this.scoreHistory];
    }
    
    /**
     * 检查当前轮次是否激活
     * @returns {boolean} 轮次是否激活
     */
    isRoundInProgress() {
        return this.isRoundActive;
    }
    
    /**
     * 获取统计信息
     * @returns {Object} 分数统计信息
     */
    getStats() {
        const completedRounds = this.scoreHistory.length;
        const successfulRounds = this.scoreHistory.filter(score => score > 0).length;
        const averageScore = completedRounds > 0 ? 
            this.scoreHistory.reduce((sum, score) => sum + score, 0) / completedRounds : 0;
        
        return {
            currentRoundScore: this.currentRoundScore,
            totalScore: this.totalScore,
            completedRounds: completedRounds,
            successfulRounds: successfulRounds,
            failedRounds: completedRounds - successfulRounds,
            averageRoundScore: Math.round(averageScore * 100) / 100,
            isRoundActive: this.isRoundActive,
            scoreHistory: [...this.scoreHistory]
        };
    }
    
    /**
     * 重置所有分数
     * 清空总分和历史记录，结束当前轮次
     */
    reset() {
        this.currentRoundScore = 0;
        this.totalScore = 0;
        this.scoreHistory = [];
        this.isRoundActive = false;
        
        console.log('分数管理器已重置');
    }
    
    /**
     * 从数据对象恢复状态
     * @param {Object} data - 包含分数状态的数据对象
     * @returns {boolean} 恢复是否成功
     */
    loadFromData(data) {
        try {
            if (!data || typeof data !== 'object') {
                console.warn('无效的分数数据');
                return false;
            }
            
            // 验证数据完整性
            if (typeof data.totalScore !== 'number' || data.totalScore < 0) {
                console.warn('无效的总分数据');
                return false;
            }
            
            if (typeof data.currentRoundScore !== 'number' || data.currentRoundScore < 0) {
                console.warn('无效的当前轮次分数数据');
                return false;
            }
            
            if (!Array.isArray(data.scoreHistory)) {
                console.warn('无效的分数历史数据');
                return false;
            }
            
            // 恢复状态
            this.totalScore = data.totalScore;
            this.currentRoundScore = data.currentRoundScore;
            this.scoreHistory = [...data.scoreHistory];
            this.isRoundActive = data.isRoundActive || false;
            
            console.log('分数状态已恢复:', this.getStats());
            return true;
            
        } catch (error) {
            console.error('恢复分数状态失败:', error);
            return false;
        }
    }
    
    /**
     * 导出当前状态为数据对象
     * @returns {Object} 包含分数状态的数据对象
     */
    exportData() {
        return {
            currentRoundScore: this.currentRoundScore,
            totalScore: this.totalScore,
            scoreHistory: [...this.scoreHistory],
            isRoundActive: this.isRoundActive,
            timestamp: new Date().toISOString()
        };
    }
    
    /**
     * 验证分数状态的完整性
     * @returns {Object} 验证结果
     */
    validateState() {
        const errors = [];
        
        // 检查当前轮次分数
        if (this.currentRoundScore < this.MIN_ROUND_SCORE) {
            errors.push(`当前轮次分数不能低于${this.MIN_ROUND_SCORE}`);
        }
        
        if (this.currentRoundScore > this.INITIAL_ROUND_SCORE) {
            errors.push(`当前轮次分数不能超过${this.INITIAL_ROUND_SCORE}`);
        }
        
        // 检查总分数
        if (this.totalScore < 0) {
            errors.push('总分数不能为负数');
        }
        
        // 检查分数历史
        if (!Array.isArray(this.scoreHistory)) {
            errors.push('分数历史必须是数组');
        } else {
            for (let i = 0; i < this.scoreHistory.length; i++) {
                const score = this.scoreHistory[i];
                if (typeof score !== 'number' || score < 0 || score > this.INITIAL_ROUND_SCORE) {
                    errors.push(`分数历史第${i + 1}项无效: ${score}`);
                }
            }
        }
        
        // 检查总分与历史记录的一致性
        const expectedTotal = this.scoreHistory.reduce((sum, score) => sum + score, 0);
        if (this.totalScore !== expectedTotal) {
            errors.push(`总分数(${this.totalScore})与历史记录计算结果(${expectedTotal})不一致`);
        }
        
        return {
            isValid: errors.length === 0,
            errors: errors
        };
    }
}

// 导出到全局作用域
window.ScoreManager = ScoreManager;