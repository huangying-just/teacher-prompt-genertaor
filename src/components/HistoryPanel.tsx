import React, { useState } from 'react';
import { Clock, Star, Trash2, Search, Copy, Download, Filter } from 'lucide-react';
import { HistoryItem } from '../types';
import { usePromptHistory } from '../hooks/useLocalStorage';

interface HistoryPanelProps {
  onLoadPrompt?: (item: HistoryItem) => void;
}

export default function HistoryPanel({ onLoadPrompt }: HistoryPanelProps) {
  const { history, removeFromHistory, clearHistory, toggleFavorite } = usePromptHistory();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'favorites'>('all');
  const [copySuccess, setCopySuccess] = useState<string | null>(null);
  
  // 筛选历史记录
  const filteredHistory = history.filter(item => {
    const matchesSearch = !searchQuery || 
      item.scenarioName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.content.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = filterType === 'all' || 
      (filterType === 'favorites' && item.favorite);
    
    return matchesSearch && matchesFilter;
  });
  
  // 复制内容
  const copyContent = async (content: string, id: string) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopySuccess(id);
      setTimeout(() => setCopySuccess(null), 2000);
    } catch (err) {
      console.error('复制失败:', err);
    }
  };
  
  // 导出历史记录
  const exportHistory = () => {
    const exportData = history.map(item => ({
      时间: new Date(item.createdAt).toLocaleString('zh-CN'),
      场景: item.scenarioName,
      内容: item.content,
      收藏: item.favorite ? '是' : '否'
    }));
    
    const jsonString = JSON.stringify(exportData, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `prompt-history-${Date.now()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };
  
  // 格式化时间
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
    } else if (diffDays === 1) {
      return '昨天 ' + date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
    } else if (diffDays < 7) {
      return `${diffDays}天前`;
    } else {
      return date.toLocaleDateString('zh-CN');
    }
  };
  
  return (
    <div className="space-y-6">
      {/* 标题和工具栏 */}
      <div className="bg-white p-6 rounded-xl border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Clock className="w-6 h-6 text-indigo-600" />
            <div>
              <h3 className="text-xl font-bold text-gray-900">历史记录</h3>
              <p className="text-gray-600">管理您生成的Prompt记录</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {history.length > 0 && (
              <>
                <button
                  onClick={exportHistory}
                  className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-blue-700 hover:bg-blue-100 rounded-lg transition-colors"
                >
                  <Download className="w-4 h-4" />
                  导出
                </button>
                <button
                  onClick={clearHistory}
                  className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-red-700 hover:bg-red-100 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  清空
                </button>
              </>
            )}
          </div>
        </div>
        
        {/* 搜索和筛选 */}
        {history.length > 0 && (
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="搜索历史记录..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value as 'all' | 'favorites')}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
              >
                <option value="all">全部记录</option>
                <option value="favorites">收藏记录</option>
              </select>
            </div>
          </div>
        )}
      </div>
      
      {/* 历史记录列表 */}
      {filteredHistory.length > 0 ? (
        <div className="space-y-4">
          {filteredHistory.map((item) => (
            <div key={item.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
              {/* 记录头部 */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <h4 className="font-medium text-gray-900">{item.scenarioName}</h4>
                  <span className="text-sm text-gray-500">{formatTime(item.createdAt)}</span>
                  {item.favorite && (
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  )}
                </div>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleFavorite(item.id)}
                    className={`p-1.5 rounded-lg transition-colors ${
                      item.favorite
                        ? 'text-yellow-600 hover:bg-yellow-100'
                        : 'text-gray-400 hover:bg-gray-100'
                    }`}
                    title={item.favorite ? '取消收藏' : '收藏'}
                  >
                    <Star className={`w-4 h-4 ${item.favorite ? 'fill-current' : ''}`} />
                  </button>
                  
                  <button
                    onClick={() => copyContent(item.content, item.id)}
                    className={`p-1.5 rounded-lg transition-colors ${
                      copySuccess === item.id
                        ? 'text-green-600 bg-green-100'
                        : 'text-gray-400 hover:bg-gray-100'
                    }`}
                    title="复制内容"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  
                  {onLoadPrompt && (
                    <button
                      onClick={() => onLoadPrompt(item)}
                      className="px-3 py-1.5 text-sm font-medium text-blue-700 hover:bg-blue-100 rounded-lg transition-colors"
                    >
                      加载
                    </button>
                  )}
                  
                  <button
                    onClick={() => removeFromHistory(item.id)}
                    className="p-1.5 text-red-400 hover:bg-red-100 rounded-lg transition-colors"
                    title="删除记录"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              {/* 内容预览 */}
              <div className="bg-gray-50 rounded-lg p-3">
                <pre className="whitespace-pre-wrap text-sm text-gray-700 line-clamp-3 overflow-hidden">
                  {item.content.length > 200 
                    ? item.content.substring(0, 200) + '...' 
                    : item.content
                  }
                </pre>
              </div>
              
              {copySuccess === item.id && (
                <div className="mt-2 text-sm text-green-600">
                  ✓ 已复制到剪贴板
                </div>
              )}
            </div>
          ))}
        </div>
      ) : history.length === 0 ? (
        // 空状态 - 无历史记录
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <Clock className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            还没有历史记录
          </h3>
          <p className="text-gray-600 mb-4">
            生成您的第一个Prompt后，记录会自动保存在这里
          </p>
        </div>
      ) : (
        // 空状态 - 搜索无结果
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            未找到匹配的记录
          </h3>
          <p className="text-gray-600">
            请尝试修改搜索关键词或筛选条件
          </p>
        </div>
      )}
    </div>
  );
}