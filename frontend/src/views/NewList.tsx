import router from "../router";
import { useState } from 'react';
import { createList } from '../api';

function NewList() {
    const [error, setError] = useState<string | null>(null);
    const [todoList, setTodoList] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState('');

    const navigateTo = (to: string) => {
        router.navigate(to);
    };

    const addToList = () => {
        if (inputValue.trim() !== '') {
            setTodoList(prevList => [...prevList, inputValue]);

            setInputValue('');
        }
    };

    const saveList = async () => {
        if (todoList.length === 0) {
            setError('Please add at least one task to the list.');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const listTitle = title.trim() || 'My New List';
            await createList(listTitle, todoList);
            navigateTo('/overview');
        } catch (e) {
            console.error(e);
            setError('Failed to create the list. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const mappedList = todoList.map((item, index) => (
        <li key={index}>
            {item}
        </li>
    ));

    return (
        <div className='flex flex-col items-center justify-center space-y-6'>
            <div className="bg-yellow-200 rounded p-6 w-full max-w-md">
                <input
                    className="p-2 border border-gray-300 text-2xl rounded w-full"
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <ul className='mt-2 space-y-3'>
                    {mappedList.length > 0 ? mappedList : <li>No tasks yet.</li>}
                </ul>
            </div>

            <div className='space-y-3'>
                <h2 className="text-lg">Add a new task:</h2>
                <input
                    className="p-2 border border-gray-300 rounded w-full"
                    type="text"
                    placeholder="Clean the house"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') addToList();
                    }}
                />
                <button onClick={addToList} className="bg-blue-500 text-white p-2 rounded">
                    Add
                </button>
            </div>

            <div className="space-x-2">
                <button className="mr-2 bg-green-500 text-white p-2 rounded" onClick={saveList} disabled={loading}>
                    {loading ? 'Saving...' : 'Save task list'}
                </button>
                <button className="bg-red-500 text-white p-2 rounded" onClick={() => navigateTo('/overview')}>
                    Cancel
                </button>
            </div>
            {error && <p className="text-red-500">{error}</p>}
        </div>
    );
}

export default NewList;
