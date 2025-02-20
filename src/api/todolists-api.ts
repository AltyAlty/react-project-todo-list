import axios from 'axios';

const settings = {
    /*Включаем использование cookies.*/
    withCredentials: true,
    /*Указываем обязательный ключ доступа и токен.*/
    headers: {
        'api-key': '',
        'Authorization': 'Bearer '
    }
};

const instance = axios.create({
    baseURL: `https://social-network.samuraijs.com/api/1.1/`,
    ...settings
})

export type TodolistAPIType = {
    id: string,
    title: string,
    addedDate: string,
    order: number
};

type ResponseType<D = {}> = {
    resultCode: number,
    messages: Array<string>,
    data: D
};

type CreateTodolistResponseDataType = { item: TodolistAPIType };

export type TaskAPIType = {
    description: string,
    title: string,
    completed: boolean,
    status: number,
    priority: number,
    startDate: string,
    deadline: string,
    id: string,
    todoListId: string,
    order: number,
    addedDate: string
};

export type UpdateTaskAPIModelType = {
    title: string,
    description: string,
    completed: boolean,
    status: number,
    priority: number,
    startDate: string,
    deadline: string,
};

type GetTasksResponseType = {
    error: string | null,
    totalCount: number,
    items: Array<TaskAPIType>
};

export const todolistsAPI = {
    getTodolists() {
        return instance.get<Array<TodolistAPIType>>(`todo-lists`);
    },

    createTodolist(todolistTitle: string) {
        return instance.post<ResponseType<CreateTodolistResponseDataType>>(`todo-lists`, {title: todolistTitle});
    },

    deleteTodolist(todolistID: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistID}`);
    },

    updateTodolist(todolistID: string, todolistTitle: string) {
        return instance.put<ResponseType>(`todo-lists/${todolistID}`, {title: todolistTitle});
    },

    getTasks(todolistID: string) {
        return instance.get<GetTasksResponseType>(`todo-lists/${todolistID}/tasks`);
    },

    createTask(todolistID: string, taskTitle: string) {
        return instance.post<ResponseType<{ item: TaskAPIType }>>(`todo-lists/${todolistID}/tasks`, {title: taskTitle});
    },

    deleteTask(todolistID: string, taskID: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistID}/tasks/${taskID}`);
    },

    updateTask(todolistID: string, taskID: string, taskModel: UpdateTaskAPIModelType) {
        return instance.put<ResponseType<{ item: TaskAPIType }>>(`todo-lists/${todolistID}/tasks/${taskID}`, taskModel);
    }
};