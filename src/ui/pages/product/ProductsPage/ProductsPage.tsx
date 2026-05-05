import './ProductsPage.css';
import useProducts from '../../../../hooks/useProducts.ts';
import { Alert, Box, Button, CircularProgress, Snackbar } from '@mui/material';
import ProductGrid from '../../../components/product/ProductGrid/ProductGrid.tsx';
import { useState } from 'react';
import AddProductDialog from '../../../components/product/AddProductDialog/AddProductDialog.tsx';
import type { ProductFormData } from '../../../../api/types/product.ts';
import useAuth from '../../../../hooks/useAuth.ts';

const ProductsPage = () => {
  const { user } = useAuth();
  const isAdmin = user?.roles.includes('ROLE_ADMINISTRATOR') ?? false;

  const { products, loading, onAdd, onEdit, onDelete } = useProducts();

  const [addProductDialogOpen, setAddProductDialogOpen] = useState<boolean>(false);

  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string }>({
    open: false,
    message: ''
  });

  const handleAdd = async (data: ProductFormData) => {
    try {
      await onAdd(data);
    } catch (err) {
      setSnackbar({
        open: true,
        message: err instanceof Error ? err.message : 'Failed to add product.'
      });
    }
  };

  return (
    <Box className='products-box'>
      {loading && (
        <Box className='progress-box'>
          <CircularProgress/>
        </Box>
      )}
      {!loading &&
       <>
         {isAdmin && (
           <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
             <Button variant='contained' color='primary' onClick={() => setAddProductDialogOpen(true)}>
               Add Product
             </Button>
           </Box>
         )}
         <ProductGrid products={products} onEdit={onEdit} onDelete={onDelete}/>
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
         <AddProductDialog
           open={addProductDialogOpen}
           onClose={() => setAddProductDialogOpen(false)}
           onAdd={handleAdd}
         />
       </>}
    </Box>
  );
};

export default ProductsPage;