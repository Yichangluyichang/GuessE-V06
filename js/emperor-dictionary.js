/**
 * 皇帝词库数据
 * 包含所有主要朝代的皇帝名字和朝代信息
 * 用于皇帝选择器功能
 */

// 定义皇帝词库数据结构
const EmperorDictionary = {
    /**
     * 获取所有皇帝词库条目
     * @returns {Array<{name: string, dynasty: string}>}
     */
    getAllEmperors: function() {
        return [
            // 秦朝
            { name: '嬴政', dynasty: '秦朝' },
            { name: '胡亥', dynasty: '秦朝' },
            // 西汉
            { name: '刘邦', dynasty: '西汉' },
            { name: '刘盈', dynasty: '西汉' },
            { name: '刘恭', dynasty: '西汉' },
            { name: '刘弘', dynasty: '西汉' },
            { name: '刘恒', dynasty: '西汉' },
            { name: '刘启', dynasty: '西汉' },
            { name: '刘彻', dynasty: '西汉' },
            { name: '刘弗陵', dynasty: '西汉' },
            { name: '刘贺', dynasty: '西汉' },
            { name: '刘询', dynasty: '西汉' },
            { name: '刘奭', dynasty: '西汉' },
            { name: '刘骜', dynasty: '西汉' },
            { name: '刘欣', dynasty: '西汉' },
            { name: '刘衎', dynasty: '西汉' },
            { name: '刘婴', dynasty: '西汉' },
            { name: '刘秀', dynasty: '东汉' },
            { name: '刘庄', dynasty: '东汉' },
            { name: '刘炟', dynasty: '东汉' },
            { name: '刘肇', dynasty: '东汉' },
            { name: '刘隆', dynasty: '东汉' },
            { name: '刘祜', dynasty: '东汉' },
            { name: '刘懿', dynasty: '东汉' },
            { name: '刘保', dynasty: '东汉' },
            { name: '刘炳', dynasty: '东汉' },
            { name: '刘缵', dynasty: '东汉' },
            { name: '刘志', dynasty: '东汉' },
            { name: '刘宏', dynasty: '东汉' },
            { name: '刘辩', dynasty: '东汉' },
            { name: '刘协', dynasty: '东汉' },
            
            // 三国
            { name: '曹操', dynasty: '三国' },
            { name: '曹丕', dynasty: '三国' },
            { name: '曹叡', dynasty: '三国' },
            { name: '曹芳', dynasty: '三国' },
            { name: '曹髦', dynasty: '三国' },
            { name: '曹奂', dynasty: '三国' },
            { name: '刘备', dynasty: '三国' },
            { name: '刘禅', dynasty: '三国' },
            { name: '孙权', dynasty: '三国' },
            { name: '孙亮', dynasty: '三国' },
            { name: '孙休', dynasty: '三国' },
            { name: '孙皓', dynasty: '三国' },

            // 西晋
            { name: '司马炎', dynasty: '西晋' },
            { name: '司马衷', dynasty: '西晋' },
            { name: '司马炽', dynasty: '西晋' },
            { name: '司马邺', dynasty: '西晋' },

            // 东晋
            { name: '司马睿', dynasty: '东晋' },
            { name: '司马绍', dynasty: '东晋' },
            { name: '司马衍', dynasty: '东晋' },
            { name: '司马岳', dynasty: '东晋' },
            { name: '司马聃', dynasty: '东晋' },
            { name: '司马丕', dynasty: '东晋' },
            { name: '司马奕', dynasty: '东晋' },
            { name: '司马昱', dynasty: '东晋' },
            { name: '司马曜', dynasty: '东晋' },
            { name: '司马德宗', dynasty: '东晋' },
            { name: '司马德文', dynasty: '东晋' },

            // 南北朝
            { name: '刘裕', dynasty: '南北朝' },
            { name: '刘义符', dynasty: '南北朝' },
            { name: '刘义隆', dynasty: '南北朝' },
            { name: '刘劭', dynasty: '南北朝' },
            { name: '刘骏', dynasty: '南北朝' },
            { name: '刘子业', dynasty: '南北朝' },
            { name: '刘彧', dynasty: '南北朝' },
            { name: '刘昱', dynasty: '南北朝' },
            { name: '刘昱', dynasty: '南北朝' },
            { name: '萧道成', dynasty: '南北朝' },
            { name: '萧赜', dynasty: '南北朝' },
            { name: '萧昭业', dynasty: '南北朝' },
            { name: '萧昭文', dynasty: '南北朝' },
            { name: '萧鸾', dynasty: '南北朝' },
            { name: '萧宝卷', dynasty: '南北朝' },
            { name: '萧宝融', dynasty: '南北朝' },
            { name: '萧衍', dynasty: '南北朝' },
            { name: '萧纲', dynasty: '南北朝' },
            { name: '萧栋', dynasty: '南北朝' },
            { name: '萧绎', dynasty: '南北朝' },
            { name: '萧渊明', dynasty: '南北朝' },
            { name: '萧方智', dynasty: '南北朝' },
            { name: '陈霸先', dynasty: '南北朝' },
            { name: '陈蒨', dynasty: '南北朝' },
            { name: '陈伯宗', dynasty: '南北朝' },
            { name: '陈顼', dynasty: '南北朝' },
            { name: '陈叔宝', dynasty: '南北朝' },
            { name: '刘渊', dynasty: '南北朝' },
            { name: '刘和', dynasty: '南北朝' },
            { name: '刘聪', dynasty: '南北朝' },
            { name: '刘粲', dynasty: '南北朝' },
            { name: '刘曜', dynasty: '南北朝' },
            { name: '石勒', dynasty: '南北朝' },
            { name: '石弘', dynasty: '南北朝' },
            { name: '石虎', dynasty: '南北朝' },
            { name: '石祗', dynasty: '南北朝' },
            { name: '冉闵', dynasty: '南北朝' },
            { name: '慕容皝', dynasty: '南北朝' },
            { name: '慕容儁', dynasty: '南北朝' },
            { name: '慕容暐', dynasty: '南北朝' },
            { name: '苻洪', dynasty: '南北朝' },
            { name: '苻健', dynasty: '南北朝' },
            { name: '苻坚', dynasty: '南北朝' },
            { name: '苻丕', dynasty: '南北朝' },
            { name: '苻登', dynasty: '南北朝' },
            { name: '苻崇', dynasty: '南北朝' },
            { name: '姚苌', dynasty: '南北朝' },
            { name: '姚兴', dynasty: '南北朝' },
            { name: '姚泓', dynasty: '南北朝' },
            { name: '慕容垂', dynasty: '南北朝' },
            { name: '慕容宝', dynasty: '南北朝' },
            { name: '慕容详', dynasty: '南北朝' },
            { name: '慕容盛', dynasty: '南北朝' },
            { name: '慕容熙', dynasty: '南北朝' },
            { name: '慕容云', dynasty: '南北朝' },
            { name: '乞伏国仁', dynasty: '南北朝' },
            { name: '乞伏乾归', dynasty: '南北朝' },
            { name: '乞伏炽磐', dynasty: '南北朝' },
            { name: '乞伏暮末', dynasty: '南北朝' },
            { name: '吕光', dynasty: '南北朝' },
            { name: '吕纂', dynasty: '南北朝' },
            { name: '吕隆', dynasty: '南北朝' },
            { name: '慕容德', dynasty: '南北朝' },
            { name: '慕容超', dynasty: '南北朝' },
            { name: '赫连勃勃', dynasty: '南北朝' },
            { name: '赫连昌', dynasty: '南北朝' },
            { name: '赫连定', dynasty: '南北朝' },
            { name: '高云', dynasty: '南北朝' },
            { name: '冯跋', dynasty: '南北朝' },
            { name: '冯弘', dynasty: '南北朝' },
            { name: '李雄', dynasty: '南北朝' },
            { name: '李班', dynasty: '南北朝' },
            { name: '李期', dynasty: '南北朝' },
            { name: '李寿', dynasty: '南北朝' },
            { name: '李势', dynasty: '南北朝' },
            { name: '拓跋珪', dynasty: '南北朝' },
            { name: '拓跋嗣', dynasty: '南北朝' },
            { name: '拓跋焘', dynasty: '南北朝' },
            { name: '拓跋余', dynasty: '南北朝' },
            { name: '拓跋濬', dynasty: '南北朝' },
            { name: '拓跋弘', dynasty: '南北朝' },
            { name: '元宏', dynasty: '南北朝' },
            { name: '元恪', dynasty: '南北朝' },
            { name: '元诩', dynasty: '南北朝' },
            { name: '元钊', dynasty: '南北朝' },
            { name: '元子攸', dynasty: '南北朝' },
            { name: '元晔', dynasty: '南北朝' },
            { name: '元恭', dynasty: '南北朝' },
            { name: '元朗', dynasty: '南北朝' },
            { name: '元修', dynasty: '南北朝' },
            { name: '元善见', dynasty: '南北朝' },
            { name: '元宝炬', dynasty: '南北朝' },
            { name: '元钦', dynasty: '南北朝' },
            { name: '拓跋廓', dynasty: '南北朝' },
            { name: '高欢', dynasty: '南北朝' },
            { name: '高澄', dynasty: '南北朝' },
            { name: '高洋', dynasty: '南北朝' },
            { name: '高殷', dynasty: '南北朝' },
            { name: '高演', dynasty: '南北朝' },
            { name: '高湛', dynasty: '南北朝' },
            { name: '高纬', dynasty: '南北朝' },
            { name: '宇文泰', dynasty: '南北朝' },
            { name: '宇文觉', dynasty: '南北朝' },
            { name: '宇文毓', dynasty: '南北朝' },
            { name: '宇文邕', dynasty: '南北朝' },
            { name: '宇文赟', dynasty: '南北朝' },
            { name: '宇文阐', dynasty: '南北朝' },
            
            // 隋朝
            { name: '杨坚', dynasty: '隋朝' },
            { name: '杨广', dynasty: '隋朝' },
            
            // 唐朝
            { name: '李渊', dynasty: '唐朝' },
            { name: '李世民', dynasty: '唐朝' },
            { name: '李治', dynasty: '唐朝' },
            { name: '武则天', dynasty: '唐朝' },
            { name: '李显', dynasty: '唐朝' },
            { name: '李旦', dynasty: '唐朝' },
            { name: '李隆基', dynasty: '唐朝' },
            { name: '李亨', dynasty: '唐朝' },
            { name: '李豫', dynasty: '唐朝' },
            { name: '李适', dynasty: '唐朝' },
            { name: '李诵', dynasty: '唐朝' },
            { name: '李纯', dynasty: '唐朝' },
            { name: '李恒', dynasty: '唐朝' },
            { name: '李湛', dynasty: '唐朝' },
            { name: '李昂', dynasty: '唐朝' },
            { name: '李炎', dynasty: '唐朝' },
            { name: '李忱', dynasty: '唐朝' },
            { name: '李儇', dynasty: '唐朝' },
            { name: '李晔', dynasty: '唐朝' },
            { name: '李柷', dynasty: '唐朝' },

            // 五代十国
            { name: '朱温', dynasty: '五代十国' },
            { name: '朱友贞', dynasty: '五代十国' },
            { name: '李存勖', dynasty: '五代十国' },
            { name: '李嗣源', dynasty: '五代十国' },
            { name: '李从珂', dynasty: '五代十国' },
            { name: '石敬瑭', dynasty: '五代十国' },
            { name: '石重贵', dynasty: '五代十国' },
            { name: '刘知远', dynasty: '五代十国' },
            { name: '刘承祐', dynasty: '五代十国' },
            { name: '郭威', dynasty: '五代十国' },
            { name: '柴荣', dynasty: '五代十国' },
            { name: '柴宗训', dynasty: '五代十国' },
            { name: '王建', dynasty: '五代十国' },
            { name: '王衍', dynasty: '五代十国' },
            { name: '孟知祥', dynasty: '五代十国' },
            { name: '孟昶', dynasty: '五代十国' },
            { name: '杨溥', dynasty: '五代十国' },
            { name: '李昪', dynasty: '五代十国' },
            { name: '李璟', dynasty: '五代十国' },
            { name: '李煜', dynasty: '五代十国' },
            { name: '刘龑', dynasty: '五代十国' },
            { name: '刘玢', dynasty: '五代十国' },
            { name: '刘晟', dynasty: '五代十国' },
            { name: '刘鋹', dynasty: '五代十国' },
            { name: '刘旻', dynasty: '五代十国' },
            { name: '刘承钧', dynasty: '五代十国' },
            { name: '刘继恩', dynasty: '五代十国' },
            { name: '刘继元', dynasty: '五代十国' },

            // 北宋
            { name: '赵匡胤', dynasty: '北宋' },
            { name: '赵光义', dynasty: '北宋' },
            { name: '宋真宗', dynasty: '北宋' },
            { name: '宋仁宗', dynasty: '北宋' },
            { name: '宋英宗', dynasty: '北宋' },
            { name: '宋神宗', dynasty: '北宋' },
            { name: '宋哲宗', dynasty: '北宋' },
            { name: '宋徽宗', dynasty: '北宋' },
            { name: '宋钦宗', dynasty: '北宋' },

            // 南宋
            { name: '宋高宗', dynasty: '南宋' },
            { name: '宋孝宗', dynasty: '南宋' },
            { name: '宋光宗', dynasty: '南宋' },
            { name: '宋宁宗', dynasty: '南宋' },
            { name: '宋理宗', dynasty: '南宋' },
            { name: '宋度宗', dynasty: '南宋' },
            { name: '宋恭帝', dynasty: '南宋' },
            { name: '宋端宗', dynasty: '南宋' },
            { name: '宋末帝(宋少帝)', dynasty: '南宋' },

            // 辽
            { name: '耶律阿保机', dynasty: '辽' },
            { name: '耶律德光', dynasty: '辽' },
            { name: '耶律阮', dynasty: '辽' },
            { name: '耶律璟', dynasty: '辽' },
            { name: '耶律贤', dynasty: '辽' },
            { name: '耶律隆绪', dynasty: '辽' },
            { name: '耶律宗真', dynasty: '辽' },
            { name: '耶律洪基', dynasty: '辽' },
            { name: '耶律延禧', dynasty: '辽' },
            
            // 金
            { name: '完颜阿骨打', dynasty: '金' },
            { name: '完颜吴乞买', dynasty: '金' },
            { name: '完颜亶', dynasty: '金' },
            { name: '完颜亮', dynasty: '金' },
            { name: '完颜雍', dynasty: '金' },
            { name: '完颜璟', dynasty: '金' },
            { name: '完颜永济', dynasty: '金' },
            { name: '完颜珣', dynasty: '金' },
            { name: '完颜守绪', dynasty: '金' },
            { name: '完颜承麟', dynasty: '金' },

            // 西夏
            { name: '李元昊', dynasty: '西夏' },
            { name: '李谅祚', dynasty: '西夏' },
            { name: '李秉常', dynasty: '西夏' },
            { name: '李乾顺', dynasty: '西夏' },
            { name: '李仁孝', dynasty: '西夏' },
            { name: '李纯祐', dynasty: '西夏' },
            { name: '李安全', dynasty: '西夏' },
            { name: '李遵顼', dynasty: '西夏' },
            { name: '李德旺', dynasty: '西夏' },
            { name: '李睍', dynasty: '西夏' },

            // 元朝
            { name: '忽必烈', dynasty: '元朝' },
            { name: '铁穆耳', dynasty: '元朝' },
            { name: '海山', dynasty: '元朝' },
            { name: '爱育黎拔力八达', dynasty: '元朝' },
            { name: '硕德八剌', dynasty: '元朝' },
            { name: '也孙铁木儿', dynasty: '元朝' },
            { name: '阿速吉八', dynasty: '元朝' },
            { name: '图帖睦尔', dynasty: '元朝' },
            { name: '和世㻋', dynasty: '元朝' },
            { name: '懿璘质班', dynasty: '元朝' },
            { name: '妥懽帖睦尔', dynasty: '元朝' },

            // 明朝
            { name: '朱元璋', dynasty: '明朝' },
            { name: '朱允炆', dynasty: '明朝' },
            { name: '朱棣', dynasty: '明朝' },
            { name: '朱高炽', dynasty: '明朝' },
            { name: '朱瞻基', dynasty: '明朝' },
            { name: '朱祁镇', dynasty: '明朝' },
            { name: '朱祁钰', dynasty: '明朝' },
            { name: '朱见深', dynasty: '明朝' },
            { name: '朱祐樘', dynasty: '明朝' },
            { name: '朱厚照', dynasty: '明朝' },
            { name: '朱厚熜', dynasty: '明朝' },
            { name: '朱载坖', dynasty: '明朝' },
            { name: '朱翊钧', dynasty: '明朝' },
            { name: '朱常洛', dynasty: '明朝' },
            { name: '朱由校', dynasty: '明朝' },
            { name: '朱由检', dynasty: '明朝' },

            // 清朝
            { name: '努尔哈赤', dynasty: '清朝' },
            { name: '皇太极', dynasty: '清朝' },
            { name: '顺治', dynasty: '清朝' },
            { name: '康熙', dynasty: '清朝' },
            { name: '雍正', dynasty: '清朝' },
            { name: '乾隆', dynasty: '清朝' },
            { name: '嘉庆', dynasty: '清朝' },
            { name: '道光', dynasty: '清朝' },
            { name: '咸丰', dynasty: '清朝' },
            { name: '同治', dynasty: '清朝' },
            { name: '光绪', dynasty: '清朝' },
            { name: '溥仪', dynasty: '清朝' },

            // 其他
            { name: '王莽', dynasty: '其他' }
        ];
    },

    /**
     * 获取所有朝代列表（去重，保持文件中的顺序）
     * @returns {Array<string>}
     */
    getAllDynasties: function() {
        const emperors = this.getAllEmperors();
        // 使用Set去重，但保持首次出现的顺序
        const dynasties = [];
        const seen = new Set();
        for (const emperor of emperors) {
            if (!seen.has(emperor.dynasty)) {
                seen.add(emperor.dynasty);
                dynasties.push(emperor.dynasty);
            }
        }
        return dynasties;
    },

    /**
     * 根据朝代过滤皇帝
     * @param {string} dynasty - 朝代名称
     * @returns {Array<{name: string, dynasty: string}>}
     */
    getEmperorsByDynasty: function(dynasty) {
        return this.getAllEmperors().filter(e => e.dynasty === dynasty);
    }
};

// 导出到全局作用域
if (typeof window !== 'undefined') {
    window.EmperorDictionary = EmperorDictionary;
}
