"use client";
import { userSidebar } from "@constants";
import {
	FiShoppingCart,
} from "react-icons/fi";
import DashboardCard from "@src/components/Cards/DashboardCard";
import Link from "next/link";
import React, { ReactNode, useState } from "react";
import { IoLogOutOutline } from "react-icons/io5";
import { IconType } from "react-icons/lib";
import RecentOrder from "@src/components/RecentOrder";
import { usePathname, useRouter } from "next/navigation";
import { LogoutIconSvg, RejectedIconSvg } from "./SvgIcons";
import { BiLogOut, BiTag } from "react-icons/bi";
import { BsTags } from "react-icons/bs";
import { signOut } from "@utils/lib";
import { useCustomer, useCustomerOrders } from "./lib/woocommerce";

export interface dashboardCardDataProps {
	id: number;
	title: string;
	Icon: IconType;
	quantity?: number;
	className: string;
}

interface DashboardProps {
	children?: ReactNode;
}

const Dashboard: React.FC<DashboardProps> = ({ children }) => {
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 10;

	const { data: wc_customer_info, isLoading: isLoadingCustomer } = useCustomer("");

	const { data: allCustomerOrders, isLoading: isLoadingOrders } =
		useCustomerOrders((wc_customer_info as any)?.id);

	const OrderData: OrderGetType[] = allCustomerOrders;

	const totalItems = allCustomerOrders?.length || 0;
	const totalPages = Math.ceil(totalItems / itemsPerPage);

	const dashboardCardData: dashboardCardDataProps[] = [
		{
			id: 1,
			title: "Total Order",
			Icon: FiShoppingCart,
			quantity: OrderData?.length,
			className: "text-red-600 bg-red-200",
		},
	];
	const pathname = usePathname();
	const handleLogOut = () => {
		signOut();
	};

	return (
		<div className='mx-auto mt-28 slg:mt-32 max-w-screen-2xl px-3 sm:px-10 mb-32'>
			<div className='py-10 lg:py-12 flex flex-col lg:flex-row w-full min-h-[300px] gap-6'>

				{/* Sidebar */}
				<div className='flex-shrink-0 w-full lg:w-64'>
					<div className='bg-white border border-gray-100 rounded-2xl shadow-sm shadow-slate-200/60 px-3 py-4 sticky top-32 slg:block grid grid-cols-2 gap-2 slg:gap-0'>
						{userSidebar.map((item) => (
							<Link
								key={item.title}
								href={item.href}
								className={`flex items-center gap-3 px-4 py-3 my-0.5 rounded-xl text-sm font-medium transition-all ${
									pathname.includes(item.href)
										? "bg-brand-light text-primary-100 font-semibold"
										: "text-gray-600 hover:bg-gray-50 hover:text-primary-100"
								}`}
							>
								<item.icon className='flex-shrink-0 h-4 w-4' aria-hidden='true' />
								<span className='truncate'>{item.title}</span>
							</Link>
						))}

						<div className='my-2 border-t border-gray-100' />

						<button
							onClick={handleLogOut}
							className='flex items-center gap-3 px-4 py-3 w-full rounded-xl text-sm font-medium text-gray-600 hover:bg-danger-light hover:text-danger transition-all'
						>
							<BiLogOut className='h-4 w-4 flex-shrink-0' />
							<span>Logout</span>
						</button>
					</div>
				</div>

				{/* Main Content */}
				<div className='w-full flex-1 bg-white border border-gray-100 rounded-2xl shadow-sm shadow-slate-200/60 p-5 sm:p-6 lg:p-8 overflow-hidden min-h-[450px]'>
					{!children && (
						<div className='overflow-hidden'>
							<div className='overflow-x-auto mb-8 flex gap-3'>
								{dashboardCardData.map((data) => (
									<DashboardCard
										key={data?.id}
										Icon={data?.Icon}
										quantity={data?.quantity}
										title={data?.title}
										className={data?.className}
									/>
								))}
							</div>
							<RecentOrder
								data={OrderData}
								isLoading={isLoadingOrders}
								ItemsPerPage={itemsPerPage}
								CurrentPage={currentPage}
								setCurrentPage={setCurrentPage}
								pageCount={totalPages}
							/>
						</div>
					)}
					{children}
				</div>

			</div>
		</div>
	);
};

export default Dashboard;
