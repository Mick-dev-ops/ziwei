/* 紫微斗數本命導讀。語意規則由本站整理，古籍不是數值預測公式。 */
(function(global){'use strict';
const B='子丑寅卯辰巳午未申酉戌亥'.split('');
const TOPICS={overview:{title:'人生主線',palace:'命宮',question:'我的行事方式如何連到工作、資源與外部環境？'},career:{title:'事業與工作',palace:'官祿',question:'我適合怎樣發揮能力，工作與關係如何互相影響？'},wealth:{title:'財富與資源',palace:'財帛',question:'我怎樣取得及管理資源，內在安全感會如何影響選擇？'},relationship:{title:'關係與合作',palace:'夫妻',question:'親密關係需要怎樣協調，與事業及生活方向如何拉扯？'},wellbeing:{title:'身心節奏',palace:'疾厄',question:'身心負荷、生活空間與支持系統有哪些需要覺察的線索？'}};
const PALACE={
 命宮:{domain:'性格基調、處事方式與人生選擇',scene:'面對重要抉擇時',action:'決定怎樣開始、承擔與轉向',question:'這是你慣用的反應，不等於一生只剩一種性格。'},
 兄弟:{domain:'手足、同輩、同儕資源與互助界線',scene:'與同輩協作時',action:'分工、求助與維持界線',question:'不直接推定兄弟姊妹的人數或命運。'},
 夫妻:{domain:'親密關係、承諾模式與一對一合作',scene:'與伴侶或重要合作對象互動時',action:'協商期待、承諾與彼此的空間',question:'此宮描述你在關係中的課題，不替對方下性格定論。'},
 子女:{domain:'子女、培育、作品及長期投入的成果',scene:'培養後輩或推進創作時',action:'投入、引導與放手讓成果成長',question:'不以單一星曜推定生育、子女數量或子女性格。'},
 財帛:{domain:'賺取與運用資源的方式、金錢決策',scene:'面對收入與支出選擇時',action:'取得、分配與留存資源',question:'它談資源模式，不是可計算的收入或投資報酬。'},
 疾厄:{domain:'身心負荷、壓力反應與生活節奏',scene:'工作與生活累積壓力時',action:'辨識消耗、安排恢復與求助',question:'它不構成疾病診斷，也不表示某疾病必然發生。'},
 遷移:{domain:'外部環境、轉換場域與對外互動',scene:'走出熟悉環境時',action:'適應新場域、連結外部機會',question:'不直接推定搬家、出國或事故。'},
 僕役:{domain:'朋友、團隊、部屬與合作網絡',scene:'在團隊或朋友圈互動時',action:'建立協力、授權及選擇同行者',question:'傳統稱奴僕宮，本站以平等的合作關係解讀。'},
 官祿:{domain:'職涯、職責、專業表現與工作型態',scene:'選擇職涯角色時',action:'累積專業、承擔責任與展現成果',question:'不直接指定職業名稱、升遷日期或職級。'},
 田宅:{domain:'居住環境、資產根基與安定感',scene:'安排家與長期資產時',action:'建立可持續的生活與資產基礎',question:'不直接推定房產數量或買賣時間。'},
 福德:{domain:'內在滿足、休息方式與精神資源',scene:'沒有人要求你表現時',action:'恢復能量、尋找意義與選擇生活品質',question:'與財帛對看，能分辨物質取得與心理滿足。'},
 父母:{domain:'原生家庭、長輩、制度與指導者',scene:'面對長輩或制度性權威時',action:'接受支持、建立界線與形成價值觀',question:'此宮談互動模式，不替父母的健康或壽命下結論。'}
};
/* 每個主星的功能、較順的用法、要管理的傾向；落宮時帶入各宮人生情境。 */
const MAJOR={
 紫微:['統籌全局與承擔決策','角色清楚時能整合人與資源','責任集中時容易過度掌控'],
 天機:['思考方案並因情況調整','善用資訊與變通找出新路','想得太多時可能遲疑或頻繁改向'],
 太陽:['公開表達、帶領及付出','願意照亮他人並主動承擔','長期單向付出可能忽略自身界線'],
 武曲:['執行計畫、計算成本與管理資源','把目標落成可檢查的成果','過度重效率時容易壓低情緒需求'],
 天同:['協調關係並尋找舒適節奏','以溫和方式維持合作與穩定','過度求和可能拖延必要決定'],
 廉貞:['辨明規則、欲望及關係界線','在複雜情境中建立原則','遇到衝突時可能陷入控制或反覆角力'],
 天府:['保管資源、建立秩序及長期儲備','維持穩健運作與可信任的節奏','過度守成時可能錯過需要的調整'],
 太陰:['觀察細節、累積資源及照顧內在需求','用耐心經營長期價值','太在意安全感時可能遲遲不表態'],
 貪狼:['探索新機會、社交及多樣需求','跨界嘗試能帶來連結與創意','興趣分散時容易消耗時間與資源'],
 巨門:['提問、辨析、談判及說明','善於釐清模糊資訊與提出問題','語言反覆交鋒時可能放大誤會'],
 天相:['協調規則、支援系統與公平分工','在制度內建立可信賴的合作','太顧全各方時可能難以表達自身立場'],
 天梁:['守原則、照顧他人與提供指引','能從經驗中建立保護與判斷','過度背負他人問題時容易疲乏'],
 七殺:['果斷行動、突破與承擔風險','在變局中迅速建立新秩序','過急決斷時可能欠缺緩衝與支持'],
 破軍:['拆解舊方法、改革與重新開始','不合用的結構能藉此更新','變動過猛時可能連有效資源也一併耗損']
};
const MINOR={
 左輔:'協助與組織支援；看能否找到可靠的分工',右弼:'人際配合與協力；看能否柔性整合資源',文昌:'文字、知識與條理；看如何說明和規劃',文曲:'表達、感受與藝術性；看如何傳達細膩訊息',天魁:'正式的引薦或指導；看誰能提供方向',天鉞:'適時的援助或提攜；看如何接住外部支持',祿存:'可守住的資源與節制；看儲備是否僵化',天馬:'移動、跨域與奔波；看流動是否帶來機會',擎羊:'直接的衝突與切割；看決策是否過急',陀羅:'反覆延宕與阻力；看問題是否卡在同一處',火星:'突然的推力與急躁；看節奏是否太快',鈴星:'持續的壓力與敏感；看內在緊繃如何累積',地空:'理想與實際的落差；看投入是否有實體支撐',地劫:'資源消耗與落空感；看成本及風險邊界'};
const ADJ={解神:'化解與轉圜',龍池:'美感與形象',天巫:'直覺與照顧',天廚:'享受與照料',旬空:'階段性的落空感',陰煞:'隱而未明的顧慮',咸池:'社交與吸引力',月德:'和緩與善意',天刑:'原則與規範',天虛:'期待落差',紅鸞:'關係中的吸引與靠近',三台:'次序與協助',天貴:'支持與認可',天福:'舒適與福分的象徵',截路:'進程受阻的提醒',天傷:'耗損與修復的提醒',天姚:'魅力與互動',天德:'寬緩與轉圜',空亡:'暫時空缺與落差',寡宿:'獨處與距離感',八座:'位置與支援',天哭:'情緒表達與失落',天使:'照護與負擔',封誥:'名位與正式認可',恩光:'受惠與照拂',華蓋:'專注、審美與獨立',天喜:'喜悅與互動',天才:'能力與學習',天官:'制度中的位置',天月:'身心照護的提醒',天空:'理想化與落差',孤辰:'自立與孤獨感',鳳閣:'品味與作品呈現',蜚廉:'流言與訊息流動',年解:'階段性解結',天壽:'持續與保養',台輔:'協作與輔佐',破碎:'細節破耗與重整'};
const T_MEAN={祿:'資源流入、想要取得的方向',權:'推動、主導及責任的壓力',科:'被看見、表達及緩和的方式',忌:'牽掛、耗力及需要反覆處理之處'};
const all=p=>[...(p.majorStars||[]),...(p.minorStars||[]),...(p.adjectiveStars||[])];
const pName=p=>`${p.name}（${p.earthlyBranch}）`;
const mainNames=p=>(p.majorStars||[]).map(s=>s.name).join('、')||'無正曜';
const region=(chart,p)=>{const by=Object.fromEntries(chart.palaces.map(x=>[x.earthlyBranch,x])),i=B.indexOf(p.earthlyBranch);return {opposite:by[B[(i+6)%12]],triads:[by[B[(i+4)%12]],by[B[(i+8)%12]]]}};
const transformMap=four=>Object.fromEntries((four||[]).map((s,i)=>[s,['祿','權','科','忌'][i]]));
function starSentence(s,p,kind,trans){const ctx=PALACE[p.name]||PALACE.命宮, t=trans[s.name],suffix=t?` 此星生年化${t}，在此宮還要看${T_MEAN[t]}；不能只憑這一項定吉凶。`:'';
 if(kind==='major'){const a=MAJOR[s.name];if(!a)return `${s.name}：此主星的語意尚未建立，請參照原盤並核對流派。`;return `${s.name}${s.brightness?`（${s.brightness}）`:''}：${ctx.domain}是這個宮位的題目。落在此處時，${ctx.scene}，較容易透過「${a[0]}」來${ctx.action}；${a[1]}，但${a[2]}。${s.brightness?`「${s.brightness}」是本排盤表的星曜狀態，仍須合看會照與四化。`:''}${suffix}`}
 if(kind==='minor')return `${s.name}：在${ctx.domain}方面，${MINOR[s.name]||'此輔曜需另依流派核對'}。它修飾主星的表現，不能單獨下結論。${suffix}`;
 return `${s.name}：在${ctx.domain}方面，作為「${ADJ[s.name]||'補充象徵'}」的次要提示；優先級低於主星、三方及四化，不據此斷具體事件。${suffix}`;
}
function palaceReading(chart,p,four){const trans=transformMap(four),ctx=PALACE[p.name]||PALACE.命宮,{opposite,triads}=region(chart,p),maj=p.majorStars||[];
 const stars={major:maj.map(s=>starSentence(s,p,'major',trans)),minor:(p.minorStars||[]).map(s=>starSentence(s,p,'minor',trans)),adjective:(p.adjectiveStars||[]).map(s=>starSentence(s,p,'adjective',trans))};
 const axis=maj.length?maj.map(s=>MAJOR[s.name]?.[0]||s.name).join('，並結合'):opposite.majorStars?.length?`參考對宮${opposite.name}的${mainNames(opposite)}，再看本宮的輔曜與四化`:'由對宮、三合與本宮輔曜一起辨認';
 const hits=[p,opposite,...triads].flatMap((x,i)=>all(x).filter(s=>trans[s.name]).map(s=>({palace:x,kind:trans[s.name],star:s.name,position:i===0?'本宮':i===1?'對宮':'三合'})));
 const support=[p,opposite,...triads].flatMap(x=>all(x).filter(s=>['左輔','右弼','文昌','文曲','天魁','天鉞','祿存','天馬'].includes(s.name)).map(s=>`${x.name}${s.name}`));
 const friction=[p,opposite,...triads].flatMap(x=>all(x).filter(s=>['擎羊','陀羅','火星','鈴星','地空','地劫'].includes(s.name)).map(s=>`${x.name}${s.name}`));
 const synthesis=`${p.name}掌管${ctx.domain}。${maj.length?`本宮的${mainNames(p)}使你在${ctx.scene}，傾向${axis}。`:`本宮無正曜，先借對宮${opposite.name}的${mainNames(opposite)}看主軸，再由本宮輔曜及三合修正；這不代表此面向空白。`}${hits.length?`這組宮位同見${hits.map(h=>`${h.palace.name}${h.star}化${h.kind}`).join('、')}，表示相關著力點或牽掛需一起看。`:''}${ctx.question}`;
 const relation=`本宮${pName(p)}回答「${ctx.domain}」；對宮${pName(opposite)}回答「${PALACE[opposite.name]?.domain}」，是需要平衡的另一面。三合${pName(triads[0])}與${pName(triads[1])}分別提供「${PALACE[triads[0].name]?.domain}」及「${PALACE[triads[1].name]?.domain}」的條件。四宮一起構成三方四正；同一宮位有支援與阻力時須並列，不可直接相抵。`;
 return {palace:p,context:ctx,opposite,triads,stars,hits,support,friction,synthesis,relation};
}
function lifeReading(chart,four){const get=n=>chart.palaces.find(p=>p.name===n),soul=get('命宮'),body=chart.palaces.find(p=>p.isBodyPalace),career=get('官祿'),wealth=get('財帛'),spirit=get('福德'),travel=get('遷移');
 const r=p=>palaceReading(chart,p,four),key=p=>p.majorStars?.length?`${p.name}的${mainNames(p)}（${p.majorStars.map(s=>MAJOR[s.name]?.[0]||s.name).join('、')}）`:`${p.name}無正曜，需借對宮及三合`;
 const first=soul.majorStars?.[0],work=career.majorStars?.[0],money=wealth.majorStars?.[0];
 const strategy=`可先把${first?`命宮${first.name}的「${MAJOR[first.name]?.[0]}」`:'命宮與對宮共同顯出的處事方式'}用在${PALACE[career.name].domain}，再檢查它能否支持${PALACE[wealth.name].domain}。${work?`官祿${work.name}的順勢條件是：${MAJOR[work.name]?.[1]}；需要管理的是：${MAJOR[work.name]?.[2]}。`:''}${money?`財帛${money.name}提示資源安排可留意${MAJOR[money.name]?.[0]}；需要管理的是：${MAJOR[money.name]?.[2]}。`:''}這是一條可檢查的選擇路徑，不是命定職業或收入。`;
 const paragraphs=[`人生起點先讀${key(soul)}：這是你習慣用來面對選擇的方式。身宮在${pName(body)}，實際投入與長期磨練的重心偏向${PALACE[body.name].domain}；命宮是起手式，身宮是反覆實踐的場域。`,`工作與資源形成一條主線：${key(career)}談如何承擔職責，${key(wealth)}談如何取得及運用資源。兩者與命宮同屬三合，要檢查做事方式能否轉為工作成果，再轉為可持續的資源。`,`另一條主線是內外平衡：${key(travel)}呈現走入外部環境時的條件，與命宮對照；${key(spirit)}呈現心中認為值得的生活與恢復方式，與財帛對照。若外在成績與內在滿足不一致，要把兩面都保留在判讀中。`,strategy];
 const stages=chart.palaces.filter(p=>p.decadal?.range?.length===2).sort((a,b)=>a.decadal.range[0]-b.decadal.range[0]).map(p=>{const pr=r(p),range=p.decadal.range;return {range:`${range[0]}–${range[1]}`,palace:p.name,branch:p.earthlyBranch,summary:`這十年傳統大限落在${p.name}，主題偏向${PALACE[p.name].domain}。${p.majorStars?.length?`${mainNames(p)}提示可透過${p.majorStars.map(s=>MAJOR[s.name]?.[0]||s.name).join('、')}來處理此課題。`:`本宮無正曜，可對看${pr.opposite.name}的${mainNames(pr.opposite)}。`}對宮${pr.opposite.name}涉及${PALACE[pr.opposite.name].domain}，可與此階段對照；兩個三合宮${pr.triads.map(x=>x.name).join('、')}提供旁邊的條件。${pr.hits.length?`其中${pr.hits.map(h=>`${h.star}化${h.kind}在${h.palace.name}`).join('、')}，宜一併辨識資源與阻力。`:''}這是十年閱讀焦點，不表示事情必在此時發生。`}});
 return {paragraphs,stages};
}
function analyze(chart,topicKey,four,overrideBranch){if(!chart?.palaces?.length)throw Error('尚無命盤');const topic=TOPICS[topicKey]||TOPICS.overview;const p=overrideBranch?chart.palaces.find(x=>x.earthlyBranch===overrideBranch):chart.palaces.find(x=>x.name===topic.palace);if(!p)throw Error('找不到宮位');const detailed=palaceReading(chart,p,four),{opposite,triads}=detailed;
 const factors=[{id:'R1',title:'本宮與星曜',evidence:`${pName(p)}主星：${mainNames(p)}`,reading:detailed.synthesis},{id:'R2',title:'星曜狀態',evidence:p.majorStars?.length?p.majorStars.map(s=>`${s.name}${s.brightness||'未標廟旺'}`).join('、'):'本宮無正曜',reading:'廟旺平陷是此排盤系統的傳統狀態標記，代表解讀條件，不是分數或事件保證。'},{id:'R3',title:'三方四正',evidence:`本宮${pName(p)}；對宮${pName(opposite)}；三合${triads.map(pName).join('、')}`,reading:detailed.relation},{id:'R4',title:'生年四化',evidence:detailed.hits.length?detailed.hits.map(h=>`${h.position}${h.palace.name}：${h.star}化${h.kind}`).join('；'):'這組四宮未見生年四化',reading:detailed.hits.length?detailed.hits.map(h=>`${h.star}化${h.kind}落在${h.palace.name}，就「${PALACE[h.palace.name].domain}」提醒${T_MEAN[h.kind]}`).join('；')+'。':'生年四化在其他宮位，不可把它硬加在此主題。'},{id:'R5',title:'輔煞條件',evidence:`輔助：${detailed.support.join('、')||'未見'}；牽制：${detailed.friction.join('、')||'未見'}`,reading:'同見輔助與牽制時保留兩種條件，依主星與四化檢查何處較易發揮、何處要管理。'},{id:'R6',title:'命身校驗',evidence:`命宮${pName(chart.palaces.find(x=>x.name==='命宮'))}；身宮${pName(chart.palaces.find(x=>x.isBodyPalace))}`,reading:'把此宮結論與命宮的起手方式及身宮的實際投入對照，若方向不同便作為人生選擇的張力。'}];
 return {topic:{...topic,title:overrideBranch?`${p.name}解讀`:topic.title},home:p,opposite,triads,body:chart.palaces.find(x=>x.isBodyPalace),factors,synthesis:detailed.synthesis,relation:detailed.relation,detailed,method:'宮位題目 → 每顆主星與輔雜曜 → 對宮及兩個三合 → 生年四化 → 輔煞 → 命身及大限',caveat:'這是本命結構與十年大限主題的傳統閱讀；不由單一盤面斷言具體事件、收入、疾病或精確年份。'};
}
global.ZiweiAnalysis={analyze,lifeReading,palaceReading,topics:TOPICS,palaceInfo:PALACE};
})(typeof window!=='undefined'?window:globalThis);
