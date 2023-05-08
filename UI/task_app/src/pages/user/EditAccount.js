import { Field, Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from 'yup';
import { toastAction } from "../../component/toastify";
import { setUser } from "../../reducer/slice/user";
import ApiService, { ApiUrls } from '../../service/ApiService';

export default function EditAccount({ onClose }) {
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const editUserSchema = Yup.object().shape({
        firstName: Yup.string().required('First name is required.'),
        lastName: Yup.string().required('Last name is required.'),
        email: Yup.string().email('Email is not valid format.').required('Email is required.'),
    });

    return (
        <div className='bg-gray-400 backdrop-filter backdrop-blur-sm bg-opacity-40 flex content-center absolute inset-0 justify-center items-center w-screen h-screen z-50'>
            <div className="bg-white flex flex-col space-y-2 py-4 px-4 overflow-hidden relative shadow rounded-md w-96">
                <div className="flex flex-row justify-between">
                    <small className="text-base font-newsreader text-cyan-700">Edit profile</small>
                    <svg onClick={() => onClose()} className="w-6 h-6 cursor-pointer text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </div>

                <Formik
                    initialValues={{
                        email: user?.email,
                        firstName: user?.firstName,
                        lastName: user?.lastName,
                    }}
                    validationSchema={editUserSchema}
                    onSubmit={async (values, { setErrors }) => {
                        const { data, error } = await ApiService.put(ApiUrls.user, { ...values, id: user._id });
                        if (data) {
                            dispatch(setUser({ user: data }));
                            onClose();
                        } else {
                            if (error && typeof error !== 'string') {
                                setErrors(error);
                            } else {
                                toastAction.error(error || 'Oops !!! something went wrong !!!');
                            }
                        }
                    }}>
                    {({ errors, touched }) => (
                        <Form className="flex flex-col space-y-4">
                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="firstName" className="block font-newsreader text-sm font-medium leading-6 text-gray-900">
                                        First name
                                    </label>
                                </div>
                                <div className="mt-2">
                                    <Field name="firstName"
                                        id="firstName"
                                        className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                    {errors.firstName && touched.firstName ? (
                                        <span className="text-red-500 font-newsreader text-xs">{errors.firstName}</span>
                                    ) : null}
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="lastName" className="block font-newsreader text-sm font-medium leading-6 text-gray-900">
                                        Last name
                                    </label>
                                </div>
                                <div className="mt-2">
                                    <Field name="lastName"
                                        id="lastName"
                                        className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                    {errors.lastName && touched.lastName ? (
                                        <span className="text-red-500 font-newsreader text-xs">{errors.lastName}</span>
                                    ) : null}
                                </div>
                            </div>

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
                                <button
                                    type="submit"
                                    className="flex w-full justify-center font-newsreader rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Save
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}