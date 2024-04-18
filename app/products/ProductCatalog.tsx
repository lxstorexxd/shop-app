import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import PaginationControls from "@/components/PaginationControl";
import ProductsFilters from "@/components/ProductsFilters";

import type { FiltersProps, ProductProps } from "@/types";
import { getProducts } from "./action/getProducts";
import { PlaceListGrid } from "@/components/PlaceListGrid";

const ProductCatalog = () => {
  const [productStats, setProductStats] = useState<{
    maxPrice: number;
    totalCount: number;
  }>({
    maxPrice: 1000,
    totalCount: 1,
  });

  const [filters, setFilters] = useState<FiltersProps>({
    sort: {
      title: "rating",
      method: "desc",
    },
    price: {
      min: 0,
      max: 1000,
    },
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<ProductProps[]>([]);

  const searchParams = useSearchParams();
  const page = searchParams.get("page") ?? 1;
  const per_page = searchParams.get("per_page") ?? 12;

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const fetchedProducts = await getProducts({
        skip: (Number(page) - 1) * Number(per_page),
        take: Number(per_page),
        filters: filters,
      });
      setProducts(fetchedProducts.products);
      setProductStats(fetchedProducts.stats);
      setLoading(false);
    };
    fetchProducts();
  }, [page, filters]);

  return (
    <>
      <div className="relative w-full max-w-7xl flex-1 mx-auto">
        <div className="flex justify-between my-4">
          <ProductsFilters
            filters={filters}
            setFilters={setFilters}
            maxPriceProduct={productStats.maxPrice}
          />
        </div>
        <PlaceListGrid value={products} isLoading={loading} />
        <div className="flex justify-center my-4">
          <PaginationControls total={productStats.totalCount ?? 1} />
        </div>
      </div>
    </>
  );
};

export default ProductCatalog;
