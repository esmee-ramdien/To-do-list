import sqlite3 from 'sqlite3';

interface TaskList {
    id: number;
    title: string;
    completed: number;
}

interface Task {
    id: number;
    listId: number;
    title: string;
    completed: number;
}

const db = new sqlite3.Database('./database.sqlite', (err) => {
    if (err) {
        console.error('Error connecting to DB:', err.message);
    } else {
        console.log('Successfully connected to DB.');
    }
});

const createTables = () => {
    db.run(`CREATE TABLE IF NOT EXISTS lists (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        completed INTEGER DEFAULT 0
    )`, (err) => {
        if (err) {
            console.error('Error creating lists table:', err.message);
        } else {
            console.log('Successfully created table for lists.');
        }
    });

    db.run(`CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        listId INTEGER NOT NULL,
        title TEXT NOT NULL,
        completed INTEGER DEFAULT 0,
        FOREIGN KEY (listId) REFERENCES lists(id)
    )`, (err) => {
        if (err) {
            console.error('Error creating tasks table:', err.message);
        } else {
            console.log('Successfully created table for tasks.');
        }
    });
};



const closeDB = () => {
    db.close((err) => {
        if (err) {
            console.error('DB was not closed', err.message);
        } else {
            console.log('DB closed successfully.');
        }
    });
};

