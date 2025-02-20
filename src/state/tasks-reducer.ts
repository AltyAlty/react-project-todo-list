import {v1} from 'uuid';
import {TasksType} from '../App';
import {
    AddTodolistActionType,
    RemoveTodolistActionType,
    todolistID1,
    todolistID2,
    todolistID3
} from './todolists-reducer';

type StateType = TasksType;

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    taskID: string
    todolistID: string
};

export type AddTaskActionType = {
    type: 'ADD-TASK'
    taskTitle: string
    todolistID: string
};

export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    taskID: string
    todolistID: string
    taskTitle: string
};

export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    taskID: string
    todolistID: string
    isDone: boolean
};

export type ActionType =
    RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskTitleActionType
    | ChangeTaskStatusActionType
    | AddTodolistActionType
    | RemoveTodolistActionType;

const initialState: StateType = {
    [todolistID1]: [
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'Javascript', isDone: true},
        {id: v1(), title: 'Typescript', isDone: false},
        {id: v1(), title: 'React', isDone: false},
        {id: v1(), title: 'Redux', isDone: false},
    ],

    [todolistID2]: [
        {id: v1(), title: 'GTX 6090', isDone: false},
        {id: v1(), title: '8K Monitor', isDone: true},
    ],

    [todolistID3]: [
        {id: v1(), title: 'Old PC', isDone: false},
        {id: v1(), title: 'Soul', isDone: true},
    ],
};

export const tasksReducer = (state: StateType = initialState, action: ActionType): StateType => {
    switch (action.type) {
        case 'ADD-TASK': {
            const stateCopy = {...state};

            stateCopy[action.todolistID] = [...stateCopy[action.todolistID], {
                id: v1(),
                title: action.taskTitle,
                isDone: false
            }];

            return stateCopy;
        }

        case 'CHANGE-TASK-TITLE': {
            const stateCopy = {...state};

            /*Это вариант не работает, так как мы не делаем копию каждой "коробки", имеющих внутри данные, которые мы
            хотим поменять.*/
            // let task = stateCopy[action.todolistID].find((t) => t.id === action.taskID);
            stateCopy[action.todolistID] = stateCopy[action.todolistID].map(
                (t) => t.id === action.taskID ? {...t, title: action.taskTitle} : t
            );

            // if (task) task.title = action.taskTitle;
            return stateCopy;
        }

        case 'CHANGE-TASK-STATUS': {
            const stateCopy = {...state};

            /*Это вариант не работает, так как мы не делаем копию каждой "коробки", имеющих внутри данные, которые мы
            хотим поменять.*/
            // stateCopy[action.todolistID].filter((t) => t.id === action.taskID)[0].isDone = action.isDone;
            stateCopy[action.todolistID] = stateCopy[action.todolistID].map(
                (t) => t.id === action.taskID ? {...t, isDone: action.isDone} : t
            );

            return stateCopy;
        }

        case 'REMOVE-TASK': {
            const stateCopy = {...state};
            stateCopy[action.todolistID] = stateCopy[action.todolistID].filter((t) => t.id !== action.taskID);
            return stateCopy;
        }

        case 'ADD-TODOLIST': {
            return {...state, [action.todolistID]: []};
        }

        case 'REMOVE-TODOLIST': {
            const stateCopy = {...state};
            delete stateCopy[action.todolistID];
            return stateCopy;
        }

        default: {
            // throw new Error('Bad action type');
            return state; // Для Redux нужно возвращать неизмененный state.
        }
    }
};

export const addTaskAC = (taskTitle: string, todolistID: string): AddTaskActionType => {
    return {type: 'ADD-TASK', taskTitle, todolistID};
};

export const changeTaskTitleAC = (taskID: string, todolistID: string, taskTitle: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', taskID, todolistID, taskTitle};
};

export const changeTaskStatusAC = (taskID: string, todolistID: string, isDone: boolean): ChangeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', taskID, todolistID, isDone};
};

export const removeTaskAC = (taskID: string, todolistID: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', taskID, todolistID};
};