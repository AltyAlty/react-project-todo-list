import {v1} from 'uuid';
import {TasksType, TodolistType} from '../App';
import {addTodolistAC, todolistsReducer} from './todolists-reducer';
import {tasksReducer} from './tasks-reducer';

describe('TodolistsTasksReducer tests', () => {
    const todolistID1 = v1();
    const todolistID2 = v1();
    const todolistID3 = v1();

    const startTodolistsState: Array<TodolistType> = [
        {id: todolistID1, title: 'TO STUDY', filter: 'all'},
        {id: todolistID2, title: 'TO BUY', filter: 'active'},
        {id: todolistID3, title: 'TO SELL', filter: 'complete'},
    ];

    const startTasksState: TasksType = {
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

    test('IDs should be the same', () => {
        const newTodolistTitle = 'New One';
        const action = addTodolistAC(newTodolistTitle);
        const endTodolistsState = todolistsReducer(startTodolistsState, action);
        const endTasksState = tasksReducer(startTasksState, action);
        const keys = Object.keys(endTasksState);
        const IDFromTodolists = endTodolistsState[0].id;
        const IDFromTasks = keys[keys.length - 1];
        expect(IDFromTodolists).toBe(IDFromTasks);
        expect(IDFromTasks).toBe(IDFromTodolists);
    });
});