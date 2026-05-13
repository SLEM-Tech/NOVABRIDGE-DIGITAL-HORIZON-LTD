"use client";
import React, { useState, useEffect } from "react";
import { useCategories, useProducts } from "../lib/woocommerce";
import Picture from "../picture/Picture";
import Link from "next/link";
import { convertToSlug } from "@constants";
import { useCart } from "react-use-cart";

const itemsPerSlide = 8;

Interface ProductType 

export default function NewCollection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { addItem } = useCart();

  const { data: categories } = useCategories("");
  const { data: allProducts, isLoading } = useProducts("");

  const filteredProducts = selectedCategory
    ? allProducts?.filter((product: any) =>
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

  const handleAddToCart = (product: any) => {
    addItem({
      id: product.id.toString(),
      name: product.name,
      price: parseFloat(product.price),
      image: product.images[0]?.src || "",
    });
  };

  const handleCategoryClick = (categoryId: string | null) => {
    setSelectedCategory(categoryId);
    setCurrentSlide(0);
  };

  return (
    <section id="collection">

      <div className="collection-left">
        <h1>New <br /> collection</h1>
        <ul>
          <li
            className={selectedCategory === null ? "active" : ""}
            onClick={() => handleCategoryClick(null)}
          >
            All
          </li>
          {categories?.slice(0, 6).map((cat: CategoryType) => (
            <li
              key={cat.id}
              className={selectedCategory === cat.id.toString() ? "active" : ""}
              onClick={() => handleCategoryClick(cat.id.toString())}
            >
              {cat.name}
            </li>
          ))}
        </ul>
      </div>


      <div className="collection-right">
        <div className="slider-arrows">
          <button onClick={prevSlide}>←</button>
          <button onClick={nextSlide}>→</button>
        </div>

        <div className="products-grid">
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            getSlideProducts().map((product: ProductType) => (
              <div className="product-card" key={product.id}>
                <Link href={`/home-item/product/${convertToSlug(product.name)}-${product.id}`}>
                  <Picture
                    src={product.images[0]?.src || ""}
                    alt={product.name}
                  />
                </Link>
                <h3>{product.name}</h3>
                <p>₦{product.price}</p>
                <button onClick={() => handleAddToCart(product)}>Add to cart</button>
              </div>
            ))
          )}
        </div>


        <div className="dots">

          {[...Array(totalSlides)].map((_, index) => (

            <span
              key={index}
              className={
                index === currentSlide ? "dot active" : "dot"
              }
              onClick={() => setCurrentSlide(index)}
            ></span>

          ))}

        </div>

      </div>

    </section>
  );
}
