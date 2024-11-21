import { useEffect, useState } from 'react';
import { useFetchAllProductsQuery } from '../../services/apis/sellerApi';
import { ProductType } from '../../interface/productTypes/productType';

export function useProductsData(page: number, limit: number) {
  const { data, error, isLoading } = useFetchAllProductsQuery({ page, limit });
  const [products, setProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    if (data?.products) {
      setProducts(data.products);
    }
  }, [data]);

  return { products, error, isLoading };
}
