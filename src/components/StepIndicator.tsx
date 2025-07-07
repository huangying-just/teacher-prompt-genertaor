import React from 'react';
import { Check } from 'lucide-react';

interface Step {
  id: number;
  title: string;
  description: string;
}

interface StepIndicatorProps {
  currentStep: number;
  steps: Step[];
  onStepClick?: (step: number) => void;
}

export default function StepIndicator({ currentStep, steps, onStepClick }: StepIndicatorProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">生成步骤</h3>
      
      <div className="space-y-4">
        {steps.map((step, index) => {
          const isCompleted = currentStep > step.id;
          const isCurrent = currentStep === step.id;
          const isClickable = onStepClick && (isCompleted || isCurrent);
          
          return (
            <div
              key={step.id}
              onClick={() => isClickable && onStepClick(step.id)}
              className={`flex items-start gap-4 p-3 rounded-lg transition-colors ${
                isClickable ? 'cursor-pointer hover:bg-gray-50' : ''
              } ${
                isCurrent ? 'bg-blue-50 border border-blue-200' : ''
              }`}
            >
              {/* 步骤图标 */}
              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                isCompleted
                  ? 'bg-green-500 text-white'
                  : isCurrent
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-600'
              }`}>
                {isCompleted ? (
                  <Check className="w-4 h-4" />
                ) : (
                  step.id
                )}
              </div>
              
              {/* 步骤内容 */}
              <div className="flex-1 min-w-0">
                <h4 className={`font-medium ${
                  isCurrent ? 'text-blue-900' : 'text-gray-900'
                }`}>
                  {step.title}
                </h4>
                <p className={`text-sm mt-1 ${
                  isCurrent ? 'text-blue-700' : 'text-gray-600'
                }`}>
                  {step.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}