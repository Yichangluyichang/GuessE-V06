/**
 * 中国皇帝猜谜游戏 - 难度管理器
 * 负责管理游戏难度选择对话框和难度验证
 */

/**
 * 难度管理器类
 * 处理难度选择对话框的显示、隐藏和玩家选择
 */
class DifficultyManager {
    constructor(emperorDatabase) {
        this.emperorDatabase = emperorDatabase;
        this.selectedDifficulty = null;
        this.onDifficultySelected = null; // 回调函数
        
        // DOM 元素引用
        this.dialogElement = null;
        this.easyButton = null;
        this.mediumButton = null;
        this.hardButton = null;
        this.easyCountElement = null;
        this.mediumCountElement = null;
        this.hardCountElement = null;
        
        // 绑定方法上下文
        this.show = this.show.bind(this);
        this.hide = this.hide.bind(this);
        this.handleDifficultySelection = this.handleDifficultySelection.bind(this);
    }
    
    /**
     * 初始化难度管理器
     * @returns {boolean} 初始化是否成功
     */
    init() {
        try {
            // 获取 DOM 元素
            this.dialogElement = document.getElementById('difficulty-dialog');
            this.easyButton = document.getElementById('difficulty-easy-btn');
            this.mediumButton = document.getElementById('difficulty-medium-btn');
            this.hardButton = document.getElementById('difficulty-hard-btn');
            this.easyCountElement = document.getElementById('difficulty-easy-count');
            this.mediumCountElement = document.getElementById('difficulty-medium-count');
            this.hardCountElement = document.getElementById('difficulty-hard-count');
            
            if (!this.dialogElement) {
                console.error('难度选择对话框元素未找到');
                return false;
            }
            
            // 绑定事件监听器
            if (this.easyButton) {
                this.easyButton.addEventListener('click', () => this.handleDifficultySelection('easy'));
            }
            if (this.mediumButton) {
                this.mediumButton.addEventListener('click', () => this.handleDifficultySelection('medium'));
            }
            if (this.hardButton) {
                this.hardButton.addEventListener('click', () => this.handleDifficultySelection('hard'));
            }
            
            console.log('难度管理器初始化成功');
            return true;
            
        } catch (error) {
            console.error('难度管理器初始化失败:', error);
            return false;
        }
    }
    
    /**
     * 显示难度选择对话框
     * @param {Function} callback - 选择完成后的回调函数，接收选择的难度作为参数
     * @returns {boolean} 显示是否成功
     */
    show(callback) {
        if (!this.dialogElement) {
            console.error('难度选择对话框未初始化');
            return false;
        }
        
        // 保存回调函数
        this.onDifficultySelected = callback;
        
        // 更新每个难度的可用皇帝数量
        this.updateAvailableCounts();
        
        // 验证每个难度的可用性并更新按钮状态
        this.updateButtonStates();
        
        // 显示对话框
        this.dialogElement.classList.add('active');
        
        console.log('显示难度选择对话框');
        return true;
    }
    
    /**
     * 隐藏难度选择对话框
     */
    hide() {
        if (this.dialogElement) {
            this.dialogElement.classList.remove('active');
            console.log('隐藏难度选择对话框');
        }
    }
    
    /**
     * 处理难度选择
     * @param {'easy'|'medium'|'hard'} difficulty - 选择的难度
     */
    handleDifficultySelection(difficulty) {
        console.log(`玩家选择难度: ${difficulty}`);
        
        // 验证难度可用性
        const validation = this.emperorDatabase.validateDifficultyAvailability(difficulty, 3);
        
        if (!validation.isValid) {
            alert(validation.message);
            console.warn(`难度 ${difficulty} 不可用:`, validation.message);
            return;
        }
        
        // 保存选择的难度
        this.selectedDifficulty = difficulty;
        
        // 隐藏对话框
        this.hide();
        
        // 调用回调函数
        if (this.onDifficultySelected && typeof this.onDifficultySelected === 'function') {
            this.onDifficultySelected(difficulty);
        }
    }
    
    /**
     * 更新每个难度的可用皇帝数量显示
     */
    updateAvailableCounts() {
        try {
            // 获取所有有效的皇帝
            const validEmperors = this.emperorDatabase.emperors.filter(emperor => 
                window.GameValidation.validateEmperor(emperor) && 
                emperor.hints.length >= 10
            );
            
            // 计算每个难度的皇帝数量
            const easyEmperors = this.emperorDatabase.filterEmperorsByDifficulty(validEmperors, 'easy');
            const mediumEmperors = this.emperorDatabase.filterEmperorsByDifficulty(validEmperors, 'medium');
            const hardEmperors = this.emperorDatabase.filterEmperorsByDifficulty(validEmperors, 'hard');
            
            // 更新显示
            if (this.easyCountElement) {
                this.easyCountElement.textContent = `${easyEmperors.length} 个皇帝`;
            }
            if (this.mediumCountElement) {
                this.mediumCountElement.textContent = `${mediumEmperors.length} 个皇帝`;
            }
            if (this.hardCountElement) {
                this.hardCountElement.textContent = `${hardEmperors.length} 个皇帝`;
            }
            
            console.log(`难度可用数量 - 简单: ${easyEmperors.length}, 中等: ${mediumEmperors.length}, 困难: ${hardEmperors.length}`);
            
        } catch (error) {
            console.error('更新可用数量失败:', error);
        }
    }
    
    /**
     * 更新按钮状态（启用/禁用）
     */
    updateButtonStates() {
        try {
            // 验证每个难度
            const easyValidation = this.emperorDatabase.validateDifficultyAvailability('easy', 3);
            const mediumValidation = this.emperorDatabase.validateDifficultyAvailability('medium', 3);
            const hardValidation = this.emperorDatabase.validateDifficultyAvailability('hard', 3);
            
            // 更新按钮状态
            if (this.easyButton) {
                if (easyValidation.isValid) {
                    this.easyButton.disabled = false;
                    this.easyButton.classList.remove('disabled');
                } else {
                    this.easyButton.disabled = true;
                    this.easyButton.classList.add('disabled');
                    this.easyButton.title = easyValidation.message;
                }
            }
            
            if (this.mediumButton) {
                if (mediumValidation.isValid) {
                    this.mediumButton.disabled = false;
                    this.mediumButton.classList.remove('disabled');
                } else {
                    this.mediumButton.disabled = true;
                    this.mediumButton.classList.add('disabled');
                    this.mediumButton.title = mediumValidation.message;
                }
            }
            
            if (this.hardButton) {
                if (hardValidation.isValid) {
                    this.hardButton.disabled = false;
                    this.hardButton.classList.remove('disabled');
                } else {
                    this.hardButton.disabled = true;
                    this.hardButton.classList.add('disabled');
                    this.hardButton.title = hardValidation.message;
                }
            }
            
        } catch (error) {
            console.error('更新按钮状态失败:', error);
        }
    }
    
    /**
     * 获取当前选择的难度
     * @returns {'easy'|'medium'|'hard'|null} 当前选择的难度
     */
    getSelectedDifficulty() {
        return this.selectedDifficulty;
    }
    
    /**
     * 重置难度选择
     */
    reset() {
        this.selectedDifficulty = null;
        console.log('难度选择已重置');
    }
    
    /**
     * 获取难度的中文名称
     * @param {'easy'|'medium'|'hard'} difficulty - 难度等级
     * @returns {string} 中文名称
     */
    getDifficultyName(difficulty) {
        switch (difficulty) {
            case 'easy':
                return '简单';
            case 'medium':
                return '历史爱好者（中等）';
            case 'hard':
                return '历史专家（困难）';
            default:
                return '未知';
        }
    }
    
    /**
     * 获取难度的描述
     * @param {'easy'|'medium'|'hard'} difficulty - 难度等级
     * @returns {string} 描述文本
     */
    getDifficultyDescription(difficulty) {
        switch (difficulty) {
            case 'easy':
                return '只包含简单难度的皇帝';
            case 'medium':
                return '包含简单和中等难度的皇帝';
            case 'hard':
                return '包含所有难度的皇帝';
            default:
                return '';
        }
    }
}

// 导出到全局作用域
window.DifficultyManager = DifficultyManager;
