/**
 * 皇帝选择器管理器
 * 管理皇帝选择界面，提供朝代过滤和皇帝列表选择功能
 */

class EmperorSelectorManager {
    /**
     * @param {HTMLInputElement} inputElement - 游戏输入框元素
     */
    constructor(inputElement) {
        this.inputElement = inputElement;
        this.isVisible = false;
        this.currentDynasty = null;
        this.emperorList = [];
        
        // 获取或创建选择器容器
        this.selectorContainer = document.getElementById('emperor-selector');
        if (!this.selectorContainer) {
            this.createSelectorUI();
        }
        
        // 加载皇帝词库
        this.loadEmperorDictionary();
        
        // 绑定事件
        this.bindEvents();
    }

    /**
     * 创建选择器UI结构
     */
    createSelectorUI() {
        const container = document.createElement('div');
        container.id = 'emperor-selector';
        container.className = 'emperor-selector hidden';
        container.innerHTML = `
            <div class="selector-header">
                <h3>选择皇帝</h3>
                <button class="close-selector-btn" aria-label="关闭选择器">×</button>
            </div>
            <div class="selector-content">
                <div class="dynasty-filters">
                    <div class="dynasty-filters-header">
                        <h4>朝代筛选</h4>
                        <span class="toggle-icon">▼</span>
                    </div>
                    <div class="dynasty-list"></div>
                </div>
                <div class="emperor-list-container">
                    <h4>皇帝</h4>
                    <div class="emperor-list"></div>
                </div>
            </div>
        `;
        
        // 插入到输入框后面
        const gameScreen = document.getElementById('game-screen');
        const inputContainer = gameScreen.querySelector('.input-container');
        inputContainer.parentNode.insertBefore(container, inputContainer.nextSibling);
        
        this.selectorContainer = container;
    }

    /**
     * 加载皇帝词库数据
     */
    loadEmperorDictionary() {
        if (typeof window.EmperorDictionary === 'undefined') {
            console.error('皇帝词库未加载');
            return [];
        }
        
        this.emperorList = window.EmperorDictionary.getAllEmperors();
        return this.emperorList;
    }

    /**
     * 绑定事件监听器
     */
    bindEvents() {
        // 关闭按钮
        const closeBtn = this.selectorContainer.querySelector('.close-selector-btn');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.hideSelector());
        }
        
        // 朝代筛选折叠按钮（仅在手机端有效）
        const dynastyHeader = this.selectorContainer.querySelector('.dynasty-filters-header');
        if (dynastyHeader) {
            dynastyHeader.addEventListener('click', () => this.toggleDynastyList());
        }
    }

    /**
     * 显示选择器
     */
    showSelector() {
        this.isVisible = true;
        this.selectorContainer.classList.remove('hidden');
        
        // 渲染朝代过滤器和皇帝列表
        this.renderDynastyFilters();
        this.renderEmperorList(this.emperorList);
    }

    /**
     * 隐藏选择器
     */
    hideSelector() {
        this.isVisible = false;
        this.selectorContainer.classList.add('hidden');
    }

    /**
     * 渲染朝代过滤器
     */
    renderDynastyFilters() {
        const dynastyListContainer = this.selectorContainer.querySelector('.dynasty-list');
        if (!dynastyListContainer) return;
        
        const dynasties = window.EmperorDictionary.getAllDynasties();
        
        dynastyListContainer.innerHTML = dynasties.map(dynasty => `
            <button class="dynasty-filter-btn" data-dynasty="${dynasty}">
                ${dynasty}
            </button>
        `).join('');
        
        // 绑定朝代过滤按钮事件
        const filterBtns = dynastyListContainer.querySelectorAll('.dynasty-filter-btn');
        filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const dynasty = e.target.dataset.dynasty;
                this.filterByDynasty(dynasty);
                
                // 更新选中状态
                filterBtns.forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
            });
        });
    }

    /**
     * 根据朝代过滤皇帝列表
     * @param {string} dynasty - 朝代名称
     */
    filterByDynasty(dynasty) {
        this.currentDynasty = dynasty;
        const filteredEmperors = window.EmperorDictionary.getEmperorsByDynasty(dynasty);
        this.renderEmperorList(filteredEmperors);
    }

    /**
     * 渲染皇帝列表
     * @param {Array<{name: string, dynasty: string}>} emperors - 皇帝列表
     */
    renderEmperorList(emperors) {
        const emperorListContainer = this.selectorContainer.querySelector('.emperor-list');
        if (!emperorListContainer) return;
        
        if (emperors.length === 0) {
            emperorListContainer.innerHTML = '<p class="no-emperors">暂无皇帝</p>';
            return;
        }
        
        emperorListContainer.innerHTML = emperors.map(emperor => `
            <button class="emperor-item-btn" data-name="${emperor.name}">
                ${emperor.name}
            </button>
        `).join('');
        
        // 绑定皇帝选择按钮事件
        const emperorBtns = emperorListContainer.querySelectorAll('.emperor-item-btn');
        emperorBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const name = e.target.dataset.name;
                this.selectEmperor(name);
            });
        });
    }

    /**
     * 选择皇帝
     * @param {string} emperorName - 皇帝名字
     */
    selectEmperor(emperorName) {
        this.fillInputWithEmperor(emperorName);
    }

    /**
     * 将皇帝名字填入输入框
     * @param {string} emperorName - 皇帝名字
     */
    fillInputWithEmperor(emperorName) {
        if (this.inputElement) {
            this.inputElement.value = emperorName;
            this.inputElement.focus();
        }
        // 注意：不自动关闭选择器，保持打开状态
    }

    /**
     * 获取当前选中的朝代
     * @returns {string|null}
     */
    getCurrentDynasty() {
        return this.currentDynasty;
    }

    /**
     * 切换选择器显示状态
     */
    toggleSelector() {
        if (this.isVisible) {
            this.hideSelector();
        } else {
            this.showSelector();
        }
    }
    
    /**
     * 切换朝代列表展开/收起状态（手机端）
     */
    toggleDynastyList() {
        const dynastyList = this.selectorContainer.querySelector('.dynasty-list');
        const toggleIcon = this.selectorContainer.querySelector('.toggle-icon');
        
        if (dynastyList && toggleIcon) {
            dynastyList.classList.toggle('expanded');
            toggleIcon.classList.toggle('expanded');
        }
    }
}

// 导出到全局作用域
if (typeof window !== 'undefined') {
    window.EmperorSelectorManager = EmperorSelectorManager;
}
