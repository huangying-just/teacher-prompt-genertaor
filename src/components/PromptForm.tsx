import React, { useState, useEffect } from 'react';
import { Check, AlertCircle, Info } from 'lucide-react';
import { TeachingScenario, FormData, FormField } from '../types';

interface PromptFormProps {
  scenario: TeachingScenario;
  onFormChange: (data: FormData) => void;
  formData: FormData;
}

export default function PromptForm({ scenario, onFormChange, formData }: PromptFormProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // 验证表单
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    scenario.fields.forEach((field) => {
      if (field.required) {
        const value = formData[field.id];
        if (!value || (Array.isArray(value) && value.length === 0) || 
            (typeof value === 'string' && value.trim() === '')) {
          newErrors[field.id] = `${field.label}是必填项`;
        }
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 处理输入变化
  const handleChange = (fieldId: string, value: string | string[]) => {
    const newFormData = { ...formData, [fieldId]: value };
    onFormChange(newFormData);
    
    // 清除该字段的错误
    if (errors[fieldId]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[fieldId];
        return newErrors;
      });
    }
  };

  // 处理失焦
  const handleBlur = (fieldId: string) => {
    setTouched(prev => ({ ...prev, [fieldId]: true }));
    validateForm();
  };

  // 渲染表单字段
  const renderField = (field: FormField) => {
    const hasError = errors[field.id] && touched[field.id];
    const value = formData[field.id] || (field.type === 'multiselect' ? [] : '');

    const fieldClasses = `w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
      hasError 
        ? 'border-red-300 bg-red-50' 
        : 'border-gray-300 focus:border-blue-500'
    }`;

    switch (field.type) {
      case 'text':
        return (
          <input
            type="text"
            value={value as string}
            onChange={(e) => handleChange(field.id, e.target.value)}
            onBlur={() => handleBlur(field.id)}
            placeholder={field.placeholder}
            className={fieldClasses}
          />
        );

      case 'textarea':
        return (
          <textarea
            value={value as string}
            onChange={(e) => handleChange(field.id, e.target.value)}
            onBlur={() => handleBlur(field.id)}
            placeholder={field.placeholder}
            rows={4}
            className={fieldClasses}
          />
        );

      case 'select':
        return (
          <select
            value={value as string}
            onChange={(e) => handleChange(field.id, e.target.value)}
            onBlur={() => handleBlur(field.id)}
            className={fieldClasses}
          >
            <option value="">请选择{field.label}</option>
            {field.options?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        );

      case 'multiselect':
        const selectedValues = value as string[];
        return (
          <div className="space-y-2">
            <div className="text-sm text-gray-600 mb-2">
              可以选择多个选项（已选择 {selectedValues.length} 项）
            </div>
            <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto border border-gray-300 rounded-lg p-3">
              {field.options?.map((option) => (
                <label key={option} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedValues.includes(option)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        handleChange(field.id, [...selectedValues, option]);
                      } else {
                        handleChange(field.id, selectedValues.filter(v => v !== option));
                      }
                    }}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{option}</span>
                </label>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  // 检查表单完成度
  const getCompletionStatus = () => {
    const requiredFields = scenario.fields.filter(f => f.required);
    const completedFields = requiredFields.filter(field => {
      const value = formData[field.id];
      return value && (typeof value === 'string' ? value.trim() !== '' : value.length > 0);
    });
    return {
      completed: completedFields.length,
      total: requiredFields.length,
      percentage: Math.round((completedFields.length / requiredFields.length) * 100)
    };
  };

  const completionStatus = getCompletionStatus();

  return (
    <div className="space-y-6">
      {/* 表单标题和进度 */}
      <div className="bg-white p-6 rounded-xl border border-gray-200">
        <div className="flex items-center gap-3 mb-4">
          <div className="text-2xl">{scenario.icon}</div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">{scenario.name}</h3>
            <p className="text-gray-600">{scenario.description}</p>
          </div>
        </div>
        
        {/* 进度条 */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">
              表单完成度
            </span>
            <span className="text-sm text-gray-600">
              {completionStatus.completed}/{completionStatus.total} 必填项
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${completionStatus.percentage}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* 表单字段 */}
      <div className="bg-white p-6 rounded-xl border border-gray-200">
        <div className="space-y-6">
          {scenario.fields.map((field) => {
            const hasError = errors[field.id] && touched[field.id];
            return (
              <div key={field.id} className="space-y-2">
                {/* 字段标签 */}
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  {field.label}
                  {field.required && <span className="text-red-500">*</span>}
                  {field.description && (
                    <div className="group relative">
                      <Info className="w-4 h-4 text-gray-400 cursor-help" />
                      <div className="absolute left-0 top-6 bg-gray-800 text-white text-xs p-2 rounded opacity-0 group-hover:opacity-100 transition-opacity z-10 whitespace-nowrap">
                        {field.description}
                      </div>
                    </div>
                  )}
                </label>
                
                {/* 字段输入 */}
                {renderField(field)}
                
                {/* 错误信息 */}
                {hasError && (
                  <div className="flex items-center gap-2 text-red-600 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    {errors[field.id]}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 表单状态提示 */}
      {completionStatus.percentage === 100 && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center gap-2 text-green-800">
            <Check className="w-5 h-5" />
            <span className="font-medium">表单填写完成！</span>
          </div>
          <p className="text-green-700 text-sm mt-1">
            您已完成所有必填项的填写，可以预览和生成Prompt了。
          </p>
        </div>
      )}
    </div>
  );
}