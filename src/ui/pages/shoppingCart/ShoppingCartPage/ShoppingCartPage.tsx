import { Box, CircularProgress } from '@mui/material';
import useShoppingCart from '../../../../hooks/useShoppingCart.ts';
import ShoppingCart from '../../../components/shoppingCart/ShoppingCart/ShoppingCart.tsx';

const ShoppingCartPage = () => {
  const { items, total, loading, onRemove, onCheckout } = useShoppingCart();

  if (loading) {
    return (
      <Box className='progress-box'>
        <CircularProgress/>
      </Box>
    );
  }

  return (
    <ShoppingCart
      items={items}
      total={total}
      onRemove={onRemove}
      onCheckout={onCheckout}
    />
  );
};

export default ShoppingCartPage;