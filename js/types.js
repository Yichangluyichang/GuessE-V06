/**
 * 中国皇帝猜谜游戏 - 核心数据类型定义
 * 根据设计文档定义的数据模型
 */

/**
 * 难度等级枚举
 */
const Difficulty = {
    HARD: 'hard',
    MEDIUM: 'medium', 
    EASY: 'easy'
};

/**
 * 游戏阶段枚举
 */
const GamePhase = {
    START: 'start',
    PLAYING: 'playing',
    ROUND_END: 'roundEnd',
    GAME_OVER: 'gameOver'
};

/**
 * 皇帝数据结构
 * @typedef {Object} Emperor
 * @property {string} id - 唯一标识符
 * @property {string} name - 名字
 * @property {string} templeName - 庙号
 * @property {string} posthumousName - 谥号
 * @property {string[]} reignNames - 年号数组（可能有多个）
 * @property {string} dynasty - 朝代
 * @property {number} reignStart - 在位开始年份
 * @property {number} reignEnd - 在位结束年份
 * @property {Hint[]} hints - 提示词数组
 */

/**
 * 提示词数据结构
 * @typedef {Object} Hint
 * @property {string} id - 唯一标识符
 * @property {string} content - 提示词内容
 * @property {'hard'|'medium'|'easy'} difficulty - 难度等级
 * @property {number} order - 显示顺序
 */

/**
 * 游戏状态数据结构
 * @typedef {Object} GameState
 * @property {Emperor|null} currentEmperor - 当前皇帝
 * @property {number} currentHintIndex - 当前提示词索引
 * @property {number} currentRoundScore - 当前轮次分数
 * @property {number} totalScore - 总分数
 * @property {'start'|'playing'|'roundEnd'|'gameOver'} gamePhase - 游戏阶段
 * @property {string[]} wrongGuesses - 错误猜测记录
 * @property {number} currentEmperorIndex - 当前皇帝在轮次中的索引
 * @property {string[]} usedEmperorIds - 本轮已使用的皇帝ID列表
 * @property {number} maxEmperorsPerRound - 每轮最大皇帝数量
 */

/**
 * 猜测结果数据结构
 * @typedef {Object} GuessResult
 * @property {boolean} isCorrect - 是否正确
 * @property {number} scoreChange - 分数变化
 * @property {string} [nextHint] - 下一个提示词（如果有）
 * @property {boolean} gameEnded - 游戏是否结束
 */

/**
 * 创建新的皇帝对象
 * @param {string} id - 皇帝ID
 * @param {string} name - 名字
 * @param {string} templeName - 庙号
 * @param {string} posthumousName - 谥号
 * @param {string[]} reignNames - 年号数组
 * @param {string} dynasty - 朝代
 * @param {number} reignStart - 在位开始年份
 * @param {number} reignEnd - 在位结束年份
 * @param {Hint[]} hints - 提示词数组
 * @returns {Emperor}
 */
function createEmperor(id, name, templeName, posthumousName, reignNames, dynasty, reignStart, reignEnd, hints) {
    return {
        id,
        name,
        templeName,
        posthumousName,
        reignNames: [...reignNames],
        dynasty,
        reignStart,
        reignEnd,
        hints: [...hints]
    };
}

/**
 * 创建新的提示词对象
 * @param {string} id - 提示词ID
 * @param {string} content - 提示词内容
 * @param {'hard'|'medium'|'easy'} difficulty - 难度等级
 * @param {number} order - 显示顺序
 * @returns {Hint}
 */
function createHint(id, content, difficulty, order) {
    return {
        id,
        content,
        difficulty,
        order
    };
}

/**
 * 创建初始游戏状态
 * @returns {GameState}
 */
function createInitialGameState() {
    return {
        currentEmperor: null,
        currentHintIndex: 0,
        currentRoundScore: 100,
        totalScore: 0,
        gamePhase: GamePhase.START,
        wrongGuesses: [],
        currentEmperorIndex: 0,
        usedEmperorIds: [],
        maxEmperorsPerRound: 10
    };
}

/**
 * 创建猜测结果对象
 * @param {boolean} isCorrect - 是否正确
 * @param {number} scoreChange - 分数变化
 * @param {string} [nextHint] - 下一个提示词
 * @param {boolean} gameEnded - 游戏是否结束
 * @returns {GuessResult}
 */
function createGuessResult(isCorrect, scoreChange, nextHint = null, gameEnded = false) {
    return {
        isCorrect,
        scoreChange,
        nextHint,
        gameEnded
    };
}

/**
 * 深拷贝对象
 * @param {any} obj - 要拷贝的对象
 * @returns {any} 拷贝后的对象
 */
function deepClone(obj) {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }
    
    if (obj instanceof Array) {
        return obj.map(item => deepClone(item));
    }
    
    const cloned = {};
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            cloned[key] = deepClone(obj[key]);
        }
    }
    return cloned;
}

// 导出到全局作用域
window.GameTypes = {
    Difficulty,
    GamePhase,
    createEmperor,
    createHint,
    createInitialGameState,
    createGuessResult,
    deepClone
};