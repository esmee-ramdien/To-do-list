import express from 'express';
import { insertTask, getTaskListByID, completeTask } from '../database/queries';

const router = express.Router();

router.post('/:listId/addItem', async (req, res) => {
    const { listId } = req.params;
    const { title } = req.body;

    try {
        const post = await insertTask(Number(listId), title);

        if (post) {
            const taskList = await getTaskListByID(Number(listId));
            res.status(200).json({ taskList });
        } else {
            res.status(404).json({ message: "No lists found." });
        }
    } catch (error: unknown) {
        res.status(500).json({
            message: "Error occurred while adding the task.",
        });
    }
});

router.put('/:taskId/complete', async (req, res) => {
    const { taskId } = req.params;
    const { completed } = req.body;

    try {
        await completeTask(Number(taskId), completed);

        res.status(200).json({ message: 'Task update completed' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating task' });
    }
});

export default router;