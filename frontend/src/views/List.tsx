import { useState, useEffect } from 'react';
import { getTaskListByID, addTask, completeTask, deleteTask } from '../api';
import { useParams } from 'react-router-dom';
import TrashCan from '../assets/icons/trash.svg'
import type { List, Task } from '../@types/responses';

function List() {
    const { id } = useParams<{ id: string }>();
    const listId = Number(id);

    const [list, setList] = useState<List>();
    const [error, setError] = useState<string | null>(null);
    const [inputValue, setInputValue] = useState('');

    const fetchTasks = async () => {
        if (!id) {
            setError('List ID is missing.');
            return;
        }

        try {
            const data = await getTaskListByID(listId);

            if ('listId' in data) {
                setList(data);
            } else {
                setError(data.message)
            }
        } catch (e: unknown) {
            if (e instanceof Error) {
                setError(e.message || 'An error occurred while fetching tasks');
            } else {
                setError('An unknown error occurred');
            }
        }
    };

    const addToList = async (listId: number | undefined, title: string) => {
        if (!listId || !title.trim()) {
            setError('List ID or task name is missing.');
            return;
        }
    
        try {
            const updatedList = await addTask(listId, title);
            setInputValue('');
    
            if ('listId' in updatedList) {
                setList(updatedList);
            } else {
                setError(updatedList.message);
            }
        } catch (e: unknown) {
            setError('Failed to add task');
        }
    };
    

    const toggleTaskCompletion = async (taskId: number, currentCompleted: boolean) => {
        try {
            await completeTask(taskId, !currentCompleted);
            const updatedTasks : Task[] = list?.tasks.map(task =>
                task.taskId === taskId ? { ...task, taskCompleted: !currentCompleted } : task
            ) ?? [];

            setList(currentList => currentList ? { ...currentList, tasks: updatedTasks } : currentList);
        } catch (e: unknown) {
            setError('Failed to update task completion');
        }
    };

    const handleDeleteTask = async (taskId: number) => {
        try {
            await deleteTask(taskId, listId);
            fetchTasks();
        } catch (e: unknown) {
            setError('Failed to delete task');
        }
    };

    useEffect(() => {
        fetchTasks();
    }, [listId]);

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <>
            <div className='flex items-center justify-center space-x-7'>
                <div className="bg-yellow-200 rounded p-6">
                    <h1 className='text-left'>{list?.listTitle}</h1>
                    <ul className='mt-1 space-y-3'>
                        {list?.tasks.length ?? 0 > 0 ? (
                            list?.tasks.map((task) => (
                                <li className='flex items-center justify-between text-left font-bold' key={task.taskId}>
                                    <div className='flex items-center mr-3'>
                                        <input
                                            type="checkbox"
                                            checked={task.taskCompleted}
                                            onChange={() => toggleTaskCompletion(task.taskId, task.taskCompleted)}
                                            className='mr-2'
                                        />
                                        <span>{task.taskTitle}</span>
                                    </div>
                                    <img onClick={()=> handleDeleteTask(task.taskId)} src={TrashCan} className="h-5 cursor-pointer" alt="trash" />
                                </li>
                            ))
                        ) : (
                            <p>No tasks available.</p>
                        )}
                    </ul>

                </div>
                <div className='space-y-3'>
                    <h2>Add to the task list:</h2>
                    <input
                        className="p-2 mr-2 rounded"
                        type="text"
                        placeholder="Task"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') addToList(listId, inputValue);
                        }}
                    />
                    <button onClick={() => addToList(listId, inputValue)}>Add Task</button>
                </div>
            </div>
        </>
    );
}

export default List;
