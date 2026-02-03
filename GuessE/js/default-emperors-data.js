/**
 * 中国皇帝猜谜游戏 - 默认皇帝数据
 * 包含10位著名皇帝的完整数据，每位皇帝有10个分级提示词
 */

/**
 * 创建默认皇帝数据
 * @returns {Emperor[]} 皇帝数组
 */
function createDefaultEmperorsData() {
    const emperors = [];

    // 1. 秦始皇 - 嬴政
    emperors.push(window.GameTypes.createEmperor(
        'qin-shi-huang',
        '嬴政',
        '始皇帝',
        '始皇帝',
        ['始皇'],
        '秦朝',
        -221,
        -210,
        [
            // 困难提示词 (前3个)
            window.GameTypes.createHint('qsh-1', '他统一了六国，建立了中国历史上第一个中央集权的封建王朝', 'hard', 0),
            window.GameTypes.createHint('qsh-2', '他推行郡县制，废除分封制，加强中央集权', 'hard', 1),
            window.GameTypes.createHint('qsh-3', '他统一文字、货币、度量衡，促进了文化和经济的统一', 'hard', 2),
            
            // 中等提示词 (中间3个)
            window.GameTypes.createHint('qsh-4', '他修建了万里长城，抵御北方匈奴的入侵', 'medium', 3),
            window.GameTypes.createHint('qsh-5', '他焚书坑儒，实行思想专制', 'medium', 4),
            window.GameTypes.createHint('qsh-6', '他派徐福东渡寻找长生不老药', 'medium', 5),
            
            // 简单提示词 (后4个)
            window.GameTypes.createHint('qsh-7', '他是秦朝的开国皇帝', 'easy', 6),
            window.GameTypes.createHint('qsh-8', '他自称"始皇帝"', 'easy', 7),
            window.GameTypes.createHint('qsh-9', '他的陵墓有著名的兵马俑', 'easy', 8),
            window.GameTypes.createHint('qsh-10', '他统一了中国，结束了战国时代', 'easy', 9)
        ]
    ));

    // 2. 汉武帝 - 刘彻
    emperors.push(window.GameTypes.createEmperor(
        'han-wu-di',
        '刘彻',
        '世宗',
        '武帝',
        ['建元', '元光', '元朔', '元狩', '元鼎', '元封', '太初', '天汉', '太始', '征和', '后元'],
        '西汉',
        -140,
        -87,
        [
            // 困难提示词
            window.GameTypes.createHint('hwd-1', '他实行推恩令，削弱诸侯王的势力', 'hard', 0),
            window.GameTypes.createHint('hwd-2', '他独尊儒术，罢黜百家，确立了儒家思想的正统地位', 'hard', 1),
            window.GameTypes.createHint('hwd-3', '他设立刺史制度，加强对地方的监督', 'hard', 2),
            
            // 中等提示词
            window.GameTypes.createHint('hwd-4', '他派张骞出使西域，开辟了丝绸之路', 'medium', 3),
            window.GameTypes.createHint('hwd-5', '他多次征伐匈奴，大大拓展了汉朝疆域', 'medium', 4),
            window.GameTypes.createHint('hwd-6', '他在位54年，是西汉在位时间最长的皇帝', 'medium', 5),
            
            // 简单提示词
            window.GameTypes.createHint('hwd-7', '他是西汉第七位皇帝', 'easy', 6),
            window.GameTypes.createHint('hwd-8', '他的谥号是"武帝"', 'easy', 7),
            window.GameTypes.createHint('hwd-9', '他开创了汉朝的鼎盛时期', 'easy', 8),
            window.GameTypes.createHint('hwd-10', '他是刘邦的曾孙', 'easy', 9)
        ]
    ));

    // 3. 唐太宗 - 李世民
    emperors.push(window.GameTypes.createEmperor(
        'tang-tai-zong',
        '李世民',
        '太宗',
        '文武大圣大广孝皇帝',
        ['贞观'],
        '唐朝',
        626,
        649,
        [
            // 困难提示词
            window.GameTypes.createHint('ttz-1', '他实行三省六部制，完善了中央政府机构', 'hard', 0),
            window.GameTypes.createHint('ttz-2', '他推行科举制，选拔人才不拘门第', 'hard', 1),
            window.GameTypes.createHint('ttz-3', '他实行均田制和租庸调制，减轻农民负担', 'hard', 2),
            
            // 中等提示词
            window.GameTypes.createHint('ttz-4', '他发动玄武门之变，夺取皇位', 'medium', 3),
            window.GameTypes.createHint('ttz-5', '他虚心纳谏，重用魏征等贤臣', 'medium', 4),
            window.GameTypes.createHint('ttz-6', '他的统治被称为"贞观之治"', 'medium', 5),
            
            // 简单提示词
            window.GameTypes.createHint('ttz-7', '他是唐朝第二位皇帝', 'easy', 6),
            window.GameTypes.createHint('ttz-8', '他是李渊的次子', 'easy', 7),
            window.GameTypes.createHint('ttz-9', '他开创了唐朝的盛世', 'easy', 8),
            window.GameTypes.createHint('ttz-10', '他被誉为千古明君', 'easy', 9)
        ]
    ));

    // 4. 宋太祖 - 赵匡胤
    emperors.push(window.GameTypes.createEmperor(
        'song-tai-zu',
        '赵匡胤',
        '太祖',
        '启运立极英武睿文神德圣功至明大孝皇帝',
        ['建隆', '乾德', '开宝'],
        '北宋',
        960,
        976,
        [
            // 困难提示词
            window.GameTypes.createHint('stz-1', '他通过陈桥兵变，黄袍加身，建立宋朝', 'hard', 0),
            window.GameTypes.createHint('stz-2', '他实行杯酒释兵权，削弱武将势力', 'hard', 1),
            window.GameTypes.createHint('stz-3', '他重文轻武，提高文官地位，防止武将专权', 'hard', 2),
            
            // 中等提示词
            window.GameTypes.createHint('stz-4', '他统一了五代十国的分裂局面', 'medium', 3),
            window.GameTypes.createHint('stz-5', '他建都开封，史称北宋', 'medium', 4),
            window.GameTypes.createHint('stz-6', '他在位16年，为宋朝奠定了基础', 'medium', 5),
            
            // 简单提示词
            window.GameTypes.createHint('stz-7', '他是宋朝的开国皇帝', 'easy', 6),
            window.GameTypes.createHint('stz-8', '他原是后周的禁军将领', 'easy', 7),
            window.GameTypes.createHint('stz-9', '他结束了五代十国的乱世', 'easy', 8),
            window.GameTypes.createHint('stz-10', '他被称为宋太祖', 'easy', 9)
        ]
    ));

    // 5. 明太祖 - 朱元璋
    emperors.push(window.GameTypes.createEmperor(
        'ming-tai-zu',
        '朱元璋',
        '太祖',
        '开天行道肇纪立极大圣至神仁文义武俊德成功高皇帝',
        ['洪武'],
        '明朝',
        1368,
        1398,
        [
            // 困难提示词
            window.GameTypes.createHint('mtz-1', '他废除丞相制度，设立内阁，加强皇权', 'hard', 0),
            window.GameTypes.createHint('mtz-2', '他设立锦衣卫，加强特务统治', 'hard', 1),
            window.GameTypes.createHint('mtz-3', '他实行海禁政策，限制对外贸易', 'hard', 2),
            
            // 中等提示词
            window.GameTypes.createHint('mtz-4', '他出身贫寒，曾当过和尚', 'medium', 3),
            window.GameTypes.createHint('mtz-5', '他参加红巾军起义，推翻元朝统治', 'medium', 4),
            window.GameTypes.createHint('mtz-6', '他定都南京，建立明朝', 'medium', 5),
            
            // 简单提示词
            window.GameTypes.createHint('mtz-7', '他是明朝的开国皇帝', 'easy', 6),
            window.GameTypes.createHint('mtz-8', '他的年号是洪武', 'easy', 7),
            window.GameTypes.createHint('mtz-9', '他推翻了元朝统治', 'easy', 8),
            window.GameTypes.createHint('mtz-10', '他从乞丐成为皇帝', 'easy', 9)
        ]
    ));

    // 6. 清圣祖 - 爱新觉罗·玄烨 (康熙)
    emperors.push(window.GameTypes.createEmperor(
        'qing-sheng-zu',
        '爱新觉罗·玄烨',
        '圣祖',
        '合天弘运文武睿哲恭俭宽裕孝敬诚信功德大成仁皇帝',
        ['康熙'],
        '清朝',
        1661,
        1722,
        [
            // 困难提示词
            window.GameTypes.createHint('qsz-1', '他平定三藩之乱，巩固了清朝统治', 'hard', 0),
            window.GameTypes.createHint('qsz-2', '他收复台湾，统一全国', 'hard', 1),
            window.GameTypes.createHint('qsz-3', '他亲征噶尔丹，平定准噶尔叛乱', 'hard', 2),
            
            // 中等提示词
            window.GameTypes.createHint('qsz-4', '他在位61年，是中国历史上在位时间最长的皇帝', 'medium', 3),
            window.GameTypes.createHint('qsz-5', '他8岁登基，14岁亲政', 'medium', 4),
            window.GameTypes.createHint('qsz-6', '他开创了康乾盛世', 'medium', 5),
            
            // 简单提示词
            window.GameTypes.createHint('qsz-7', '他是清朝第四位皇帝', 'easy', 6),
            window.GameTypes.createHint('qsz-8', '他的年号是康熙', 'easy', 7),
            window.GameTypes.createHint('qsz-9', '他是顺治皇帝的儿子', 'easy', 8),
            window.GameTypes.createHint('qsz-10', '他被称为康熙大帝', 'easy', 9)
        ]
    ));

    // 7. 清高宗 - 爱新觉罗·弘历 (乾隆)
    emperors.push(window.GameTypes.createEmperor(
        'qing-gao-zong',
        '爱新觉罗·弘历',
        '高宗',
        '法天隆运至诚先觉体元立极敷文奋武钦明孝慈神圣纯皇帝',
        ['乾隆'],
        '清朝',
        1735,
        1796,
        [
            // 困难提示词
            window.GameTypes.createHint('qgz-1', '他完成十全武功，平定大小和卓叛乱', 'hard', 0),
            window.GameTypes.createHint('qgz-2', '他编纂《四库全书》，是中国古代最大的丛书', 'hard', 1),
            window.GameTypes.createHint('qgz-3', '他实行闭关锁国政策，限制对外贸易', 'hard', 2),
            
            // 中等提示词
            window.GameTypes.createHint('qgz-4', '他在位60年，实际掌权63年', 'medium', 3),
            window.GameTypes.createHint('qgz-5', '他六下江南，巡视民情', 'medium', 4),
            window.GameTypes.createHint('qgz-6', '他是康熙皇帝的孙子', 'medium', 5),
            
            // 简单提示词
            window.GameTypes.createHint('qgz-7', '他是清朝第六位皇帝', 'easy', 6),
            window.GameTypes.createHint('qgz-8', '他的年号是乾隆', 'easy', 7),
            window.GameTypes.createHint('qgz-9', '他是雍正皇帝的儿子', 'easy', 8),
            window.GameTypes.createHint('qgz-10', '他统治时期是清朝的鼎盛时期', 'easy', 9)
        ]
    ));

    // 8. 隋文帝 - 杨坚
    emperors.push(window.GameTypes.createEmperor(
        'sui-wen-di',
        '杨坚',
        '高祖',
        '文帝',
        ['开皇', '仁寿'],
        '隋朝',
        581,
        604,
        [
            // 困难提示词
            window.GameTypes.createHint('swd-1', '他建立三省六部制，影响后世千年', 'hard', 0),
            window.GameTypes.createHint('swd-2', '他实行均田制，促进农业发展', 'hard', 1),
            window.GameTypes.createHint('swd-3', '他开凿大运河，连接南北交通', 'hard', 2),
            
            // 中等提示词
            window.GameTypes.createHint('swd-4', '他统一了分裂近300年的中国', 'medium', 3),
            window.GameTypes.createHint('swd-5', '他建立隋朝，定都长安', 'medium', 4),
            window.GameTypes.createHint('swd-6', '他在位24年，开创了开皇之治', 'medium', 5),
            
            // 简单提示词
            window.GameTypes.createHint('swd-7', '他是隋朝的开国皇帝', 'easy', 6),
            window.GameTypes.createHint('swd-8', '他结束了南北朝的分裂', 'easy', 7),
            window.GameTypes.createHint('swd-9', '他是杨广的父亲', 'easy', 8),
            window.GameTypes.createHint('swd-10', '他被称为隋文帝', 'easy', 9)
        ]
    ));

    // 9. 元世祖 - 忽必烈
    emperors.push(window.GameTypes.createEmperor(
        'yuan-shi-zu',
        '忽必烈',
        '世祖',
        '圣德神功文武皇帝',
        ['中统', '至元'],
        '元朝',
        1260,
        1294,
        [
            // 困难提示词
            window.GameTypes.createHint('ysz-1', '他建立行省制度，加强对全国的统治', 'hard', 0),
            window.GameTypes.createHint('ysz-2', '他推行重农政策，恢复和发展农业生产', 'hard', 1),
            window.GameTypes.createHint('ysz-3', '他开通海上丝绸之路，促进中外贸易', 'hard', 2),
            
            // 中等提示词
            window.GameTypes.createHint('ysz-4', '他是成吉思汗的孙子', 'medium', 3),
            window.GameTypes.createHint('ysz-5', '他建立元朝，定都大都（北京）', 'medium', 4),
            window.GameTypes.createHint('ysz-6', '他完成了对南宋的统一', 'medium', 5),
            
            // 简单提示词
            window.GameTypes.createHint('ysz-7', '他是元朝的开国皇帝', 'easy', 6),
            window.GameTypes.createHint('ysz-8', '他是蒙古族皇帝', 'easy', 7),
            window.GameTypes.createHint('ysz-9', '他统一了中国', 'easy', 8),
            window.GameTypes.createHint('ysz-10', '他被称为元世祖', 'easy', 9)
        ]
    ));

    // 10. 汉高祖 - 刘邦
    emperors.push(window.GameTypes.createEmperor(
        'han-gao-zu',
        '刘邦',
        '高祖',
        '高皇帝',
        ['高祖'],
        '西汉',
        -202,
        -195,
        [
            // 困难提示词
            window.GameTypes.createHint('hgz-1', '他实行郡国并行制，既有郡县也有诸侯国', 'hard', 0),
            window.GameTypes.createHint('hgz-2', '他制定"白马之盟"，规定非刘氏不得为王', 'hard', 1),
            window.GameTypes.createHint('hgz-3', '他实行休养生息政策，恢复经济发展', 'hard', 2),
            
            // 中等提示词
            window.GameTypes.createHint('hgz-4', '他出身平民，曾是沛县的亭长', 'medium', 3),
            window.GameTypes.createHint('hgz-5', '他在楚汉争霸中击败项羽', 'medium', 4),
            window.GameTypes.createHint('hgz-6', '他建立汉朝，定都长安', 'medium', 5),
            
            // 简单提示词
            window.GameTypes.createHint('hgz-7', '他是汉朝的开国皇帝', 'easy', 6),
            window.GameTypes.createHint('hgz-8', '他推翻了秦朝统治', 'easy', 7),
            window.GameTypes.createHint('hgz-9', '他是汉武帝的高祖父', 'easy', 8),
            window.GameTypes.createHint('hgz-10', '他被称为汉高祖', 'easy', 9)
        ]
    ));

    return emperors;
}

// 导出到全局作用域
window.DefaultEmperorsData = {
    createDefaultEmperorsData
};

         