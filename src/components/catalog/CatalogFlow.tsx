"use client";

import { useState } from "react";
import { ProductCategories } from "./ProductCategories";
import { OrderBuilder } from "@/components/order-builder/OrderBuilder";
import { ProductCategory } from "@/data/catalog";

interface CatalogFlowProps {
  lang: string;
}

export function CatalogFlow({ lang }: CatalogFlowProps) {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | null>(null);

  const handleCategorySelected = (category: ProductCategory) => {
    setSelectedCategory(category);
  };

  const handleCloseOrder = () => {
    setSelectedCategory(null);
  };

  return (
    <div className="flex flex-col w-full">
      <ProductCategories 
        lang={lang} 
        onSelectCategory={handleCategorySelected} 
      />

      {selectedCategory && (
        <OrderBuilder
          lang={lang}
          category={selectedCategory}
          onClose={handleCloseOrder}
        />
      )}
    </div>
  );
}
