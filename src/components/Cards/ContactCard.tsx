import { Skeleton } from "@heroui/react";
import React, { ReactNode } from "react";

interface ContactCardProps {
	title: string;
	type?: string;
	isLoading: boolean;
	icon: ReactNode;
	additionalText?: string | number | boolean;
	description?: string | number | boolean;
}

const ContactCard = ({
	title,
	type,
	icon,
	isLoading,
	additionalText,
	description,
}: ContactCardProps) => {
	return (
		<div className='flex flex-col w-[15rem] slg:w-[18rem] xl:w-[23rem] border-[1px] shadow-md rounded-md py-5 xl:py-10 items-center justify-center text-center gap-2 slg:gap-4 px-4 xl:px-1'>
			{icon}
			<h3 className='text-sm slg:text-xl xl:text-2xl font-semibold'>{title}</h3>
			<h4 className='text-xs slg:text-sm xl:text-base leading-[180%] text-center'>
				{isLoading && additionalText ? (
					<Skeleton className='h-7 w-20 rounded-sm bg-gray-400 mx-auto animate-pulse' />
				) : type === "tel" ? (
					<>
						<a
							className='text-primary-100 text-xs slg:text-sm xl:text-base hover:underline underline-offset-4 cursor-pointer'
							href={`tel:${additionalText}`}
						>
							{additionalText}
						</a>{" "}
					</>
				) : type === "email" ? (
					<>
						<a
							className='text-primary-100 text-xs slg:text-sm xl:text-base hover:underline underline-offset-4 cursor-pointer'
							href={`mailto:${additionalText}`}
						>
							{additionalText}
						</a>{" "}
					</>
				) : (
					additionalText // Default case if it's neither "tel" nor "email"
				)}

				{isLoading && description ? (
					<Skeleton className='h-7 w-20 rounded-sm bg-gray-400 mx-auto animate-pulse' />
				) : (
					description
				)}
			</h4>
		</div>
	);
};

export default ContactCard;
