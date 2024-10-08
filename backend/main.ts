import express from 'express';
import listsRouter from './routes/lists';
import tasksRouter from './routes/tasks'
import cors from 'cors';
import 'dotenv/config'
import { createTables } from './database/queries';
import expressBasicAuth from 'express-basic-auth';


const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json())
app.use(expressBasicAuth({
    users:
        { [process.env.AUTH_USERNAME ?? '']: process.env.AUTH_PW ?? '' }
}))

createTables()

app.use('/lists', listsRouter);
app.use('/tasks', tasksRouter);

app.listen(PORT, () => {
    console.log(`API is online on http://localhost:${PORT}`);
});

