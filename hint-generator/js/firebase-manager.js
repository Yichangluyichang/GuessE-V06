/**
 * Firebase 数据管理模块
 * 处理与 Firebase 的所有数据交互
 */

class FirebaseManager {
    constructor() {
        this.db = null;
        this.emperorsRef = null;
        this.initialized = false;
    }

    /**
     * 初始化 Firebase
     * @returns {Promise<boolean>} 初始化是否成功
     */
    async initialize() {
        try {
            // 检查配置
            if (typeof CONFIG === 'undefined' || !CONFIG.FIREBASE_CONFIG) {
                throw new Error('Firebase 配置未找到');
            }

            // 初始化 Firebase
            if (!firebase.apps.length) {
                firebase.initializeApp(CONFIG.FIREBASE_CONFIG);
            }

            this.db = firebase.database();
            this.emperorsRef = this.db.ref('emperors');
            this.initialized = true;

            console.log('Firebase 初始化成功');
            return true;
        } catch (error) {
            console.error('Firebase 初始化失败:', error);
            return false;
        }
    }

    /**
     * 获取所有皇帝列表
     * @returns {Promise<Array>} 皇帝列表
     */
    async getAllEmperors() {
        if (!this.initialized) {
            await this.initialize();
        }

        try {
            const snapshot = await this.emperorsRef.once('value');
            const data = snapshot.val();

            if (!data) {
                return [];
            }

            // 转换为数组
            const emperors = Object.keys(data).map(key => ({
                ...data[key],
                id: key
            }));

            return emperors;
        } catch (error) {
            console.error('获取皇帝列表失败:', error);
            throw error;
        }
    }

    /**
     * 根据ID获取皇帝数据
     * @param {string} emperorId - 皇帝ID
     * @returns {Promise<Object>} 皇帝数据
     */
    async getEmperorById(emperorId) {
        if (!this.initialized) {
            await this.initialize();
        }

        try {
            const snapshot = await this.emperorsRef.child(emperorId).once('value');
            const data = snapshot.val();

            if (!data) {
                throw new Error('皇帝不存在');
            }

            return {
                ...data,
                id: emperorId
            };
        } catch (error) {
            console.error('获取皇帝数据失败:', error);
            throw error;
        }
    }

    /**
     * 添加或更新皇帝数据
     * @param {Object} emperorData - 皇帝数据
     * @returns {Promise<boolean>} 是否成功
     */
    async saveEmperor(emperorData) {
        if (!this.initialized) {
            await this.initialize();
        }

        try {
            const emperorId = emperorData.id;
            
            // 移除 id 字段，因为它是键
            const dataToSave = { ...emperorData };
            delete dataToSave.id;
            
            // 为每个 hint 添加 id 字段（如果没有的话）
            if (dataToSave.hints && Array.isArray(dataToSave.hints)) {
                console.log('保存前的 hints（添加 id 之前）:', JSON.stringify(dataToSave.hints.slice(0, 2), null, 2));
                
                dataToSave.hints = dataToSave.hints.map((hint, index) => {
                    if (!hint.id) {
                        return {
                            ...hint,
                            id: `${emperorId}-hint-${index}`
                        };
                    }
                    return hint;
                });
                
                console.log('保存前的 hints（添加 id 之后）:', JSON.stringify(dataToSave.hints.slice(0, 2), null, 2));
            }

            console.log('即将保存到 Firebase 的完整数据:', JSON.stringify({
                emperorId,
                hintsCount: dataToSave.hints ? dataToSave.hints.length : 0,
                firstHint: dataToSave.hints ? dataToSave.hints[0] : null
            }, null, 2));

            await this.emperorsRef.child(emperorId).set(dataToSave);
            console.log('皇帝数据保存成功:', emperorId);
            return true;
        } catch (error) {
            console.error('保存皇帝数据失败:', error);
            throw error;
        }
    }

    /**
     * 更新皇帝的提示词
     * @param {string} emperorId - 皇帝ID
     * @param {Array} hints - 提示词数组
     * @returns {Promise<boolean>} 是否成功
     */
    async updateHints(emperorId, hints) {
        if (!this.initialized) {
            await this.initialize();
        }

        try {
            await this.emperorsRef.child(emperorId).child('hints').set(hints);
            console.log('提示词更新成功:', emperorId);
            return true;
        } catch (error) {
            console.error('更新提示词失败:', error);
            throw error;
        }
    }

    /**
     * 删除皇帝数据
     * @param {string} emperorId - 皇帝ID
     * @returns {Promise<boolean>} 是否成功
     */
    async deleteEmperor(emperorId) {
        if (!this.initialized) {
            await this.initialize();
        }

        try {
            await this.emperorsRef.child(emperorId).remove();
            console.log('皇帝数据删除成功:', emperorId);
            return true;
        } catch (error) {
            console.error('删除皇帝数据失败:', error);
            throw error;
        }
    }

    /**
     * 检查皇帝ID是否存在
     * @param {string} emperorId - 皇帝ID
     * @returns {Promise<boolean>} 是否存在
     */
    async emperorExists(emperorId) {
        if (!this.initialized) {
            await this.initialize();
        }

        try {
            const snapshot = await this.emperorsRef.child(emperorId).once('value');
            return snapshot.exists();
        } catch (error) {
            console.error('检查皇帝是否存在失败:', error);
            return false;
        }
    }
}

// 导出到全局作用域
if (typeof window !== 'undefined') {
    window.FirebaseManager = FirebaseManager;
}
