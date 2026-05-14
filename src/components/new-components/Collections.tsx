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
    <section className="w-full bg-[#f9fafd] py-16 px-4 md:px-8 font-sans">
      {showNotification && (
        <div className="fixed top-4 right-4 z-[9999] bg-green-600 text-white px-6 py-4 rounded-lg shadow-lg">
          ✓ Item added to cart!
        </div>
      )}
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 pl-2">
          <p className="text-[10px] sm:text-xs font-bold tracking-[0.2em] text-[#8fa296] uppercase mb-1">
            Our Products
          </p>
          <h2 className="text-xl sm:text-2xl font-bold text-neutral-500 uppercase tracking-wide">
            {title}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading && !hasServerProducts &&
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-white rounded-lg p-6 border border-neutral-100/80 animate-pulse">
                <div className="bg-[#f0f0f0] rounded-md aspect-[4/3] w-full mb-6" />
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                <div className="h-3 bg-gray-200 rounded w-1/2" />
              </div>
            ))
          }
          {getSlideProducts().map((product: ProductType, index: number) => (
            <div
              key={product.id || index}
              className="bg-white rounded-lg p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-neutral-100/80 flex flex-col justify-between"
            >
              <div className="bg-[#f0f0f0] rounded-md aspect-[4/3] w-full relative overflow-hidden mb-6 flex items-center justify-center">
                <Image
                  src={product.images?.[0]?.src || "/placeholder.png"}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-contain p-4"
                  priority={index < 3}
                />
              </div>

              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-sm font-semibold text-neutral-800 tracking-wide">
                    {product.name}
                  </h3>
                  <p className="text-[10px] text-neutral-400 mt-0.5">
                    {product.categories?.[0]?.name || "Product"}
                  </p>
                </div>
                <div className="flex space-x-0.5 text-amber-400 text-xs pt-1">
                  {Array.from({ length: Math.round(parseFloat(product.average_rating ?? "4")) }).map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center mt-4 pt-2">
                <span className="text-sm font-bold text-neutral-700">
                  NGN{parseFloat(product.price).toFixed(2)}
                </span>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="bg-[#1a1a1a] hover:bg-black text-white text-[10px] font-medium tracking-wider uppercase px-4 py-2 rounded transition-colors duration-200"
                >
                  Add to cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
