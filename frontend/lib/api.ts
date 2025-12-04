import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface TextExcerpt {
  id: number;
  title: string;
  author: string;
  text: string;
  writing_type: string;
  style: string;
  source_work: string;
}

export interface WritingSession {
  id?: number;
  user?: number;
  writing_type: string;
  excerpt_id?: number;
  excerpt?: TextExcerpt;
  user_writing: string;
  created_at?: string;
  word_count?: number;
}

export interface WritingStreak {
  id: number;
  username: string;
  current_streak: number;
  longest_streak: number;
  last_writing_date: string | null;
  total_sessions: number;
}

// API functions
export const searchExcerpts = async (writingType: string): Promise<TextExcerpt[]> => {
  const response = await api.get('/excerpts/search/', {
    params: { writing_type: writingType },
  });
  return response.data;
};

export const createSession = async (session: WritingSession): Promise<WritingSession> => {
  const response = await api.post('/sessions/', session);
  return response.data;
};

export const getCurrentStreak = async (): Promise<WritingStreak> => {
  const response = await api.get('/streaks/current_user/');
  return response.data;
};

export default api;
