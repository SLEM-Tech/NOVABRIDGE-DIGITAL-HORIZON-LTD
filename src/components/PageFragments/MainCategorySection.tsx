"use client";
import {
	electonicsBannerImageNameImg1,
	heroImage3,
	heroImage4,
} from "@public/images";
import React, { useEffect, useState } from "react";
import MainProductCard from "../Cards/MainProductCard";
import { usePathname, useRouter } from "next/navigation";
import { Product, ProductResponse, mainProductCardData } from "@constants";
import PaginationComponent from "../Reusables/PaginationComponent";
import { ScaleLoader } from "react-spinners";
import ProductCard2 from "../Cards/ProductCard2";
import { Back } from "../Reusables";
import { useDispatch, useSelector } from "react-redux";
import { useProductsByCategory, WooCommerce } from "../lib/woocommerce";
import { WooCommerceServer } from "@utils/endpoints";
import { RootState } from "../config/store";
import Picture from "../picture/Picture";

interface MainCategorySectionProps {
	productsData?: ProductType[];
	itemsPerPage: string;
	currentPage?: number;
	setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
	isLoading?: boolean;
}

const MainCategorySection = () => {
	const pathname = usePathname();
	const match = pathname.match(/\/category\/([^-]+)/);
	const parts = pathname.split("-");
	const numberAfterDash = parts[parts.length - 1];
	let usedWord: any = null;
	const itemsPerPage = "12";
	const [currentPage, setCurrentPage] = useState(1);
	// console.log(selectedOption)
	if (match && match[1]) {
		usedWord = match[1];
	}

	// Woo commerce API Product
	const {
		data: categoryProducts,
		isLoading: categoryProductsWpIsLoading,
		isError: categoryProductsIsError,
	} = useProductsByCategory(numberAfterDash);

	const CategoryProducts: ProductType[] = categoryProducts ?? [];

	const totalDocs = CategoryProducts?.length;

	// React-paginate uses 0-based indexing

	const handlePageChange = (selected: number) => {
		setCurrentPage(selected);
	};
	let totalPages;
	if (totalDocs) {
		totalPages = Math.ceil(totalDocs / parseInt(itemsPerPage));
	}

	return (
		<section className='flex w-full flex-col gap-6 mb-12 pb-8'>
			{categoryProductsWpIsLoading && (
				<div className='w-full'>
					<div className='h-7 w-40 bg-gray-200 rounded-xl animate-pulse mb-6' />
					<div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4'>
						{Array.from({ length: 8 }).map((_, i) => (
							<div key={i} className='aspect-[3/4] bg-gray-100 rounded-2xl animate-pulse' />
						))}
					</div>
				</div>
			)}

			{CategoryProducts && (
				<>
					{CategoryProducts?.length > 0 && (
						<div className='w-full space-y-4'>
							<Back />
							<div className='pb-4 border-b border-gray-100'>
								<h1
									dangerouslySetInnerHTML={{
										__html: CategoryProducts[0]?.categories[0]?.name,
									}}
									className='text-xl lg:text-2xl font-bold text-primary-300 tracking-tight inline'
								/>
								<span className='ml-2 text-sm font-medium text-gray-400'>({totalDocs} products)</span>
							</div>
						</div>
					)}

					{CategoryProducts?.length > 0 && (
						<div className='w-full'>
							<div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-5'>
								{CategoryProducts?.map((product) => (
									<ProductCard2
										key={product?.id}
										id={product?.id}
										image={product?.images[0]?.src}
										oldAmount={product?.regular_price}
										newAmount={product?.price}
										description={product?.name}
									/>
								))}
							</div>
						</div>
					)}

					{CategoryProducts?.length === 0 && !categoryProductsWpIsLoading && (
						<div className='flex w-full flex-col gap-4 items-center justify-center min-h-[40vh] bg-white rounded-2xl border border-gray-100 shadow-sm'>
							<div className='w-16 h-16 bg-brand-light rounded-2xl flex items-center justify-center'>
								<span className='text-2xl'>📦</span>
							</div>
							<h4 className='font-bold text-primary-300 text-lg'>No Products Yet</h4>
							<p className='text-sm text-gray-500'>This category has no products. Check back later.</p>
						</div>
					)}
				</>
			)}

			{totalPages && totalPages > 1 && (
				<div className='flex justify-center mt-4'>
					<PaginationComponent
						pageCount={totalPages}
						onPageChange={handlePageChange}
						forcePage={0}
					/>
				</div>
			)}
		</section>
	);
};

export default MainCategorySection;
