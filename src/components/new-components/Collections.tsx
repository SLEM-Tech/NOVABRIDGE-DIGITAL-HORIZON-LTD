"use client";
import React, { useState } from "react";
import { useCategories, useProducts } from "../lib/woocommerce";
import Link from "next/link";
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
    <div className="w-full px-4 md:px-8 lg:px-20 py-8 md:py-[20px] mt-[30px]">
      {showNotification && (
        <div className="fixed top-4 right-4 z-[9999] bg-green-600 text-white px-6 py-4 rounded-lg shadow-lg">
          ✓ Item added to cart!
        </div>
      )}
      <div className="flex flex-col md:flex-row  py-8 md:py-[60px] justify-between items-start md:items-center mb-8 gap-4">
        <h2 className="text-[#313131] font-inter text-[18px] md:text-[34px] font-semibold leading-tight">
          {title}
        </h2>
        <Link href="/category" className=" bg-[#000] py-2 px-4 rounded-md text-[#fff] font-inter text-[15px] md:text-[16px] hover:underline">
          View All
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
        {isLoading && !hasServerProducts && (
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-6">
              <div className="w-full h-[300px] md:h-[350px] lg:h-[415px] bg-gray-200 animate-pulse rounded-[3px]" />
              <div className="h-6 bg-gray-200 animate-pulse rounded w-3/4" />
              <div className="h-4 bg-gray-200 animate-pulse rounded w-1/2" />
            </div>
          ))
        )}
        {getSlideProducts().slice(0, 4).map((product: ProductType, index: number) => (
          <div key={product.id || index} className="flex flex-col gap-6 ">
            <img
              src={product.images?.[0]?.src || "/placeholder.png"}
              className="rounded-[3px] shadow-sm w-full h-[300px] md:h-[350px] lg:h-[415px] object-cover"
              alt={product.name}
            />
            <div className="flex flex-col gap-4 ">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-[#382C2C] font-inter text-[16px] md:text-[18px] min-h-[130px] font-semibold leading-8 mb-2">
                    {product.name}
                  </h3>
                  <p className="text-[#4D4C4C] font-inter text-[16px] md:text-base leading-6">
                    {product.categories?.[0]?.name || "Product"}
                  </p>
                </div>
                <button className="flex-shrink-0">
                  <svg
                    width="32"
                    height="33"
                    viewBox="0 0 32 33"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-7 h-7 md:w-8 md:h-8"
                  >
                    <path
                      d="M27.4212 9.5242C27.0489 8.64078 26.5119 7.84023 25.8405 7.16737C25.1686 6.4925 24.3763 5.95619 23.5069 5.58761C22.6054 5.20389 21.6384 5.00748 20.6621 5.00979C19.2925 5.00979 17.9563 5.39405 16.795 6.11989C16.5172 6.29352 16.2533 6.48423 16.0033 6.69202C15.7533 6.48423 15.4893 6.29352 15.2115 6.11989C14.0503 5.39405 12.714 5.00979 11.3444 5.00979C10.3582 5.00979 9.40256 5.20334 8.49968 5.58761C7.62736 5.95764 6.84116 6.48992 6.16608 7.16737C5.49378 7.83947 4.95672 8.64021 4.58535 9.5242C4.00195 10.2725 4.00195 11.4199 4.00195 12.4247C4.00195 13.3725 4.19086 14.3603 4.56591 15.365C4.87983 16.2047 5.32988 17.0757 5.90494 17.9553C6.81616 19.3472 8.06907 20.7988 9.6248 22.2704C12.2029 24.7098 14.7559 26.3949 14.8643 26.4632L15.5227 26.8959C15.8144 27.0866 16.1894 27.0866 16.4811 26.8959L17.1395 26.4632C17.2479 26.392 19.7982 24.7098 22.379 22.2704C23.9347 20.7988 25.1877 19.3472 26.0989 17.9553C26.6739 17.0757 27.1268 16.2047 27.4379 15.365C27.8129 14.3603 28.0019 13.3725 28.0019 12.4247C28.0047 11.4199 27.8074 10.4436 27.4212 9.5242Z"
                      fill="#3F52FF"
                    />
                  </svg>
                </button>
              </div>
              <p className="text-[#382C2C] font-inter text-lg md:text-xl font-semibold">
                NGN{parseFloat(product.price).toFixed(2)}
              </p>
              <button
                onClick={() => handleAddToCart(product)}
                className="flex items-center justify-center gap-2 py-3 px-6 rounded-sm bg-[#D92D20] hover:bg-[#b82419] transition-colors"
              >
                <svg
                  width="25"
                  height="25"
                  viewBox="0 0 25 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 md:w-6 md:h-6"
                >
                  <path
                    d="M3.60596 1.20117C2.9423 1.20117 2.4043 1.73918 2.4043 2.40284C2.4043 3.0665 2.9423 3.60451 3.60596 3.60451H5.07106L5.43825 5.07323C5.4421 5.09022 5.44631 5.10706 5.45088 5.12376L7.08182 11.6475L6.00924 12.7201C4.49523 14.2341 5.56751 16.8228 7.70865 16.8228H18.0259C18.6896 16.8228 19.2276 16.2848 19.2276 15.6212C19.2276 14.9575 18.6896 14.4195 18.0259 14.4195L7.70865 14.4195L8.91032 13.2178H16.8243C17.2795 13.2178 17.6955 12.9607 17.8991 12.5536L21.5041 5.34357C21.6904 4.97107 21.6704 4.52869 21.4515 4.17442C21.2325 3.82015 20.8458 3.60451 20.4293 3.60451H7.54836L7.17508 2.11139C7.04135 1.57645 6.5607 1.20117 6.0093 1.20117H3.60596Z"
                    fill="white"
                  />
                  <path
                    d="M19.2276 19.827C19.2276 20.8225 18.4206 21.6295 17.4251 21.6295C16.4296 21.6295 15.6226 20.8225 15.6226 19.827C15.6226 18.8315 16.4296 18.0245 17.4251 18.0245C18.4206 18.0245 19.2276 18.8315 19.2276 19.827Z"
                    fill="white"
                  />
                  <path
                    d="M7.8118 21.6295C8.80729 21.6295 9.6143 20.8225 9.6143 19.827C9.6143 18.8315 8.80729 18.0245 7.8118 18.0245C6.8163 18.0245 6.0093 18.8315 6.0093 19.827C6.0093 20.8225 6.8163 21.6295 7.8118 21.6295Z"
                    fill="white"
                  />
                </svg>
                <span className="text-white font-inter text-sm md:text-base font-medium">
                  Add to cart
                </span>
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center items-center gap-3 mt-8">
        <button
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className="w-8 h-8 flex items-center justify-center disabled:opacity-30"
        >
          <svg
            width="25"
            height="25"
            viewBox="0 0 25 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
          >
            <path
              d="M15.0215 19.0273L8.01176 12.0175L15.0215 5.00781"
              stroke="#007AFF"
              strokeWidth="1.00139"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <div className="flex gap-2">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full bg-[#3F52FF] transition-opacity ${
                index === currentSlide ? "opacity-100" : "opacity-30"
              }`}
            />
          ))}
        </div>

        <button
          onClick={nextSlide}
          disabled={currentSlide === totalSlides - 1}
          className="w-8 h-8 flex items-center justify-center disabled:opacity-30"
        >
          <svg
            width="25"
            height="25"
            viewBox="0 0 25 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
          >
            <path
              d="M9.01172 5.0079L16.0214 12.0176L9.01172 19.0273"
              stroke="#007AFF"
              strokeWidth="1.00139"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
