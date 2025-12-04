'use client';

import { useState } from 'react';

interface WritingTypeSelectorProps {
  onTypeSelected: (type: string) => void;
}

const writingTypes = [
  { value: 'narrative', label: 'Narrative', description: 'Tell a story or describe events' },
  { value: 'descriptive', label: 'Descriptive', description: 'Paint vivid pictures with words' },
  { value: 'dialogue', label: 'Dialogue', description: 'Write conversations between characters' },
  { value: 'poetic', label: 'Poetic', description: 'Express through rhythm and imagery' },
  { value: 'expository', label: 'Expository', description: 'Explain or inform' },
];

export default function WritingTypeSelector({ onTypeSelected }: WritingTypeSelectorProps) {
  const [customType, setCustomType] = useState('');

  const handleSelect = (type: string) => {
    onTypeSelected(type);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customType.trim()) {
      onTypeSelected(customType.trim());
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
        What type of writing do you want to practice?
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {writingTypes.map((type) => (
          <button
            key={type.value}
            onClick={() => handleSelect(type.value)}
            className="p-6 border-2 border-gray-200 dark:border-gray-700 rounded-lg hover:border-indigo-500 hover:bg-indigo-50 dark:hover:bg-gray-700 transition-all text-left group"
          >
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
              {type.label}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              {type.description}
            </p>
          </button>
        ))}
      </div>

      <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 text-center">
          Or enter your own:
        </h3>
        <form onSubmit={handleCustomSubmit} className="flex gap-2">
          <input
            type="text"
            value={customType}
            onChange={(e) => setCustomType(e.target.value)}
            placeholder="e.g., mystery, romance, sci-fi..."
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Go
          </button>
        </form>
      </div>
    </div>
  );
}
