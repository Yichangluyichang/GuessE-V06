/**
 * 中国皇帝猜谜游戏 - 管理功能模块
 * 实现皇帝数据管理界面的功能，包括添加新皇帝和查看现有数据
 */

/**
 * 管理功能类
 * 负责处理皇帝数据的添加、验证和显示
 */
class AdminManager {
    constructor(database, uiRenderer) {
        this.database = database;
        this.uiRenderer = uiRenderer;
        this.currentTab = 'view-emperors';
        
        // 编辑模式相关属性
        this.isEditMode = false;
        this.editingEmperorId = null;
        
        // 翻页和搜索相关属性
        this.currentPage = 1;
        this.pageSize = 10;
        this.searchQuery = '';
        this.statusFilter = 'all';
        this.dynastyFilter = 'all';
        this.sortField = 'reignStart';
        this.sortOrder = 'asc';
        this.filteredEmperors = [];
        this.totalPages = 0;
        
        // 绑定方法上下文
        this.init = this.init.bind(this);
        this.showAdminScreen = this.showAdminScreen.bind(this);
        this.hideAdminScreen = this.hideAdminScreen.bind(this);
        this.switchTab = this.switchTab.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.clearForm = this.clearForm.bind(this);
        this.validateForm = this.validateForm.bind(this);
        this.refreshEmperorsList = this.refreshEmperorsList.bind(this);
        this.editEmperor = this.editEmperor.bind(this);
        this.populateForm = this.populateForm.bind(this);
        this.resetToAddMode = this.resetToAddMode.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleFilter = this.handleFilter.bind(this);
        this.resetFilters = this.resetFilters.bind(this);
        this.handlePageSizeChange = this.handlePageSizeChange.bind(this);
        this.goToPage = this.goToPage.bind(this);
        this.filterEmperors = this.filterEmperors.bind(this);
        this.renderPagination = this.renderPagination.bind(this);
        this.showDeleteConfirmation = this.showDeleteConfirmation.bind(this);
        this.deleteEmperor = this.deleteEmperor.bind(this);
        this.handleDeleteError = this.handleDeleteError.bind(this);
        this.validateDeletion = this.validateDeletion.bind(this);
        
        // 动态提示词管理方法绑定
        this.addHintInput = this.addHintInput.bind(this);
        this.removeHintInput = this.removeHintInput.bind(this);
        this.updateHintsCounter = this.updateHintsCounter.bind(this);
        this.validateHintRequirements = this.validateHintRequirements.bind(this);
        this.initializeMinimumHints = this.initializeMinimumHints.bind(this);
        this.clearAllHints = this.clearAllHints.bind(this);
    }
    
    /**
     * 初始化管理功能
     */
    init() {
        console.log('初始化管理功能...');
        this.bindEvents();
        this.setupFormValidation();
    }
    
    /**
     * 绑定事件监听器
     */
    bindEvents() {
        // 管理按钮
        const adminBtn = document.getElementById('admin-btn');
        if (adminBtn) {
            adminBtn.addEventListener('click', this.showAdminScreen);
        }
        
        // 标签页切换
        const addEmperorTab = document.getElementById('add-emperor-tab');
        const viewEmperorsTab = document.getElementById('view-emperors-tab');
        
        if (addEmperorTab) {
            addEmperorTab.addEventListener('click', () => this.switchTab('add-emperor'));
        }
        
        if (viewEmperorsTab) {
            viewEmperorsTab.addEventListener('click', () => this.switchTab('view-emperors'));
        }
        
        // 表单提交
        const emperorForm = document.getElementById('emperor-form');
        if (emperorForm) {
            emperorForm.addEventListener('submit', this.handleFormSubmit);
        }
        
        // 清空表单
        const clearFormBtn = document.getElementById('clear-form-btn');
        if (clearFormBtn) {
            clearFormBtn.addEventListener('click', this.clearForm);
        }
        
        // 返回游戏按钮
        const backToGameBtn = document.getElementById('back-to-game-btn');
        const backToGameFromListBtn = document.getElementById('back-to-game-from-list-btn');
        
        if (backToGameBtn) {
            backToGameBtn.addEventListener('click', this.hideAdminScreen);
        }
        
        if (backToGameFromListBtn) {
            backToGameFromListBtn.addEventListener('click', this.hideAdminScreen);
        }
        
        // 刷新列表按钮
        const refreshListBtn = document.getElementById('refresh-list-btn');
        if (refreshListBtn) {
            refreshListBtn.addEventListener('click', this.refreshEmperorsList);
        }
        
        // 搜索和过滤
        const searchInput = document.getElementById('emperor-search');
        const statusFilter = document.getElementById('status-filter');
        const dynastyFilter = document.getElementById('dynasty-filter');
        const sortField = document.getElementById('sort-field');
        const sortOrder = document.getElementById('sort-order');
        const resetFiltersBtn = document.getElementById('reset-filters-btn');
        const pageSizeSelect = document.getElementById('page-size-select');
        const clearSearchBtn = document.getElementById('clear-search-btn');
        
        if (searchInput) {
            searchInput.addEventListener('input', this.handleSearch);
        }
        
        if (clearSearchBtn) {
            clearSearchBtn.addEventListener('click', () => {
                searchInput.value = '';
                this.handleSearch();
            });
        }
        
        if (statusFilter) {
            statusFilter.addEventListener('change', this.handleFilter);
        }
        
        if (dynastyFilter) {
            dynastyFilter.addEventListener('change', this.handleFilter);
        }
        
        if (sortField) {
            sortField.addEventListener('change', this.handleFilter);
        }
        
        if (sortOrder) {
            sortOrder.addEventListener('change', this.handleFilter);
        }
        
        if (resetFiltersBtn) {
            resetFiltersBtn.addEventListener('click', this.resetFilters);
        }
        
        if (pageSizeSelect) {
            pageSizeSelect.addEventListener('change', this.handlePageSizeChange);
        }
        
        // 翻页按钮
        const firstPageBtn = document.getElementById('first-page-btn');
        const prevPageBtn = document.getElementById('prev-page-btn');
        const nextPageBtn = document.getElementById('next-page-btn');
        const lastPageBtn = document.getElementById('last-page-btn');
        
        if (firstPageBtn) {
            firstPageBtn.addEventListener('click', () => this.goToPage(1));
        }
        
        if (prevPageBtn) {
            prevPageBtn.addEventListener('click', () => this.goToPage(this.currentPage - 1));
        }
        
        if (nextPageBtn) {
            nextPageBtn.addEventListener('click', () => this.goToPage(this.currentPage + 1));
        }
        
        if (lastPageBtn) {
            lastPageBtn.addEventListener('click', () => this.goToPage(this.totalPages));
        }
        
        // 动态提示词管理事件
        this.bindDynamicHintEvents();
    }
    
    /**
     * 设置表单验证
     */
    setupFormValidation() {
        const inputs = document.querySelectorAll('#emperor-form input, #emperor-form textarea');
        
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
        });
    }
    
    /**
     * 显示管理界面
     */
    showAdminScreen() {
        console.log('显示管理界面');
        
        // 隐藏其他屏幕
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        
        // 显示管理屏幕
        const adminScreen = document.getElementById('admin-screen');
        if (adminScreen) {
            adminScreen.classList.add('active');
        }
        
        // 默认切换到查看皇帝标签页
        this.switchTab('view-emperors');
    }
    
    /**
     * 隐藏管理界面，返回开始屏幕
     */
    hideAdminScreen() {
        console.log('隐藏管理界面');
        
        // 隐藏管理屏幕
        const adminScreen = document.getElementById('admin-screen');
        if (adminScreen) {
            adminScreen.classList.remove('active');
        }
        
        // 显示开始屏幕
        const startScreen = document.getElementById('start-screen');
        if (startScreen) {
            startScreen.classList.add('active');
        }
        
        // 清空任何错误消息
        this.clearMessages();
    }
    
    /**
     * 切换标签页
     * @param {string} tabName - 标签页名称
     */
    switchTab(tabName) {
        console.log(`切换到标签页: ${tabName}`);
        
        this.currentTab = tabName;
        
        // 更新标签按钮状态
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        const activeTabBtn = document.getElementById(`${tabName}-tab`);
        if (activeTabBtn) {
            activeTabBtn.classList.add('active');
        }
        
        // 切换面板
        document.querySelectorAll('.admin-panel').forEach(panel => {
            panel.classList.remove('active');
        });
        
        const activePanel = document.getElementById(`${tabName}-panel`);
        if (activePanel) {
            activePanel.classList.add('active');
        }
        
        // 如果切换到查看皇帝标签页，刷新列表
        if (tabName === 'view-emperors') {
            this.refreshEmperorsList();
        }
    }
    
    /**
     * 处理表单提交
     * @param {Event} event - 提交事件
     */
    async handleFormSubmit(event) {
        event.preventDefault();
        
        console.log('=== 表单提交开始 ===');
        console.log('处理表单提交', this.isEditMode ? '(编辑模式)' : '(添加模式)');
        
        // 验证表单
        console.log('开始表单验证...');
        if (!this.validateForm()) {
            console.log('表单验证失败，停止提交');
            this.showMessage('请修正表单中的错误', 'error');
            return;
        }
        console.log('表单验证通过');
        
        // 显示加载状态
        this.setFormLoading(true);
        
        try {
            // 收集表单数据
            console.log('收集表单数据...');
            const emperorData = this.collectFormData();
            
            // 验证皇帝数据
            console.log('验证皇帝数据...');
            if (!window.GameValidation.validateEmperor(emperorData)) {
                throw new Error('皇帝数据验证失败');
            }
            console.log('皇帝数据验证通过');
            
            let success = false;
            
            if (this.isEditMode) {
                console.log('执行编辑模式更新...');
                console.log(`原始ID: ${this.editingEmperorId}, 新ID: ${emperorData.id}`);
                
                // 检查ID是否被修改
                const idChanged = this.editingEmperorId !== emperorData.id;
                
                if (idChanged) {
                    console.log('ID已修改，需要删除旧记录并添加新记录');
                    
                    // 先删除旧记录
                    const deleteSuccess = await this.database.deleteEmperor(this.editingEmperorId);
                    if (!deleteSuccess) {
                        throw new Error('删除旧记录失败');
                    }
                    console.log('旧记录已删除');
                    
                    // 添加新记录
                    success = await this.database.addEmperor(emperorData);
                    if (!success) {
                        throw new Error('添加新记录失败');
                    }
                    console.log('新记录已添加');
                } else {
                    // ID未修改，直接更新
                    success = await this.database.updateEmperor(emperorData);
                }
                
                if (success) {
                    console.log('皇帝更新成功');
                    this.showMessage(`成功更新皇帝: ${emperorData.name}${idChanged ? ' (ID已修改)' : ''}`, 'success');
                    
                    // 编辑模式下不清空表单，保持当前数据
                    // 只重置编辑状态
                    this.isEditMode = false;
                    this.editingEmperorId = null;
                    
                    // 恢复表单标题和按钮文本
                    const formTitle = document.querySelector('#add-emperor-panel h3');
                    if (formTitle) {
                        formTitle.textContent = '基本信息';
                    }
                    
                    const submitBtn = document.querySelector('#emperor-form button[type="submit"]');
                    if (submitBtn) {
                        submitBtn.textContent = '添加皇帝';
                    }
                    
                    // 启用ID字段
                    const idField = document.getElementById('emperor-id');
                    if (idField) {
                        idField.disabled = false;
                    }
                    
                    // 延迟切换到皇帝列表页面
                    setTimeout(() => {
                        this.switchTab('view-emperors');
                    }, 1500);
                } else {
                    throw new Error('更新皇帝失败');
                }
            } else {
                console.log('执行添加模式...');
                // 添加模式：添加新皇帝
                success = await this.database.addEmperor(emperorData);
                
                if (success) {
                    console.log('皇帝添加成功');
                    this.showMessage(`成功添加皇帝: ${emperorData.name}`, 'success');
                    this.clearForm();
                    
                    // 延迟切换到皇帝列表页面
                    setTimeout(() => {
                        this.switchTab('view-emperors');
                    }, 1500);
                } else {
                    throw new Error('添加皇帝失败，可能ID已存在');
                }
            }
            
            console.log('=== 表单提交成功 ===');
            
        } catch (error) {
            console.error('处理表单提交失败:', error);
            this.showMessage(`${this.isEditMode ? '更新' : '添加'}失败: ${error.message}`, 'error');
        } finally {
            this.setFormLoading(false);
        }
    }
    
    /**
     * 收集表单数据
     * @returns {Object} 皇帝数据对象
     */
    collectFormData() {
        console.log('=== 开始收集表单数据 ===');
        
        // 获取表单字段
        const idField = document.getElementById('emperor-id');
        const nameField = document.getElementById('emperor-name');
        const templeField = document.getElementById('emperor-temple-name');
        const posthumousField = document.getElementById('emperor-posthumous-name');
        const reignField = document.getElementById('emperor-reign-names');
        const dynastyField = document.getElementById('emperor-dynasty');
        const reignStartField = document.getElementById('emperor-reign-start');
        const reignEndField = document.getElementById('emperor-reign-end');
        const difficultyField = document.getElementById('emperor-difficulty');
        
        // 验证字段存在
        if (!idField || !nameField || !templeField || !posthumousField || !reignField || 
            !dynastyField || !reignStartField || !reignEndField) {
            console.error('表单字段不完整');
            throw new Error('表单字段不完整');
        }
        
        // 收集基本信息
        const formData = {
            id: idField.value.trim(),
            name: nameField.value.trim(),
            templeName: templeField.value.trim(),
            posthumousName: posthumousField.value.trim(),
            reignNames: reignField.value
                .split(',')
                .map(name => name.trim())
                .filter(name => name !== ''),
            dynasty: dynastyField.value.trim(),
            reignStart: parseInt(reignStartField.value) || 0,
            reignEnd: parseInt(reignEndField.value) || 0,
            difficulty: difficultyField ? (difficultyField.value || 'medium') : 'medium', // 默认中等难度
            hints: []
        };
        
        console.log('收集表单数据 - 基本信息:', {
            id: formData.id,
            name: formData.name,
            templeName: formData.templeName,
            posthumousName: formData.posthumousName,
            reignNames: formData.reignNames,
            dynasty: formData.dynasty,
            reignStart: formData.reignStart,
            reignEnd: formData.reignEnd,
            difficulty: formData.difficulty
        });
        
        // 验证基本信息不为空
        if (!formData.id || !formData.name || !formData.templeName || !formData.posthumousName || 
            !formData.dynasty || !formData.reignStart || !formData.reignEnd) {
            console.error('基本信息不完整:', formData);
            throw new Error('基本信息不完整');
        }
        
        // 验证在位时间逻辑
        if (formData.reignStart > formData.reignEnd) {
            console.error('在位时间逻辑错误:', formData.reignStart, '>', formData.reignEnd);
            throw new Error('在位结束年份必须大于或等于开始年份');
        }
        
        // 收集提示词
        const hintInputs = document.querySelectorAll('.hint-input');
        console.log(`找到 ${hintInputs.length} 个提示词输入框`);
        
        let hintOrder = 0;
        hintInputs.forEach(input => {
            const content = input.value.trim();
            if (content) {
                const difficulty = input.dataset.difficulty;
                
                const hint = {
                    id: `${formData.id}-hint-${hintOrder + 1}`,
                    content: content,
                    difficulty: difficulty,
                    order: hintOrder
                };
                
                formData.hints.push(hint);
                console.log(`收集提示词 ${hintOrder + 1} (${difficulty}):`, hint);
                hintOrder++;
            }
        });
        
        // 按难度和内容排序提示词（困难->中等->简单）
        const difficultyOrder = { 'hard': 0, 'medium': 1, 'easy': 2 };
        formData.hints.sort((a, b) => {
            const diffA = difficultyOrder[a.difficulty] || 3;
            const diffB = difficultyOrder[b.difficulty] || 3;
            return diffA - diffB;
        });
        
        // 重新分配顺序号
        formData.hints.forEach((hint, index) => {
            hint.order = index;
        });
        
        console.log('=== 表单数据收集完成 ===');
        console.log('最终数据:', JSON.stringify(formData, null, 2));
        
        // 最终验证
        if (formData.name !== nameField.value.trim()) {
            console.error('数据收集后姓名不匹配！');
            console.error(`表单字段值: "${nameField.value.trim()}"`);
            console.error(`收集到的值: "${formData.name}"`);
            
            // 强制修正
            formData.name = nameField.value.trim();
        }
        
        return formData;
    }
    
    /**
     * 验证表单
     * @returns {boolean} 表单是否有效
     */
    validateForm() {
        console.log('开始验证表单...');
        let isValid = true;
        
        // 验证基本字段
        const requiredFields = [
            'emperor-id',
            'emperor-name', 
            'emperor-temple-name',
            'emperor-posthumous-name',
            'emperor-reign-names'
        ];
        
        console.log('验证基本字段...');
        requiredFields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            const fieldValid = this.validateField(field);
            console.log(`字段 ${fieldId}: ${fieldValid ? '有效' : '无效'} (值: "${field ? field.value : 'null'}")`);
            if (!fieldValid) {
                isValid = false;
            }
        });
        
        // 使用新的动态提示词验证
        const hintValidation = this.validateHintRequirements();
        console.log('提示词验证结果:', hintValidation);
        
        if (!hintValidation.isValid) {
            hintValidation.errors.forEach(error => {
                this.showMessage(error, 'error');
            });
            isValid = false;
        }
        
        // 验证ID格式（允许中文、字母、数字、连字符和下划线）
        const idField = document.getElementById('emperor-id');
        const idPattern = /^[\u4e00-\u9fa5a-zA-Z0-9\-_]+$/;
        if (idField && idField.value && !idPattern.test(idField.value)) {
            console.log('ID格式验证失败:', idField.value);
            this.setFieldError(idField, 'ID只能包含中文、字母、数字、连字符和下划线');
            isValid = false;
        }
        
        console.log(`表单验证结果: ${isValid ? '通过' : '失败'}`);
        return isValid;
    }
    
    /**
     * 验证单个字段
     * @param {HTMLElement} field - 要验证的字段
     * @returns {boolean} 字段是否有效
     */
    validateField(field) {
        if (!field) return false;
        
        const value = field.value.trim();
        
        // 检查必填字段
        if (field.hasAttribute('required') && !value) {
            this.setFieldError(field, '此字段为必填项');
            return false;
        }
        
        // 特殊验证
        if (field.id === 'emperor-id') {
            const idPattern = /^[\u4e00-\u9fa5a-zA-Z0-9\-_]+$/;
            if (value && !idPattern.test(value)) {
                this.setFieldError(field, 'ID只能包含中文、字母、数字、连字符和下划线');
                return false;
            }
            
            // 检查ID是否已存在（编辑模式下跳过当前编辑的皇帝）
            if (value && !this.isEditMode && this.database.getEmperorById(value)) {
                this.setFieldError(field, '此ID已存在');
                return false;
            }
        }
        
        if (field.id === 'emperor-reign-names') {
            if (value && !value.includes(',') && value.length < 2) {
                this.setFieldError(field, '请输入至少一个年号');
                return false;
            }
        }
        
        // 验证通过
        this.setFieldSuccess(field);
        return true;
    }
    
    /**
     * 设置字段错误状态
     * @param {HTMLElement} field - 字段元素
     * @param {string} message - 错误消息
     */
    setFieldError(field, message) {
        field.classList.remove('success');
        field.classList.add('error');
        
        // 移除现有错误消息
        const existingError = field.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
        
        // 添加错误消息
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        errorDiv.style.color = '#e74c3c';
        errorDiv.style.fontSize = '0.85rem';
        errorDiv.style.marginTop = '0.3rem';
        errorDiv.textContent = message;
        
        field.parentNode.appendChild(errorDiv);
    }
    
    /**
     * 设置字段成功状态
     * @param {HTMLElement} field - 字段元素
     */
    setFieldSuccess(field) {
        field.classList.remove('error');
        field.classList.add('success');
        
        // 移除错误消息
        const existingError = field.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
    }
    
    /**
     * 清除字段错误状态
     * @param {HTMLElement} field - 字段元素
     */
    clearFieldError(field) {
        field.classList.remove('error', 'success');
        
        const existingError = field.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
    }
    
    /**
     * 彻底清空表单 - 确保没有任何残留数据
     */
    clearFormCompletely() {
        console.log('=== 开始彻底清空表单 ===');
        
        // 🔥 第一步：重置所有状态标志（只在非编辑模式下重置）
        if (!this.isEditMode) {
            this.isEditMode = false;
            this.editingEmperorId = null;
            console.log('重置编辑状态标志');
        } else {
            console.log('编辑模式下，保持编辑状态标志');
        }
        
        // 🔥 第二步：获取表单元素并重置
        const form = document.getElementById('emperor-form');
        if (form) {
            // 重置表单
            form.reset();
            console.log('表单已重置');
        }
        
        // 🔥 第三步：手动清空所有输入字段，使用多种方法确保彻底清空
        const allInputs = document.querySelectorAll('#emperor-form input, #emperor-form textarea');
        console.log(`找到 ${allInputs.length} 个输入字段，开始逐个彻底清空...`);
        
        allInputs.forEach((input, index) => {
            const fieldName = input.id || input.name || `字段${index + 1}`;
            const oldValue = input.value;
            
            // 🔥 多种方式彻底清空字段
            input.value = '';
            input.setAttribute('value', '');
            input.defaultValue = '';
            
            // 🔥 清除所有可能的属性和状态
            input.removeAttribute('placeholder');
            input.disabled = false;
            input.readOnly = false;
            
            // 🔥 移除所有CSS类
            input.classList.remove('error', 'success');
            
            // 🔥 触发清空事件
            input.dispatchEvent(new Event('input', { bubbles: true }));
            input.dispatchEvent(new Event('change', { bubbles: true }));
            
            console.log(`彻底清空 ${fieldName}: "${oldValue}" -> "${input.value}"`);
            
            // 🔥 验证清空结果
            if (input.value !== '') {
                console.warn(`⚠️ ${fieldName} 清空后仍有值: "${input.value}"，强制再次清空`);
                input.value = '';
                input.setAttribute('value', '');
                input.defaultValue = '';
            }
        });
        
        // 🔥 第四步：清除所有字段错误信息
        const errorMessages = document.querySelectorAll('.field-error');
        errorMessages.forEach(error => {
            error.remove();
        });
        console.log(`清除了 ${errorMessages.length} 个错误信息`);
        
        // 🔥 第五步：恢复表单标题和按钮文本到默认状态（只在非编辑模式下）
        if (!this.isEditMode) {
            const formTitle = document.querySelector('#add-emperor-panel h3');
            if (formTitle) {
                formTitle.textContent = '基本信息';
            }
            
            const submitBtn = document.querySelector('#emperor-form button[type="submit"]');
            if (submitBtn) {
                submitBtn.textContent = '添加皇帝';
            }
        }
        
        // 🔥 第六步：启用ID字段（编辑模式下会被禁用）
        const idField = document.getElementById('emperor-id');
        if (idField && !this.isEditMode) {
            idField.disabled = false;
        }
        
        // 🔥 第七步：清除消息
        this.clearMessages();
        
        console.log('=== 表单彻底清空完成 ===');
    }

    /**
     * 清空表单
     */
    clearForm() {
        console.log('清空表单');
        
        const form = document.getElementById('emperor-form');
        if (form) {
            form.reset();
        }
        
        // 清空动态提示词
        const containers = [
            document.getElementById('hard-hints-list'),
            document.getElementById('medium-hints-list'),
            document.getElementById('easy-hints-list')
        ];
        
        containers.forEach(container => {
            if (container) {
                container.innerHTML = '';
            }
        });
        
        // 更新计数器
        this.updateHintsCounter();
        
        // 清除所有字段状态
        const fields = document.querySelectorAll('#emperor-form input, #emperor-form textarea');
        fields.forEach(field => {
            this.clearFieldError(field);
        });
        
        // 重置为添加模式
        this.resetToAddMode();
        
        this.clearMessages();
    }
    
    /**
     * 刷新皇帝列表
     */
    refreshEmperorsList() {
        console.log('刷新皇帝列表');
        
        try {
            const emperors = this.database.getAllEmperorsInfo();
            const stats = this.database.getStats();
            
            this.renderEmperorsStats(stats);
            this.filterEmperors(emperors);
            
        } catch (error) {
            console.error('刷新皇帝列表失败:', error);
            this.showMessage('刷新列表失败', 'error');
        }
    }
    
    /**
     * 处理搜索输入
     */
    handleSearch() {
        const searchInput = document.getElementById('emperor-search');
        this.searchQuery = searchInput ? searchInput.value.trim().toLowerCase() : '';
        this.currentPage = 1; // 重置到第一页
        this.refreshEmperorsList();
    }
    
    /**
     * 处理状态过滤
     */
    handleFilter() {
        const statusFilter = document.getElementById('status-filter');
        const dynastyFilter = document.getElementById('dynasty-filter');
        const sortField = document.getElementById('sort-field');
        const sortOrder = document.getElementById('sort-order');
        
        this.statusFilter = statusFilter ? statusFilter.value : 'all';
        this.dynastyFilter = dynastyFilter ? dynastyFilter.value : 'all';
        this.sortField = sortField ? sortField.value : 'reignStart';
        this.sortOrder = sortOrder ? sortOrder.value : 'asc';
        
        this.currentPage = 1; // 重置到第一页
        this.refreshEmperorsList();
    }
    
    /**
     * 重置所有筛选条件
     */
    resetFilters() {
        // 重置搜索框
        const searchInput = document.getElementById('emperor-search');
        if (searchInput) searchInput.value = '';
        
        // 重置所有筛选器
        const statusFilter = document.getElementById('status-filter');
        const dynastyFilter = document.getElementById('dynasty-filter');
        const sortField = document.getElementById('sort-field');
        const sortOrder = document.getElementById('sort-order');
        
        if (statusFilter) statusFilter.value = 'all';
        if (dynastyFilter) dynastyFilter.value = 'all';
        if (sortField) sortField.value = 'reignStart';
        if (sortOrder) sortOrder.value = 'asc';
        
        // 重置内部状态
        this.searchQuery = '';
        this.statusFilter = 'all';
        this.dynastyFilter = 'all';
        this.sortField = 'reignStart';
        this.sortOrder = 'asc';
        this.currentPage = 1;
        
        // 刷新列表
        this.refreshEmperorsList();
    }
    
    /**
     * 处理页面大小变化
     */
    handlePageSizeChange() {
        const pageSizeSelect = document.getElementById('page-size-select');
        const newPageSize = pageSizeSelect ? pageSizeSelect.value : '10';
        
        if (newPageSize === 'all') {
            this.pageSize = -1; // -1 表示显示全部
        } else {
            this.pageSize = parseInt(newPageSize);
        }
        
        this.currentPage = 1; // 重置到第一页
        this.refreshEmperorsList();
    }
    
    /**
     * 跳转到指定页面
     * @param {number} page - 页码
     */
    goToPage(page) {
        if (page < 1 || page > this.totalPages) {
            return;
        }
        
        this.currentPage = page;
        this.renderEmperorsTable(this.filteredEmperors);
        this.renderPagination();
    }
    
    /**
     * 过滤皇帝数据
     * @param {Array} emperors - 原始皇帝数据
     */
    filterEmperors(emperors) {
        let filtered = [...emperors];
        
        // 应用搜索过滤
        if (this.searchQuery) {
            filtered = filtered.filter(emperor => {
                const fullEmperor = this.database.getEmperorById(emperor.id);
                const searchFields = [
                    emperor.id,
                    emperor.name,
                    emperor.templeName,
                    emperor.posthumousName,
                    fullEmperor?.dynasty || '',
                    ...emperor.reignNames
                ].join(' ').toLowerCase();
                
                return searchFields.includes(this.searchQuery);
            });
        }
        
        // 应用朝代过滤
        if (this.dynastyFilter !== 'all') {
            filtered = filtered.filter(emperor => {
                const fullEmperor = this.database.getEmperorById(emperor.id);
                return fullEmperor && fullEmperor.dynasty === this.dynastyFilter;
            });
        }
        
        // 应用状态过滤
        if (this.statusFilter !== 'all') {
            filtered = filtered.filter(emperor => {
                const fullEmperor = this.database.getEmperorById(emperor.id);
                const isValid = fullEmperor && window.GameValidation.validateEmperor(fullEmperor) && emperor.hintCount >= 10;
                
                return this.statusFilter === 'valid' ? isValid : !isValid;
            });
        }
        
        // 应用排序
        filtered.sort((a, b) => {
            const fullEmperorA = this.database.getEmperorById(a.id);
            const fullEmperorB = this.database.getEmperorById(b.id);
            
            let valueA, valueB;
            
            switch (this.sortField) {
                case 'name':
                    valueA = a.name;
                    valueB = b.name;
                    break;
                case 'dynasty':
                    valueA = fullEmperorA?.dynasty || '';
                    valueB = fullEmperorB?.dynasty || '';
                    break;
                case 'reignStart':
                    valueA = fullEmperorA?.reignStart || 0;
                    valueB = fullEmperorB?.reignStart || 0;
                    break;
                case 'hintCount':
                    valueA = a.hintCount;
                    valueB = b.hintCount;
                    break;
                default:
                    valueA = a.name;
                    valueB = b.name;
            }
            
            if (typeof valueA === 'string') {
                valueA = valueA.toLowerCase();
                valueB = valueB.toLowerCase();
            }
            
            let comparison = 0;
            if (valueA < valueB) comparison = -1;
            else if (valueA > valueB) comparison = 1;
            
            return this.sortOrder === 'desc' ? -comparison : comparison;
        });
        
        this.filteredEmperors = filtered;
        
        // 计算总页数
        if (this.pageSize === -1) {
            this.totalPages = 1;
        } else {
            this.totalPages = Math.ceil(filtered.length / this.pageSize);
        }
        
        // 确保当前页面在有效范围内
        if (this.currentPage > this.totalPages && this.totalPages > 0) {
            this.currentPage = this.totalPages;
        }
        
        this.renderEmperorsTable(filtered);
        this.renderPagination();
    }
    
    /**
     * 渲染皇帝统计信息
     * @param {Object} stats - 统计数据
     */
    renderEmperorsStats(stats) {
        const statsContainer = document.getElementById('emperors-stats');
        if (!statsContainer) return;
        
        statsContainer.innerHTML = `
            <h3>数据库统计</h3>
            <div class="stats-grid">
                <div class="stat-item">
                    <span class="stat-number">${stats.totalEmperors}</span>
                    <span class="stat-label">总皇帝数</span>
                </div>
                <div class="stat-item">
                    <span class="stat-number">${stats.validEmperors}</span>
                    <span class="stat-label">有效皇帝</span>
                </div>
                <div class="stat-item">
                    <span class="stat-number">${stats.totalHints}</span>
                    <span class="stat-label">总提示词</span>
                </div>
                <div class="stat-item">
                    <span class="stat-number">${stats.storageAvailable ? '可用' : '不可用'}</span>
                    <span class="stat-label">存储状态</span>
                </div>
            </div>
        `;
    }
    
    /**
     * 渲染皇帝表格
     * @param {Array} emperors - 皇帝数据数组
     */
    renderEmperorsTable(emperors) {
        const tableBody = document.getElementById('emperors-table-body');
        if (!tableBody) return;
        
        if (emperors.length === 0) {
            tableBody.innerHTML = `
                <tr>
                    <td colspan="7" style="text-align: center; padding: 2rem; color: #666;">
                        ${this.searchQuery || this.statusFilter !== 'all' ? '没有找到匹配的皇帝数据' : '暂无皇帝数据'}
                    </td>
                </tr>
            `;
            return;
        }
        
        // 计算当前页面要显示的数据
        let displayEmperors = emperors;
        
        if (this.pageSize !== -1) {
            const startIndex = (this.currentPage - 1) * this.pageSize;
            const endIndex = startIndex + this.pageSize;
            displayEmperors = emperors.slice(startIndex, endIndex);
        }
        
        tableBody.innerHTML = displayEmperors.map(emperor => {
            // 获取完整的皇帝数据进行验证
            const fullEmperor = this.database.getEmperorById(emperor.id);
            const isValid = fullEmperor && window.GameValidation.validateEmperor(fullEmperor) && emperor.hintCount >= 10;
            const statusClass = isValid ? 'status-valid' : 'status-invalid';
            const statusText = isValid ? '有效' : '无效';
            const hintCountClass = emperor.hintCount >= 10 ? '' : 'insufficient';
            
            // 获取难度信息
            const difficulty = fullEmperor?.difficulty || 'medium';
            const difficultyText = {
                'easy': '简单',
                'medium': '中等',
                'hard': '困难'
            }[difficulty] || '中等';
            const difficultyClass = `difficulty-${difficulty}`;
            
            return `
                <tr>
                    <td>${emperor.name}</td>
                    <td>${fullEmperor?.dynasty || '未知'}</td>
                    <td>${emperor.templeName}</td>
                    <td><span class="difficulty-badge ${difficultyClass}">${difficultyText}</span></td>
                    <td class="hint-count ${hintCountClass}">${emperor.hintCount}</td>
                    <td><span class="status-badge ${statusClass}">${statusText}</span></td>
                    <td>
                        <button onclick="editEmperor('${emperor.id}')" class="edit-btn" title="编辑皇帝">编辑</button>
                        <button onclick="showDeleteConfirmation('${emperor.id}')" class="delete-btn" title="删除皇帝">删除</button>
                    </td>
                </tr>
            `;
        }).join('');
    }
    
    /**
     * 编辑皇帝数据
     * @param {string} emperorId - 皇帝ID
     */
    editEmperor(emperorId) {
        console.log(`=== 开始编辑皇帝: ${emperorId} ===`);
        
        try {
            // 获取皇帝数据
            const emperor = this.database.getEmperorById(emperorId);
            if (!emperor) {
                this.showMessage('未找到指定的皇帝数据', 'error');
                return;
            }
            
            console.log('获取到皇帝数据:', emperor);
            console.log(`皇帝姓名: "${emperor.name}"`);
            
            // 切换到添加皇帝标签页
            console.log('切换到添加皇帝标签页...');
            this.switchTab('add-emperor');
            
            // 等待DOM更新
            setTimeout(() => {
                console.log('开始填充编辑数据...');
                
                // 设置编辑模式
                this.isEditMode = true;
                this.editingEmperorId = emperorId;
                console.log('已设置编辑模式');
                
                // 直接填充表单数据，不要清空
                this.populateFormForEdit(emperor);
                
                // 更新表单标题和按钮
                const formTitle = document.querySelector('#add-emperor-panel h3');
                if (formTitle) {
                    formTitle.textContent = `编辑皇帝: ${emperor.name}`;
                }
                
                const submitBtn = document.querySelector('#emperor-form button[type="submit"]');
                if (submitBtn) {
                    submitBtn.textContent = '更新皇帝';
                }
                
                this.showMessage(`正在编辑皇帝: ${emperor.name}`, 'info');
                
            }, 500); // 减少延迟时间
            
        } catch (error) {
            console.error('编辑皇帝失败:', error);
            this.showMessage('编辑皇帝失败: ' + error.message, 'error');
        }
    }
    
    /**
     * 为编辑模式填充表单数据（不清空现有数据）
     * @param {Object} emperor - 皇帝数据
     */
    populateFormForEdit(emperor) {
        console.log('=== 开始为编辑模式填充表单数据 ===');
        console.log('皇帝数据:', emperor);
        
        // 获取表单字段
        const idField = document.getElementById('emperor-id');
        const nameField = document.getElementById('emperor-name');
        const templeField = document.getElementById('emperor-temple-name');
        const posthumousField = document.getElementById('emperor-posthumous-name');
        const reignField = document.getElementById('emperor-reign-names');
        const dynastyField = document.getElementById('emperor-dynasty');
        const reignStartField = document.getElementById('emperor-reign-start');
        const reignEndField = document.getElementById('emperor-reign-end');
        const difficultyField = document.getElementById('emperor-difficulty');
        
        if (!idField || !nameField || !templeField || !posthumousField || !reignField ||
            !dynastyField || !reignStartField || !reignEndField) {
            console.error('表单字段不完整，无法填充');
            return;
        }
        
        // 直接填充基本信息
        idField.value = emperor.id;
        // 允许编辑ID，但添加警告提示
        idField.disabled = false;
        idField.title = '警告：修改ID会创建新的皇帝记录，原记录需要手动删除';
        
        nameField.value = emperor.name;
        templeField.value = emperor.templeName;
        posthumousField.value = emperor.posthumousName;
        reignField.value = emperor.reignNames ? emperor.reignNames.join(', ') : '';
        dynastyField.value = emperor.dynasty || '';
        reignStartField.value = emperor.reignStart || '';
        reignEndField.value = emperor.reignEnd || '';
        
        // 填充难度字段（如果存在）
        if (difficultyField) {
            difficultyField.value = emperor.difficulty || 'medium';
            console.log(`- 难度: ${difficultyField.value}`);
        }
        
        console.log('基本信息填充完成:');
        console.log(`- ID: ${idField.value}`);
        console.log(`- 姓名: ${nameField.value}`);
        console.log(`- 庙号: ${templeField.value}`);
        console.log(`- 谥号: ${posthumousField.value}`);
        console.log(`- 年号: ${reignField.value}`);
        console.log(`- 朝代: ${dynastyField.value}`);
        console.log(`- 在位开始: ${reignStartField.value}`);
        console.log(`- 在位结束: ${reignEndField.value}`);
        
        // 填充提示词数据
        if (emperor.hints && emperor.hints.length > 0) {
            console.log(`开始填充 ${emperor.hints.length} 个提示词`);
            this.populateDynamicHints(emperor.hints);
        } else {
            console.log('没有提示词需要填充');
            this.populateDynamicHints([]);
        }
        
        // 清除所有字段的错误状态
        const allFields = document.querySelectorAll('#emperor-form input, #emperor-form select, #emperor-form textarea');
        allFields.forEach(field => {
            this.clearFieldError(field);
        });
        
        console.log('=== 编辑模式表单填充完成 ===');
    }
    
    /**
     * 填充表单数据
     * @param {Object} emperor - 皇帝数据
     */
    populateForm(emperor) {
        console.log('=== 开始填充表单数据 ===');
        console.log('皇帝数据:', emperor);
        console.log(`要填充的姓名: "${emperor.name}"`);
        
        // 🔥 第一步：多次尝试获取DOM元素，确保元素存在
        let attempts = 0;
        const maxAttempts = 15; // 增加尝试次数
        
        const tryPopulate = () => {
            attempts++;
            console.log(`第 ${attempts} 次尝试填充表单...`);
            
            // 获取DOM元素
            const idField = document.getElementById('emperor-id');
            const nameField = document.getElementById('emperor-name');
            const templeField = document.getElementById('emperor-temple-name');
            const posthumousField = document.getElementById('emperor-posthumous-name');
            const reignField = document.getElementById('emperor-reign-names');
            const dynastyField = document.getElementById('emperor-dynasty');
            const reignStartField = document.getElementById('emperor-reign-start');
            const reignEndField = document.getElementById('emperor-reign-end');
            
            console.log('DOM元素检查:');
            console.log(`- ID字段: ${idField ? '存在' : '不存在'}`);
            console.log(`- 姓名字段: ${nameField ? '存在' : '不存在'}`);
            console.log(`- 庙号字段: ${templeField ? '存在' : '不存在'}`);
            console.log(`- 谥号字段: ${posthumousField ? '存在' : '不存在'}`);
            console.log(`- 年号字段: ${reignField ? '存在' : '不存在'}`);
            console.log(`- 朝代字段: ${dynastyField ? '存在' : '不存在'}`);
            console.log(`- 在位开始字段: ${reignStartField ? '存在' : '不存在'}`);
            console.log(`- 在位结束字段: ${reignEndField ? '存在' : '不存在'}`);
            
            if (!idField || !nameField || !templeField || !posthumousField || !reignField ||
                !dynastyField || !reignStartField || !reignEndField) {
                if (attempts < maxAttempts) {
                    console.warn(`第 ${attempts} 次尝试失败，表单字段不完整，100ms后重试...`);
                    setTimeout(tryPopulate, 100);
                    return;
                } else {
                    console.error('达到最大尝试次数，表单字段仍不存在，无法填充');
                    return;
                }
            }
            
            console.log('所有表单字段已找到，开始填充前的状态检查...');
            
            // 🔥 第二步：关键检查 - 验证表单是否真的被清空了
            console.log('填充前的字段状态检查:');
            console.log(`- ID字段当前值: "${idField.value}"`);
            console.log(`- 姓名字段当前值: "${nameField.value}"`);
            console.log(`- 庙号字段当前值: "${templeField.value}"`);
            console.log(`- 谥号字段当前值: "${posthumousField.value}"`);
            console.log(`- 年号字段当前值: "${reignField.value}"`);
            console.log(`- 朝代字段当前值: "${dynastyField.value}"`);
            console.log(`- 在位开始字段当前值: "${reignStartField.value}"`);
            console.log(`- 在位结束字段当前值: "${reignEndField.value}"`);
            
            // 🔥 第三步：如果有任何字段还有残留数据，强制清空
            const fieldsToCheck = [
                { field: nameField, name: '姓名', expectedValue: emperor.name },
                { field: templeField, name: '庙号', expectedValue: emperor.templeName },
                { field: posthumousField, name: '谥号', expectedValue: emperor.posthumousName },
                { field: reignField, name: '年号', expectedValue: emperor.reignNames ? emperor.reignNames.join(', ') : '' },
                { field: dynastyField, name: '朝代', expectedValue: emperor.dynasty || '' },
                { field: reignStartField, name: '在位开始', expectedValue: emperor.reignStart || '' },
                { field: reignEndField, name: '在位结束', expectedValue: emperor.reignEnd || '' }
            ];
            
            fieldsToCheck.forEach(({ field, name, expectedValue }) => {
                if (field.value && field.value !== expectedValue) {
                    console.warn(`⚠️ 检测到${name}字段有残留数据: "${field.value}"，强制清空...`);
                    field.value = '';
                    field.setAttribute('value', '');
                    field.defaultValue = '';
                    field.removeAttribute('placeholder');
                }
            });
            
            console.log('开始填充数据...');
            
            // 🔥 第四步：强制填充基本信息 - 使用超强填充方法
            const superFillField = (field, value, fieldName) => {
                console.log(`超强填充${fieldName}: "${value}"`);
                
                // 1. 清除所有可能的干扰属性和状态
                field.removeAttribute('placeholder');
                field.disabled = false;
                field.readOnly = false;
                field.classList.remove('error', 'success');
                
                // 2. 多种方式设置值
                field.value = value || '';
                field.setAttribute('value', value || '');
                field.defaultValue = value || '';
                
                // 3. 强制触发所有相关事件
                field.dispatchEvent(new Event('input', { bubbles: true }));
                field.dispatchEvent(new Event('change', { bubbles: true }));
                field.dispatchEvent(new Event('keyup', { bubbles: true }));
                field.dispatchEvent(new Event('blur', { bubbles: true }));
                
                // 4. 物理操作确保字段激活
                field.focus();
                field.select();
                field.blur();
                
                console.log(`${fieldName}超强填充后的值: "${field.value}"`);
                
                // 5. 立即验证填充结果
                if (field.value !== (value || '')) {
                    console.error(`❌ ${fieldName}超强填充失败！期望: "${value}", 实际: "${field.value}"`);
                    
                    // 再次尝试填充
                    field.value = value || '';
                    field.setAttribute('value', value || '');
                    field.defaultValue = value || '';
                    
                    console.log(`${fieldName}重新填充后的值: "${field.value}"`);
                    
                    if (field.value !== (value || '')) {
                        console.error(`❌ ${fieldName}重新填充仍然失败！`);
                    } else {
                        console.log(`✅ ${fieldName}重新填充成功`);
                    }
                } else {
                    console.log(`✅ ${fieldName}超强填充成功`);
                }
            };
            
            // 填充所有基本字段
            superFillField(idField, emperor.id, 'ID');
            superFillField(nameField, emperor.name, '姓名');
            superFillField(templeField, emperor.templeName, '庙号');
            superFillField(posthumousField, emperor.posthumousName, '谥号');
            superFillField(reignField, emperor.reignNames ? emperor.reignNames.join(', ') : '', '年号');
            superFillField(dynastyField, emperor.dynasty || '', '朝代');
            superFillField(reignStartField, emperor.reignStart || '', '在位开始');
            superFillField(reignEndField, emperor.reignEnd || '', '在位结束');
            
            // 禁用ID字段（编辑时不能修改ID）
            idField.disabled = true;
            
            // 🔥 第五步：填充提示词 - 按照data-order匹配
            const hintInputs = document.querySelectorAll('textarea[data-order]');
            console.log(`找到 ${hintInputs.length} 个提示词输入框`);
            
            // 先清空所有提示词输入框
            hintInputs.forEach(input => {
                input.value = '';
                input.setAttribute('value', '');
                input.defaultValue = '';
            });
            
            // 如果有提示词数据，按照order匹配填充
            if (emperor.hints && emperor.hints.length > 0) {
                console.log(`开始填充 ${emperor.hints.length} 个提示词`);
                
                hintInputs.forEach(input => {
                    const inputOrder = parseInt(input.dataset.order) - 1; // HTML中是1-10，转换为0-9
                    const matchingHint = emperor.hints.find(hint => hint.order === inputOrder);
                    
                    if (matchingHint) {
                        input.value = matchingHint.content;
                        console.log(`填充提示词 ${inputOrder + 1}: ${matchingHint.content}`);
                    }
                });
            }
            
            // 🔥 第六步：多次验证填充结果，确保数据正确
            let verifyAttempts = 0;
            const maxVerifyAttempts = 8; // 增加验证次数
            
            const verifyFillResult = () => {
                verifyAttempts++;
                console.log(`=== 第 ${verifyAttempts} 次验证填充结果 ===`);
                
                const currentNameValue = nameField.value;
                const expectedName = emperor.name;
                
                console.log(`姓名字段当前值: "${currentNameValue}"`);
                console.log(`期望值: "${expectedName}"`);
                console.log(`姓名字段placeholder: "${nameField.placeholder}"`);
                console.log(`姓名字段disabled: ${nameField.disabled}`);
                console.log(`姓名字段readOnly: ${nameField.readOnly}`);
                
                if (currentNameValue !== expectedName) {
                    console.error(`第 ${verifyAttempts} 次验证失败！姓名字段值不正确`);
                    
                    // 强制重新填充
                    nameField.value = expectedName;
                    nameField.setAttribute('value', expectedName);
                    nameField.defaultValue = expectedName;
                    nameField.removeAttribute('placeholder');
                    nameField.disabled = false;
                    nameField.readOnly = false;
                    
                    // 触发事件
                    nameField.dispatchEvent(new Event('input', { bubbles: true }));
                    nameField.dispatchEvent(new Event('change', { bubbles: true }));
                    nameField.dispatchEvent(new Event('keyup', { bubbles: true }));
                    nameField.dispatchEvent(new Event('blur', { bubbles: true }));
                    
                    // 物理操作
                    nameField.focus();
                    nameField.select();
                    nameField.blur();
                    
                    console.log(`强制重新填充后的值: "${nameField.value}"`);
                    
                    // 如果还有重试次数，继续验证
                    if (verifyAttempts < maxVerifyAttempts) {
                        setTimeout(verifyFillResult, 150);
                    } else {
                        console.error('达到最大验证次数，姓名字段填充仍然失败！');
                    }
                } else {
                    console.log(`✅ 第 ${verifyAttempts} 次验证成功，姓名字段填充正确`);
                }
            };
            
            // 开始验证
            setTimeout(verifyFillResult, 100);
            
            console.log('=== 表单填充完成 ===');
        };
        
        // 开始尝试填充
        tryPopulate();
    }
    
    /**
     * 重置表单为添加模式
     */
    resetToAddMode() {
        console.log('重置为添加模式');
        
        this.isEditMode = false;
        this.editingEmperorId = null;
        
        // 恢复表单标题和按钮
        const formTitle = document.querySelector('#add-emperor-panel h3');
        if (formTitle) {
            formTitle.textContent = '基本信息';
        }
        
        const submitBtn = document.querySelector('#emperor-form button[type="submit"]');
        if (submitBtn) {
            submitBtn.textContent = '添加皇帝';
        }
        
        // 启用ID字段
        const idField = document.getElementById('emperor-id');
        if (idField) {
            idField.disabled = false;
        }
    }
    
    /**
     * 渲染翻页控件
     */
    renderPagination() {
        const paginationContainer = document.getElementById('pagination-container');
        if (!paginationContainer) return;
        
        const totalRecords = this.filteredEmperors.length;
        
        // 更新信息文本
        const infoText = document.getElementById('pagination-info-text');
        if (infoText) {
            if (totalRecords === 0) {
                infoText.textContent = '没有记录';
            } else if (this.pageSize === -1) {
                infoText.textContent = `显示全部 ${totalRecords} 条记录`;
            } else {
                const startRecord = (this.currentPage - 1) * this.pageSize + 1;
                const endRecord = Math.min(this.currentPage * this.pageSize, totalRecords);
                infoText.textContent = `显示第 ${startRecord}-${endRecord} 条，共 ${totalRecords} 条记录`;
            }
        }
        
        // 如果显示全部或只有一页，隐藏翻页控件
        if (this.pageSize === -1 || this.totalPages <= 1) {
            const paginationControls = document.querySelector('.pagination-controls');
            if (paginationControls) {
                paginationControls.style.display = 'none';
            }
            return;
        } else {
            const paginationControls = document.querySelector('.pagination-controls');
            if (paginationControls) {
                paginationControls.style.display = 'flex';
            }
        }
        
        // 更新翻页按钮状态
        const firstPageBtn = document.getElementById('first-page-btn');
        const prevPageBtn = document.getElementById('prev-page-btn');
        const nextPageBtn = document.getElementById('next-page-btn');
        const lastPageBtn = document.getElementById('last-page-btn');
        
        if (firstPageBtn) {
            firstPageBtn.disabled = this.currentPage === 1;
        }
        
        if (prevPageBtn) {
            prevPageBtn.disabled = this.currentPage === 1;
        }
        
        if (nextPageBtn) {
            nextPageBtn.disabled = this.currentPage === this.totalPages;
        }
        
        if (lastPageBtn) {
            lastPageBtn.disabled = this.currentPage === this.totalPages;
        }
        
        // 渲染页码按钮
        this.renderPageNumbers();
    }
    
    /**
     * 渲染页码按钮
     */
    renderPageNumbers() {
        const pageNumbersContainer = document.getElementById('page-numbers');
        if (!pageNumbersContainer) return;
        
        const maxVisiblePages = 5;
        let startPage = Math.max(1, this.currentPage - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(this.totalPages, startPage + maxVisiblePages - 1);
        
        // 调整起始页面以确保显示足够的页码
        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }
        
        let pageNumbersHTML = '';
        
        // 如果起始页面不是1，显示第一页和省略号
        if (startPage > 1) {
            pageNumbersHTML += `<button class="page-number-btn" onclick="window.adminManagerInstance.goToPage(1)">1</button>`;
            if (startPage > 2) {
                pageNumbersHTML += `<span class="page-ellipsis">...</span>`;
            }
        }
        
        // 显示页码按钮
        for (let i = startPage; i <= endPage; i++) {
            const activeClass = i === this.currentPage ? 'active' : '';
            pageNumbersHTML += `<button class="page-number-btn ${activeClass}" onclick="window.adminManagerInstance.goToPage(${i})">${i}</button>`;
        }
        
        // 如果结束页面不是最后一页，显示省略号和最后一页
        if (endPage < this.totalPages) {
            if (endPage < this.totalPages - 1) {
                pageNumbersHTML += `<span class="page-ellipsis">...</span>`;
            }
            pageNumbersHTML += `<button class="page-number-btn" onclick="window.adminManagerInstance.goToPage(${this.totalPages})">${this.totalPages}</button>`;
        }
        
        pageNumbersContainer.innerHTML = pageNumbersHTML;
    }
    
    /**
     * 截断文本
     * @param {string} text - 原文本
     * @param {number} maxLength - 最大长度
     * @returns {string} 截断后的文本
     */
    truncateText(text, maxLength) {
        if (text.length <= maxLength) {
            return text;
        }
        return text.substring(0, maxLength) + '...';
    }
    
    /**
     * 设置表单加载状态
     * @param {boolean} loading - 是否加载中
     */
    setFormLoading(loading) {
        const form = document.getElementById('emperor-form');
        if (!form) return;
        
        if (loading) {
            form.classList.add('form-loading');
            
            // 禁用所有输入
            const inputs = form.querySelectorAll('input, textarea, button');
            inputs.forEach(input => {
                input.disabled = true;
            });
        } else {
            form.classList.remove('form-loading');
            
            // 启用所有输入
            const inputs = form.querySelectorAll('input, textarea, button');
            inputs.forEach(input => {
                input.disabled = false;
            });
        }
    }
    
    /**
     * 显示消息
     * @param {string} message - 消息内容
     * @param {string} type - 消息类型 ('success', 'error', 'info')
     */
    showMessage(message, type = 'info') {
        // 移除现有消息
        this.clearMessages();
        
        const messageDiv = document.createElement('div');
        messageDiv.className = `${type}-message`;
        messageDiv.textContent = message;
        
        // 插入到管理内容的顶部
        const adminContent = document.getElementById('admin-content');
        if (adminContent) {
            adminContent.insertBefore(messageDiv, adminContent.firstChild);
        }
        
        // 3秒后自动移除
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.parentNode.removeChild(messageDiv);
            }
        }, 3000);
    }
    
    /**
     * 显示删除确认对话框
     * @param {string} emperorId - 皇帝ID
     */
    showDeleteConfirmation(emperorId) {
        console.log(`显示删除确认对话框: ${emperorId}`);
        
        try {
            // 获取皇帝信息
            const emperor = this.database.getEmperorById(emperorId);
            if (!emperor) {
                this.showMessage('未找到指定的皇帝数据', 'error');
                return;
            }
            
            // 验证是否可以删除
            const validation = this.validateDeletion(emperorId);
            if (!validation.isValid) {
                this.showMessage(validation.warningMessage, 'error');
                return;
            }
            
            // 创建确认对话框
            const confirmDialog = document.createElement('div');
            confirmDialog.className = 'delete-confirmation-dialog';
            confirmDialog.innerHTML = `
                <div class="dialog-overlay">
                    <div class="dialog-content">
                        <h3>确认删除皇帝</h3>
                        <p>您确定要删除以下皇帝吗？</p>
                        <div class="emperor-info">
                            <p><strong>名字:</strong> ${emperor.name}</p>
                            <p><strong>庙号:</strong> ${emperor.templeName}</p>
                            <p><strong>谥号:</strong> ${emperor.posthumousName}</p>
                            <p><strong>年号:</strong> ${emperor.reignNames.join(', ')}</p>
                        </div>
                        <p class="warning-text">此操作不可撤销！</p>
                        <div class="dialog-actions">
                            <button class="confirm-delete-btn danger-btn">确认删除</button>
                            <button class="cancel-delete-btn secondary-btn">取消</button>
                        </div>
                    </div>
                </div>
            `;
            
            // 添加到页面
            document.body.appendChild(confirmDialog);
            
            // 绑定事件
            const confirmBtn = confirmDialog.querySelector('.confirm-delete-btn');
            const cancelBtn = confirmDialog.querySelector('.cancel-delete-btn');
            const overlay = confirmDialog.querySelector('.dialog-overlay');
            
            const closeDialog = () => {
                if (confirmDialog.parentNode) {
                    confirmDialog.parentNode.removeChild(confirmDialog);
                }
            };
            
            confirmBtn.addEventListener('click', async () => {
                closeDialog();
                await this.deleteEmperor(emperorId);
            });
            
            cancelBtn.addEventListener('click', closeDialog);
            
            // 点击遮罩层关闭对话框
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) {
                    closeDialog();
                }
            });
            
            // ESC键关闭对话框
            const handleKeyDown = (e) => {
                if (e.key === 'Escape') {
                    closeDialog();
                    document.removeEventListener('keydown', handleKeyDown);
                }
            };
            document.addEventListener('keydown', handleKeyDown);
            
        } catch (error) {
            console.error('显示删除确认对话框失败:', error);
            this.showMessage('显示删除确认对话框失败', 'error');
        }
    }
    
    /**
     * 删除皇帝
     * @param {string} emperorId - 皇帝ID
     * @returns {Promise<boolean>} 删除是否成功
     */
    async deleteEmperor(emperorId) {
        console.log(`开始删除皇帝: ${emperorId}`);
        
        try {
            // 显示加载状态
            this.showMessage('正在删除皇帝...', 'info');
            
            // 获取当前游戏状态（如果存在）
            let currentGameState = null;
            if (window.game && window.game.gameStateManager) {
                currentGameState = window.game.gameStateManager.getCurrentState();
            }
            
            // 执行删除
            const result = await this.database.deleteEmperor(emperorId, currentGameState);
            
            if (result.success) {
                console.log('皇帝删除成功:', result.message);
                this.showMessage(result.message, 'success');
                
                // 刷新皇帝列表
                setTimeout(() => {
                    this.refreshEmperorsList();
                }, 1000);
                
                return true;
            } else {
                console.error('皇帝删除失败:', result.message);
                this.handleDeleteError(new Error(result.message), emperorId);
                return false;
            }
            
        } catch (error) {
            console.error('删除皇帝时发生错误:', error);
            this.handleDeleteError(error, emperorId);
            return false;
        }
    }
    
    /**
     * 处理删除错误
     * @param {Error} error - 错误对象
     * @param {string} emperorId - 皇帝ID
     */
    handleDeleteError(error, emperorId) {
        console.error('删除皇帝失败:', error);
        
        let errorMessage = '删除皇帝失败';
        if (error.message) {
            errorMessage += ': ' + error.message;
        }
        
        this.showMessage(errorMessage, 'error');
        
        // 刷新列表确保数据一致性
        setTimeout(() => {
            this.refreshEmperorsList();
        }, 1500);
    }
    
    /**
     * 验证删除操作
     * @param {string} emperorId - 皇帝ID
     * @returns {Object} 验证结果 {isValid: boolean, reason?: string, warningMessage?: string}
     */
    validateDeletion(emperorId) {
        try {
            // 获取当前游戏状态（如果存在）
            let currentGameState = null;
            if (window.game && window.game.gameStateManager) {
                currentGameState = window.game.gameStateManager.getCurrentState();
            }
            
            // 使用数据库的验证方法
            return this.database.canDeleteEmperor(emperorId, currentGameState);
            
        } catch (error) {
            console.error('验证删除操作失败:', error);
            return {
                isValid: false,
                reason: 'validation_error',
                warningMessage: '验证删除操作失败: ' + error.message
            };
        }
    }
    
    /**
     * 清除所有消息
     */
    clearMessages() {
        const messages = document.querySelectorAll('.success-message, .error-message, .info-message');
        messages.forEach(message => {
            if (message.parentNode) {
                message.parentNode.removeChild(message);
            }
        });
    }
    
    /**
     * 绑定动态提示词管理事件
     */
    bindDynamicHintEvents() {
        // 添加提示词按钮
        document.addEventListener('click', (e) => {
            if (e.target.matches('.add-hint-btn') || e.target.closest('.add-hint-btn')) {
                const btn = e.target.matches('.add-hint-btn') ? e.target : e.target.closest('.add-hint-btn');
                const difficulty = btn.dataset.difficulty;
                this.addHintInput(difficulty);
            }
        });
        
        // 删除提示词按钮
        document.addEventListener('click', (e) => {
            if (e.target.matches('.remove-hint-btn') || e.target.closest('.remove-hint-btn')) {
                const btn = e.target.matches('.remove-hint-btn') ? e.target : e.target.closest('.remove-hint-btn');
                const hintGroup = btn.closest('.hint-input-group');
                this.removeHintInput(hintGroup);
            }
        });
        
        // 提示词内容变化时更新计数器
        document.addEventListener('input', (e) => {
            if (e.target.matches('.hint-input')) {
                this.updateHintsCounter();
            }
        });
        
        // 快速添加最低要求提示词
        const addMinimumBtn = document.getElementById('add-minimum-hints-btn');
        if (addMinimumBtn) {
            addMinimumBtn.addEventListener('click', this.initializeMinimumHints);
        }
        
        // 清空所有提示词
        const clearAllBtn = document.getElementById('clear-all-hints-btn');
        if (clearAllBtn) {
            clearAllBtn.addEventListener('click', this.clearAllHints);
        }
    }
    
    /**
     * 添加提示词输入框
     * @param {string} difficulty - 难度等级 ('hard', 'medium', 'easy')
     */
    addHintInput(difficulty) {
        const container = document.getElementById(`${difficulty}-hints-list`);
        if (!container) {
            console.error(`找不到难度为 ${difficulty} 的提示词容器`);
            return;
        }
        
        // 生成唯一ID
        const timestamp = Date.now();
        const hintId = `hint-${difficulty}-${timestamp}`;
        
        // 获取当前该难度的提示词数量，用于生成顺序号
        const existingHints = container.querySelectorAll('.hint-input-group');
        const order = existingHints.length + 1;
        
        // 创建提示词输入组
        const hintGroup = document.createElement('div');
        hintGroup.className = 'hint-input-group';
        hintGroup.dataset.hintId = hintId;
        
        // 根据难度设置占位符文本
        let placeholder = '';
        switch (difficulty) {
            case 'hard':
                placeholder = '困难提示词，如历史背景、政策影响等';
                break;
            case 'medium':
                placeholder = '中等提示词，如重要事件、特征等';
                break;
            case 'easy':
                placeholder = '简单提示词，如朝代、著名事迹等';
                break;
        }
        
        hintGroup.innerHTML = `
            <div class="hint-input-header">
                <label for="${hintId}">${this.getDifficultyLabel(difficulty)}提示词 ${order}:</label>
                <button type="button" class="remove-hint-btn" title="删除此提示词">
                    <span class="btn-icon">×</span>
                </button>
            </div>
            <textarea 
                id="${hintId}"
                class="hint-input" 
                data-difficulty="${difficulty}" 
                data-order="${order}"
                placeholder="${placeholder}"
                rows="2"
            ></textarea>
        `;
        
        container.appendChild(hintGroup);
        
        // 更新计数器
        this.updateHintsCounter();
        
        // 聚焦到新添加的输入框
        const newInput = hintGroup.querySelector('.hint-input');
        if (newInput) {
            newInput.focus();
        }
    }
    
    /**
     * 删除提示词输入框
     * @param {HTMLElement} hintElement - 要删除的提示词元素
     */
    removeHintInput(hintElement) {
        if (!hintElement) return;
        
        // 确认删除
        const textarea = hintElement.querySelector('.hint-input');
        const hasContent = textarea && textarea.value.trim() !== '';
        
        if (hasContent) {
            if (!confirm('确定要删除这个提示词吗？已输入的内容将丢失。')) {
                return;
            }
        }
        
        // 获取难度和容器信息，用于重新编号
        const difficulty = textarea ? textarea.dataset.difficulty : null;
        const container = hintElement.parentElement;
        
        // 删除元素
        hintElement.remove();
        
        // 重新编号该难度的所有提示词
        if (difficulty && container) {
            this.renumberHints(container, difficulty);
        }
        
        // 更新计数器
        this.updateHintsCounter();
    }
    
    /**
     * 重新编号提示词
     * @param {HTMLElement} container - 提示词容器
     * @param {string} difficulty - 难度等级
     */
    renumberHints(container, difficulty) {
        const hintGroups = container.querySelectorAll('.hint-input-group');
        const difficultyLabel = this.getDifficultyLabel(difficulty);
        
        hintGroups.forEach((group, index) => {
            const order = index + 1;
            const label = group.querySelector('label');
            const textarea = group.querySelector('.hint-input');
            
            if (label) {
                label.textContent = `${difficultyLabel}提示词 ${order}:`;
            }
            
            if (textarea) {
                textarea.dataset.order = order;
            }
        });
    }
    
    /**
     * 更新提示词计数器显示
     */
    updateHintsCounter() {
        const counts = this.countCurrentHints();
        
        // 更新各难度计数显示
        const hardCountEl = document.getElementById('hard-count');
        const mediumCountEl = document.getElementById('medium-count');
        const easyCountEl = document.getElementById('easy-count');
        const totalCountEl = document.getElementById('total-count');
        
        if (hardCountEl) {
            hardCountEl.textContent = counts.hard;
            hardCountEl.className = `counter-value ${counts.hard >= 3 ? 'valid' : 'invalid'}`;
        }
        
        if (mediumCountEl) {
            mediumCountEl.textContent = counts.medium;
            mediumCountEl.className = `counter-value ${counts.medium >= 3 ? 'valid' : 'invalid'}`;
        }
        
        if (easyCountEl) {
            easyCountEl.textContent = counts.easy;
            easyCountEl.className = `counter-value ${counts.easy >= 4 ? 'valid' : 'invalid'}`;
        }
        
        if (totalCountEl) {
            totalCountEl.textContent = counts.total;
            totalCountEl.className = `counter-value ${counts.total >= 10 ? 'valid' : 'invalid'}`;
        }
    }
    
    /**
     * 统计当前提示词数量
     * @returns {Object} 各难度的提示词数量
     */
    countCurrentHints() {
        const counts = { hard: 0, medium: 0, easy: 0, total: 0 };
        
        const hintInputs = document.querySelectorAll('.hint-input');
        hintInputs.forEach(input => {
            if (input.value.trim() !== '') {
                const difficulty = input.dataset.difficulty;
                if (counts.hasOwnProperty(difficulty)) {
                    counts[difficulty]++;
                }
                counts.total++;
            }
        });
        
        return counts;
    }
    
    /**
     * 验证提示词要求是否满足
     * @returns {Object} 验证结果
     */
    validateHintRequirements() {
        const counts = this.countCurrentHints();
        const result = {
            isValid: true,
            errors: [],
            counts: counts
        };
        
        if (counts.total < 10) {
            result.isValid = false;
            result.errors.push('提示词总数至少需要10个');
        }
        
        if (counts.hard < 3) {
            result.isValid = false;
            result.errors.push('困难提示词至少需要3个');
        }
        
        if (counts.medium < 3) {
            result.isValid = false;
            result.errors.push('中等提示词至少需要3个');
        }
        
        if (counts.easy < 4) {
            result.isValid = false;
            result.errors.push('简单提示词至少需要4个');
        }
        
        return result;
    }
    
    /**
     * 初始化最低要求的提示词输入框
     */
    initializeMinimumHints() {
        // 清空现有提示词
        this.clearAllHints();
        
        // 添加最低要求数量的提示词
        // 3个困难提示词
        for (let i = 0; i < 3; i++) {
            this.addHintInput('hard');
        }
        
        // 3个中等提示词
        for (let i = 0; i < 3; i++) {
            this.addHintInput('medium');
        }
        
        // 4个简单提示词
        for (let i = 0; i < 4; i++) {
            this.addHintInput('easy');
        }
        
        this.showMessage('已添加最低要求的提示词输入框 (3+3+4)', 'success');
    }
    
    /**
     * 清空所有提示词输入框
     */
    clearAllHints() {
        if (!confirm('确定要清空所有提示词吗？已输入的内容将丢失。')) {
            return;
        }
        
        const containers = [
            document.getElementById('hard-hints-list'),
            document.getElementById('medium-hints-list'),
            document.getElementById('easy-hints-list')
        ];
        
        containers.forEach(container => {
            if (container) {
                container.innerHTML = '';
            }
        });
        
        this.updateHintsCounter();
        this.showMessage('已清空所有提示词', 'info');
    }
    
    /**
     * 获取难度等级的中文标签
     * @param {string} difficulty - 难度等级
     * @returns {string} 中文标签
     */
    getDifficultyLabel(difficulty) {
        switch (difficulty) {
            case 'hard': return '困难';
            case 'medium': return '中等';
            case 'easy': return '简单';
            default: return '未知';
        }
    }
    
    /**
     * 填充动态提示词
     * @param {Array} hints - 提示词数组
     */
    populateDynamicHints(hints) {
        console.log('开始填充动态提示词...');
        
        // 首先清空所有现有提示词
        const containers = [
            document.getElementById('hard-hints-list'),
            document.getElementById('medium-hints-list'),
            document.getElementById('easy-hints-list')
        ];
        
        containers.forEach(container => {
            if (container) {
                container.innerHTML = '';
            }
        });
        
        if (!hints || !Array.isArray(hints)) {
            console.log('没有提示词需要填充');
            this.updateHintsCounter();
            return;
        }
        
        console.log(`需要填充 ${hints.length} 个提示词`);
        
        // 按难度分组提示词
        const hintsByDifficulty = {
            hard: hints.filter(h => h.difficulty === 'hard'),
            medium: hints.filter(h => h.difficulty === 'medium'),
            easy: hints.filter(h => h.difficulty === 'easy')
        };
        
        console.log('提示词分组:', {
            hard: hintsByDifficulty.hard.length,
            medium: hintsByDifficulty.medium.length,
            easy: hintsByDifficulty.easy.length
        });
        
        // 为每个难度添加提示词输入框并填充内容
        Object.keys(hintsByDifficulty).forEach(difficulty => {
            const hintsForDifficulty = hintsByDifficulty[difficulty];
            
            hintsForDifficulty.forEach(hint => {
                // 添加输入框
                this.addHintInput(difficulty);
                
                // 找到刚添加的输入框并填充内容
                const container = document.getElementById(`${difficulty}-hints-list`);
                if (container) {
                    const hintGroups = container.querySelectorAll('.hint-input-group');
                    const lastGroup = hintGroups[hintGroups.length - 1];
                    if (lastGroup) {
                        const textarea = lastGroup.querySelector('.hint-input');
                        if (textarea) {
                            textarea.value = hint.content;
                            console.log(`填充${difficulty}提示词: "${hint.content}"`);
                        }
                    }
                }
            });
        });
        
        // 更新计数器
        this.updateHintsCounter();
        
        console.log('动态提示词填充完成');
    }
}

// 导出到全局作用域
window.AdminManager = AdminManager;

// 全局编辑皇帝函数
window.editEmperor = function(emperorId) {
    if (window.adminManagerInstance) {
        window.adminManagerInstance.editEmperor(emperorId);
    } else {
        console.error('AdminManager实例不存在');
        alert('管理器未初始化，请先打开管理界面');
    }
};

// 全局删除确认函数
window.showDeleteConfirmation = function(emperorId) {
    if (window.adminManagerInstance) {
        window.adminManagerInstance.showDeleteConfirmation(emperorId);
    } else {
        console.error('AdminManager实例不存在');
        alert('管理器未初始化，请先打开管理界面');
    }
};