/**
 * 主应用逻辑
 * 协调各个模块的工作
 */

class App {
    constructor() {
        this.authManager = null;
        this.firebaseManager = null;
        this.geminiAPI = null;
        this.uiManager = null;
        
        this.currentEmperor = null;
        this.currentEvaluations = null;
    }

    /**
     * 初始化应用
     */
    async init() {
        console.log('初始化应用...');

        // 初始化各个管理器
        this.authManager = new AuthManager();
        this.firebaseManager = new FirebaseManager();
        this.geminiAPI = new GeminiAPI();
        this.uiManager = new UIManager();

        // 初始化 Firebase
        const firebaseInit = await this.firebaseManager.initialize();
        if (!firebaseInit) {
            this.uiManager.showMessage('Firebase 初始化失败', 'error');
            return;
        }

        // 初始化 Gemini API
        const geminiInit = this.geminiAPI.initialize();
        if (!geminiInit) {
            this.uiManager.showMessage('Gemini API 初始化失败', 'error');
            return;
        }

        // 绑定事件
        this.bindEvents();

        // 加载皇帝列表
        await this.loadEmperorsList();

        console.log('应用初始化完成');
    }

    /**
     * 绑定事件
     */
    bindEvents() {
        // 标签页1：生成新皇帝
        const generateBtn = document.getElementById('generate-btn');
        if (generateBtn) {
            generateBtn.addEventListener('click', () => this.handleGenerateEmperor());
        }

        const syncGeneratedBtn = document.getElementById('sync-generated-btn');
        if (syncGeneratedBtn) {
            syncGeneratedBtn.addEventListener('click', () => this.handleSyncGenerated());
        }

        const clearGeneratedBtn = document.getElementById('clear-generated-btn');
        if (clearGeneratedBtn) {
            clearGeneratedBtn.addEventListener('click', () => this.uiManager.clearGeneratedResult());
        }

        // 标签页2：添加提示词
        const loadEmperorBtn = document.getElementById('load-emperor-btn');
        if (loadEmperorBtn) {
            loadEmperorBtn.addEventListener('click', () => this.handleLoadEmperor());
        }

        const generateHintBtn = document.getElementById('generate-hint-btn');
        if (generateHintBtn) {
            generateHintBtn.addEventListener('click', () => this.handleGenerateHint());
        }

        const addHintToListBtn = document.getElementById('add-hint-to-list-btn');
        if (addHintToListBtn) {
            addHintToListBtn.addEventListener('click', () => this.handleAddHintToList());
        }

        const regenerateHintBtn = document.getElementById('regenerate-hint-btn');
        if (regenerateHintBtn) {
            regenerateHintBtn.addEventListener('click', () => this.handleGenerateHint());
        }

        // 标签页3：评估提示词
        const evaluateBtn = document.getElementById('evaluate-btn');
        if (evaluateBtn) {
            evaluateBtn.addEventListener('click', () => this.handleEvaluate());
        }

        const applyFixesBtn = document.getElementById('apply-fixes-btn');
        if (applyFixesBtn) {
            applyFixesBtn.addEventListener('click', () => this.handleApplyFixes());
        }

        const syncEvaluatedBtn = document.getElementById('sync-evaluated-btn');
        if (syncEvaluatedBtn) {
            syncEvaluatedBtn.addEventListener('click', () => this.handleSyncEvaluated());
        }
    }

    /**
     * 加载皇帝列表
     */
    async loadEmperorsList() {
        try {
            const emperors = await this.firebaseManager.getAllEmperors();
            
            // 填充所有下拉框
            this.uiManager.populateEmperorSelect(emperors, 'select-emperor');
            this.uiManager.populateEmperorSelect(emperors, 'evaluate-emperor');
            this.uiManager.populateEmperorSelect(emperors, 'manage-emperor');
            
            console.log(`加载了 ${emperors.length} 个皇帝`);
        } catch (error) {
            console.error('加载皇帝列表失败:', error);
            this.uiManager.showMessage('加载皇帝列表失败', 'error');
        }
    }

    /**
     * 处理生成新皇帝
     */
    async handleGenerateEmperor() {
        const nameInput = document.getElementById('emperor-name');
        const difficultyInput = document.querySelector('input[name="emperor-difficulty"]:checked');

        const emperorName = nameInput.value.trim();
        const difficulty = difficultyInput ? difficultyInput.value : 'medium';

        if (!emperorName) {
            this.uiManager.showMessage('请输入皇帝名称', 'error');
            return;
        }

        this.uiManager.showLoading('AI 正在生成皇帝数据，请稍候...');

        try {
            const emperorData = await this.geminiAPI.generateEmperor(emperorName, difficulty);
            this.uiManager.populateGeneratedEmperor(emperorData);
            this.uiManager.showMessage('生成成功！请检查并编辑数据', 'success');
        } catch (error) {
            console.error('生成皇帝失败:', error);
            this.uiManager.showMessage('生成失败: ' + error.message, 'error');
        } finally {
            this.uiManager.hideLoading();
        }
    }

    /**
     * 处理同步生成的皇帝
     */
    async handleSyncGenerated() {
        const emperorData = this.uiManager.collectGeneratedData();

        // 验证数据
        if (!emperorData.id || !emperorData.name) {
            this.uiManager.showMessage('请填写完整的皇帝信息', 'error');
            return;
        }

        if (emperorData.hints.length < 15) {
            this.uiManager.showMessage('提示词数量不足15个', 'error');
            return;
        }

        this.uiManager.showLoading('正在同步到云端...');

        try {
            // 检查ID是否已存在
            const exists = await this.firebaseManager.emperorExists(emperorData.id);
            if (exists) {
                const confirm = window.confirm('该皇帝ID已存在，是否覆盖？');
                if (!confirm) {
                    this.uiManager.hideLoading();
                    return;
                }
            }

            await this.firebaseManager.saveEmperor(emperorData);
            this.uiManager.showMessage('同步成功！', 'success');
            
            // 刷新皇帝列表
            await this.loadEmperorsList();
            
            // 清空表单
            this.uiManager.clearGeneratedResult();
        } catch (error) {
            console.error('同步失败:', error);
            this.uiManager.showMessage('同步失败: ' + error.message, 'error');
        } finally {
            this.uiManager.hideLoading();
        }
    }

    /**
     * 处理加载皇帝数据
     */
    async handleLoadEmperor() {
        const select = document.getElementById('select-emperor');
        const emperorId = select.value;

        if (!emperorId) {
            this.uiManager.showMessage('请选择一个皇帝', 'error');
            return;
        }

        this.uiManager.showLoading('加载皇帝数据...');

        try {
            this.currentEmperor = await this.firebaseManager.getEmperorById(emperorId);
            this.uiManager.displayCurrentHints(this.currentEmperor.hints || []);
            
            // 显示添加提示词区域
            const section = document.getElementById('current-hints-section');
            if (section) {
                section.style.display = 'block';
            }

            this.uiManager.showMessage('加载成功', 'success');
        } catch (error) {
            console.error('加载皇帝数据失败:', error);
            this.uiManager.showMessage('加载失败: ' + error.message, 'error');
        } finally {
            this.uiManager.hideLoading();
        }
    }

    /**
     * 处理生成新提示词
     */
    async handleGenerateHint() {
        if (!this.currentEmperor) {
            this.uiManager.showMessage('请先加载皇帝数据', 'error');
            return;
        }

        const difficultyInput = document.querySelector('input[name="add-hint-difficulty"]:checked');
        const difficulty = difficultyInput ? difficultyInput.value : 'medium';

        this.uiManager.showLoading('AI 正在生成提示词...');

        try {
            const newHint = await this.geminiAPI.generateHint(
                this.currentEmperor.name,
                this.currentEmperor.hints || [],
                difficulty
            );

            // 显示生成的提示词
            const textarea = document.getElementById('new-hint-content');
            if (textarea) {
                textarea.value = newHint;
            }

            const resultDiv = document.getElementById('new-hint-result');
            if (resultDiv) {
                resultDiv.style.display = 'block';
            }

            this.uiManager.showMessage('生成成功！', 'success');
        } catch (error) {
            console.error('生成提示词失败:', error);
            this.uiManager.showMessage('生成失败: ' + error.message, 'error');
        } finally {
            this.uiManager.hideLoading();
        }
    }

    /**
     * 处理添加提示词到列表
     */
    async handleAddHintToList() {
        if (!this.currentEmperor) {
            this.uiManager.showMessage('请先加载皇帝数据', 'error');
            return;
        }

        const textarea = document.getElementById('new-hint-content');
        const content = textarea.value.trim();

        if (!content) {
            this.uiManager.showMessage('请输入提示词内容', 'error');
            return;
        }

        const difficultyInput = document.querySelector('input[name="add-hint-difficulty"]:checked');
        const difficulty = difficultyInput ? difficultyInput.value : 'medium';

        this.uiManager.showLoading('正在添加提示词...');

        try {
            // 添加到当前皇帝的提示词列表
            const newHint = {
                id: `${this.currentEmperor.id}-hint-${this.currentEmperor.hints.length}`,
                content: content,
                difficulty: difficulty,
                order: this.currentEmperor.hints.length
            };

            this.currentEmperor.hints.push(newHint);

            // 更新到云端
            await this.firebaseManager.updateHints(this.currentEmperor.id, this.currentEmperor.hints);

            // 刷新显示
            this.uiManager.displayCurrentHints(this.currentEmperor.hints);

            // 清空输入
            textarea.value = '';
            const resultDiv = document.getElementById('new-hint-result');
            if (resultDiv) {
                resultDiv.style.display = 'none';
            }

            this.uiManager.showMessage('添加成功！', 'success');
        } catch (error) {
            console.error('添加提示词失败:', error);
            this.uiManager.showMessage('添加失败: ' + error.message, 'error');
        } finally {
            this.uiManager.hideLoading();
        }
    }

    /**
     * 处理评估提示词
     */
    async handleEvaluate() {
        const select = document.getElementById('evaluate-emperor');
        const emperorId = select.value;

        if (!emperorId) {
            this.uiManager.showMessage('请选择一个皇帝', 'error');
            return;
        }

        this.uiManager.showLoading('AI 正在评估提示词，请稍候...');

        try {
            const emperor = await this.firebaseManager.getEmperorById(emperorId);
            this.currentEmperor = emperor;

            const evaluations = await this.geminiAPI.evaluateHints(
                emperor.name,
                emperor.hints || []
            );

            this.currentEvaluations = evaluations;
            this.uiManager.displayEvaluationResults(evaluations, emperor.hints);

            // 显示结果区域
            const resultDiv = document.getElementById('evaluation-result');
            if (resultDiv) {
                resultDiv.style.display = 'block';
            }

            this.uiManager.showMessage('评估完成！', 'success');
        } catch (error) {
            console.error('评估失败:', error);
            this.uiManager.showMessage('评估失败: ' + error.message, 'error');
        } finally {
            this.uiManager.hideLoading();
        }
    }

    /**
     * 处理应用修正
     */
    handleApplyFixes() {
        if (!this.currentEmperor || !this.currentEvaluations) {
            this.uiManager.showMessage('请先进行评估', 'error');
            return;
        }

        // 应用所有修正建议
        this.currentEvaluations.forEach(evaluation => {
            if (evaluation.corrected && evaluation.status !== 'pass') {
                const hint = this.currentEmperor.hints[evaluation.index];
                if (hint) {
                    hint.content = evaluation.corrected;
                    // 更新评估状态为通过
                    evaluation.status = 'pass';
                    // 清空问题和建议
                    evaluation.issues = [];
                    evaluation.suggestions = [];
                }
            }
        });

        // 重新显示评估结果
        this.uiManager.displayEvaluationResults(this.currentEvaluations, this.currentEmperor.hints);
        this.uiManager.showMessage('已应用所有修正建议', 'success');
    }

    /**
     * 处理同步评估后的数据
     */
    async handleSyncEvaluated() {
        if (!this.currentEmperor) {
            this.uiManager.showMessage('没有可同步的数据', 'error');
            return;
        }

        this.uiManager.showLoading('正在同步到云端...');

        try {
            await this.firebaseManager.saveEmperor(this.currentEmperor);
            this.uiManager.showMessage('同步成功！', 'success');
        } catch (error) {
            console.error('同步失败:', error);
            this.uiManager.showMessage('同步失败: ' + error.message, 'error');
        } finally {
            this.uiManager.hideLoading();
        }
    }
}

// 全局变量
let app = null;
let uiManager = null;

// 页面加载完成后初始化
window.addEventListener('DOMContentLoaded', async () => {
    console.log('页面加载完成，初始化应用...');
    
    // 检查配置文件
    if (typeof CONFIG === 'undefined') {
        alert('配置文件未加载！请确保 config.js 文件存在并正确配置。');
        return;
    }

    app = new App();
    uiManager = app.uiManager;
    await app.init();
});
