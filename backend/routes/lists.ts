import express from 'express';
import { getAllTaskLists, getTaskListByID, insertTask, insertTaskList, deleteTask } from '../database/queries';

const router = express.Router();

router.post('/create', async (req, res) => {
    try {
        const { title, tasks } = req.body

        const listId = await insertTaskList(title)

        for (const task of tasks) {
            await insertTask(listId, task)
        }

        if (listId) {
            res.status(200).json({ message: 'List created' });
        } else {
            res.status(404).json({ message: "No list found." });
        }
    } catch (error: unknown) {
        res.status(500).json({
            message: "Error occurred while creating the list."
        });
    }
});

router.get('/all', async (req, res) => {
    try {
        const tasks = await getAllTaskLists();

        if (tasks) {
            res.status(200).json({ tasks });
        } else {
            res.status(404).json({ message: "No lists found." });
        }
    } catch (error: unknown) {
        res.status(500).json({
            message: "Error occurred while fetching the lists."
        });
    }
});

router.get('/:id', async (req, res) => {
    const id = req.params.id

    try {
        const taskList = await getTaskListByID(Number(id));

        if (taskList) {
            res.status(200).json({ taskList });
        } else {
            res.status(404).json({ message: "No lists found." });
        }
    } catch (error: unknown) {
        res.status(500).json({
            message: "Error occurred while fetching the lists."
        });
    }
});

router.delete('/:listId/task/:taskId', async (req, res) => {
    const { taskId, listId } = req.params;

    try {
        await deleteTask(Number(taskId));

        const taskList = await getTaskListByID(Number(listId));
        res.status(200).json({ taskList });

    } catch (error) {
        res.status(500).json({ message: 'Error updating task' });
    }
}
)

export default router;
