import {v1} from 'uuid';
import {FilterValuesType, TodolistType} from '../App';

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

export const todolistID1 = v1();
export const todolistID2 = v1();
export const todolistID3 = v1();

/*Для Redux нужно задавать изначальный state, так как при запуске приложения в редьюсер приходит специальный
action-объект, который попадает в default, что означает, что вернется изначальный state. Но изначально state равен
undefined, поэтому нужно указать, чтобы при undefined state изначально был валидным.*/
const initialState: StateType = [
    {id: todolistID1, title: 'TO STUDY', filter: 'all'},
    {id: todolistID2, title: 'TO BUY', filter: 'active'},
    {id: todolistID3, title: 'TO SELL', filter: 'complete'},
];

export const todolistsReducer = (state: StateType = initialState, action: ActionType): StateType => {
    switch (action.type) {
        case 'ADD-TODOLIST': {
            return [{id: action.todolistID, title: action.todolistTitle, filter: 'all'}, ...state];
        }

        case 'CHANGE-TODOLIST-TITLE': {
            const todolistToChangeTitle = state.find(
                (tl) => tl.id === action.todolistID
            );

            if (todolistToChangeTitle && action.todolistTitle !== '') todolistToChangeTitle.title = action.todolistTitle;
            return [...state];
        }

        case 'CHANGE-TODOLIST-FILTER': {
            const todolistToChangeFilter = state.find(
                (tl) => tl.id === action.todolistID
            );

            if (todolistToChangeFilter) todolistToChangeFilter.filter = action.todolistFilter;
            return [...state];
        }

        case 'REMOVE-TODOLIST': {
            return state.filter(
                (tl) => tl.id !== action.todolistID
            );
        }

        default: {
            // throw new Error('Bad action type');
            return state; // Для Redux нужно возвращать неизмененный state.
        }
    }
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

export const removeTodolistAC = (todolistID: string): RemoveTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', todolistID};
};