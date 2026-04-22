import { useCallback, useEffect, useState } from 'react';
import productApi from '../api/productApi';
import type { ProductDetails } from '../api/types/product';

const useProductDetails = (id?: string) => {
  const [productDetails, setProductDetails] = useState<ProductDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const fetch = useCallback(async () => {
    if (!id) {
      return;
    }

    setLoading(true);

    try {
      const response = await productApi.findWithDetailsById(id);
      setProductDetails(response.data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An unknown error occurred.'));
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    void fetch();
  }, [fetch]);

  return { productDetails, loading, error };
};

export default useProductDetails;