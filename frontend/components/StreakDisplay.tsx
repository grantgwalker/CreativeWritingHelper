'use client';

import { useState, useEffect } from 'react';
import { WritingStreak, getCurrentStreak } from '@/lib/api';

export default function StreakDisplay() {
  const [streak, setStreak] = useState<WritingStreak | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStreak = async () => {
      try {
        const data = await getCurrentStreak();
        setStreak(data);
      } catch (err) {
        console.error('Error fetching streak:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStreak();
  }, []);

  if (loading) {
    return (
      <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 animate-pulse">
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
      </div>
    );
  }

  if (!streak) {
    return null;
  }

  return (
    <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-gray-900 dark:to-gray-800 rounded-lg p-6 border-2 border-yellow-200 dark:border-yellow-900">
      <div className="flex items-center justify-center gap-8">
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <svg className="w-8 h-8 text-yellow-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-3xl font-bold text-gray-900 dark:text-white">
              {streak.current_streak}
            </span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">Current Streak</p>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <svg className="w-8 h-8 text-purple-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd" />
            </svg>
            <span className="text-3xl font-bold text-gray-900 dark:text-white">
              {streak.longest_streak}
            </span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">Longest Streak</p>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <svg className="w-8 h-8 text-blue-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
              <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
            </svg>
            <span className="text-3xl font-bold text-gray-900 dark:text-white">
              {streak.total_sessions}
            </span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">Total Sessions</p>
        </div>
      </div>
    </div>
  );
}
