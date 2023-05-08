import { Field, Form, Formik } from "formik";
import ApiService, { ApiUrls } from "../../service/ApiService";
import { toastAction } from "../../component/toastify";
import DatePicker from "react-datepicker";
import * as Yup from 'yup';
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

export default function AddTask({ onClose, onAddEditTask, isEdit, selectedTask }) {

    const SignupSchema = Yup.object().shape({
        title: Yup.string().required('Please enter title.'),
        description: Yup.string().required('Please enter description.'),
        dueDate: Yup.date().required('Please select date.')
    });

    return (
        <div className='bg-gray-400 backdrop-filter backdrop-blur-sm bg-opacity-40 flex content-center absolute inset-0 justify-center items-center w-screen h-screen z-50'>
            <div className="bg-white flex flex-col space-y-2 py-4 px-4 overflow-hidden relative shadow rounded-md w-96">
                <div className="flex flex-row justify-between">
                    <small className="text-base font-newsreader text-cyan-700">{isEdit ? 'Edit' : 'Add'} task</small>
                    <svg onClick={() => onClose()} className="w-6 h-6 cursor-pointer text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </div>

                <Formik
                    initialValues={{
                        title: isEdit ? selectedTask.title : '',
                        description: isEdit ? selectedTask.description : '',
                        dueDate: isEdit ? moment(selectedTask.dueDate).toDate() : '',
                    }}
                    validationSchema={SignupSchema}
                    onSubmit={async (values, { setErrors }) => {
                        let apiCall = null;
                        if (isEdit) {
                            apiCall = await ApiService.put(ApiUrls.task, { ...values, _id: selectedTask._id, dueDate: values.dueDate.toISOString() });
                        } else {
                            apiCall = await ApiService.post(ApiUrls.task, { ...values, dueDate: values.dueDate.toISOString() });
                        }

                        const { data, error } = apiCall;
                        if (data) {
                            toastAction.success('Task added successfully.');
                            onAddEditTask(data, isEdit);
                        } else {
                            if (error && typeof error !== 'string') {
                                setErrors(error);
                            } else {
                                toastAction.error(error || 'Oops !!! something went wrong !!!');
                            }
                        }
                    }}>
                    {({ errors, touched, values, setFieldValue }) => (
                        <Form className="flex flex-col space-y-4">
                            <div>
                                <label htmlFor="email" className="block font-newsreader text-sm font-medium leading-6 text-gray-900">
                                    Title
                                </label>
                                <div className="mt-2">
                                    <Field name="title"
                                        id="title"
                                        className="block font-newsreader w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                    {errors.title && touched.title ? (
                                        <span className="text-red-500 font-newsreader text-xs">{errors.title}</span>
                                    ) : null}
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="description" className="block font-newsreader text-sm font-medium leading-6 text-gray-900">
                                        Description
                                    </label>
                                </div>
                                <div className="mt-2">
                                    <Field component="textarea" rows="4" name="description"
                                        id="description"
                                        className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                    {errors.description && touched.description ? (
                                        <span className="text-red-500 font-newsreader text-xs">{errors.description}</span>
                                    ) : null}
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="description" className="block font-newsreader text-sm font-medium leading-6 text-gray-900">
                                        Due date
                                    </label>
                                </div>
                                <div className="mt-2">
                                    <DatePicker
                                        minDate={new Date()}
                                        selected={values.dueDate}
                                        dateFormat="MMMM d, yyyy"
                                        className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        name="dueDate"
                                        onChange={date => setFieldValue('dueDate', date)}
                                    />
                                    {errors.dueDate && touched.dueDate ? (
                                        <span className="text-red-500 font-newsreader text-xs">{errors.dueDate}</span>
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