"use client";
import React from "react";
import Picture from "../picture/Picture";
import NewCollection from "../new-components/Collections";
import NewHero from "../new-components/NewHero";
import Subscribe from "../new-components/Subscribe";

interface AllCategorySectionProps {
	initialProducts?: ProductType[];
	initialCategories?: CategoryType[];
}

const AllCategorySection = ({ initialProducts = [], initialCategories = [] }: AllCategorySectionProps) => {
	return (
		<>
			<div className='relative w-full min-h-[500px] md:h-screen overflow-hidden'>
				<Picture
					src='/images/decaprim1.png'
					alt='Gaming Setup'
					className='absolute inset-0 w-full h-full object-cover'
				/>
				<div className='absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent' />
				<NewHero />
			</div>
			<NewCollection
				title='Selected For You'
				initialProducts={initialProducts}
				initialCategories={initialCategories}
			/>
		
			<Subscribe />
		</>
	);
};

export default AllCategorySection;
