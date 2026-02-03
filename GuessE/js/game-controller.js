/**
 * 中国皇帝猜谜游戏 - 游戏控制器
 * 负责协调所有游戏逻辑和用户交互
 * 需求: 1.1, 1.2, 1.3, 1.4, 3.5
 */

/**
 * 游戏控制器类
 * 协调游戏逻辑、数据管理、用户界面和状态管理
 */
class GameController {
    constructor() {
        // 初始化各个管理器
        this.emperorDatabase = null;
        this.scoreManager = null;
        this.gameStateManager = null;
        this.hintHistoryManager = null;
        
        // 游戏状态
        this.isInitialized = false;
        this.currentEmperor = null;
        this.currentHints = [];
        this.currentHintIndex = 0;
        
        // 绑定方法上下文
        this.init = this.init.bind(this);
        this.startNewRound = this.startNewRound.bind(this);
        this.submitGuess = this.submitGuess.bind(this);
        this.getCurrentHint = this.getCurrentHint.bind(this);
        this.getCurrentScore = this.getCurrentScore.bind(this);
        this.resetGame = this.resetGame.bind(this);
    }
    
    /**
     * 初始化游戏控制器
     * @returns {Promise<boolean>} 初始化是否成功
     */
    async init() {
        try {
            console.log('初始化游戏控制器...');
            
            // 初始化皇帝数据库
            this.emperorDatabase = new window.EmperorDatabase();
            const dbInitialized = await this.emperorDatabase.init();
            
            if (!dbInitialized) {
                throw new Error('皇帝数据库初始化失败');
            }
            
            // 初始化计分管理器
            this.scoreManager = new window.ScoreManager();
            
            // 初始化游戏状态管理器
            this.gameStateManager = new window.GameStateManager();
            
            // 初始化提示词历史管理器
            this.hintHistoryManager = new window.HintHistoryManager();
            
            // 尝试恢复之前的游戏状态
            await this.restoreGameState();
            
            this.isInitialized = true;
            console.log('游戏控制器初始化完成');
            return true;
            
        } catch (error) {
            console.error('游戏控制器初始化失败:', error);
            this.isInitialized = false;
            return false;
        }
    }
    
    /**
     * 恢复游戏状态
     * @returns {Promise<void>}
     */
    async restoreGameState() {
        try {
            const savedState = this.gameStateManager.getCurrentState();
            
            if (savedState.gamePhase === window.GameTypes.GamePhase.PLAYING && savedState.currentEmperor) {
                // 恢复进行中的游戏
                this.currentEmperor = savedState.currentEmperor;
                this.currentHints = this.emperorDatabase.getGameHints(this.currentEmperor.id);
                this.currentHintIndex = savedState.currentHintIndex;
                
                // 恢复计分管理器状态
                const scoreData = {
                    currentRoundScore: savedState.currentRoundScore,
                    totalScore: savedState.totalScore,
                    scoreHistory: [],
                    isRoundActive: true
                };
                this.scoreManager.loadFromData(scoreData);
                
                console.log(`已恢复进行中的游戏状态 - 皇帝 ${savedState.currentEmperorIndex + 1}/${savedState.maxEmperorsPerRound}: ${this.currentEmperor.name}`);
            } else {
                // 恢复总分但不恢复轮次状态
                const scoreData = {
                    currentRoundScore: 0,
                    totalScore: savedState.totalScore,
                    scoreHistory: [],
                    isRoundActive: false
                };
                this.scoreManager.loadFromData(scoreData);
                
                console.log('已恢复总分数据');
            }
        } catch (error) {
            console.error('恢复游戏状态失败:', error);
        }
    }
    
    /**
     * 开始新轮次
     * 随机选择一个皇帝并显示第一个提示词
     * 需求: 1.1
     * @returns {Object} 新轮次信息
     */
    startNewRound() {
        if (!this.isInitialized) {
            throw new Error('游戏控制器未初始化');
        }
        
        try {
            console.log('开始新轮次...');
            
            // 重置轮次状态
            this.gameStateManager.updateState({
                currentEmperorIndex: 0,
                usedEmperorIds: [],
                gamePhase: window.GameTypes.GamePhase.PLAYING
            });
            
            // 开始新轮次计分
            this.scoreManager.startNewRound();
            
            // 开始第一个皇帝
            return this.startNextEmperor();
            
        } catch (error) {
            console.error('开始新轮次失败:', error);
            throw error;
        }
    }
    
    /**
     * 开始下一个皇帝
     * @returns {Object} 皇帝信息
     */
    startNextEmperor() {
        const currentState = this.gameStateManager.getCurrentState();
        
        // 检查是否已达到最大皇帝数量
        if (currentState.currentEmperorIndex >= currentState.maxEmperorsPerRound) {
            return this.endRound();
        }
        
        // 随机选择一个未使用的皇帝
        this.currentEmperor = this.emperorDatabase.getRandomEmperor(currentState.usedEmperorIds);
        
        if (!this.currentEmperor) {
            throw new Error('无法获取未使用的皇帝数据');
        }
        
        // 获取游戏提示词（按难度顺序）
        this.currentHints = this.emperorDatabase.getGameHints(this.currentEmperor.id);
        
        if (this.currentHints.length < 10) {
            throw new Error(`皇帝 ${this.currentEmperor.name} 的提示词不足`);
        }
        
        // 重置提示词索引
        this.currentHintIndex = 0;
        
        // 清空提示词历史记录
        this.hintHistoryManager.clearHistory();
        
        // 更新游戏状态
        const updatedUsedIds = [...currentState.usedEmperorIds, this.currentEmperor.id];
        this.gameStateManager.updateState({
            currentEmperor: this.currentEmperor,
            currentHintIndex: this.currentHintIndex,
            currentRoundScore: this.scoreManager.getCurrentRoundScore(),
            totalScore: this.scoreManager.getTotalScore(),
            gamePhase: window.GameTypes.GamePhase.PLAYING,
            wrongGuesses: [],
            usedEmperorIds: updatedUsedIds
        });
        
        const firstHint = this.getCurrentHint();
        
        // 添加第一个提示词到历史记录
        if (this.currentHints[0]) {
            this.hintHistoryManager.addDisplayedHint(this.currentHints[0], 0);
        }
        
        console.log(`开始皇帝 ${currentState.currentEmperorIndex + 1}/10: ${this.currentEmperor.name}, 第一个提示词: ${firstHint}`);
        
        return {
            emperor: this.currentEmperor,
            hint: firstHint,
            hintIndex: this.currentHintIndex,
            totalHints: this.currentHints.length,
            currentRoundScore: this.scoreManager.getCurrentRoundScore(),
            totalScore: this.scoreManager.getTotalScore(),
            emperorIndex: currentState.currentEmperorIndex,
            maxEmperors: currentState.maxEmperorsPerRound
        };
    }
    
    /**
     * 结束当前轮次
     * @returns {Object} 轮次结束信息
     */
    endRound() {
        console.log('轮次结束 - 已完成所有皇帝');
        
        // 将累积分数加入总分
        this.scoreManager.addRoundScore();
        
        // 更新游戏状态
        this.gameStateManager.updateState({
            currentEmperor: null,
            currentRoundScore: 0,
            totalScore: this.scoreManager.getTotalScore(),
            gamePhase: window.GameTypes.GamePhase.ROUND_END,
            wrongGuesses: []
        });
        
        return {
            isRoundComplete: true,
            totalScore: this.scoreManager.getTotalScore(),
            emperorsCompleted: this.gameStateManager.getCurrentState().maxEmperorsPerRound
        };
    }
    
    /**
     * 提交用户猜测
     * 处理答案验证和游戏状态更新
     * 需求: 1.2, 1.3, 1.4, 4.2, 4.3
     * @param {string} guess - 用户猜测
     * @returns {GuessResult} 猜测结果
     */
    submitGuess(guess) {
        if (!this.isInitialized) {
            throw new Error('游戏控制器未初始化');
        }
        
        if (!this.currentEmperor) {
            throw new Error('当前没有进行中的游戏');
        }
        
        try {
            console.log(`处理用户猜测: ${guess}`);
            
            // 验证答案
            const isCorrect = this.emperorDatabase.validateAnswer(guess, this.currentEmperor);
            
            if (isCorrect) {
                // 正确答案处理 (需求 1.3, 4.3)
                return this.handleCorrectAnswer(guess);
            } else {
                // 错误答案处理 (需求 1.2, 4.2)
                return this.handleIncorrectAnswer(guess);
            }
            
        } catch (error) {
            console.error('处理猜测失败:', error);
            throw error;
        }
    }
    
    /**
     * 处理正确答案
     * 需求: 1.3, 4.3
     * @param {string} guess - 正确的猜测
     * @returns {GuessResult} 猜测结果
     */
    handleCorrectAnswer(guess) {
        console.log(`答案正确: ${guess}`);
        
        const currentState = this.gameStateManager.getCurrentState();
        
        // 保存当前皇帝信息（在清空之前）
        const completedEmperor = this.currentEmperor;
        const currentRoundScore = this.scoreManager.getCurrentRoundScore();
        
        // 立即将当前轮次分数加入总分（每个皇帝答对都累计分数）
        this.scoreManager.addRoundScore();
        
        // 增加皇帝索引
        const nextEmperorIndex = currentState.currentEmperorIndex + 1;
        
        // 更新游戏状态
        this.gameStateManager.updateState({
            currentEmperorIndex: nextEmperorIndex,
            wrongGuesses: [],
            totalScore: this.scoreManager.getTotalScore()
        });
        
        // 检查是否完成了所有皇帝
        if (nextEmperorIndex >= currentState.maxEmperorsPerRound) {
            // 轮次完成
            this.gameStateManager.updateState({
                currentEmperor: null,
                currentRoundScore: 0,
                gamePhase: window.GameTypes.GamePhase.ROUND_END
            });
            
            // 创建包含皇帝信息的结果
            const result = window.GameTypes.createGuessResult(
                true,  // isCorrect
                currentRoundScore, // scoreChange (获得的分数)
                null,  // nextHint
                true   // gameEnded (轮次结束)
            );
            
            // 添加完成的皇帝信息
            result.completedEmperor = completedEmperor;
            result.showResult = true; // 标记需要显示结算界面
            
            return result;
        } else {
            // 开始新轮次计分（为下一个皇帝）
            this.scoreManager.startNewRound();
            
            // 继续下一个皇帝
            const nextEmperorInfo = this.startNextEmperor();
            
            const result = window.GameTypes.createGuessResult(
                true,  // isCorrect
                currentRoundScore, // scoreChange (获得的分数)
                nextEmperorInfo.hint, // nextHint (下一个皇帝的第一个提示)
                false  // gameEnded (继续游戏)
            );
            
            // 添加完成的皇帝信息
            result.completedEmperor = completedEmperor;
            result.showResult = true; // 标记需要显示结算界面
            result.nextEmperorInfo = nextEmperorInfo; // 添加下一个皇帝信息
            
            return result;
        }
    }
    
    /**
     * 处理错误答案
     * 需求: 1.2, 4.2, 1.4
     * @param {string} guess - 错误的猜测
     * @returns {GuessResult} 猜测结果
     */
    handleIncorrectAnswer(guess) {
        console.log(`答案错误: ${guess}`);
        
        // 保存当前皇帝信息（在可能清空之前）
        const currentEmperor = this.currentEmperor;
        
        // 扣除分数
        this.scoreManager.deductPoints();
        
        // 记录错误猜测
        const currentState = this.gameStateManager.getCurrentState();
        const updatedWrongGuesses = [...currentState.wrongGuesses, guess];
        
        // 检查是否还有剩余提示词
        if (this.currentHintIndex < this.currentHints.length - 1) {
            // 还有提示词，显示下一个 (需求 1.2)
            this.currentHintIndex++;
            
            const nextHint = this.getCurrentHint();
            
            // 添加新提示词到历史记录
            if (this.currentHints[this.currentHintIndex]) {
                this.hintHistoryManager.addDisplayedHint(this.currentHints[this.currentHintIndex], this.currentHintIndex);
            }
            
            // 更新游戏状态
            this.gameStateManager.updateState({
                currentHintIndex: this.currentHintIndex,
                currentRoundScore: this.scoreManager.getCurrentRoundScore(),
                wrongGuesses: updatedWrongGuesses
            });
            
            return window.GameTypes.createGuessResult(
                false, // isCorrect
                -10,   // scoreChange (扣除的分数)
                nextHint, // nextHint
                false  // gameEnded
            );
        } else {
            // 所有提示词都已显示，跳过当前皇帝 (需求 1.4)
            console.log(`皇帝 ${this.currentEmperor.name} 未猜中，跳过`);
            
            // 轮次失败，不加分数但结束当前轮次计分
            this.scoreManager.failRound();
            
            const nextEmperorIndex = currentState.currentEmperorIndex + 1;
            
            // 更新游戏状态
            this.gameStateManager.updateState({
                currentEmperorIndex: nextEmperorIndex,
                wrongGuesses: [],
                totalScore: this.scoreManager.getTotalScore()
            });
            
            // 检查是否完成了所有皇帝
            if (nextEmperorIndex >= currentState.maxEmperorsPerRound) {
                // 轮次完成
                this.gameStateManager.updateState({
                    currentEmperor: null,
                    currentRoundScore: 0,
                    gamePhase: window.GameTypes.GamePhase.ROUND_END
                });
                
                const result = window.GameTypes.createGuessResult(
                    false, // isCorrect
                    -10,   // scoreChange (最后一次扣分)
                    null,  // nextHint
                    true   // gameEnded (轮次结束)
                );
                
                // 添加未猜中的皇帝信息
                result.failedEmperor = currentEmperor;
                result.showResult = true; // 标记需要显示结算界面
                
                return result;
            } else {
                // 开始新轮次计分（为下一个皇帝）
                this.scoreManager.startNewRound();
                
                // 继续下一个皇帝
                const nextEmperorInfo = this.startNextEmperor();
                
                const result = window.GameTypes.createGuessResult(
                    false, // isCorrect
                    -10,   // scoreChange (扣除的分数)
                    nextEmperorInfo.hint, // nextHint (下一个皇帝的第一个提示)
                    false  // gameEnded (继续游戏)
                );
                
                // 添加未猜中的皇帝信息
                result.failedEmperor = currentEmperor;
                result.showResult = true; // 标记需要显示结算界面
                result.nextEmperorInfo = nextEmperorInfo; // 添加下一个皇帝信息
                
                return result;
            }
        }
    }
    
    /**
     * 获取当前提示词
     * 需求: 3.5 (按困难、中等、简单的顺序显示)
     * @returns {string} 当前提示词内容
     */
    getCurrentHint() {
        if (!this.currentHints || this.currentHintIndex >= this.currentHints.length) {
            return '';
        }
        
        return this.currentHints[this.currentHintIndex].content;
    }
    
    /**
     * 获取当前分数信息
     * @returns {Object} 分数信息
     */
    getCurrentScore() {
        return {
            currentRoundScore: this.scoreManager.getCurrentRoundScore(),
            totalScore: this.scoreManager.getTotalScore()
        };
    }
    
    /**
     * 重置游戏
     * 清空所有状态，重新开始
     * @returns {boolean} 重置是否成功
     */
    resetGame() {
        if (!this.isInitialized) {
            throw new Error('游戏控制器未初始化');
        }
        
        try {
            console.log('重置游戏...');
            
            // 重置游戏状态
            this.currentEmperor = null;
            this.currentHints = [];
            this.currentHintIndex = 0;
            
            // 重置计分管理器
            this.scoreManager.reset();
            
            // 重置游戏状态管理器
            this.gameStateManager.resetState();
            
            // 重置提示词历史管理器
            this.hintHistoryManager.reset();
            
            console.log('游戏已重置');
            return true;
            
        } catch (error) {
            console.error('重置游戏失败:', error);
            return false;
        }
    }
    
    /**
     * 获取游戏状态信息
     * @returns {Object} 游戏状态信息
     */
    getGameInfo() {
        if (!this.isInitialized) {
            return { isInitialized: false };
        }
        
        const state = this.gameStateManager.getCurrentState();
        
        return {
            isInitialized: true,
            gamePhase: state.gamePhase,
            hasCurrentEmperor: this.currentEmperor !== null,
            currentEmperor: this.currentEmperor ? {
                name: this.currentEmperor.name,
                templeName: this.currentEmperor.templeName,
                posthumousName: this.currentEmperor.posthumousName,
                reignNames: this.currentEmperor.reignNames
            } : null,
            currentHint: this.getCurrentHint(),
            hintIndex: this.currentHintIndex,
            totalHints: this.currentHints.length,
            currentRoundScore: this.scoreManager.getCurrentRoundScore(),
            totalScore: this.scoreManager.getTotalScore(),
            wrongGuesses: state.wrongGuesses,
            isRoundActive: this.scoreManager.isRoundInProgress(),
            currentEmperorIndex: state.currentEmperorIndex,
            maxEmperorsPerRound: state.maxEmperorsPerRound,
            usedEmperorIds: state.usedEmperorIds
        };
    }
    
    /**
     * 获取当前皇帝的所有有效答案（用于调试）
     * @returns {string[]} 有效答案列表
     */
    getValidAnswers() {
        if (!this.currentEmperor) {
            return [];
        }
        
        return window.GameValidation.getValidAnswers(this.currentEmperor);
    }
    
    /**
     * 检查游戏是否可以开始新轮次
     * @returns {boolean} 是否可以开始新轮次
     */
    canStartNewRound() {
        if (!this.isInitialized) {
            return false;
        }
        
        const state = this.gameStateManager.getCurrentState();
        return state.gamePhase === window.GameTypes.GamePhase.START || 
               state.gamePhase === window.GameTypes.GamePhase.ROUND_END;
    }
    
    /**
     * 检查游戏是否正在进行中
     * @returns {boolean} 是否正在进行中
     */
    isGameInProgress() {
        if (!this.isInitialized) {
            return false;
        }
        
        const state = this.gameStateManager.getCurrentState();
        return state.gamePhase === window.GameTypes.GamePhase.PLAYING;
    }
    
    /**
     * 获取提示词历史管理器
     * @returns {HintHistoryManager} 提示词历史管理器
     */
    getHintHistoryManager() {
        return this.hintHistoryManager;
    }
    
    /**
     * 获取已显示的提示词历史
     * @returns {DisplayedHint[]} 已显示提示词列表
     */
    getDisplayedHints() {
        return this.hintHistoryManager.getDisplayedHints();
    }
    
    /**
     * 检查是否可以查看提示词历史
     * @returns {boolean} 是否可以查看历史
     */
    canShowHintHistory() {
        return this.hintHistoryManager.canShowHistory();
    }
    /**
     * 返回主菜单
     * 需求: 12.5, 12.7 - 完全重置游戏状态并返回开始界面
     * @returns {boolean} 返回主菜单是否成功
     */
    returnToMainMenu() {
        if (!this.isInitialized) {
            throw new Error('游戏控制器未初始化');
        }
        
        try {
            console.log('返回主菜单，完全重置游戏状态...');
            
            // 完全重置游戏状态
            this.currentEmperor = null;
            this.currentHints = [];
            this.currentHintIndex = 0;
            
            // 重置计分管理器（包括总分）
            this.scoreManager.reset();
            
            // 重置游戏状态管理器（完全清空）
            this.gameStateManager.resetState();
            
            // 重置提示词历史管理器
            this.hintHistoryManager.reset();
            
            console.log('返回主菜单完成，所有状态已重置');
            return true;
            
        } catch (error) {
            console.error('返回主菜单失败:', error);
            return false;
        }
    }
    
    /**
     * 获取提示词难度分布信息
     * @returns {Object} 难度分布信息
     */
    getHintDifficultyInfo() {
        if (!this.currentHints || this.currentHints.length === 0) {
            return { hard: 0, medium: 0, easy: 0, current: null };
        }
        
        const hardCount = this.currentHints.filter(h => h.difficulty === window.GameTypes.Difficulty.HARD).length;
        const mediumCount = this.currentHints.filter(h => h.difficulty === window.GameTypes.Difficulty.MEDIUM).length;
        const easyCount = this.currentHints.filter(h => h.difficulty === window.GameTypes.Difficulty.EASY).length;
        
        const currentHint = this.currentHints[this.currentHintIndex];
        
        return {
            hard: hardCount,
            medium: mediumCount,
            easy: easyCount,
            current: currentHint ? currentHint.difficulty : null
        };
    }
    
    /**
     * 获取提示词历史管理器
     * @returns {HintHistoryManager} 提示词历史管理器
     */
    getHintHistoryManager() {
        return this.hintHistoryManager;
    }
    
    /**
     * 获取已显示的提示词历史
     * @returns {DisplayedHint[]} 已显示提示词列表
     */
    getDisplayedHints() {
        return this.hintHistoryManager.getDisplayedHints();
    }
    
    /**
     * 检查是否可以查看提示词历史
     * @returns {boolean} 是否可以查看历史
     */
    canShowHintHistory() {
        return this.hintHistoryManager.canShowHistory();
    }
}

/**
 * 返回主菜单功能扩展
 * 为GameController添加返回主菜单的方法
 */
GameController.prototype.returnToMainMenu = function() {
    if (!this.isInitialized) {
        throw new Error('游戏控制器未初始化');
    }
    
    try {
        console.log('返回主菜单，完全重置游戏状态...');
        
        // 完全重置游戏状态
        this.currentEmperor = null;
        this.currentHints = [];
        this.currentHintIndex = 0;
        
        // 重置计分管理器（包括总分）
        this.scoreManager.reset();
        
        // 重置游戏状态管理器（完全清空）
        this.gameStateManager.resetState();
        
        // 重置提示词历史管理器
        this.hintHistoryManager.reset();
        
        console.log('返回主菜单完成，所有状态已重置');
        return true;
        
    } catch (error) {
        console.error('返回主菜单失败:', error);
        return false;
    }
};

// 导出到全局作用域
window.GameController = GameController;