/**
 * 中国皇帝猜谜游戏 - 数据验证函数
 * 实现基础的数据验证功能，确保数据完整性
 */

/**
 * 验证皇帝数据是否有效
 * @param {Emperor} emperor - 皇帝对象
 * @returns {boolean} 是否有效
 */
function validateEmperor(emperor) {
    if (!emperor || typeof emperor !== 'object') {
        return false;
    }
    
    // 检查必需字段
    if (!emperor.id || typeof emperor.id !== 'string' || emperor.id.trim() === '') {
        return false;
    }
    
    if (!emperor.name || typeof emperor.name !== 'string' || emperor.name.trim() === '') {
        return false;
    }
    
    if (!emperor.templeName || typeof emperor.templeName !== 'string' || emperor.templeName.trim() === '') {
        return false;
    }
    
    if (!emperor.posthumousName || typeof emperor.posthumousName !== 'string' || emperor.posthumousName.trim() === '') {
        return false;
    }
    
    // 检查年号数组
    if (!Array.isArray(emperor.reignNames) || emperor.reignNames.length === 0) {
        return false;
    }
    
    for (const reignName of emperor.reignNames) {
        if (!reignName || typeof reignName !== 'string' || reignName.trim() === '') {
            return false;
        }
    }
    
    // 检查提示词数组
    if (!Array.isArray(emperor.hints) || emperor.hints.length < 10) {
        return false;
    }
    
    // 验证每个提示词
    for (const hint of emperor.hints) {
        if (!validateHint(hint)) {
            return false;
        }
    }
    
    // 检查提示词难度分布：至少3个困难、3个中等、4个简单
    const difficultyCount = countHintsByDifficulty(emperor.hints);
    
    if (difficultyCount.hard < 3) {
        return false;
    }
    
    if (difficultyCount.medium < 3) {
        return false;
    }
    
    if (difficultyCount.easy < 4) {
        return false;
    }
    
    return true;
}

/**
 * 统计提示词的难度分布
 * @param {Hint[]} hints - 提示词数组
 * @returns {Object} 难度分布统计
 */
function countHintsByDifficulty(hints) {
    const count = {
        hard: 0,
        medium: 0,
        easy: 0
    };
    
    if (!Array.isArray(hints)) {
        return count;
    }
    
    for (const hint of hints) {
        if (hint && hint.difficulty) {
            switch (hint.difficulty) {
                case window.GameTypes.Difficulty.HARD:
                    count.hard++;
                    break;
                case window.GameTypes.Difficulty.MEDIUM:
                    count.medium++;
                    break;
                case window.GameTypes.Difficulty.EASY:
                    count.easy++;
                    break;
            }
        }
    }
    
    return count;
}

/**
 * 验证提示词难度分布是否满足要求
 * @param {Hint[]} hints - 提示词数组
 * @returns {Object} 验证结果
 */
function validateHintDistribution(hints) {
    const result = {
        isValid: true,
        errors: [],
        count: countHintsByDifficulty(hints)
    };
    
    if (!Array.isArray(hints) || hints.length < 10) {
        result.isValid = false;
        result.errors.push('提示词总数至少需要10个');
        return result;
    }
    
    if (result.count.hard < 3) {
        result.isValid = false;
        result.errors.push('困难提示词至少需要3个');
    }
    
    if (result.count.medium < 3) {
        result.isValid = false;
        result.errors.push('中等提示词至少需要3个');
    }
    
    if (result.count.easy < 4) {
        result.isValid = false;
        result.errors.push('简单提示词至少需要4个');
    }
    
    return result;
}

/**
 * 验证提示词数据是否有效
 * @param {Hint} hint - 提示词对象
 * @returns {boolean} 是否有效
 */
function validateHint(hint) {
    if (!hint || typeof hint !== 'object') {
        return false;
    }
    
    // 检查必需字段
    if (!hint.id || typeof hint.id !== 'string' || hint.id.trim() === '') {
        return false;
    }
    
    if (!hint.content || typeof hint.content !== 'string' || hint.content.trim() === '') {
        return false;
    }
    
    // 检查难度等级
    const validDifficulties = [
        window.GameTypes.Difficulty.HARD,
        window.GameTypes.Difficulty.MEDIUM,
        window.GameTypes.Difficulty.EASY
    ];
    
    if (!validDifficulties.includes(hint.difficulty)) {
        return false;
    }
    
    // 检查顺序
    if (typeof hint.order !== 'number' || hint.order < 0) {
        return false;
    }
    
    return true;
}

/**
 * 验证游戏状态数据是否有效
 * @param {GameState} gameState - 游戏状态对象
 * @returns {boolean} 是否有效
 */
function validateGameState(gameState) {
    if (!gameState || typeof gameState !== 'object') {
        return false;
    }
    
    // currentEmperor 可以为 null
    if (gameState.currentEmperor !== null && !validateEmperor(gameState.currentEmperor)) {
        return false;
    }
    
    // 检查数值字段
    if (typeof gameState.currentHintIndex !== 'number' || gameState.currentHintIndex < 0) {
        return false;
    }
    
    if (typeof gameState.currentRoundScore !== 'number' || gameState.currentRoundScore < 0) {
        return false;
    }
    
    if (typeof gameState.totalScore !== 'number' || gameState.totalScore < 0) {
        return false;
    }
    
    // 检查游戏阶段
    const validPhases = [
        window.GameTypes.GamePhase.START,
        window.GameTypes.GamePhase.PLAYING,
        window.GameTypes.GamePhase.ROUND_END,
        window.GameTypes.GamePhase.GAME_OVER
    ];
    
    if (!validPhases.includes(gameState.gamePhase)) {
        return false;
    }
    
    // 检查错误猜测数组
    if (!Array.isArray(gameState.wrongGuesses)) {
        return false;
    }
    
    for (const guess of gameState.wrongGuesses) {
        if (typeof guess !== 'string') {
            return false;
        }
    }
    
    return true;
}

/**
 * 验证猜测结果数据是否有效
 * @param {GuessResult} guessResult - 猜测结果对象
 * @returns {boolean} 是否有效
 */
function validateGuessResult(guessResult) {
    if (!guessResult || typeof guessResult !== 'object') {
        return false;
    }
    
    // 检查布尔字段
    if (typeof guessResult.isCorrect !== 'boolean') {
        return false;
    }
    
    if (typeof guessResult.gameEnded !== 'boolean') {
        return false;
    }
    
    // 检查分数变化
    if (typeof guessResult.scoreChange !== 'number') {
        return false;
    }
    
    // nextHint 可以为 null 或字符串
    if (guessResult.nextHint !== null && typeof guessResult.nextHint !== 'string') {
        return false;
    }
    
    return true;
}

/**
 * 清理和标准化用户输入
 * @param {string} input - 用户输入
 * @returns {string} 清理后的输入
 */
function sanitizeInput(input) {
    if (typeof input !== 'string') {
        return '';
    }
    
    // 移除前后空白字符
    let cleaned = input.trim();
    
    // 移除多余的空白字符
    cleaned = cleaned.replace(/\s+/g, ' ');
    
    // 限制长度
    if (cleaned.length > 20) {
        cleaned = cleaned.substring(0, 20);
    }
    
    return cleaned;
}

/**
 * 验证用户输入是否有效
 * @param {string} input - 用户输入
 * @returns {boolean} 是否有效
 */
function validateUserInput(input) {
    const cleaned = sanitizeInput(input);
    
    // 不能为空
    if (cleaned === '') {
        return false;
    }
    
    // 只允许中文字符、字母、数字和常见标点
    const validPattern = /^[\u4e00-\u9fff\u3400-\u4dbf\u20000-\u2a6df\u2a700-\u2b73f\u2b740-\u2b81f\u2b820-\u2ceaf\uf900-\ufaff\u3300-\u33ff\ufe30-\ufe4f\uf900-\ufaff\u2f800-\u2fa1fa-zA-Z0-9\s\-\(\)（）]+$/;
    
    return validPattern.test(cleaned);
}

/**
 * 检查皇帝数据的完整性
 * @param {Emperor[]} emperors - 皇帝数组
 * @returns {Object} 检查结果
 */
function checkEmperorsIntegrity(emperors) {
    const result = {
        isValid: true,
        errors: [],
        validCount: 0,
        invalidCount: 0
    };
    
    if (!Array.isArray(emperors)) {
        result.isValid = false;
        result.errors.push('皇帝数据不是数组');
        return result;
    }
    
    if (emperors.length === 0) {
        result.isValid = false;
        result.errors.push('皇帝数据为空');
        return result;
    }
    
    const seenIds = new Set();
    
    for (let i = 0; i < emperors.length; i++) {
        const emperor = emperors[i];
        
        if (!validateEmperor(emperor)) {
            result.invalidCount++;
            result.errors.push(`皇帝 ${i + 1} 数据无效`);
            continue;
        }
        
        // 检查ID重复
        if (seenIds.has(emperor.id)) {
            result.invalidCount++;
            result.errors.push(`皇帝ID重复: ${emperor.id}`);
            continue;
        }
        
        seenIds.add(emperor.id);
        result.validCount++;
    }
    
    if (result.invalidCount > 0) {
        result.isValid = false;
    }
    
    return result;
}

/**
 * 验证用户猜测是否匹配指定皇帝
 * @param {string} guess - 用户猜测
 * @param {Emperor} emperor - 皇帝对象
 * @returns {boolean} 是否匹配
 */
function validateAnswer(guess, emperor) {
    if (!guess || !emperor) {
        return false;
    }
    
    // 清理用户输入
    const cleanGuess = sanitizeInput(guess);
    if (!validateUserInput(cleanGuess)) {
        return false;
    }
    
    // 标准化比较函数 - 移除空格并转换为小写进行比较
    const normalize = (str) => str.replace(/\s+/g, '').toLowerCase();
    const normalizedGuess = normalize(cleanGuess);
    
    // 检查名字匹配
    if (normalize(emperor.name) === normalizedGuess) {
        return true;
    }
    
    // 检查庙号匹配
    if (normalize(emperor.templeName) === normalizedGuess) {
        return true;
    }
    
    // 检查谥号匹配
    if (normalize(emperor.posthumousName) === normalizedGuess) {
        return true;
    }
    
    // 检查年号匹配
    for (const reignName of emperor.reignNames) {
        if (normalize(reignName) === normalizedGuess) {
            return true;
        }
    }
    
    return false;
}

/**
 * 获取皇帝的所有有效称谓
 * @param {Emperor} emperor - 皇帝对象
 * @returns {string[]} 所有有效称谓的数组
 */
function getValidAnswers(emperor) {
    if (!emperor) {
        return [];
    }
    
    const answers = [];
    
    // 添加名字
    if (emperor.name) {
        answers.push(emperor.name);
    }
    
    // 添加庙号
    if (emperor.templeName) {
        answers.push(emperor.templeName);
    }
    
    // 添加谥号
    if (emperor.posthumousName) {
        answers.push(emperor.posthumousName);
    }
    
    // 添加所有年号
    if (Array.isArray(emperor.reignNames)) {
        answers.push(...emperor.reignNames);
    }
    
    return answers;
}

/**
 * 检查答案是否为错误答案（不匹配任何有效称谓）
 * @param {string} guess - 用户猜测
 * @param {Emperor} emperor - 皇帝对象
 * @returns {boolean} 是否为错误答案
 */
function isIncorrectAnswer(guess, emperor) {
    return !validateAnswer(guess, emperor);
}

/**
 * 标准化皇帝称谓以便比较
 * @param {string} name - 称谓
 * @returns {string} 标准化后的称谓
 */
function normalizeEmperorName(name) {
    if (typeof name !== 'string') {
        return '';
    }
    
    // 移除空格、标点符号，转换为小写
    return name.replace(/[\s\-\(\)（）]/g, '').toLowerCase();
}

/**
 * 模糊匹配皇帝称谓（允许部分匹配）
 * @param {string} guess - 用户猜测
 * @param {Emperor} emperor - 皇帝对象
 * @returns {boolean} 是否模糊匹配
 */
function fuzzyMatchAnswer(guess, emperor) {
    if (!guess || !emperor) {
        return false;
    }
    
    const cleanGuess = sanitizeInput(guess);
    if (!validateUserInput(cleanGuess)) {
        return false;
    }
    
    const normalizedGuess = normalizeEmperorName(cleanGuess);
    
    // 如果输入太短，不进行模糊匹配
    if (normalizedGuess.length < 2) {
        return false;
    }
    
    const validAnswers = getValidAnswers(emperor);
    
    for (const answer of validAnswers) {
        const normalizedAnswer = normalizeEmperorName(answer);
        
        // 检查是否包含
        if (normalizedAnswer.includes(normalizedGuess) || normalizedGuess.includes(normalizedAnswer)) {
            return true;
        }
    }
    
    return false;
}

/**
 * 获取答案匹配的详细信息
 * @param {string} guess - 用户猜测
 * @param {Emperor} emperor - 皇帝对象
 * @returns {Object} 匹配详情
 */
function getAnswerMatchDetails(guess, emperor) {
    const result = {
        isExactMatch: false,
        isFuzzyMatch: false,
        matchedType: null,
        matchedValue: null,
        allValidAnswers: getValidAnswers(emperor)
    };
    
    if (!guess || !emperor) {
        return result;
    }
    
    const cleanGuess = sanitizeInput(guess);
    if (!validateUserInput(cleanGuess)) {
        return result;
    }
    
    const normalizedGuess = normalizeEmperorName(cleanGuess);
    
    // 检查精确匹配
    if (normalizeEmperorName(emperor.name) === normalizedGuess) {
        result.isExactMatch = true;
        result.matchedType = 'name';
        result.matchedValue = emperor.name;
        return result;
    }
    
    if (normalizeEmperorName(emperor.templeName) === normalizedGuess) {
        result.isExactMatch = true;
        result.matchedType = 'templeName';
        result.matchedValue = emperor.templeName;
        return result;
    }
    
    if (normalizeEmperorName(emperor.posthumousName) === normalizedGuess) {
        result.isExactMatch = true;
        result.matchedType = 'posthumousName';
        result.matchedValue = emperor.posthumousName;
        return result;
    }
    
    for (const reignName of emperor.reignNames) {
        if (normalizeEmperorName(reignName) === normalizedGuess) {
            result.isExactMatch = true;
            result.matchedType = 'reignName';
            result.matchedValue = reignName;
            return result;
        }
    }
    
    // 检查模糊匹配
    result.isFuzzyMatch = fuzzyMatchAnswer(guess, emperor);
    
    return result;
}

// 导出到全局作用域
window.GameValidation = {
    validateEmperor,
    validateHint,
    validateGameState,
    validateGuessResult,
    sanitizeInput,
    validateUserInput,
    checkEmperorsIntegrity,
    validateAnswer,
    getValidAnswers,
    isIncorrectAnswer,
    normalizeEmperorName,
    fuzzyMatchAnswer,
    getAnswerMatchDetails,
    countHintsByDifficulty,
    validateHintDistribution
};