import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography
} from '@mui/material';
import { Delete } from '@mui/icons-material';
import type { CartItemResponse } from '../../../../api/types/shoppingCart.ts';
import useSnackbar from '../../../../hooks/useSnackbar.ts';

interface ShoppingCartProps {
  items: CartItemResponse[];
  total: number;
  onRemove: (productId: number) => Promise<void>;
  onCheckout: () => Promise<void>;
}

const ShoppingCart = ({ items, total, onRemove, onCheckout }: ShoppingCartProps) => {
  const { showSnackbar } = useSnackbar();

  const handleRemove = (productId: number) => {
    void onRemove(productId);
  };

  const handleCheckout = async () => {
    await onCheckout();
    showSnackbar('Checkout completed.', 'success');
  };

  const isEmpty = items.length === 0;

  return (
    <Box sx={{ my: 3, width: 500, mx: 'auto' }}>
      <Card>
        <CardContent>
          <Typography variant='h5' gutterBottom>
            Shopping Cart
          </Typography>
          <Divider sx={{ mb: 2 }}/>
          {isEmpty ? (
            <Typography color='text.secondary' sx={{ py: 2, textAlign: 'center' }}>
              Your cart is empty.
            </Typography>
          ) : (
            <List>
              {items.map((item) => (
                <ListItem
                  key={item.productId}
                  secondaryAction={
                    <IconButton edge='end' color='error' onClick={() => handleRemove(item.productId)}>
                      <Delete/>
                    </IconButton>
                  }
                >
                  <ListItemText
                    primary={item.productName}
                    secondary={`$${item.price.toFixed(2)} × ${item.quantity} = $${(item.price * item.quantity).toFixed(2)}`}
                  />
                </ListItem>
              ))}
            </List>
          )}
          <Divider sx={{ my: 2 }}/>
          <Typography variant='h6'>Total: ${total.toFixed(2)}</Typography>
          <Button
            variant='contained'
            color='primary'
            fullWidth
            sx={{ mt: 2 }}
            disabled={isEmpty}
            onClick={handleCheckout}
          >
            Checkout
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ShoppingCart;