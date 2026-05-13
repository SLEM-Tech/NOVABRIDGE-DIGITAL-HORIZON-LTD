"use client";
import { convertToSlug } from "@constants";
import ProductCard2 from "@src/components/Cards/ProductCard2";
import { updateCategorySlugId } from "@src/components/config/features/subCategoryId";
import { useCategories, WooCommerce } from "@src/components/lib/woocommerce";
import GlobalLoader from "@src/components/modal/GlobalLoader";
import Carousel from "@src/components/Reusables/Carousel";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState, useTransition } from "react";
import { useDispatch } from "react-redux";

export const Loader = () => (
	<div className='flex gap-2 w-full items-center'>
		<div className='min-w-[150px] md:min-w-[180px] h-[180px] sm:h-[230px] bg-gray-200 animate-pulse rounded-md' />
		<div className='min-w-[150px] md:min-w-[180px] h-[180px] sm:h-[230px] bg-gray-200 animate-pulse rounded-md' />
		<div className='min-w-[150px] md:min-w-[180px] h-[180px] sm:h-[230px] bg-gray-200 animate-pulse rounded-md' />
		<div className='min-w-[150px] md:min-w-[180px] h-[180px] sm:h-[230px] bg-gray-200 animate-pulse rounded-md' />
		<div className='min-w-[150px] md:min-w-[180px] h-[180px] sm:h-[230px] bg-gray-200 animate-pulse rounded-md' />
		<div className='min-w-[150px] md:min-w-[180px] h-[180px] sm:h-[230px] bg-gray-200 animate-pulse rounded-md' />
		<div className='min-w-[150px] md:min-w-[180px] h-[180px] sm:h-[230px] bg-gray-200 animate-pulse rounded-md' />
	</div>
);

interface SortedProductsProps {
	middleBanner?: React.ReactNode;
	initialCategories?: CategoryType[];
	initialProductsMap?: { [key: string]: ProductType[] };
}

const SortedProducts = ({ middleBanner, initialCategories, initialProductsMap }: SortedProductsProps) => {
	const sliderRef = useRef<HTMLDivElement>(null);
	const [maxScrollTotal, setMaxScrollTotal] = useState(0);
	const [scrollLeftTotal, setScrollLeftTotal] = useState(0);
	const [currentIndex, setCurrentIndex] = useState(0);
	const hasServerData = !!initialCategories?.length;
	const [isLoading, setIsLoading] = useState(!hasServerData);
	const dispatch = useDispatch();
	const [isPending, startTransition] = useTransition();
	const router = useRouter();

	const { data: fetchedCategories, isLoading: categoryWpIsLoading } = useCategories(
		hasServerData ? undefined : "",
	);

	const filteredCategories: CategoryType[] = hasServerData
		? initialCategories!
		: (fetchedCategories ?? []).filter((c: CategoryType) => c.count > 0).slice(0, 6);

	const [categoryProductsMap, setCategoryProductsMap] = useState<{ [key: string]: ProductType[] }>(
		initialProductsMap ?? {},
	);

	useEffect(() => {
		if (hasServerData || !filteredCategories.length) return;

		const fetchCategoryProducts = async () => {
			try {
				setIsLoading(true);
				const productsPromises = filteredCategories.map(async (category: CategoryType) => {
					const response = await WooCommerce.get(`products?category=${category.id}`);
					return { [category.id]: response.data };
				});
				const results = await Promise.all(productsPromises);
				setCategoryProductsMap(results.reduce((acc, r) => ({ ...acc, ...r }), {}));
			} catch (error) {
				console.error("Error fetching category products:", error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchCategoryProducts();
	}, [fetchedCategories]);

	const TotalCategoryProductsMap: any = Object.keys(categoryProductsMap).length;

	const handleNext = () => {
		if (sliderRef.current) {
			const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
			setScrollLeftTotal(scrollLeft);
			setMaxScrollTotal(scrollWidth - clientWidth);
			sliderRef.current.scrollLeft += 600;
			setCurrentIndex((prev) => (prev < TotalCategoryProductsMap - 1 ? prev + 1 : prev));
		}
	};

	const handlePrev = () => {
		if (sliderRef.current) {
			const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
			setScrollLeftTotal(scrollLeft);
			setMaxScrollTotal(scrollWidth - clientWidth);
			if (scrollLeft > 0) {
				sliderRef.current.scrollLeft -= 600;
				setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
			}
		}
	};

	const handleCategoryClick = (name: string, id: number) => {
		const categorySlugId = `${convertToSlug(name)}-${id}`;
		dispatch(updateCategorySlugId({ categorySlugId }));
		startTransition(() => {
			router.push(`/category/${convertToSlug(name)}-${id}`);
		});
	};

	return (
		<>
			<div className='mb-8 lg:mb-16'>
				<div className='space-y-5 md:space-y-10'>
					{filteredCategories.map((category: CategoryType) => (
						<div key={category.id} className='space-y-4 overflow-visible'>
							<div className='w-full items-center flex justify-between sm:px-2'>
								<Link
									href={`/category/${convertToSlug(category.name)}-${category.id}`}
									onClick={() => handleCategoryClick(category.name, category.id)}
									dangerouslySetInnerHTML={{ __html: category.name }}
									className='text-lg sm:text-xl md:text-2xl w-4/5 font-medium tracking-tight text-black line-clamp-2'
								/>
								<Link
									href={`/category/${convertToSlug(category.name)}-${category.id}`}
									onClick={() => handleCategoryClick(category.name, category.id)}
									className='text-sm font-medium tracking-tight text-black hover:text-primary transition hover:underline underline-offset-4'
								>
									See all
								</Link>
							</div>
							<Carousel
								totalDataNumber={TotalCategoryProductsMap}
								maxScrollTotal={maxScrollTotal}
								scrollLeftTotal={scrollLeftTotal}
								handleNext={handleNext}
								handlePrev={handlePrev}
							>
								<div
									ref={sliderRef}
									className='flex gap-4 sm:gap-6 overflow-x-auto no-scrollbar snap-x snap-mandatory scroll-smooth pb-4'
									style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
								>
									{isLoading ? (
										<Loader />
									) : (
										categoryProductsMap[category.id]?.map((product: ProductType) => (
											<div
												key={product.id}
												className='flex-shrink-0 snap-start first:pl-4 last:pr-4 sm:first:pl-0 sm:last:pr-0'
											>
												<ProductCard2
													id={product.id}
													image={product.images[0]?.src}
													oldAmount={product.regular_price}
													newAmount={product.price}
													description={product.name}
												/>
											</div>
										))
									)}
								</div>
							</Carousel>
						</div>
					))}
				</div>
			</div>

			<GlobalLoader isPending={categoryWpIsLoading || isPending} />
		</>
	);
};

export default SortedProducts;
