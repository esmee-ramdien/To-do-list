import { useState } from 'react';

function List() {
    const [todoList, setTodoList] = useState([
        'Was ophangen',
        'Kleren vouwen'
    ]);

    const [inputValue, setInputValue] = useState('');

    const addToList = () => {
        if (inputValue.trim() !== '') {
            setTodoList([...todoList, inputValue]);
            setInputValue('');
        }
    };

    const mappedList = todoList.map((item, index) => (
        <li key={index}>
            {item}
        </li>
    ));

    return (
        <>
            <div className='flex items-center justify-center space-x-7'>
                <div className="bg-yellow-200 rounded p-6">
                    <h1>Title</h1>
                    <ul className='mt-1 space-y-3'>
                        {mappedList}
                    </ul>
                </div>
                <div className='space-y-3'>
                    <h2>Voeg toe aan de takenlijst:</h2>
                    <input
                        className="p-2 mr-2 rounded"
                        type="text"
                        placeholder="Taak"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') addToList();
                        }}
                    />
                    <button>
                        Voeg toe
                    </button>
                </div>
            </div>
        </>
    );
}

export default List;
