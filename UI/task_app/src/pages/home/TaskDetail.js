import moment from 'moment';
import EmptyTask from '../../asset/empty.svg';
import utils from '../../common/utils';
import ApiService, { ApiUrls } from '../../service/ApiService';
import { toastAction } from '../../component/toastify';
import { useState } from 'react';
import ConfirmDialog from '../../component/ConfirmDialog';

export default function TaskDetail({ selectedTask, onRefreshList, onDeleteSelectedTask, onEditTask }) {
    const [isOpenDialog, steIsDialogOpen] = useState(false);

    const changeStatus = async (isCompleted) => {
        const { data } = await ApiService.get(utils.formatString(isCompleted ? ApiUrls.undoneTask : ApiUrls.completeTask, selectedTask?._id));
        if (data) {
            onRefreshList(data);
            toastAction.info(isCompleted ? 'Task is undone' : 'Task is done.');
        } else {
            toastAction.error('Something went wrong. Please login again.');
        }
    }

    const toggleDialog = () => steIsDialogOpen(!isOpenDialog);
    const onDeleteTask = async () => {
        const { data } = await ApiService.deleteCall(utils.formatString(ApiUrls.removeTask, selectedTask?._id));
        if (data) {
            onDeleteSelectedTask(selectedTask?._id);
        } else {
            toastAction.error('Something went wrong. Please login again.');
        }

        toggleDialog();
    }

    const getStatus = (task) => {
        if (task?.status === 'Completed') {
            return task?.status;
        }

        if (moment(task?.dueDate).isBefore(new Date())) {
            return 'Overdue';
        }

        return task?.status?.split(/(?=[A-Z])/).join(" ");
    }

    return (
        <div className="flex flex-col bg-gray-200 rounded-md overflow-hidden flex-grow px-4 py-4 mx-2 my-2">
            {
                selectedTask
                    ? <div className='flex flex-col h-full w-full relative'>
                        <div className='flex flex-row justify-between items-center'>
                            <span className='text-black text-2xl font-newsreader font-medium'>Task Detail</span>

                            {
                                selectedTask?.status !== 'Completed'
                                    ? <svg onClick={() => onEditTask()} className="w-5 h-5 cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z" />
                                    </svg>
                                    : null
                            }
                        </div>

                        <label htmlFor="description" className="block mt-4 font-newsreader text-sm font-medium leading-6 text-gray-900">
                            Title
                        </label>
                        <span className="block w-full mr-6 font-newsreader text-base bg-white rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">{selectedTask.title}</span>

                        <label htmlFor="description" className="block mt-4 font-newsreader text-sm font-medium leading-6 text-gray-900">
                            Description
                        </label>
                        <span className="block w-full h-24 mr-6 font-newsreader text-base bg-white rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">{selectedTask.description}</span>
                        <div className="flex flex-row justify-between mt-4 space-x-4 items-center my-1">
                            <div className="flex flex-row items-center space-x-2">
                                <svg className="w-5 h-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                                </svg>
                                <span className="font-newsreader mt-1 font-medium text-sm text-gray-500">{moment(selectedTask?.dueDate).format('MMMM DD, yyyy')}</span>
                            </div>

                            <div className="flex flex-row items-center space-x-2">
                                <div className={utils.classNames(
                                    'w-4 h-4 rounded shadow',
                                    selectedTask?.status === 'Completed' ? 'bg-lime-400' : 'bg-red-400'
                                )} />
                                <span className="font-newsreader font-medium mt-1 text-sm text-gray-500">{getStatus(selectedTask)}</span>
                            </div>
                        </div>

                        <div className='flex flex-row justify-between w-full absolute bottom-0 items-center'>
                            <span className='font-newsreader animate-pulse'>{selectedTask?.status === 'Completed' ? 'do you want to undone this task?' : 'did you complete this task?'}</span>
                            <div className='flex flex-row space-x-2'>
                                <button
                                    onClick={() => toggleDialog()}
                                    className="flex justify-center w-24 font-newsreader rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Delete
                                </button>
                                <button
                                    onClick={() => changeStatus(selectedTask?.status === 'Completed')}
                                    className="flex justify-center w-24 font-newsreader rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    {selectedTask?.status === 'Completed' ? 'Undone' : 'Completed'}
                                </button>
                            </div>
                        </div>
                    </div>
                    : <div className="w-full h-full flex justify-center items-center">
                        <img className='w-60' alt='Empty' src={EmptyTask} />
                    </div>
            }

            {
                isOpenDialog
                    ? <ConfirmDialog
                        headerText='Delete task?'
                        onCancel={() => toggleDialog()}
                        message='Are you sure to delete this task?'
                        onConfirm={() => onDeleteTask()}
                    />
                    : null
            }
        </div>
    )
}