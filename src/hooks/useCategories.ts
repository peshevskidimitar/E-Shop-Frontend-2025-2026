import { useCallback, useEffect, useState } from 'react';
import type { Category } from '../api/types/category.ts';
import categoryApi from '../api/categoryApi.ts';

const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await categoryApi.findAll();
      setCategories(response.data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An unknown error occurred.'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetch();
  }, [fetch]);

  return { categories, loading, error, fetch };
};

export default useCategories;