import express from 'express';
import { insertTask, getTaskList, completeTask } from '../database/queries';

const router = express.Router();

router.post('/:id/addItem', async (req, res) => {
    const { id } = req.params;
    const { title } = req.body;

    try {
        const post = await insertTask(id, title);

        if (post) {
            const taskList = await getTaskList(Number(id));
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

router.put('/:id/complete', async (req, res) => {
    const { id } = req.params;
    const { completed } = req.body;

    try {
        await completeTask(Number(id), completed);

        res.status(200).json({ message: 'Task update completed' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating task' });
    }
});

export default router;