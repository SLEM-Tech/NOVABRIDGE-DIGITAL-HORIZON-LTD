"use client";
import React from 'react';
import Image from 'next/image';
import { useCart } from 'react-use-cart';
import { useProducts } from '../lib/woocommerce';

export default function StarterBundleBanner() {
  const { data: products, isLoading } = useProducts({ per_page: 1 });
  const { addItem } = useCart();

  const product: ProductType | undefined = products?.[0];

  const handleGrabDeal = () => {
    if (!product) return;
    addItem({
      id: product.id.toString(),
      name: product.name,
      price: parseFloat(product.price),
      image: product.images?.[0]?.src || '',
    });
  };

  if (isLoading || !product) {
    return (
      <section className="w-full bg-white py-12 px-4 md:px-8 font-sans">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row rounded-[24px] overflow-hidden border border-neutral-100/50 animate-pulse">
          <div className="w-full md:w-[45%] min-h-[220px] bg-[#e4e3fa]" />
          <div className="flex-1 p-10 bg-[#e4e3fa] space-y-4">
            <div className="h-6 bg-[#d0cff0] rounded w-1/2" />
            <div className="h-4 bg-[#d0cff0] rounded w-3/4" />
            <div className="h-10 bg-[#d0cff0] rounded w-1/4" />
            <div className="h-10 bg-[#d0cff0] rounded-full w-32" />
          </div>
        </div>
      </section>
    );
  }

  const imageSrc = product.images?.[0]?.src || '/placeholder.png';
  const price = parseFloat(product.price).toFixed(2);
  const regularPrice = product.regular_price && product.regular_price !== product.price
    ? parseFloat(product.regular_price).toFixed(2)
    : null;
  const description = product.short_description?.replace(/<[^>]+>/g, '') || product.categories?.[0]?.name || '';

  return (
    <section className="w-full bg-white py-12 px-4 md:px-8 font-sans select-none">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-stretch rounded-[24px] overflow-hidden shadow-sm border border-neutral-100/50">

        <div className="relative w-full md:w-[45%] bg-[#e4e3fa] min-h-[220px] md:min-h-auto aspect-[4/3] md:aspect-auto">
          <Image
            src={imageSrc}
            alt={product.name}
            fill
            sizes="(max-width: 1024px) 45vw, 100vw"
            className="object-contain p-6"
            priority
          />
        </div>

        <div className="flex-1 p-8 sm:p-10 md:p-12 flex flex-col justify-center items-start bg-[#e4e3fa]">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight mb-1 text-[#440015]">
            {product.name}
          </h2>

          {description && (
            <p className="text-xs sm:text-sm font-medium text-neutral-500 tracking-wide mb-6">
              {description}
            </p>
          )}

          <div className="flex items-baseline space-x-2.5 mb-6">
            <span className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#990024]">
              NGN{price}
            </span>
            {regularPrice && (
              <span className="text-sm sm:text-base text-neutral-400 line-through font-normal">
                NGN{regularPrice}
              </span>
            )}
          </div>

          <button
            onClick={handleGrabDeal}
            className="px-7 py-3 text-white text-xs sm:text-sm font-semibold tracking-wider rounded-full shadow-sm transition-colors duration-200 bg-[#440015] hover:bg-[#6b0020]"
          >
            Grab Deal
          </button>
        </div>

      </div>
    </section>
  );
}
