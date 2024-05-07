import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import PaginationControls from "@/components/PaginationControl";
import ProductsFilters from "@/components/ProductsFilters";

import type { FiltersProps, ProductProps } from "@/types";
import { getProducts } from "@/action/get-products";
import { PlaceListGrid } from "@/components/PlaceListGrid";

const ProductCatalog = () => {
  const [totalCount, setTotalCount] = useState<number>(1);
  const [filters, setFilters] = useState<FiltersProps>({
    sort: {
      title: "rating",
      method: "desc",
    },
    totalPrice: {
      min: 0,
      max: 10000,
    },
    rangePrice: {
      min: 0,
      max: 1000,
    },
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<ProductProps[]>([]);

  const searchParams = useSearchParams();
  const page = searchParams.get("page") ?? 1;
  const per_page = searchParams.get("per_page") ?? 12;

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const fc = await getProducts({
        skip: (Number(page) - 1) * Number(per_page),
        take: Number(per_page),
        filters: filters,
      });
      setLoading(false);
      return fc;
    } catch (error) {
      console.error("Error fetching products:", error);
      return { products: [], totalCount: 0, minPrice: 0, maxPrice: 0 };
    }
  };

  useEffect(() => {
    const fetchInitialProducts = async () => {
      const fetchedProducts = await fetchProducts();
      setFilters((prevFilters) => ({
        ...prevFilters,
        totalPrice: {
          min: fetchedProducts.minPrice,
          max: fetchedProducts.maxPrice,
        },
        rangePrice: {
          min: fetchedProducts.minPrice,
          max: fetchedProducts.maxPrice,
        },
      }));
    };

    fetchInitialProducts();
  }, []);

  useEffect(() => {
    const updateProducts = async () => {
      const fetchedProducts = await fetchProducts();
      setProducts(fetchedProducts.products);
      setTotalCount(fetchedProducts.totalCount);
      setLoading(false);
    };

    updateProducts();
  }, [page, filters]);

  return (
    <>
      <div className="relative w-full max-w-7xl flex-1 mx-auto">
        <div className="flex justify-between my-4">
          <ProductsFilters filters={filters} setFilters={setFilters} />
        </div>
        <PlaceListGrid value={products} isLoading={loading} />
        <div className="flex justify-center my-4">
          <PaginationControls total={totalCount ?? 1} />
        </div>
      </div>
    </>
  );
};

export default ProductCatalog;
