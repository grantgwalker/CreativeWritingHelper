'use client';

import { useState } from 'react';
import { TextExcerpt, createSession } from '@/lib/api';

interface WritingInterfaceProps {
  excerpt: TextExcerpt;
  writingType: string;
  onComplete: () => void;
  onBack: () => void;
}

export default function WritingInterface({ excerpt, writingType, onComplete, onBack }: WritingInterfaceProps) {
  const [userWriting, setUserWriting] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const [saving, setSaving] = useState(false);
  const [showExcerpt, setShowExcerpt] = useState(true);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setUserWriting(text);
    const words = text.trim().split(/\s+/).filter(word => word.length > 0);
    setWordCount(words.length);
  };

  const handleSubmit = async () => {
    if (userWriting.trim().length === 0) {
      alert('Please write something before submitting!');
      return;
    }

    try {
      setSaving(true);
      await createSession({
        writing_type: writingType,
        excerpt_id: excerpt.id,
        user_writing: userWriting,
      });
      onComplete();
    } catch (err) {
      console.error('Error saving session:', err);
      alert('Failed to save your writing. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8">
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={onBack}
          className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
        >
          ← Back
        </button>
        <button
          onClick={() => setShowExcerpt(!showExcerpt)}
          className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 text-sm"
        >
          {showExcerpt ? 'Hide' : 'Show'} Example
        </button>
      </div>

      {showExcerpt && (
        <div className="mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Example: {excerpt.title} by {excerpt.author}
          </h3>
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
            <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">
              {excerpt.text}
            </p>
          </div>
        </div>
      )}

      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Your Writing
          </h3>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {wordCount} {wordCount === 1 ? 'word' : 'words'}
          </span>
        </div>
        <textarea
          value={userWriting}
          onChange={handleTextChange}
          placeholder="Start writing your own piece inspired by the example above..."
          className="w-full h-64 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white resize-none"
        />
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Write at least a few sentences. Let your creativity flow!
        </p>
      </div>

      <div className="flex gap-4">
        <button
          onClick={handleSubmit}
          disabled={saving || userWriting.trim().length === 0}
          className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed font-semibold"
        >
          {saving ? 'Saving...' : 'Submit Writing'}
        </button>
      </div>
    </div>
  );
}
