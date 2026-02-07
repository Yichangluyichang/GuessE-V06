/**
 * 中国皇帝猜谜游戏 - 皇帝数据库管理系统
 * 实现皇帝数据的存储、检索和验证功能，支持localStorage持久化存储
 */

/**
 * 皇帝数据库类
 * 负责管理皇帝数据和提示词的存储与检索
 */
class EmperorDatabase {
    constructor() {
        this.storageKey = 'chinese-emperor-game-data';
        this.emperors = [];
        this.isInitialized = false;
        
        // 绑定方法上下文
        this.init = this.init.bind(this);
        this.loadFromStorage = this.loadFromStorage.bind(this);
        this.saveToStorage = this.saveToStorage.bind(this);
    }
    
    /**
     * 初始化数据库
     * @returns {Promise<boolean>} 初始化是否成功
     */
    async init() {
        try {
            console.log('初始化皇帝数据库...');
            
            // 优先从云端加载数据
            const cloudLoaded = await this.loadFromCloud();
            
            if (cloudLoaded && this.emperors.length > 0) {
                console.log(`从云端加载了 ${this.emperors.length} 位皇帝`);
                // 同步到本地存储
                this.saveToStorage();
            } else {
                console.log('云端加载失败，尝试从本地加载...');
                // 尝试从localStorage加载数据
                const loaded = this.loadFromStorage();
                
                if (!loaded || this.emperors.length === 0) {
                    console.log('未找到存储的数据，初始化默认皇帝数据');
                    await this.initializeDefaultData();
                }
            }
            
            this.isInitialized = true;
            console.log(`数据库初始化完成，共加载 ${this.emperors.length} 位皇帝`);
            return true;
            
        } catch (error) {
            console.error('数据库初始化失败:', error);
            this.emperors = [];
            this.isInitialized = false;
            return false;
        }
    }
    
    /**
     * 从云端加载数据
     * @returns {Promise<boolean>} 加载是否成功
     */
    async loadFromCloud() {
        try {
            if (!window.FirebaseSyncManager) {
                console.log('Firebase同步管理器未加载');
                return false;
            }
            
            console.log('正在从云端加载皇帝数据...');
            
            // 更新加载提示（如果应用实例存在）
            if (window.game && window.game.updateLoadingMessage) {
                window.game.updateLoadingMessage('正在连接云端数据库...');
            }
            
            const cloudEmperors = await window.FirebaseSyncManager.loadEmperorsFromCloud();
            
            if (!cloudEmperors || cloudEmperors.length === 0) {
                console.log('云端没有数据');
                return false;
            }
            
            // 更新加载提示
            if (window.game && window.game.updateLoadingMessage) {
                window.game.updateLoadingMessage(`正在验证 ${cloudEmperors.length} 位皇帝数据...`);
            }
            
            // 验证每个皇帝，分离有效和无效的
            const validEmperors = [];
            const invalidEmperors = [];
            
            for (const emperor of cloudEmperors) {
                if (window.GameValidation.validateEmperor(emperor)) {
                    validEmperors.push(emperor);
                } else {
                    // 标记为无效但保留信息用于日志
                    invalidEmperors.push({
                        id: emperor.id,
                        name: emperor.name,
                        reason: '提示词数量或分布不符合要求'
                    });
                    console.warn(`皇帝 ${emperor.name} (${emperor.id}) 验证失败，已跳过`);
                }
            }
            
            // 记录验证结果
            console.log(`云端数据验证完成: ${validEmperors.length} 个有效, ${invalidEmperors.length} 个无效`);
            
            if (invalidEmperors.length > 0) {
                console.warn('以下皇帝因数据不完整被跳过:', invalidEmperors);
            }
            
            // 只要有至少一个有效皇帝，就认为加载成功
            if (validEmperors.length === 0) {
                console.error('云端没有有效的皇帝数据');
                return false;
            }
            
            this.emperors = validEmperors;
            console.log(`从云端加载了 ${this.emperors.length} 位有效皇帝数据`);
            
            // 更新加载提示
            if (window.game && window.game.updateLoadingMessage) {
                window.game.updateLoadingMessage(`数据加载完成！共 ${this.emperors.length} 位皇帝可用`);
            }
            
            return true;
            
        } catch (error) {
            console.error('从云端加载数据失败:', error);
            return false;
        }
    }
    
    /**
     * 从localStorage加载数据
     * @returns {boolean} 加载是否成功
     */
    loadFromStorage() {
        try {
            if (!this.isStorageAvailable()) {
                console.warn('localStorage不可用，使用内存存储');
                this.handleStorageError('localStorage不可用');
                return false;
            }
            
            const data = localStorage.getItem(this.storageKey);
            if (!data) {
                console.log('localStorage中未找到数据');
                return false;
            }
            
            const parsed = JSON.parse(data);
            const allEmperors = parsed.emperors || [];
            
            // 验证每个皇帝，分离有效和无效的
            const validEmperors = [];
            const invalidEmperors = [];
            
            for (const emperor of allEmperors) {
                if (window.GameValidation.validateEmperor(emperor)) {
                    validEmperors.push(emperor);
                } else {
                    invalidEmperors.push({
                        id: emperor.id,
                        name: emperor.name,
                        reason: '提示词数量或分布不符合要求'
                    });
                    console.warn(`皇帝 ${emperor.name} (${emperor.id}) 验证失败，已跳过`);
                }
            }
            
            // 记录验证结果
            console.log(`本地数据验证完成: ${validEmperors.length} 个有效, ${invalidEmperors.length} 个无效`);
            
            if (invalidEmperors.length > 0) {
                console.warn('以下皇帝因数据不完整被跳过:', invalidEmperors);
            }
            
            // 只要有至少一个有效皇帝，就认为加载成功
            if (validEmperors.length === 0) {
                console.error('localStorage中没有有效的皇帝数据');
                this.handleDataCorruption('存储的皇帝数据全部无效', parsed);
                return false;
            }
            
            this.emperors = validEmperors;
            console.log(`从localStorage加载了 ${this.emperors.length} 位有效皇帝数据`);
            return true;
            
        } catch (error) {
            console.error('从localStorage加载数据失败:', error);
            this.handleStorageError('从localStorage加载数据失败: ' + error.message);
            return false;
        }
    }
    
    /**
     * 保存数据到localStorage
     * @returns {boolean} 保存是否成功
     */
    saveToStorage() {
        try {
            if (!this.isStorageAvailable()) {
                console.warn('localStorage不可用，无法保存数据');
                this.handleStorageError('localStorage不可用，无法保存数据');
                return false;
            }
            
            const data = {
                emperors: this.emperors,
                lastUpdated: new Date().toISOString(),
                version: '1.0.0'
            };
            
            localStorage.setItem(this.storageKey, JSON.stringify(data));
            console.log(`已保存 ${this.emperors.length} 位皇帝数据到localStorage`);
            return true;
            
        } catch (error) {
            console.error('保存数据到localStorage失败:', error);
            this.handleStorageError('保存数据到localStorage失败: ' + error.message);
            return false;
        }
    }
    
    /**
     * 检查localStorage是否可用
     * @returns {boolean} localStorage是否可用
     */
    isStorageAvailable() {
        try {
            const test = '__storage_test__';
            localStorage.setItem(test, test);
            localStorage.removeItem(test);
            return true;
        } catch (error) {
            return false;
        }
    }
    
    /**
     * 获取随机皇帝
     * @param {string[]} excludeIds - 要排除的皇帝ID列表
     * @param {'easy'|'medium'|'hard'|null} difficultyFilter - 难度筛选（null表示不筛选）
     * @returns {Object|null} 随机选择的皇帝，如果没有可用皇帝则返回null
     */
    getRandomEmperor(excludeIds = [], difficultyFilter = null) {
        if (!this.isInitialized) {
            throw new Error('数据库未初始化');
        }
        
        if (this.emperors.length === 0) {
            console.warn('没有可用的皇帝数据');
            return null;
        }
        
        // 过滤出有效的皇帝（至少有10个提示词且不在排除列表中）
        let validEmperors = this.emperors.filter(emperor => 
            window.GameValidation.validateEmperor(emperor) && 
            emperor.hints.length >= 10 &&
            !excludeIds.includes(emperor.id)
        );
        
        // 如果指定了难度筛选，进一步过滤
        if (difficultyFilter) {
            validEmperors = this.filterEmperorsByDifficulty(validEmperors, difficultyFilter);
        }
        
        if (validEmperors.length === 0) {
            console.warn('没有有效的皇帝数据（可能都已被使用或不符合难度要求）');
            return null;
        }
        
        const randomIndex = Math.floor(Math.random() * validEmperors.length);
        const selectedEmperor = validEmperors[randomIndex];
        
        // 返回深拷贝以避免外部修改
        return window.GameTypes.deepClone(selectedEmperor);
    }
    
    /**
     * 根据难度筛选皇帝
     * @param {Array} emperors - 皇帝数组
     * @param {'easy'|'medium'|'hard'} difficulty - 难度等级
     * @returns {Array} 筛选后的皇帝数组
     */
    filterEmperorsByDifficulty(emperors, difficulty) {
        if (!difficulty) {
            return emperors;
        }
        
        switch (difficulty) {
            case 'easy':
                // 简单模式：只包含简单难度的皇帝
                return emperors.filter(e => e.difficulty === 'easy');
                
            case 'medium':
                // 中等模式：包含简单和中等难度的皇帝
                return emperors.filter(e => e.difficulty === 'easy' || e.difficulty === 'medium');
                
            case 'hard':
                // 困难模式：包含所有难度的皇帝
                return emperors;
                
            default:
                console.warn(`未知的难度等级: ${difficulty}`);
                return emperors;
        }
    }
    
    /**
     * 验证指定难度是否有足够的皇帝可用
     * @param {'easy'|'medium'|'hard'} difficulty - 难度等级
     * @param {number} minRequired - 最少需要的皇帝数量（默认3个）
     * @returns {Object} 验证结果 {isValid: boolean, availableCount: number, message?: string}
     */
    validateDifficultyAvailability(difficulty, minRequired = 3) {
        if (!this.isInitialized) {
            throw new Error('数据库未初始化');
        }
        
        // 获取所有有效的皇帝
        const validEmperors = this.emperors.filter(emperor => 
            window.GameValidation.validateEmperor(emperor) && 
            emperor.hints.length >= 10
        );
        
        // 根据难度筛选
        const filteredEmperors = this.filterEmperorsByDifficulty(validEmperors, difficulty);
        const availableCount = filteredEmperors.length;
        
        if (availableCount < minRequired) {
            let difficultyName = '';
            switch (difficulty) {
                case 'easy': difficultyName = '简单'; break;
                case 'medium': difficultyName = '中等'; break;
                case 'hard': difficultyName = '困难'; break;
            }
            
            return {
                isValid: false,
                availableCount: availableCount,
                message: `${difficultyName}难度的皇帝数量不足（需要至少${minRequired}个，当前只有${availableCount}个）`
            };
        }
        
        return {
            isValid: true,
            availableCount: availableCount
        };
    }
    
    /**
     * 初始化默认皇帝数据
     * @returns {Promise<boolean>} 初始化是否成功
     */
    async initializeDefaultData() {
        try {
            // 检查是否有DefaultEmperorsData模块
            if (!window.DefaultEmperorsData || !window.DefaultEmperorsData.createDefaultEmperorsData) {
                console.error('DefaultEmperorsData模块未加载');
                return false;
            }
            
            // 获取默认皇帝数据
            const defaultEmperors = window.DefaultEmperorsData.createDefaultEmperorsData();
            
            // 验证数据完整性
            const integrityCheck = window.GameValidation.checkEmperorsIntegrity(defaultEmperors);
            
            if (!integrityCheck.isValid) {
                console.error('默认皇帝数据完整性检查失败:', integrityCheck.errors);
                return false;
            }
            
            // 添加所有默认皇帝
            this.emperors = [];
            let successCount = 0;
            
            for (const emperor of defaultEmperors) {
                if (this.addEmperorInternal(emperor)) {
                    successCount++;
                } else {
                    console.warn(`添加皇帝失败: ${emperor.name} (${emperor.id})`);
                }
            }
            
            // 保存到localStorage
            this.saveToStorage();
            
            console.log(`成功初始化 ${successCount}/${defaultEmperors.length} 位皇帝数据`);
            return successCount > 0;
            
        } catch (error) {
            console.error('初始化默认数据失败:', error);
            return false;
        }
    }
    
    /**
     * 内部方法：添加皇帝到数据库（不保存到存储）
     * @param {Object} emperor - 要添加的皇帝
     * @returns {boolean} 添加是否成功
     */
    addEmperorInternal(emperor) {
        try {
            // 验证皇帝数据
            if (!window.GameValidation.validateEmperor(emperor)) {
                console.error('皇帝数据验证失败:', emperor);
                return false;
            }
            
            // 检查是否已存在相同ID的皇帝
            if (this.emperors.some(e => e.id === emperor.id)) {
                console.warn(`皇帝ID已存在: ${emperor.id}`);
                return false;
            }
            
            // 添加皇帝（深拷贝）
            this.emperors.push(window.GameTypes.deepClone(emperor));
            return true;
            
        } catch (error) {
            console.error('添加皇帝失败:', error);
            return false;
        }
    }
    
    /**
     * 更新皇帝数据
     * @param {Emperor} emperor - 皇帝对象
     * @returns {Promise<boolean>} 更新是否成功
     */
    async updateEmperor(emperor) {
        if (!this.isInitialized) {
            throw new Error('数据库未初始化');
        }
        
        // 验证皇帝数据
        if (!window.GameValidation.validateEmperor(emperor)) {
            console.error('皇帝数据验证失败:', emperor);
            return false;
        }
        
        // 查找皇帝索引
        const emperorIndex = this.emperors.findIndex(e => e.id === emperor.id);
        if (emperorIndex === -1) {
            console.error('皇帝不存在:', emperor.id);
            return false;
        }
        
        try {
            // 更新皇帝数据
            this.emperors[emperorIndex] = window.GameTypes.deepClone(emperor);
            
            // 保存到localStorage
            this.saveToStorage();
            
            // 同步到云端
            if (window.FirebaseSyncManager) {
                await window.FirebaseSyncManager.saveEmperorToCloud(emperor);
            }
            
            console.log(`皇帝 ${emperor.name} (${emperor.id}) 更新成功`);
            return true;
            
        } catch (error) {
            console.error('更新皇帝失败:', error);
            return false;
        }
    }
    
    /**
     * 添加皇帝到数据库
     * @param {Object} emperor - 要添加的皇帝
     * @returns {Promise<boolean>} 添加是否成功
     */
    async addEmperor(emperor) {
        if (!this.isInitialized) {
            throw new Error('数据库未初始化');
        }
        
        const result = this.addEmperorInternal(emperor);
        
        if (result) {
            // 保存到存储
            this.saveToStorage();
            
            // 同步到云端
            if (window.FirebaseSyncManager) {
                await window.FirebaseSyncManager.saveEmperorToCloud(emperor);
            }
        }
        
        return result;
    }
    
    /**
     * 根据ID获取皇帝
     * @param {string} emperorId - 皇帝ID
     * @returns {Object|null} 找到的皇帝，如果不存在则返回null
     */
    getEmperorById(emperorId) {
        if (!this.isInitialized) {
            throw new Error('数据库未初始化');
        }
        
        const emperor = this.emperors.find(e => e.id === emperorId);
        return emperor ? window.GameTypes.deepClone(emperor) : null;
    }
    
    /**
     * 获取指定难度的提示词
     * @param {string} emperorId - 皇帝ID
     * @param {'hard'|'medium'|'easy'} difficulty - 难度等级
     * @returns {Array} 指定难度的提示词数组
     */
    getHintsByDifficulty(emperorId, difficulty) {
        if (!this.isInitialized) {
            throw new Error('数据库未初始化');
        }
        
        const emperor = this.getEmperorById(emperorId);
        if (!emperor) {
            console.warn(`未找到皇帝: ${emperorId}`);
            return [];
        }
        
        // 过滤指定难度的提示词
        const hints = emperor.hints.filter(hint => hint.difficulty === difficulty);
        
        // 按顺序排序
        hints.sort((a, b) => a.order - b.order);
        
        return hints;
    }
    
    /**
     * 获取皇帝的所有提示词（按游戏顺序）
     * @param {string} emperorId - 皇帝ID
     * @returns {Array} 按游戏顺序排列的提示词数组
     */
    getGameHints(emperorId) {
        if (!this.isInitialized) {
            throw new Error('数据库未初始化');
        }
        
        const emperor = this.getEmperorById(emperorId);
        if (!emperor) {
            console.warn(`未找到皇帝: ${emperorId}`);
            return [];
        }
        
        // 按难度和顺序获取提示词
        const hardHints = this.getHintsByDifficulty(emperorId, window.GameTypes.Difficulty.HARD).slice(0, 3);
        const mediumHints = this.getHintsByDifficulty(emperorId, window.GameTypes.Difficulty.MEDIUM).slice(0, 3);
        const easyHints = this.getHintsByDifficulty(emperorId, window.GameTypes.Difficulty.EASY).slice(0, 4);
        
        return [...hardHints, ...mediumHints, ...easyHints];
    }
    
    /**
     * 验证答案是否正确
     * @param {string} guess - 用户猜测
     * @param {Object} emperor - 当前皇帝
     * @returns {boolean} 答案是否正确
     */
    validateAnswer(guess, emperor) {
        if (!emperor || !guess) {
            return false;
        }
        
        // 清理和标准化输入
        const cleanGuess = window.GameValidation.sanitizeInput(guess).toLowerCase();
        
        if (cleanGuess === '') {
            return false;
        }
        
        // 检查所有可能的正确答案
        const possibleAnswers = [
            emperor.name,           // 名字
            emperor.templeName,     // 庙号
            emperor.posthumousName, // 谥号
            ...emperor.reignNames   // 年号数组
        ];
        
        // 标准化所有可能答案并进行比较
        for (const answer of possibleAnswers) {
            if (answer && answer.toLowerCase() === cleanGuess) {
                return true;
            }
            
            // 也检查部分匹配（去除常见前缀后缀）
            const cleanAnswer = this.cleanAnswerForComparison(answer);
            const cleanGuessForComparison = this.cleanAnswerForComparison(guess);
            
            if (cleanAnswer && cleanGuessForComparison && 
                cleanAnswer === cleanGuessForComparison) {
                return true;
            }
        }
        
        return false;
    }
    
    /**
     * 清理答案用于比较（去除常见前缀后缀）
     * @param {string} answer - 原始答案
     * @returns {string} 清理后的答案
     */
    cleanAnswerForComparison(answer) {
        if (!answer || typeof answer !== 'string') {
            return '';
        }
        
        let cleaned = answer.toLowerCase().trim();
        
        // 去除常见的皇帝称谓前缀后缀
        const prefixesToRemove = ['皇帝', '帝', '太祖', '太宗', '高祖', '世祖'];
        const suffixesToRemove = ['帝', '皇帝', '大帝'];
        
        for (const prefix of prefixesToRemove) {
            if (cleaned.startsWith(prefix)) {
                cleaned = cleaned.substring(prefix.length);
                break;
            }
        }
        
        for (const suffix of suffixesToRemove) {
            if (cleaned.endsWith(suffix)) {
                cleaned = cleaned.substring(0, cleaned.length - suffix.length);
                break;
            }
        }
        
        return cleaned.trim();
    }
    
    /**
     * 获取所有皇帝的基本信息
     * @returns {Array} 皇帝基本信息数组
     */
    getAllEmperorsInfo() {
        if (!this.isInitialized) {
            throw new Error('数据库未初始化');
        }
        
        return this.emperors.map(emperor => ({
            id: emperor.id,
            name: emperor.name,
            templeName: emperor.templeName,
            posthumousName: emperor.posthumousName,
            reignNames: [...emperor.reignNames],
            hintCount: emperor.hints.length
        }));
    }
    
    /**
     * 获取数据库统计信息
     * @returns {Object} 统计信息
     */
    getStats() {
        if (!this.isInitialized) {
            throw new Error('数据库未初始化');
        }
        
        const validEmperors = this.emperors.filter(emperor => 
            window.GameValidation.validateEmperor(emperor)
        );
        
        const totalHints = this.emperors.reduce((sum, emperor) => 
            sum + emperor.hints.length, 0
        );
        
        return {
            totalEmperors: this.emperors.length,
            validEmperors: validEmperors.length,
            totalHints: totalHints,
            storageAvailable: this.isStorageAvailable(),
            isInitialized: this.isInitialized
        };
    }
    
    /**
     * 检查是否可以删除皇帝
     * @param {string} emperorId - 皇帝ID
     * @param {Object} currentGameState - 当前游戏状态（可选）
     * @returns {Object} 验证结果 {isValid: boolean, reason?: string, warningMessage?: string}
     */
    canDeleteEmperor(emperorId, currentGameState = null) {
        if (!this.isInitialized) {
            throw new Error('数据库未初始化');
        }
        
        // 检查皇帝是否存在
        const emperor = this.getEmperorById(emperorId);
        if (!emperor) {
            return {
                isValid: false,
                reason: 'emperor_not_found',
                warningMessage: '指定的皇帝不存在'
            };
        }
        
        // 检查是否正在游戏中使用
        if (currentGameState && currentGameState.currentEmperor && currentGameState.currentEmperor.id === emperorId) {
            return {
                isValid: false,
                reason: 'emperor_in_use',
                warningMessage: '无法删除正在游戏中使用的皇帝'
            };
        }
        
        // 检查删除后是否满足最低数量要求
        const remainingCount = this.emperors.length - 1;
        const minRequiredEmperors = 5; // 游戏至少需要5个皇帝
        
        if (remainingCount < minRequiredEmperors) {
            return {
                isValid: false,
                reason: 'insufficient_data',
                warningMessage: `删除后皇帝数量不足，游戏至少需要${minRequiredEmperors}个皇帝`
            };
        }
        
        return { isValid: true };
    }
    
    /**
     * 删除皇帝
     * @param {string} emperorId - 皇帝ID
     * @param {Object} currentGameState - 当前游戏状态（可选）
     * @returns {Promise<Object>} 删除结果 {success: boolean, message: string, deletedEmperorId?: string, error?: string}
     */
    async deleteEmperor(emperorId, currentGameState = null) {
        if (!this.isInitialized) {
            throw new Error('数据库未初始化');
        }
        
        console.log(`尝试删除皇帝: ${emperorId}`);
        
        try {
            // 验证是否可以删除
            const validation = this.canDeleteEmperor(emperorId, currentGameState);
            if (!validation.isValid) {
                console.warn(`删除验证失败: ${validation.warningMessage}`);
                return {
                    success: false,
                    message: validation.warningMessage,
                    error: validation.reason
                };
            }
            
            // 查找皇帝索引
            const emperorIndex = this.emperors.findIndex(e => e.id === emperorId);
            if (emperorIndex === -1) {
                return {
                    success: false,
                    message: '指定的皇帝不存在',
                    error: 'emperor_not_found'
                };
            }
            
            // 获取皇帝信息用于日志
            const emperor = this.emperors[emperorIndex];
            const emperorName = emperor.name;
            
            // 从数组中移除皇帝
            this.emperors.splice(emperorIndex, 1);
            
            // 保存到localStorage
            const saveResult = this.saveToStorage();
            if (!saveResult) {
                // 如果保存失败，回滚删除操作
                this.emperors.splice(emperorIndex, 0, emperor);
                return {
                    success: false,
                    message: '删除失败：无法保存到存储',
                    error: 'storage_save_failed'
                };
            }
            
            // 从云端删除
            if (window.FirebaseSyncManager) {
                await window.FirebaseSyncManager.deleteEmperorFromCloud(emperor.name, emperor.dynasty);
            }
            
            console.log(`成功删除皇帝: ${emperorName} (${emperorId})`);
            return {
                success: true,
                message: `成功删除皇帝: ${emperorName}`,
                deletedEmperorId: emperorId
            };
            
        } catch (error) {
            console.error('删除皇帝时发生错误:', error);
            return {
                success: false,
                message: `删除失败: ${error.message}`,
                error: 'unexpected_error'
            };
        }
    }
    
    /**
     * 清空数据库
     * @returns {boolean} 清空是否成功
     */
    clear() {
        if (!this.isInitialized) {
            throw new Error('数据库未初始化');
        }
        
        this.emperors = [];
        
        // 清空localStorage
        if (this.isStorageAvailable()) {
            try {
                localStorage.removeItem(this.storageKey);
                console.log('已清空localStorage中的数据');
            } catch (error) {
                console.error('清空localStorage失败:', error);
                return false;
            }
        }
        
        console.log('数据库已清空');
        return true;
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
                context: 'emperor_database_storage'
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
                context: 'emperor_database_integrity'
            });
        } else {
            console.error('数据损坏:', message, corruptedData);
            // 基础恢复：清空并重新初始化
            this.emperors = [];
            this.initializeDefaultData();
        }
    }
}

// 导出到全局作用域
window.EmperorDatabase = EmperorDatabase;