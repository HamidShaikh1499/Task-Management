import moment from "moment";
import { useState } from "react";
import { useSelector } from "react-redux"
import EditAccount from "./EditAccount";

export default function Profile() {
    const { user } = useSelector((state) => state.user);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const toggleDialog = () => setIsDialogOpen(!isDialogOpen);

    return (
        <div className="flex flex-col flex-grow bg-gray-200 items-center justify-center">
            <div className="flex px-2 py-2 flex-col w-96 bg-white shadow-md rounded-md">
                <div className="flex flex-row items-center space-x-2">
                    <svg className="w-6 h-6 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-gray-700 font-newsreader text-lg font-bold mt-1">PROFILE</span>
                </div>

                <label htmlFor="description" className="block mt-4 font-newsreader text-sm font-medium leading-6 text-gray-900">
                    Name
                </label>
                <span className="block w-full mr-6 font-newsreader text-base bg-white rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                    {user?.firstName} {user?.lastName}
                </span>

                <label htmlFor="description" className="block mt-4 font-newsreader text-sm font-medium leading-6 text-gray-900">
                    Email
                </label>
                <span className="block w-full mr-6 font-newsreader text-base bg-white rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                    {user?.email}
                </span>

                <label htmlFor="description" className="block mt-4 font-newsreader text-sm font-medium leading-6 text-gray-900">
                    Account created date
                </label>
                <span className="block w-full mr-6 font-newsreader text-base bg-white rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                    {moment(user?.createdAt).format('MMMM DD, yyyy')}
                </span>

                <button
                    onClick={() => toggleDialog()}
                    className="flex w-full justify-center my-4 font-newsreader rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Edit
                </button>
            </div>

            {
                isDialogOpen
                    ? <EditAccount onClose={() => toggleDialog()} />
                    : null
            }
        </div>
    )
}