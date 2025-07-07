import React, { useState } from 'react';
import { Search, BookOpen, FileText, Users, BarChart3, Calendar, Target } from 'lucide-react';
import { TeachingScenario, ScenarioCategory } from '../types';
import { scenarioCategories, searchScenarios } from '../data/templates';

interface ScenarioSelectorProps {
  onSelectScenario: (scenario: TeachingScenario) => void;
  selectedScenarioId?: string;
}

const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  'lesson-design': BookOpen,
  'assessment': FileText,
  'materials': Target,
  'reports': BarChart3,
  'evaluation': Users,
  'planning': Calendar
};

export default function ScenarioSelector({ onSelectScenario, selectedScenarioId }: ScenarioSelectorProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // 筛选场景
  const filteredScenarios = React.useMemo(() => {
    let scenarios = searchQuery 
      ? searchScenarios(searchQuery)
      : scenarioCategories.flatMap(cat => cat.scenarios);
    
    if (selectedCategory !== 'all') {
      scenarios = scenarios.filter(s => s.category === selectedCategory);
    }
    
    return scenarios;
  }, [searchQuery, selectedCategory]);

  return (
    <div className="space-y-6">
      {/* 标题 */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          选择教学场景
        </h2>
        <p className="text-gray-600">
          根据您的教学需求，选择合适的场景模板来生成专业的AI对话指令
        </p>
      </div>

      {/* 搜索框 */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="搜索教学场景..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* 分类标签 */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            selectedCategory === 'all'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          全部场景
        </button>
        {scenarioCategories.map((category) => {
          const IconComponent = categoryIcons[category.id];
          return (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2 ${
                selectedCategory === category.id
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <IconComponent className="w-4 h-4" />
              {category.name}
            </button>
          );
        })}
      </div>

      {/* 场景卡片网格 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredScenarios.map((scenario) => {
          const isSelected = scenario.id === selectedScenarioId;
          return (
            <div
              key={scenario.id}
              onClick={() => onSelectScenario(scenario)}
              className={`group cursor-pointer p-6 border-2 rounded-xl transition-all duration-200 hover:shadow-lg ${
                isSelected
                  ? 'border-blue-500 bg-blue-50 shadow-md'
                  : 'border-gray-200 hover:border-blue-300 bg-white'
              }`}
            >
              {/* 场景图标和标题 */}
              <div className="flex items-center gap-3 mb-3">
                <div className={`text-2xl p-2 rounded-lg ${
                  isSelected ? 'bg-blue-100' : 'bg-gray-100 group-hover:bg-blue-100'
                }`}>
                  {scenario.icon}
                </div>
                <div className="flex-1">
                  <h3 className={`font-bold text-lg ${
                    isSelected ? 'text-blue-900' : 'text-gray-900'
                  }`}>
                    {scenario.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    {(() => {
                      const category = scenarioCategories.find(c => c.id === scenario.category);
                      const IconComponent = categoryIcons[scenario.category];
                      return (
                        <>
                          <IconComponent className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-gray-500">
                            {category?.name}
                          </span>
                        </>
                      );
                    })()}
                  </div>
                </div>
              </div>

              {/* 场景描述 */}
              <p className={`text-sm leading-relaxed ${
                isSelected ? 'text-blue-700' : 'text-gray-600'
              }`}>
                {scenario.description}
              </p>

              {/* 选择指示器 */}
              {isSelected && (
                <div className="mt-4 flex items-center gap-2 text-blue-600">
                  <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                  <span className="text-sm font-medium">已选择</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 无结果提示 */}
      {filteredScenarios.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Search className="w-12 h-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            未找到匹配的场景
          </h3>
          <p className="text-gray-600">
            请尝试修改搜索关键词或选择其他分类
          </p>
        </div>
      )}
    </div>
  );
}