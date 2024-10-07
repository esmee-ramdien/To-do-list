import { List, Task } from '../@types/responses';

export const processTaskLists = (taskList: Task[]): List => {
    const { listId, listTitle } = taskList[0];

    return {
        listId,
        listTitle,
        tasks: taskList.map(task => ({
            taskId: task.taskId,
            taskTitle: task.taskTitle,
            taskCompleted: !!task.taskCompleted,
        })),
    };
};

export const handleApiError = (e: unknown) => {
    console.error('API Error:', e);
    return {
        message: `An error occurred: ${e instanceof Error ? e.message : e}`,
    };
};
