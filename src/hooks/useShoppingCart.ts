import { useCallback, useEffect, useState } from 'react';
import shoppingCartApi from '../api/shoppingCartApi.ts';
import type { CartItemResponse, ShoppingCartResponse } from '../api/types/shoppingCart.ts';
import useSnackbar from './useSnackbar.ts';

const emptyCart: ShoppingCartResponse = { id: null, cartItems: [] };

const useShoppingCart = () => {
  const { showSnackbar } = useSnackbar();

  const [cart, setCart] = useState<ShoppingCartResponse>(emptyCart);
  const [loading, setLoading] = useState<boolean>(false);

  const fetch = useCallback(async () => {
    setLoading(true);

    try {
      const response = await shoppingCartApi.find();
      setCart(response.data);
    } catch (err) {
      showSnackbar(err instanceof Error ? err.message : 'Failed to load cart.', 'error');
    } finally {
      setLoading(false);
    }
  }, [showSnackbar]);

  const onAdd = useCallback(async (productId: number, quantity: number) => {
    try {
      const response = await shoppingCartApi.add({ productId, quantity });
      setCart(response.data);
    } catch (err) {
      showSnackbar(err instanceof Error ? err.message : 'Failed to add to cart.', 'error');
    }
  }, [showSnackbar]);

  const onRemove = useCallback(async (productId: number) => {
    try {
      const response = await shoppingCartApi.remove(productId);
      setCart(response.data);
    } catch (err) {
      showSnackbar(err instanceof Error ? err.message : 'Failed to remove item.', 'error');
    }
  }, [showSnackbar]);

  const onCheckout = useCallback(async () => {
    try {
      await shoppingCartApi.checkout();
      setCart(emptyCart);
    } catch (err) {
      showSnackbar(err instanceof Error ? err.message : 'Failed to checkout.', 'error');
    }
  }, [showSnackbar]);

  useEffect(() => {
    void fetch();
  }, [fetch]);

  const items: CartItemResponse[] = cart.cartItems;
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return { items, total, loading, fetch, onAdd, onRemove, onCheckout };
};

export default useShoppingCart;