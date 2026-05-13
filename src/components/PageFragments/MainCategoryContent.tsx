"use client";
import React, { useEffect, useState } from "react";
import { useCategories, WooCommerce } from "../lib/woocommerce";
import SubCategoryCard from "../Cards/SubCategoryCard";

const MainCategoryContent = () => {
	// WooCommerce API Category
	const {
		data: categories,
		isLoading: categoryWpIsLoading,
		isError: categoryIsError,
	} = useCategories("");

	const Categories: CategoryType[] = categories ?? [];

	const [categoryProductsMap, setCategoryProductsMap] = useState<{
		[key: string]: ProductType[];
	}>({});

	useEffect(() => {
		const fetchCategoryProducts = async () => {
			try {
				if (!categories?.length) return;

				const productsPromises = categories.map(
						async (category: CategoryType) => {
							const response = await WooCommerce.get(
								`products?category=${category?.id}`,
							);
							const firstProductImage =
								response?.data.length > 0
									? response?.data[0]?.images[0]?.src
									: null;
							return {
								categoryId: category?.id,
								firstProductImage,
							};
						},
				);

				const productsResults = await Promise.all(productsPromises);
				const productsMap = productsResults.reduce(
					(acc: any, result: any) => ({
						...acc,
						[result.categoryId]: result.firstProductImage,
					}),
					{},
				);
				setCategoryProductsMap(productsMap);
			} catch (error) {
				console.error("Error fetching category products:", error);
			}
		};

		if (categories?.length) {
			fetchCategoryProducts();
		}
	}, [categories]);

	return (
		<>
			{categoryWpIsLoading && (
				<div className='space-y-6'>
					<div className='h-8 w-48 bg-gray-200 rounded-xl animate-pulse mx-auto' />
					<div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
						{Array.from({ length: 10 }).map((_, i) => (
							<div key={i} className='aspect-square bg-gray-100 rounded-2xl animate-pulse' />
						))}
					</div>
				</div>
			)}

			{!categoryWpIsLoading && Categories.length === 0 && (
				<div className='flex w-full items-center justify-center min-h-[40vh]'>
					<div className='text-center'>
						<div className='w-16 h-16 bg-brand-light rounded-2xl flex items-center justify-center mx-auto mb-4'>
							<span className='text-2xl'>🗂️</span>
						</div>
						<p className='text-gray-500 font-medium'>No categories found.</p>
					</div>
				</div>
			)}

			{Categories.length > 0 && (
				<div>
					<div className='mb-8 text-center'>
						<h1 className='text-2xl sm:text-3xl font-bold text-primary-300 tracking-tight'>All Categories</h1>
						<p className='text-sm text-gray-500 mt-1'>{Categories.length} categories available</p>
					</div>
					<div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-5'>
						{Categories?.map((data) => {
							const productImage: any = categoryProductsMap[data?.id];
							return (
								<SubCategoryCard
									key={data.id}
									name={data?.name}
									id={data?.id?.toString()}
									image={productImage}
								/>
							);
						})}
					</div>
				</div>
			)}
		</>
	);
};

export default MainCategoryContent;