import { useFormik } from "formik";
import { isEmpty, omit } from "lodash";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import utils from "../../common/utils";
import { toastAction } from "../../component/toastify";
import PasswordStrengthBar from 'react-password-strength-bar';
import ApiService, { ApiUrls } from '../../service/ApiService';
import Loader from "../../component/Loader";

export default function Register() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const [score, setScore] = useState(0);
    const SignupSchema = Yup.object().shape({
        firstName: Yup.string().required('First name is required.'),
        lastName: Yup.string().required('Last name is required.'),
        email: Yup.string().email('Email is not valid format.').required('Email is required.'),
        password: Yup.string()
            .min(8, 'Password must be contained at least 8 characters.')
            .required('Password is required.'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref("password"), null], "Passwords must match")
            .required("Confirm Password is required"),
    });

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            confirmPassword: ''
        },
        validationSchema: SignupSchema,
        onSubmit: async (values, { setErrors }) => {
            if (score < 4) {
                setErrors({ password: 'Password must be strong.' });
                return;
            }

            setIsLoading(true);
            const { data, error } = await ApiService.post(ApiUrls.signUp, omit(values, ['confirmPassword']));
            setIsLoading(false);
            if (data) {
                navigate('/login');
            } else {
                if (typeof error !== 'string') {
                    setErrors(error);
                } else {
                    toastAction.error(error);
                }
            }
        }
    });

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center font-newsreader text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Create your account
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={formik.handleSubmit} className="flex flex-col space-y-4">
                    <div>
                        <label htmlFor="email" className="block font-newsreader text-sm font-medium leading-6 text-gray-900">
                            First name
                        </label>
                        <div className="mt-2">
                            <input type="text" name="firstName"
                                id="firstName"
                                onChange={formik.handleChange}
                                value={formik.values.firstName}
                                className="block font-newsreader w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            {formik.errors.firstName && formik.touched.firstName ? (
                                <span className="text-red-500 font-newsreader text-xs">{formik.errors.firstName}</span>
                            ) : null}
                        </div>
                    </div>

                    <div>
                        <label htmlFor="email" className="block font-newsreader text-sm font-medium leading-6 text-gray-900">
                            Last name
                        </label>
                        <div className="mt-2">
                            <input type="text" name="lastName"
                                id="lastName"
                                onChange={formik.handleChange}
                                value={formik.values.lastName}
                                className="block font-newsreader w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            {formik.errors.lastName && formik.touched.lastName ? (
                                <span className="text-red-500 font-newsreader text-xs">{formik.errors.lastName}</span>
                            ) : null}
                        </div>
                    </div>

                    <div>
                        <label htmlFor="email" className="block font-newsreader text-sm font-medium leading-6 text-gray-900">
                            Email address
                        </label>
                        <div className="mt-2">
                            <input name="email"
                                id="email"
                                type="email"
                                onChange={formik.handleChange}
                                value={formik.values.email}
                                autoComplete="email"
                                className="block font-newsreader w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            {formik.errors.email && formik.touched.email ? (
                                <span className="text-red-500 font-newsreader text-xs">{formik.errors.email}</span>
                            ) : null}
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block font-newsreader text-sm font-medium leading-6 text-gray-900">
                                Password
                            </label>
                        </div>
                        <div className="mt-2">
                            <input name="password"
                                id="password"
                                type="password"
                                onChange={formik.handleChange}
                                value={formik.values.password}
                                className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            <PasswordStrengthBar onChangeScore={(score) => setScore(score)} password={formik.values.password} />
                            {formik.errors.password && formik.touched.password ? (
                                <span className="text-red-500 font-newsreader text-xs">{formik.errors.password}</span>
                            ) : null}
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="confirmPassword" className="block font-newsreader text-sm font-medium leading-6 text-gray-900">
                                Confirm password
                            </label>
                        </div>
                        <div className="mt-2">
                            <input name="confirmPassword"
                                id="confirmPassword"
                                type="password"
                                onChange={formik.handleChange}
                                value={formik.values.confirmPassword}
                                className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            {formik.errors.confirmPassword && formik.touched.confirmPassword ? (
                                <span className="text-red-500 font-newsreader text-xs">{formik.errors.confirmPassword}</span>
                            ) : null}
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center font-newsreader rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Sign in
                        </button>
                    </div>
                </form>

                <p className="mt-10 text-center font-newsreader text-sm text-gray-500">
                    do you have account?{' '}
                    <span onClick={() => navigate('/login')} className="font-semibold cursor-pointer leading-6 text-indigo-600 hover:text-indigo-500">
                        Sign In
                    </span>
                </p>
            </div>

            {
                isLoading
                    ? <Loader />
                    : null
            }
        </div >
    )
}