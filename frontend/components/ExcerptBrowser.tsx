'use client';

import { useState, useEffect } from 'react';
import { TextExcerpt, searchExcerpts } from '@/lib/api';

interface ExcerptBrowserProps {
  writingType: string;
  onExcerptSelected: (excerpt: TextExcerpt) => void;
  onBack: () => void;
}

export default function ExcerptBrowser({ writingType, onExcerptSelected, onBack }: ExcerptBrowserProps) {
  const [excerpts, setExcerpts] = useState<TextExcerpt[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExcerpts = async () => {
      try {
        setLoading(true);
        const data = await searchExcerpts(writingType);
        setExcerpts(data);
        setError(null);
      } catch (err) {
        setError('Failed to load excerpts. Please try again.');
        console.error('Error fetching excerpts:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchExcerpts();
  }, [writingType]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % excerpts.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + excerpts.length) % excerpts.length);
  };

  const handleSelect = () => {
    if (excerpts[currentIndex]) {
      onExcerptSelected(excerpts[currentIndex]);
    }
  };

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
        <p className="text-gray-600 dark:text-gray-400">Loading excerpts...</p>
      </div>
    );
  }

  if (error || excerpts.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 text-center">
        <p className="text-red-600 dark:text-red-400 mb-4">
          {error || 'No excerpts found for this writing type.'}
        </p>
        <button
          onClick={onBack}
          className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
        >
          Go Back
        </button>
      </div>
    );
  }

  const currentExcerpt = excerpts[currentIndex];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8">
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={onBack}
          className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
        >
          ← Back
        </button>
        <div className="text-sm text-gray-600 dark:text-gray-400">
          {currentIndex + 1} of {excerpts.length}
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {currentExcerpt.title}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              by {currentExcerpt.author}
            </p>
          </div>
          <span className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 rounded-full text-sm font-medium">
            {currentExcerpt.style}
          </span>
        </div>

        <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 mb-6">
          <p className="text-gray-800 dark:text-gray-200 leading-relaxed whitespace-pre-wrap">
            {currentExcerpt.text}
          </p>
        </div>

        {currentExcerpt.source_work && (
          <p className="text-sm text-gray-600 dark:text-gray-400 italic">
            From: {currentExcerpt.source_work}
          </p>
        )}
      </div>

      <div className="flex justify-between items-center gap-4">
        <button
          onClick={handlePrevious}
          className="flex-1 px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          ← Previous
        </button>
        <button
          onClick={handleSelect}
          className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-semibold"
        >
          Practice with This
        </button>
        <button
          onClick={handleNext}
          className="flex-1 px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          Next →
        </button>
      </div>
    </div>
  );
}
