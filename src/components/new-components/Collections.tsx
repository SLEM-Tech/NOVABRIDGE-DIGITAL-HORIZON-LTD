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
    <section className="w-full bg-[#FAF9F6] py-12 px-4 md:px-8 font-sans select-none">
      {showNotification && (
        <div className="fixed top-4 right-4 z-[9999] bg-green-600 text-white px-6 py-4 rounded-lg shadow-lg">
          ✓ Item added to cart!
        </div>
      )}
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6 px-1">
          <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight">
            {title}
          </h2>
          <Link href="/category" className="text-xs sm:text-sm font-semibold text-[#5151fa] hover:text-[#3b3be6] transition-colors">
            View all
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {isLoading && !hasServerProducts &&
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-[#f0effa] rounded-[24px] p-4 animate-pulse">
                <div className="aspect-[1.18/1] w-full rounded-[18px] bg-[#d0cff0] mb-4" />
                <div className="h-3 bg-[#d0cff0] rounded w-3/4 mb-2" />
                <div className="h-3 bg-[#d0cff0] rounded w-1/2" />
              </div>
            ))
          }
          {getSlideProducts().map((product: ProductType, index: number) => (
            <div
              key={product.id || index}
              className="bg-[#f0effa] rounded-[24px] p-4 flex flex-col justify-between hover:shadow-md transition-shadow duration-200 border border-neutral-100/50"
            >
              <div className="relative aspect-[1.18/1] w-full rounded-[18px] overflow-hidden mb-4 bg-gradient-to-b from-[#0e96b5] to-[#25a9c9] flex items-center justify-center shadow-inner">
                <div className="relative w-[85%] h-[85%] transform hover:scale-105 transition-transform duration-300 ease-out drop-shadow-[0_12px_20px_rgba(0,0,0,0.25)]">
                  <Image
                    src={product.images?.[0]?.src || "/placeholder.png"}
                    alt={product.name}
                    fill
                    sizes="(max-width: 1280px) 25vw, 100vw"
                    className="object-contain"
                    priority={index < 4}
                  />
                </div>
              </div>

              <div className="flex justify-between items-center px-1 pb-1">
                <h3 className="text-xs sm:text-sm font-medium text-neutral-700 tracking-wide">
                  {product.name}
                </h3>
                <span className="text-xs sm:text-sm font-bold text-[#5151fa] tracking-tight">
                  NGN{parseFloat(product.price).toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
