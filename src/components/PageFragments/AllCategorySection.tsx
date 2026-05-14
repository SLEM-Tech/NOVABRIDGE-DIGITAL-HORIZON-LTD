"use client";
import React from "react";
import Picture from "../picture/Picture";
import NewCollection from "../new-components/Collections";
import NewHero from "../new-components/NewHero";
import StarterBundleBanner from "../new-components/StarterBundleBanner";

import OurServices from "../new-components/OurServices";
import ContactBanner from "../new-components/ContactUs";
import WhyChooseUs from "../new-components/WhyChooseUs";

interface AllCategorySectionProps {
	initialProducts?: ProductType[];
	initialCategories?: CategoryType[];
}

const AllCategorySection = ({ initialProducts = [], initialCategories = [] }: AllCategorySectionProps) => {
	return (
		<>
			<div className='relative w-full min-h-[500px] md:h-screen overflow-hidden'>
				{/* <Picture
					src='/images/apexlogicbackground.png'
					alt='Gaming Setup'
					className='absolute inset-0 w-full h-full object-cover'
				/> */}
			

				<NewHero />
			</div>
			<WhyChooseUs />
			<NewCollection
				title='Selected For You'
				initialProducts={initialProducts}
				initialCategories={initialCategories}
			/>
		
			<StarterBundleBanner />
		</>
	);
};

export default AllCategorySection;
