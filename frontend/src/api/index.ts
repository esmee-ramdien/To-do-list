import axios from 'axios';
import { List, Task } from '../@types/responses';
import { handleApiError, processTaskLists } from '../functions/helpers';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

export const createList = async (title: string, tasks: string[]): Promise<{ message: string }> => {
  try {
    const response = await axiosInstance.post<{ message: string }>('/lists/create', { title, tasks }, {
      headers: {
        'Authorization': `${import.meta.env.VITE_AUTH_TOKEN}`
      },
    });

    const { message } = response.data

    return { message };
  } catch (e) {
    return handleApiError(e);
  }
};

export const getAllTasksLists = async (): Promise<List[] | { message: string }> => {
  try {
    const response = await axiosInstance.get<{ tasks: Task[] }>('/lists/all', {
      headers: {
        'Authorization': `${import.meta.env.VITE_AUTH_TOKEN}`
      },
    });
    const { tasks } = response.data;

    const listMap: Record<string, List> = {};

    tasks.forEach(({ listId, listTitle, ...task }) => {
      if (!listMap[listId]) {
        listMap[listId] = {
          listId,
          listTitle,
          tasks: [],
        };
      }
      listMap[listId].tasks.push(task as Task);
    });

    return Object.values(listMap);
  } catch (e) {
    return handleApiError(e);
  }
};

export const getTaskList = async (id: number): Promise<List | { message: string }> => {
  try {
    const response = await axiosInstance.get<{ taskList: Task[] }>(`/lists/${id}`, {
      headers: {
        'Authorization': `${import.meta.env.VITE_AUTH_TOKEN}`
      },
    });
    
    const { taskList } = response.data;

    if (!taskList || taskList.length === 0) {
      throw new Error('No tasks found for this list');
    }

    return processTaskLists(taskList);
  } catch (e) {
    return handleApiError(e);
  }
};

export const addTask = async (id: number, title: string): Promise<List | { message: string }> => {
  try {
    const response = await axiosInstance.post<{ taskList: Task[] }>(`/tasks/${id}/addItem`, {
      title,
    }, {
      headers: {
        'Authorization': `Basic ${import.meta.env.VITE_AUTH_TOKEN}`
      },
    });

    const { taskList } = response.data;

    if (!taskList || taskList.length === 0) {
      throw new Error('No tasks found for this list');
    }

    return processTaskLists(taskList);
  } catch (e) {
    return handleApiError(e);
  }
};

export const completeTask = async (id: number, completed: boolean) => {
  try {
    await axiosInstance.put(`/tasks/${id}/complete`, { completed }, {
      headers: {
        'Authorization': `${import.meta.env.VITE_AUTH_TOKEN}`
      },
    });
  } catch (e) {
    return handleApiError(e);
  }
};

export const deleteTask = async (taskId: number, listId: number): Promise<List | { message: string }> => {
  try {
    const response = await axiosInstance.delete<{ taskList: Task[] }>(`/lists/${listId}/task/${taskId}`, {
      headers: {
        'Authorization': `${import.meta.env.VITE_AUTH_TOKEN}`
      },
    });

    const { taskList } = response.data;

    if (!taskList || taskList.length === 0) {
      throw new Error('No tasks found for this list');
    }

    return processTaskLists(taskList);
  } catch (e) {
    return handleApiError(e);
  }
};
