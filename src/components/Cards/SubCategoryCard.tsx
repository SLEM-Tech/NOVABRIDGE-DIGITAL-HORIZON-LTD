"use client";
import Picture from "../picture/Picture";
import Link from "next/link";
import { convertToSlug } from "@constants";
import { useAppSelector } from "../hooks";
import { logoImage } from "@public/images";

interface SubCategoryCardProps {
	id?: string;
	image?: string;
	name: string;
}
const SubCategoryCard = ({ id, image, name }: SubCategoryCardProps) => {
	const { data } = useAppSelector((state) => state.subCategoryId);

	return (
		<Link
			href={`${"/category/" + convertToSlug(name) + "-" + id}`}
			className={`flex flex-col items-center group cursor-pointer rounded-2xl bg-white border border-gray-100 hover:border-primary-100/40 hover:shadow-lg hover:shadow-primary-100/10 transition-all duration-300 overflow-hidden shadow-sm ${
				data === id ? "border-primary-100 shadow-md shadow-primary-100/15" : ""
			}`}
		>
			{/* Image Container */}
			<div className='relative w-full aspect-square p-3 sm:p-5 bg-gray-50/60'>
				{image ? (
					<Picture
						src={image || logoImage}
						alt={`${name} category`}
						className='w-full h-full object-contain object-center transition-transform duration-500 group-hover:scale-105 aspect-square'
					/>
				) : (
					<div className='w-full h-full bg-gradient-to-br from-primary-100 to-primary-300 flex items-center justify-center rounded-xl'>
						<h4
							dangerouslySetInnerHTML={{ __html: name }}
							className='text-white font-bold text-xs sm:text-base text-center px-2 leading-tight'
						/>
					</div>
				)}
			</div>

			{/* Category Name */}
			<div className='w-full px-3 py-2.5 text-center border-t border-gray-100 bg-white'>
				<h4
					dangerouslySetInnerHTML={{ __html: name }}
					className='text-gray-700 font-semibold text-xs sm:text-sm group-hover:text-primary-100 transition-colors line-clamp-2 leading-snug'
				/>
			</div>
		</Link>
	);
};

export default SubCategoryCard;
