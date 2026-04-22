import { Box, Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import type { Product } from '../../../../api/types/product.ts';
import { useNavigate } from 'react-router';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const navigate = useNavigate();

  return (
    <Card sx={{ maxWidth: 300 }}>
      <CardContent>
        <Typography variant='h5'>{product.name}</Typography>
        <Typography variant='subtitle1'>{product.description}</Typography>
        <Typography variant='h6' sx={{ textAlign: 'right' }}>${product.price}</Typography>
        <Typography variant='body2' sx={{ textAlign: 'left' }}>{product.quantity} piece(s) available</Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'space-between' }}>
        <Button
          startIcon={<InfoIcon/>}
          onClick={() => navigate(`/products/${product.id}`)}
        >
          Info
        </Button>
        <Box>
          <Button startIcon={<EditIcon/>} color='warning'>Edit</Button>
          <Button startIcon={<DeleteIcon/>} color='error'>Delete</Button>
        </Box>
      </CardActions>
    </Card>
  );
};

export default ProductCard;