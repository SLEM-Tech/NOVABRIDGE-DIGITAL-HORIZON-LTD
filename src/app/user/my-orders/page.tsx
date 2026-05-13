"use client";
import React, { useState, useMemo } from "react";
import AppLayout from "@src/components/AppLayout";
import Dashboard from "@src/components/Dashboard";
import OrderHistory from "@src/components/OrderHistory";
import PaginationComponent from "@src/components/Reusables/PaginationComponent";
import { Skeleton } from "@heroui/react";
import {
	useCustomer,
	useCustomerOrders,
} from "@src/components/lib/woocommerce";
import Link from "next/link";
import { statusStyles } from "@constants";
import {
	FiInbox,
	FiShoppingBag,
	FiChevronRight,
	FiCalendar,
	FiCreditCard,
} from "react-icons/fi";
import dayjs from "dayjs";
import { FormatMoney2 } from "@src/components/Reusables/FormatMoney";
import AppMenu from "@src/components/Navbars/AppMenu";

const Page = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 10;

	const { data: wc_customer_info, isLoading: isLoadingCustomer } = useCustomer("");

	const { data: allCustomerOrders, isLoading: isLoadingOrders } =
		useCustomerOrders((wc_customer_info as any)?.id);

	const isTrulyLoading =
		isLoadingCustomer || (wc_customer_info?.id && isLoadingOrders);
	const totalItems = allCustomerOrders?.length || 0;
	const totalPages = Math.ceil(totalItems / itemsPerPage);

	const currentTableData = useMemo(() => {
		if (!allCustomerOrders) return [];
		const start = (currentPage - 1) * itemsPerPage;
		return allCustomerOrders.slice(start, start + itemsPerPage);
	}, [allCustomerOrders, currentPage]);

	const handlePageChange = (data: { selected: number }) => {
		setCurrentPage(data.selected + 1);
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	// --- MOBILE: Order Card Component ---
	const OrderMobileCard = ({ order }: { order: any }) => (
		<Link
			href={`/order/${order.id}`}
			className='bg-white border border-gray-100 rounded-3xl p-5 mb-4 shadow-sm active:scale-[0.98] transition-all flex flex-col gap-4'
		>
			<div className='flex justify-between items-start'>
				<div className='flex flex-col gap-1'>
					<span className='text-[10px] font-black text-gray-400 uppercase tracking-widest'>
						Order ID
					</span>
					<span className='text-sm font-black text-slate-900'>#{order.id}</span>
				</div>
				<div
					className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${statusStyles[order.status] || "bg-gray-100"}`}
				>
					{order.status.replace("-", " ")}
				</div>
			</div>

			<div className='grid grid-cols-2 gap-4 border-y border-gray-50 py-3'>
				<div className='flex items-center gap-2'>
					<FiCalendar className='text-gray-400' />
					<span className='text-xs text-gray-600 font-medium'>
						{dayjs(order.date_created).format("DD MMM, YYYY")}
					</span>
				</div>
				<div className='flex items-center gap-2'>
					<FiCreditCard className='text-gray-400' />
					<span className='text-xs text-gray-600 font-medium truncate uppercase'>
						{order.payment_method_title || "Transfer"}
					</span>
				</div>
			</div>

			<div className='flex justify-between items-center'>
				<div className='flex flex-col'>
					<span className='text-[10px] font-black text-gray-400 uppercase tracking-widest'>
						Total Amount
					</span>
					<span className='text-lg font-black text-primary-100'>
						<FormatMoney2 value={parseInt(order.total)} />
					</span>
				</div>
				<div className='bg-slate-900 text-white p-2 rounded-xl'>
					<FiChevronRight size={20} />
				</div>
			</div>
		</Link>
	);

	// --- SKELETONS ---
	const MobileSkeleton = () => (
		<div className='flex flex-col gap-4 md:hidden'>
			{[...Array(4)].map((_, i) => (
				<div
					key={i}
					className='bg-white rounded-3xl p-5 border border-gray-100 space-y-4'
				>
					<div className='flex justify-between'>
						<Skeleton className='h-4 w-20 rounded bg-gray-200' />
						<Skeleton className='h-6 w-24 rounded-full bg-gray-200' />
					</div>
					<Skeleton className='h-10 w-full rounded-xl bg-gray-100' />
					<div className='flex justify-between items-end'>
						<Skeleton className='h-6 w-24 rounded bg-gray-200' />
						<Skeleton className='h-10 w-10 rounded-xl bg-gray-200' />
					</div>
				</div>
			))}
		</div>
	);

	return (
		<AppLayout>
			<Dashboard>
				<div className='flex flex-col w-full max-w-6xl mx-auto pb-10 px-0'>
					{/* Header */}
					<div className='mb-8 pb-5 border-b border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-end gap-4'>
						<div>
							<h1 className='text-2xl font-bold text-primary-300 tracking-tight'>
								My Orders
							</h1>
							<p className='text-sm text-gray-500 mt-1'>
								View and manage your procurement history
							</p>
						</div>
					</div>

					{/* Loading State */}
					{isTrulyLoading ? (
						<>
							<MobileSkeleton />
							<div className='hidden md:block overflow-hidden bg-white rounded-[2rem] border border-gray-100 shadow-xl p-8'>
								<Skeleton className='h-6 w-full mb-4 rounded bg-gray-100' />
								<Skeleton className='h-6 w-full mb-4 rounded bg-gray-100' />
								<Skeleton className='h-6 w-full mb-4 rounded bg-gray-100' />
							</div>
						</>
					) : currentTableData.length > 0 ? (
						<>
							{/* MOBILE LIST VIEW */}
							<div className='md:hidden flex flex-col'>
								{currentTableData.map((order: any) => (
									<OrderMobileCard key={order.id} order={order} />
								))}
							</div>

							{/* DESKTOP TABLE VIEW */}
							<div className='hidden md:block overflow-hidden bg-white rounded-[2rem] border border-gray-100 shadow-xl shadow-slate-200/50'>
								<div className='overflow-x-auto'>
									<table className='min-w-full'>
										<thead className='bg-slate-50/80 backdrop-blur-sm'>
											<tr>
												{[
													"No",
													"Order ID",
													"Date",
													"Method",
													"Status",
													"Total",
													"Action",
												].map((head) => (
													<th
														key={head}
														className='px-6 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-[2px]'
													>
														{head}
													</th>
												))}
											</tr>
										</thead>
										<tbody className='bg-white divide-y divide-gray-50'>
											{currentTableData.map((order: any, i: number) => (
												<tr
													key={order.id}
													className='hover:bg-slate-50/50 transition-all group'
												>
													<OrderHistory
														index={(currentPage - 1) * itemsPerPage + i + 1}
														_id={order?.id}
														pageCount={totalPages}
														createdAt={order?.date_created}
														paymentMethod={
															order?.payment_method_title ||
															order?.payment_method
														}
														status={order?.status}
														total={parseInt(order?.total)}
														currency={"₦"}
													/>
													<td className='px-6 py-4 text-center'>
														<Link
															href={`/order/${order.id}`}
															className='inline-flex items-center px-5 py-2.5 bg-slate-900 text-white text-[10px] font-black uppercase tracking-[1px] rounded-full hover:bg-primary-100 transition-colors'
														>
															Details
														</Link>
													</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
							</div>
						</>
					) : (
						/* Empty State */
						<div className='rounded-2xl border border-gray-100 py-24 text-center bg-white shadow-sm'>
							<div className='w-16 h-16 bg-brand-light rounded-2xl flex items-center justify-center mx-auto mb-5'>
								<FiShoppingBag className='text-2xl text-primary-100' />
							</div>
							<h3 className='text-lg font-bold text-primary-300'>
								No Orders Yet
							</h3>
							<p className='text-sm text-gray-500 mt-2 mb-7 max-w-xs mx-auto'>
								You haven't made any purchases. Start exploring our store today!
							</p>
							<Link
								href='/'
								className='inline-flex items-center bg-primary-100 hover:bg-primary-200 text-white px-8 py-3 rounded-xl text-sm font-semibold shadow-lg shadow-primary-100/25 transition-all'
							>
								Go to Store
							</Link>
						</div>
					)}

					{/* Pagination */}
					{!isTrulyLoading && totalPages > 1 && (
						<div className='mt-10 flex justify-center'>
							<PaginationComponent
								pageCount={totalPages}
								onPageChange={handlePageChange}
								forcePage={currentPage - 1}
							/>
						</div>
					)}
				</div>
			</Dashboard>
			<AppMenu />
		</AppLayout>
	);
};

export default Page;
