export interface Task {
    taskId: number,
    listId: number,
    listTitle: string,
    taskTitle: string,
    taskCompleted: boolean
}

export interface List {
    listId: number,
    listTitle: string,
    tasks: Task[]
}