import useProductDetails from '../../../hooks/useProductDetails.ts';
import { Link, useNavigate, useParams } from 'react-router';
import {
  Avatar, Box, Breadcrumbs, Button, Chip, CircularProgress, Grid, Paper, Stack, Typography
} from '@mui/material';
import { ArrowBack, Category, FavoriteBorder, Share, ShoppingCart } from '@mui/icons-material';

const ProductDetailsPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { productDetails } = useProductDetails(id);

  if (!productDetails) {
    return <Box className='progress-box'><CircularProgress/></Box>;
  }

  return (
    <Box>
      <Breadcrumbs aria-label='breadcrumb' sx={{ mb: 3 }}>
        <Link to='/products' style={{ textDecoration: 'none', color: 'inherit' }}
              onMouseEnter={e => (e.currentTarget.style.textDecoration = 'underline')}
              onMouseLeave={e => (e.currentTarget.style.textDecoration = 'none')}
        >
          Products
        </Link>
        <Typography color='text.primary'>{productDetails.name}</Typography>
      </Breadcrumbs>

      <Paper elevation={2} sx={{ p: 4, borderRadius: 4 }}>
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 3 }}>
            <Box sx={{
              display: 'flex',
              justifyContent: 'center',
              mb: 4,
              bgcolor: 'background.paper',
              p: 3,
              borderRadius: 3,
              boxShadow: 1
            }}>
              <Avatar
                src='/placeholder-product.jpg'
                variant='rounded'
                sx={{ width: '100%', height: 'auto', objectFit: 'contain' }}
              />
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 9 }}>
            <Box sx={{ mb: 3 }}>
              <Typography variant='h3' gutterBottom sx={{ fontWeight: 600 }}>
                {productDetails.name}
              </Typography>

              <Typography variant='h4' color='primary.main' sx={{ mb: 3 }}>
                ${productDetails.price}
              </Typography>

              <Typography variant='subtitle1' sx={{ mb: 3 }}>
                {productDetails.quantity} piece(s) available
              </Typography>

              <Typography variant='body1' sx={{ mb: 3 }}>
                {productDetails.description}
              </Typography>

              <Stack direction='row' spacing={1} sx={{ mb: 3 }}>
                <Chip
                  icon={<Category/>}
                  label={productDetails.category.name}
                  color='primary'
                  variant='outlined'
                  sx={{ p: 2 }}
                />
              </Stack>
            </Box>
          </Grid>

          <Grid size={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Stack direction='row' spacing={2}>
              <Button variant='contained' color='primary' startIcon={<ShoppingCart/>} size='large'>
                Add to Cart
              </Button>
              <Button variant='outlined' color='secondary' startIcon={<FavoriteBorder/>}>
                Wishlist
              </Button>
              <Button variant='outlined' startIcon={<Share/>}>
                Share
              </Button>
            </Stack>
            <Button variant='outlined' startIcon={<ArrowBack/>} onClick={() => navigate('/products')}>
              Back to Products
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default ProductDetailsPage;