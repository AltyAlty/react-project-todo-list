import {v1} from 'uuid';
import {FilterValuesType, TodolistType} from '../App';
import {
    addTodolistAC, changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from './todolists-reducer';

describe('TodolistsReducer tests', () => {
    const todolistID1 = v1();
    const todolistID2 = v1();
    const todolistID3 = v1();

    const startState: Array<TodolistType> = [
        {id: todolistID1, title: 'TO STUDY', filter: 'all'},
        {id: todolistID2, title: 'TO BUY', filter: 'active'},
        {id: todolistID3, title: 'TO SELL', filter: 'complete'},
    ];

    test('a correct todolist should be removed', () => {
        const endState = todolistsReducer(startState, removeTodolistAC(todolistID1));
        expect(endState.length).toBe(2);
        expect(endState[0].id).toBe(todolistID2);
    });

    test('a correct todolist should be added', () => {
        const newTodolistTitle = 'New One';
        const endState = todolistsReducer(startState, addTodolistAC(newTodolistTitle));
        expect(endState.length).toBe(4);
        expect(endState[0].title).toBe(newTodolistTitle);
        expect(endState[0].filter).toBe('all');
    });

    test('a title of a correct todolist should be changed', () => {
        const newTodolistTitle = 'New One';
        const endState = todolistsReducer(startState, changeTodolistTitleAC(todolistID2, newTodolistTitle));
        expect(endState[0].title).toBe('TO STUDY');
        expect(endState[1].title).toBe(newTodolistTitle);
        expect(endState[2].title).toBe('TO SELL');
    });

    test('a filter of a correct todolist should be changed', () => {
        const newFilter: FilterValuesType = 'complete';
        const endState = todolistsReducer(startState, changeTodolistFilterAC(todolistID2, newFilter));
        expect(endState[0].filter).toBe('all');
        expect(endState[1].filter).toBe(newFilter);
        expect(endState[2].filter).toBe('complete');
    });
});