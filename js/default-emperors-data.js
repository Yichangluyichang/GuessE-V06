/**
 * 中国皇帝猜谜游戏 - 默认皇帝数据
 * 包含50位著名皇帝的完整数据，每位皇帝有10个分级提示词
 */

/**
 * 创建默认皇帝数据
 * @returns {Emperor[]} 皇帝数组
 */
function createDefaultEmperorsData() {
    const emperors = [];

    // 1. 嬴政
    emperors.push(window.GameTypes.createEmperor(
        'qin-shi-huang',
        '嬴政',
        '秦始皇',
        '始皇帝',
        ['始皇'],
        '秦朝',
        -221,
        -210,
        [
            // 困难提示词
            window.GameTypes.createHint('qin-shi-huang-hint-1', '他的母亲间接为他制造了一次叛乱', 'hard', 0),
            window.GameTypes.createHint('qin-shi-huang-hint-2', '他是大一统王朝的皇帝', 'hard', 1),
            window.GameTypes.createHint('qin-shi-huang-hint-3', '他的下一任皇帝是他的第18子', 'hard', 2),
            window.GameTypes.createHint('qin-shi-huang-hint-4', '他晚年执着于寻求长生不老的方术', 'hard', 3),
            window.GameTypes.createHint('qin-shi-huang-hint-5', '他大兴土木，修建了规模空前的大型工程', 'hard', 4),
            
            // 中等提示词
            window.GameTypes.createHint('qin-shi-huang-hint-6', '他修建了万里长城，抵御北方匈奴的入侵', 'medium', 5),
            window.GameTypes.createHint('qin-shi-huang-hint-7', '他焚书坑儒，实行思想专制', 'medium', 6),
            window.GameTypes.createHint('qin-shi-huang-hint-8', '他派徐福东渡寻找长生不老药', 'medium', 7),
            window.GameTypes.createHint('qin-shi-huang-hint-9', '他统一了六国，建立了中国历史上第一个中央集权的封建王朝', 'medium', 8),
            window.GameTypes.createHint('qin-shi-huang-hint-10', '他统一文字、货币、度量衡，促进了文化和经济的统一', 'medium', 9),
            window.GameTypes.createHint('qin-shi-huang-hint-11', '他推行郡县制，废除分封制，加强中央集权', 'medium', 10),
            window.GameTypes.createHint('qin-shi-huang-hint-12', '他出生在赵国', 'medium', 11),
            
            // 简单提示词
            window.GameTypes.createHint('qin-shi-huang-hint-13', '他是秦朝的开国皇帝', 'easy', 12),
            window.GameTypes.createHint('qin-shi-huang-hint-14', '他是中国历史上第一位使用“皇帝”称号的君主', 'easy', 13),
            window.GameTypes.createHint('qin-shi-huang-hint-15', '他的陵墓有著名的兵马俑', 'easy', 14),
            window.GameTypes.createHint('qin-shi-huang-hint-16', '他统一了中国，结束了战国时代', 'easy', 15)
        ]
    ));

    // 2. 刘彻
    emperors.push(window.GameTypes.createEmperor(
        'han-wu-di',
        '刘彻',
        '汉世宗',
        '汉武帝',
        ['建元', '元光', '元朔', '元狩', '元鼎', '元封', '太初', '天汉', '太始', '征和', '后元'],
        '西汉',
        -141,
        -87,
        [
            // 困难提示词
            window.GameTypes.createHint('han-wu-di-hint-1', '他的曾孙是一位明君', 'hard', 0),
            window.GameTypes.createHint('han-wu-di-hint-2', '他身边的一位权臣同时辅佐过他，他的儿子和他的曾孙', 'hard', 1),
            window.GameTypes.createHint('han-wu-di-hint-3', '他是大一统王朝的皇帝', 'hard', 2),
            window.GameTypes.createHint('han-wu-di-hint-4', '他的曾孙用过两个名字', 'hard', 3),
            window.GameTypes.createHint('han-wu-di-hint-5', '他的庙号是世宗', 'hard', 4),
            
            // 中等提示词
            window.GameTypes.createHint('han-wu-di-hint-6', '他派张骞出使西域，开辟了丝绸之路', 'medium', 5),
            window.GameTypes.createHint('han-wu-di-hint-7', '他多次征伐匈奴，大大拓展了疆域', 'medium', 6),
            window.GameTypes.createHint('han-wu-di-hint-8', '他在位54年', 'medium', 7),
            window.GameTypes.createHint('han-wu-di-hint-9', '他独尊儒术，罢黜百家，确立了儒家思想的正统地位', 'medium', 8),
            window.GameTypes.createHint('han-wu-di-hint-10', '他是中国的第9位皇帝', 'medium', 9),
            window.GameTypes.createHint('han-wu-di-hint-11', '他实行推恩令，削弱诸侯王的势力', 'medium', 10),
            
            // 简单提示词
            window.GameTypes.createHint('han-wu-di-hint-12', '他是西汉第七位皇帝', 'easy', 11),
            window.GameTypes.createHint('han-wu-di-hint-13', '他的爷爷开创了文景之治', 'easy', 12),
            window.GameTypes.createHint('han-wu-di-hint-14', '他开创了汉朝的鼎盛时期', 'easy', 13),
            window.GameTypes.createHint('han-wu-di-hint-15', '他是刘邦的曾孙', 'easy', 14)
        ]
    ));

    // 3. 李世民
    emperors.push(window.GameTypes.createEmperor(
        'tang-tai-zong',
        '李世民',
        '唐太宗',
        '文武大圣大广孝皇帝',
        ['贞观'],
        '唐朝',
        626,
        649,
        [
            // 困难提示词
            window.GameTypes.createHint('tang-tai-zong-hint-1', '他实行三省六部制，完善了中央政府机构', 'hard', 0),
            window.GameTypes.createHint('tang-tai-zong-hint-2', '他推行科举制，选拔人才不拘门第', 'hard', 1),
            window.GameTypes.createHint('tang-tai-zong-hint-3', '他实行均田制和租庸调制，减轻农民负担', 'hard', 2),
            window.GameTypes.createHint('tang-tai-zong-hint-4', '他杀死了自己的哥哥和弟弟', 'hard', 3),
            window.GameTypes.createHint('tang-tai-zong-hint-5', '他被誉为千古明君', 'hard', 4),
            window.GameTypes.createHint('tang-tai-zong-hint-6', '他文武双全', 'hard', 5),
            
            // 中等提示词
            window.GameTypes.createHint('tang-tai-zong-hint-7', '他发动玄武门之变，夺取皇位', 'medium', 6),
            window.GameTypes.createHint('tang-tai-zong-hint-8', '他虚心纳谏，重用魏征等贤臣', 'medium', 7),
            window.GameTypes.createHint('tang-tai-zong-hint-9', '他的两位谋士被称为“房谋杜断”', 'medium', 8),
            window.GameTypes.createHint('tang-tai-zong-hint-10', '他的父亲禅位给了他', 'medium', 9),
            
            // 简单提示词
            window.GameTypes.createHint('tang-tai-zong-hint-11', '他是唐朝第二位皇帝', 'easy', 10),
            window.GameTypes.createHint('tang-tai-zong-hint-12', '他是李渊的次子', 'easy', 11),
            window.GameTypes.createHint('tang-tai-zong-hint-13', '他开创了唐朝的盛世', 'easy', 12),
            window.GameTypes.createHint('tang-tai-zong-hint-14', '“天可汗”', 'easy', 13),
            window.GameTypes.createHint('tang-tai-zong-hint-15', '他的统治被称为"贞观之治"', 'easy', 14)
        ]
    ));

    // 4. 赵匡胤
    emperors.push(window.GameTypes.createEmperor(
        'song-tai-zu',
        '赵匡胤',
        '宋太祖',
        '启运立极英武睿文神德圣功至明大孝皇帝',
        ['建隆', '乾德', '开宝'],
        '北宋',
        960,
        976,
        [
            // 困难提示词
            window.GameTypes.createHint('song-tai-zu-hint-1', '他统治时期，国家并未完成大一统，仍与数个并立的政权对峙', 'hard', 0),
            window.GameTypes.createHint('song-tai-zu-hint-2', '他在统一战争中，采取了“先南后北、先易后难”的战略方针', 'hard', 1),
            window.GameTypes.createHint('song-tai-zu-hint-3', '他的死因充满疑云', 'hard', 2),
            
            // 中等提示词
            window.GameTypes.createHint('song-tai-zu-hint-4', '他建都开封', 'medium', 3),
            window.GameTypes.createHint('song-tai-zu-hint-5', '他在位16年', 'medium', 4),
            window.GameTypes.createHint('song-tai-zu-hint-6', '他通过陈桥兵变，黄袍加身，建立宋朝', 'medium', 5),
            window.GameTypes.createHint('song-tai-zu-hint-7', '他实行杯酒释兵权，削弱武将势力', 'medium', 6),
            window.GameTypes.createHint('song-tai-zu-hint-8', '他重文轻武，提高文官地位，防止武将专权', 'medium', 7),
            
            // 简单提示词
            window.GameTypes.createHint('song-tai-zu-hint-9', '他是宋朝的开国皇帝', 'easy', 8),
            window.GameTypes.createHint('song-tai-zu-hint-10', '他原是后周的禁军将领', 'easy', 9),
            window.GameTypes.createHint('song-tai-zu-hint-11', '他结束了五代十国的乱世', 'easy', 10),
            window.GameTypes.createHint('song-tai-zu-hint-12', '他被称为宋太祖', 'easy', 11)
        ]
    ));

    // 5. 朱元璋
    emperors.push(window.GameTypes.createEmperor(
        'ming-tai-zu',
        '朱元璋',
        '明太祖',
        '开天行道肇纪立极大圣至神仁文义武俊德成功高皇帝',
        ['洪武'],
        '明朝',
        1368,
        1398,
        [
            // 困难提示词
            window.GameTypes.createHint('ming-tai-zu-hint-1', '他杀害了大量功臣和开国元勋', 'hard', 0),
            window.GameTypes.createHint('ming-tai-zu-hint-2', '他晚年猜忌心极重，曾兴起一系列大案，株连甚广', 'hard', 1),
            window.GameTypes.createHint('ming-tai-zu-hint-3', '他对自己选定的继承人（太子）非常慈爱，但太子却先于他去世', 'hard', 2),
            window.GameTypes.createHint('ming-tai-zu-hint-4', '他的继承人是他的孙子', 'hard', 3),
            window.GameTypes.createHint('ming-tai-zu-hint-5', '他是大一统王朝的皇帝', 'hard', 4),
            
            // 中等提示词
            window.GameTypes.createHint('ming-tai-zu-hint-6', '他出身贫寒，曾当过和尚', 'medium', 5),
            window.GameTypes.createHint('ming-tai-zu-hint-7', '他参加红巾军起义', 'medium', 6),
            window.GameTypes.createHint('ming-tai-zu-hint-8', '他设立锦衣卫，加强特务统治', 'medium', 7),
            window.GameTypes.createHint('ming-tai-zu-hint-9', '他废除丞相制度，设立内阁，加强皇权', 'medium', 8),
            window.GameTypes.createHint('ming-tai-zu-hint-10', '他实行海禁政策，限制对外贸易', 'medium', 9),
            window.GameTypes.createHint('ming-tai-zu-hint-11', '他组织编定了用于人口管理的《黄册》和用于土地管理的《鱼鳞图册》', 'medium', 10),
            
            // 简单提示词
            window.GameTypes.createHint('ming-tai-zu-hint-12', '他是明朝的开国皇帝', 'easy', 11),
            window.GameTypes.createHint('ming-tai-zu-hint-13', '他推翻了元朝统治', 'easy', 12),
            window.GameTypes.createHint('ming-tai-zu-hint-14', '他从乞丐成为皇帝', 'easy', 13),
            window.GameTypes.createHint('ming-tai-zu-hint-15', '他的原名叫“朱重八”', 'easy', 14)
        ]
    ));

    // 6. 爱新觉罗·玄烨
    emperors.push(window.GameTypes.createEmperor(
        'qing-sheng-zu',
        '爱新觉罗·玄烨',
        '清圣祖',
        '合天弘运文武睿哲恭俭宽裕孝敬诚信功德大成仁皇帝',
        ['康熙'],
        '清朝',
        1661,
        1722,
        [
            // 困难提示词
            window.GameTypes.createHint('qing-sheng-zu-hint-1', '他年幼时，朝政被权臣把持，他隐忍多年后成功夺回权力', 'hard', 0),
            window.GameTypes.createHint('qing-sheng-zu-hint-2', '他晚年因皇子们争夺储位而心力交瘁', 'hard', 1),
            window.GameTypes.createHint('qing-sheng-zu-hint-3', '他通过军事和外交手段，迫使北方强国在平等条约上签字，划定了边界', 'hard', 2),
            window.GameTypes.createHint('qing-sheng-zu-hint-4', '他是开国皇帝的曾孙', 'hard', 3),
            
            // 中等提示词
            window.GameTypes.createHint('qing-sheng-zu-hint-5', '他在位61年，是中国历史上在位时间最长的皇帝', 'medium', 4),
            window.GameTypes.createHint('qing-sheng-zu-hint-6', '他8岁登基，14岁亲政', 'medium', 5),
            window.GameTypes.createHint('qing-sheng-zu-hint-7', '他收复台湾，统一全国', 'medium', 6),
            window.GameTypes.createHint('qing-sheng-zu-hint-8', '他亲征噶尔丹，平定准噶尔叛乱', 'medium', 7),
            window.GameTypes.createHint('qing-sheng-zu-hint-9', '他平定三藩之乱，巩固了清朝统治', 'medium', 8),
            
            // 简单提示词
            window.GameTypes.createHint('qing-sheng-zu-hint-10', '他是清朝第四位皇帝', 'easy', 9),
            window.GameTypes.createHint('qing-sheng-zu-hint-11', '他命令施琅收复了台湾', 'easy', 10),
            window.GameTypes.createHint('qing-sheng-zu-hint-12', '他是顺治皇帝的儿子', 'easy', 11),
            window.GameTypes.createHint('qing-sheng-zu-hint-13', '他擒拿了权臣鳌拜', 'easy', 12)
        ]
    ));

    // 7. 爱新觉罗·弘历
    emperors.push(window.GameTypes.createEmperor(
        'qing-gao-zong',
        '爱新觉罗·弘历',
        '清高宗',
        '法天隆运至诚先觉体元立极敷文奋武钦明孝慈神圣纯皇帝',
        ['乾隆'],
        '清朝',
        1736,
        1796,
        [
            // 困难提示词
            window.GameTypes.createHint('qing-gao-zong-hint-1', '他极其崇拜其祖父，并将自己统治的盛世视为其祖父事业的延续和顶峰', 'hard', 0),
            window.GameTypes.createHint('qing-gao-zong-hint-2', '他多次巡视江南，花费巨大，留下了许多逸闻故事', 'hard', 1),
            window.GameTypes.createHint('qing-gao-zong-hint-3', '他晚年放任贪腐，导致吏治败坏，国库损耗', 'hard', 2),
            window.GameTypes.createHint('qing-gao-zong-hint-4', '他晚年将皇位禅让给儿子', 'hard', 3),
            
            // 中等提示词
            window.GameTypes.createHint('qing-gao-zong-hint-5', '他在位60年，实际掌权63年', 'medium', 4),
            window.GameTypes.createHint('qing-gao-zong-hint-6', '他六下江南，巡视民情', 'medium', 5),
            window.GameTypes.createHint('qing-gao-zong-hint-7', '他完成十全武功，平定大小和卓叛乱', 'medium', 6),
            window.GameTypes.createHint('qing-gao-zong-hint-8', '他编纂《四库全书》，是中国古代最大的丛书', 'medium', 7),
            window.GameTypes.createHint('qing-gao-zong-hint-9', '他实行闭关锁国政策，限制对外贸易', 'medium', 8),
            window.GameTypes.createHint('qing-gao-zong-hint-10', '他自诩为“十全老人”，以总结自己一生的军事功绩', 'medium', 9),
            window.GameTypes.createHint('qing-gao-zong-hint-11', '他统治后期爆发了川楚白莲教起义，标志着盛世危机', 'medium', 10),
            
            // 简单提示词
            window.GameTypes.createHint('qing-gao-zong-hint-12', '他是清朝第六位皇帝', 'easy', 11),
            window.GameTypes.createHint('qing-gao-zong-hint-13', '他是雍正皇帝的儿子', 'easy', 12),
            window.GameTypes.createHint('qing-gao-zong-hint-14', '他统治时期是清朝的鼎盛时期', 'easy', 13),
            window.GameTypes.createHint('qing-gao-zong-hint-15', '他是康熙皇帝的孙子', 'easy', 14)
        ]
    ));

    // 8. 杨坚
    emperors.push(window.GameTypes.createEmperor(
        'sui-wen-di',
        '杨坚',
        '隋高祖',
        '隋文帝',
        ['开皇', '仁寿'],
        '隋朝',
        581,
        604,
        [
            // 困难提示词
            window.GameTypes.createHint('sui-wen-di-hint-1', '他是大一统王朝的皇帝', 'hard', 0),
            window.GameTypes.createHint('sui-wen-di-hint-2', '他以外戚身份通过接受“禅让”的方式夺得皇位', 'hard', 1),
            window.GameTypes.createHint('sui-wen-di-hint-3', '他在确立继承人问题上犯了严重错误，导致身后发生宫廷惨剧', 'hard', 2),
            
            // 中等提示词
            window.GameTypes.createHint('sui-wen-di-hint-4', '他统一了分裂近300年的中国', 'medium', 3),
            window.GameTypes.createHint('sui-wen-di-hint-5', '他在位24年，开创了开皇之治', 'medium', 4),
            window.GameTypes.createHint('sui-wen-di-hint-6', '他建立三省六部制，影响后世千年', 'medium', 5),
            window.GameTypes.createHint('sui-wen-di-hint-7', '他实行均田制，促进农业发展', 'medium', 6),
            
            // 简单提示词
            window.GameTypes.createHint('sui-wen-di-hint-8', '他是隋朝的开国皇帝', 'easy', 7),
            window.GameTypes.createHint('sui-wen-di-hint-9', '他结束了南北朝的分裂', 'easy', 8),
            window.GameTypes.createHint('sui-wen-di-hint-10', '他是杨广的父亲', 'easy', 9),
            window.GameTypes.createHint('sui-wen-di-hint-11', '他建立隋朝，定都长安', 'easy', 10)
        ]
    ));

    // 9. 忽必烈
    emperors.push(window.GameTypes.createEmperor(
        'yuan-shi-zu',
        '忽必烈',
        '元世祖',
        '圣德神功文武皇帝',
        ['中统', '至元'],
        '元朝',
        1260,
        1294,
        [
            // 困难提示词
            window.GameTypes.createHint('yuan-shi-zu-hint-1', '他统治的帝国疆域在其手中达到了前所未有的辽阔。', 'hard', 0),
            window.GameTypes.createHint('yuan-shi-zu-hint-2', '他推行重农政策，恢复和发展农业生产', 'hard', 1),
            window.GameTypes.createHint('yuan-shi-zu-hint-3', '他通过激烈的内部斗争（与兄弟争位）才登上最高权力宝座。', 'hard', 2),
            window.GameTypes.createHint('yuan-shi-zu-hint-4', '他是一位长寿的皇帝，活到了八十岁', 'hard', 3),
            window.GameTypes.createHint('yuan-shi-zu-hint-5', '他晚年因酗酒和暴饮暴食而健康恶化', 'hard', 4),
            window.GameTypes.createHint('yuan-shi-zu-hint-6', '他的都城在北京', 'hard', 5),
            window.GameTypes.createHint('yuan-shi-zu-hint-7', '他不是汉族人', 'hard', 6),
            
            // 中等提示词
            window.GameTypes.createHint('yuan-shi-zu-hint-8', '他建立元朝，定都大都（北京）', 'medium', 7),
            window.GameTypes.createHint('yuan-shi-zu-hint-9', '他开创了海上丝绸之路', 'medium', 8),
            window.GameTypes.createHint('yuan-shi-zu-hint-10', '他建立行省制度，加强对全国的统治', 'medium', 9),
            window.GameTypes.createHint('yuan-shi-zu-hint-11', '他推崇藏传佛教，并任命高僧八思巴为国师，创制了八思巴文', 'medium', 10),
            window.GameTypes.createHint('yuan-shi-zu-hint-12', '他命令两次跨海东征日本，但均因遭遇台风而失败', 'medium', 11),
            
            // 简单提示词
            window.GameTypes.createHint('yuan-shi-zu-hint-13', '他是元朝的开国皇帝', 'easy', 12),
            window.GameTypes.createHint('yuan-shi-zu-hint-14', '他的宫廷中有一位著名的威尼斯旅行家马可·波罗为其服务', 'easy', 13),
            window.GameTypes.createHint('yuan-shi-zu-hint-15', '他消灭了南宋', 'easy', 14),
            window.GameTypes.createHint('yuan-shi-zu-hint-16', '他是成吉思汗的孙子', 'easy', 15)
        ]
    ));

    // 10. 刘邦
    emperors.push(window.GameTypes.createEmperor(
        'han-gao-zu',
        '刘邦',
        '汉太祖',
        '汉高帝',
        ['汉高祖'],
        '西汉',
        -202,
        -195,
        [
            // 困难提示词
            window.GameTypes.createHint('han-gao-zu-hint-1', '他实行郡国并行制，既有郡县也有诸侯国', 'hard', 0),
            window.GameTypes.createHint('han-gao-zu-hint-2', '他在位时都城在长安', 'hard', 1),
            window.GameTypes.createHint('han-gao-zu-hint-3', '他实行休养生息政策，恢复经济发展', 'hard', 2),
            window.GameTypes.createHint('han-gao-zu-hint-4', '他的皇后杀死了他的小妾', 'hard', 3),
            window.GameTypes.createHint('han-gao-zu-hint-5', '他之后的第4位皇帝是他的儿子', 'hard', 4),
            
            // 中等提示词
            window.GameTypes.createHint('han-gao-zu-hint-6', '他出身平民，曾是亭长', 'medium', 5),
            window.GameTypes.createHint('han-gao-zu-hint-7', '他杀死了许多功臣', 'medium', 6),
            window.GameTypes.createHint('han-gao-zu-hint-8', '他制定"白马之盟"，规定非自家姓氏氏不得为王', 'medium', 7),
            window.GameTypes.createHint('han-gao-zu-hint-9', '毛泽东评价他是“封建皇帝里边最厉害的一个”', 'medium', 8),
            
            // 简单提示词
            window.GameTypes.createHint('han-gao-zu-hint-10', '他是汉朝的开国皇帝', 'easy', 9),
            window.GameTypes.createHint('han-gao-zu-hint-11', '他是汉武帝的高祖父', 'easy', 10),
            window.GameTypes.createHint('han-gao-zu-hint-12', '他在楚汉争霸中击败项羽', 'easy', 11),
            window.GameTypes.createHint('han-gao-zu-hint-13', '“40岁看狗打架，50岁问鼎天下”', 'easy', 12)
        ]
    ));

    // 11. 李治
    emperors.push(window.GameTypes.createEmperor(
        'tang-gaozong',
        '李治',
        '唐高宗',
        '天皇大圣大弘孝皇帝',
        ['永徽'],
        '唐朝',
        649,
        683,
        [
            // 困难提示词
            window.GameTypes.createHint('tang-gaozong-hint-1', '他统治时期，王朝的版图达到了最大范围', 'hard', 0),
            window.GameTypes.createHint('tang-gaozong-hint-2', '他是该朝代的第3位皇帝', 'hard', 1),
            window.GameTypes.createHint('tang-gaozong-hint-3', '他在位期间，王朝在对外战争中取得了多次辉煌胜利', 'hard', 2),
            window.GameTypes.createHint('tang-gaozong-hint-4', '他之后的两位皇帝都是他的儿子', 'hard', 3),
            window.GameTypes.createHint('tang-gaozong-hint-5', '他继承了一个国力强盛、府库充盈的帝国', 'hard', 4),
            
            // 中等提示词
            window.GameTypes.createHint('tang-gaozong-hint-6', '他在位期间，与皇后并称为“二圣”，共同临朝听政', 'medium', 5),
            window.GameTypes.createHint('tang-gaozong-hint-7', '他废黜了原配王皇后，改立武昭仪为后，引发朝廷巨大争议', 'medium', 6),
            window.GameTypes.createHint('tang-gaozong-hint-8', '他统治的后期，年号频繁更改', 'medium', 7),
            window.GameTypes.createHint('tang-gaozong-hint-9', '他下诏编修了国家药典《唐本草》', 'medium', 8),
            window.GameTypes.createHint('tang-gaozong-hint-10', '他统治时期，名将苏定方等攻灭了西突厥汗国', 'medium', 9),
            window.GameTypes.createHint('tang-gaozong-hint-11', '他任用李勣（徐世勣）等将领，攻灭了高句丽', 'medium', 10),
            
            // 简单提示词
            window.GameTypes.createHint('tang-gaozong-hint-12', '他是女皇武则天的丈夫', 'easy', 11),
            window.GameTypes.createHint('tang-gaozong-hint-13', '他的父亲是唐太宗', 'easy', 12),
            window.GameTypes.createHint('tang-gaozong-hint-14', '他害死了长孙无忌', 'easy', 13),
            window.GameTypes.createHint('tang-gaozong-hint-15', '他姓李', 'easy', 14)
        ]
    ));

    // 12. 李隆基
    emperors.push(window.GameTypes.createEmperor(
        'tang-xuanzong',
        '李隆基',
        '唐玄宗',
        '至道大圣大明孝皇帝',
        ['开元'],
        '唐朝',
        712,
        756,
        [
            // 困难提示词
            window.GameTypes.createHint('tang-xuanzong-hint-1', '他是通过两次宫廷政变才最终登上帝位', 'hard', 0),
            window.GameTypes.createHint('tang-xuanzong-hint-2', '他是大一统王朝的皇帝', 'hard', 1),
            window.GameTypes.createHint('tang-xuanzong-hint-3', '他统治期间，他的王朝由盛转衰', 'hard', 2),
            window.GameTypes.createHint('tang-xuanzong-hint-4', '他曾一日之内赐死自己的三个儿子，源于对太子之位的猜忌', 'hard', 3),
            window.GameTypes.createHint('tang-xuanzong-hint-5', '他多才多艺，精通音律、书法，是一位艺术造诣很高的皇帝', 'hard', 4),
            window.GameTypes.createHint('tang-xuanzong-hint-6', '他非常信任和依赖一位口蜜腹剑的宰相，导致朝政混乱', 'hard', 5),
            window.GameTypes.createHint('tang-xuanzong-hint-7', '他晚年被自己的儿子尊为“太上皇”，权力被架空', 'hard', 6),
            
            // 中等提示词
            window.GameTypes.createHint('tang-xuanzong-hint-8', '他被尊为“梨园祖师”', 'medium', 7),
            window.GameTypes.createHint('tang-xuanzong-hint-9', '他与他的儿子在同一年去世', 'medium', 8),
            window.GameTypes.createHint('tang-xuanzong-hint-10', '他与李白是同一时期的人物', 'medium', 9),
            
            // 简单提示词
            window.GameTypes.createHint('tang-xuanzong-hint-11', '他统治后期爆发了“安史之乱”', 'easy', 10),
            window.GameTypes.createHint('tang-xuanzong-hint-12', '他罢免了贤相张九龄，转而重用奸相李林甫和杨国忠', 'easy', 11),
            window.GameTypes.createHint('tang-xuanzong-hint-13', '他极度宠爱贵妃杨玉环，留下了“一骑红尘妃子笑”的典故', 'easy', 12),
            window.GameTypes.createHint('tang-xuanzong-hint-14', '他晚年被宦官李辅国等逼宫，凄凉退位', 'easy', 13),
            window.GameTypes.createHint('tang-xuanzong-hint-15', '他被称为“唐明皇”', 'easy', 14)
        ]
    ));

    // 13. 赵光义
    emperors.push(window.GameTypes.createEmperor(
        'song-taizong',
        '赵光义',
        '宋太宗',
        '至仁应道神功圣德文武睿烈大明广孝皇帝',
        ['太平兴国'],
        '北宋',
        976,
        997,
        [
            // 困难提示词
            window.GameTypes.createHint('song-taizong-hint-1', '他用过三个名字', 'hard', 0),
            window.GameTypes.createHint('song-taizong-hint-2', '他继续推进并基本完成了其兄长的统一战争', 'hard', 1),
            window.GameTypes.createHint('song-taizong-hint-3', '他在位后期，对北方敌人的战略由进攻转为全面防御', 'hard', 2),
            window.GameTypes.createHint('song-taizong-hint-4', '他继承皇位的过程在历史上存在争议', 'hard', 3),
            
            // 中等提示词
            window.GameTypes.createHint('song-taizong-hint-5', '他灭掉了五代十国最后一个割据政权北汉，完成了对中原和南方的统一', 'medium', 4),
            window.GameTypes.createHint('song-taizong-hint-6', '他即位后的第一个年号是“太平兴国”', 'medium', 5),
            window.GameTypes.createHint('song-taizong-hint-7', '他的皇位最终传给了自己的儿子', 'medium', 6),
            window.GameTypes.createHint('song-taizong-hint-8', '他通过政治手段，迫使吴越国主“纳土归降”，和平统一了南方最后一块割据地', 'medium', 7),
            window.GameTypes.createHint('song-taizong-hint-9', '他下令编纂了大型类书《太平御览》和《太平广记》', 'medium', 8),
            
            // 简单提示词
            window.GameTypes.createHint('song-taizong-hint-10', '他是宋朝的第二位皇帝', 'easy', 9),
            window.GameTypes.createHint('song-taizong-hint-11', '他发动了“雍熙北伐”但最终失败', 'easy', 10),
            window.GameTypes.createHint('song-taizong-hint-12', '他是宋太祖赵匡胤的弟弟', 'easy', 11),
            window.GameTypes.createHint('song-taizong-hint-13', '他在“高梁河之战”中惨败于辽军，并中箭受伤', 'easy', 12)
        ]
    ));

    // 14. 刘恒
    emperors.push(window.GameTypes.createEmperor(
        'han-wendi',
        '刘恒',
        '汉太宗',
        '汉孝文帝',
        ['无年号'],
        '西汉',
        -180,
        -157,
        [
            // 困难提示词
            window.GameTypes.createHint('han-wendi-hint-1', '他的是上两任皇帝的叔父', 'hard', 0),
            window.GameTypes.createHint('han-wendi-hint-2', '他是大一统王朝的皇帝', 'hard', 1),
            window.GameTypes.createHint('han-wendi-hint-3', '他去世前为太子选定了可托付大事的军事统帅', 'hard', 2),
            
            // 中等提示词
            window.GameTypes.createHint('han-wendi-hint-4', '他的帝位并非直接继承于父亲，而是在一场宫廷政变后被功臣集团从封地拥立', 'medium', 3),
            window.GameTypes.createHint('han-wendi-hint-5', '他以生活节俭著称，曾因不愿花费“百金”（相当于十户中产家产）而放弃修建一座露台', 'medium', 4),
            window.GameTypes.createHint('han-wendi-hint-6', '他废除了秦朝以来“一人犯罪，全家收为奴婢”的残酷连坐法（收孥相坐律令）', 'medium', 5),
            window.GameTypes.createHint('han-wendi-hint-7', '他废除了肉刑（如脸上刺字、割鼻等），但替代的笞刑有时反而更重，改革并未彻底执行', 'medium', 6),
            window.GameTypes.createHint('han-wendi-hint-8', '他登基之前，被封为代王', 'medium', 7),
            
            // 简单提示词
            window.GameTypes.createHint('han-wendi-hint-9', '他是在“诸吕之乱”被平定后，被陈平、周勃等老臣迎立为帝的', 'easy', 8),
            window.GameTypes.createHint('han-wendi-hint-10', '他是“文景之治”的开创者', 'easy', 9),
            window.GameTypes.createHint('han-wendi-hint-11', '他的母亲是薄姬', 'easy', 10),
            window.GameTypes.createHint('han-wendi-hint-12', '他的谥号是“文”，庙号是“太宗”', 'easy', 11)
        ]
    ));

    // 15. 刘秀
    emperors.push(window.GameTypes.createEmperor(
        'han-guangwudi',
        '刘秀',
        '汉世祖',
        '汉光武帝',
        ['建武'],
        '东汉',
        25,
        57,
        [
            // 困难提示词
            window.GameTypes.createHint('han-guangwudi-hint-1', '他从民间起兵，最终重建了一个已经灭亡的王朝', 'hard', 0),
            window.GameTypes.createHint('han-guangwudi-hint-2', '他本人是前朝的皇族后裔，但属于远支，早年以务农和读书为业', 'hard', 1),
            window.GameTypes.createHint('han-guangwudi-hint-3', '他以“柔道”治国，采取休养生息政策，释放奴婢，减轻刑罚和赋税', 'hard', 2),
            
            // 中等提示词
            window.GameTypes.createHint('han-guangwudi-hint-4', '他通过著名的“昆阳之战”，以少胜多，一战成名，奠定了巨大的威望', 'medium', 3),
            window.GameTypes.createHint('han-guangwudi-hint-5', '他统一后，大量任用跟随他起事的功臣担任高官，但通过“退功臣而进文吏”的方式实现了平稳过渡', 'medium', 4),
            window.GameTypes.createHint('han-guangwudi-hint-6', '他曾在河北地区经营，以“铜马帝”的称号收编了大量农民军，壮大实力', 'medium', 5),
            
            // 简单提示词
            window.GameTypes.createHint('han-guangwudi-hint-7', '他是东汉王朝的开国皇帝', 'easy', 6),
            window.GameTypes.createHint('han-guangwudi-hint-8', '他是刘邦的九世孙', 'easy', 7),
            window.GameTypes.createHint('han-guangwudi-hint-9', '他开创了“光武中兴”的治世', 'easy', 8),
            window.GameTypes.createHint('han-guangwudi-hint-10', '他与哥哥刘縯一同起兵', 'easy', 9)
        ]
    ));

    // 16. 刘协
    emperors.push(window.GameTypes.createEmperor(
        'han-xiandi',
        '刘协',
        '无庙号',
        '汉献帝',
        ['初平，兴平，建安，延康'],
        '东汉',
        189,
        220,
        [
            // 困难提示词
            window.GameTypes.createHint('han-xiandi-hint-1', '他的整个皇帝生涯几乎完全处于强大军阀的操控之下，是一个“傀儡皇帝”', 'hard', 0),
            window.GameTypes.createHint('han-xiandi-hint-2', '他被迫多次迁都，从洛阳到长安，又从长安逃回洛阳，颠沛流离', 'hard', 1),
            window.GameTypes.createHint('han-xiandi-hint-3', '在他名义上的统治时期，中国陷入了长期的军阀割据和混战状态', 'hard', 2),
            
            // 中等提示词
            window.GameTypes.createHint('han-xiandi-hint-4', '他先被权臣立为帝，后长期被“挟天子以令诸侯”', 'medium', 3),
            window.GameTypes.createHint('han-xiandi-hint-5', '他的皇后伏氏曾因密谋诛杀权臣而被废杀', 'medium', 4),
            window.GameTypes.createHint('han-xiandi-hint-6', '他被降封为“山阳公”，在自己的封邑内行医济世，传说颇受百姓爱戴', 'medium', 5),
            
            // 简单提示词
            window.GameTypes.createHint('han-xiandi-hint-7', '他最终将帝位禅让给曹丕，东汉正式灭亡', 'easy', 6),
            window.GameTypes.createHint('han-xiandi-hint-8', '他是汉灵帝的儿子', 'easy', 7),
            window.GameTypes.createHint('han-xiandi-hint-9', '他娶了曹操的三个女儿', 'easy', 8),
            window.GameTypes.createHint('han-xiandi-hint-10', '他的退位标志着东汉的灭亡和三国的开始', 'easy', 9)
        ]
    ));

    // 17. 曹操
    emperors.push(window.GameTypes.createEmperor(
        'wei-wudi',
        '曹操',
        '魏太祖',
        '魏武帝',
        ['建安'],
        '三国',
        220,
        221,
        [
            // 困难提示词
            window.GameTypes.createHint('wei-wudi-hint-1', '他是一位杰出的军事家，但其最广为人知的形象来自一部文学经典，该经典在一定程度上掩盖了他的历史复杂性', 'hard', 0),
            window.GameTypes.createHint('wei-wudi-hint-2', '他早年以执法严厉、不避权贵而闻名，在都城洛阳担任北部尉时曾棒杀违禁的宦官亲属', 'hard', 1),
            window.GameTypes.createHint('wei-wudi-hint-3', '他参与过对当时一个庞大民间宗教起义的镇压，并从中招募了一支重要的军事力量', 'hard', 2),
            
            // 中等提示词
            window.GameTypes.createHint('wei-wudi-hint-4', '他出身官宦世家，父亲是当朝高官的养子，这一背景在当时被一些名士所轻视', 'medium', 3),
            window.GameTypes.createHint('wei-wudi-hint-5', '他晚年位极人臣，受封为公爵并加“九锡”，但最终把称帝的机会留给了儿子', 'medium', 4),
            window.GameTypes.createHint('wei-wudi-hint-6', '“老骥伏枥，志在千里”是他著名诗篇《龟虽寿》中的名句', 'medium', 5),
            
            // 简单提示词
            window.GameTypes.createHint('wei-wudi-hint-7', '他是曹魏政权的奠基人，“三国鼎立”格局的关键塑造者之一', 'easy', 6),
            window.GameTypes.createHint('wei-wudi-hint-8', '他在“官渡之战”中以少胜多，击败了当时最强的军阀袁绍', 'easy', 7),
            window.GameTypes.createHint('wei-wudi-hint-9', '他曾说过“宁我负人，毋人负我”的话，展现其极端利己的哲学', 'easy', 8),
            window.GameTypes.createHint('wei-wudi-hint-10', '他有个著名的小名，叫“阿瞒”', 'easy', 9)
        ]
    ));

    // 18. 刘备
    emperors.push(window.GameTypes.createEmperor(
        'han-zhaoliedi',
        '刘备',
        '蜀汉烈祖',
        '汉昭烈帝',
        ['章武'],
        '三国',
        221,
        223,
        [
            // 困难提示词
            window.GameTypes.createHint('han-zhaoliedi-hint-1', '他以“仁德”、“信义”作为其最核心的政治品牌和个人标签，并以此收拢人心', 'hard', 0),
            window.GameTypes.createHint('han-zhaoliedi-hint-2', '他一生中最大的战略失误，被普遍认为是因意气用事而发动的、为兄弟复仇的倾国之战', 'hard', 1),
            window.GameTypes.createHint('han-zhaoliedi-hint-3', '他统治的核心区域，在地理上属于易守难攻的盆地', 'hard', 2),
            
            // 中等提示词
            window.GameTypes.createHint('han-zhaoliedi-hint-4', '他与另外两人的结义关系，成为后世“忠义”精神的最高典范之一', 'medium', 3),
            window.GameTypes.createHint('han-zhaoliedi-hint-5', '他自称是前一个鼎盛王朝的皇室后裔，但家道早已中落，早年以织席贩履为业', 'medium', 4),
            window.GameTypes.createHint('han-zhaoliedi-hint-6', '他的儿子是历史上一位著名的、能力与父亲形成鲜明对比的君主', 'medium', 5),
            
            // 简单提示词
            window.GameTypes.createHint('han-zhaoliedi-hint-7', '他病逝于白帝城，临终前将刘禅托付给诸葛亮，史称 “白帝城托孤”', 'easy', 6),
            window.GameTypes.createHint('han-zhaoliedi-hint-8', '他的妻子（孙夫人）是政治联姻的产物，来自当时的盟友兼对手阵营', 'easy', 7),
            window.GameTypes.createHint('han-zhaoliedi-hint-9', '他在赤壁之战中与孙权联盟，击败了曹操', 'easy', 8),
            window.GameTypes.createHint('han-zhaoliedi-hint-10', '他是中山靖王刘胜之后，常自称“刘皇叔”', 'easy', 9)
        ]
    ));

    // 19. 孙权
    emperors.push(window.GameTypes.createEmperor(
        'wu-dadi',
        '孙权',
        '吴太祖',
        '吴大帝',
        ['黄武'],
        '三国',
        229,
        252,
        [
            // 困难提示词
            window.GameTypes.createHint('wu-dadi-hint-1', '他是一位长寿的统治者，实际掌权时间超过半个世纪', 'hard', 0),
            window.GameTypes.createHint('wu-dadi-hint-2', '他曾与强大的北方政权结盟，并接受其册封，在称帝前使用过对方的年号', 'hard', 1),
            window.GameTypes.createHint('wu-dadi-hint-3', '他去世后，辅政大臣为了稳固新君地位，迅速清理了他生前最宠信的近臣', 'hard', 2),
            
            // 中等提示词
            window.GameTypes.createHint('wu-dadi-hint-4', '他在一场决定天下三分的关键战役中，是联军的重要一方', 'medium', 3),
            window.GameTypes.createHint('wu-dadi-hint-5', '他有一个著名的外号，叫 “碧眼紫髯”，被认为有异相', 'medium', 4),
            window.GameTypes.createHint('wu-dadi-hint-6', '他晚年变得多疑猜忌，宠信奸佞，制造多起冤案，与早年英明神武的形象反差巨大', 'medium', 5),
            window.GameTypes.createHint('wu-dadi-hint-7', '他晚年在继承人问题上酿成 “二宫之争”，动摇了国本', 'medium', 6),
            
            // 简单提示词
            window.GameTypes.createHint('wu-dadi-hint-8', '他的父亲是孙坚，哥哥是“小霸王”孙策，他继承了他们开创的基业', 'easy', 7),
            window.GameTypes.createHint('wu-dadi-hint-9', '他从刘备手中夺取荆州，并擒杀关羽', 'easy', 8),
            window.GameTypes.createHint('wu-dadi-hint-10', '他任命周瑜为赤壁之战统帅，陆逊为夷陵之战统帅', 'easy', 9),
            window.GameTypes.createHint('wu-dadi-hint-11', '他曾派遣将军卫温、诸葛直航行至夷洲（台湾）', 'easy', 10)
        ]
    ));

    // 20. 司马炎
    emperors.push(window.GameTypes.createEmperor(
        'jin-wudi',
        '司马炎',
        '晋世祖',
        '晋武帝',
        ['泰始'],
        '西晋',
        265,
        290,
        [
            // 困难提示词
            window.GameTypes.createHint('jin-wudi-hint-1', '他是通过接受“禅让”的方式，从一个已控制朝政数十年的家族手中，和平地开创了一个新王朝', 'hard', 0),
            window.GameTypes.createHint('jin-wudi-hint-2', '他统治初期，尚能厉行节俭，整顿吏治，但很快就转向了骄奢淫逸', 'hard', 1),
            window.GameTypes.createHint('jin-wudi-hint-3', '他大封宗室为王，并给予他们很大的军政实权，为后来的内战埋下了最大祸根', 'hard', 2),
            
            // 中等提示词
            window.GameTypes.createHint('jin-wudi-hint-4', '他选择继承人的决策被认为是其最大的失误，直接导致了王朝的迅速动荡', 'medium', 3),
            window.GameTypes.createHint('jin-wudi-hint-5', '他的后宫妃嫔人数极多，以至于他发明了“羊车望幸”的方法来选择就寝的宫殿', 'medium', 4),
            window.GameTypes.createHint('jin-wudi-hint-6', '他去世后，外戚篡改遗诏，独揽大权，引发了激烈的权力斗争', 'medium', 5),
            
            // 简单提示词
            window.GameTypes.createHint('jin-wudi-hint-7', '他大封同姓诸侯王，共封了二十七个王', 'easy', 6),
            window.GameTypes.createHint('jin-wudi-hint-8', '他晚年沉溺酒色，朝政被外戚杨骏把持', 'easy', 7),
            window.GameTypes.createHint('jin-wudi-hint-9', '他死后不久，王朝就爆发了持续十六年的血腥内战 “八王之乱”', 'easy', 8),
            window.GameTypes.createHint('jin-wudi-hint-10', '他立了有智力缺陷的嫡子司马衷（晋惠帝）为太子，并为他娶了野心勃勃的太子妃贾南风', 'easy', 9)
        ]
    ));

    // 21. 司马睿
    emperors.push(window.GameTypes.createEmperor(
        'jin-yuandi',
        '司马睿',
        '晋中宗',
        '晋元帝',
        ['建武'],
        '东晋',
        317,
        323,
        [
            // 困难提示词
            window.GameTypes.createHint('jin-yuandi-hint-1', '他是在北方故土沦陷、旧都失守后，于南方重建了前朝政权，史称“中兴”', 'hard', 0),
            window.GameTypes.createHint('jin-yuandi-hint-2', '他的权威从一开始就严重依赖南方本地世家大族和南渡的北方士族的支持，皇权基础薄弱', 'hard', 1),
            window.GameTypes.createHint('jin-yuandi-hint-3', '他在位期间，曾试图提拔一些出身较低的官员来制衡权臣，但未能成功', 'hard', 2),
            window.GameTypes.createHint('jin-yuandi-hint-4', '他最终是在权臣的军事威胁下，忧愤成疾而去世的', 'hard', 3),
            window.GameTypes.createHint('jin-yuandi-hint-5', '他不是大一统王朝的皇帝', 'hard', 4),
            
            // 中等提示词
            window.GameTypes.createHint('jin-yuandi-hint-6', '他在即位大典上，坚持要求与自己关系最密切的丞相一同升坐御床，留下了“王与马，共天下”的典故', 'medium', 5),
            window.GameTypes.createHint('jin-yuandi-hint-7', '他并非开国之君的嫡系近支，而是宗室疏属，其继位的法统性在初期曾受质疑', 'medium', 6),
            window.GameTypes.createHint('jin-yuandi-hint-8', '他是琅琊王，司马懿的曾孙，属于西晋宗室的远支', 'medium', 7),
            
            // 简单提示词
            window.GameTypes.createHint('jin-yuandi-hint-9', '他在西晋灭亡后，依赖王导、王敦兄弟为首的北方侨姓士族的拥戴，在建康（今南京）即位', 'easy', 8),
            window.GameTypes.createHint('jin-yuandi-hint-10', '他曾因猜忌手握重兵的王敦，引发“王敦之乱”，一度被王敦软禁', 'easy', 9),
            window.GameTypes.createHint('jin-yuandi-hint-11', '他即位后，北方陷入了“五胡十六国”的混乱时期', 'easy', 10),
            window.GameTypes.createHint('jin-yuandi-hint-12', '东晋王朝的统治基础是“门阀政治”，皇权受到高门士族的极大制约', 'easy', 11)
        ]
    ));

    // 22. 苻坚
    emperors.push(window.GameTypes.createEmperor(
        'qin-shizu',
        '苻坚',
        '前秦世祖',
        '秦宣昭帝',
        ['皇始，永兴，甘露，建元'],
        '五胡十六国',
        357,
        385,
        [
            // 困难提示词
            window.GameTypes.createHint('qin-shizu-hint-1', '他是一位少数民族出身的君主，但在治国上积极推行汉化，重用汉人儒生', 'hard', 0),
            window.GameTypes.createHint('qin-shizu-hint-2', '他通过政变（杀暴君）上位，掌权后迅速稳定了内部，并开创了盛世', 'hard', 1),
            window.GameTypes.createHint('qin-shizu-hint-3', '他以宽容和信任著称，对投降或被征服的其他民族首领和敌国宗室都给予优待和重用', 'hard', 2),
            
            // 中等提示词
            window.GameTypes.createHint('qin-shizu-hint-4', '他统治的帝国疆域辽阔，一度统一了整个中国北方，是十六国时期最接近统一的君主', 'medium', 3),
            window.GameTypes.createHint('qin-shizu-hint-5', '他在一场决定性的南征战役中，因一着不慎，遭遇了历史上著名的以少胜多的惨败', 'medium', 4),
            window.GameTypes.createHint('qin-shizu-hint-6', '他非常尊重和信任一位出身贫寒但才华横溢的汉人宰相，几乎言听计从', 'medium', 5),
            
            // 简单提示词
            window.GameTypes.createHint('qin-shizu-hint-7', '他战败后，原本统一的帝国迅速分崩离析，他本人也被背叛的部将所杀', 'easy', 6),
            window.GameTypes.createHint('qin-shizu-hint-8', '他在著名的 “淝水之战” 中，率领绝对优势兵力，败给了东晋的北府兵', 'easy', 7),
            window.GameTypes.createHint('qin-shizu-hint-9', '风声鹤唳，草木皆兵 是因他的军队溃败而产生的成语', 'easy', 8),
            window.GameTypes.createHint('qin-shizu-hint-10', '他的宰相是王猛', 'easy', 9)
        ]
    ));

    // 23. 拓跋焘
    emperors.push(window.GameTypes.createEmperor(
        'beiwei-taiwudi',
        '拓跋焘',
        '北魏世祖',
        '魏太武帝',
        ['始光'],
        '南北朝',
        424,
        452,
        [
            // 困难提示词
            window.GameTypes.createHint('beiwei-taiwudi-hint-1', '他统治时期，帝国的疆域向北扩张至大漠，向南推进至江淮，国势达到顶峰', 'hard', 0),
            window.GameTypes.createHint('beiwei-taiwudi-hint-2', '他早期尊奉一位来自草原的原始宗教为国教，并依此制定了政治礼仪', 'hard', 1),
            window.GameTypes.createHint('beiwei-taiwudi-hint-3', '他晚年性情变得暴戾多疑，因一场未遂的宫廷政变而大规模诛杀朝臣，酿成惨案', 'hard', 2),
            
            // 中等提示词
            window.GameTypes.createHint('beiwei-taiwudi-hint-4', '他十分信任和重用一位来自南朝的汉族士人，让他负责重要的国史编纂工作，但最终却因此人修史“暴扬国恶”而将其处死，并牵连众多', 'medium', 3),
            window.GameTypes.createHint('beiwei-taiwudi-hint-5', '他曾发动针对北方柔然汗国的大规模远征，并取得了决定性胜利', 'medium', 4),
            window.GameTypes.createHint('beiwei-taiwudi-hint-6', '他下令灭佛，拆毁寺庙，焚烧经像，强制僧人还俗，是中国历史上“三武一宗”灭佛事件的第一次', 'medium', 5),
            window.GameTypes.createHint('beiwei-taiwudi-hint-7', '他最终被身边最亲近的宦官所弑杀', 'medium', 6),
            
            // 简单提示词
            window.GameTypes.createHint('beiwei-taiwudi-hint-8', '他是北魏的第三位皇帝，在位期间统一了北方', 'easy', 7),
            window.GameTypes.createHint('beiwei-taiwudi-hint-9', '他南征刘宋，兵锋直达长江北岸的瓜步山，迫使宋文帝刘义隆议和', 'easy', 8),
            window.GameTypes.createHint('beiwei-taiwudi-hint-10', '他被宦官宗爱（中常侍）弑杀', 'easy', 9),
            window.GameTypes.createHint('beiwei-taiwudi-hint-11', '他的孙子北魏孝文帝拓跋宏是历史上著名的改革家', 'easy', 10)
        ]
    ));

    // 24. 刘裕
    emperors.push(window.GameTypes.createEmperor(
        'nanchaosong-wudi',
        '刘裕',
        '宋高祖',
        '宋武帝',
        ['永初'],
        '南北朝',
        420,
        422,
        [
            // 困难提示词
            window.GameTypes.createHint('nanchaosong-wudi-hint-1', '他是中国历史上出身最卑微的皇帝之一，早年以卖草鞋、捕鱼、砍柴、做小贩为生', 'hard', 0),
            window.GameTypes.createHint('nanchaosong-wudi-hint-2', '他通过卓越的军功，从一名普通士兵最终成长为权倾朝野的权臣，并最终取代了旧王朝', 'hard', 1),
            window.GameTypes.createHint('nanchaosong-wudi-hint-3', '他曾两次大规模北伐，收复了长安、洛阳等故都，但最终因后方不稳而未能巩固成果', 'hard', 2),
            
            // 中等提示词
            window.GameTypes.createHint('nanchaosong-wudi-hint-4', '他出身于北府兵，这支军队曾创造过一场以少胜多的著名战役胜利', 'medium', 3),
            window.GameTypes.createHint('nanchaosong-wudi-hint-5', '他在掌权后，先后消灭了多个在南方割据的政权和军阀，巩固了权力', 'medium', 4),
            window.GameTypes.createHint('nanchaosong-wudi-hint-6', '他通过“义熙土断”政策，清理户籍，增加朝廷赋税收入，抑制豪强', 'medium', 5),
            window.GameTypes.createHint('nanchaosong-wudi-hint-7', '他先后攻灭了南方的谯蜀和卢循、刘毅、司马休之等割据势力', 'medium', 6),
            
            // 简单提示词
            window.GameTypes.createHint('nanchaosong-wudi-hint-8', '他代晋自立，迫使晋恭帝司马德文禅位，开启了南北朝对峙的“南朝”时代', 'easy', 7),
            window.GameTypes.createHint('nanchaosong-wudi-hint-9', '他的小名叫 “刘寄奴” ，后来这也成了一味活血化瘀中药的名称', 'easy', 8),
            window.GameTypes.createHint('nanchaosong-wudi-hint-10', '他在掌权初期，平定了权臣桓玄的篡位之乱，再造晋室，从而树立了威望', 'easy', 9),
            window.GameTypes.createHint('nanchaosong-wudi-hint-11', '他因出身寒微，被对手称为 “田舍翁” （乡巴佬）', 'easy', 10)
        ]
    ));

    // 25. 陈霸先
    emperors.push(window.GameTypes.createEmperor(
        'chen-wudi',
        '陈霸先',
        '陈高祖',
        '陈武帝',
        ['永定'],
        '南北朝',
        557,
        559,
        [
            // 困难提示词
            window.GameTypes.createHint('chen-wudi-hint-1', '非大一统王朝的皇帝', 'hard', 0),
            window.GameTypes.createHint('chen-wudi-hint-2', '在位3年', 'hard', 1),
            window.GameTypes.createHint('chen-wudi-hint-3', '他出身寒微，并非高门士族，而是从地方小吏和低阶武官凭借军功逐步崛起', 'hard', 2),
            window.GameTypes.createHint('chen-wudi-hint-4', '他在登基前，与另一位权臣共同拥立宗室，后又因政见不合将其攻杀，从而独揽大权', 'hard', 3),
            
            // 中等提示词
            window.GameTypes.createHint('chen-wudi-hint-5', '他的主要功绩是在一场导致南朝社会崩溃的大动乱后，稳定了江南局势，重建了汉人政权', 'medium', 4),
            window.GameTypes.createHint('chen-wudi-hint-6', '他建立的王朝虽然弱小且短命，但在文化上成为保存和延续华夏正统的重要一环', 'medium', 5),
            window.GameTypes.createHint('chen-wudi-hint-7', '他在侯景之乱后崛起，先是平定侯景之乱，后又与王僧辩共同辅政', 'medium', 6),
            window.GameTypes.createHint('chen-wudi-hint-8', '他击退了北齐的南侵，在保卫建康的战斗中取得了胜利，稳固了政权', 'medium', 7),
            
            // 简单提示词
            window.GameTypes.createHint('chen-wudi-hint-9', '陈朝在他的孙子陈叔宝（陈后主）手中被隋朝灭亡', 'easy', 8),
            window.GameTypes.createHint('chen-wudi-hint-10', '他接手的是南朝版图最小、国力最弱的江山', 'easy', 9),
            window.GameTypes.createHint('chen-wudi-hint-11', '他死后由侄子陈文帝陈蒨继位', 'easy', 10),
            window.GameTypes.createHint('chen-wudi-hint-12', '他的陵墓位于今南京，称为万安陵，在隋灭陈后遭到破坏', 'easy', 11)
        ]
    ));

    // 26. 高欢
    emperors.push(window.GameTypes.createEmperor(
        'beiqi-shenwudi',
        '高欢',
        '北齐高祖',
        '齐神武帝',
        ['无年号'],
        '南北朝',
        534,
        547,
        [
            // 困难提示词
            window.GameTypes.createHint('beiqi-shenwudi-hint-1', '非大一统王朝皇帝', 'hard', 0),
            window.GameTypes.createHint('beiqi-shenwudi-hint-2', '他与一生的劲敌之间爆发过多次大战，其中最著名的一战极为惨烈，但未能决出胜负', 'hard', 1),
            window.GameTypes.createHint('beiqi-shenwudi-hint-3', '他统治的核心集团是“怀朔豪杰”，并依靠六镇鲜卑军人作为武力基础', 'hard', 2),
            
            // 中等提示词
            window.GameTypes.createHint('beiqi-shenwudi-hint-4', '他是一位出身怀朔镇的鲜卑化汉人，早年是北魏边镇的一名低级军官', 'medium', 3),
            window.GameTypes.createHint('beiqi-shenwudi-hint-5', '他最初加入了一支反抗北魏中央的六镇起义军，并逐渐成为其领袖之一', 'medium', 4),
            window.GameTypes.createHint('beiqi-shenwudi-hint-6', '他通过计谋和联姻，收编了另一支强大的起义军（葛荣部）的残余力量，壮大了自己的势力', 'medium', 5),
            
            // 简单提示词
            window.GameTypes.createHint('beiqi-shenwudi-hint-7', '他晚年出兵攻打西魏的军事重镇，却久攻不克，自己也在军中患病，最终含恨而死', 'easy', 6),
            window.GameTypes.createHint('beiqi-shenwudi-hint-8', '他去世后，其长子继承了权位，但不久后就被弟弟取代，后者建立了新的王朝', 'easy', 7),
            window.GameTypes.createHint('beiqi-shenwudi-hint-9', '他的妻子娄昭君是一位极具政治眼光和能力的女性，为他创业提供了巨大帮助', 'easy', 8),
            window.GameTypes.createHint('beiqi-shenwudi-hint-10', '著名的敕勒民歌 《敕勒歌》 (“天苍苍，野茫茫……”) 是在他的宴会上，由部将斛律金演唱的', 'easy', 9)
        ]
    ));

    // 27. 宇文泰
    emperors.push(window.GameTypes.createEmperor(
        'beizhou-wendi',
        '宇文泰',
        '北周太祖',
        '北周文帝',
        ['无年号'],
        '南北朝',
        535,
        556,
        [
            // 困难提示词
            window.GameTypes.createHint('beizhou-wendi-hint-1', '他在一场决定性的关中之战中，击败了当时的关中军阀，从而获得了立足之地', 'hard', 0),
            window.GameTypes.createHint('beizhou-wendi-hint-2', '他进行了一系列深刻而系统的改革，建立了一套全新的军事、政治和经济制度，使其政权由弱变强', 'hard', 1),
            window.GameTypes.createHint('beizhou-wendi-hint-3', '他重用汉族士人苏绰，进行政治经济改革，如制定记账、户籍之法', 'hard', 2),
            
            // 中等提示词
            window.GameTypes.createHint('beizhou-wendi-hint-4', '他出身于北魏的边防军镇（武川镇），与他的劲敌出身于同一地域集团（六镇）', 'medium', 3),
            window.GameTypes.createHint('beizhou-wendi-hint-5', '他接收并整合了北魏孝武帝西逃带来的部分洛阳朝廷班底，为其政权赋予了政治正统性', 'medium', 4),
            window.GameTypes.createHint('beizhou-wendi-hint-6', '他统治的区域地狭民贫，军事与经济实力起初远不如东面的对手', 'medium', 5),
            
            // 简单提示词
            window.GameTypes.createHint('beizhou-wendi-hint-7', '他创立了影响深远的 “府兵制” ，将军事力量中央化、部落化，成为后世王朝兵制的基础', 'easy', 6),
            window.GameTypes.createHint('beizhou-wendi-hint-8', '他一生最大的对手是东魏的权臣高欢', 'easy', 7),
            window.GameTypes.createHint('beizhou-wendi-hint-9', '他死后，其侄子宇文护逼迫西魏恭帝禅让，立其子宇文觉为天王，建立北周', 'easy', 8),
            window.GameTypes.createHint('beizhou-wendi-hint-10', '他建立了 “关陇集团” 的核心——八柱国十二大将军体系', 'easy', 9)
        ]
    ));

    // 28. 杨广
    emperors.push(window.GameTypes.createEmperor(
        'sui-yangdi',
        '杨广',
        '隋世祖',
        '隋炀帝',
        ['大业'],
        '隋朝',
        604,
        618,
        [
            // 困难提示词
            window.GameTypes.createHint('sui-yangdi-hint-1', '他是一位才华横溢的皇帝，诗文、建筑、战略均有很高的造诣，但性格好大喜功，急于求成', 'hard', 0),
            window.GameTypes.createHint('sui-yangdi-hint-2', '他统治时期，帝国的疆域在西北和东南方向都有所拓展', 'hard', 1),
            window.GameTypes.createHint('sui-yangdi-hint-3', '他改变了其父确立的选拔官员的制度，正式设立了“进士科”，常被视作科举制的正式开端', 'hard', 2),
            
            // 中等提示词
            window.GameTypes.createHint('sui-yangdi-hint-4', '他在位期间，修建了贯通南北的大动脉，这项工程利弊参半，深刻地影响了后世', 'medium', 3),
            window.GameTypes.createHint('sui-yangdi-hint-5', '他发动了针对北方强敌的多次大规模远征，但损失惨重，未能达成战略目标', 'medium', 4),
            window.GameTypes.createHint('sui-yangdi-hint-6', '他在位后期，全国各地爆发了大规模的农民起义，社会陷入动荡', 'medium', 5),
            
            // 简单提示词
            window.GameTypes.createHint('sui-yangdi-hint-7', '唐朝平定江南后，将其改葬于雷塘，陵墓荒芜，有诗云：“君王忍把平陈业，只换雷塘数亩田。”', 'easy', 6),
            window.GameTypes.createHint('sui-yangdi-hint-8', '他下令开凿了隋唐大运河（沟通南北的永济渠、通济渠、邗沟、江南河）', 'easy', 7),
            window.GameTypes.createHint('sui-yangdi-hint-9', '他三征高句丽，动用兵力数百万，均遭惨败，成为隋朝灭亡的直接导火索', 'easy', 8),
            window.GameTypes.createHint('sui-yangdi-hint-10', '他被叛军宇文化及等人缢杀于江都', 'easy', 9)
        ]
    ));

    // 29. 李渊
    emperors.push(window.GameTypes.createEmperor(
        'tang-gaozu',
        '李渊',
        '唐高祖',
        '唐太武帝',
        ['武德'],
        '唐朝',
        618,
        626,
        [
            // 困难提示词
            window.GameTypes.createHint('tang-gaozu-hint-1', '他是前朝皇室的姨表兄弟', 'hard', 0),
            window.GameTypes.createHint('tang-gaozu-hint-2', '他在天下大乱、群雄并起时，被任命为军事重镇的留守，拥有举兵的实力和机会', 'hard', 1),
            window.GameTypes.createHint('tang-gaozu-hint-3', '他的起兵过程并非一帆风顺，曾遭遇内部反对和外部强敌的压制', 'hard', 2),
            window.GameTypes.createHint('tang-gaozu-hint-4', '他在称帝后，政权仍面临来自多个强大割据势力的军事威胁', 'hard', 3),
            
            // 中等提示词
            window.GameTypes.createHint('tang-gaozu-hint-5', '他的几个儿子都非常出色，在统一战争中立下了赫赫战功，但也因此引发了激烈的内部矛盾', 'medium', 4),
            window.GameTypes.createHint('tang-gaozu-hint-6', '他晚年被迫让出最高权力，成为“太上皇”，在相对孤寂中度过了余生', 'medium', 5),
            window.GameTypes.createHint('tang-gaozu-hint-7', '他在历史记载中的形象，常被其光芒万丈的儿子的功绩所掩盖', 'medium', 6),
            
            // 简单提示词
            window.GameTypes.createHint('tang-gaozu-hint-8', '他在太原起兵，并成功地迅速西进占领了都城长安', 'easy', 7),
            window.GameTypes.createHint('tang-gaozu-hint-9', '他在位期间，主要依靠儿子李世民、李建成、李元吉等率军进行统一战争，平定了薛举、李轨、刘武周、王世充、窦建德等割据势力', 'easy', 8),
            window.GameTypes.createHint('tang-gaozu-hint-10', '他的皇后是窦氏（太穆皇后），在他起兵前去世', 'easy', 9),
            window.GameTypes.createHint('tang-gaozu-hint-11', '他退位后，基本不再过问政事，于贞观九年去世', 'easy', 10)
        ]
    ));

    // 30. 朱温
    emperors.push(window.GameTypes.createEmperor(
        'houliang-taizu',
        '朱温',
        '后梁太祖',
        '神武元圣孝皇帝',
        ['开平，乾化'],
        '五代十国',
        907,
        912,
        [
            // 困难提示词
            window.GameTypes.createHint('houliang-taizu-hint-1', '他为人狡诈多疑，残酷好杀，对待部下和敌人均手段狠辣', 'hard', 0),
            window.GameTypes.createHint('houliang-taizu-hint-2', '他在称帝前，与另一位强大的北方军阀进行了长期的争霸战争', 'hard', 1),
            window.GameTypes.createHint('houliang-taizu-hint-3', '他晚年因继承人问题陷入混乱，导致父子相残、朝政动荡', 'hard', 2),
            
            // 中等提示词
            window.GameTypes.createHint('houliang-taizu-hint-4', '他最初是唐末一场大规模农民起义军的重要将领，后叛变降唐，反过来成为镇压起义的主力', 'medium', 3),
            window.GameTypes.createHint('houliang-taizu-hint-5', '他以节度使身份，通过不断征战和权术，成为晚唐最强大的藩镇军阀之一', 'medium', 4),
            window.GameTypes.createHint('houliang-taizu-hint-6', '他建立的王朝国祚短暂，在历史上评价极低', 'medium', 5),
            
            // 简单提示词
            window.GameTypes.createHint('houliang-taizu-hint-7', '他最终被自己的亲生儿子所弑杀', 'easy', 6),
            window.GameTypes.createHint('houliang-taizu-hint-8', '他原名朱全忠，降唐后由唐僖宗赐名，称帝后改名朱晃', 'easy', 7),
            window.GameTypes.createHint('houliang-taizu-hint-9', '他早年是 黄巢起义军 的将领，后叛变归附唐朝，被任命为宣武军节度使', 'easy', 8),
            window.GameTypes.createHint('houliang-taizu-hint-10', '他的政权在与李克用之子李存勖（后唐庄宗）的战争中最终灭亡', 'easy', 9)
        ]
    ));

    // 31. 李存勖
    emperors.push(window.GameTypes.createEmperor(
        'houtang-zhuangzong',
        '李存勖',
        '后唐庄宗',
        '光圣神闵孝皇帝',
        ['同光'],
        '五代十国',
        923,
        926,
        [
            // 困难提示词
            window.GameTypes.createHint('houtang-zhuangzong-hint-1', '他继承父业时年仅二十四岁，在父亲灵前接过三支箭，立志完成三大遗愿', 'hard', 0),
            window.GameTypes.createHint('houtang-zhuangzong-hint-2', '他文武双全，勇猛过人，常在阵前亲自冲锋陷阵', 'hard', 1),
            window.GameTypes.createHint('houtang-zhuangzong-hint-3', '他在极端不利的形势下，以长途奔袭、出奇制胜的战术，完成了一场关键的战役，彻底扭转了与宿敌的强弱态势', 'hard', 2),
            
            // 中等提示词
            window.GameTypes.createHint('houtang-zhuangzong-hint-4', '他是沙陀族人，其父是唐朝赐姓的宗室亲王，以勇猛善战、忠于唐朝闻名', 'medium', 3),
            window.GameTypes.createHint('houtang-zhuangzong-hint-5', '他酷爱戏曲，精通音律，常与伶人（戏曲演员）一起演戏，并予以高官厚禄，甚至参与其妆扮', 'medium', 4),
            window.GameTypes.createHint('houtang-zhuangzong-hint-6', '他建国后迅速志得意满，沉迷享乐和打猎，疏于朝政', 'medium', 5),
            
            // 简单提示词
            window.GameTypes.createHint('houtang-zhuangzong-hint-7', '他定都洛阳，国号沿用“唐”，史称后唐，以示继承唐朝正统', 'easy', 6),
            window.GameTypes.createHint('houtang-zhuangzong-hint-8', '他因猜忌而冤杀了大将郭崇韬和朱友谦，导致人心离散', 'easy', 7),
            window.GameTypes.createHint('houtang-zhuangzong-hint-9', '他死于兴教门之变，叛军首领是伶人出身的将领郭从谦', 'easy', 8),
            window.GameTypes.createHint('houtang-zhuangzong-hint-10', '著名史学家欧阳修在《新五代史·伶官传序》中，以他的兴衰作为“忧劳可以兴国，逸豫可以亡身”的经典例证', 'easy', 9)
        ]
    ));

    // 32. 石敬瑭
    emperors.push(window.GameTypes.createEmperor(
        'houjin-gaozu',
        '石敬瑭',
        '后晋高祖',
        '圣文章武明德孝皇帝',
        ['天福'],
        '五代十国',
        936,
        942,
        [
            // 困难提示词
            window.GameTypes.createHint('houjin-gaozu-hint-1', '他是沙陀族人', 'hard', 0),
            window.GameTypes.createHint('houjin-gaozu-hint-2', '他在一场决定性的战役中，曾率少量骑兵突击，拯救了君主，从而获得极高信任', 'hard', 1),
            window.GameTypes.createHint('houjin-gaozu-hint-3', '他作为一方节度使，因受到末帝的猜忌和逼迫，最终选择举兵反叛', 'hard', 2),
            
            // 中等提示词
            window.GameTypes.createHint('houjin-gaozu-hint-4', '他在兵力不足的情况下，为求速胜，向北方一个强大的游牧帝国求援，并许以重诺', 'medium', 3),
            window.GameTypes.createHint('houjin-gaozu-hint-5', '他即位后，对援助他的北方政权恪守承诺，态度极为恭顺', 'medium', 4),
            window.GameTypes.createHint('houjin-gaozu-hint-6', '他割让的土地具有重要的战略价值，使得中原政权在后续数百年间丧失了防御北方的重要屏障', 'medium', 5),
            
            // 简单提示词
            window.GameTypes.createHint('houjin-gaozu-hint-7', '他认契丹皇帝耶律德光为父，当时他45岁，耶律德光34岁', 'easy', 6),
            window.GameTypes.createHint('houjin-gaozu-hint-8', '他割让的 “燕云十六州” （又称幽云十六州）是中原王朝防御北方骑兵的天然屏障', 'easy', 7),
            window.GameTypes.createHint('houjin-gaozu-hint-9', '他去世后，其侄（也是养子）石重贵继位，即后晋出帝', 'easy', 8),
            window.GameTypes.createHint('houjin-gaozu-hint-10', '他死后，后晋与契丹关系破裂，其陵墓（显陵）在战乱中被契丹破坏', 'easy', 9)
        ]
    ));

    // 33. 柴荣
    emperors.push(window.GameTypes.createEmperor(
        'houzhou-shizong',
        '柴荣',
        '周世宗',
        '睿武孝文皇帝',
        ['显德'],
        '五代十国',
        954,
        959,
        [
            // 困难提示词
            window.GameTypes.createHint('houzhou-shizong-hint-1', '他并非开国皇帝，却以其雄才大略和短暂的统治，为一个更长久的统一王朝铺平了道路', 'hard', 0),
            window.GameTypes.createHint('houzhou-shizong-hint-2', '他年轻时曾从事商业，走南闯北，对社会民情有深入了解', 'hard', 1),
            window.GameTypes.createHint('houzhou-shizong-hint-3', '他即位初期，面临北汉与契丹联合入侵的危机，他力排众议，御驾亲征并取得大捷，稳定了局势', 'hard', 2),
            
            // 中等提示词
            window.GameTypes.createHint('houzhou-shizong-hint-4', '他怀有“十年开拓天下，十年养百姓，十年致太平”的三十年宏伟规划', 'medium', 3),
            window.GameTypes.createHint('houzhou-shizong-hint-5', '他大力整顿军队，淘汰老弱，招募精锐，建立了一支战斗力强大的中央禁军', 'medium', 4),
            window.GameTypes.createHint('houzhou-shizong-hint-6', '他抑制佛教，下令毁佛铸钱，以增加国家财富和兵源', 'medium', 5),
            
            // 简单提示词
            window.GameTypes.createHint('houzhou-shizong-hint-7', '他是后周太祖郭威的养子（内侄），因郭威诸子被杀而被立为储君', 'easy', 6),
            window.GameTypes.createHint('houzhou-shizong-hint-8', '他英年早逝（39岁），幼子柴宗训（恭帝）即位，不久发生“陈桥兵变”，赵匡胤建立宋朝', 'easy', 7),
            window.GameTypes.createHint('houzhou-shizong-hint-9', '他在位虽短，但政绩卓著，史称 “世宗改革”，为北宋统一奠定了基础', 'easy', 8),
            window.GameTypes.createHint('houzhou-shizong-hint-10', '他是五代时期最有作为的皇帝之一，被称为“五代第一明君”', 'easy', 9)
        ]
    ));

    // 34. 赵佶
    emperors.push(window.GameTypes.createEmperor(
        'song-huizong',
        '赵佶',
        '宋徽宗',
        '体神合道骏烈逊功圣文仁德宪慈显孝皇帝',
        ['建中靖国'],
        '北宋',
        1100,
        1126,
        [
            // 困难提示词
            window.GameTypes.createHint('song-huizong-hint-1', '他极为信奉道教，不仅在全国大建宫观，还给自己上了一个带有浓厚道教色彩的尊号', 'hard', 0),
            window.GameTypes.createHint('song-huizong-hint-2', '他曾与北方新兴的强权结成军事同盟，意图共同对付一个旧敌，但这一策略最终引狼入室', 'hard', 1),
            window.GameTypes.createHint('song-huizong-hint-3', '他的收藏癖好不仅限于艺术品，还曾组织编纂了规模宏大的书画和古物图谱', 'hard', 2),
            
            // 中等提示词
            window.GameTypes.createHint('song-huizong-hint-4', '他在位期间，朝政被几位以艺术投机或特殊技能（如蹴鞠）获宠的大臣把持，政治腐败', 'medium', 3),
            window.GameTypes.createHint('song-huizong-hint-5', '当外敌兵临城下时，他选择的应对方式是将皇位匆匆传给儿子，自己退居太上皇', 'medium', 4),
            window.GameTypes.createHint('song-huizong-hint-6', '他的人生结局极为凄惨，与继承人一同被俘，受尽屈辱，最终病死于遥远的北方异乡', 'medium', 5),
            
            // 简单提示词
            window.GameTypes.createHint('song-huizong-hint-7', '他下令运送奇石的花石纲，直接激化了社会矛盾，引发了方腊、宋江等大规模起义', 'easy', 6),
            window.GameTypes.createHint('song-huizong-hint-8', '他独创的书法被称为 “瘦金体” ，直到今天仍被广泛称道和模仿', 'easy', 7),
            window.GameTypes.createHint('song-huizong-hint-9', '他与金国订立 “海上之盟” ，联合灭辽，但在此后金军立刻南下攻宋', 'easy', 8),
            window.GameTypes.createHint('song-huizong-hint-10', '次年的 “靖康之变” 中，他与钦宗一同被金人俘虏北去，史称“靖康之耻”', 'easy', 9)
        ]
    ));

    // 35. 赵构
    emperors.push(window.GameTypes.createEmperor(
        'song-gaozong',
        '赵构',
        '宋高宗',
        '受命中兴全功至德圣神武文昭仁宪孝皇帝',
        ['建炎，绍兴'],
        '南宋',
        1127,
        1162,
        [
            // 困难提示词
            window.GameTypes.createHint('song-gaozong-hint-1', '他在位初期，曾被强大的敌军追击，一度漂泊海上避难，处境非常狼狈', 'hard', 0),
            window.GameTypes.createHint('song-gaozong-hint-2', '他虽曾重用主战派将领，但内心深处始终倾向于妥协求和，为此甚至不惜打压主战派', 'hard', 1),
            window.GameTypes.createHint('song-gaozong-hint-3', '他为了与北方强权达成和议，不惜接受极其屈辱的条件，包括向对方称臣', 'hard', 2),
            window.GameTypes.createHint('song-gaozong-hint-4', '他一生中没有亲生的儿子来继承皇位，皇位最终传给了养子', 'hard', 3),
            
            // 中等提示词
            window.GameTypes.createHint('song-gaozong-hint-5', '他是在王朝都城沦陷、父兄被俘的亡国危机中，于外地仓促重建政权并即位的', 'medium', 4),
            window.GameTypes.createHint('song-gaozong-hint-6', '他将一位中兴名将下狱并处死，这一事件成为史上著名的冤案，也是其政治生涯的最大污点', 'medium', 5),
            window.GameTypes.createHint('song-gaozong-hint-7', '他在位后期，主动将皇位禅让给养子，自己退居幕后当了很长时间的太上皇，但仍掌握实权', 'medium', 6),
            window.GameTypes.createHint('song-gaozong-hint-8', '他以长寿著称，是中国历史上少数寿命超过八十岁的皇帝之一', 'medium', 7),
            
            // 简单提示词
            window.GameTypes.createHint('song-gaozong-hint-9', '他是宋徽宗赵佶的第九子，宋钦宗赵桓的弟弟，在靖康之变后即位', 'easy', 8),
            window.GameTypes.createHint('song-gaozong-hint-10', '他以“莫须有”的罪名杀害了岳飞，并与金国达成了屈辱的 《绍兴和议》', 'easy', 9),
            window.GameTypes.createHint('song-gaozong-hint-11', '他即位初期，曾南逃至扬州、建康（今南京），后定都临安（今杭州）。', 'easy', 10),
            window.GameTypes.createHint('song-gaozong-hint-12', '他任用主和派宰相秦桧，共同主导了对金国的议和', 'easy', 11)
        ]
    ));

    // 36. 赵昚
    emperors.push(window.GameTypes.createEmperor(
        'song-xiaozong',
        '赵昚',
        '宋孝宗',
        '绍统同道冠德昭功哲文神武明圣成孝皇帝',
        ['隆兴'],
        '南宋',
        1162,
        1189,
        [
            // 困难提示词
            window.GameTypes.createHint('song-xiaozong-hint-1', '他是开国皇帝养子的养子，与前任皇帝（也是养父）的血缘关系较远，但以“孝”闻名', 'hard', 0),
            window.GameTypes.createHint('song-xiaozong-hint-2', '他即位后，立即召见因主战而被贬的旧臣，并驱逐了长期专权的奸臣党羽', 'hard', 1),
            window.GameTypes.createHint('song-xiaozong-hint-3', '他一生壮志未酬，去世前还在询问前线战况，临终遗诏也流露出未能收复故土的遗憾', 'hard', 2),
            
            // 中等提示词
            window.GameTypes.createHint('song-xiaozong-hint-4', '他是南宋最有作为的皇帝，立志恢复中原，继位之初便着手为之前的政治冤案平反', 'medium', 3),
            window.GameTypes.createHint('song-xiaozong-hint-5', '北伐失利后，他被迫与金国再次签订和约，但这次和约将过去的屈辱“君臣关系”改为较为平等的“叔侄关系”。', 'medium', 4),
            window.GameTypes.createHint('song-xiaozong-hint-6', '他统治期间，重视农业生产，减轻赋税，社会相对安定，经济繁荣，被称为“乾淳之治”', 'medium', 5),
            window.GameTypes.createHint('song-xiaozong-hint-7', '他非常孝顺养父太上皇，尽管二人在北伐等重大国策上存在分歧，但他始终恪守孝道，定期问安', 'medium', 6),
            
            // 简单提示词
            window.GameTypes.createHint('song-xiaozong-hint-8', '他是南宋的第二位皇帝', 'easy', 7),
            window.GameTypes.createHint('song-xiaozong-hint-9', '他是宋太祖赵匡胤的七世孙，被宋高宗赵构收为养子并立为太子', 'easy', 8),
            window.GameTypes.createHint('song-xiaozong-hint-10', '他登基后，立即为岳飞平反昭雪，追复其官职，并以礼改葬', 'easy', 9),
            window.GameTypes.createHint('song-xiaozong-hint-11', '他任命主战派将领张浚发动北伐，史称 “隆兴北伐”', 'easy', 10)
        ]
    ));

    // 37. 朱棣
    emperors.push(window.GameTypes.createEmperor(
        'ming-chengzu',
        '朱棣',
        '明成祖',
        '启天弘道高明肇运圣武神功纯仁至孝文皇帝',
        ['永乐'],
        '明朝',
        1402,
        1424,
        [
            // 困难提示词
            window.GameTypes.createHint('ming-chengzu-hint-1', '他是通过起兵攻打自己的侄子，发动了一场持续数年的内战，最终成功夺取了皇位', 'hard', 0),
            window.GameTypes.createHint('ming-chengzu-hint-2', '他的年号寓意深远，象征着对长治久安、太平盛世的期望，也的确在其统治下得以实现', 'hard', 1),
            window.GameTypes.createHint('ming-chengzu-hint-3', '他将帝国的都城从南方迁到了自己的“龙兴之地”北平，并营建了宏伟的宫殿建筑群', 'hard', 2),
            
            // 中等提示词
            window.GameTypes.createHint('ming-chengzu-hint-4', '他下令编修了一部规模空前、汇集古今各类书籍的巨型类书，成为重要的文化遗产', 'medium', 3),
            window.GameTypes.createHint('ming-chengzu-hint-5', '他派遣一支庞大的舰队多次远航西洋，进行贸易、外交和展示国威的活动', 'medium', 4),
            window.GameTypes.createHint('ming-chengzu-hint-6', '他统治时期，帝国的北方边疆曾遭受一个蒙古部族的多次侵扰，他本人也多次率军亲征', 'medium', 5),
            
            // 简单提示词
            window.GameTypes.createHint('ming-chengzu-hint-7', '他最初被尊奉的庙号并非“祖”，而是“宗”，后世为彰显其再造之功而予以升格', 'easy', 6),
            window.GameTypes.createHint('ming-chengzu-hint-8', '他发动了 “靖难之役” ，攻破南京，从其侄建文帝朱允炆手中夺取了皇位', 'easy', 7),
            window.GameTypes.createHint('ming-chengzu-hint-9', '他派遣宦官郑和七次率领庞大船队下西洋，远达东非', 'easy', 8),
            window.GameTypes.createHint('ming-chengzu-hint-10', '他在东北地区设立 “奴儿干都司” ，在贵州推行 “改土归流” ，加强对边疆的管辖', 'easy', 9)
        ]
    ));

    // 38. 朱高炽
    emperors.push(window.GameTypes.createEmperor(
        'ming-renzong',
        '朱高炽',
        '明仁宗',
        '敬天体道纯诚至德弘文钦武章圣达孝昭皇帝',
        ['洪熙'],
        '明朝',
        1424,
        1425,
        [
            // 困难提示词
            window.GameTypes.createHint('ming-renzong-hint-1', '他的弟弟们一直对他的储位构成威胁，围绕皇位继承的斗争贯穿其父统治时期', 'hard', 0),
            window.GameTypes.createHint('ming-renzong-hint-2', '他赦免了因反对其父而被关押的大批官员，平反了一批冤案', 'hard', 1),
            window.GameTypes.createHint('ming-renzong-hint-3', '他的统治被视为从“武功”到“文治”的关键过渡', 'hard', 2),
            
            // 中等提示词
            window.GameTypes.createHint('ming-renzong-hint-4', '他是一位体型肥胖、行动不便，但性情宽厚的守成之君', 'medium', 3),
            window.GameTypes.createHint('ming-renzong-hint-5', '他只在位了10个月', 'medium', 4),
            window.GameTypes.createHint('ming-renzong-hint-6', '他去世时正值盛年，死因可能是突发的心脑血管疾病', 'medium', 5),
            
            // 简单提示词
            window.GameTypes.createHint('ming-renzong-hint-7', '他与其子明宣宗的统治时期被合称为 “仁宣之治” ，是明朝的黄金时期', 'easy', 6),
            window.GameTypes.createHint('ming-renzong-hint-8', '他下令停止郑和下西洋的宝船舰队活动，以节省开支', 'easy', 7),
            window.GameTypes.createHint('ming-renzong-hint-9', '他倚重的文官核心是 “三杨”（杨士奇、杨荣、杨溥）', 'easy', 8),
            window.GameTypes.createHint('ming-renzong-hint-10', '他猝死于钦安殿，其太子朱瞻基迅速从南京赶回北京继位', 'easy', 9)
        ]
    ));

    // 39. 朱瞻基
    emperors.push(window.GameTypes.createEmperor(
        'ming-xuanzong',
        '朱瞻基',
        '明宣宗',
        '宪天崇道英明神圣钦文昭武宽仁纯孝章皇帝',
        ['宣德'],
        '明朝',
        1425,
        1435,
        [
            // 困难提示词
            window.GameTypes.createHint('ming-xuanzong-hint-1', '他与他的父亲都是短命皇帝', 'hard', 0),
            window.GameTypes.createHint('ming-xuanzong-hint-2', '他是明朝鼎盛时期的君主，与其父的统治被并称为一代治世', 'hard', 1),
            window.GameTypes.createHint('ming-xuanzong-hint-3', '他对外仍保持积极姿态，曾率军巡边并击退蒙古侵扰，维护了北疆稳定', 'hard', 2),
            
            // 中等提示词
            window.GameTypes.createHint('ming-xuanzong-hint-4', '他继承皇位后不久，其皇叔便起兵反叛，他果断率军亲征并迅速平定了叛乱', 'medium', 3),
            window.GameTypes.createHint('ming-xuanzong-hint-5', '他统治时期，虽然停止了大规模的官方下西洋活动，但民间的海上贸易仍很活跃', 'medium', 4),
            window.GameTypes.createHint('ming-xuanzong-hint-6', '他是一位出色的画家，尤其擅长画鼠、兔、猫、犬等小动物，传世作品有《武侯高卧图》、《三阳开泰图》等', 'medium', 5),
            
            // 简单提示词
            window.GameTypes.createHint('ming-xuanzong-hint-7', '他是明朝的第五位皇帝', 'easy', 6),
            window.GameTypes.createHint('ming-xuanzong-hint-8', '他即位次年，其叔父汉王朱高煦效仿“靖难之役”起兵叛乱，史称 “高煦之乱”', 'easy', 7),
            window.GameTypes.createHint('ming-xuanzong-hint-9', '“好圣孙”', 'easy', 8),
            window.GameTypes.createHint('ming-xuanzong-hint-10', '他是明仁宗的儿子，明英宗的父亲', 'easy', 9)
        ]
    ));

    // 40. 朱祁镇
    emperors.push(window.GameTypes.createEmperor(
        'ming-yingzong',
        '朱祁镇',
        '明英宗',
        '法天立道仁明诚敬昭文宪武至德广孝睿皇帝',
        ['正统，天顺'],
        '明朝',
        1436,
        1449,
        [
            // 困难提示词
            window.GameTypes.createHint('ming-yingzong-hint-1', '他幼年登基，初期由祖母和贤臣辅政，但亲政后宠信宦官，导致朝政混乱', 'hard', 0),
            window.GameTypes.createHint('ming-yingzong-hint-2', '他通过一场精心策划的宫廷政变，成功复辟，夺回了皇位', 'hard', 1),
            window.GameTypes.createHint('ming-yingzong-hint-3', '他临终前做出了一项重要的制度性决定：废除宫妃殉葬制度', 'hard', 2),
            
            // 中等提示词
            window.GameTypes.createHint('ming-yingzong-hint-4', '他效仿先祖，试图通过一次大规模亲征来建立武功，结果却遭遇惨败，本人被俘', 'medium', 3),
            window.GameTypes.createHint('ming-yingzong-hint-5', '他曾经被俘，他在被俘期间，其弟被拥立为新君，他被尊为“太上皇”', 'medium', 4),
            window.GameTypes.createHint('ming-yingzong-hint-6', '他在位期间，帝国在西南边疆的统治遇到了重大挑战，爆发了大规模的土司叛乱', 'medium', 5),
            
            // 简单提示词
            window.GameTypes.createHint('ming-yingzong-hint-7', '他因在土木堡之变中被瓦剌俘虏，而成为明朝乃至中国历史上罕见的被俘皇帝', 'easy', 6),
            window.GameTypes.createHint('ming-yingzong-hint-8', '他通过夺门之变（又称“南宫复辟”）成功复位，废黜了景泰帝', 'easy', 7),
            window.GameTypes.createHint('ming-yingzong-hint-9', '他复位后，杀害了在京师保卫战中立下大功的忠臣于谦，成为其政治生涯的最大污点', 'easy', 8),
            window.GameTypes.createHint('ming-yingzong-hint-10', '他宠信宦官王振，导致王振专权，是土木堡之变的重要诱因', 'easy', 9)
        ]
    ));

    // 41. 朱厚熜
    emperors.push(window.GameTypes.createEmperor(
        'ming-shizong',
        '朱厚熜',
        '明世宗',
        '钦天履道英毅神圣宣文广武洪仁大孝肃皇帝',
        ['嘉靖'],
        '明朝',
        1521,
        1567,
        [
            // 困难提示词
            window.GameTypes.createHint('ming-shizong-hint-1', '他的父亲没当过皇帝', 'hard', 0),
            window.GameTypes.createHint('ming-shizong-hint-2', '他痴迷于道教炼丹术，追求长生不老', 'hard', 1),
            window.GameTypes.createHint('ming-shizong-hint-3', '他为人极其聪明，刚愎自用且猜忌心重', 'hard', 2),
            window.GameTypes.createHint('ming-shizong-hint-4', '他个哥哥是皇帝', 'hard', 3),
            
            // 中等提示词
            window.GameTypes.createHint('ming-shizong-hint-5', '他在位期间，东南沿海倭寇之患极为严重，直到后期才被名将基本平定', 'medium', 4),
            window.GameTypes.createHint('ming-shizong-hint-6', '他即位后发动 “大礼议” ，追尊生父兴献王为皇帝，并打击反对派朝臣', 'medium', 5),
            window.GameTypes.createHint('ming-shizong-hint-7', '他崇信道教，宠信道士邵元节、陶仲文，并自封道号', 'medium', 6),
            
            // 简单提示词
            window.GameTypes.createHint('ming-shizong-hint-8', '他沉迷于用严酷的权术驾驭臣下，导致首辅严嵩专权乱政、贪腐横行达二十年之久', 'easy', 7),
            window.GameTypes.createHint('ming-shizong-hint-9', '东南倭寇猖獗，他任用胡宗宪、戚继光、俞大猷等将领予以平定', 'easy', 8),
            window.GameTypes.createHint('ming-shizong-hint-10', '著名清官海瑞曾抬棺上疏，激烈批评他的昏庸，其奏疏名为《治安疏》（俗称“骂皇帝的奏折”）', 'easy', 9),
            window.GameTypes.createHint('ming-shizong-hint-11', '他是明朝的第十一位皇帝', 'easy', 10)
        ]
    ));

    // 42. 朱翊钧
    emperors.push(window.GameTypes.createEmperor(
        'ming-shenzong',
        '朱翊钧',
        '明神宗',
        '范天合道哲肃敦简光文章武安仁止孝显皇帝',
        ['万历'],
        '明朝',
        1572,
        1620,
        [
            // 困难提示词
            window.GameTypes.createHint('ming-shenzong-hint-1', '他即位时年仅十岁，由母亲和能臣辅政，开创了王朝后期的一段中兴局面', 'hard', 0),
            window.GameTypes.createHint('ming-shenzong-hint-2', '他统治的中期以后，因与朝臣在继承人问题上激烈对立，开始长期消极怠政，深居宫中不出', 'hard', 1),
            window.GameTypes.createHint('ming-shenzong-hint-3', '他近三十年不举行朝会、不接见大臣、不批阅奏章，导致中枢机构近乎瘫痪，官职空缺也不补任', 'hard', 2),
            
            // 中等提示词
            window.GameTypes.createHint('ming-shenzong-hint-4', '他统治后期，一个新兴的政权在东北崛起，并在一场关键战役中击败了王朝军队，成为严重边患', 'medium', 3),
            window.GameTypes.createHint('ming-shenzong-hint-5', '他的长期怠政被视为明朝走向衰亡的关键转折点，后世史家有“明实亡于万历”的论断', 'medium', 4),
            window.GameTypes.createHint('ming-shenzong-hint-6', '他的内阁首辅死后，他清算这个首辅，废除不少新政，并开始长期怠政', 'medium', 5),
            
            // 简单提示词
            window.GameTypes.createHint('ming-shenzong-hint-7', '前十年由内阁首辅张居正推行改革', 'easy', 6),
            window.GameTypes.createHint('ming-shenzong-hint-8', '他在位后期，女真族领袖努尔哈赤在东北崛起，并于萨尔浒之战中大败明军', 'easy', 7),
            window.GameTypes.createHint('ming-shenzong-hint-9', '他是明朝在位时间最长（48年）且最懒的皇帝，近三十年不上朝', 'easy', 8),
            window.GameTypes.createHint('ming-shenzong-hint-10', '他是明光宗朱常洛的父亲，明熹宗朱由校的祖父', 'easy', 9)
        ]
    ));

    // 43. 朱由检
    emperors.push(window.GameTypes.createEmperor(
        'ming-sizong',
        '朱由检',
        '明思宗',
        '绍天绎道刚明恪俭揆文奋武敦仁懋孝烈皇帝',
        ['崇祯'],
        '明朝',
        1627,
        1644,
        [
            // 困难提示词
            window.GameTypes.createHint('ming-sizong-hint-1', '他即位后迅速清除了前朝把持朝政的权宦及其党羽，赢得了朝野赞誉', 'hard', 0),
            window.GameTypes.createHint('ming-sizong-hint-2', '他一生勤政，事必躬亲，经常工作到深夜，生活也较为节俭', 'hard', 1),
            window.GameTypes.createHint('ming-sizong-hint-3', '他的哥哥是昏君', 'hard', 2),
            
            // 中等提示词
            window.GameTypes.createHint('ming-sizong-hint-4', '他在王朝内忧外患、危机四伏的时刻登基，试图力挽狂澜，但最终失败', 'medium', 3),
            window.GameTypes.createHint('ming-sizong-hint-5', '他性格刚愎多疑，在位十七年间频繁更换内阁大臣和前线将帅，缺乏战略定力', 'medium', 4),
            window.GameTypes.createHint('ming-sizong-hint-6', '他面临两线作战的绝境：内部有席卷全国的农民起义，外部有不断入侵的关外强敌', 'medium', 5),
            window.GameTypes.createHint('ming-sizong-hint-7', '他在最后关头，拒绝了迁都南方的提议，决心死守都城', 'medium', 6),
            window.GameTypes.createHint('ming-sizong-hint-8', '当都城被攻破时，他选择了以身殉国，在自杀前还杀死了自己的妃嫔和女儿', 'medium', 7),
            
            // 简单提示词
            window.GameTypes.createHint('ming-sizong-hint-9', '他中了皇太极的反间计，冤杀了抗清名将、兵部尚书袁崇焕，自毁长城', 'easy', 8),
            window.GameTypes.createHint('ming-sizong-hint-10', '他统治时期，以李自成、张献忠为首的农民起义军势不可挡', 'easy', 9),
            window.GameTypes.createHint('ming-sizong-hint-11', '大明信王', 'easy', 10),
            window.GameTypes.createHint('ming-sizong-hint-12', '李自成在西安建立大顺政权后，于公元1644年攻破北京', 'easy', 11)
        ]
    ));

    // 44. 努尔哈赤
    emperors.push(window.GameTypes.createEmperor(
        'qing-taizu',
        '努尔哈赤',
        '清太祖',
        '承天广运圣德神功肇纪立极仁孝睿武端毅钦安弘文定业高皇帝',
        ['天命'],
        '清朝',
        1616,
        1626,
        [
            // 困难提示词
            window.GameTypes.createHint('qing-taizu-hint-1', '他创立了一种集军事、行政、生产于一体的社会组织制度，成为其政权强大的基础', 'hard', 0),
            window.GameTypes.createHint('qing-taizu-hint-2', '他命人以蒙古文字为基础，创制了本民族的第一种文字', 'hard', 1),
            window.GameTypes.createHint('qing-taizu-hint-3', '他在与一个强大部落的决战中，以少胜多，确立了在部中的霸主地位', 'hard', 2),
            
            // 中等提示词
            window.GameTypes.createHint('qing-taizu-hint-4', '他以祖父和父亲遗留的“十三副遗甲”起兵，开始统一女真各部的征程', 'medium', 3),
            window.GameTypes.createHint('qing-taizu-hint-5', '他正式建立政权，定国号、称大汗，与中原王朝分庭抗礼', 'medium', 4),
            window.GameTypes.createHint('qing-taizu-hint-6', '他在一场关键战役中，凭借集中兵力、各个击破的战术，大败兵力数倍于己的对手', 'medium', 5),
            
            // 简单提示词
            window.GameTypes.createHint('qing-taizu-hint-7', '他创建了 “八旗制度” （初为四旗，后扩为八旗）', 'easy', 6),
            window.GameTypes.createHint('qing-taizu-hint-8', '他命人创制了 “老满文” （无圈点满文）', 'easy', 7),
            window.GameTypes.createHint('qing-taizu-hint-9', '公元1616年，他在赫图阿拉称汗，建立 “大金” 政权，史称后金', 'easy', 8),
            window.GameTypes.createHint('qing-taizu-hint-10', '公元1619年，他在 “萨尔浒之战” 中，采取“凭尔几路来，我只一路去”的策略，大败明军四路进攻', 'easy', 9)
        ]
    ));

    // 45. 皇太极
    emperors.push(window.GameTypes.createEmperor(
        'qing-taizong',
        '皇太极',
        '清太宗',
        '应天兴国弘德彰武宽温仁圣睿孝敬敏昭定隆道显功文皇帝',
        ['天聪，崇德'],
        '清朝',
        1626,
        1643,
        [
            // 困难提示词
            window.GameTypes.createHint('qing-taizong-hint-1', '他并非以长子身份继位，而是在父亲去世后，通过贵族推举的方式成为新领袖', 'hard', 0),
            window.GameTypes.createHint('qing-taizong-hint-2', '他仿效中原王朝制度，设立国家机构，加强中央集权，削弱了传统贵族共议国政的权力', 'hard', 1),
            window.GameTypes.createHint('qing-taizong-hint-3', '他两次亲自率军出征，迫使东方的邻国臣服纳贡，解除了后顾之忧', 'hard', 2),
            
            // 中等提示词
            window.GameTypes.createHint('qing-taizong-hint-4', '他即位时，政权内外形势复杂：内部有兄弟争权的隐患，外部有三面强敌', 'medium', 3),
            window.GameTypes.createHint('qing-taizong-hint-5', '他更改了国号和族名，以消除历史上与本民族相关的负面记忆，并宣示夺取天下的雄心', 'medium', 4),
            window.GameTypes.createHint('qing-taizong-hint-6', '他正值盛年时突然无疾而终，死因成谜，其猝死引发了激烈的皇位争夺', 'medium', 5),
            
            // 简单提示词
            window.GameTypes.createHint('qing-taizong-hint-7', '他是清太祖努尔哈赤的第八子', 'easy', 6),
            window.GameTypes.createHint('qing-taizong-hint-8', '他仿明制设立六部、都察院、理藩院等中央机构', 'easy', 7),
            window.GameTypes.createHint('qing-taizong-hint-9', '他利用反间计，借明朝崇祯帝之手除掉了劲敌袁崇焕', 'easy', 8),
            window.GameTypes.createHint('qing-taizong-hint-10', '他在位期间，为清朝入主中原奠定了政治、军事和民族基础', 'easy', 9)
        ]
    ));

    // 46. 胤禛
    emperors.push(window.GameTypes.createEmperor(
        'qing-shizong',
        '胤禛',
        '清世宗',
        '敬天昌运建中表正文武英明宽仁信毅睿圣大孝至诚宪皇帝',
        ['雍正'],
        '清朝',
        1722,
        1735,
        [
            // 困难提示词
            window.GameTypes.createHint('qing-shizong-hint-1', '他是18世纪的皇帝', 'hard', 0),
            window.GameTypes.createHint('qing-shizong-hint-2', '他是通过激烈且疑云重重的皇位争夺战而最终继位的皇帝，其即位过程在历史上一直存在争议', 'hard', 1),
            window.GameTypes.createHint('qing-shizong-hint-3', '他在文化上实行高压政策，曾因文字狱而严厉处置一位与他争夺皇位的兄弟的支持者，并牵连甚广', 'hard', 2),
            window.GameTypes.createHint('qing-shizong-hint-4', '他勤政是出了名的，是个工作狂皇帝', 'hard', 3),
            
            // 中等提示词
            window.GameTypes.createHint('qing-shizong-hint-5', '他即位时已45岁，政治经验丰富，一改其父晚年的宽仁作风，以严猛、务实、勤政著称', 'medium', 4),
            window.GameTypes.createHint('qing-shizong-hint-6', '他设立了加强皇权的核心机构 “军机处”，取代了内阁和议政王大臣会议的地位', 'medium', 5),
            window.GameTypes.createHint('qing-shizong-hint-7', '他任命年羹尧、岳钟琪为将领，平定了青海蒙古罗卜藏丹津的叛乱', 'medium', 6),
            
            // 简单提示词
            window.GameTypes.createHint('qing-shizong-hint-8', '他的死因比较神秘，有被吕四娘刺杀的民间传说', 'easy', 7),
            window.GameTypes.createHint('qing-shizong-hint-9', '他是康熙的儿子，乾隆的父亲', 'easy', 8),
            window.GameTypes.createHint('qing-shizong-hint-10', '他在 “九子夺嫡” 的复杂斗争中胜出', 'easy', 9),
            window.GameTypes.createHint('qing-shizong-hint-11', '他严厉整顿八旗，惩治旗人中的纨绔子弟，并试图解决“八旗生计”问题', 'easy', 10)
        ]
    ));

    // 47. 载湉
    emperors.push(window.GameTypes.createEmperor(
        'qing-dezong',
        '载湉',
        '清德宗',
        '同天崇运大中至正经文纬武仁孝睿智端俭宽勤景皇帝',
        ['光绪'],
        '清朝',
        1875,
        1908,
        [
            // 困难提示词
            window.GameTypes.createHint('qing-dezong-hint-1', '他是在王朝遭遇空前危机、前代皇帝绝嗣的情况下继承大统的', 'hard', 0),
            window.GameTypes.createHint('qing-dezong-hint-2', '他成年后曾一度亲政，并表现出强烈的改革意愿，试图学习外国制度以挽救国家危亡', 'hard', 1),
            window.GameTypes.createHint('qing-dezong-hint-3', '他重用一批年轻官员，在短时间内颁布了大量涉及政治、经济、军事、文化教育的改革诏令', 'hard', 2),
            
            // 中等提示词
            window.GameTypes.createHint('qing-dezong-hint-4', '他一生中绝大部分时间都生活在一位强势女性长辈的巨大阴影和直接控制之下，是一位典型的“儿皇帝”', 'medium', 3),
            window.GameTypes.createHint('qing-dezong-hint-5', '他的改革过于激进且触及了保守势力的根本利益，最终被其长辈联合保守派发动的政变所扼杀，政变后，他被长期囚禁，失去了人身自由，成为真正的傀儡', 'medium', 4),
            window.GameTypes.createHint('qing-dezong-hint-6', '他对外敌入侵和签订不平等条约感到极度悲愤，但无能为力，健康状况也因此日益恶化', 'medium', 5),
            
            // 简单提示词
            window.GameTypes.createHint('qing-dezong-hint-7', '他是清朝的第十一位皇帝，也是倒数第二位皇帝', 'easy', 6),
            window.GameTypes.createHint('qing-dezong-hint-8', '他是醇亲王奕譞的儿子，慈禧太后妹妹的儿子，因此被慈禧选为同治帝的继承人', 'easy', 7),
            window.GameTypes.createHint('qing-dezong-hint-9', '公元1894年甲午战争失败后，他深受刺激，决心变法图强', 'easy', 8),
            window.GameTypes.createHint('qing-dezong-hint-10', '变法失败后，他支持的“戊戌六君子”（谭嗣同等）被处死', 'easy', 9)
        ]
    ));

    // 48. 溥仪
    emperors.push(window.GameTypes.createEmperor(
        'modaihuangdi',
        '溥仪',
        '无庙号',
        '无谥号',
        ['宣统'],
        '清朝',
        1909,
        1912,
        [
            // 困难提示词
            window.GameTypes.createHint('modaihuangdi-hint-1', '他幼年登基，成为王朝末日的象征符号，身边是垂帘听政的太后和摄政王', 'hard', 0),
            window.GameTypes.createHint('modaihuangdi-hint-2', '他一生中曾两次被旧势力重新扶上“皇位”，但都为时极短，如同闹剧', 'hard', 1),
            window.GameTypes.createHint('modaihuangdi-hint-3', '他是世界上极少有的、著有自传的中国皇帝，通过自己的视角记录了传奇而扭曲的一生', 'hard', 2),
            
            // 中等提示词
            window.GameTypes.createHint('modaihuangdi-hint-4', '他曾被一个外国势力诱拐和控制，在其扶植下建立了一个傀儡政权，名义上成为“国家元首”', 'medium', 3),
            window.GameTypes.createHint('modaihuangdi-hint-5', '他的婚姻生活复杂，有过数位妻子，包括一位经由现代自由恋爱结合的伴侣', 'medium', 4),
            window.GameTypes.createHint('modaihuangdi-hint-6', '他3岁登基，6岁退位', 'medium', 5),
            
            // 简单提示词
            window.GameTypes.createHint('modaihuangdi-hint-7', '1912', 'easy', 6),
            window.GameTypes.createHint('modaihuangdi-hint-8', '他通晓英语，接受过西式教育，甚至梦想出国留学', 'easy', 7),
            window.GameTypes.createHint('modaihuangdi-hint-9', '他在战争结束后，曾被作为战犯关押和改造，后获得特赦，成为普通公民', 'easy', 8),
            window.GameTypes.createHint('modaihuangdi-hint-10', '他的妻子包括婉容（皇后）和文绣（妃子，后离婚）', 'easy', 9)
        ]
    ));

    // 49. 完颜阿骨打
    emperors.push(window.GameTypes.createEmperor(
        'jin-taizu',
        '完颜阿骨打',
        '金太祖',
        '应乾兴运昭德定功睿神庄孝仁明大圣武元皇帝',
        ['收国，天辅'],
        '北宋',
        1115,
        1123,
        [
            // 困难提示词
            window.GameTypes.createHint('jin-taizu-hint-1', '他是东北地区一个渔猎民族部落联盟的首领，领导本族反抗强大宗主国的压迫和勒索', 'hard', 0),
            window.GameTypes.createHint('jin-taizu-hint-2', '他正式建立政权，定国号，立年号，与原来的宗主国彻底决裂', 'hard', 1),
            window.GameTypes.createHint('jin-taizu-hint-3', '他在一场决定性的战役中，凭借过人的勇猛和指挥，以极少的兵力大败了数量远超己方的敌军', 'hard', 2),
            window.GameTypes.createHint('jin-taizu-hint-4', '他创立了一套适合本民族特点的军政合一的社会组织制度，成为政权初期强大的基石', 'hard', 3),
            window.GameTypes.createHint('jin-taizu-hint-5', '他建立的王朝，后来成为中原王朝最强大的对手之一，并一度入主中原', 'hard', 4),
            
            // 中等提示词
            window.GameTypes.createHint('jin-taizu-hint-6', '他命人借鉴其他民族的文字，创制了本民族的第一种文字', 'medium', 5),
            window.GameTypes.createHint('jin-taizu-hint-7', '他通过连续不断的进攻，迅速攻占了宗主国在东北的核心统治区域', 'medium', 6),
            window.GameTypes.createHint('jin-taizu-hint-8', '他去世时，距离攻陷宗主国的都城仅一步之遥，其遗志由其弟弟继承并完成', 'medium', 7),
            window.GameTypes.createHint('jin-taizu-hint-9', '他在位期间，与南方的另一个大国保持了相对友好的关系，甚至订立了共同对付旧主的盟约', 'medium', 8),
            
            // 简单提示词
            window.GameTypes.createHint('jin-taizu-hint-10', '他是女真族完颜部的首领，原为辽朝的属部', 'easy', 9),
            window.GameTypes.createHint('jin-taizu-hint-11', '他命人参照汉字和契丹字，创制了 “女真大字”', 'easy', 10),
            window.GameTypes.createHint('jin-taizu-hint-12', '他在位期间，金军势如破竹，但他在攻破辽朝南京（今北京）前夕病逝于军旅之中', 'easy', 11),
            window.GameTypes.createHint('jin-taizu-hint-13', '他的弟弟完颜吴乞买（金太宗）继承其志，最终灭亡了辽朝和北宋', 'easy', 12)
        ]
    ));

    // 50. 耶律阿保机
    emperors.push(window.GameTypes.createEmperor(
        'liao-taizu',
        '耶律阿保机',
        '辽太祖',
        '大圣大明神烈天皇帝',
        ['神册，天赞，天显'],
        '五代十国',
        916,
        922,
        [
            // 困难提示词
            window.GameTypes.createHint('liao-taizu-hint-1', '他统一了原本分散的草原部落，建立了一个具有双重政治体制（南北面官）的帝国', 'hard', 0),
            window.GameTypes.createHint('liao-taizu-hint-2', '他借鉴中原制度，创建了中央集权的雏形', 'hard', 1),
            window.GameTypes.createHint('liao-taizu-hint-3', '他命人创制了本民族的文字，以记录政事和翻译典籍', 'hard', 2),
            
            // 中等提示词
            window.GameTypes.createHint('liao-taizu-hint-4', '他并非通过简单的世袭，而是凭借战功和能力，在部落联盟的选举中连续担任首领，并最终破坏了传统的三年一选的“世选制”', 'medium', 3),
            window.GameTypes.createHint('liao-taizu-hint-5', '他在位期间，向四方扩张，征服了北方诸多部族，并多次南下与中原王朝争夺地盘', 'medium', 4),
            window.GameTypes.createHint('liao-taizu-hint-6', '他去世时正值盛年，其皇后在他死后扮演了至关重要的角色，并按照其遗愿殉葬', 'medium', 5),
            window.GameTypes.createHint('liao-taizu-hint-7', '他创建的王朝，后来成为中原王朝在北方最持久、最强大的对手之一，鼎盛时期版图辽阔', 'medium', 6),
            window.GameTypes.createHint('liao-taizu-hint-8', '他通常被视为一个融合了游牧传统与中原文明的帝国的真正开创者', 'medium', 7),
            
            // 简单提示词
            window.GameTypes.createHint('liao-taizu-hint-9', '他是契丹族迭剌部耶律氏的贵族，出生于其家族担任联盟夷离堇（军事首领）的时代', 'easy', 8),
            window.GameTypes.createHint('liao-taizu-hint-10', '他创制了 “契丹大字” 和 “契丹小字” 两种文字', 'easy', 9),
            window.GameTypes.createHint('liao-taizu-hint-11', '他重用汉人谋士，如韩延徽、康默记、韩知古等，为其规划城池、制定法律', 'easy', 10),
            window.GameTypes.createHint('liao-taizu-hint-12', '他是契丹族的民族英雄和王朝奠基人', 'easy', 11)
        ]
    ));

    return emperors;
}

// 导出到全局作用域
window.DefaultEmperorsData = {
    createDefaultEmperorsData
};