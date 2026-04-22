import { useCallback, useEffect, useState } from 'react';
import productApi from '../api/productApi.ts';
import type { ProductDetails } from '../api/types/product.ts';

const useProductDetails = (id: string | undefined) => {
  const [productDetails, setProductDetails] = useState<ProductDetails | null>(null);

  const fetch = useCallback(() => {
    if (!id) return;

    productApi
      .findWithDetailsById(id)
      .then((response) => setProductDetails(response.data))
      .catch((error) => console.log(error));
  }, [id]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { productDetails };
};

export default useProductDetails;