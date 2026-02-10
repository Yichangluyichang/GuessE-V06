/**
 * Google Gemini API 封装模块（已升级为统一AI服务接口）
 * 支持多个AI服务商：DeepSeek, Gemini等
 * 自动切换和负载均衡
 */

class GeminiAPI {
    constructor() {
        this.aiManager = new AIServiceManager();
        this.initialized = false;
    }

    /**
     * 初始化 API
     * @returns {boolean} 初始化是否成功
     */
    initialize() {
        this.initialized = this.aiManager.initialize();
        if (this.initialized) {
            console.log('AI服务初始化成功');
            const status = this.aiManager.getStatus();
            console.log(`当前使用: ${status.currentService}`);
        }
        return this.initialized;
    }

    /**
     * 获取当前模型信息（兼容旧接口）
     * @returns {Object} 当前模型信息
     */
    getCurrentModel() {
        const service = this.aiManager.getCurrentService();
        return {
            name: service.model,
            description: service.description,
            endpoint: service.endpoint
        };
    }

    /**
     * 调用 AI API（统一接口）
     * @param {string} prompt - 提示词
     * @returns {Promise<string>} AI 响应
     */
    async callAPI(prompt) {
        if (!this.initialized) {
            this.initialize();
        }

        return await this.aiManager.callAI(prompt);
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
- 简单和中等难度：【禁止】提及该皇帝本人的名字、庙号、年号、谥号，但【可以】提及其他人的
- 困难难度：【禁止】提及任何人的具体名字、庙号、年号、谥号，也不能提及具体事件名称
- 可以描述特征，但不能直接说出该皇帝本人的名字
- 正确示例（简单/中等）："他是唐玄宗的儿子" ✅（唐玄宗是别人）
- 错误示例（简单/中等）："他的谥号是武帝" ❌（该皇帝自己的谥号）
- 正确示例（困难）："他的父皇在位时期国力达到巅峰" ✅（没有具体人名）
- 错误示例（困难）："他是唐玄宗的儿子" ❌（困难难度不能有任何庙号）

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
- 如果是简单或中等难度：【禁止】提及该皇帝本人的名字、庙号、年号、谥号，但【可以】提及其他人的
- 如果是困难难度：【禁止】提及任何人的具体名字、庙号、年号、谥号
- 可以描述特征，但不能直接说出该皇帝本人的名字
- 正确示例（简单/中等）："他是唐玄宗的儿子" ✅（唐玄宗是别人）
- 错误示例（简单/中等）："他的谥号是武帝" ❌（该皇帝自己的谥号）
- 正确示例（困难）："他的父皇在位时期国力达到巅峰" ✅（没有具体人名）
- 错误示例（困难）："他是唐玄宗的儿子" ❌（困难难度不能有任何庙号）

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
     * 为已有皇帝批量生成多个提示词
     * @param {string} emperorName - 皇帝名称
     * @param {Array} existingHints - 现有提示词
     * @param {string} difficulty - 难度等级
     * @param {number} count - 生成数量（默认5个）
     * @returns {Promise<Array<string>>} 生成的提示词数组
     */
    async generateMultipleHints(emperorName, existingHints, difficulty, count = 5) {
        const hintsText = existingHints.map((h, i) => `${i + 1}. ${h.content}`).join('\n');
        
        const difficultyDesc = {
            'easy': '简单难度：广为人知的事件，该皇帝最著名的特征',
            'medium': '中等难度：较生僻但准确的知识点，所指皇帝极少或唯一',
            'hard': '困难难度：具有迷惑性（多个皇帝符合）、宽泛描述、或关于身边的人'
        };

        const prompt = `你是一个中国历史专家。请为皇帝"${emperorName}"生成${count}条新的【${difficulty}】难度提示词。

现有提示词：
${hintsText}

要求：
1. 生成${count}条不同的提示词
2. 不能与现有提示词重复
3. 不能描述相同的历史事件
4. 每条提示词都要符合${difficultyDesc[difficulty]}的标准

⚠️ 重要规则：
- 如果是简单或中等难度：【禁止】提及该皇帝本人的名字、庙号、年号、谥号，但【可以】提及其他人的
- 如果是困难难度：【禁止】提及任何人的具体名字、庙号、年号、谥号
- 可以描述特征，但不能直接说出该皇帝本人的名字

请严格按照以下JSON格式返回，不要包含任何其他文字：
[
  "提示词1",
  "提示词2",
  "提示词3",
  "提示词4",
  "提示词5"
]

只返回JSON数组，不要包含其他文字。`;

        try {
            const response = await this.callAPI(prompt);
            
            console.log('AI 批量生成提示词原始响应:', response);
            
            // 提取 JSON - 移除markdown代码块
            let jsonText = response.replace(/```json\s*/g, '').replace(/```\s*/g, '');
            
            // 提取 JSON 数组
            const jsonMatch = jsonText.match(/\[[\s\S]*\]/);
            if (!jsonMatch) {
                console.error('无法在响应中找到 JSON 数组');
                throw new Error('无法解析AI响应：未找到JSON数组');
            }

            console.log('提取的 JSON 文本:', jsonMatch[0]);
            
            const hints = JSON.parse(jsonMatch[0]);
            
            if (!Array.isArray(hints) || hints.length === 0) {
                throw new Error('生成的提示词格式错误');
            }
            
            return hints.map(h => h.trim());
        } catch (error) {
            console.error('批量生成提示词失败:', error);
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

⚠️ 重要规则检查（只检查提示词中实际出现的内容）：

**简单和中等难度提示词规则：**
- 不能出现【该皇帝本人】的名字、庙号、年号、谥号
- ✅ 可以出现【其他人】的名字、庙号、年号、谥号
- 例如：评估唐肃宗的提示词时，"唐玄宗"（他父亲）是允许的 ✅

**困难难度提示词规则：**
- 不能出现【任何人】的具体名字、庙号、年号、谥号
- 不能出现具体的事件名称

错误示例：
- 简单/中等难度："他的谥号是武帝" ❌（说出了该皇帝自己的谥号）
- 简单/中等难度："他使用建元年号" ❌（说出了该皇帝自己的年号）
- 困难难度："他的皇后是独孤伽罗" ❌（困难难度不能有任何人名）
- 困难难度："他是唐玄宗的儿子" ❌（困难难度不能有任何庙号）

正确示例：
- 简单/中等难度："他是唐玄宗的儿子" ✅（唐玄宗是别人，不是该皇帝）
- 简单/中等难度："他在安史之乱中登基" ✅（安史之乱是事件名，简单/中等难度允许）
- 困难难度："他的皇后出身名门" ✅（没有具体人名）
- 困难难度："他在一场大规模叛乱中登基" ✅（没有具体事件名）

⚠️ 重要格式要求：
1. 必须返回完整的JSON数组，包含所有${hints.length}个提示词的评估
2. JSON中的字符串不能包含换行符，请使用空格代替
3. corrected字段必须是完整的句子，不能被截断
4. 如果内容太长，可以简化suggestions和issues，但必须保证JSON完整

返回格式：
[
  {
    "index": 提示词序号（从0开始）,
    "status": "pass/warning/fail",
    "issues": ["问题描述1"],
    "suggestions": ["建议1"],
    "corrected": "修正后的提示词（如果需要）"
  }
]

只返回完整的JSON数组，不要包含其他文字。确保JSON格式正确且完整。`;

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
                let fixedJson = jsonMatch[0];
                
                // 1. 移除JSON字符串中的所有换行符（包括\n和实际换行）
                fixedJson = fixedJson.replace(/\n/g, ' ');
                fixedJson = fixedJson.replace(/\r/g, '');
                
                // 2. 处理被截断的JSON - 找到最后一个完整的对象
                if (!fixedJson.trim().endsWith(']')) {
                    console.log('检测到JSON被截断，尝试修复...');
                    
                    // 找到最后一个完整的 "corrected": "..." 字段
                    // 策略：找到最后一个 "}," 或最后一个 "}"（如果是数组最后一个元素）
                    
                    // 先尝试找最后一个 "},"（表示还有下一个对象）
                    let lastCompleteIndex = fixedJson.lastIndexOf('},');
                    
                    if (lastCompleteIndex > 0) {
                        // 截取到最后一个完整对象，并添加结尾
                        fixedJson = fixedJson.substring(0, lastCompleteIndex + 1) + ']';
                        console.log('已截取到最后一个完整对象（使用 }, 分隔符）');
                    } else {
                        // 如果没有 },，说明可能是数组的最后一个元素被截断
                        // 找到倒数第二个 }（倒数第一个可能是不完整的）
                        const allBraces = [];
                        for (let i = 0; i < fixedJson.length; i++) {
                            if (fixedJson[i] === '}') {
                                allBraces.push(i);
                            }
                        }
                        
                        if (allBraces.length >= 2) {
                            // 使用倒数第二个 }
                            const secondLastBrace = allBraces[allBraces.length - 2];
                            fixedJson = fixedJson.substring(0, secondLastBrace + 1) + ']';
                            console.log('已截取到倒数第二个完整对象');
                        } else if (allBraces.length === 1) {
                            // 只有一个 }，使用它
                            fixedJson = fixedJson.substring(0, allBraces[0] + 1) + ']';
                            console.log('已截取到唯一的完整对象');
                        } else {
                            console.error('无法找到任何完整的对象');
                            throw new Error('JSON格式严重损坏，无法修复');
                        }
                    }
                }
                
                // 3. 移除末尾多余的逗号
                fixedJson = fixedJson.replace(/,\s*]/, ']');
                
                console.log('尝试修复后的JSON:', fixedJson);
                
                try {
                    evaluations = JSON.parse(fixedJson);
                    console.log(`✅ JSON修复成功！成功解析 ${evaluations.length} 个评估结果（原始有 ${hints.length} 个提示词）`);
                    
                    // 如果修复后的结果少于原始提示词数量，给出警告
                    if (evaluations.length < hints.length) {
                        console.warn(`⚠️ 注意：由于AI响应被截断，只成功评估了 ${evaluations.length}/${hints.length} 个提示词`);
                    }
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
        if (!this.initialized) {
            return {
                name: '未初始化',
                quality: '',
                priority: 0,
                failedModels: []
            };
        }
        
        const status = this.aiManager.getStatus();
        const currentService = this.aiManager.getCurrentService();
        
        return {
            name: status.currentService,
            quality: currentService.description,
            priority: currentService.priority,
            failedModels: status.failedServices
        };
    }

    /**
     * 获取所有模型列表（用于UI显示）
     * @returns {Array} 模型列表
     */
    getAllModels() {
        if (!this.initialized) {
            return [];
        }
        
        return this.aiManager.services.map((service, index) => ({
            name: service.name,
            description: service.description,
            type: service.type,
            priority: service.priority,
            isCurrent: index === this.aiManager.currentServiceIndex,
            isFailed: this.aiManager.failedServices.has(index)
        }));
    }
}

// 导出到全局作用域
if (typeof window !== 'undefined') {
    window.GeminiAPI = GeminiAPI;
}
