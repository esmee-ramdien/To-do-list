import { useState, useEffect } from 'react';
import { getAllTasksLists } from '../api';
import { List } from '../@types/responses';
import { Link } from 'react-router-dom';

function Dashboard() {
    const [lists, setLists] = useState<List[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        const fetchLists = async () => {
            try {
                const data = await getAllTasksLists();
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
        <div className='flex flex-col items-start justify-start p-6 space-y-7'>
            <h2 className='text-left text-3xl font-bold'>Overview</h2>

            <div className="grid grid-cols-4 gap-6">
                {lists.length > 0 ? (
                    lists.map((list) => (
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
                    ))
                ) : (
                    <p className='text-left'>No lists.</p>
                )}
            </div>
        </div>
    );
}

export default Dashboard;
