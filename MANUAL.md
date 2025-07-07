# 教师Prompt生成器 - 安装使用手册

## 项目简介

教师Prompt生成器是一个专为教育工作者设计的AI教学指令生成工具。它提供了丰富的教学场景模板，帮助教师快速生成高质量的AI教学指令，提升教学效率和效果。

### 主要功能

- 🎯 **多场景支持**：涵盖教案设计、试题出题、课堂活动、教学评价等多个教学场景
- 📝 **智能表单**：根据场景自动生成相应的表单字段，简化输入过程
- 👀 **实时预览**：生成前可预览和编辑Prompt内容
- 💾 **历史管理**：保存和管理历史生成的Prompt
- 🎨 **现代化UI**：基于React + TypeScript + Tailwind CSS构建的现代化界面

## 技术栈

- **前端框架**：React 18.3.1 + TypeScript
- **构建工具**：Vite 6.0.1
- **UI组件库**：Radix UI + shadcn/ui
- **样式框架**：Tailwind CSS
- **包管理器**：pnpm
- **路由**：React Router DOM
- **表单处理**：React Hook Form + Zod

## 系统要求

- Node.js 18.0 或更高版本
- pnpm 8.0 或更高版本（推荐）
- 现代浏览器（Chrome、Firefox、Safari、Edge）

## 安装步骤

### 1. 克隆项目

```bash
git clone <项目仓库地址>
cd teacher-prompt-generator
```

### 2. 安装依赖

项目使用 pnpm 作为包管理器，请确保已安装 pnpm：

```bash
# 如果没有安装 pnpm，先安装
npm install -g pnpm

# 安装项目依赖
pnpm install
```

### 3. 启动开发服务器

```bash
pnpm dev
```

开发服务器将在 `http://localhost:5173` 启动。

### 4. 构建生产版本

```bash
pnpm build
```

构建完成后，生产文件将生成在 `dist` 目录中。

### 5. 预览生产版本

```bash
pnpm preview
```

## 项目结构

```
teacher-prompt-generator/
├── src/
│   ├── components/          # React组件
│   │   ├── ui/             # 基础UI组件
│   │   ├── ScenarioSelector.tsx    # 场景选择器
│   │   ├── PromptForm.tsx          # 表单组件
│   │   ├── PromptPreview.tsx       # 预览组件
│   │   ├── HistoryPanel.tsx        # 历史面板
│   │   └── StepIndicator.tsx       # 步骤指示器
│   ├── data/
│   │   └── templates.ts    # 教学场景模板数据
│   ├── hooks/
│   │   ├── useLocalStorage.ts      # 本地存储Hook
│   │   └── use-mobile.tsx          # 移动端适配Hook
│   ├── types/
│   │   └── index.ts        # TypeScript类型定义
│   ├── lib/
│   │   └── utils.ts        # 工具函数
│   ├── App.tsx             # 主应用组件
│   └── main.tsx            # 应用入口
├── public/                 # 静态资源
├── package.json            # 项目配置
├── vite.config.ts          # Vite配置
├── tailwind.config.js      # Tailwind配置
└── tsconfig.json           # TypeScript配置
```

## 使用指南

### 1. 选择教学场景

应用启动后，首先进入场景选择页面：

- 浏览不同的教学场景分类（教案设计、试题出题、课堂活动等）
- 点击感兴趣的场景卡片查看详细信息
- 选择适合的场景后点击"开始使用"

### 2. 填写表单信息

根据选择的场景，系统会显示相应的表单字段：

- **必填字段**：标有红色星号的字段必须填写
- **选填字段**：可根据需要选择性填写
- **字段类型**：
  - 文本输入：直接输入文字
  - 下拉选择：从预设选项中选择
  - 多选：可同时选择多个选项
  - 文本域：适合输入较长文本

### 3. 预览和编辑

填写完表单后，系统会生成Prompt预览：

- 查看生成的Prompt内容
- 根据需要编辑和调整内容
- 确认无误后点击"保存到历史"

### 4. 管理历史记录

在历史管理页面：

- 查看所有保存的Prompt记录
- 按时间、场景等条件筛选
- 重新加载历史记录进行编辑
- 删除不需要的记录

## 教学场景说明

### 教案设计类

#### 课程教案
- **适用场景**：设计单节课的详细教案
- **主要字段**：学科、年级、课程主题、教学目标、教学方法等
- **生成内容**：完整的教案结构，包括教学目标、重难点、教学过程等

#### 单元教案
- **适用场景**：设计单元整体教学规划
- **主要字段**：单元主题、课时安排、核心概念、评价重点等
- **生成内容**：单元教学目标、知识结构、分课时安排等

### 试题出题类

#### 选择题出题
- **适用场景**：生成选择题及答案解析
- **主要字段**：学科、年级、知识点、难度、题目数量等
- **生成内容**：规范的选择题、选项、答案和解析

#### 主观题出题
- **适用场景**：设计主观题和评分标准
- **主要字段**：题型、分值、评分要点等
- **生成内容**：题目、参考答案、评分标准

### 课堂活动类

#### 互动游戏
- **适用场景**：设计课堂互动游戏
- **主要字段**：游戏类型、参与人数、时间安排等
- **生成内容**：游戏规则、流程、材料准备等

#### 小组讨论
- **适用场景**：组织小组讨论活动
- **主要字段**：讨论主题、分组方式、讨论时间等
- **生成内容**：讨论问题、分组建议、引导策略等

## 开发指南

### 添加新的教学场景

1. 在 `src/data/templates.ts` 中添加新的场景配置
2. 定义场景的字段结构（FormField[]）
3. 编写Prompt模板
4. 更新场景分类

### 自定义UI组件

项目使用 shadcn/ui 组件库，可以：

1. 在 `src/components/ui/` 中添加新组件
2. 使用 `npx shadcn@latest add <component-name>` 添加官方组件
3. 自定义组件样式和功能

### 本地存储

项目使用 `useLocalStorage` Hook 管理本地数据：

- Prompt历史记录
- 用户偏好设置
- 临时表单数据

## 常见问题

### Q: 如何修改Prompt模板？
A: 编辑 `src/data/templates.ts` 文件中对应场景的 `template` 字段。

### Q: 如何添加新的表单字段类型？
A: 在 `src/types/index.ts` 中扩展 `FormField` 类型，并在相应组件中实现渲染逻辑。

### Q: 如何自定义样式？
A: 项目使用 Tailwind CSS，可以直接修改组件中的 className，或编辑 `tailwind.config.js` 配置文件。

### Q: 如何部署到生产环境？
A: 运行 `pnpm build` 生成生产文件，然后将 `dist` 目录部署到Web服务器。

## 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 联系方式

如有问题或建议，请通过以下方式联系：

- 提交 Issue
- 发送邮件
- 项目讨论区

---

**注意**：本工具生成的Prompt仅供参考，实际使用时请根据具体教学需求进行调整和完善。 