import {FilterValuesType, TodolistType} from '../App';
import {v1} from 'uuid';

type StateType = Array<TodolistType>;

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
};

export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    title: string
};

export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
};

export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterValuesType
};

export type ActionType =
    RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType;

export const todolistsReducer = (state: StateType, action: ActionType): StateType => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter((tl) => {
                return tl.id !== action.id;
            });

        case 'ADD-TODOLIST':
            return [...state, {id: v1(), title: action.title, filter: 'all'}];

        case 'CHANGE-TODOLIST-TITLE':
            const todolistToChangeTitle = state.find(
                (tl) => tl.id === action.id
            );

            if (todolistToChangeTitle && action.title !== '') {
                todolistToChangeTitle.title = action.title
            }

            return [...state];

        case 'CHANGE-TODOLIST-FILTER':
            const todolistToChangeFilter = state.find(
                (tl) => tl.id === action.id
            );

            if (todolistToChangeFilter) {
                todolistToChangeFilter.filter = action.filter
            }

            return [...state];

        default:
            throw new Error('Bad')
    }
};

export const RemoveTodolistAC = (id: string): RemoveTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', id};
};

export const AddTodolistAC = (title: string): AddTodolistActionType => {
    return {type: 'ADD-TODOLIST', title};
};

export const ChangeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', id, title};
};

export const ChangeTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', id, filter};
};