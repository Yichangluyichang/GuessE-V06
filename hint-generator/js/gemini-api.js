/**
 * Google Gemini API 封装模块
 * 处理与 Gemini AI 的所有交互
 * 支持多模型自动切换
 */

class GeminiAPI {
    constructor() {
        this.apiKey = null;
        this.initialized = false;
        
        // 模型列表（按质量优先级排序：最好的先用）
        // 基于实际测试的可用模型
        this.models = [
            {
                name: 'gemini-3-pro-preview',
                endpoint: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-3-pro-preview:generateContent',
                description: 'Gemini 3 Pro Preview',
                quality: '最高质量（预览版）',
                priority: 1
            },
            {
                name: 'gemini-2.5-pro',
                endpoint: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent',
                description: 'Gemini 2.5 Pro',
                quality: '最高质量（稳定版）',
                priority: 2
            },
            {
                name: 'gemini-pro-latest',
                endpoint: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro-latest:generateContent',
                description: 'Gemini Pro Latest',
                quality: '最新Pro版本',
                priority: 3
            },
            {
                name: 'gemini-3-flash-preview',
                endpoint: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent',
                description: 'Gemini 3 Flash Preview',
                quality: '高质量快速（预览版）',
                priority: 4
            },
            {
                name: 'gemini-2.5-flash',
                endpoint: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent',
                description: 'Gemini 2.5 Flash',
                quality: '高质量快速（稳定版）',
                priority: 5
            },
            {
                name: 'gemini-flash-latest',
                endpoint: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent',
                description: 'Gemini Flash Latest',
                quality: '最新Flash版本',
                priority: 6
            },
            {
                name: 'gemini-2.0-flash',
                endpoint: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent',
                description: 'Gemini 2.0 Flash',
                quality: '标准质量',
                priority: 7
            },
            {
                name: 'gemini-2.5-flash-lite',
                endpoint: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent',
                description: 'Gemini 2.5 Flash Lite',
                quality: '轻量快速',
                priority: 8
            },
            {
                name: 'gemini-flash-lite-latest',
                endpoint: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-lite-latest:generateContent',
                description: 'Gemini Flash Lite Latest',
                quality: '最新Lite版本',
                priority: 9
            },
            {
                name: 'gemini-2.0-flash-lite',
                endpoint: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:generateContent',
                description: 'Gemini 2.0 Flash Lite',
                quality: '轻量级',
                priority: 10
            }
        ];
        
        this.currentModelIndex = 0;
        this.failedModels = new Set(); // 记录失败的模型
    }

    /**
     * 初始化 API
     * @returns {boolean} 初始化是否成功
     */
    initialize() {
        if (typeof CONFIG === 'undefined' || !CONFIG.GEMINI_API_KEY) {
            console.error('Gemini API Key 未找到');
            return false;
        }

        this.apiKey = CONFIG.GEMINI_API_KEY;
        this.initialized = true;
        console.log('Gemini API 初始化成功');
        console.log(`当前使用模型: ${this.models[this.currentModelIndex].description}`);
        return true;
    }

    /**
     * 获取当前模型信息
     * @returns {Object} 当前模型信息
     */
    getCurrentModel() {
        return this.models[this.currentModelIndex];
    }

    /**
     * 切换到下一个可用模型
     * @returns {boolean} 是否成功切换
     */
    switchToNextModel() {
        // 标记当前模型为失败
        this.failedModels.add(this.currentModelIndex);
        
        // 查找下一个未失败的模型
        for (let i = 0; i < this.models.length; i++) {
            const nextIndex = (this.currentModelIndex + 1 + i) % this.models.length;
            if (!this.failedModels.has(nextIndex)) {
                this.currentModelIndex = nextIndex;
                console.log(`切换到模型: ${this.models[this.currentModelIndex].description}`);
                return true;
            }
        }
        
        // 所有模型都失败了
        console.error('所有模型都已失败');
        return false;
    }

    /**
     * 重置失败记录（每天重置一次）
     */
    resetFailedModels() {
        this.failedModels.clear();
        this.currentModelIndex = 0;
        console.log('已重置模型失败记录');
    }

    /**
     * 列出可用的模型
     * @returns {Promise<Array>} 可用模型列表
     */
    async listModels() {
        if (!this.initialized) {
            this.initialize();
        }

        try {
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${this.apiKey}`);
            
            if (!response.ok) {
                const errorText = await response.text();
                console.error('列出模型失败:', errorText);
                throw new Error(`API 请求失败: ${response.status}`);
            }

            const data = await response.json();
            console.log('可用模型列表:', data);
            return data.models || [];
        } catch (error) {
            console.error('列出模型失败:', error);
            throw error;
        }
    }

    /**
     * 调用 Gemini API（支持自动切换模型）
     * @param {string} prompt - 提示词
     * @param {number} retryCount - 重试次数
     * @returns {Promise<string>} AI 响应
     */
    async callAPI(prompt, retryCount = 0) {
        if (!this.initialized) {
            this.initialize();
        }

        const currentModel = this.getCurrentModel();
        const maxRetries = this.models.length; // 最多尝试所有模型

        try {
            console.log(`使用模型: ${currentModel.description}`);
            
            const response = await fetch(`${currentModel.endpoint}?key=${this.apiKey}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: prompt
                        }]
                    }],
                    generationConfig: {
                        temperature: 0.7,
                        maxOutputTokens: 16384,
                    }
                })
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error(`模型 ${currentModel.name} 错误响应:`, errorText);
                
                // 检查错误类型
                // 503 = 服务器过载，不应该切换模型，应该让用户稍后重试
                if (response.status === 503 || errorText.includes('UNAVAILABLE') || errorText.includes('overloaded')) {
                    throw new Error('AI 服务器当前过载，请稍后再试（建议等待1-2分钟）');
                }
                
                // 429 = 配额用完，可以切换到下一个模型
                if (response.status === 429 || errorText.includes('quota') || errorText.includes('RESOURCE_EXHAUSTED')) {
                    console.warn(`模型 ${currentModel.name} 配额已用完`);
                    
                    // 尝试切换到下一个模型
                    if (retryCount < maxRetries && this.switchToNextModel()) {
                        console.log(`正在尝试下一个模型...`);
                        
                        // 通知UI更新模型状态
                        if (window.app && window.app.updateModelStatus) {
                            window.app.updateModelStatus();
                        }
                        
                        return await this.callAPI(prompt, retryCount + 1);
                    } else {
                        throw new Error('所有模型的配额都已用完，请明天再试');
                    }
                }
                
                // 其他错误直接抛出
                throw new Error(`API 请求失败: ${response.status} - ${errorText}`);
            }

            const data = await response.json();
            
            // 提取响应文本
            if (data.candidates && data.candidates.length > 0) {
                const content = data.candidates[0].content;
                if (content && content.parts && content.parts.length > 0) {
                    return content.parts[0].text;
                }
            }

            throw new Error('API 响应格式错误');
        } catch (error) {
            console.error(`Gemini API 调用失败 (${currentModel.name}):`, error);
            
            // 如果错误信息包含"服务器过载"或"UNAVAILABLE"，直接抛出，不重试
            if (error.message.includes('过载') || error.message.includes('UNAVAILABLE') || error.message.includes('overloaded')) {
                throw error;
            }
            
            // 如果是配额错误，尝试切换模型
            if (error.message.includes('配额') && retryCount < maxRetries && this.switchToNextModel()) {
                console.log(`正在尝试下一个模型...`);
                return await this.callAPI(prompt, retryCount + 1);
            }
            
            throw error;
        }
    }

    /**
     * 生成新皇帝数据
     * @param {string} emperorName - 皇帝名称
     * @param {string} difficulty - 难度等级
     * @returns {Promise<Object>} 生成的皇帝数据
     */
    async generateEmperor(emperorName, difficulty) {
        const prompt = `你是一个中国历史专家。请为皇帝"${emperorName}"生成完整的游戏数据。

要求：
1. 基本信息：
   - id: 格式为"朝代_名字"，例如"汉朝_刘彻"
   - name: 皇帝名字
   - templeName: 庙号（必须包含朝代名，例如"唐太宗"而不是"太宗"。如果该皇帝没有庙号，填写"无庙号"）
   - posthumousName: 谥号（完整谥号，例如"文皇帝"。如果该皇帝没有谥号，填写"无谥号"）
   - reignNames: 年号数组（如果没有年号，使用空数组[]）
   - dynasty: 朝代
   - reignStart: 在位开始年份（公元前用负数）
   - reignEnd: 在位结束年份
   - difficulty: "${difficulty}"

2. 15个提示词（hints数组）：
   - 4个简单难度（difficulty: "easy"）：广为人知的事件，提到这个皇帝第一个想到的特征
   - 5个中等难度（difficulty: "medium"）：较生僻但准确的知识点，所指皇帝极少或唯一
   - 6个困难难度（difficulty: "hard"）：具有迷惑性（多个皇帝符合）、宽泛描述、或关于身边的人

⚠️ 重要规则：
- 困难难度提示词中【禁止】提及任何具体人名（包括皇后、大臣、将军等）
- 所有提示词中【禁止】直接说出年号、庙号、谥号的具体名称
- 可以描述这些信息的特征，但不能直接说出名字
- 错误示例："他的皇后是独孤伽罗" → 正确示例："他的皇后出身名门，辅佐他建立统一王朝"
- 错误示例："他的谥号是武帝" → 正确示例："他的谥号体现了他的文治武功"
- 错误示例："他使用建元年号" → 正确示例："他开创了使用年号的先例"

每个提示词格式：
{
  "content": "提示词内容",
  "difficulty": "easy/medium/hard",
  "order": 顺序号（从0开始）
}

请严格按照以下 JSON 格式返回，不要包含任何其他文字：
{
  "id": "朝代_名字",
  "name": "名字",
  "templeName": "完整庙号（含朝代名，如'唐太宗'）或'无庙号'",
  "posthumousName": "完整谥号（如'文皇帝'）或'无谥号'",
  "reignNames": ["年号1", "年号2"],
  "dynasty": "朝代",
  "reignStart": 年份,
  "reignEnd": 年份,
  "difficulty": "${difficulty}",
  "hints": [
    {"content": "提示词", "difficulty": "hard", "order": 0},
    ...
  ]
}`;

        try {
            const response = await this.callAPI(prompt);
            
            console.log('AI 原始响应:', response);
            
            // 尝试提取 JSON - 支持 markdown 代码块格式
            let jsonText = response;
            
            // 移除 markdown 代码块标记
            jsonText = jsonText.replace(/```json\s*/g, '').replace(/```\s*/g, '');
            
            // 提取 JSON 对象
            const jsonMatch = jsonText.match(/\{[\s\S]*\}/);
            if (!jsonMatch) {
                console.error('无法在响应中找到 JSON 对象');
                throw new Error('无法解析 AI 响应');
            }

            console.log('提取的 JSON 文本:', jsonMatch[0]);
            
            const emperorData = JSON.parse(jsonMatch[0]);
            
            console.log('解析后的数据:', emperorData);
            
            // 验证数据完整性
            if (!emperorData.id || !emperorData.name || !emperorData.hints || emperorData.hints.length !== 15) {
                console.error('数据不完整:', {
                    hasId: !!emperorData.id,
                    hasName: !!emperorData.name,
                    hasHints: !!emperorData.hints,
                    hintsLength: emperorData.hints ? emperorData.hints.length : 0
                });
                throw new Error('生成的数据不完整');
            }

            return emperorData;
        } catch (error) {
            console.error('生成皇帝数据失败:', error);
            throw error;
        }
    }

    /**
     * 为已有皇帝生成新提示词
     * @param {string} emperorName - 皇帝名称
     * @param {Array} existingHints - 现有提示词
     * @param {string} difficulty - 难度等级
     * @returns {Promise<string>} 生成的提示词
     */
    async generateHint(emperorName, existingHints, difficulty) {
        const hintsText = existingHints.map((h, i) => `${i + 1}. ${h.content}`).join('\n');
        
        const difficultyDesc = {
            'easy': '简单难度：广为人知的事件，该皇帝最著名的特征',
            'medium': '中等难度：较生僻但准确的知识点，所指皇帝极少或唯一',
            'hard': '困难难度：具有迷惑性（多个皇帝符合）、宽泛描述、或关于身边的人'
        };

        const prompt = `你是一个中国历史专家。请为皇帝"${emperorName}"生成一条新的【${difficulty}】难度提示词。

现有提示词：
${hintsText}

要求：
1. 不能与现有提示词重复
2. 不能描述相同的历史事件
3. 符合${difficultyDesc[difficulty]}的标准

⚠️ 重要规则：
- 如果是困难难度，【禁止】提及任何具体人名（包括皇后、大臣、将军等）
- 【禁止】直接说出年号、庙号、谥号的具体名称
- 可以描述这些信息的特征，但不能直接说出名字
- 错误示例："他的皇后是独孤伽罗" → 正确示例："他的皇后出身名门，辅佐他建立统一王朝"
- 错误示例："他的谥号是武帝" → 正确示例："他的谥号体现了他的文治武功"
- 错误示例："他使用建元年号" → 正确示例："他开创了使用年号的先例"

请只返回一条提示词内容，不要包含任何其他文字或解释。`;

        try {
            const response = await this.callAPI(prompt);
            return response.trim();
        } catch (error) {
            console.error('生成提示词失败:', error);
            throw error;
        }
    }

    /**
     * 评估提示词质量
     * @param {string} emperorName - 皇帝名称
     * @param {Array} hints - 提示词数组
     * @returns {Promise<Array>} 评估结果
     */
    async evaluateHints(emperorName, hints) {
        const hintsText = hints.map((h, i) => 
            `${i + 1}. [${h.difficulty}] ${h.content}`
        ).join('\n');

        const prompt = `你是一个中国历史专家。请评估以下皇帝"${emperorName}"的提示词质量。

提示词列表：
${hintsText}

评估标准：
1. 困难难度：是否具有迷惑性、是否有多个皇帝符合、是否过于具体
2. 中等难度：是否指向少数皇帝、知识点是否适中、是否过于宽泛或简单
3. 简单难度：是否是该皇帝最著名的事件、是否广为人知、是否过于生僻
4. 历史准确性：事件是否真实、时间是否正确、人物关系是否准确

⚠️ 重要规则检查：
- 困难难度提示词中是否提及了具体人名？如果有，标记为fail
- 所有提示词中是否直接说出了年号、庙号、谥号的具体名称？如果有，标记为fail
- 错误示例："他的皇后是独孤伽罗"（提及具体人名）
- 错误示例："他的谥号是武帝"（直接说出谥号）
- 错误示例："他使用建元年号"（直接说出年号）

请对每条提示词进行评估，返回 JSON 数组格式。
注意：JSON中的字符串不能包含换行符，请使用空格代替。

[
  {
    "index": 提示词序号（从0开始）,
    "status": "pass/warning/fail",
    "issues": ["问题描述1", "问题描述2"],
    "suggestions": ["建议1", "建议2"],
    "corrected": "修正后的提示词（如果需要）"
  }
]

只返回 JSON 数组，不要包含其他文字。`;

        try {
            const response = await this.callAPI(prompt);
            
            console.log('AI 评估原始响应:', response);
            
            // 提取 JSON - 移除markdown代码块
            let jsonText = response.replace(/```json\s*/g, '').replace(/```\s*/g, '');
            
            // 提取 JSON 数组
            const jsonMatch = jsonText.match(/\[[\s\S]*\]/);
            if (!jsonMatch) {
                console.error('无法在响应中找到 JSON 数组');
                throw new Error('无法解析评估结果：未找到JSON数组');
            }

            console.log('提取的 JSON 文本:', jsonMatch[0]);
            
            // 尝试解析JSON
            let evaluations;
            try {
                evaluations = JSON.parse(jsonMatch[0]);
            } catch (parseError) {
                console.error('JSON 解析失败:', parseError);
                console.error('问题JSON:', jsonMatch[0]);
                
                // 尝试修复常见的JSON问题
                let fixedJson = jsonMatch[0]
                    // 移除JSON字符串中的换行符
                    .replace(/"corrected":\s*"([^"]*)\n([^"]*)"/g, (match, p1, p2) => {
                        return `"corrected": "${p1} ${p2}"`;
                    })
                    // 移除其他字段中的换行符
                    .replace(/:\s*"([^"]*)\n([^"]*)"/g, (match, p1, p2) => {
                        return `: "${p1} ${p2}"`;
                    })
                    // 修复未闭合的对象（添加缺失的结尾）
                    .replace(/,\s*$/, '') // 移除末尾的逗号
                    .trim();
                
                // 检查是否缺少结尾的 }]
                if (!fixedJson.endsWith(']')) {
                    // 找到最后一个完整的对象
                    const lastCompleteObject = fixedJson.lastIndexOf('},');
                    if (lastCompleteObject > 0) {
                        // 截取到最后一个完整对象
                        fixedJson = fixedJson.substring(0, lastCompleteObject + 1) + ']';
                    } else {
                        // 尝试添加缺失的结尾
                        if (!fixedJson.endsWith('}')) {
                            fixedJson += '}';
                        }
                        if (!fixedJson.endsWith(']')) {
                            fixedJson += ']';
                        }
                    }
                }
                
                console.log('尝试修复后的JSON:', fixedJson);
                
                try {
                    evaluations = JSON.parse(fixedJson);
                    console.log('JSON修复成功！');
                } catch (secondError) {
                    console.error('修复后仍然无法解析:', secondError);
                    // 如果还是失败，返回一个友好的错误提示
                    throw new Error('AI返回的评估结果格式有误，请重试。如果问题持续，可能是提示词内容过长或包含特殊字符。');
                }
            }
            
            return evaluations;
        } catch (error) {
            console.error('评估提示词失败:', error);
            throw error;
        }
    }

    /**
     * 获取当前模型状态信息
     * @returns {Object} 模型状态信息
     */
    getModelStatus() {
        const currentModel = this.getCurrentModel();
        return {
            name: currentModel.description,
            quality: currentModel.quality,
            priority: currentModel.priority,
            failedModels: Array.from(this.failedModels).map(index => this.models[index].description)
        };
    }

    /**
     * 获取所有模型列表（用于UI显示）
     * @returns {Array} 模型列表
     */
    getAllModels() {
        return this.models.map((model, index) => ({
            ...model,
            isCurrent: index === this.currentModelIndex,
            isFailed: this.failedModels.has(index)
        }));
    }
}

// 导出到全局作用域
if (typeof window !== 'undefined') {
    window.GeminiAPI = GeminiAPI;
}
