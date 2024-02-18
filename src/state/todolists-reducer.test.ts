import {
    addTodolistAC, changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from './todolists-reducer';
import {v1} from 'uuid';
import {FilterValuesType, TodolistType} from '../App';

test('correct todolist should be removed', () => {
    const todolistID1 = v1();
    const todolistID2 = v1();
    const todolistID3 = v1();

    const startState: Array<TodolistType> = [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'active'},
        {id: todolistID3, title: 'What to sell', filter: 'complete'},
    ];

    const endState = todolistsReducer(startState, removeTodolistAC(todolistID1));
    expect(endState.length).toBe(2);
    expect(endState[0].id).toBe(todolistID2);
});

test('correct todolist should be added', () => {
    const todolistID1 = v1();
    const todolistID2 = v1();
    const todolistID3 = v1();
    const newTodolistTitle = 'New One';

    const startState: Array<TodolistType> = [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'active'},
        {id: todolistID3, title: 'What to sell', filter: 'complete'},
    ];

    const endState = todolistsReducer(startState, addTodolistAC(newTodolistTitle));
    expect(endState.length).toBe(4);
    expect(endState[0].title).toBe(newTodolistTitle);
    expect(endState[0].filter).toBe('all');
});

test('title of correct todolist should be changed', () => {
    const todolistID1 = v1();
    const todolistID2 = v1();
    const todolistID3 = v1();
    const newTodolistTitle = 'New One';

    const startState: Array<TodolistType> = [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'active'},
        {id: todolistID3, title: 'What to sell', filter: 'complete'},
    ];

    const endState = todolistsReducer(startState, changeTodolistTitleAC(todolistID2, newTodolistTitle));
    expect(endState[0].title).toBe('What to learn');
    expect(endState[1].title).toBe(newTodolistTitle);
    expect(endState[2].title).toBe('What to sell');
});

test('filter of correct todolist should be changed', () => {
    const todolistID1 = v1();
    const todolistID2 = v1();
    const todolistID3 = v1();
    const newFilter: FilterValuesType = 'complete';

    const startState: Array<TodolistType> = [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'active'},
        {id: todolistID3, title: 'What to sell', filter: 'complete'},
    ];

    const endState = todolistsReducer(startState, changeTodolistFilterAC(todolistID2, newFilter));
    expect(endState[0].filter).toBe('all');
    expect(endState[1].filter).toBe(newFilter);
    expect(endState[2].filter).toBe('complete');
});