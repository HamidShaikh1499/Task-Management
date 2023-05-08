import { Field, Form, Formik } from "formik";
import * as Yup from 'yup';
import ApiService, { ApiUrls } from '../../service/ApiService';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setTokenAndUser } from "../../reducer/slice/user";
import { toastAction } from "../../component/toastify";
import { useState } from "react";
import Loader from "../../component/Loader";

export default function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);

    const SignupSchema = Yup.object().shape({
        email: Yup.string().email('Email is not valid format.').required('Email is required.'),
        password: Yup.string()
            .min(8, 'Password must be contained at least 8 characters.')
            .required('Password is required.'),
    });

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center font-newsreader text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Sign in to your account
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <Formik
                    initialValues={{
                        email: '',
                        password: '',
                    }}
                    validationSchema={SignupSchema}
                    onSubmit={async (values, { setErrors }) => {
                        setIsLoading(true);
                        const { data, error } = await ApiService.post(ApiUrls.login, values);
                        setIsLoading(false);
                        if (data) {
                            dispatch(setTokenAndUser(data));
                            navigate('/task');
                        } else {
                            if (typeof error !== 'string') {
                                setErrors(error);
                            } else {
                                toastAction.error(error);
                            }
                        }
                    }}>
                    {({ errors, touched, isSubmitting }) => (
                        <Form className="flex flex-col space-y-4">
                            <div>
                                <label htmlFor="email" className="block font-newsreader text-sm font-medium leading-6 text-gray-900">
                                    Email address
                                </label>
                                <div className="mt-2">
                                    <Field name="email"
                                        id="email"
                                        type="email"
                                        autoComplete="email"
                                        className="block font-newsreader w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                    {errors.email && touched.email ? (
                                        <span className="text-red-500 font-newsreader text-xs">{errors.email}</span>
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
                                    <Field name="password"
                                        id="password"
                                        type="password"
                                        className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                    {errors.password && touched.password ? (
                                        <span className="text-red-500 font-newsreader text-xs">{errors.password}</span>
                                    ) : null}
                                </div>
                            </div>

                            <div>
                                <button
                                    disabled={isSubmitting}
                                    type="submit"
                                    className="flex w-full justify-center font-newsreader rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Sign in
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>

                <p className="mt-10 text-center font-newsreader text-sm text-gray-500">
                    don't have an account?{' '}
                    <span onClick={() => navigate('/sign-up')} className="font-semibold cursor-pointer leading-6 text-indigo-600 hover:text-indigo-500">
                        Sign up
                    </span>
                </p>
            </div>

            {
                isLoading
                    ? <Loader />
                    : null
            }
        </div>
    )
}