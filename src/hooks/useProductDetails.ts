import { useCallback, useEffect, useState } from 'react';
import productApi from '../api/productApi';
import type { ProductDetailsResponse } from '../api/types/product.ts';
import useSnackbar from './useSnackbar.ts';

const useProductDetails = (id?: string) => {
  const { showSnackbar } = useSnackbar();

  const [productDetails, setProductDetails] = useState<ProductDetailsResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetch = useCallback(async () => {
    if (!id) {
      return;
    }

    setLoading(true);

    try {
      const response = await productApi.findWithDetailsById(id);
      setProductDetails(response.data);
    } catch (err) {
      showSnackbar(err instanceof Error ? err.message : 'Failed to load product details.', 'error');
    } finally {
      setLoading(false);
    }
  }, [id, showSnackbar]);

  useEffect(() => {
    void fetch();
  }, [fetch]);

  return { productDetails, loading };
};

export default useProductDetails;
