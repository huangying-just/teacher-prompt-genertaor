// 教学场景类型
export interface TeachingScenario {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  fields: FormField[];
  template: string;
}

// 表单字段类型
export interface FormField {
  id: string;
  label: string;
  type: 'text' | 'textarea' | 'select' | 'multiselect';
  placeholder?: string;
  required: boolean;
  options?: string[];
  description?: string;
}

// 表单数据类型
export interface FormData {
  [key: string]: string | string[];
}

// 生成的Prompt类型
export interface GeneratedPrompt {
  id: string;
  scenarioId: string;
  scenarioName: string;
  content: string;
  formData: FormData;
  createdAt: string;
}

// 历史记录类型
export interface HistoryItem extends GeneratedPrompt {
  favorite: boolean;
}

// 场景分类
export interface ScenarioCategory {
  id: string;
  name: string;
  color: string;
  scenarios: TeachingScenario[];
}