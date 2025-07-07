import React, { useState, useRef } from 'react';
import { Copy, Download, Edit3, Check, FileText, Share2 } from 'lucide-react';
import { TeachingScenario, FormData } from '../types';

interface PromptPreviewProps {
  scenario: TeachingScenario;
  formData: FormData;
  onSave?: (prompt: any) => void;
}

// 模板引擎：处理Mustache风格的模板
function processTemplate(template: string, data: FormData): string {
  let result = template;
  
  // 处理条件块 {{#field}}...{{/field}}
  result = result.replace(/\{\{#([\w-]+)\}\}([\s\S]*?)\{\{\/\1\}\}/g, (match, fieldName, content) => {
    const value = data[fieldName];
    return value && (
      (typeof value === 'string' && value.trim() !== '') ||
      (Array.isArray(value) && value.length > 0)
    ) ? content : '';
  });
  
  // 处理变量替换 {{field}}
  result = result.replace(/\{\{([\w-]+)\}\}/g, (match, fieldName) => {
    const value = data[fieldName];
    if (Array.isArray(value)) {
      return value.join('、');
    }
    return value || '';
  });
  
  // 清理多余的空行
  result = result.replace(/\n\s*\n\s*\n/g, '\n\n');
  
  return result.trim();
}

export default function PromptPreview({ scenario, formData, onSave }: PromptPreviewProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  // 生成最终的prompt内容
  const generatedPrompt = processTemplate(scenario.template, formData);
  const displayContent = isEditing ? editedContent : generatedPrompt;
  
  // 开始编辑
  const startEditing = () => {
    setEditedContent(generatedPrompt);
    setIsEditing(true);
  };
  
  // 完成编辑
  const finishEditing = () => {
    setIsEditing(false);
  };
  
  // 复制到剪贴板
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(displayContent);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      // 降级方案：使用传统的复制方法
      const textArea = document.createElement('textarea');
      textArea.value = displayContent;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };
  
  // 导出为文档
  const exportAsFile = () => {
    const content = displayContent;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${scenario.name}-prompt-${Date.now()}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };
  
  // 保存到历史记录
  const saveToHistory = () => {
    if (onSave) {
      onSave({
        scenarioId: scenario.id,
        scenarioName: scenario.name,
        content: displayContent,
        formData,
        createdAt: new Date().toISOString(),
        favorite: false
      });
    }
  };
  
  // 计算字符和行数统计
  const getContentStats = () => {
    const lines = displayContent.split('\n').length;
    const characters = displayContent.length;
    const words = displayContent.trim() ? displayContent.trim().split(/\s+/).length : 0;
    return { lines, characters, words };
  };
  
  const stats = getContentStats();
  
  return (
    <div className="space-y-6">
      {/* 预览标题 */}
      <div className="bg-white p-6 rounded-xl border border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FileText className="w-6 h-6 text-blue-600" />
            <div>
              <h3 className="text-xl font-bold text-gray-900">Prompt预览</h3>
              <p className="text-gray-600">{scenario.name}</p>
            </div>
          </div>
          
          {/* 内容统计 */}
          <div className="text-right text-sm text-gray-500">
            <div>{stats.characters} 字符</div>
            <div>{stats.words} 词语</div>
            <div>{stats.lines} 行</div>
          </div>
        </div>
      </div>
      
      {/* 内容预览区域 */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {/* 工具栏 */}
        <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700">
                {isEditing ? '编辑模式' : '预览模式'}
              </span>
              {isEditing && (
                <span className="text-xs text-orange-600 bg-orange-100 px-2 py-1 rounded">
                  可以直接修改内容
                </span>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              {!isEditing ? (
                <button
                  onClick={startEditing}
                  className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  <Edit3 className="w-4 h-4" />
                  编辑
                </button>
              ) : (
                <button
                  onClick={finishEditing}
                  className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-green-700 hover:bg-green-100 rounded-lg transition-colors"
                >
                  <Check className="w-4 h-4" />
                  完成
                </button>
              )}
              
              <button
                onClick={copyToClipboard}
                className={`flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                  copySuccess
                    ? 'text-green-700 bg-green-100'
                    : 'text-blue-700 hover:bg-blue-100'
                }`}
              >
                {copySuccess ? (
                  <><Check className="w-4 h-4" />已复制</>
                ) : (
                  <><Copy className="w-4 h-4" />复制</>
                )}
              </button>
              
              <button
                onClick={exportAsFile}
                className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-purple-700 hover:bg-purple-100 rounded-lg transition-colors"
              >
                <Download className="w-4 h-4" />
                导出
              </button>
              
              {onSave && (
                <button
                  onClick={saveToHistory}
                  className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-indigo-700 hover:bg-indigo-100 rounded-lg transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                  保存
                </button>
              )}
            </div>
          </div>
        </div>
        
        {/* 内容区域 */}
        <div className="p-6">
          {isEditing ? (
            <textarea
              ref={textareaRef}
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              className="w-full h-96 p-4 border border-gray-300 rounded-lg font-mono text-sm leading-relaxed resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="在这里编辑您的Prompt..."
            />
          ) : (
            <div className="space-y-4">
              {/* 内容显示 */}
              <div className="bg-gray-50 rounded-lg p-4 min-h-96">
                <pre className="whitespace-pre-wrap font-mono text-sm leading-relaxed text-gray-800">
                  {displayContent || '请填写表单以生成Prompt内容'}
                </pre>
              </div>
              
              {/* 空内容提示 */}
              {!displayContent && (
                <div className="text-center py-8">
                  <div className="text-gray-400 mb-2">
                    <FileText className="w-12 h-12 mx-auto" />
                  </div>
                  <h4 className="text-lg font-medium text-gray-900 mb-2">
                    还没有生成Prompt内容
                  </h4>
                  <p className="text-gray-600">
                    请先在左侧完成表单填写，系统将自动生成专业的Prompt指令
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      
      {/* 使用提示 */}
      {displayContent && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-medium text-blue-900 mb-2">💡 使用建议</h4>
          <div className="text-blue-800 text-sm space-y-1">
            <p>• 复制生成的Prompt后，可以直接粘贴到ChatGPT、Claude等AI对话工具中使用</p>
            <p>• 建议在使用前仔细检查Prompt内容，确保符合您的具体需求</p>
            <p>• 可以根据实际情况对Prompt进行微调和个性化修改</p>
            <p>• 保存功能可以帮您管理常用的Prompt模板，方便下次快速调用</p>
          </div>
        </div>
      )}
    </div>
  );
}