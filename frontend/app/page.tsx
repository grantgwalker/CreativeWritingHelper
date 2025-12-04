'use client';

import { useState } from 'react';
import WritingTypeSelector from '@/components/WritingTypeSelector';
import ExcerptBrowser from '@/components/ExcerptBrowser';
import WritingInterface from '@/components/WritingInterface';
import StreakDisplay from '@/components/StreakDisplay';
import { TextExcerpt } from '@/lib/api';

type Step = 'select' | 'browse' | 'write' | 'complete';

export default function Home() {
  const [step, setStep] = useState<Step>('select');
  const [writingType, setWritingType] = useState<string>('');
  const [selectedExcerpt, setSelectedExcerpt] = useState<TextExcerpt | null>(null);

  const handleTypeSelected = (type: string) => {
    setWritingType(type);
    setStep('browse');
  };

  const handleExcerptSelected = (excerpt: TextExcerpt) => {
    setSelectedExcerpt(excerpt);
    setStep('write');
  };

  const handleWritingComplete = () => {
    setStep('complete');
  };

  const handleRestart = () => {
    setStep('select');
    setWritingType('');
    setSelectedExcerpt(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-2">
            Creative Writing Helper
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Practice writing with classical literature excerpts
          </p>
        </header>

        <div className="max-w-4xl mx-auto">
          {step === 'select' && (
            <WritingTypeSelector onTypeSelected={handleTypeSelected} />
          )}

          {step === 'browse' && (
            <ExcerptBrowser
              writingType={writingType}
              onExcerptSelected={handleExcerptSelected}
              onBack={() => setStep('select')}
            />
          )}

          {step === 'write' && selectedExcerpt && (
            <WritingInterface
              excerpt={selectedExcerpt}
              writingType={writingType}
              onComplete={handleWritingComplete}
              onBack={() => setStep('browse')}
            />
          )}

          {step === 'complete' && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 text-center">
              <div className="mb-6">
                <svg className="w-20 h-20 mx-auto text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Great Work!
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Your writing has been saved. Keep your streak going!
              </p>
              <StreakDisplay />
              <button
                onClick={handleRestart}
                className="mt-6 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Practice Again
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
