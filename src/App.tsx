import React, { useState, useEffect } from 'react';
import { BookOpen, ArrowRight, ArrowLeft, RotateCcw } from 'lucide-react';
import ScenarioSelector from './components/ScenarioSelector';
import PromptForm from './components/PromptForm';
import PromptPreview from './components/PromptPreview';
import HistoryPanel from './components/HistoryPanel';
import StepIndicator from './components/StepIndicator';
import { TeachingScenario, FormData, HistoryItem } from './types';
import { getScenarioById } from './data/templates';
import { usePromptHistory } from './hooks/useLocalStorage';

const steps = [
  { id: 1, title: '选择场景', description: '选择适合的教学场景' },
  { id: 2, title: '填写表单', description: '填写具体的教学信息' },
  { id: 3, title: '预览生成', description: '预览和完善Prompt' },
  { id: 4, title: '管理历史', description: '查看和管理历史记录' }
];

export default function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedScenario, setSelectedScenario] = useState<TeachingScenario | null>(null);
  const [formData, setFormData] = useState<FormData>({});
  const { addToHistory } = usePromptHistory();

  // 处理场景选择
  const handleScenarioSelect = (scenario: TeachingScenario) => {
    setSelectedScenario(scenario);
    setFormData({}); // 清空表单数据
    setCurrentStep(2); // 跳转到表单步骤
  };

  // 处理表单数据变化
  const handleFormChange = (data: FormData) => {
    setFormData(data);
  };

  // 检查步骤是否可以继续
  const canProceedToNext = () => {
    switch (currentStep) {
      case 1:
        return selectedScenario !== null;
      case 2:
        if (!selectedScenario) return false;
        const requiredFields = selectedScenario.fields.filter(f => f.required);
        return requiredFields.every(field => {
          const value = formData[field.id];
          return value && (typeof value === 'string' ? value.trim() !== '' : value.length > 0);
        });
      case 3:
        return true;
      default:
        return true;
    }
  };

  // 处理下一步
  const handleNext = () => {
    if (canProceedToNext() && currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  // 处理上一步
  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // 处理步骤点击
  const handleStepClick = (step: number) => {
    if (step === 1 || (step === 2 && selectedScenario) || (step >= 3 && canProceedToNext())) {
      setCurrentStep(step);
    }
  };

  // 保存Prompt到历史
  const handleSavePrompt = (promptData: any) => {
    addToHistory(promptData);
    // 显示成功消息或跳转到历史页面
    setCurrentStep(4);
  };

  // 从历史加载Prompt
  const handleLoadFromHistory = (item: HistoryItem) => {
    const scenario = getScenarioById(item.scenarioId);
    if (scenario) {
      setSelectedScenario(scenario);
      setFormData(item.formData);
      setCurrentStep(3); // 跳转到预览步骤
    }
  };

  // 重新开始
  const handleReset = () => {
    setCurrentStep(1);
    setSelectedScenario(null);
    setFormData({});
  };

  // 渲染当前步骤内容
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <ScenarioSelector
            onSelectScenario={handleScenarioSelect}
            selectedScenarioId={selectedScenario?.id}
          />
        );
      case 2:
        return selectedScenario ? (
          <PromptForm
            scenario={selectedScenario}
            onFormChange={handleFormChange}
            formData={formData}
          />
        ) : null;
      case 3:
        return selectedScenario ? (
          <PromptPreview
            scenario={selectedScenario}
            formData={formData}
            onSave={handleSavePrompt}
          />
        ) : null;
      case 4:
        return (
          <HistoryPanel
            onLoadPrompt={handleLoadFromHistory}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* 头部 */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo和标题 */}
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-lg">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  教师Prompt生成器
                </h1>
                <p className="text-sm text-gray-600">
                  专业的AI教学指令生成工具
                </p>
              </div>
            </div>

            {/* 右侧操作按钮 */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleReset}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                title="重新开始"
              >
                <RotateCcw className="w-4 h-4" />
                重新开始
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* 主内容区域 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* 左侧侧边栏 - 步骤指示器 */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <StepIndicator
                currentStep={currentStep}
                steps={steps}
                onStepClick={handleStepClick}
              />
            </div>
          </div>

          {/* 主内容区域 */}
          <div className="lg:col-span-3">
            <div className="space-y-6">
              {/* 步骤内容 */}
              {renderStepContent()}

              {/* 底部导航按钮 */}
              {currentStep < 4 && (
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <div className="flex items-center justify-between">
                    <button
                      onClick={handlePrevious}
                      disabled={currentStep === 1}
                      className="flex items-center gap-2 px-6 py-3 font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-gray-700 hover:bg-gray-100 disabled:hover:bg-transparent"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      上一步
                    </button>

                    <div className="text-sm text-gray-500">
                      步骤 {currentStep} / 3
                    </div>

                    <button
                      onClick={handleNext}
                      disabled={!canProceedToNext()}
                      className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-600"
                    >
                      {currentStep === 3 ? '查看历史' : '下一步'}
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* 底部 */}
      <footer className="bg-white/50 backdrop-blur-sm border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p className="mb-2">
              🌟 专业的教师Prompt生成工具，提升教学效率，精准生成AI教学指令
            </p>
            <p className="text-sm">
              支持多种教学场景，定制化表单，智能生成，一键复制使用
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}