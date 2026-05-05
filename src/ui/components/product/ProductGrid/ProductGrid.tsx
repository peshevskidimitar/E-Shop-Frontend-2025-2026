import type { Product, ProductFormData } from '../../../../api/types/product.ts';
import { Grid } from '@mui/material';
import ProductCard from '../ProductCard/ProductCard.tsx';

interface ProductGridProps {
  products: Product[];
  onEdit: (id: number, data: ProductFormData) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
}

const ProductGrid = ({ products, onEdit, onDelete }: ProductGridProps) => {
  return (
    <Grid container spacing={{ xs: 2, md: 3 }}>
      {products.map((product) => (
        <Grid key={product.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
          <ProductCard product={product} onEdit={onEdit} onDelete={onDelete}/>
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductGrid;