"use client";
import React, { useState } from "react";
import { Formik, Form, Field, FormikProvider, useFormik } from "formik";
import { RegisterFormModel } from "../config/models";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { AUTH_EMAIL, AUTH_TOKEN_KEY } from "@constants";
import Cookies from "js-cookie";
import FormToast from "../Reusables/Toast/SigninToast";
import { useMutation } from "react-query";
import { APICall } from "@utils";
import { register } from "@utils/endpoints";
import { ImSpinner2 } from "react-icons/im";
import TextInput from "../Reusables/TextInput";

interface FormValues {
	first_name: string;
	last_name: string;
	email: string;
	username: string;
	password: string;
}

const RegisterForm = () => {
	const router = useRouter();
	const [showPassword, setShowPassword] = useState(false);

	const handlePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	const signUpMutation = useMutation(
		async (value: FormValues) => {
			const response = await APICall(register, value, true, true);
			return response?.data;
		},
		{
			onSuccess: async (data) => {
				const accessToken = data?.token;
				const userEmail = data?.email;
				if (accessToken && userEmail) {
					Cookies.set(AUTH_TOKEN_KEY, accessToken);
					Cookies.set(AUTH_EMAIL, userEmail);
					FormToast({
						message: "Registration successful! Welcome!",
						success: true,
					});
					formik.resetForm();
					router.push("/user/dashboard");
				} else {
					FormToast({
						message: "Registration failed. Please try again.",
						success: false,
					});
				}
			},
			onError: (error: any) => {
				FormToast({
					message: error?.response?.data?.message || "Registration failed",
					success: false,
				});
			},
		},
	);

	const initialValues: FormValues = {
		first_name: "",
		last_name: "",
		email: "",
		username: "",
		password: "",
	};

	const formik = useFormik({
		initialValues: initialValues,
		validationSchema: RegisterFormModel,
		onSubmit: async (values) => {
			await signUpMutation.mutateAsync(values);
		},
	});

	return (
		<>
			<div className='flex flex-col w-full max-w-[32rem] py-5 md:pb-10 px-3 md:px-5 sm:shadow-lg sm:rounded-xl'>
				<h4 className='text-xl md:text-2xl uppercase text-primary-100 font-semibold text-center lg:mb-2'>
					Register
				</h4>
				<FormikProvider value={formik}>
					<Form className='flex flex-col gap-2 md:gap-3'>
						<div className='grid lg:grid-cols-2 gap-2 md:gap-3'>
							<div>
								<label
									htmlFor='first_name'
									className='block text-xs md:text-base text-accent mt-2 mb-1'
								>
									First Name <span className='text-red-500'>*</span>
								</label>

								<TextInput
									id='first_name'
									placeholder='Enter your first name'
									type='text'
									className={`w-full px-2 py-4 text-base rounded-md border bg-transparent border-secondary-800 outline-none transition-[.5] ease-in focus:border-transparent focus:ring-1 focus:ring-primary-100 ${
										formik.touched.first_name && formik.errors.first_name
											? "border-red-500"
											: "border-gray-300"
									}`}
								/>
							</div>
							<div>
								<label
									htmlFor='last_name'
									className='block text-xs md:text-base text-accent mt-2 mb-1'
								>
									Last Name <span className='text-red-500'>*</span>
								</label>

								<TextInput
									id='last_name'
									placeholder='Enter your last name'
									type='text'
									className={`w-full px-2 py-4 text-base bg-transparent rounded-md border border-secondary-800 outline-none transition-[.5] ease-in focus:border-transparent focus:ring-1 focus:ring-primary-100 ${
										formik.touched.last_name && formik.errors.last_name
											? "border-red-500"
											: "border-gray-300"
									}`}
								/>
							</div>
						</div>
						<div className='grid grid-cols-2 gap-2 md:gap-3'>
							<div>
								<label
									htmlFor='username'
									className='block text-xs md:text-base text-accent mb-1'
								>
									Username <span className='text-red-500'>*</span>
								</label>

								<TextInput
									id='username'
									placeholder='Enter username'
									type='text'
									className={`w-full px-2 py-4 text-base bg-transparent rounded-md border border-secondary-800 outline-none transition-[.5] ease-in focus:border-transparent focus:ring-1 focus:ring-primary-100 ${
										formik.touched.username && formik.errors.username
											? "border-red-500"
											: "border-gray-300"
									}`}
								/>
							</div>
							<div>
								<label
									htmlFor='email'
									className='block text-xs md:text-base text-accent mb-1'
								>
									Email address <span className='text-red-500'>*</span>
								</label>

								<TextInput
									id='email'
									placeholder='Enter your email'
									type='email'
									className={`w-full px-2 py-4 text-base bg-transparent rounded-md border border-secondary-800 outline-none transition-[.5] ease-in focus:border-transparent focus:ring-1 focus:ring-primary-100 ${
										formik.touched.email && formik.errors.email
											? "border-red-500"
											: "border-gray-300"
									}`}
								/>
							</div>
						</div>
						<div>
							<label
								htmlFor='password'
								className='block text-xs md:text-base text-accent mb-1'
							>
								Password <span className='text-red-500'>*</span>
							</label>

							<TextInput
								id='password'
								placeholder='Enter your password'
								type={showPassword ? "text" : "password"}
								showPasswordIcon
								showPassword={showPassword}
								togglePasswordVisibility={handlePasswordVisibility}
								passwordIconClassname='text-gray-400 hover:text-gray-600 text-lg'
								className={`w-full px-2 py-4 text-base rounded-md bg-transparent border border-secondary-800 outline-none focus:border-transparent transition-[.5] ease-in focus:ring-1 focus:ring-primary-100 ${
									formik.touched.password && formik.errors.password
										? "border-red-500"
										: "border-gray-300"
								}`}
							/>
						</div>

						<button
							type='submit'
							className={`flex items-center justify-center mt-3 border relative text-white border-transparent hover:border-primary-100 hover:border-transparent text-base leading-[1.4] font-semibold py-2.5 sm:py-3 w-full rounded-md gap-1.5 transition ${
								formik.isValid && !signUpMutation.isLoading
									? "bg-primary-100 cursor-pointer"
									: "bg-primary-100/60 cursor-not-allowed"
							} `}
							disabled={!formik.isValid || signUpMutation.isLoading}
						>
							{signUpMutation.isLoading ? (
								<ImSpinner2 className='text-xl animate-spin' />
							) : (
								"Register"
							)}
						</button>

						<div className='flex justify-center text-sm md:text-base'>
							<span>Already Have account?&nbsp;</span>
							<span
								onClick={() => router.push("/user/login")}
								className='text-primary-100 font-semibold hover:underline cursor-pointer transition underline-offset-4'
							>
								Log in
							</span>
						</div>
					</Form>
				</FormikProvider>
			</div>
		</>
	);
};

export default RegisterForm;
