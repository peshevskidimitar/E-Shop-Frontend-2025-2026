import './ProductsPage.css';
import useProducts from '../../../../hooks/useProducts.ts';
import { Box, Button, CircularProgress } from '@mui/material';
import ProductGrid from '../../../components/product/ProductGrid/ProductGrid.tsx';
import { useState } from 'react';
import AddOrEditProductDialog from '../../../components/product/AddOrEditProductDialog/AddOrEditProductDialog.tsx';
import useAuth from '../../../../hooks/useAuth.ts';

const ProductsPage = () => {
  const { user } = useAuth();
  const isAdmin = user?.roles.includes('ROLE_ADMINISTRATOR') ?? false;

  const { products, loading } = useProducts();

  const [addProductDialogOpen, setAddProductDialogOpen] = useState<boolean>(false);

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
         <ProductGrid products={products}/>
         <AddOrEditProductDialog
           open={addProductDialogOpen}
           onClose={() => setAddProductDialogOpen(false)}
         />
       </>}
    </Box>
  );
};

export default ProductsPage;