import { useCallback, useEffect, useState } from 'react';
import productApi from '../api/productApi';
import type { ProductFormData, Product } from '../api/types/product';

const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await productApi.findAll();
      setProducts(response.data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An unknown error occurred.'));
    } finally {
      setLoading(false);
    }
  }, []);

  const onAdd = useCallback(async (data: ProductFormData) => {
    await productApi.add(data);
    await fetch();
  }, [fetch]);

  const onEdit = useCallback(async (id: number, data: ProductFormData) => {
    await productApi.edit(id.toString(), data);
    await fetch();
  }, [fetch]);

  const onDelete = useCallback(async (id: number) => {
    await productApi.delete(id.toString());
    await fetch();
  }, [fetch]);

  useEffect(() => {
    void fetch();
  }, [fetch]);

  return { products, loading, error, fetch, onAdd, onEdit, onDelete };
};

export default useProducts;