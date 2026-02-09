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

⚠️ 重要规则检查（只检查提示词中实际出现的内容）：
- 困难难度提示词中是否【实际包含】具体人名？如果有，标记为fail
- 所有提示词中是否【实际写出】了年号、庙号、谥号的具体名称？如果有，标记为fail
- 注意：只检查提示词文本中实际存在的内容，不要根据历史知识推测可能的人名

错误示例：
- "他的皇后是独孤伽罗" ❌（直接提及人名"独孤伽罗"）
- "他的谥号是武帝" ❌（直接说出谥号"武帝"）
- "他使用建元年号" ❌（直接说出年号"建元"）

正确示例：
- "他的皇后出身名门" ✅（没有具体人名）
- "他的谥号体现了文治武功" ✅（没有说出具体谥号）
- "他开创了使用年号的先例" ✅（没有说出具体年号）

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
                let fixedJson = jsonMatch[0];
                
                // 1. 移除JSON字符串中的换行符
                fixedJson = fixedJson.replace(/"([^"]*)\n([^"]*)"/g, (match, p1, p2) => {
                    return `"${p1} ${p2}"`;
                });
                
                // 2. 处理被截断的JSON - 找到最后一个完整的对象
                if (!fixedJson.trim().endsWith(']')) {
                    console.log('检测到JSON被截断，尝试修复...');
                    
                    // 找到最后一个完整的对象（以 }, 或 } 结尾）
                    const lastCompleteObjectIndex = fixedJson.lastIndexOf('},');
                    
                    if (lastCompleteObjectIndex > 0) {
                        // 截取到最后一个完整对象，并添加结尾
                        fixedJson = fixedJson.substring(0, lastCompleteObjectIndex + 1) + ']';
                        console.log('已截取到最后一个完整对象');
                    } else {
                        // 如果没有找到 },，尝试找最后一个 }
                        const lastBraceIndex = fixedJson.lastIndexOf('}');
                        if (lastBraceIndex > 0) {
                            fixedJson = fixedJson.substring(0, lastBraceIndex + 1) + ']';
                            console.log('已截取到最后一个闭合括号');
                        } else {
                            // 实在找不到，尝试添加缺失的结尾
                            if (!fixedJson.endsWith('}')) {
                                fixedJson += '"}]}';
                            } else if (!fixedJson.endsWith(']')) {
                                fixedJson += ']';
                            }
                        }
                    }
                }
                
                // 3. 移除末尾多余的逗号
                fixedJson = fixedJson.replace(/,\s*]/, ']');
                
                console.log('尝试修复后的JSON:', fixedJson);
                
                try {
                    evaluations = JSON.parse(fixedJson);
                    console.log(`JSON修复成功！成功解析 ${evaluations.length} 个评估结果`);
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
