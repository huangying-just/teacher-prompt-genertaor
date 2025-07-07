import { useState, useEffect } from 'react';

// 通用的localStorage hook
export function useLocalStorage<T>(key: string, initialValue: T) {
  // 获取存储的值或使用初始值
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // 返回包装的版本的useState的setter函数，用于持久化新值到localStorage
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // 允许value是一个函数，以便能够使用函数式更新
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue] as const;
}

// 历史记录管理hook
export function usePromptHistory() {
  const [history, setHistory] = useLocalStorage('prompt-history', []);
  
  const addToHistory = (prompt: any) => {
    setHistory((prev: any[]) => {
      const newHistory = [{ ...prompt, id: Date.now().toString() }, ...prev];
      // 限制历史记录数量为50条
      return newHistory.slice(0, 50);
    });
  };
  
  const removeFromHistory = (id: string) => {
    setHistory((prev: any[]) => prev.filter(item => item.id !== id));
  };
  
  const clearHistory = () => {
    setHistory([]);
  };
  
  const toggleFavorite = (id: string) => {
    setHistory((prev: any[]) => 
      prev.map(item => 
        item.id === id ? { ...item, favorite: !item.favorite } : item
      )
    );
  };
  
  return {
    history,
    addToHistory,
    removeFromHistory,
    clearHistory,
    toggleFavorite
  };
}