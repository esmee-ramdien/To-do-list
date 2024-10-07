import { runQuery, getAllQuery } from '../functions/helpers';
import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('./database/database.sqlite', (err: Error | null) => {
    if (err) {
        console.error('Error connecting to DB:', err.message);
    } else {
        console.log('Successfully connected to DB.');
    }
});

export const createTables = async () => {
    try {
        await runQuery(`CREATE TABLE IF NOT EXISTS lists (
            id INTEGER PRIMARY KEY,
            title TEXT NOT NULL
        )`);

        console.log('Successfully created table for lists.');

        await runQuery(`CREATE TABLE IF NOT EXISTS tasks (
            id INTEGER PRIMARY KEY,
            title TEXT NOT NULL,
            completed INTEGER DEFAULT 0,
            listId INTEGER NOT NULL,
            FOREIGN KEY(listId) REFERENCES lists(id) ON DELETE CASCADE
        )`);

        console.log('Successfully created table for tasks.');
    } catch (err: unknown) {
        console.error('Error creating tables:', err instanceof Error ? err.message : 'Unknown error occurred');
    }
};

export const insertTaskList = async (title: string): Promise<number> => {
    return new Promise<number>((resolve, reject) => {
        db.run(`INSERT INTO lists (title) VALUES (@title)`, [title], function (err: unknown) {
            if (err) {
                console.error('List could not be added:', err instanceof Error ? err.message : 'Unknown error occurred');
                reject(err instanceof Error ? err : new Error('Unknown error occurred'));
            } else {
                console.log('Successfully added task list:', title);
                resolve(this.lastID);
            }
        });
    });
};

export const insertTask = async (listId: string, title: string): Promise<boolean> => {
    try {
        await runQuery(`INSERT INTO tasks (listId, title) VALUES (@listId, @title)`, [Number(listId), title]);
        console.log('Successfully added task:', title, 'to list ID:', listId);
        return true;
    } catch (err: unknown) {
        console.error('Task could not be added:', err instanceof Error ? err.message : 'Unknown error occurred');
        return false;
    }
};

export const getAllTaksLists = async () => {
    const query = `
        SELECT lists.id AS listId, lists.title AS listTitle,
               tasks.id AS taskId, tasks.title AS taskTitle, tasks.completed AS taskCompleted
        FROM lists
        LEFT JOIN tasks ON lists.id = tasks.listId
        ORDER BY lists.id, tasks.id;
    `;

    try {
        const rows = await getAllQuery(query);
        if (rows.length === 0) {
            console.log('No task lists or tasks found.');
        } else {
            console.log('All tasks retrieved');
        }
        return rows;
    } catch (err: unknown) {
        console.error('Error retrieving task lists:', err instanceof Error ? err.message : 'Unknown error occurred');
    }
};

export const completeTask = async (taskId: number, completed: number) => {
    const query = `
        UPDATE tasks 
        SET completed = ? 
        WHERE id = ?;
    `;

    try {
        const result = await runQuery(query, [completed ? 1 : 0, taskId]);
        console.log(`Successfully updated task ID: ${taskId} to completed: ${completed}`);
        return result;
    } catch (err: unknown) {
        console.error('Error updating task completion status:', err instanceof Error ? err.message : 'Unknown error occurred');
        throw err;
    }
};


export const getTaskList = async (id: number) => {
    const query = `
        SELECT lists.id AS listId, lists.title AS listTitle,
               tasks.id AS taskId, tasks.title AS taskTitle, tasks.completed AS taskCompleted
        FROM lists
        LEFT JOIN tasks ON lists.id = tasks.listId
        WHERE lists.id = (@id)
        ORDER BY tasks.id;
    `;

    try {
        const rows = await getAllQuery(query, [id]);
        if (rows.length === 0) {
            console.log(`No tasks found for list ID: ${id}`);
        } else {
            console.log('Tasks retrieved for list ID:', id);
        }
        return rows;
    } catch (err: unknown) {
        console.error('Error retrieving tasks for the list:', err instanceof Error ? err.message : 'Unknown error occurred');
        throw err;
    }
};

export const deleteTask = async (id: number) => {
    const query = `
        DELETE FROM tasks 
        WHERE tasks.id = @id;
    `;

    try {
        const result = await runQuery(query, [id]);
        console.log(`Successfully deleted task ID: ${id}`);
        return result;
    } catch (err: unknown) {
        console.error('Error deleting task', err instanceof Error ? err.message : 'Unknown error occurred');
        throw err;
    }
}

export const closeDB = () => {
    db.close((err: unknown) => {
        if (err) {
            console.error('DB was not closed:', err instanceof Error ? err.message : 'Unknown error occurred');
        } else {
            console.log('DB closed successfully.');
        }
    });
};


export default db