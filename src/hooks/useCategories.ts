import { useCallback, useEffect, useState } from 'react';
import type { CategoryResponse } from '../api/types/category.ts';
import categoryApi from '../api/categoryApi.ts';
import useSnackbar from './useSnackbar.ts';

const useCategories = () => {
  const { showSnackbar } = useSnackbar();

  const [categories, setCategories] = useState<CategoryResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetch = useCallback(async () => {
    setLoading(true);

    try {
      const response = await categoryApi.findAll();
      setCategories(response.data);
    } catch (err) {
      showSnackbar(err instanceof Error ? err.message : 'Failed to load categories.', 'error');
    } finally {
      setLoading(false);
    }
  }, [showSnackbar]);

  useEffect(() => {
    void fetch();
  }, [fetch]);

  return { categories, loading, fetch };
};

export default useCategories;