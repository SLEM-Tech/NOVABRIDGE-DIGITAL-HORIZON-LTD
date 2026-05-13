"use client";
import React, { useState, useTransition } from "react";
import { Form, Field, FormikProvider, useFormik } from "formik";
import { LoginFormModel } from "../config/models";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { AUTH_EMAIL, AUTH_TOKEN_KEY } from "@constants";
import Cookies from "js-cookie";
import { GoUnlock } from "react-icons/go";
import { ImSpinner2 } from "react-icons/im";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { login } from "@utils/endpoints";
import { toast } from "react-toastify";
import { APICall } from "@utils";
import { useAppDispatch } from "../hooks";
import { authLogin } from "../Redux/Auth";
import Link from "next/link";
import FormToast from "../Reusables/Toast/SigninToast";
import TextInput from "../Reusables/TextInput";
import GlobalLoader from "../modal/GlobalLoader";

interface FormValues {
	email: string;
	password: string;
}

const LoginForm = () => {
	const router = useRouter();
	const dispatch = useAppDispatch();
	const [showPassword, setShowPassword] = useState(false);
	const queryClient = useQueryClient();
	const [isPending, startTransition] = useTransition();
	const togglePasswordVisibility = () => {
		setShowPassword((prevShowPassword) => !prevShowPassword);
	};

	const initialValues: FormValues = {
		email: "",
		password: "",
	};

	const loginMutation = useMutation(
		async (value: FormValues) => {
			const response = await APICall(login, [value], true, true);
			return response?.data;
		},
		{
			onSuccess: async (data, variable: FormValues) => {
				const { email, password } = variable;
				const accessToken = data?.data?.token;
				const userData: UserType = data?.data?.user;
				if (accessToken && userData?.roles[0] === "customer") {
					Cookies.set(AUTH_TOKEN_KEY, accessToken);
					Cookies.set(AUTH_EMAIL, userData?.email);
					dispatch(
						authLogin({
							token: accessToken,
							user: userData,
						}),
					);
					queryClient.invalidateQueries("customer");
					startTransition(() => {
						router.push("/");
					});
				} else {
					FormToast({
						message: "Login failed. Please check your credentials.",
						success: false,
					});
				}
			},
			onError: (error: any) => {
				FormToast({
					message: error?.response?.data?.message || "Login failed. Please try again.",
					success: false,
				});
			},
		},
	);

	const formik = useFormik({
		initialValues: initialValues,
		validationSchema: LoginFormModel,
		onSubmit: async (values, { setSubmitting }) => {
			loginMutation.mutateAsync(values);
		},
	});

	const handlePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	return (
		<>
			<div className='flex flex-col w-full max-w-[32rem] pt-8 pb-6 md:pb-10 px-3 md:px-7 sm:shadow-lg sm:rounded-xl'>
				<h4 className='text-xl text-primary-100 font-semibold text-center md:text-2xl uppercase'>
					Login
				</h4>
				<FormikProvider value={formik}>
					<Form className='flex flex-col gap-2 md:gap-4'>
						<div>
							<label
								htmlFor='email'
								className='block font-medium text-xs md:text-base text-accent mt-4 mb-1'
							>
								Email address <span className='text-red-500'>*</span>
							</label>

							<TextInput
								id='email'
								placeholder='Enter your email address'
								type='email'
								className={`w-full px-2 py-4 text-base rounded-md border bg-transparent border-secondary-800 outline-none transition-[.5] ease-in focus:border-transparent focus:ring-1 focus:ring-primary-100 ${
									formik.touched.email && formik.errors.email
										? "border-red-500"
										: "border-gray-300"
								}`}
							/>
						</div>

						<div>
							<label
								htmlFor='password'
								className='block font-medium text-xs md:text-base text-accent mb-1'
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
								className={`w-full px-2 py-4 text-base rounded-md border bg-transparent border-secondary-800 outline-none focus:border-transparent transition-[.5] ease-in focus:ring-1 focus:ring-primary-100 ${
									formik.touched.password && formik.errors.password
										? "border-red-500"
										: "border-gray-300"
								}`}
							/>
						</div>

						<div className='flex w-full justify-end'>
							<Link
								href='/user/forget-password'
								className='text-glow font-semibold text-xs md:text-[15px] hover:underline underline-offset-4 transition cursor-pointer'
							>
								Forgot Password
							</Link>
						</div>

						<button
							type='submit'
							disabled={!formik.isValid || loginMutation.isLoading}
							className={`flex items-center justify-center border relative text-white border-transparent hover:border-primary-100 hover:border-transparent text-base leading-[1.4] font-semibold py-2.5 sm:py-3 w-full rounded-md gap-1.5 transition ${
								formik.isValid && !loginMutation.isLoading
									? "bg-primary-100 cursor-pointer"
									: "bg-primary-100/60 cursor-not-allowed"
							} `}
						>
							<GoUnlock
								className={`text-xl ${
									loginMutation.isLoading && "animate-pulse"
								}`}
							/>
							{loginMutation.isLoading ? (
								<ImSpinner2 className='text-xl animate-spin' />
							) : (
								"Login"
							)}
						</button>

						<div className='flex justify-center text-sm md:text-base'>
							<span>Don&rsquo;t Have account?&nbsp;</span>
							<span
								onClick={() => {
									startTransition(() => {
										router.push("/user/register");
									});
								}}
								className='text-primary-100 font-semibold hover:underline cursor-pointer transition underline-offset-4'
							>
								Sign up
							</span>
						</div>
					</Form>
				</FormikProvider>
			</div>

			<GlobalLoader isPending={isPending} />
		</>
	);
};

export default LoginForm;
