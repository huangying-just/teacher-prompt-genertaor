import { TeachingScenario, ScenarioCategory } from '../types';

// 物流类教学场景模板数据
export const teachingScenarios: TeachingScenario[] = [
  // 教案设计类
  {
    id: 'lesson-plan-course',
    name: '课程教案',
    description: '制定完整的物流课程教学计划和教案',
    icon: '📚',
    category: 'lesson-design',
    fields: [
      {
        id: 'subject',
        label: '物流专业领域',
        type: 'select',
        required: true,
        options: ['物流管理', '供应链管理', '仓储管理', '运输管理', '配送管理', '采购管理', '物流信息技术', '物流成本管理', '国际物流', '冷链物流', '电商物流', '物流系统规划', '物流设备操作', '物流法律法规']
      },
      {
        id: 'grade',
        label: '教育层次',
        type: 'select',
        required: true,
        options: ['中职物流专业', '高职物流专业', '本科物流管理', '本科供应链管理', '物流专业研究生', '物流职业培训', '企业内训']
      },
      {
        id: 'topic',
        label: '课程主题',
        type: 'text',
        required: true,
        placeholder: '如：仓储作业流程、供应链优化、物流成本控制等'
      },
      {
        id: 'duration',
        label: '课时安排',
        type: 'select',
        required: true,
        options: ['1课时(45分钟)', '2课时(90分钟)', '3课时', '4课时', '一周课程', '单元课程', '实训课程']
      },
      {
        id: 'objectives',
        label: '教学目标',
        type: 'textarea',
        required: true,
        placeholder: '请描述知识目标、技能目标、职业素养目标等'
      },
      {
        id: 'student-characteristics',
        label: '学生特点',
        type: 'textarea',
        required: false,
        placeholder: '学生的基础水平、学习特点、职业规划等'
      },
      {
        id: 'teaching-methods',
        label: '偏好教学方法',
        type: 'multiselect',
        required: false,
        options: ['案例教学', '项目驱动', '情境模拟', '企业实践', '小组合作', '翻转课堂', '理实一体化', '数字化教学', '虚拟仿真', '企业导师制']
      }
    ],
    template: `请帮我设计一份详细的{{subject}}课程教案，具体要求如下：

【基本信息】
- 专业领域：{{subject}}
- 教育层次：{{grade}}
- 课程主题：{{topic}}
- 课时安排：{{duration}}

【教学目标】
{{objectives}}

{{#student-characteristics}}【学生分析】
{{student-characteristics}}
{{/student-characteristics}}

{{#teaching-methods}}【教学方法】
希望采用：{{teaching-methods}}
{{/teaching-methods}}

【具体要求】
请按照以下结构设计教案：
1. 教学目标（知识、技能、职业素养目标）
2. 教学重点和难点
3. 教学准备（教具、设备、软件、案例等）
4. 教学过程（导入、新课、实践、总结、作业）
5. 板书设计
6. 教学反思
7. 职业能力培养要点

请确保教案内容符合物流行业标准，体现职业教育的实践性和应用性。`
  },
  {
    id: 'lesson-plan-unit',
    name: '单元教案',
    description: '设计物流专业单元整体教学规划和安排',
    icon: '📖',
    category: 'lesson-design',
    fields: [
      {
        id: 'subject',
        label: '物流专业领域',
        type: 'select',
        required: true,
        options: ['物流管理', '供应链管理', '仓储管理', '运输管理', '配送管理', '采购管理', '物流信息技术', '物流成本管理', '国际物流', '冷链物流', '电商物流', '物流系统规划', '物流设备操作', '物流法律法规']
      },
      {
        id: 'grade',
        label: '教育层次',
        type: 'select',
        required: true,
        options: ['中职物流专业', '高职物流专业', '本科物流管理', '本科供应链管理', '物流专业研究生', '物流职业培训', '企业内训']
      },
      {
        id: 'unit-theme',
        label: '单元主题',
        type: 'text',
        required: true,
        placeholder: '如：仓储作业单元、供应链优化单元、物流成本控制单元等'
      },
      {
        id: 'lesson-count',
        label: '课时数量',
        type: 'select',
        required: true,
        options: ['4-6课时', '6-8课时', '8-10课时', '10-12课时', '12-15课时', '实训周']
      },
      {
        id: 'core-concepts',
        label: '核心概念',
        type: 'textarea',
        required: true,
        placeholder: '本单元要学习的核心知识点、技能点和职业素养要求'
      },
      {
        id: 'assessment-focus',
        label: '评价重点',
        type: 'textarea',
        required: false,
        placeholder: '本单元学习成果的评价重点和方式'
      }
    ],
    template: `请帮我设计一份{{subject}}单元教案，具体要求如下：

【单元信息】
- 专业领域：{{subject}}
- 教育层次：{{grade}}
- 单元主题：{{unit-theme}}
- 预计课时：{{lesson-count}}

【核心内容】
{{core-concepts}}

{{#assessment-focus}}【评价要求】
{{assessment-focus}}
{{/assessment-focus}}

【设计要求】
请按照以下结构设计单元教案：
1. 单元教学目标（整体目标分解）
2. 单元教学重难点分析
3. 单元知识技能结构图
4. 分课时教学安排（每课时的主要内容和目标）
5. 单元教学活动设计
6. 单元评价方案
7. 教学资源配置
8. 教学进度安排
9. 职业能力培养路径

请确保单元设计整体性强，各课时之间逻辑清晰，符合物流行业职业标准。`
  },
  
  // 试题出题类
  {
    id: 'exam-multiple-choice',
    name: '选择题出题',
    description: '生成物流专业规范的选择题及答案解析',
    icon: '✅',
    category: 'assessment',
    fields: [
      {
        id: 'subject',
        label: '物流专业领域',
        type: 'select',
        required: true,
        options: ['物流管理', '供应链管理', '仓储管理', '运输管理', '配送管理', '采购管理', '物流信息技术', '物流成本管理', '国际物流', '冷链物流', '电商物流', '物流系统规划', '物流设备操作', '物流法律法规']
      },
      {
        id: 'grade',
        label: '教育层次',
        type: 'select',
        required: true,
        options: ['中职物流专业', '高职物流专业', '本科物流管理', '本科供应链管理', '物流专业研究生', '物流职业培训']
      },
      {
        id: 'knowledge-points',
        label: '考查知识点',
        type: 'textarea',
        required: true,
        placeholder: '请列出要考查的具体知识点和技能点'
      },
      {
        id: 'difficulty-level',
        label: '难度等级',
        type: 'select',
        required: true,
        options: ['基础级', '中等难度', '较难', '综合应用', '职业实践']
      },
      {
        id: 'question-count',
        label: '题目数量',
        type: 'select',
        required: true,
        options: ['5题', '10题', '15题', '20题', '25题', '30题']
      },
      {
        id: 'answer-format',
        label: '选项设置',
        type: 'select',
        required: true,
        options: ['A、B、C、D (4选项)', 'A、B、C、D、E (5选项)', '判断题(是/否)', '多选题']
      }
    ],
    template: `请为我出一套{{subject}}选择题，具体要求如下：

【基本信息】
- 专业领域：{{subject}}
- 教育层次：{{grade}}
- 难度等级：{{difficulty-level}}
- 题目数量：{{question-count}}
- 选项格式：{{answer-format}}

【考查内容】
{{knowledge-points}}

【出题要求】
1. 题目表述准确、清晰，符合物流行业实际
2. 选项设计合理，干扰项具有迷惑性但不误导
3. 正确答案唯一且明确
4. 覆盖指定知识点，难度分布合理
5. 每题提供详细的答案解析
6. 体现物流行业实践特点

【输出格式】
请按以下格式输出：

**第X题**
题目内容...
A. 选项A
B. 选项B
C. 选项C
D. 选项D

**答案：** X
**解析：** 详细解释为什么选择该答案，分析其他选项错误原因

---

请确保题目质量高，符合物流行业标准和教学大纲要求。`
  },
  
  {
    id: 'exam-subjective',
    name: '主观题出题',
    description: '设计物流专业简答题、论述题等主观性试题',
    icon: '📝',
    category: 'assessment',
    fields: [
      {
        id: 'subject',
        label: '物流专业领域',
        type: 'select',
        required: true,
        options: ['物流管理', '供应链管理', '仓储管理', '运输管理', '配送管理', '采购管理', '物流信息技术', '物流成本管理', '国际物流', '冷链物流', '电商物流', '物流系统规划', '物流设备操作', '物流法律法规']
      },
      {
        id: 'grade',
        label: '教育层次',
        type: 'select',
        required: true,
        options: ['中职物流专业', '高职物流专业', '本科物流管理', '本科供应链管理', '物流专业研究生', '物流职业培训']
      },
      {
        id: 'question-type',
        label: '题目类型',
        type: 'select',
        required: true,
        options: ['简答题', '论述题', '案例分析', '计算题', '方案设计', '流程分析', '成本分析', '优化建议']
      },
      {
        id: 'knowledge-areas',
        label: '考查知识领域',
        type: 'textarea',
        required: true,
        placeholder: '请详细描述要考查的知识点、技能点和能力要求'
      },
      {
        id: 'question-count',
        label: '题目数量',
        type: 'select',
        required: true,
        options: ['3题', '5题', '8题', '10题']
      },
      {
        id: 'score-weight',
        label: '分值设置',
        type: 'text',
        required: false,
        placeholder: '如：每题10分、15分、20分等'
      }
    ],
    template: `请为我设计{{subject}}{{question-type}}，具体要求如下：

【基本信息】
- 专业领域：{{subject}}
- 教育层次：{{grade}}
- 题目类型：{{question-type}}
- 题目数量：{{question-count}}
{{#score-weight}}- 分值安排：{{score-weight}}{{/score-weight}}

【考查要求】
{{knowledge-areas}}

【出题标准】
1. 题目设计要有层次性，由浅入深
2. 考查学生的理解、分析、综合、评价等高阶思维能力
3. 题目表述清晰，指向明确
4. 既考查基础知识，又考查实际应用能力
5. 体现物流行业实践特点
6. 为每道题提供详细的评分标准和参考答案

【输出格式】
请按以下格式输出：

**第X题** {{#score-weight}}(XX分){{/score-weight}}
题目内容...

**参考答案：**
要点1：...(X分)
要点2：...(X分)
要点3：...(X分)

**评分说明：**
- 答出要点1得X分
- 答出要点2得X分
- 分析深入、逻辑清晰可酌情加分

---

请确保题目具有区分度，能够有效评价学生学习效果，符合物流行业实际需求。`
  },
  
  // 教学资料编写类
  {
    id: 'material-textbook',
    name: '教材编写',
    description: '编写物流专业教学教材和学习材料',
    icon: '📔',
    category: 'materials',
    fields: [
      {
        id: 'subject',
        label: '物流专业领域',
        type: 'select',
        required: true,
        options: ['物流管理', '供应链管理', '仓储管理', '运输管理', '配送管理', '采购管理', '物流信息技术', '物流成本管理', '国际物流', '冷链物流', '电商物流', '物流系统规划', '物流设备操作', '物流法律法规']
      },
      {
        id: 'target-audience',
        label: '目标对象',
        type: 'select',
        required: true,
        options: ['中职物流专业学生', '高职物流专业学生', '本科物流管理学生', '本科供应链管理学生', '物流专业研究生', '物流职业培训学员', '企业物流人员', '物流教师培训']
      },
      {
        id: 'chapter-topic',
        label: '章节主题',
        type: 'text',
        required: true,
        placeholder: '如：仓储作业流程、供应链优化策略、物流成本控制等'
      },
      {
        id: 'content-scope',
        label: '内容范围',
        type: 'textarea',
        required: true,
        placeholder: '请详细描述要编写的内容范围和重点'
      },
      {
        id: 'learning-objectives',
        label: '学习目标',
        type: 'textarea',
        required: true,
        placeholder: '学完本章节学生应该掌握的知识、技能和职业素养'
      },
      {
        id: 'material-style',
        label: '编写风格',
        type: 'select',
        required: true,
        options: ['理论实践结合型', '案例丰富型', '操作技能导向型', '行业标准型', '创新应用型']
      }
    ],
    template: `请帮我编写{{subject}}教材的一个章节，具体要求如下：

【教材信息】
- 专业领域：{{subject}}
- 目标读者：{{target-audience}}
- 章节主题：{{chapter-topic}}
- 编写风格：{{material-style}}

【内容要求】
{{content-scope}}

【学习目标】
{{learning-objectives}}

【编写标准】
1. 内容科学准确，符合物流行业标准
2. 语言表达符合目标读者的认知水平
3. 理论与实践相结合，案例典型实用
4. 结构完整，包含必要的图表和示例
5. 设置适当的思考题和练习题
6. 体现物流行业最新发展趋势

【章节结构】
请按以下结构编写：
1. 章节导入（学习目标、重要性说明）
2. 核心概念阐述
3. 原理分析与讲解
4. 典型案例分析
5. 实践应用指导
6. 本章小结
7. 思考与练习
8. 扩展阅读建议
9. 职业能力培养要点

请确保内容既有理论深度又有实用价值，适合物流专业教学使用。`
  },
  
  {
    id: 'material-courseware',
    name: '课件制作',
    description: '设计物流专业PPT课件的内容结构和要点',
    icon: '🖥️',
    category: 'materials',
    fields: [
      {
        id: 'subject',
        label: '物流专业领域',
        type: 'select',
        required: true,
        options: ['物流管理', '供应链管理', '仓储管理', '运输管理', '配送管理', '采购管理', '物流信息技术', '物流成本管理', '国际物流', '冷链物流', '电商物流', '物流系统规划', '物流设备操作', '物流法律法规']
      },
      {
        id: 'target-audience',
        label: '目标对象',
        type: 'select',
        required: true,
        options: ['中职物流专业学生', '高职物流专业学生', '本科物流管理学生', '本科供应链管理学生', '物流专业研究生', '物流职业培训学员', '企业物流人员']
      },
      {
        id: 'presentation-topic',
        label: '课件主题',
        type: 'text',
        required: true,
        placeholder: '如：仓储作业流程、供应链优化、物流成本控制等'
      },
      {
        id: 'content-outline',
        label: '内容大纲',
        type: 'textarea',
        required: true,
        placeholder: '请列出课件的主要内容和结构安排'
      },
      {
        id: 'key-points',
        label: '重点难点',
        type: 'textarea',
        required: true,
        placeholder: '需要重点讲解的知识点和技能点'
      },
      {
        id: 'visual-elements',
        label: '视觉元素',
        type: 'multiselect',
        required: false,
        options: ['流程图', '数据图表', '案例分析', '视频演示', '实物图片', '操作截图', '对比表格', '思维导图']
      }
    ],
    template: `请帮我设计{{subject}}的PPT课件，具体要求如下：

【课件信息】
- 专业领域：{{subject}}
- 目标对象：{{target-audience}}
- 课件主题：{{presentation-topic}}
{{#visual-elements}}- 视觉元素：{{visual-elements}}{{/visual-elements}}

【内容大纲】
{{content-outline}}

【重点难点】
{{key-points}}

【设计要求】
请按以下结构设计课件：

1. **封面页**
   - 标题设计
   - 副标题
   - 作者信息
   - 日期

2. **目录页**
   - 主要内容概览
   - 学习目标

3. **导入页**
   - 问题引入
   - 案例导入
   - 学习意义

4. **主体内容页**
   - 知识点讲解
   - 案例分析
   - 实践演示
   - 互动环节

5. **总结页**
   - 要点回顾
   - 知识框架
   - 延伸思考

6. **作业页**
   - 练习题
   - 实践任务
   - 参考资料

【设计原则】
1. 每页内容简洁明了，重点突出
2. 图文并茂，增强视觉效果
3. 逻辑清晰，层次分明
4. 适合物流专业特点
5. 便于学生理解和记忆

请确保课件内容专业准确，形式美观实用。`
  },
  
  // 学术报告类
  {
    id: 'report-teaching',
    name: '教学总结',
    description: '撰写物流专业教学工作总结报告',
    icon: '📊',
    category: 'reports',
    fields: [
      {
        id: 'teaching-period',
        label: '教学周期',
        type: 'select',
        required: true,
        options: ['学期教学总结', '学年教学总结', '课程教学总结', '实训教学总结', '项目教学总结', '企业实践总结']
      },
      {
        id: 'course-subject',
        label: '课程科目',
        type: 'select',
        required: true,
        options: ['物流管理', '供应链管理', '仓储管理', '运输管理', '配送管理', '采购管理', '物流信息技术', '物流成本管理', '国际物流', '冷链物流', '电商物流', '物流系统规划', '物流设备操作', '物流法律法规']
      },
      {
        id: 'student-level',
        label: '学生层次',
        type: 'select',
        required: true,
        options: ['中职物流专业', '高职物流专业', '本科物流管理', '本科供应链管理', '物流专业研究生', '物流职业培训']
      },
      {
        id: 'main-achievements',
        label: '主要成绩',
        type: 'textarea',
        required: true,
        placeholder: '请描述在教学过程中取得的主要成绩和亮点'
      },
      {
        id: 'challenges-faced',
        label: '面临挑战',
        type: 'textarea',
        required: true,
        placeholder: '在教学过程中遇到的主要困难和挑战'
      },
      {
        id: 'improvement-actions',
        label: '改进措施',
        type: 'textarea',
        required: true,
        placeholder: '针对问题提出的具体改进措施和计划'
      },
      {
        id: 'report-purpose',
        label: '报告用途',
        type: 'select',
        required: true,
        options: ['教学评估', '职称评审', '教学改革', '经验交流', '工作总结', '发展规划']
      }
    ],
    template: `请帮我撰写{{course-subject}}的{{teaching-period}}报告，具体要求如下：

【基本信息】
- 教学周期：{{teaching-period}}
- 课程科目：{{course-subject}}
- 学生层次：{{student-level}}
- 报告用途：{{report-purpose}}

【主要成绩】
{{main-achievements}}

【面临挑战】
{{challenges-faced}}

【改进措施】
{{improvement-actions}}

【撰写要求】
请按以下结构撰写总结报告：

1. **工作概述**
   - 基本教学情况
   - 主要工作内容
   - 整体完成情况

2. **主要成绩与亮点**
   - 教学方法创新
   - 学生学习效果
   - 个人专业成长
   - 获得的荣誉或认可

3. **存在问题与不足**
   - 客观分析问题
   - 深入反思原因
   - 承认改进空间

4. **改进计划与展望**
   - 具体改进措施
   - 专业发展规划
   - 下阶段工作重点

5. **经验总结与思考**
   - 有价值的教学经验
   - 对物流教育的思考
   - 可推广的做法

请确保内容真实具体，既有成绩展示又有深入反思，符合{{report-purpose}}的要求。`
  },
  
  {
    id: 'report-research',
    name: '教研报告',
    description: '撰写物流教育研究和实践探索报告',
    icon: '🔬',
    category: 'reports',
    fields: [
      {
        id: 'research-topic',
        label: '研究主题',
        type: 'text',
        required: true,
        placeholder: '如：项目化教学在物流管理课程中的应用研究'
      },
      {
        id: 'research-background',
        label: '研究背景',
        type: 'textarea',
        required: true,
        placeholder: '请描述研究的背景、问题来源和意义'
      },
      {
        id: 'research-methods',
        label: '研究方法',
        type: 'multiselect',
        required: true,
        options: ['实验法', '调查法', '观察法', '案例研究', '行动研究', '文献分析', '比较研究', '统计分析', '企业调研', '实践验证']
      },
      {
        id: 'main-findings',
        label: '主要发现',
        type: 'textarea',
        required: true,
        placeholder: '请概述研究的主要发现和结论'
      },
      {
        id: 'practical-implications',
        label: '实践意义',
        type: 'textarea',
        required: true,
        placeholder: '研究对物流教学实践的指导意义和应用价值'
      },
      {
        id: 'report-type',
        label: '报告类型',
        type: 'select',
        required: true,
        options: ['学术论文', '实践报告', '调研报告', '实验报告', '经验总结', '案例分析', '教学改革报告']
      }
    ],
    template: `请帮我撰写物流教育研究报告，具体要求如下：

【研究信息】
- 研究主题：{{research-topic}}
- 报告类型：{{report-type}}
- 研究方法：{{research-methods}}

【研究背景】
{{research-background}}

【主要发现】
{{main-findings}}

【实践价值】
{{practical-implications}}

【撰写要求】
请按以下{{report-type}}的标准结构撰写：

1. **摘要**
   - 研究目的和意义
   - 主要方法和过程
   - 核心发现和结论
   - 实践应用价值

2. **引言/研究背景**
   - 问题提出
   - 研究现状
   - 研究意义
   - 研究目标

3. **文献综述** (如适用)
   - 相关理论基础
   - 国内外研究现状
   - 研究空白点

4. **研究设计与方法**
   - 研究思路
   - 具体方法
   - 实施过程
   - 数据收集

5. **结果与分析**
   - 数据呈现
   - 结果分析
   - 发现总结

6. **讨论与结论**
   - 结果讨论
   - 理论贡献
   - 实践意义
   - 局限性分析

7. **建议与展望**
   - 实践建议
   - 后续研究
   - 推广应用

请确保内容学术严谨，逻辑清晰，具有较强的物流教育实践指导价值。`
  },
  
  // 学生评价类
  {
    id: 'evaluation-homework',
    name: '作业点评',
    description: '为物流专业学生作业提供专业的点评和建议',
    icon: '✏️',
    category: 'evaluation',
    fields: [
      {
        id: 'subject',
        label: '物流专业科目',
        type: 'select',
        required: true,
        options: ['物流管理', '供应链管理', '仓储管理', '运输管理', '配送管理', '采购管理', '物流信息技术', '物流成本管理', '国际物流', '冷链物流', '电商物流', '物流系统规划', '物流设备操作', '物流法律法规']
      },
      {
        id: 'grade-level',
        label: '学生层次',
        type: 'select',
        required: true,
        options: ['中职物流专业', '高职物流专业', '本科物流管理', '本科供应链管理', '物流专业研究生', '物流职业培训']
      },
      {
        id: 'assignment-type',
        label: '作业类型',
        type: 'select',
        required: true,
        options: ['课后练习', '单元测验', '期中考试', '期末考试', '实训报告', '案例分析', '项目作业', '方案设计', '成本分析', '流程优化']
      },
      {
        id: 'student-performance',
        label: '学生表现',
        type: 'textarea',
        required: true,
        placeholder: '请描述学生在这次作业中的具体表现、答题情况、完成质量等'
      },
      {
        id: 'strengths',
        label: '优点亮点',
        type: 'textarea',
        required: true,
        placeholder: '学生在作业中表现出的优势和亮点'
      },
      {
        id: 'areas-for-improvement',
        label: '改进建议',
        type: 'textarea',
        required: true,
        placeholder: '需要改进的地方和具体建议'
      },
      {
        id: 'evaluation-tone',
        label: '点评风格',
        type: 'select',
        required: true,
        options: ['鼓励激励型', '严格要求型', '温和指导型', '详细分析型', '简洁明了型']
      }
    ],
    template: `请帮我为学生的{{subject}}{{assignment-type}}写一份专业的作业点评，要求如下：

【基本信息】
- 专业科目：{{subject}}
- 学生层次：{{grade-level}}
- 作业类型：{{assignment-type}}
- 点评风格：{{evaluation-tone}}

【学生表现】
{{student-performance}}

【表现优点】
{{strengths}}

【改进方向】
{{areas-for-improvement}}

【点评要求】
请按以下结构进行点评：

1. **总体评价**
   - 对作业整体完成情况的评价
   - 学习态度和努力程度的肯定
   - 在班级中的相对水平

2. **具体亮点**
   - 知识掌握方面的优势
   - 技能应用能力的体现
   - 职业素养的进步
   - 创新或独特之处

3. **需要改进的地方**
   - 知识点掌握不足
   - 技能技巧需要提升
   - 职业素养需要加强
   - 具体的改进建议

4. **学习建议**
   - 后续学习重点
   - 推荐的学习方法
   - 相关练习建议
   - 行业资源推荐

5. **鼓励与期望**
   - 对学生的鼓励话语
   - 对未来学习的期望
   - 职业发展建议

请确保点评专业准确，符合物流行业标准，有助于学生职业发展。`
  },
  
  // 课程规划类
  {
    id: 'planning-syllabus',
    name: '课程大纲',
    description: '制定物流专业课程教学大纲',
    icon: '📋',
    category: 'planning',
    fields: [
      {
        id: 'course-name',
        label: '课程名称',
        type: 'text',
        required: true,
        placeholder: '如：物流管理基础、供应链优化、仓储作业实务等'
      },
      {
        id: 'course-level',
        label: '课程层次',
        type: 'select',
        required: true,
        options: ['中职物流专业', '高职物流专业', '本科物流管理', '本科供应链管理', '物流专业研究生', '物流职业培训', '企业内训']
      },
      {
        id: 'total-hours',
        label: '总课时',
        type: 'select',
        required: true,
        options: ['32课时', '48课时', '64课时', '80课时', '96课时', '128课时', '实训周', '企业实践']
      },
      {
        id: 'course-objectives',
        label: '课程目标',
        type: 'textarea',
        required: true,
        placeholder: '请描述本课程的总体目标和期望达成的学习成果'
      },
      {
        id: 'main-content',
        label: '主要内容',
        type: 'textarea',
        required: true,
        placeholder: '请列出课程的主要知识点和技能要求'
      },
      {
        id: 'assessment-methods',
        label: '评价方式',
        type: 'multiselect',
        required: true,
        options: ['平时作业', '课堂表现', '单元测试', '期中考试', '期末考试', '实训报告', '项目作业', '小组合作', '口头报告', '企业实践评价', '技能考核']
      },
      {
        id: 'special-requirements',
        label: '特殊要求',
        type: 'textarea',
        required: false,
        placeholder: '教学环境、设备要求、先修课程等特殊要求'
      }
    ],
    template: `请帮我制定{{course-name}}的课程教学大纲，具体要求如下：

【课程基本信息】
- 课程名称：{{course-name}}
- 适用层次：{{course-level}}
- 总课时：{{total-hours}}

【课程目标】
{{course-objectives}}

【主要内容】
{{main-content}}

【评价方式】
{{assessment-methods}}

{{#special-requirements}}【特殊要求】
{{special-requirements}}
{{/special-requirements}}

【大纲要求】
请按以下结构制定课程大纲：

1. **课程概述**
   - 课程性质和地位
   - 课程理念和特色
   - 与其他课程的关系

2. **课程目标**
   - 知识与技能目标
   - 过程与方法目标
   - 情感态度价值观目标
   - 职业素养发展目标

3. **内容标准**
   - 知识结构框架
   - 各单元/章节要求
   - 重点难点分析
   - 课时分配建议

4. **教学建议**
   - 教学原则和方法
   - 教学模式建议
   - 教学资源配置
   - 信息技术应用

5. **评价建议**
   - 评价原则和目标
   - 评价方式和标准
   - 评价内容和权重
   - 评价结果运用

6. **实施保障**
   - 师资要求
   - 设施设备需求
   - 教学资源配置
   - 管理制度建议

请确保大纲科学合理，符合{{course-level}}教育规律，具有较强的可操作性。`
  },
  
  {
    id: 'planning-learning-path',
    name: '学习路径',
    description: '为物流专业学生设计个性化的学习发展路径',
    icon: '🛤️',
    category: 'planning',
    fields: [
      {
        id: 'subject-area',
        label: '物流专业领域',
        type: 'select',
        required: true,
        options: ['物流管理', '供应链管理', '仓储管理', '运输管理', '配送管理', '采购管理', '物流信息技术', '物流成本管理', '国际物流', '冷链物流', '电商物流', '物流系统规划', '物流设备操作', '物流法律法规']
      },
      {
        id: 'student-level',
        label: '学生层次',
        type: 'select',
        required: true,
        options: ['学习困难学生', '中等水平学生', '学习优秀学生', '有特长学生', '转学插班生', '企业实践学生']
      },
      {
        id: 'current-status',
        label: '现有基础',
        type: 'textarea',
        required: true,
        placeholder: '学生目前的知识基础、技能水平、学习特点等'
      },
      {
        id: 'learning-goals',
        label: '学习目标',
        type: 'textarea',
        required: true,
        placeholder: '希望学生达到的具体学习目标和能力水平'
      },
      {
        id: 'time-frame',
        label: '时间周期',
        type: 'select',
        required: true,
        options: ['1个月', '1个学期', '1学年', '2-3年', '整个学段', '企业实习期']
      },
      {
        id: 'learning-style',
        label: '学习特点',
        type: 'multiselect',
        required: false,
        options: ['视觉学习型', '听觉学习型', '动手操作型', '逻辑思维型', '创造想象型', '合作学习型', '独立学习型', '实践导向型']
      }
    ],
    template: `请为{{student-level}}设计{{subject-area}}专业的个性化学习路径，具体要求如下：

【学生信息】
- 专业领域：{{subject-area}}
- 学生层次：{{student-level}}
- 时间周期：{{time-frame}}
{{#learning-style}}- 学习特点：{{learning-style}}{{/learning-style}}

【现有基础】
{{current-status}}

【目标设定】
{{learning-goals}}

【路径设计要求】
请按以下结构设计学习路径：

1. **基础诊断**
   - 知识技能现状分析
   - 学习能力评估
   - 兴趣特长识别
   - 学习风格匹配

2. **目标分解**
   - 长期目标设定
   - 阶段性目标分解
   - 具体可测量指标
   - 达成时间节点

3. **学习阶段规划**
   - 第一阶段：基础巩固
     * 学习内容
     * 学习方法
     * 时间安排
     * 评价标准
   
   - 第二阶段：能力提升
     * 学习内容
     * 学习方法
     * 时间安排
     * 评价标准
   
   - 第三阶段：综合应用
     * 学习内容
     * 学习方法
     * 时间安排
     * 评价标准

4. **资源配置**
   - 教材教辅推荐
   - 数字化资源
   - 实践活动安排
   - 外部资源利用

5. **支持策略**
   - 教师指导方式
   - 家长配合建议
   - 同伴互助安排
   - 激励机制设计

6. **评价与调整**
   - 过程性评价方法
   - 阶段性检测安排
   - 反馈调整机制
   - 路径优化策略

请确保路径设计针对性强，符合{{student-level}}的特点，在{{time-frame}}内切实可行。`
  }
];

// 场景分类
export const scenarioCategories: ScenarioCategory[] = [
  {
    id: 'lesson-design',
    name: '教案设计',
    color: 'bg-blue-500',
    scenarios: teachingScenarios.filter(s => s.category === 'lesson-design')
  },
  {
    id: 'assessment',
    name: '试题出题',
    color: 'bg-green-500',
    scenarios: teachingScenarios.filter(s => s.category === 'assessment')
  },
  {
    id: 'materials',
    name: '教学资料编写',
    color: 'bg-purple-500',
    scenarios: teachingScenarios.filter(s => s.category === 'materials')
  },
  {
    id: 'reports',
    name: '学术报告',
    color: 'bg-orange-500',
    scenarios: teachingScenarios.filter(s => s.category === 'reports')
  },
  {
    id: 'evaluation',
    name: '学生评价',
    color: 'bg-pink-500',
    scenarios: teachingScenarios.filter(s => s.category === 'evaluation')
  },
  {
    id: 'planning',
    name: '课程规划',
    color: 'bg-indigo-500',
    scenarios: teachingScenarios.filter(s => s.category === 'planning')
  }
];

// 获取场景模板
export function getScenarioById(id: string): TeachingScenario | undefined {
  return teachingScenarios.find(scenario => scenario.id === id);
}

// 搜索场景
export function searchScenarios(query: string): TeachingScenario[] {
  const lowerQuery = query.toLowerCase();
  return teachingScenarios.filter(scenario => 
    scenario.name.toLowerCase().includes(lowerQuery) ||
    scenario.description.toLowerCase().includes(lowerQuery) ||
    scenario.category.toLowerCase().includes(lowerQuery)
  );
}