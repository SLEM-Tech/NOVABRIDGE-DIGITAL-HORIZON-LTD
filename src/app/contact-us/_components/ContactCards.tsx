"use client";
import { Skeleton } from "@heroui/react";
import ContactCard from "@src/components/Cards/ContactCard";
import { useGeneralSettings } from "@src/components/lib/woocommerce";
import React from "react";
import { FiPhoneCall } from "react-icons/fi";
import { IoLocationOutline } from "react-icons/io5";
import { RxEnvelopeClosed } from "react-icons/rx";

const ContactCards = () => {
	const { data: generalSettings, isLoading, isError } = useGeneralSettings();

	const GeneralSettings: WooCommerceSetting[] = generalSettings;

	// console.log("GeneralSettings", GeneralSettings);

	const contactCardData = [
		{
			id: 1,
			title: "Email Us",
			type: "email",
			icon: <RxEnvelopeClosed className='text-primary text-2xl xl:text-4xl' />,
			// additionalText: GeneralSettings ? GeneralSettings[0]?.value : "N/A",
			additionalText: "info@decaprimtech.com"
		},
		{
			id: 2,
			title: "Call Us",
			icon: <FiPhoneCall className='text-primary text-2xl xl:text-4xl' />,
			type: "tel",
			// additionalText: GeneralSettings ? GeneralSettings[1]?.value : "N/A",
			additionalText: "07030652603"
		},
		{
			id: 3,
			title: "Location",
			type: "text",
			icon: <IoLocationOutline className='text-primary text-2xl xl:text-4xl' />,
			// description: GeneralSettings ? GeneralSettings[2]?.value : "N/A",
			description: "2, Ademola Hammed street off Adamo ikorodu"
		},
		// Add more contact card data here if needed
	];
	return (
		<>
			{contactCardData &&
				contactCardData?.map((card) => (
					<ContactCard
						key={card.id}
						isLoading={isLoading}
						type={card.type}
						title={card.title}
						icon={card.icon}
						additionalText={card.additionalText}
						// additionalText2={card.additionalText2}
						description={card.description}
					/>
				))}

			{isLoading && (
				<>
					<Skeleton className='flex flex-col w-[15rem] bg-slate-200 slg:w-[18rem] xl:w-[23rem] shadow-md rounded-md py-5 sm:py-20 xl:py-32 items-center justify-center text-center px-4 xl:px-1 animate-pulse' />
					<Skeleton className='flex flex-col w-[15rem] bg-slate-200 slg:w-[18rem] xl:w-[23rem] shadow-md rounded-md py-5 sm:py-20 xl:py-32 items-center justify-center text-center px-4 xl:px-1 animate-pulse' />
					{/* <Skeleton className='flex flex-col w-[15rem] bg-slate-200 slg:w-[18rem] xl:w-[23rem] shadow-md rounded-md py-5 sm:py-20 xl:py-32 items-center justify-center text-center px-4 xl:px-1 animate-pulse' /> */}
				</>
			)}
		</>
	);
};

export default ContactCards;
