/**
 * Firebase 数据同步管理器
 * 负责云端数据的读取、写入和同步
 * VERSION: 2.0 - Fixed loadEmperorsFromCloud to include id field
 */

console.log('🔥 Firebase Sync Manager VERSION 2.0 loaded');

class FirebaseSyncManager {
    constructor() {
        this.database = null;
        this.auth = null;
        this.isInitialized = false;
        this.syncEnabled = false;
    }

    /**
     * 初始化 Firebase 同步管理器
     */
    async initialize() {
        try {
            // 初始化 Firebase
            const success = initializeFirebase();
            if (!success) {
                throw new Error('Firebase 初始化失败');
            }

            this.database = window.getFirebaseDatabase();
            this.auth = window.getFirebaseAuth();
            this.isInitialized = true;

            console.log('Firebase 同步管理器初始化成功');
            return true;
        } catch (error) {
            console.error('Firebase 同步管理器初始化失败:', error);
            return false;
        }
    }

    /**
     * 管理员登录
     * @param {string} email - 邮箱
     * @param {string} password - 密码
     */
    async adminLogin(email, password) {
        try {
            if (!this.isInitialized) {
                throw new Error('Firebase 未初始化');
            }

            const userCredential = await this.auth.signInWithEmailAndPassword(email, password);
            console.log('管理员登录成功:', userCredential.user.email);
            this.syncEnabled = true;
            return { success: true, user: userCredential.user };
        } catch (error) {
            console.error('管理员登录失败:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * 管理员登出
     */
    async adminLogout() {
        try {
            await this.auth.signOut();
            this.syncEnabled = false;
            console.log('管理员登出成功');
            return { success: true };
        } catch (error) {
            console.error('管理员登出失败:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * 检查管理员登录状态
     */
    isAdminLoggedIn() {
        return this.auth && this.auth.currentUser !== null;
    }

    /**
     * 获取当前管理员信息
     */
    getCurrentAdmin() {
        return this.auth ? this.auth.currentUser : null;
    }

    /**
     * 从云端加载所有皇帝数据
     */
    async loadEmperorsFromCloud() {
        try {
            if (!this.isInitialized) {
                throw new Error('Firebase 未初始化');
            }

            const snapshot = await this.database.ref('emperors').once('value');
            const data = snapshot.val();

            if (!data) {
                console.log('云端暂无数据');
                return [];
            }

            // 转换为数组格式，将 key 作为 id 字段
            const emperors = Object.keys(data).map(key => ({
                ...data[key],
                id: key
            }));
            
            console.log(`从云端加载了 ${emperors.length} 个皇帝数据`);
            return emperors;
        } catch (error) {
            console.error('从云端加载数据失败:', error);
            return null;
        }
    }

    /**
     * 保存单个皇帝数据到云端
     * @param {Object} emperor - 皇帝数据
     */
    async saveEmperorToCloud(emperor) {
        try {
            if (!this.isInitialized) {
                throw new Error('Firebase 未初始化');
            }

            // 移除管理员权限检查，因为游戏已经有密码保护
            // if (!this.isAdminLoggedIn()) {
            //     throw new Error('需要管理员权限');
            // }

            // 使用皇帝 ID 作为键
            await this.database.ref(`emperors/${emperor.id}`).set(emperor);

            console.log('皇帝数据已保存到云端:', emperor.name);
            return { success: true };
        } catch (error) {
            console.error('保存皇帝数据到云端失败:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * 批量保存皇帝数据到云端
     * @param {Array} emperors - 皇帝数据数组
     */
    async saveAllEmperorsToCloud(emperors) {
        try {
            if (!this.isInitialized) {
                throw new Error('Firebase 未初始化');
            }

            // 移除管理员权限检查
            // if (!this.isAdminLoggedIn()) {
            //     throw new Error('需要管理员权限');
            // }

            // 构建批量更新对象
            const updates = {};
            emperors.forEach(emperor => {
                updates[`emperors/${emperor.id}`] = emperor;
            });

            await this.database.ref().update(updates);

            console.log(`批量保存了 ${emperors.length} 个皇帝数据到云端`);
            return { success: true, count: emperors.length };
        } catch (error) {
            console.error('批量保存皇帝数据到云端失败:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * 从云端删除皇帝数据
     * @param {string} name - 皇帝名字
     * @param {string} dynasty - 朝代
     */
    async deleteEmperorFromCloud(name, dynasty) {
        try {
            if (!this.isInitialized) {
                throw new Error('Firebase 未初始化');
            }

            // 移除管理员权限检查
            // if (!this.isAdminLoggedIn()) {
            //     throw new Error('需要管理员权限');
            // }

            const emperorId = this.generateEmperorId(name, dynasty);
            await this.database.ref(`emperors/${emperorId}`).remove();

            console.log('皇帝数据已从云端删除:', name);
            return { success: true };
        } catch (error) {
            console.error('从云端删除皇帝数据失败:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * 生成皇帝唯一ID
     * @param {string} name - 皇帝名字
     * @param {string} dynasty - 朝代
     */
    generateEmperorId(name, dynasty) {
        // 使用朝代和名字组合，确保唯一性
        return `${dynasty}_${name}`.replace(/[.#$[\]]/g, '_');
    }

    /**
     * 监听云端数据变化
     * @param {Function} callback - 数据变化时的回调函数
     */
    watchCloudData(callback) {
        if (!this.isInitialized) {
            console.error('Firebase 未初始化');
            return null;
        }

        const ref = this.database.ref('emperors');
        ref.on('value', (snapshot) => {
            const data = snapshot.val();
            const emperors = data ? Object.values(data) : [];
            callback(emperors);
        });

        return ref;
    }

    /**
     * 停止监听云端数据
     * @param {Object} ref - 数据库引用
     */
    unwatchCloudData(ref) {
        if (ref) {
            ref.off();
        }
    }
}

// 创建全局实例
if (typeof window !== 'undefined') {
    window.FirebaseSyncManager = new FirebaseSyncManager();
    
    // 自动初始化
    window.FirebaseSyncManager.initialize().catch(error => {
        console.error('Firebase 同步管理器自动初始化失败:', error);
    });
}
