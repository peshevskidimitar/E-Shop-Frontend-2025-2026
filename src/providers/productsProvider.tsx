import { useCallback, useEffect, useMemo, useState } from 'react';
import * as React from 'react';
import productApi from '../api/productApi';
import type { CreateProductRequest, ProductResponse } from '../api/types/product.ts';
import ProductsContext from '../contexts/productsContext.ts';
import useSnackbar from '../hooks/useSnackbar.ts';

const ProductsProvider = ({ children }: { children: React.ReactNode }) => {
  const { showSnackbar } = useSnackbar();

  const [products, setProducts] = useState<ProductResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetch = useCallback(async () => {
    setLoading(true);

    try {
      const response = await productApi.findAll();
      setProducts(response.data);
    } catch (err) {
      showSnackbar(err instanceof Error ? err.message : 'Failed to load products.', 'error');
    } finally {
      setLoading(false);
    }
  }, [showSnackbar]);

  const onAdd = useCallback(async (data: CreateProductRequest) => {
    try {
      await productApi.add(data);
      await fetch();
    } catch (err) {
      showSnackbar(err instanceof Error ? err.message : 'Failed to add product.', 'error');
    }
  }, [fetch, showSnackbar]);

  const onEdit = useCallback(async (id: number, data: CreateProductRequest) => {
    try {
      await productApi.edit(id.toString(), data);
      await fetch();
    } catch (err) {
      showSnackbar(err instanceof Error ? err.message : 'Failed to edit product.', 'error');
    }
  }, [fetch, showSnackbar]);

  const onDelete = useCallback(async (id: number) => {
    try {
      await productApi.delete(id.toString());
      await fetch();
    } catch (err) {
      showSnackbar(err instanceof Error ? err.message : 'Failed to delete product.', 'error');
    }
  }, [fetch, showSnackbar]);

  useEffect(() => {
    void fetch();
  }, [fetch]);

  const value = useMemo(
    () => ({ products, loading, onAdd, onEdit, onDelete }),
    [products, loading, onAdd, onEdit, onDelete]
  );

  return <ProductsContext value={value}>{children}</ProductsContext>;
};

export default ProductsProvider;