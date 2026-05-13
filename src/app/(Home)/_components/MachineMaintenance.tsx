"use client";
import React from "react";
import Link from "next/link";
import Picture from "@src/components/picture/Picture";
import { heroBg, machineImage } from "@public/images";

const MachineMaintenance = () => {
	return (
		<section className='w-full grid grid-cols-1 md:grid-cols-2 min-h-[800px] bg-white overflow-hidden'>
			{/* 1. Content Section (Left) */}
			<div className='bg-[#002B5B] flex flex-col justify-center p-8 sm:p-12 md:p-16 lg:p-24 space-y-8'>
				{/* Main Heading */}
				<h2 className='text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight tracking-tight uppercase'>
					Maintenance for <br />
					your machines.
				</h2>

				{/* Description Text */}
				<p className='text-gray-200 text-base md:text-lg leading-relaxed max-w-lg font-medium opacity-90'>
					Maintenance of Power supplies, peripherals, and precision components
					that keep your digital life moving without interruption.
				</p>

				{/* Action Button */}
				<Link
					href='/contact-us'
					className='w-fit bg-white text-[#002B5B] font-bold uppercase tracking-widest px-8 py-3.5 rounded-sm hover:bg-gray-100 transition-all active:scale-95 shadow-lg'
				>
					Contact Us
				</Link>
			</div>

			{/* 2. Visual Section (Right) */}
			<div className='relative h-[350px] md:h-auto'>
				<Picture
					src={machineImage} // Path to your hardware image
					alt='Close up of internal computer components'
					className='w-full h-full object-cover'
				/>

				{/* Subtle overlay for mobile to improve contrast if text overlaps */}
				<div className='absolute inset-0 bg-black/5 md:hidden' />
			</div>
		</section>
	);
};

export default MachineMaintenance;
