"use client";
import React, { useState } from "react";
import { useCategories, useProducts } from "../lib/woocommerce";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "react-use-cart";

const itemsPerSlide = 8;

interface NewCollectionType {
  title?: string;
  initialProducts?: ProductType[];
  initialCategories?: CategoryType[];
}

export default function NewCollection({ title = 'Selected For You', initialProducts, initialCategories }: NewCollectionType) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showNotification, setShowNotification] = useState(false);
  const { addItem } = useCart();

  const hasServerProducts = !!initialProducts?.length;

  const { data: fetchedCategories } = useCategories(initialCategories?.length ? undefined : "");
  const { data: fetchedProducts, isLoading } = useProducts(
    hasServerProducts ? undefined : { per_page: 20 }
  );

  const categories: CategoryType[] = initialCategories ?? fetchedCategories ?? [];
  const allProducts: ProductType[] = hasServerProducts ? initialProducts! : (fetchedProducts ?? []);

  const filteredProducts = selectedCategory
    ? allProducts.filter((product: ProductType) =>
        product.categories.some((cat) => cat.id.toString() === selectedCategory)
      )
    : allProducts;

  const products = filteredProducts || [];
  const totalSlides = Math.ceil(products.length / itemsPerSlide);

  const nextSlide = () => {
    setCurrentSlide((prev) =>
      prev === totalSlides - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? totalSlides - 1 : prev - 1
    );
  };

  const getSlideProducts = () => {
    const start = currentSlide * itemsPerSlide;
    return products.slice(start, start + itemsPerSlide);
  };

  const handleAddToCart = (product: ProductType) => {
    addItem({
      id: product.id.toString(),
      name: product.name,
      price: parseFloat(product.price),
      image: product.images[0]?.src || "",
    });
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const handleCategoryClick = (categoryId: string | null) => {
    setSelectedCategory(categoryId);
    setCurrentSlide(0);
  };

  return (
    <section className="w-full bg-white text-black py-16 px-4 md:px-8 font-sans select-none">
      {showNotification && (
        <div className="fixed top-4 right-4 z-[9999] bg-green-600 text-white px-6 py-4 rounded-lg shadow-lg">
          ✓ Item added to cart!
        </div>
      )}
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-normal font-serif text-neutral-900 text-center mb-12">
          {title}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {isLoading && !hasServerProducts &&
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex flex-col animate-pulse">
                <div className="bg-[#f2f2f2] rounded-2xl aspect-[1.12/1] w-full mb-4" />
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                <div className="h-3 bg-gray-200 rounded w-1/2" />
              </div>
            ))
          }
          {getSlideProducts().map((product: ProductType, index: number) => (
            <div key={product.id || index} className="flex flex-col">
              <div className="bg-[#f2f2f2] rounded-2xl aspect-[1.12/1] w-full relative overflow-hidden mb-4 flex items-center justify-center p-6">
                <div className="relative w-full h-full transform hover:scale-105 transition-transform duration-300 ease-out">
                  <Image
                    src={product.images?.[0]?.src || "/placeholder.png"}
                    alt={product.name}
                    fill
                    sizes="(max-width: 1152px) 33vw, 100vw"
                    className="object-contain"
                    priority={index < 3}
                  />
                </div>
              </div>

              <div className="flex justify-between items-start mb-1">
                <div>
                  <h3 className="text-sm font-semibold text-neutral-900 tracking-wide">
                    {product.name}
                  </h3>
                  <p className="text-[11px] text-neutral-400 font-light mt-0.5">
                    {product.categories?.[0]?.name || "Product"}
                  </p>
                </div>
                <div className="flex items-center space-x-2 text-[10px] pt-0.5">
                  <div className="flex items-center text-neutral-800 font-medium">
                    <span className="text-black text-xs mr-0.5">★</span>
                    <span>{product.average_rating ?? "4.0"}</span>
                  </div>
                  <span className="text-neutral-300">|</span>
                  <span className="bg-[#e8f7ee] text-[#2ebd6e] font-semibold px-1.5 py-0.5 rounded-sm scale-90 origin-right">
                    {product.total_sales ? `${product.total_sales} sold` : "New"}
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-center mt-3">
                <div className="flex items-baseline space-x-2">
                  <span className="text-xl font-bold text-black tracking-tight">
                    NGN{parseFloat(product.price).toFixed(2)}
                  </span>
                  {product.regular_price && product.regular_price !== product.price && (
                    <span className="text-xs text-neutral-400 line-through font-light">
                      NGN{parseFloat(product.regular_price).toFixed(2)}
                    </span>
                  )}
                </div>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="bg-[#0f62fe] hover:bg-[#0043ce] text-white text-xs font-semibold px-5 py-2 rounded-md transition-colors duration-200 shadow-sm"
                >
                  Buy Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
