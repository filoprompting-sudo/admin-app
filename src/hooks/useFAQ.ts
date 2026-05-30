import { useState, useCallback } from 'react';
import { getFAQs, saveFAQs, type FAQEntry } from '@/lib/storage';

let globalFAQs = getFAQs();
let listeners: (() => void)[] = [];

function notifyListeners() {
  listeners.forEach((fn) => fn());
}

function setGlobalFAQs(faqs: FAQEntry[]) {
  globalFAQs = faqs;
  saveFAQs(faqs);
  notifyListeners();
}

export function useFAQ() {
  const [faqs, setLocalFAQs] = useState<FAQEntry[]>(globalFAQs);

  // Subscribe to global changes
  useState(() => {
    const listener = () => setLocalFAQs([...globalFAQs]);
    listeners.push(listener);
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  });

  const addFAQ = useCallback(
    (question: string, answer: string, category: FAQEntry['category']) => {
      const newEntry: FAQEntry = {
        id: `faq_${Date.now()}`,
        question: question.trim(),
        answer: answer.trim(),
        category,
        createdAt: new Date().toISOString(),
      };
      const updated = [newEntry, ...globalFAQs];
      setGlobalFAQs(updated);
      setLocalFAQs(updated);
      return true;
    },
    []
  );

  const updateFAQ = useCallback(
    (id: string, updates: Partial<Omit<FAQEntry, 'id' | 'createdAt'>>) => {
      const updated = globalFAQs.map((f) =>
        f.id === id ? { ...f, ...updates } : f
      );
      setGlobalFAQs(updated);
      setLocalFAQs(updated);
      return true;
    },
    []
  );

  const deleteFAQ = useCallback((id: string) => {
    const updated = globalFAQs.filter((f) => f.id !== id);
    setGlobalFAQs(updated);
    setLocalFAQs(updated);
    return true;
  }, []);

  return { faqs, addFAQ, updateFAQ, deleteFAQ };
}
