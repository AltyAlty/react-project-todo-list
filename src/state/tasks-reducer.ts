import {TasksType} from '../App';
import {v1} from 'uuid';
import {AddTodolistActionType, RemoveTodolistActionType} from './todolists-reducer';

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

export const tasksReducer = (state: StateType, action: ActionType): StateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const stateCopy = {...state};
            stateCopy[action.todolistID] = stateCopy[action.todolistID].filter((t) => t.id !== action.taskID);
            return stateCopy;
        }

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
            let task = stateCopy[action.todolistID].find((t) => t.id === action.taskID);

            if (task) {
                task.title = action.taskTitle
            }

            return stateCopy;
        }

        case 'CHANGE-TASK-STATUS': {
            const stateCopy = {...state};
            stateCopy[action.todolistID].filter((t) => t.id === action.taskID)[0].isDone = action.isDone;
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

        default:
            throw new Error('Bad')
    }
};

export const removeTaskAC = (taskID: string, todolistID: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', taskID, todolistID};
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