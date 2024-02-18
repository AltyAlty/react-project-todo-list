import {FilterValuesType, TodolistType} from '../App';
import {v1} from 'uuid';

type StateType = Array<TodolistType>;

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    todolistID: string
};

export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    todolistTitle: string
    todolistID: string
};

export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    todolistID: string
    todolistTitle: string
};

export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    todolistID: string
    todolistFilter: FilterValuesType
};

export type ActionType =
    RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType;

export let todolistID1 = v1();
export let todolistID2 = v1();
export let todolistID3 = v1();

/*Для Redux нужно задавать изначальный state, так как при запуске приложения в редьюсер приходит специальный
action-объект, который попадает в default, что означает, что вернется state. Но изначально state равен undefined,
поэтому нужно указать, чтобы при undefined state изначально был валидным.*/
const initialState: StateType = [
    {id: todolistID1, title: 'What to learn', filter: 'all'},
    {id: todolistID2, title: 'What to buy', filter: 'active'},
    {id: todolistID3, title: 'What to sell', filter: 'complete'},
];

export const todolistsReducer = (state: StateType = initialState, action: ActionType): StateType => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter((tl) => {
                return tl.id !== action.todolistID;
            });
        }

        case 'ADD-TODOLIST': {
            return [{id: action.todolistID, title: action.todolistTitle, filter: 'all'}, ...state];
        }

        case 'CHANGE-TODOLIST-TITLE': {
            const todolistToChangeTitle = state.find(
                (tl) => tl.id === action.todolistID
            );

            if (todolistToChangeTitle && action.todolistTitle !== '') {
                todolistToChangeTitle.title = action.todolistTitle
            }

            return [...state];
        }

        case 'CHANGE-TODOLIST-FILTER': {
            const todolistToChangeFilter = state.find(
                (tl) => tl.id === action.todolistID
            );

            if (todolistToChangeFilter) {
                todolistToChangeFilter.filter = action.todolistFilter
            }

            return [...state];
        }

        default:
            // throw new Error('Bad type');
            return state; // Для Redux нужно возвращать неизменный state.
    }
};

export const removeTodolistAC = (todolistID: string): RemoveTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', todolistID};
};

export const addTodolistAC = (todolistTitle: string): AddTodolistActionType => {
    return {type: 'ADD-TODOLIST', todolistTitle, todolistID: v1()};
};

export const changeTodolistTitleAC = (todolistID: string, todolistTitle: string): ChangeTodolistTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', todolistID, todolistTitle};
};

export const changeTodolistFilterAC = (todolistID: string, todolistFilter: FilterValuesType): ChangeTodolistFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', todolistID, todolistFilter};
};