import { useState, useEffect } from 'react';
import { getAllTaskLists } from '../api';
import { List } from '../@types/responses';
import { Link } from 'react-router-dom';
import { navigateTo } from "../router";
import Plus from '../assets/icons/plus.svg'


function Dashboard() {
    const [lists, setLists] = useState<List[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLists = async () => {
            try {
                const data = await getAllTaskLists();

                setLists(data);
            } catch (e: unknown) {
                setError(e instanceof Error ? e.message : 'An error occurred while fetching lists');
            } finally {
                setLoading(false);
            }
        };

        fetchLists();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className='flex flex-col items-center p-6 h-screen mt-4'>
            <h2 className='text-left text-3xl font-bold'>Overview</h2>

            {lists.length > 0 ? (
                lists.map((list) => (
                    <div className="grid grid-cols-4 gap-6">

                        <div key={list.listId} className='bg-yellow-200 rounded p-4 shadow-md'>
                            <Link to={`/list/${list.listId}`} className='text-xl text-left font-bold hover:underline'>
                                {list.listTitle}
                            </Link>
                            <ul className='mt-2'>
                                {list.tasks.length > 0 ? (
                                    list.tasks.map(task => (
                                        <li key={task.taskId} className='flex items-center'>
                                            <span className='mr-2'>{task.taskCompleted ? '✅' : '⏳'}</span>
                                            {task.taskTitle}
                                        </li>
                                    ))
                                ) : (
                                    <li className='text-gray-500'>No tasks</li>
                                )}
                            </ul>
                        </div>
                    </div>

                ))
            ) : (
                <div className="flex justify-center items-center h-screen">
                    <button
                        onClick={() => navigateTo('/new-list')}
                        className="flex flex-row items-center"
                    >
                        New list
                        <img src={Plus} className="h-4 ml-2 cursor-pointer" alt="plus-icon" />
                    </button>
                </div>

            )}
        </div>
    );
}

export default Dashboard;
