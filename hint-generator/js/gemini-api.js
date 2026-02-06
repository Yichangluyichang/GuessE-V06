/**
 * Google Gemini API 封装模块
 * 处理与 Gemini AI 的所有交互
 */

class GeminiAPI {
    constructor() {
        this.apiKey = null;
        this.apiEndpoint = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';
        this.initialized = false;
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
        return true;
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
     * 调用 Gemini API
     * @param {string} prompt - 提示词
     * @returns {Promise<string>} AI 响应
     */
    async callAPI(prompt) {
        if (!this.initialized) {
            this.initialize();
        }

        try {
            const response = await fetch(`${this.apiEndpoint}?key=${this.apiKey}`, {
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
                        maxOutputTokens: 8192,
                    }
                })
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('API 错误响应:', errorText);
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
            console.error('Gemini API 调用失败:', error);
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
   - templeName: 庙号
   - posthumousName: 谥号
   - reignNames: 年号数组
   - dynasty: 朝代
   - reignStart: 在位开始年份（公元前用负数）
   - reignEnd: 在位结束年份
   - difficulty: "${difficulty}"

2. 15个提示词（hints数组）：
   - 4个简单难度（difficulty: "easy"）：广为人知的事件，提到这个皇帝第一个想到的特征
   - 5个中等难度（difficulty: "medium"）：较生僻但准确的知识点，所指皇帝极少或唯一
   - 6个困难难度（difficulty: "hard"）：具有迷惑性（多个皇帝符合）、宽泛描述、或关于身边的人

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
  "templeName": "庙号",
  "posthumousName": "谥号",
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

请对每条提示词进行评估，返回 JSON 数组格式：
[
  {
    "index": 提示词序号（从0开始）,
    "status": "pass/warning/fail",
    "issues": ["问题描述1", "问题描述2"],
    "suggestions": ["建议1", "建议2"],
    "corrected": "修正后的提示词（如果需要）"
  },
  ...
]

只返回 JSON 数组，不要包含其他文字。`;

        try {
            const response = await this.callAPI(prompt);
            
            // 提取 JSON
            const jsonMatch = response.match(/\[[\s\S]*\]/);
            if (!jsonMatch) {
                throw new Error('无法解析评估结果');
            }

            const evaluations = JSON.parse(jsonMatch[0]);
            return evaluations;
        } catch (error) {
            console.error('评估提示词失败:', error);
            throw error;
        }
    }
}

// 导出到全局作用域
if (typeof window !== 'undefined') {
    window.GeminiAPI = GeminiAPI;
}
