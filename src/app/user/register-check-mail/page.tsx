"use client";
import AppLayout from "@src/components/AppLayout";
import { useRouter } from "next/navigation";
import { MailCheck } from "lucide-react";

const Page = () => {
	const router = useRouter();

	return (
		<AppLayout>
			<main className='min-h-screen flex items-center justify-center px-4 bg-gray-50'>
				<div className='flex flex-col items-center text-center bg-white w-full max-w-md py-14 px-8 shadow-xl shadow-slate-200/60 rounded-2xl gap-5 border border-gray-100'>
					<div className='w-16 h-16 rounded-2xl bg-brand-light flex items-center justify-center'>
						<MailCheck className='w-8 h-8 text-primary-100' />
					</div>
					<div className='space-y-2'>
						<h2 className='text-2xl font-bold text-primary-300'>Verify your email</h2>
						<p className='text-sm text-gray-500 leading-relaxed'>A verification link has been sent to your email address. Please check your inbox to complete your registration.</p>
					</div>
					<button
						className='mt-2 text-sm font-semibold text-primary-100 hover:text-primary-300 hover:underline underline-offset-4 transition-colors cursor-pointer'
						onClick={() => router.push("/user/register")}
					>
						← Back to Registration
					</button>
				</div>
			</main>
		</AppLayout>
	);
};

export default Page;
