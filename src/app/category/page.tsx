"use client";
import AppLayout from "@src/components/AppLayout";
import AppMenu from "@src/components/Navbars/AppMenu";
import MainCategoryContent from "@src/components/PageFragments/MainCategoryContent";
import MainCategorySection from "@src/components/PageFragments/MainCategorySection";
import PriceRangeSection from "@src/components/PageFragments/PriceRangeSection";
import SearchNSortSection from "@src/components/PageFragments/SearchNSortSection";
import React from "react";

const page = () => {
	return (
		<AppLayout>
			<main className='w-full mt-36 slg:mt-44 px-3 sm:px-6 lg:px-10 mx-auto max-w-screen-xl pb-16'>
				<MainCategoryContent />
			</main>
			<AppMenu />
		</AppLayout>
	);
};

export default page;
