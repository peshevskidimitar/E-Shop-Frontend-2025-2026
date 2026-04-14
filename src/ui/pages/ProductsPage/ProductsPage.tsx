import useProducts from '../../../hooks/useProducts.ts';
import { Box, CircularProgress } from '@mui/material';
import ProductGrid from '../../components/product/ProductGrid/ProductGrid.tsx';

const ProductsPage = () => {
  const { products, loading } = useProducts();

  return (
    <Box className='products-box'>
      {loading && (
        <Box className='progress-box'>
          <CircularProgress/>
        </Box>
      )}
      {!loading && <ProductGrid products={products}/>}
    </Box>

  );
};

export default ProductsPage;