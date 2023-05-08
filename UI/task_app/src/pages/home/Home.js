import { useEffect, useState } from "react"
import ApiService, { ApiUrls } from "../../service/ApiService";
import AddTask from "./AddTask";
import moment from 'moment';
import { filter, isEmpty, map, sortBy } from "lodash";
import utils from "../../common/utils";
import TaskDetail from "./TaskDetail";
import Loader from '../../component/Loader';

export default function Home() {
    const [search, setSearch] = useState('');
    const [tasks, setTasks] = useState([]);
    const [isOpenTaskDialog, setIsOpenTaskDialog] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const [isEdit, setIsEdit] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getTasks();
    }, []);

    const getTasks = async () => {
        setIsLoading(true);

        const { data } = await ApiService.get(ApiUrls.task);
        if (data) {
            setTasks(data);
        }

        setIsLoading(false);
    }

    const toggleDialog = () => setIsOpenTaskDialog(!isOpenTaskDialog);

    const onAddEditTask = (task, isEdit = false) => {
        if (isEdit) {
            setSelectedTask(task);
            setTasks(sortBy([...filter(tasks, (t) => t._id !== task._id), task], ['title']));
        } else {
            setTasks([task, ...tasks]);
        }

        toggleDialog();
    }

    const filterTask = (tasks) => {
        if (!isEmpty(search)) {
            return filter(tasks, (task) => task.title.toLocaleLowerCase().includes(search.toLocaleLowerCase().trim()));
        }

        return tasks;
    }

    const onRefresh = (task) => {
        setSelectedTask(task);
        getTasks();
    }

    const onRemoveTask = (id) => {
        setTasks(filter(tasks, (task) => task._id !== id));
        setSelectedTask(null);
    }

    const onAddTask = () => {
        setIsEdit(false);
        toggleDialog();
    }

    const onEditTask = () => {
        setIsEdit(true);
        toggleDialog();
    }

    const getStatus = (task) => {
        if (task?.status === 'Completed') {
            return task?.status;
        }

        if (moment(moment(task.dueDate)).isBefore(new Date())) {
            return 'Overdue';
        }

        return task?.status?.split(/(?=[A-Z])/).join(" ");
    }

    return (
        <div className="flex flex-row bg-white flex-grow">
            <div className="flex flex-col w-96 h-full">
                <div className="flex flex-row justify-between px-3 py-4">
                    <h3 className="text-gray-700 text-xl font-newsreader font-bold">Task(s) {tasks.length}</h3>
                    <svg onClick={() => onAddTask()} className="w-6 h-6 text-gray-700 cursor-pointer" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                </div>

                <div className="flex flex-row my-2 mx-4 justify-between items-center">
                    <input
                        placeholder="Search task"
                        type="text"
                        name="lastName"
                        autoComplete="off"
                        id="lastName"
                        onChange={(e) => setSearch(e.target.value)}
                        className="block w-full mr-6 font-newsreader rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />

                    <svg className="w-6 h-6 cursor-pointer" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
                    </svg>
                </div>

                <div style={{ height: window.screen.height * 0.75 }} className="flex overflow-y-auto flex-col my-3 mx-3">
                    {
                        map(filterTask(tasks), (task, tIndex) => (
                            <div key={tIndex} onClick={() => setSelectedTask(task)} className="flex cursor-pointer space-y-1 flex-col">
                                <div className="flex flex-row justify-between mx-0.5">
                                    <div className="flex flex-row space-x-2">
                                        <input type="checkbox" />
                                        <span className={utils.classNames(
                                            'font-newsreader mt-1 font-medium text-base',
                                            task.status === 'Completed' ? 'line-through' : ''
                                        )}>{task.title}</span>
                                    </div>
                                    <svg className="w-6 h-6 text-gray-700 cursor-pointer" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                    </svg>
                                </div>

                                <div className="flex flex-row space-x-4 items-center my-1">
                                    <div className="flex flex-row items-center space-x-2">
                                        <svg className="w-5 h-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                                        </svg>
                                        <span className="font-newsreader mt-1 font-medium text-sm text-gray-500">{moment(task.dueDate).format('MMMM DD, yyyy')}</span>
                                    </div>

                                    <div className="flex flex-row items-center space-x-2">
                                        <div className={utils.classNames(
                                            'w-4 h-4 rounded shadow',
                                            task.status === 'Completed' ? 'bg-lime-400' : 'bg-red-400'
                                        )} />
                                        <span className="font-newsreader font-medium mt-1 text-sm text-gray-500">{getStatus(task)}</span>
                                    </div>
                                </div>

                                {
                                    tIndex !== (tasks.length - 1)
                                        ? <hr style={{ marginTop: '10px', marginBottom: '10px' }} />
                                        : null
                                }
                            </div>
                        ))
                    }
                </div>
            </div>

            <TaskDetail onEditTask={() => onEditTask()} selectedTask={selectedTask} onRefreshList={(task) => onRefresh(task)} onDeleteSelectedTask={(id) => onRemoveTask(id)} />

            {
                isOpenTaskDialog
                    ? <AddTask selectedTask={selectedTask} isEdit={isEdit} onClose={toggleDialog} onAddEditTask={onAddEditTask} />
                    : null
            }

            {
                isLoading
                    ? <Loader />
                    : null
            }
        </div>
    )
}