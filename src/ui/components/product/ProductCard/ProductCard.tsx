import { Alert, Box, Button, Card, CardActions, CardContent, Snackbar, Typography } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import type { Product, ProductFormData } from '../../../../api/types/product.ts';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import EditProductDialog from '../EditProductDialog/EditProductDialog.tsx';
import DeleteProductDialog from '../DeleteProductDialog/DeleteProductDialog.tsx';

interface ProductCardProps {
  product: Product;
  onEdit: (id: number, data: ProductFormData) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
}

const ProductCard = ({ product, onEdit, onDelete }: ProductCardProps) => {
  const navigate = useNavigate();

  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string }>({
    open: false,
    message: ''
  });

  const [editProductDialogOpen, setEditProductDialogOpen] = useState<boolean>(false);
  const [deleteProductDialogOpen, setDeleteProductDialogOpen] = useState<boolean>(false);

  const handleEdit = async (id: number, data: ProductFormData) => {
    try {
      await onEdit(id, data);
    } catch (err) {
      setSnackbar({
        open: true,
        message: err instanceof Error ? err.message : 'Failed to edit product.'
      });
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await onDelete(id);
    } catch (err) {
      setSnackbar({
        open: true,
        message: err instanceof Error ? err.message : 'Failed to delete product.'
      });
    }
  };

  return (
    <>
      <Card sx={{ maxWidth: 300, height: '100%', display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{flexGrow: 1, display: 'flex', flexDirection: 'column'}}>
          <Typography variant='h5'>{product.name}</Typography>
          <Typography variant='subtitle1' sx={{flexGrow: 1}}>{product.description}</Typography>
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
            <Button startIcon={<EditIcon/>} color='warning' onClick={() => setEditProductDialogOpen(true)}>Edit</Button>
            <Button startIcon={<DeleteIcon/>} color='error' onClick={() => setDeleteProductDialogOpen(true)}>Delete</Button>
          </Box>
        </CardActions>
      </Card>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          severity='error'
          onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}>
          {snackbar.message}
        </Alert>
      </Snackbar>
      <EditProductDialog
        product={product}
        open={editProductDialogOpen}
        onClose={() => setEditProductDialogOpen(false)}
        onEdit={handleEdit}
      />
      <DeleteProductDialog
        product={product}
        open={deleteProductDialogOpen}
        onClose={() => setDeleteProductDialogOpen(false)}
        onDelete={handleDelete}
      />
    </>
  );
};

export default ProductCard;