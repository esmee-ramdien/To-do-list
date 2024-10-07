import express from 'express';
import listsRouter from './routes/lists';
import tasksRouter from './routes/tasks'
import cors from 'cors';
import { createTables } from './database/queries';


createTables()

const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json({ limit: '5mb' }));
app.use('/lists', listsRouter);
app.use('/tasks', tasksRouter);

app.listen(PORT, () => {
    console.log(`API is online on http://localhost:${PORT}`);
});

