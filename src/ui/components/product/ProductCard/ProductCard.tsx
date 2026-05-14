import { Box, Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import type { ProductResponse } from '../../../../api/types/product.ts';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import AddOrEditProductDialog from '../AddOrEditProductDialog/AddOrEditProductDialog.tsx';
import DeleteProductDialog from '../DeleteProductDialog/DeleteProductDialog.tsx';
import useAuth from '../../../../hooks/useAuth.ts';

interface ProductCardProps {
  product: ProductResponse;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { user } = useAuth();
  const isAdmin = user?.roles.includes('ROLE_ADMINISTRATOR') ?? false;

  const navigate = useNavigate();

  const [editProductDialogOpen, setEditProductDialogOpen] = useState<boolean>(false);
  const [deleteProductDialogOpen, setDeleteProductDialogOpen] = useState<boolean>(false);

  return (
    <>
      <Card sx={{ maxWidth: 300, height: '100%', display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          <Typography variant='h5'>{product.name}</Typography>
          <Typography variant='subtitle1' sx={{ flexGrow: 1 }}>{product.description}</Typography>
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
            {isAdmin && (
              <Button
                startIcon={<EditIcon/>}
                color='warning'
                onClick={() => setEditProductDialogOpen(true)}
              >
                Edit
              </Button>
            )}
            {isAdmin && (
              <Button
                startIcon={<DeleteIcon/>}
                color='error'
                onClick={() => setDeleteProductDialogOpen(true)}
              >
                Delete
              </Button>
            )}
          </Box>
        </CardActions>
      </Card>
      <AddOrEditProductDialog
        product={product}
        open={editProductDialogOpen}
        onClose={() => setEditProductDialogOpen(false)}
      />
      <DeleteProductDialog
        product={product}
        open={deleteProductDialogOpen}
        onClose={() => setDeleteProductDialogOpen(false)}
      />
    </>
  );
};

export default ProductCard;