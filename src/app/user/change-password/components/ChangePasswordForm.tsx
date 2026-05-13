"use client";
import { changePasswordFormModel } from "@src/components/config/models";
import useToken from "@src/components/hooks/useToken";
import { useCustomer } from "@src/components/lib/woocommerce";
import { APICall } from "@utils";
import { changeWpPassword } from "@utils/endpoints";
import { Field, Form, FormikProvider, useFormik } from "formik";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im";
import { useMutation } from "react-query";

interface FormValues {
	email?: string;
	old_password: string;
	new_password: string;
}

const ChangePasswordForm = () => {
	const { token } = useToken();
	const [showOldPassword, setShowOldPassword] = useState(false);
	const [showNewPassword, setShowNewPassword] = useState(false);
	const { data: customerData } = useCustomer("");
	const wc_customer_info = customerData as Woo_Customer_Type | undefined;

	const initialValues: FormValues = {
		email: wc_customer_info?.email,
		old_password: "",
		new_password: "",
	};

	const changePasswordMutation = useMutation(
		async (value: FormValues) => {
			const response = await APICall(changeWpPassword, value, true, true);
			return response?.data;
		},
		{
			onSuccess: async (data, variable: FormValues) => {
				formik.resetForm();
			},
			onError: (error: any) => {},
		},
	);

	const toggleOldPasswordVisibility = () => {
		setShowOldPassword((prevShowPassword) => !prevShowPassword);
	};

	const toggleNewPasswordVisibility = () => {
		setShowNewPassword((prevShowPassword) => !prevShowPassword);
	};

	const handleFormSubmit = async (
		values: FormValues,
		setSubmitting: (val: boolean) => void,
	) => {
		try {
			setSubmitting(true);
			await changePasswordMutation.mutateAsync(values);
			setSubmitting(false);
		} catch (error) {
			setSubmitting(false);
		}
	};

	const formik = useFormik({
		initialValues: initialValues,
		enableReinitialize: true,
		validationSchema: changePasswordFormModel,
		onSubmit: (values, { setSubmitting }) => {
			handleFormSubmit(values, setSubmitting);
		},
	});

	return (
		<>
			<div className='mb-6 pb-5 border-b border-gray-100'>
				<h2 className='text-xl font-bold text-primary-300'>Change Password</h2>
				<p className='text-sm text-gray-500 mt-1'>Update your account password below.</p>
			</div>
			<FormikProvider value={formik}>
				<Form className='max-w-md space-y-5'>
					{/* Email */}
					<div>
						<label htmlFor='email' className='block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5'>
							Email Address <span className='text-danger'>*</span>
						</label>
						<Field
							type='text'
							id='email'
							name='email'
							disabled
							placeholder='Enter your email address'
							className={`w-full px-4 py-3 text-sm rounded-xl border bg-gray-50 cursor-not-allowed text-gray-400 outline-none ${
								formik.touched.email && formik.errors.email ? "border-danger" : "border-gray-200"
							}`}
						/>
						{formik.touched.email && formik.errors.email && (
							<p className='text-danger text-xs mt-1.5'>{formik.errors.email}</p>
						)}
					</div>

					{/* Current Password */}
					<div>
						<label htmlFor='old_password' className='block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5'>
							Current Password <span className='text-danger'>*</span>
						</label>
						<div className='relative'>
							<Field
								type={showOldPassword ? "text" : "password"}
								id='old_password'
								name='old_password'
								placeholder='Enter your current password'
								className={`w-full px-4 py-3 text-sm rounded-xl border outline-none focus:ring-2 focus:ring-primary-100/20 focus:border-primary-100 transition-all ${
									formik.touched.old_password && formik.errors.old_password ? "border-danger" : "border-gray-200"
								}`}
							/>
							<span className='absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-primary-100 transition-colors' onClick={toggleOldPasswordVisibility}>
								{showOldPassword ? <FaEye /> : <FaEyeSlash />}
							</span>
						</div>
						{formik.touched.old_password && formik.errors.old_password && (
							<p className='text-danger text-xs mt-1.5'>{formik.errors.old_password}</p>
						)}
					</div>

					{/* New Password */}
					<div>
						<label htmlFor='new_password' className='block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5'>
							New Password <span className='text-danger'>*</span>
						</label>
						<div className='relative'>
							<Field
								type={showNewPassword ? "text" : "password"}
								id='new_password'
								name='new_password'
								placeholder='Enter your new password'
								className={`w-full px-4 py-3 text-sm rounded-xl border outline-none focus:ring-2 focus:ring-primary-100/20 focus:border-primary-100 transition-all ${
									formik.touched.new_password && formik.errors.new_password ? "border-danger" : "border-gray-200"
								}`}
							/>
							<span className='absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-primary-100 transition-colors' onClick={toggleNewPasswordVisibility}>
								{showNewPassword ? <FaEye /> : <FaEyeSlash />}
							</span>
						</div>
						{formik.touched.new_password && formik.errors.new_password && (
							<p className='text-danger text-xs mt-1.5'>{formik.errors.new_password}</p>
						)}
					</div>

					<div className='pt-2'>
						<button
							type='submit'
							disabled={!formik.isValid || formik.isSubmitting}
							className={`w-full sm:w-48 h-12 flex items-center justify-center gap-2 text-sm font-semibold text-white rounded-xl transition-all ${
								formik.isValid ? "bg-primary-100 hover:bg-primary-200 shadow-lg shadow-primary-100/25" : "bg-primary-100/50 cursor-not-allowed"
							}`}
						>
							{formik.isSubmitting ? <ImSpinner2 className='text-lg animate-spin' /> : "Change Password"}
						</button>
					</div>
				</Form>
			</FormikProvider>
		</>
	);
};

export default ChangePasswordForm;
