/**
 * AI 服务管理器
 * 统一管理多个AI服务商（DeepSeek, Gemini等）
 * 支持自动切换和负载均衡
 */

class AIServiceManager {
    constructor() {
        this.services = [];
        this.currentServiceIndex = 0;
        this.failedServices = new Set();
        this.initialized = false;
    }

    /**
     * 初始化AI服务
     * @returns {boolean} 初始化是否成功
     */
    initialize() {
        if (typeof CONFIG === 'undefined') {
            console.error('配置文件未加载');
            return false;
        }

        // 按优先级添加AI服务
        // 1. Gemini 3.0 Flash Preview（首选）
        if (CONFIG.GEMINI_API_KEY && CONFIG.GEMINI_API_KEY !== 'your-gemini-api-key-here') {
            this.services.push({
                name: 'Gemini (gemini-3-flash-preview)',
                type: 'gemini',
                apiKey: CONFIG.GEMINI_API_KEY,
                endpoint: `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent`,
                model: 'gemini-3-flash-preview',
                priority: 1,
                description: 'Gemini 3.0 Flash Preview'
            });
        }

        // 2. Gemini 2.5 Flash（备选）
        if (CONFIG.GEMINI_API_KEY && CONFIG.GEMINI_API_KEY !== 'your-gemini-api-key-here') {
            this.services.push({
                name: 'Gemini (gemini-2.5-flash)',
                type: 'gemini',
                apiKey: CONFIG.GEMINI_API_KEY,
                endpoint: `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent`,
                model: 'gemini-2.5-flash',
                priority: 2,
                description: 'Gemini 2.5 Flash'
            });
        }

        // 3. DeepSeek（最后备用，中文优化）
        if (CONFIG.DEEPSEEK_API_KEY && CONFIG.DEEPSEEK_API_KEY !== 'your-deepseek-api-key-here') {
            this.services.push({
                name: 'DeepSeek',
                type: 'deepseek',
                apiKey: CONFIG.DEEPSEEK_API_KEY,
                endpoint: 'https://api.deepseek.com/v1/chat/completions',
                model: 'deepseek-chat',
                priority: 3,
                description: 'DeepSeek V3（中文优化）'
            });
        }

        if (this.services.length === 0) {
            console.error('没有可用的AI服务配置');
            return false;
        }

        this.initialized = true;
        console.log(`AI服务管理器初始化成功，共加载 ${this.services.length} 个服务`);
        console.log(`当前使用: ${this.services[this.currentServiceIndex].description}`);
        return true;
    }

    /**
     * 获取当前服务
     * @returns {Object} 当前服务配置
     */
    getCurrentService() {
        return this.services[this.currentServiceIndex];
    }

    /**
     * 切换到下一个可用服务
     * @returns {boolean} 是否成功切换
     */
    switchToNextService() {
        this.failedServices.add(this.currentServiceIndex);

        // 查找下一个未失败的服务
        for (let i = 0; i < this.services.length; i++) {
            const nextIndex = (this.currentServiceIndex + 1 + i) % this.services.length;
            if (!this.failedServices.has(nextIndex)) {
                this.currentServiceIndex = nextIndex;
                console.log(`切换到服务: ${this.services[this.currentServiceIndex].description}`);
                return true;
            }
        }

        console.error('所有AI服务都已失败');
        return false;
    }

    /**
     * 调用AI服务（统一接口）
     * @param {string} prompt - 提示词
     * @param {number} retryCount - 重试次数
     * @returns {Promise<string>} AI响应
     */
    async callAI(prompt, retryCount = 0) {
        if (!this.initialized) {
            this.initialize();
        }

        const service = this.getCurrentService();
        const maxRetries = this.services.length;

        try {
            console.log(`使用服务: ${service.description}`);

            let response;
            if (service.type === 'deepseek') {
                response = await this.callDeepSeek(service, prompt);
            } else if (service.type === 'gemini') {
                response = await this.callGemini(service, prompt);
            } else {
                throw new Error(`未知的服务类型: ${service.type}`);
            }

            return response;

        } catch (error) {
            console.error(`AI服务调用失败 (${service.name}):`, error);

            // 404错误（模型不存在）、网络错误、配额错误、余额不足，尝试切换服务
            if ((error.message.includes('404') ||
                 error.message.includes('NOT_FOUND') ||
                 error.message.includes('Failed to fetch') ||
                 error.message.includes('NetworkError') ||
                 error.message.includes('quota') ||
                 error.message.includes('配额') ||
                 error.message.includes('余额不足') ||
                 error.message.includes('Insufficient Balance') ||
                 error.message.includes('RESOURCE_EXHAUSTED') ||
                 error.name === 'TypeError') &&
                retryCount < maxRetries &&
                this.switchToNextService()) {
                
                console.log(`正在尝试下一个服务...`);
                return await this.callAI(prompt, retryCount + 1);
            }

            throw error;
        }
    }

    /**
     * 调用DeepSeek API
     * @param {Object} service - 服务配置
     * @param {string} prompt - 提示词
     * @returns {Promise<string>} AI响应
     */
    async callDeepSeek(service, prompt) {
        const response = await fetch(service.endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${service.apiKey}`
            },
            body: JSON.stringify({
                model: service.model,
                messages: [
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                temperature: 0.7,
                max_tokens: 8192  // DeepSeek最大支持8192
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`DeepSeek错误响应:`, errorText);
            
            // 402 = 余额不足, 429 = 配额用完，都需要切换服务
            if (response.status === 402 || 
                response.status === 429 || 
                errorText.includes('quota') || 
                errorText.includes('Insufficient Balance')) {
                throw new Error('DeepSeek配额已用完或余额不足');
            }
            
            throw new Error(`DeepSeek API请求失败: ${response.status}`);
        }

        const data = await response.json();
        
        if (data.choices && data.choices.length > 0) {
            return data.choices[0].message.content;
        }

        throw new Error('DeepSeek响应格式错误');
    }

    /**
     * 调用Gemini API
     * @param {Object} service - 服务配置
     * @param {string} prompt - 提示词
     * @returns {Promise<string>} AI响应
     */
    async callGemini(service, prompt) {
        const response = await fetch(`${service.endpoint}?key=${service.apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: prompt
                    }]
                }],
                generationConfig: {
                    temperature: 0.7,
                    maxOutputTokens: 16384
                }
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`Gemini错误响应:`, errorText);
            
            if (response.status === 429 || errorText.includes('quota') || errorText.includes('RESOURCE_EXHAUSTED')) {
                throw new Error('Gemini配额已用完');
            }
            
            if (response.status === 503 || errorText.includes('UNAVAILABLE')) {
                throw new Error('Gemini服务器过载');
            }
            
            throw new Error(`Gemini API请求失败: ${response.status}`);
        }

        const data = await response.json();
        
        if (data.candidates && data.candidates.length > 0) {
            const content = data.candidates[0].content;
            if (content && content.parts && content.parts.length > 0) {
                return content.parts[0].text;
            }
        }

        throw new Error('Gemini响应格式错误');
    }

    /**
     * 获取服务状态信息
     * @returns {Object} 服务状态
     */
    getStatus() {
        const current = this.getCurrentService();
        return {
            currentService: current.description,
            totalServices: this.services.length,
            failedServices: Array.from(this.failedServices).map(index => this.services[index].description),
            availableServices: this.services.length - this.failedServices.size
        };
    }

    /**
     * 重置失败记录
     */
    resetFailures() {
        this.failedServices.clear();
        this.currentServiceIndex = 0;
        console.log('已重置服务失败记录');
    }
}

// 导出到全局作用域
if (typeof window !== 'undefined') {
    window.AIServiceManager = AIServiceManager;
}
