/**
 * UI 管理模块
 * 处理所有用户界面交互和显示
 */

class UIManager {
    constructor() {
        this.currentTab = 'generate';
        this.init();
    }

    /**
     * 初始化 UI 管理器
     */
    init() {
        this.bindTabEvents();
    }

    /**
     * 绑定标签页切换事件
     */
    bindTabEvents() {
        const tabButtons = document.querySelectorAll('.tab-btn');
        
        tabButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const tabName = btn.dataset.tab;
                this.switchTab(tabName);
            });
        });
    }

    /**
     * 切换标签页
     * @param {string} tabName - 标签页名称
     */
    switchTab(tabName) {
        this.currentTab = tabName;

        // 更新按钮状态
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.tab === tabName) {
                btn.classList.add('active');
            }
        });

        // 更新内容显示
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });

        const activeContent = document.getElementById(`tab-${tabName}`);
        if (activeContent) {
            activeContent.classList.add('active');
        }
    }

    /**
     * 显示状态消息
     * @param {string} message - 消息内容
     * @param {string} type - 消息类型 (success/error/info)
     * @param {number} duration - 显示时长（毫秒）
     */
    showMessage(message, type = 'info', duration = 3000) {
        const messageDiv = document.getElementById('status-message');
        if (!messageDiv) return;

        messageDiv.textContent = message;
        messageDiv.className = `status-message ${type}`;
        messageDiv.style.display = 'block';

        setTimeout(() => {
            messageDiv.style.display = 'none';
        }, duration);
    }

    /**
     * 显示加载遮罩
     * @param {string} text - 加载文本
     */
    showLoading(text = '处理中...') {
        const overlay = document.getElementById('loading-overlay');
        const loadingText = document.getElementById('loading-text');
        
        if (overlay) {
            overlay.style.display = 'flex';
        }
        
        if (loadingText) {
            loadingText.textContent = text;
        }
    }

    /**
     * 隐藏加载遮罩
     */
    hideLoading() {
        const overlay = document.getElementById('loading-overlay');
        if (overlay) {
            overlay.style.display = 'none';
        }
    }

    /**
     * 填充生成结果到表单
     * @param {Object} emperorData - 皇帝数据
     */
    populateGeneratedEmperor(emperorData) {
        // 填充基本信息
        document.getElementById('gen-id').value = emperorData.id || '';
        document.getElementById('gen-name').value = emperorData.name || '';
        document.getElementById('gen-temple-name').value = emperorData.templeName || '';
        document.getElementById('gen-posthumous-name').value = emperorData.posthumousName || '';
        document.getElementById('gen-reign-names').value = emperorData.reignNames ? emperorData.reignNames.join(', ') : '';
        document.getElementById('gen-dynasty').value = emperorData.dynasty || '';
        document.getElementById('gen-reign-start').value = emperorData.reignStart || '';
        document.getElementById('gen-reign-end').value = emperorData.reignEnd || '';

        // 填充提示词
        this.populateHints(emperorData.hints || []);

        // 显示结果区域
        const resultSection = document.getElementById('generate-result');
        if (resultSection) {
            resultSection.style.display = 'block';
        }
    }

    /**
     * 填充提示词列表
     * @param {Array} hints - 提示词数组
     */
    populateHints(hints) {
        const container = document.getElementById('gen-hints-container');
        if (!container) return;

        container.innerHTML = '';

        // 按难度分组
        const grouped = {
            hard: hints.filter(h => h.difficulty === 'hard'),
            medium: hints.filter(h => h.difficulty === 'medium'),
            easy: hints.filter(h => h.difficulty === 'easy')
        };

        const difficultyLabels = {
            hard: '困难',
            medium: '中等',
            easy: '简单'
        };

        // 渲染每个难度组
        Object.keys(grouped).forEach(difficulty => {
            const group = grouped[difficulty];
            if (group.length === 0) return;

            const groupDiv = document.createElement('div');
            groupDiv.className = 'hint-group';
            groupDiv.innerHTML = `<h5>${difficultyLabels[difficulty]} (${group.length}个)</h5>`;

            group.forEach((hint, index) => {
                const hintDiv = document.createElement('div');
                hintDiv.className = 'hint-item';
                hintDiv.innerHTML = `
                    <span>${index + 1}.</span>
                    <input type="text" value="${hint.content}" data-difficulty="${difficulty}" data-order="${hint.order}">
                    <button class="delete-btn" onclick="uiManager.removeHint(this)">删除</button>
                `;
                groupDiv.appendChild(hintDiv);
            });

            container.appendChild(groupDiv);
        });
    }

    /**
     * 删除提示词
     * @param {HTMLElement} button - 删除按钮
     */
    removeHint(button) {
        const hintItem = button.closest('.hint-item');
        if (hintItem) {
            hintItem.remove();
        }
    }

    /**
     * 收集生成的皇帝数据
     * @returns {Object} 皇帝数据
     */
    collectGeneratedData() {
        const data = {
            id: document.getElementById('gen-id').value.trim(),
            name: document.getElementById('gen-name').value.trim(),
            templeName: document.getElementById('gen-temple-name').value.trim(),
            posthumousName: document.getElementById('gen-posthumous-name').value.trim(),
            reignNames: document.getElementById('gen-reign-names').value.split(',').map(n => n.trim()).filter(n => n),
            dynasty: document.getElementById('gen-dynasty').value.trim(),
            reignStart: parseInt(document.getElementById('gen-reign-start').value) || 0,
            reignEnd: parseInt(document.getElementById('gen-reign-end').value) || 0,
            difficulty: document.querySelector('input[name="emperor-difficulty"]:checked')?.value || 'medium',
            hints: []
        };

        // 收集提示词
        const hintInputs = document.querySelectorAll('#gen-hints-container input[type="text"]');
        hintInputs.forEach((input) => {
            const content = input.value.trim();
            if (content) {
                data.hints.push({
                    content: content,
                    difficulty: input.dataset.difficulty,
                    order: parseInt(input.dataset.order) || 0  // 使用原始的 order 值
                });
            }
        });

        // 按 order 排序，确保顺序正确
        data.hints.sort((a, b) => a.order - b.order);

        return data;
    }

    /**
     * 清空生成结果
     */
    clearGeneratedResult() {
        document.getElementById('emperor-name').value = '';
        document.querySelector('input[name="emperor-difficulty"][value="medium"]').checked = true;
        
        const resultSection = document.getElementById('generate-result');
        if (resultSection) {
            resultSection.style.display = 'none';
        }

        const container = document.getElementById('gen-hints-container');
        if (container) {
            container.innerHTML = '';
        }
    }

    /**
     * 显示当前提示词
     * @param {Array} hints - 提示词数组
     */
    displayCurrentHints(hints) {
        const container = document.getElementById('current-hints-display');
        if (!container) return;

        container.innerHTML = '';

        // 按难度分组
        const grouped = {
            hard: hints.filter(h => h.difficulty === 'hard'),
            medium: hints.filter(h => h.difficulty === 'medium'),
            easy: hints.filter(h => h.difficulty === 'easy')
        };

        const difficultyLabels = {
            hard: '困难',
            medium: '中等',
            easy: '简单'
        };

        Object.keys(grouped).forEach(difficulty => {
            const group = grouped[difficulty];
            if (group.length === 0) return;

            const groupDiv = document.createElement('div');
            groupDiv.className = 'hint-group';
            groupDiv.innerHTML = `<h5>${difficultyLabels[difficulty]} (${group.length}个)</h5>`;

            group.forEach((hint, index) => {
                const hintDiv = document.createElement('div');
                hintDiv.style.padding = '8px';
                hintDiv.style.background = 'white';
                hintDiv.style.borderRadius = '5px';
                hintDiv.style.marginBottom = '5px';
                hintDiv.textContent = `${index + 1}. ${hint.content}`;
                groupDiv.appendChild(hintDiv);
            });

            container.appendChild(groupDiv);
        });
    }

    /**
     * 显示评估结果
     * @param {Array} evaluations - 评估结果数组
     * @param {Array} hints - 原始提示词数组
     */
    displayEvaluationResults(evaluations, hints) {
        const container = document.getElementById('evaluation-display');
        if (!container) return;

        container.innerHTML = '';

        evaluations.forEach(evaluation => {
            const hint = hints[evaluation.index];
            const itemDiv = document.createElement('div');
            itemDiv.className = `evaluation-item ${evaluation.status}`;

            const statusIcon = {
                pass: '✓',
                warning: '⚠',
                fail: '✗'
            };

            let html = `
                <h5>${statusIcon[evaluation.status]} 提示词 ${evaluation.index + 1} [${hint.difficulty}]</h5>
                <p><strong>内容：</strong>${hint.content}</p>
            `;

            if (evaluation.issues && evaluation.issues.length > 0) {
                html += `<p><strong>问题：</strong>${evaluation.issues.join('；')}</p>`;
            }

            if (evaluation.suggestions && evaluation.suggestions.length > 0) {
                html += `<p><strong>建议：</strong>${evaluation.suggestions.join('；')}</p>`;
            }

            if (evaluation.corrected) {
                html += `<div class="suggestion"><strong>修正建议：</strong>${evaluation.corrected}</div>`;
            }

            itemDiv.innerHTML = html;
            container.appendChild(itemDiv);
        });
    }

    /**
     * 填充皇帝选择下拉框
     * @param {Array} emperors - 皇帝列表
     * @param {string} selectId - 下拉框ID
     */
    populateEmperorSelect(emperors, selectId) {
        const select = document.getElementById(selectId);
        if (!select) return;

        // 清空现有选项（保留第一个"请选择"）
        select.innerHTML = '<option value="">请选择...</option>';

        // 按朝代分组
        const grouped = {};
        emperors.forEach(emp => {
            if (!grouped[emp.dynasty]) {
                grouped[emp.dynasty] = [];
            }
            grouped[emp.dynasty].push(emp);
        });

        // 添加选项
        Object.keys(grouped).sort().forEach(dynasty => {
            const optgroup = document.createElement('optgroup');
            optgroup.label = dynasty;

            grouped[dynasty].forEach(emp => {
                const option = document.createElement('option');
                option.value = emp.id;
                option.textContent = `${emp.name} (${emp.templeName || emp.posthumousName})`;
                optgroup.appendChild(option);
            });

            select.appendChild(optgroup);
        });
    }
}

// 导出到全局作用域
if (typeof window !== 'undefined') {
    window.UIManager = UIManager;
}
