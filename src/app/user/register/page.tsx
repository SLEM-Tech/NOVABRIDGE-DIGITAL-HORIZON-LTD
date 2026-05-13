import { SEODATA } from "@constants/seoContants";
import AppLayout from "@src/components/AppLayout";
import RegisterForm from "@src/components/Form/RegisterForm";
import AppMenu from "@src/components/Navbars/AppMenu";
import { Metadata } from "next";
import React from "react";

const { description, title, ogImage, keywords } = SEODATA.register;
export const metadata: Metadata = {
	title: title,
	description: description,
	keywords: keywords,
	icons: ogImage,
	openGraph: {
		images: [
			{
				url: ogImage ?? "",
			},
		],
	},
};

const page = () => {
	return (
		<AppLayout>
			<main className='min-h-screen flex items-center justify-center px-4 bg-gray-50 py-16'>
				<RegisterForm />
			</main>
			<AppMenu />
		</AppLayout>
	);
};

export default page;
