/**
 * 中国皇帝猜谜游戏 - 主应用程序
 * 应用程序的入口点和基础初始化
 * 集成所有组件并实现完整的游戏流程
 */

/**
 * 应用程序主类
 * 协调游戏控制器和UI渲染器，实现完整的游戏体验
 */
class ChineseEmperorGame {
    constructor() {
        // 核心组件
        this.gameController = null;
        this.uiRenderer = null;
        this.adminManager = null;
        this.errorHandler = null;
        this.menuNavigationManager = null;
        this.adminAuthManager = null;
        
        // 初始化状态
        this.isInitialized = false;
        
        // 绑定方法上下文
        this.init = this.init.bind(this);
        this.handleStartGame = this.handleStartGame.bind(this);
        this.handleSubmitGuess = this.handleSubmitGuess.bind(this);
        this.handleNextRound = this.handleNextRound.bind(this);
        this.handleRestartGame = this.handleRestartGame.bind(this);
    }
    
    /**
     * 初始化应用程序
     * 初始化所有组件并建立连接，实现完整的游戏流程
     */
    async init() {
        try {
            console.log('初始化中国皇帝猜谜游戏...');
            
            // 首先初始化错误处理器
            this.errorHandler = new window.ErrorHandler();
            const errorHandlerInitialized = this.errorHandler.init();
            
            if (!errorHandlerInitialized) {
                console.warn('错误处理器初始化失败，继续使用基础错误处理');
            }
            
            // 初始化游戏控制器
            this.gameController = new window.GameController();
            const controllerInitialized = await this.gameController.init();
            
            if (!controllerInitialized) {
                this.handleInitializationError('游戏控制器初始化失败');
                return false;
            }
            
            // 初始化UI渲染器
            this.uiRenderer = new window.UIRenderer();
            const uiInitialized = this.uiRenderer.init({
                onStartGame: this.handleStartGame,
                onSubmitGuess: this.handleSubmitGuess,
                onNextRound: this.handleNextRound,
                onRestartGame: this.handleRestartGame,
                onShowHintHistory: this.handleShowHintHistory.bind(this),
                onHideHintHistory: this.handleHideHintHistory.bind(this),
                onHintHistoryNavigate: this.handleHintHistoryNavigate.bind(this),
                onReturnToMenu: this.handleReturnToMenu.bind(this)
            });
            
            if (!uiInitialized) {
                this.handleInitializationError('UI渲染器初始化失败');
                return false;
            }
            
            // 初始化皇帝选择器
            const guessInput = document.getElementById('guess-input');
            if (guessInput && typeof window.EmperorSelectorManager !== 'undefined') {
                this.emperorSelectorManager = new window.EmperorSelectorManager(guessInput);
                
                // 绑定"选择皇帝"按钮事件
                const showSelectorBtn = document.getElementById('show-emperor-selector-btn');
                if (showSelectorBtn) {
                    showSelectorBtn.addEventListener('click', () => {
                        this.emperorSelectorManager.toggleSelector();
                    });
                }
                console.log('皇帝选择器初始化完成');
            } else {
                console.warn('皇帝选择器初始化失败：输入框或选择器管理器不存在');
            }
            
            // 初始化管理功能
            this.adminManager = new window.AdminManager(
                this.gameController.emperorDatabase,
                this.uiRenderer
            );
            this.adminManager.init();
            
            // 初始化管理员认证管理器
            this.adminAuthManager = new window.AdminAuthManager();
            const authInitialized = this.adminAuthManager.init();
            
            if (!authInitialized) {
                console.warn('管理员认证管理器初始化失败，管理功能可能不可用');
            }
            
            // 修改管理按钮的事件处理，添加密码验证
            this.setupAdminButtonWithAuth();
            
            // 初始化菜单导航管理器
            this.menuNavigationManager = new window.MenuNavigationManager();
            const menuNavInitialized = this.menuNavigationManager.init({
                onReturnToMenu: this.handleReturnToMenuComplete.bind(this),
                onResetGameState: this.handleResetGameState.bind(this)
            });
            
            if (!menuNavInitialized) {
                console.warn('菜单导航管理器初始化失败，返回主菜单功能可能不可用');
            }
            
            // 保存到全局变量供编辑功能使用
            window.adminManagerInstance = this.adminManager;
            
            // 检查是否有进行中的游戏需要恢复
            await this.checkAndRestoreGame();
            
            this.isInitialized = true;
            console.log('游戏初始化完成');
            return true;
            
        } catch (error) {
            console.error('游戏初始化失败:', error);
            this.handleInitializationError('游戏初始化失败: ' + error.message);
            return false;
        }
    }
    
    /**
     * 设置带认证的管理按钮
     */
    setupAdminButtonWithAuth() {
        const adminBtn = document.getElementById('admin-btn');
        if (!adminBtn) {
            console.warn('管理按钮不存在');
            return;
        }
        
        // 移除原有的事件监听器
        const newAdminBtn = adminBtn.cloneNode(true);
        adminBtn.parentNode.replaceChild(newAdminBtn, adminBtn);
        
        // 添加新的事件监听器，包含密码验证
        newAdminBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            
            try {
                console.log('管理按钮被点击，请求认证...');
                
                // 请求管理员认证
                const isAuthenticated = await this.adminAuthManager.requestAuthentication();
                
                if (isAuthenticated) {
                    console.log('认证成功，显示管理界面');
                    // 认证成功，显示管理界面
                    this.adminManager.showAdminScreen();
                } else {
                    console.log('认证失败或被取消');
                    // 认证失败，不执行任何操作
                }
                
            } catch (error) {
                console.error('管理员认证过程中发生错误:', error);
                this.uiRenderer.showError('认证过程中发生错误，请重试');
            }
        });
        
        console.log('管理按钮已设置密码保护');
    }
    
    /**
     * 检查并恢复游戏状态
     * 如果有进行中的游戏，恢复到游戏界面
     */
    async checkAndRestoreGame() {
        try {
            const gameInfo = this.gameController.getGameInfo();
            
            if (gameInfo.gamePhase === window.GameTypes.GamePhase.PLAYING && gameInfo.hasCurrentEmperor) {
                // 恢复进行中的游戏
                console.log('检测到进行中的游戏，正在恢复...');
                
                const difficultyInfo = this.gameController.getHintDifficultyInfo();
                
                // 渲染游戏界面
                this.uiRenderer.renderHint(
                    gameInfo.currentHint,
                    gameInfo.hintIndex,
                    gameInfo.totalHints,
                    difficultyInfo.current,
                    gameInfo.currentEmperorIndex,
                    gameInfo.maxEmperorsPerRound,
                    this.gameController.canShowHintHistory()
                );
                
                // 更新分数显示
                this.uiRenderer.renderScore(gameInfo.currentRoundScore, gameInfo.totalScore);
                
                // 更新输入界面
                this.uiRenderer.renderInput({
                    enabled: true,
                    wrongGuesses: gameInfo.wrongGuesses
                });
                
                this.uiRenderer.showSuccess(`游戏状态已恢复 - 皇帝 ${gameInfo.currentEmperorIndex + 1}/${gameInfo.maxEmperorsPerRound}`);
            } else {
                // 显示开始界面
                this.uiRenderer.renderGameStart();
                
                // 更新分数显示（显示总分）
                this.uiRenderer.renderScore(0, gameInfo.totalScore);
            }
        } catch (error) {
            console.error('恢复游戏状态失败:', error);
            this.handleGameStateError('恢复游戏状态失败', error);
            this.uiRenderer.renderGameStart();
        }
    }
    
    /**
     * 处理开始游戏事件
     * 开始新轮次并更新UI显示
     */
    async handleStartGame() {
        try {
            console.log('开始新游戏 - 显示难度选择对话框');
            
            if (!this.isInitialized) {
                throw new Error('应用程序未初始化');
            }
            
            // 显示难度选择对话框
            const difficultyManager = this.gameController.difficultyManager;
            if (!difficultyManager) {
                throw new Error('难度管理器未初始化');
            }
            
            // 显示难度选择对话框，并传入回调函数
            difficultyManager.show((selectedDifficulty) => {
                console.log(`玩家选择了难度: ${selectedDifficulty}`);
                
                // 使用选择的难度开始新轮次
                this.startGameWithDifficulty(selectedDifficulty);
            });
            
        } catch (error) {
            console.error('开始游戏失败:', error);
            this.uiRenderer.showError('开始游戏失败: ' + error.message);
        }
    }
    
    /**
     * 使用指定难度开始游戏
     * @param {string} difficulty - 选择的难度 ('easy'|'medium'|'hard')
     */
    async startGameWithDifficulty(difficulty) {
        try {
            console.log(`使用难度 ${difficulty} 开始游戏`);
            
            // 开始新轮次
            const roundInfo = this.gameController.startNewRound(difficulty);
            
            // 获取难度信息
            const difficultyInfo = this.gameController.getHintDifficultyInfo();
            
            // 获取游戏信息
            const gameInfo = this.gameController.getGameInfo();
            
            // 渲染游戏界面
            this.uiRenderer.renderHint(
                roundInfo.hint,
                roundInfo.hintIndex,
                roundInfo.totalHints,
                difficultyInfo.current,
                gameInfo.currentEmperorIndex,
                gameInfo.maxEmperorsPerRound,
                this.gameController.canShowHintHistory()
            );
            
            // 更新分数显示
            this.uiRenderer.renderScore(roundInfo.currentRoundScore, roundInfo.totalScore);
            
            // 启用输入
            this.uiRenderer.renderInput({
                enabled: true,
                wrongGuesses: []
            });
            
            console.log(`新轮次开始 - 皇帝 1/${gameInfo.maxEmperorsPerRound}: ${roundInfo.emperor.name}`);
            
        } catch (error) {
            console.error('使用难度开始游戏失败:', error);
            this.uiRenderer.showError('开始游戏失败: ' + error.message);
        }
    }
    
    /**
     * 处理提交猜测事件
     * 处理用户猜测并更新游戏状态
     */
    async handleSubmitGuess(guess) {
        try {
            console.log('处理猜测:', guess);
            
            if (!this.isInitialized) {
                throw new Error('应用程序未初始化');
            }
            
            if (!guess || guess.trim() === '') {
                this.uiRenderer.showError('请输入您的猜测');
                return;
            }
            
            // 提交猜测到游戏控制器
            const result = this.gameController.submitGuess(guess);
            
            // 获取当前游戏信息
            const gameInfo = this.gameController.getGameInfo();
            
            if (result.isCorrect) {
                // 答案正确
                console.log('答案正确！');
                
                if (result.showResult) {
                    // 显示结算界面（每个皇帝完成后都显示）
                    this.uiRenderer.renderResult({
                        isCorrect: true,
                        emperor: result.completedEmperor, // 使用结果中的皇帝信息
                        roundScore: result.scoreChange, // 本次获得的分数
                        totalScore: gameInfo.totalScore, // 更新后的总分
                        wrongGuesses: gameInfo.wrongGuesses,
                        isRoundComplete: result.gameEnded,
                        emperorsCompleted: gameInfo.currentEmperorIndex,
                        nextEmperorInfo: result.nextEmperorInfo // 下一个皇帝信息（如果有）
                    });
                } else {
                    // 继续下一个皇帝（不应该到这里，因为我们总是显示结算界面）
                    this.uiRenderer.showSuccess(`答对了！继续下一个皇帝 (${gameInfo.currentEmperorIndex + 1}/${gameInfo.maxEmperorsPerRound})`);
                    
                    // 获取难度信息
                    const difficultyInfo = this.gameController.getHintDifficultyInfo();
                    
                    // 渲染新皇帝的提示词
                    this.uiRenderer.renderHint(
                        result.nextHint,
                        0, // 新皇帝从第一个提示词开始
                        10, // 每个皇帝都有10个提示词
                        difficultyInfo.current,
                        gameInfo.currentEmperorIndex,
                        gameInfo.maxEmperorsPerRound
                    );
                    
                    // 更新分数显示
                    this.uiRenderer.renderScore(gameInfo.currentRoundScore, gameInfo.totalScore);
                    
                    // 重置输入界面
                    this.uiRenderer.renderInput({
                        enabled: true,
                        wrongGuesses: []
                    });
                }
                
            } else if (result.gameEnded) {
                // 轮次结束（所有皇帝完成或当前皇帝所有提示词用完）
                console.log('轮次结束');
                
                // 使用结果中的皇帝信息（可能是未猜中的皇帝）
                const emperorToShow = result.failedEmperor || gameInfo.currentEmperor;
                
                this.uiRenderer.renderResult({
                    isCorrect: false,
                    emperor: emperorToShow,
                    roundScore: 0, // 未猜中不得分
                    totalScore: gameInfo.totalScore,
                    wrongGuesses: gameInfo.wrongGuesses,
                    isRoundComplete: true,
                    emperorsCompleted: gameInfo.currentEmperorIndex
                });
                
            } else if (result.showResult) {
                // 皇帝未猜中，跳过到下一个皇帝，显示结算界面
                console.log('皇帝未猜中，跳过');
                
                this.uiRenderer.renderResult({
                    isCorrect: false,
                    emperor: result.failedEmperor,
                    roundScore: 0, // 未猜中不得分
                    totalScore: gameInfo.totalScore,
                    wrongGuesses: gameInfo.wrongGuesses,
                    isRoundComplete: false,
                    emperorsCompleted: gameInfo.currentEmperorIndex - 1, // 当前皇帝未完成
                    nextEmperorInfo: result.nextEmperorInfo // 下一个皇帝信息
                });
                
            } else {
                // 答案错误，继续当前皇帝
                console.log('答案错误');
                
                if (result.nextHint) {
                    // 获取难度信息
                    const difficultyInfo = this.gameController.getHintDifficultyInfo();
                    
                    // 更新提示词显示
                    this.uiRenderer.renderHint(
                        result.nextHint,
                        gameInfo.hintIndex,
                        gameInfo.totalHints,
                        difficultyInfo.current,
                        gameInfo.currentEmperorIndex,
                        gameInfo.maxEmperorsPerRound,
                        this.gameController.canShowHintHistory()
                    );
                    
                    // 更新分数显示
                    this.uiRenderer.renderScore(gameInfo.currentRoundScore, gameInfo.totalScore);
                    
                    // 更新输入界面
                    this.uiRenderer.renderInput({
                        enabled: true,
                        wrongGuesses: gameInfo.wrongGuesses
                    });
                }
            }
            
        } catch (error) {
            console.error('处理猜测失败:', error);
            this.uiRenderer.showError('处理猜测失败: ' + error.message);
        }
    }
    
    /**
     * 处理下一轮事件
     * 开始下一轮游戏
     */
    async handleNextRound() {
        try {
            console.log('开始下一轮 - 显示难度选择对话框');
            
            if (!this.isInitialized) {
                throw new Error('应用程序未初始化');
            }
            
            // 检查是否可以开始新轮次
            if (!this.gameController.canStartNewRound()) {
                this.uiRenderer.showError('当前无法开始新轮次');
                return;
            }
            
            // 显示难度选择对话框（复用开始游戏的逻辑）
            await this.handleStartGame();
            
        } catch (error) {
            console.error('开始下一轮失败:', error);
            this.uiRenderer.showError('开始下一轮失败: ' + error.message);
        }
    }
    
    /**
     * 处理重新开始游戏事件
     * 重置游戏状态并返回开始界面
     */
    async handleRestartGame() {
        try {
            console.log('重新开始游戏');
            
            if (!this.isInitialized) {
                throw new Error('应用程序未初始化');
            }
            
            // 重置游戏控制器
            const resetSuccess = this.gameController.resetGame();
            
            if (!resetSuccess) {
                throw new Error('重置游戏失败');
            }
            
            // 显示开始界面
            this.uiRenderer.renderGameStart();
            
            // 更新分数显示（重置为0）
            this.uiRenderer.renderScore(0, 0);
            
            this.uiRenderer.showSuccess('游戏已重置');
            
        } catch (error) {
            console.error('重新开始游戏失败:', error);
            this.uiRenderer.showError('重新开始游戏失败: ' + error.message);
        }
    }
    
    /**
     * 处理显示提示词历史事件
     */
    async handleShowHintHistory() {
        try {
            console.log('显示提示词历史');
            
            if (!this.isInitialized) {
                throw new Error('应用程序未初始化');
            }
            
            // 获取提示词历史管理器
            const historyManager = this.gameController.getHintHistoryManager();
            
            if (!historyManager.canShowHistory()) {
                this.uiRenderer.showInfo('需要至少2个提示词才能查看历史记录');
                return;
            }
            
            // 显示历史查看界面
            const success = historyManager.showHistoryView();
            if (success) {
                const displayedHints = historyManager.getDisplayedHints();
                const currentIndex = historyManager.currentViewIndex;
                
                this.uiRenderer.renderHintHistory(displayedHints, currentIndex);
            }
            
        } catch (error) {
            console.error('显示提示词历史失败:', error);
            this.uiRenderer.showError('显示提示词历史失败: ' + error.message);
        }
    }
    
    /**
     * 处理隐藏提示词历史事件
     */
    async handleHideHintHistory() {
        try {
            console.log('隐藏提示词历史');
            
            if (!this.isInitialized) {
                throw new Error('应用程序未初始化');
            }
            
            // 获取提示词历史管理器
            const historyManager = this.gameController.getHintHistoryManager();
            historyManager.hideHistoryView();
            
            // 返回游戏界面
            this.uiRenderer.hideHintHistory();
            
        } catch (error) {
            console.error('隐藏提示词历史失败:', error);
            this.uiRenderer.showError('隐藏提示词历史失败: ' + error.message);
        }
    }
    
    /**
     * 处理提示词历史导航事件
     * @param {string|number} direction - 导航方向或索引
     */
    async handleHintHistoryNavigate(direction) {
        try {
            console.log('提示词历史导航:', direction);
            
            if (!this.isInitialized) {
                throw new Error('应用程序未初始化');
            }
            
            // 获取提示词历史管理器
            const historyManager = this.gameController.getHintHistoryManager();
            
            let targetHint = null;
            
            if (typeof direction === 'number') {
                // 直接导航到指定索引
                targetHint = historyManager.navigateToHint(direction);
            } else if (direction === 'prev') {
                // 导航到上一个提示词
                targetHint = historyManager.navigateToPrevious();
            } else if (direction === 'next') {
                // 导航到下一个提示词
                targetHint = historyManager.navigateToNext();
            }
            
            if (targetHint) {
                // 重新渲染历史界面
                const displayedHints = historyManager.getDisplayedHints();
                const currentIndex = historyManager.currentViewIndex;
                
                this.uiRenderer.renderHintHistory(displayedHints, currentIndex);
            }
            
        } catch (error) {
            console.error('提示词历史导航失败:', error);
            this.uiRenderer.showError('提示词历史导航失败: ' + error.message);
        }
    }
    
    /**
     * 处理返回主菜单事件
     */
    async handleReturnToMenu() {
        try {
            console.log('处理返回主菜单请求');
            
            if (!this.isInitialized) {
                throw new Error('应用程序未初始化');
            }
            
            // 显示确认对话框
            if (this.menuNavigationManager) {
                this.menuNavigationManager.showReturnToMenuConfirmation();
            } else {
                // 降级处理：直接确认
                const confirmed = confirm('您确定要返回主菜单吗？当前游戏进度和累计分数将会丢失！');
                if (confirmed) {
                    await this.handleReturnToMenuComplete();
                }
            }
            
        } catch (error) {
            console.error('处理返回主菜单失败:', error);
            this.uiRenderer.showError('返回主菜单失败: ' + error.message);
        }
    }
    
    /**
     * 处理返回主菜单完成事件
     */
    async handleReturnToMenuComplete() {
        try {
            console.log('执行返回主菜单');
            
            if (!this.isInitialized) {
                throw new Error('应用程序未初始化');
            }
            
            // 使用游戏控制器的返回主菜单方法
            const resetSuccess = this.gameController.returnToMainMenu();
            
            if (!resetSuccess) {
                throw new Error('重置游戏状态失败');
            }
            
            // 显示开始界面
            this.uiRenderer.renderGameStart();
            
            // 更新分数显示（重置为0）
            this.uiRenderer.renderScore(0, 0);
            
            this.uiRenderer.showSuccess('已返回主菜单，游戏状态已重置');
            
        } catch (error) {
            console.error('返回主菜单完成处理失败:', error);
            this.uiRenderer.showError('返回主菜单失败: ' + error.message);
        }
    }
    
    /**
     * 处理重置游戏状态事件
     */
    async handleResetGameState() {
        try {
            console.log('重置游戏状态');
            
            if (this.gameController) {
                this.gameController.returnToMainMenu();
            }
            
        } catch (error) {
            console.error('重置游戏状态失败:', error);
        }
    }
    showError(message) {
        if (this.errorHandler) {
            this.errorHandler.showError(message);
        } else if (this.uiRenderer && this.uiRenderer.isInitialized) {
            this.uiRenderer.showError(message);
        } else {
            // 降级处理：直接操作DOM
            console.error('UI渲染器不可用，使用降级错误显示:', message);
            alert('错误: ' + message);
        }
    }
    
    /**
     * 处理初始化错误
     * @param {string} message - 错误消息
     */
    handleInitializationError(message) {
        if (this.errorHandler) {
            this.errorHandler.handleError({
                type: window.ErrorTypes.INITIALIZATION_ERROR,
                severity: window.ErrorSeverity.CRITICAL,
                message: message,
                context: 'app_initialization'
            });
        } else {
            console.error('初始化错误:', message);
            this.showError(message + '，请刷新页面重试');
        }
    }
    
    /**
     * 处理游戏状态错误
     * @param {string} message - 错误消息
     * @param {Error} error - 原始错误对象
     */
    handleGameStateError(message, error) {
        if (this.errorHandler) {
            this.errorHandler.handleError({
                type: window.ErrorTypes.GAME_STATE_ERROR,
                severity: window.ErrorSeverity.MEDIUM,
                message: message,
                error: error,
                context: 'game_state_management'
            });
        } else {
            console.error('游戏状态错误:', message, error);
            this.showError(message);
        }
    }
    
    /**
     * 处理存储错误
     * @param {string} message - 错误消息
     * @param {Error} error - 原始错误对象
     */
    handleStorageError(message, error) {
        if (this.errorHandler) {
            this.errorHandler.handleError({
                type: window.ErrorTypes.STORAGE_ERROR,
                severity: window.ErrorSeverity.MEDIUM,
                message: message,
                error: error,
                context: 'data_storage'
            });
        } else {
            console.error('存储错误:', message, error);
            this.showError(message);
        }
    }
    
    /**
     * 处理数据损坏错误
     * @param {string} message - 错误消息
     * @param {any} corruptedData - 损坏的数据
     */
    handleDataCorruption(message, corruptedData) {
        if (this.errorHandler) {
            this.errorHandler.handleError({
                type: window.ErrorTypes.DATA_CORRUPTION,
                severity: window.ErrorSeverity.HIGH,
                message: message,
                corruptedData: corruptedData,
                context: 'data_integrity'
            });
        } else {
            console.error('数据损坏:', message, corruptedData);
            this.showError(message + '，数据已重置');
            // 尝试基础恢复
            if (this.gameController) {
                this.gameController.resetGame();
            }
        }
    }
    
    /**
     * 获取应用程序状态信息（用于调试）
     * @returns {Object} 应用程序状态信息
     */
    getAppInfo() {
        if (!this.isInitialized) {
            return { isInitialized: false };
        }
        
        return {
            isInitialized: true,
            gameController: this.gameController ? this.gameController.getGameInfo() : null,
            uiRenderer: this.uiRenderer ? this.uiRenderer.getCurrentState() : null
        };
    }
    
    /**
     * 清理资源
     */
    destroy() {
        if (this.uiRenderer) {
            this.uiRenderer.destroy();
        }
        
        if (this.menuNavigationManager) {
            this.menuNavigationManager.destroy();
        }
        
        if (this.adminAuthManager) {
            this.adminAuthManager.destroy();
        }
        
        this.gameController = null;
        this.uiRenderer = null;
        this.menuNavigationManager = null;
        this.adminAuthManager = null;
        this.isInitialized = false;
        
        console.log('应用程序已清理');
    }
}

/**
 * 应用程序入口点
 * 检查依赖并初始化游戏
 */
document.addEventListener('DOMContentLoaded', async () => {
    try {
        console.log('应用程序启动中...');
        
        // 检查必需的全局对象
        const requiredModules = [
            'GameTypes',
            'GameValidation', 
            'EmperorDatabase',
            'ScoreManager',
            'GameStateManager',
            'GameController',
            'UIRenderer',
            'AdminManager',
            'AdminAuthManager',
            'ErrorHandler',
            'MenuNavigationManager'
        ];
        
        for (const moduleName of requiredModules) {
            if (!window[moduleName]) {
                throw new Error(`${moduleName} 模块未加载`);
            }
        }
        
        // 创建并初始化游戏实例
        const game = new ChineseEmperorGame();
        const initSuccess = await game.init();
        
        if (!initSuccess) {
            throw new Error('游戏初始化失败');
        }
        
        // 将游戏实例暴露到全局作用域（用于调试）
        window.game = game;
        
        console.log('应用程序启动成功');
        
    } catch (error) {
        console.error('应用程序启动失败:', error);
        
        // 显示错误信息给用户
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: #ff4444;
            color: white;
            padding: 20px;
            border-radius: 8px;
            text-align: center;
            z-index: 9999;
            max-width: 400px;
        `;
        errorDiv.innerHTML = `
            <h3>应用程序启动失败</h3>
            <p>${error.message}</p>
            <p>请刷新页面重试，如果问题持续存在，请检查控制台错误信息。</p>
            <button onclick="location.reload()" style="margin-top: 10px; padding: 8px 16px; background: white; color: #ff4444; border: none; border-radius: 4px; cursor: pointer;">刷新页面</button>
        `;
        
        document.body.appendChild(errorDiv);
    }
});