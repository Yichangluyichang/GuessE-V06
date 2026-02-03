/**
 * 中国皇帝猜谜游戏 - 用户界面渲染器
 * 负责游戏界面的渲染和更新，处理用户输入和界面状态变化
 * 需求: 6.2, 6.3, 6.4, 1.5
 */

/**
 * 用户界面渲染器类
 * 管理游戏界面的显示和用户交互
 */
class UIRenderer {
    constructor() {
        // DOM 元素缓存
        this.elements = {};
        
        // 界面状态
        this.currentScreen = null;
        this.isInitialized = false;
        this.isHistoryViewVisible = false;
        
        // 事件回调函数
        this.callbacks = {
            onStartGame: null,
            onSubmitGuess: null,
            onNextRound: null,
            onRestartGame: null,
            onShowHintHistory: null,
            onHideHintHistory: null,
            onReturnToMenu: null
        };
        
        // 绑定方法上下文
        this.init = this.init.bind(this);
        this.renderGameStart = this.renderGameStart.bind(this);
        this.renderHint = this.renderHint.bind(this);
        this.renderScore = this.renderScore.bind(this);
        this.renderResult = this.renderResult.bind(this);
        this.renderInput = this.renderInput.bind(this);
        this.showScreen = this.showScreen.bind(this);
        this.handleStartGame = this.handleStartGame.bind(this);
        this.handleSubmitGuess = this.handleSubmitGuess.bind(this);
        this.handleNextRound = this.handleNextRound.bind(this);
        this.handleRestartGame = this.handleRestartGame.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.handleShowHintHistory = this.handleShowHintHistory.bind(this);
        this.handleHideHintHistory = this.handleHideHintHistory.bind(this);
        this.handleHintHistoryNavigation = this.handleHintHistoryNavigation.bind(this);
        this.handleReturnToMenu = this.handleReturnToMenu.bind(this);
    }
    
    /**
     * 初始化UI渲染器
     * 缓存DOM元素并绑定事件监听器
     * @param {Object} callbacks - 事件回调函数
     * @returns {boolean} 初始化是否成功
     */
    init(callbacks = {}) {
        try {
            console.log('初始化UI渲染器...');
            
            // 设置回调函数
            this.callbacks = { ...this.callbacks, ...callbacks };
            
            // 缓存DOM元素
            this.cacheElements();
            
            // 绑定事件监听器
            this.bindEvents();
            
            // 初始化界面状态
            this.renderGameStart();
            
            this.isInitialized = true;
            console.log('UI渲染器初始化完成');
            return true;
            
        } catch (error) {
            console.error('UI渲染器初始化失败:', error);
            this.isInitialized = false;
            return false;
        }
    }
    
    /**
     * 缓存DOM元素引用
     */
    cacheElements() {
        const elementIds = [
            // 屏幕元素
            'start-screen', 'game-screen', 'result-screen', 'hint-history-screen',
            
            // 按钮元素
            'start-game-btn', 'submit-guess-btn', 'next-round-btn', 'restart-game-btn',
            'show-hint-history-btn', 'hide-hint-history-btn',
            
            // 分数显示元素
            'current-score', 'total-score',
            
            // 游戏界面元素
            'current-hint-num', 'hint-text', 'difficulty-level',
            'guess-input', 'wrong-list',
            
            // 结果界面元素
            'result-title', 'result-emperor-name', 'emperor-details',
            'round-score', 'final-total-score',
            
            // 提示词历史界面元素
            'hint-history-list', 'hint-history-navigation',
            'history-prev-btn', 'history-next-btn', 'current-history-index',
            
            // 返回主菜单按钮元素
            'return-to-menu-game-btn', 'return-to-menu-result-btn', 'return-to-menu-history-btn'
        ];
        
        for (const id of elementIds) {
            const element = document.getElementById(id);
            if (!element) {
                // 某些元素可能不存在（如历史查看相关元素），这是正常的
                if (!id.includes('history')) {
                    throw new Error(`找不到DOM元素: ${id}`);
                }
                console.warn(`可选DOM元素不存在: ${id}`);
                continue;
            }
            this.elements[id] = element;
        }
    }
    
    /**
     * 绑定事件监听器
     */
    bindEvents() {
        // 按钮事件
        this.elements['start-game-btn'].addEventListener('click', this.handleStartGame);
        this.elements['submit-guess-btn'].addEventListener('click', this.handleSubmitGuess);
        this.elements['next-round-btn'].addEventListener('click', this.handleNextRound);
        this.elements['restart-game-btn'].addEventListener('click', this.handleRestartGame);
        
        // 提示词历史相关事件（如果元素存在）
        if (this.elements['show-hint-history-btn']) {
            this.elements['show-hint-history-btn'].addEventListener('click', this.handleShowHintHistory);
        }
        if (this.elements['hide-hint-history-btn']) {
            this.elements['hide-hint-history-btn'].addEventListener('click', this.handleHideHintHistory);
        }
        if (this.elements['history-prev-btn']) {
            this.elements['history-prev-btn'].addEventListener('click', () => this.handleHintHistoryNavigation('prev'));
        }
        if (this.elements['history-next-btn']) {
            this.elements['history-next-btn'].addEventListener('click', () => this.handleHintHistoryNavigation('next'));
        }
        
        // 返回主菜单按钮事件
        if (this.elements['return-to-menu-game-btn']) {
            this.elements['return-to-menu-game-btn'].addEventListener('click', this.handleReturnToMenu);
        }
        if (this.elements['return-to-menu-result-btn']) {
            this.elements['return-to-menu-result-btn'].addEventListener('click', this.handleReturnToMenu);
        }
        if (this.elements['return-to-menu-history-btn']) {
            this.elements['return-to-menu-history-btn'].addEventListener('click', this.handleReturnToMenu);
        }
        
        // 键盘事件
        this.elements['guess-input'].addEventListener('keypress', this.handleKeyPress);
        
        // 输入验证
        this.elements['guess-input'].addEventListener('input', (e) => {
            const cleaned = window.GameValidation.sanitizeInput(e.target.value);
            if (cleaned !== e.target.value) {
                e.target.value = cleaned;
            }
        });
    }
    
    /**
     * 渲染游戏开始界面
     * 需求: 6.2 - 显示游戏开始界面
     */
    renderGameStart() {
        console.log('渲染游戏开始界面');
        
        // 显示开始屏幕
        this.showScreen('start-screen');
        
        // 重置输入框
        this.elements['guess-input'].value = '';
        
        // 清空错误猜测列表
        this.elements['wrong-list'].innerHTML = '';
        
        this.currentScreen = 'start';
    }
    
    /**
     * 渲染提示词界面
     * 需求: 6.3 - 显示当前提示词、输入框和提交按钮
     * @param {string} hint - 提示词内容
     * @param {number} hintIndex - 当前提示词索引 (0-based)
     * @param {number} totalHints - 总提示词数量
     * @param {string} difficulty - 提示词难度
     * @param {number} emperorIndex - 当前皇帝索引 (0-based)
     * @param {number} maxEmperors - 最大皇帝数量
     * @param {boolean} canShowHistory - 是否可以显示历史记录
     */
    renderHint(hint, hintIndex = 0, totalHints = 10, difficulty = 'hard', emperorIndex = 0, maxEmperors = 10, canShowHistory = false) {
        console.log(`渲染提示词: ${hint} (${hintIndex + 1}/${totalHints}) - 皇帝 ${emperorIndex + 1}/${maxEmperors}`);
        
        // 显示游戏屏幕
        this.showScreen('game-screen');
        
        // 更新提示词内容
        this.elements['hint-text'].textContent = hint;
        
        // 更新提示词编号
        this.elements['current-hint-num'].textContent = hintIndex + 1;
        
        // 更新难度显示
        const difficultyText = this.getDifficultyText(difficulty);
        this.elements['difficulty-level'].textContent = difficultyText;
        this.elements['difficulty-level'].className = `difficulty-${difficulty}`;
        
        // 更新皇帝进度显示
        this.updateEmperorProgress(emperorIndex + 1, maxEmperors);
        
        // 更新历史查看按钮显示状态
        this.updateHintHistoryButton(canShowHistory);
        
        // 显示返回主菜单按钮
        this.showReturnToMenuButton('game');
        
        // 清空并聚焦输入框
        this.elements['guess-input'].value = '';
        this.elements['guess-input'].focus();
        
        // 启用提交按钮
        this.elements['submit-guess-btn'].disabled = false;
        
        this.currentScreen = 'game';
    }
    
    /**
     * 渲染分数显示
     * @param {number} currentRoundScore - 当前轮次分数
     * @param {number} totalScore - 总分数
     */
    renderScore(currentRoundScore, totalScore) {
        console.log(`更新分数显示: 当前轮次=${currentRoundScore}, 总分=${totalScore}`);
        
        // 更新分数显示
        this.elements['current-score'].textContent = currentRoundScore;
        this.elements['total-score'].textContent = totalScore;
        
        // 添加分数变化动画效果
        this.animateScoreChange(this.elements['current-score']);
        this.animateScoreChange(this.elements['total-score']);
    }
    
    /**
     * 渲染游戏结果界面
     * 需求: 6.4 - 显示结果和分数
     * @param {Object} result - 游戏结果对象
     * @param {boolean} result.isCorrect - 是否答对
     * @param {Object} result.emperor - 皇帝信息
     * @param {number} result.roundScore - 本轮得分
     * @param {number} result.totalScore - 总分
     * @param {string[]} result.wrongGuesses - 错误猜测列表
     * @param {boolean} result.isRoundComplete - 是否轮次完成
     * @param {number} result.emperorsCompleted - 完成的皇帝数量
     * @param {Object} result.nextEmperorInfo - 下一个皇帝信息（如果有）
     */
    renderResult(result) {
        console.log('渲染游戏结果界面', result);
        
        // 显示结果屏幕
        this.showScreen('result-screen');
        
        // 设置结果标题
        let resultTitle;
        if (result.isRoundComplete) {
            resultTitle = `轮次完成！完成了 ${result.emperorsCompleted || 0} 个皇帝`;
        } else if (result.isCorrect) {
            resultTitle = '恭喜答对！';
        } else {
            resultTitle = '很遗憾，未能猜中';
        }
        
        this.elements['result-title'].textContent = resultTitle;
        this.elements['result-title'].className = result.isCorrect ? 'correct' : 'incorrect';
        
        // 显示皇帝信息
        if (result.emperor) {
            this.renderEmperorInfo(result.emperor);
        }
        
        // 显示分数信息
        this.elements['round-score'].textContent = result.roundScore || 0;
        this.elements['final-total-score'].textContent = result.totalScore || 0;
        
        // 更新按钮文本和行为
        const nextRoundBtn = this.elements['next-round-btn'];
        if (result.isRoundComplete) {
            // 轮次完成，显示"下一轮"
            nextRoundBtn.textContent = '下一轮';
            nextRoundBtn.style.display = 'inline-block';
        } else if (result.nextEmperorInfo) {
            // 有下一个皇帝，显示"继续下一个皇帝"
            nextRoundBtn.textContent = '继续下一个皇帝';
            nextRoundBtn.style.display = 'inline-block';
            
            // 存储下一个皇帝信息，供按钮点击时使用
            this.nextEmperorInfo = result.nextEmperorInfo;
        } else {
            // 没有下一个皇帝，隐藏按钮
            nextRoundBtn.style.display = 'none';
        }
        
        // 添加结果动画效果
        this.animateResultDisplay();
        
        // 显示返回主菜单按钮
        this.showReturnToMenuButton('result');
        
        this.currentScreen = 'result';
    }
    
    /**
     * 渲染输入界面状态
     * 更新输入框和相关UI元素的状态
     * @param {Object} options - 输入选项
     * @param {boolean} options.enabled - 是否启用输入
     * @param {string} options.placeholder - 占位符文本
     * @param {string[]} options.wrongGuesses - 错误猜测列表
     */
    renderInput(options = {}) {
        const {
            enabled = true,
            placeholder = '请输入皇帝的谥号、庙号、年号或名字...',
            wrongGuesses = []
        } = options;
        
        console.log('更新输入界面状态', options);
        
        // 更新输入框状态
        this.elements['guess-input'].disabled = !enabled;
        this.elements['guess-input'].placeholder = placeholder;
        
        // 更新提交按钮状态
        this.elements['submit-guess-btn'].disabled = !enabled;
        
        // 更新错误猜测列表
        this.renderWrongGuesses(wrongGuesses);
        
        // 如果启用，聚焦输入框
        if (enabled && this.currentScreen === 'game') {
            this.elements['guess-input'].focus();
        }
    }
    
    /**
     * 显示指定屏幕
     * @param {string} screenId - 屏幕ID
     */
    showScreen(screenId) {
        // 隐藏所有屏幕
        const screens = document.querySelectorAll('.screen');
        screens.forEach(screen => screen.classList.remove('active'));
        
        // 显示指定屏幕
        const targetScreen = document.getElementById(screenId);
        if (targetScreen) {
            targetScreen.classList.add('active');
            console.log(`显示屏幕: ${screenId}`);
        } else {
            console.error(`找不到屏幕: ${screenId}`);
        }
    }
    
    /**
     * 渲染皇帝信息
     * @param {Object} emperor - 皇帝对象
     */
    renderEmperorInfo(emperor) {
        // 显示皇帝名字
        this.elements['result-emperor-name'].textContent = emperor.name;
        
        // 构建详细信息
        const details = [];
        
        if (emperor.templeName) {
            details.push(`庙号: ${emperor.templeName}`);
        }
        
        if (emperor.posthumousName) {
            details.push(`谥号: ${emperor.posthumousName}`);
        }
        
        if (emperor.reignNames && emperor.reignNames.length > 0) {
            details.push(`年号: ${emperor.reignNames.join('、')}`);
        }
        
        // 显示详细信息
        this.elements['emperor-details'].innerHTML = details.map(detail => 
            `<p>${detail}</p>`
        ).join('');
    }
    
    /**
     * 渲染错误猜测列表
     * @param {string[]} wrongGuesses - 错误猜测数组
     */
    renderWrongGuesses(wrongGuesses) {
        if (!wrongGuesses || wrongGuesses.length === 0) {
            this.elements['wrong-list'].innerHTML = '<p class="no-wrong-guesses">暂无错误猜测</p>';
            return;
        }
        
        const wrongItems = wrongGuesses.map(guess => 
            `<span class="wrong-guess">${guess}</span>`
        ).join('');
        
        this.elements['wrong-list'].innerHTML = wrongItems;
    }
    
    /**
     * 更新皇帝进度显示
     * @param {number} currentEmperor - 当前皇帝编号 (1-based)
     * @param {number} totalEmperors - 总皇帝数量
     */
    updateEmperorProgress(currentEmperor, totalEmperors) {
        // 查找或创建皇帝进度显示元素
        let progressElement = document.getElementById('emperor-progress');
        if (!progressElement) {
            // 如果不存在，创建进度显示元素
            progressElement = document.createElement('div');
            progressElement.id = 'emperor-progress';
            progressElement.className = 'emperor-progress';
            
            // 插入到游戏屏幕的适当位置
            const gameScreen = document.getElementById('game-screen');
            const hintSection = gameScreen.querySelector('.hint-section');
            if (hintSection) {
                gameScreen.insertBefore(progressElement, hintSection);
            }
        }
        
        progressElement.innerHTML = `
            <div class="progress-text">皇帝进度: ${currentEmperor}/${totalEmperors}</div>
            <div class="progress-bar">
                <div class="progress-fill" style="width: ${(currentEmperor / totalEmperors) * 100}%"></div>
            </div>
        `;
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
     * 更新提示词历史查看按钮的显示状态
     * @param {boolean} canShowHistory - 是否可以显示历史记录
     */
    updateHintHistoryButton(canShowHistory) {
        if (this.elements['show-hint-history-btn']) {
            if (canShowHistory) {
                this.elements['show-hint-history-btn'].style.display = 'inline-block';
                this.elements['show-hint-history-btn'].disabled = false;
            } else {
                this.elements['show-hint-history-btn'].style.display = 'none';
                this.elements['show-hint-history-btn'].disabled = true;
            }
        }
    }
    
    /**
     * 渲染提示词历史查看界面
     * @param {DisplayedHint[]} displayedHints - 已显示的提示词列表
     * @param {number} currentIndex - 当前查看的提示词索引
     */
    renderHintHistory(displayedHints, currentIndex = 0) {
        console.log('渲染提示词历史查看界面', { hintsCount: displayedHints.length, currentIndex });
        
        if (!this.elements['hint-history-screen']) {
            console.warn('提示词历史界面元素不存在，无法渲染');
            return;
        }
        
        // 显示历史查看屏幕
        this.showScreen('hint-history-screen');
        this.isHistoryViewVisible = true;
        
        // 渲染历史提示词列表
        this.renderHintHistoryList(displayedHints, currentIndex);
        
        // 更新导航控件
        this.updateHintHistoryNavigation(displayedHints.length, currentIndex);
        
        this.currentScreen = 'hint-history';
    }
    
    /**
     * 渲染提示词历史列表
     * @param {DisplayedHint[]} displayedHints - 已显示的提示词列表
     * @param {number} currentIndex - 当前查看的提示词索引
     */
    renderHintHistoryList(displayedHints, currentIndex) {
        if (!this.elements['hint-history-list']) {
            return;
        }
        
        const listContainer = this.elements['hint-history-list'];
        listContainer.innerHTML = '';
        
        if (displayedHints.length === 0) {
            listContainer.innerHTML = '<p class="no-history">暂无提示词历史记录</p>';
            return;
        }
        
        // 创建历史提示词列表
        const historyList = document.createElement('div');
        historyList.className = 'hint-history-items';
        
        displayedHints.forEach((displayedHint, index) => {
            const historyItem = document.createElement('div');
            historyItem.className = `hint-history-item ${index === currentIndex ? 'current' : ''}`;
            historyItem.dataset.index = index;
            
            const difficultyText = this.getDifficultyText(displayedHint.hint.difficulty);
            
            historyItem.innerHTML = `
                <div class="hint-history-header">
                    <span class="hint-number">提示 ${displayedHint.displayIndex}</span>
                    <span class="hint-difficulty difficulty-${displayedHint.hint.difficulty}">${difficultyText}</span>
                </div>
                <div class="hint-history-content">${displayedHint.hint.content}</div>
                <div class="hint-history-time">${this.formatTimestamp(displayedHint.timestamp)}</div>
            `;
            
            // 添加点击事件
            historyItem.addEventListener('click', () => {
                if (this.callbacks.onHintHistoryNavigate) {
                    this.callbacks.onHintHistoryNavigate(index);
                }
            });
            
            historyList.appendChild(historyItem);
        });
        
        listContainer.appendChild(historyList);
    }
    
    /**
     * 更新提示词历史导航控件
     * @param {number} totalHints - 总提示词数量
     * @param {number} currentIndex - 当前查看的提示词索引
     */
    updateHintHistoryNavigation(totalHints, currentIndex) {
        if (!this.elements['hint-history-navigation']) {
            return;
        }
        
        // 更新当前索引显示
        if (this.elements['current-history-index']) {
            this.elements['current-history-index'].textContent = `${currentIndex + 1} / ${totalHints}`;
        }
        
        // 更新导航按钮状态
        if (this.elements['history-prev-btn']) {
            this.elements['history-prev-btn'].disabled = currentIndex <= 0;
        }
        
        if (this.elements['history-next-btn']) {
            this.elements['history-next-btn'].disabled = currentIndex >= totalHints - 1;
        }
    }
    
    /**
     * 隐藏提示词历史查看界面
     */
    hideHintHistory() {
        console.log('隐藏提示词历史查看界面');
        this.isHistoryViewVisible = false;
        
        // 返回到游戏界面
        this.showScreen('game-screen');
        this.currentScreen = 'game';
        
        // 重新聚焦输入框
        if (this.elements['guess-input']) {
            this.elements['guess-input'].focus();
        }
    }
    
    /**
     * 格式化时间戳
     * @param {number} timestamp - 时间戳
     * @returns {string} 格式化的时间字符串
     */
    formatTimestamp(timestamp) {
        const date = new Date(timestamp);
        const now = new Date();
        const diffMs = now - date;
        const diffSeconds = Math.floor(diffMs / 1000);
        const diffMinutes = Math.floor(diffSeconds / 60);
        
        if (diffSeconds < 60) {
            return `${diffSeconds}秒前`;
        } else if (diffMinutes < 60) {
            return `${diffMinutes}分钟前`;
        } else {
            return date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
        }
    }
    animateScoreChange(element) {
        element.classList.add('score-change');
        setTimeout(() => {
            element.classList.remove('score-change');
        }, 500);
    }
    
    /**
     * 结果显示动画效果
     */
    animateResultDisplay() {
        const resultContent = document.getElementById('result-content');
        if (resultContent) {
            resultContent.classList.add('result-appear');
            setTimeout(() => {
                resultContent.classList.remove('result-appear');
            }, 800);
        }
    }
    
    /**
     * 显示消息提示
     * @param {string} message - 消息内容
     * @param {string} type - 消息类型 ('success', 'error', 'info')
     * @param {number} duration - 显示时长（毫秒）
     */
    showMessage(message, type = 'info', duration = 3000) {
        // 创建消息元素
        const messageDiv = document.createElement('div');
        messageDiv.className = `message message-${type}`;
        messageDiv.textContent = message;
        
        // 插入到主容器顶部
        const container = document.getElementById('game-container');
        container.insertBefore(messageDiv, container.firstChild);
        
        // 添加显示动画
        setTimeout(() => messageDiv.classList.add('show'), 10);
        
        // 自动移除
        setTimeout(() => {
            messageDiv.classList.remove('show');
            setTimeout(() => {
                if (messageDiv.parentNode) {
                    messageDiv.parentNode.removeChild(messageDiv);
                }
            }, 300);
        }, duration);
    }
    
    /**
     * 显示成功消息
     * @param {string} message - 消息内容
     */
    showSuccess(message) {
        this.showMessage(message, 'success');
    }
    
    /**
     * 显示错误消息
     * @param {string} message - 消息内容
     */
    showError(message) {
        this.showMessage(message, 'error');
    }
    
    /**
     * 显示信息消息
     * @param {string} message - 消息内容
     */
    showInfo(message) {
        this.showMessage(message, 'info');
    }
    
    // 事件处理方法
    
    /**
     * 处理开始游戏事件
     */
    handleStartGame() {
        console.log('UI: 开始游戏按钮被点击');
        if (this.callbacks.onStartGame) {
            this.callbacks.onStartGame();
        }
    }
    
    /**
     * 处理提交猜测事件
     */
    handleSubmitGuess() {
        const guess = this.elements['guess-input'].value.trim();
        
        if (!guess) {
            this.showError('请输入您的猜测');
            return;
        }
        
        console.log(`UI: 提交猜测 - ${guess}`);
        
        if (this.callbacks.onSubmitGuess) {
            this.callbacks.onSubmitGuess(guess);
        }
    }
    
    /**
     * 处理下一轮事件
     */
    handleNextRound() {
        console.log('UI: 下一轮/继续按钮被点击');
        
        // 检查是否有下一个皇帝信息（继续当前轮次）
        if (this.nextEmperorInfo) {
            console.log('继续下一个皇帝:', this.nextEmperorInfo.emperor.name);
            
            // 直接渲染下一个皇帝的游戏界面
            this.showScreen('game-screen');
            
            // 获取难度信息（假设第一个提示词是困难）
            const difficultyInfo = { current: 'hard' }; // 简化处理
            
            // 渲染新皇帝的提示词
            this.renderHint(
                this.nextEmperorInfo.hint,
                0, // 新皇帝从第一个提示词开始
                10, // 每个皇帝都有10个提示词
                difficultyInfo.current,
                this.nextEmperorInfo.emperorIndex,
                this.nextEmperorInfo.maxEmperors
            );
            
            // 更新分数显示
            this.renderScore(this.nextEmperorInfo.currentRoundScore, this.nextEmperorInfo.totalScore);
            
            // 重置输入界面
            this.renderInput({
                enabled: true,
                wrongGuesses: []
            });
            
            // 清除下一个皇帝信息
            this.nextEmperorInfo = null;
            
        } else {
            // 开始新轮次
            if (this.callbacks.onNextRound) {
                this.callbacks.onNextRound();
            }
        }
    }
    
    /**
     * 处理重新开始游戏事件
     */
    handleRestartGame() {
        console.log('UI: 重新开始按钮被点击');
        if (this.callbacks.onRestartGame) {
            this.callbacks.onRestartGame();
        }
    }
    
    /**
     * 处理键盘按键事件
     * @param {KeyboardEvent} e - 键盘事件
     */
    handleKeyPress(e) {
        if (e.key === 'Enter') {
            this.handleSubmitGuess();
        }
    }
    
    /**
     * 获取当前界面状态
     * @returns {Object} 界面状态信息
     */
    getCurrentState() {
        return {
            isInitialized: this.isInitialized,
            currentScreen: this.currentScreen,
            inputValue: this.elements['guess-input'] ? this.elements['guess-input'].value : '',
            inputEnabled: this.elements['guess-input'] ? !this.elements['guess-input'].disabled : false
        };
    }
    
    /**
     * 设置回调函数
     * @param {Object} callbacks - 回调函数对象
     */
    setCallbacks(callbacks) {
        this.callbacks = { ...this.callbacks, ...callbacks };
    }
    
    /**
     * 处理显示提示词历史事件
     */
    handleShowHintHistory() {
        console.log('UI: 显示提示词历史按钮被点击');
        if (this.callbacks.onShowHintHistory) {
            this.callbacks.onShowHintHistory();
        }
    }
    
    /**
     * 处理隐藏提示词历史事件
     */
    handleHideHintHistory() {
        console.log('UI: 隐藏提示词历史按钮被点击');
        if (this.callbacks.onHideHintHistory) {
            this.callbacks.onHideHintHistory();
        }
    }
    
    /**
     * 处理提示词历史导航事件
     * @param {string} direction - 导航方向 ('prev' 或 'next')
     */
    handleHintHistoryNavigation(direction) {
        console.log(`UI: 提示词历史导航 - ${direction}`);
        if (this.callbacks.onHintHistoryNavigate) {
            this.callbacks.onHintHistoryNavigate(direction);
        }
    }
    
    /**
     * 处理返回主菜单事件
     */
    handleReturnToMenu() {
        console.log('UI: 返回主菜单按钮被点击');
        if (this.callbacks.onReturnToMenu) {
            this.callbacks.onReturnToMenu();
        }
    }
    
    /**
     * 显示返回主菜单按钮
     * 需求: 12.1, 12.2, 12.3, 12.8 - 在各个界面显示返回主菜单按钮
     * @param {string} screen - 当前屏幕类型 ('game', 'result', 'history')
     */
    showReturnToMenuButton(screen) {
        const buttonId = `return-to-menu-${screen}-btn`;
        let button = this.elements[buttonId];
        
        if (!button) {
            // 创建返回主菜单按钮
            button = this.createReturnToMenuButton(screen);
            if (button) {
                this.elements[buttonId] = button;
            }
        }
        
        if (button) {
            button.style.display = 'inline-block';
        }
    }
    
    /**
     * 创建返回主菜单按钮
     * @param {string} screen - 屏幕类型
     * @returns {HTMLElement|null} 创建的按钮元素
     */
    createReturnToMenuButton(screen) {
        const button = document.createElement('button');
        button.id = `return-to-menu-${screen}-btn`;
        button.className = 'return-to-menu-btn secondary-btn';
        button.textContent = '返回主菜单';
        button.title = '返回主菜单';
        
        // 绑定事件
        button.addEventListener('click', this.handleReturnToMenu);
        
        // 根据屏幕类型插入到合适位置
        let targetContainer = null;
        
        switch (screen) {
            case 'game':
                targetContainer = document.querySelector('#game-screen #hint-history-controls');
                if (!targetContainer) {
                    targetContainer = document.querySelector('#game-screen #input-container');
                }
                break;
                
            case 'result':
                targetContainer = document.querySelector('#result-screen #result-actions');
                break;
                
            case 'history':
                targetContainer = document.querySelector('#hint-history-screen #hint-history-actions');
                break;
        }
        
        if (targetContainer) {
            targetContainer.appendChild(button);
            return button;
        } else {
            console.warn(`无法找到${screen}屏幕的容器来插入返回主菜单按钮`);
            return null;
        }
    }
    
    /**
     * 更新提示词历史查看按钮的显示状态
     * @param {boolean} canShowHistory - 是否可以显示历史记录
     */
    updateHintHistoryButton(canShowHistory) {
        if (this.elements['show-hint-history-btn']) {
            if (canShowHistory) {
                this.elements['show-hint-history-btn'].style.display = 'inline-block';
                this.elements['show-hint-history-btn'].disabled = false;
            } else {
                this.elements['show-hint-history-btn'].style.display = 'none';
                this.elements['show-hint-history-btn'].disabled = true;
            }
        }
    }
    
    /**
     * 渲染提示词历史查看界面
     * @param {DisplayedHint[]} displayedHints - 已显示的提示词列表
     * @param {number} currentIndex - 当前查看的提示词索引
     */
    renderHintHistory(displayedHints, currentIndex = 0) {
        console.log('渲染提示词历史查看界面', { hintsCount: displayedHints.length, currentIndex });
        
        if (!this.elements['hint-history-screen']) {
            console.warn('提示词历史界面元素不存在，无法渲染');
            return;
        }
        
        // 显示历史查看屏幕
        this.showScreen('hint-history-screen');
        this.isHistoryViewVisible = true;
        
        // 渲染历史提示词列表
        this.renderHintHistoryList(displayedHints, currentIndex);
        
        // 更新导航控件
        this.updateHintHistoryNavigation(displayedHints.length, currentIndex);
        
        this.currentScreen = 'hint-history';
    }
    
    /**
     * 渲染提示词历史列表
     * @param {DisplayedHint[]} displayedHints - 已显示的提示词列表
     * @param {number} currentIndex - 当前查看的提示词索引
     */
    renderHintHistoryList(displayedHints, currentIndex) {
        if (!this.elements['hint-history-list']) {
            return;
        }
        
        const listContainer = this.elements['hint-history-list'];
        listContainer.innerHTML = '';
        
        if (displayedHints.length === 0) {
            listContainer.innerHTML = '<p class="no-history">暂无提示词历史记录</p>';
            return;
        }
        
        // 创建历史提示词列表
        const historyList = document.createElement('div');
        historyList.className = 'hint-history-items';
        
        displayedHints.forEach((displayedHint, index) => {
            const historyItem = document.createElement('div');
            historyItem.className = `hint-history-item ${index === currentIndex ? 'current' : ''}`;
            historyItem.dataset.index = index;
            
            const difficultyText = this.getDifficultyText(displayedHint.hint.difficulty);
            
            historyItem.innerHTML = `
                <div class="hint-history-header">
                    <span class="hint-number">提示 ${displayedHint.displayIndex}</span>
                    <span class="hint-difficulty difficulty-${displayedHint.hint.difficulty}">${difficultyText}</span>
                </div>
                <div class="hint-history-content">${displayedHint.hint.content}</div>
                <div class="hint-history-time">${this.formatTimestamp(displayedHint.timestamp)}</div>
            `;
            
            // 添加点击事件
            historyItem.addEventListener('click', () => {
                if (this.callbacks.onHintHistoryNavigate) {
                    this.callbacks.onHintHistoryNavigate(index);
                }
            });
            
            historyList.appendChild(historyItem);
        });
        
        listContainer.appendChild(historyList);
    }
    
    /**
     * 更新提示词历史导航控件
     * @param {number} totalHints - 总提示词数量
     * @param {number} currentIndex - 当前查看的提示词索引
     */
    updateHintHistoryNavigation(totalHints, currentIndex) {
        if (!this.elements['hint-history-navigation']) {
            return;
        }
        
        // 更新当前索引显示
        if (this.elements['current-history-index']) {
            this.elements['current-history-index'].textContent = `${currentIndex + 1} / ${totalHints}`;
        }
        
        // 更新导航按钮状态
        if (this.elements['history-prev-btn']) {
            this.elements['history-prev-btn'].disabled = currentIndex <= 0;
        }
        
        if (this.elements['history-next-btn']) {
            this.elements['history-next-btn'].disabled = currentIndex >= totalHints - 1;
        }
    }
    
    /**
     * 隐藏提示词历史查看界面
     */
    hideHintHistory() {
        console.log('隐藏提示词历史查看界面');
        this.isHistoryViewVisible = false;
        
        // 返回到游戏界面
        this.showScreen('game-screen');
        this.currentScreen = 'game';
        
        // 重新聚焦输入框
        if (this.elements['guess-input']) {
            this.elements['guess-input'].focus();
        }
    }
    
    /**
     * 格式化时间戳
     * @param {number} timestamp - 时间戳
     * @returns {string} 格式化的时间字符串
     */
    formatTimestamp(timestamp) {
        const date = new Date(timestamp);
        const now = new Date();
        const diffMs = now - date;
        const diffSeconds = Math.floor(diffMs / 1000);
        const diffMinutes = Math.floor(diffSeconds / 60);
        
        if (diffSeconds < 60) {
            return `${diffSeconds}秒前`;
        } else if (diffMinutes < 60) {
            return `${diffMinutes}分钟前`;
        } else {
            return date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
        }
    }
    destroy() {
        // 移除事件监听器
        if (this.isInitialized) {
            this.elements['start-game-btn'].removeEventListener('click', this.handleStartGame);
            this.elements['submit-guess-btn'].removeEventListener('click', this.handleSubmitGuess);
            this.elements['next-round-btn'].removeEventListener('click', this.handleNextRound);
            this.elements['restart-game-btn'].removeEventListener('click', this.handleRestartGame);
            this.elements['guess-input'].removeEventListener('keypress', this.handleKeyPress);
        }
        
        // 清空引用
        this.elements = {};
        this.callbacks = {};
        this.isInitialized = false;
        
        console.log('UI渲染器已清理');
    }
}

// 导出到全局作用域
window.UIRenderer = UIRenderer;