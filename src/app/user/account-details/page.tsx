"use client";
import AppLayout from "@src/components/AppLayout";
import Dashboard from "@src/components/Dashboard";
import Label from "@src/components/Form/Label";
import useToken from "@src/components/hooks/useToken";
import Uploader from "@src/components/image-uploader/Uploader";
import {
	useCustomer,
	useUpdateCustomer,
} from "@src/components/lib/woocommerce";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ImSpinner2 } from "react-icons/im";
import { useQueryClient } from "react-query";
import { toast } from "react-toastify";

const Page = () => {
	const { token } = useToken();
	const [imageUrl, setImageUrl] = useState<string | undefined>("");
	const [uploadImage, setUploadImage] = useState<string | undefined>("");
	const queryClient = useQueryClient();
	const router = useRouter();

	const { data: wc_customer_info, isLoading, isError } = useCustomer("");

	const [firstName, setFirstname] = useState<string | undefined>("");
	const [lastName, setLastName] = useState<string | undefined>("");
	const [username, setUsername] = useState<string | undefined>("");
	const [homeAddres, setHomeAddres] = useState<string | undefined>("");
	const [phoneNum, setPhoneNum] = useState<string | undefined>("");
	const [email, setEmail] = useState<string | undefined>("");

	const customer = wc_customer_info as Woo_Customer_Type | undefined;
	useEffect(() => {
		if (customer) {
			setImageUrl(customer.shipping?.address_2);
			setFirstname(customer.first_name);
			setLastName(customer.last_name);
			setUsername(customer.username);
			setHomeAddres(customer.billing?.address_1);
			setPhoneNum(customer.billing?.phone);
			setEmail(customer.email);
		}
	}, [customer]);

	const {
		mutate: updateCustomer,
		isLoading: updateCustomerIsLoading,
		isError: updateCustomerIsError,
	} = useUpdateCustomer();
	const handleFormSubmit = async () => {
		const payload = {
			id: customer?.id,
			email: email,
			first_name: firstName,
			last_name: lastName,
			username: username,
			billing: {
				first_name: firstName,
				last_name: lastName,
				address_1: homeAddres,
				email: email,
				phone: phoneNum,
			},
			shipping: {
				first_name: firstName,
				last_name: lastName,
				address_2: uploadImage || imageUrl,
			},
		};

		// Call the update customer mutation
		updateCustomer(payload, {
			onSuccess: (data, variable) => {
				queryClient.invalidateQueries("customer");
				toast.success("Customer profile updated successfully");
				// window.location.reload();
				router.push("/user/dashboard");
			},
			onError: (error) => {
				toast.error("Failed to update customer profile");
			},
		});
	};

	return (
		<AppLayout>
			<Dashboard>
				<div className='max-w-2xl'>
					{/* Header */}
					<div className='mb-6 pb-5 border-b border-gray-100'>
						<h2 className='text-xl font-bold text-primary-300'>Account Details</h2>
						<p className='text-sm text-gray-500 mt-1'>Manage your personal information and profile photo.</p>
					</div>

					<form className='space-y-6'>
						{/* Avatar */}
						<div>
							<Label label='Profile Photo' />
							<div className='mt-2'>
								<Uploader imageUrl={imageUrl} setUploadImage={setUploadImage} />
							</div>
						</div>

						{/* Fields Grid */}
						<div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
							{[
								{ id: "firstName", label: "First Name", value: firstName, onChange: (e: React.ChangeEvent<HTMLInputElement>) => setFirstname(e.target.value), type: "text", disabled: false },
								{ id: "lastName", label: "Last Name", value: lastName, onChange: (e: React.ChangeEvent<HTMLInputElement>) => setLastName(e.target.value), type: "text", disabled: false },
								{ id: "Username", label: "Username", value: username, onChange: (e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value), type: "text", disabled: false },
								{ id: "homeAddress", label: "Home Address", value: homeAddres, onChange: (e: React.ChangeEvent<HTMLInputElement>) => setHomeAddres(e.target.value), type: "text", disabled: false },
								{ id: "phone", label: "Phone Number", value: phoneNum, onChange: (e: React.ChangeEvent<HTMLInputElement>) => setPhoneNum(e.target.value), type: "number", disabled: false },
								{ id: "email", label: "Email Address", value: email, onChange: (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value), type: "text", disabled: true },
							].map((field) => (
								<div key={field.id}>
									<label htmlFor={field.id} className='block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5'>
										{field.label}
									</label>
									<input
										type={field.type}
										id={field.id}
										name={field.id}
										value={field.value}
										onChange={field.onChange}
										disabled={field.disabled}
										className={`w-full px-4 py-3 text-sm rounded-xl border outline-none transition-all ${
											field.disabled
												? "bg-gray-50 border-gray-200 text-gray-400 cursor-not-allowed"
												: "border-gray-200 text-gray-800 focus:ring-2 focus:ring-primary-100/20 focus:border-primary-100"
										}`}
									/>
								</div>
							))}
						</div>

						<div className='pt-2'>
							<button
								type='button'
								onClick={handleFormSubmit}
								disabled={updateCustomerIsLoading}
								className='w-full sm:w-48 h-12 flex items-center justify-center gap-2 text-sm font-semibold text-white bg-primary-100 hover:bg-primary-200 rounded-xl shadow-lg shadow-primary-100/25 transition-all disabled:opacity-60 disabled:cursor-not-allowed'
							>
								{updateCustomerIsLoading ? <ImSpinner2 className='text-lg animate-spin' /> : "Update Profile"}
							</button>
						</div>
					</form>
				</div>
			</Dashboard>
		</AppLayout>
	);
};

export default Page;
