"use client";
import AppLayout from "@src/components/AppLayout";
import { useRouter } from "next/navigation";
import { CheckCircle } from "lucide-react";

const Page = () => {
	const router = useRouter();

	return (
		<AppLayout>
			<main className='min-h-screen flex items-center justify-center px-4 bg-gray-50'>
				<div className='flex flex-col items-center text-center bg-white w-full max-w-md py-14 px-8 shadow-xl shadow-slate-200/60 rounded-2xl gap-5 border border-gray-100'>
					<div className='w-16 h-16 rounded-2xl bg-success-light flex items-center justify-center'>
						<CheckCircle className='w-8 h-8 text-success' />
					</div>
					<div className='space-y-2'>
						<h2 className='text-2xl font-bold text-primary-300'>Password Changed!</h2>
						<p className='text-sm text-gray-500 leading-relaxed'>Your password has been updated successfully. You can now log in with your new credentials.</p>
					</div>
					<button
						className='mt-2 w-full py-3 bg-primary-100 hover:bg-primary-200 text-white text-sm font-semibold rounded-xl transition-colors cursor-pointer'
						onClick={() => router.push("/user/login")}
					>
						Go to Login
					</button>
				</div>
			</main>
		</AppLayout>
	);
};

export default Page;
