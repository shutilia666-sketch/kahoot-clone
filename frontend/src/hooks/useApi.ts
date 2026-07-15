import { useState, useCallback } from 'react';
import api from '../config/api';

export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const request = useCallback(async (method: string, url: string, data?: any) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api[method as keyof typeof api](url, data);
      setLoading(false);
      return response.data;
    } catch (err: any) {
      const message = err.response?.data?.error || err.message || 'An error occurred';
      setError(message);
      setLoading(false);
      throw err;
    }
  }, []);

  return { request, loading, error };
};
