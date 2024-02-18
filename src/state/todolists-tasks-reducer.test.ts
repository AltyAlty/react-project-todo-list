import {tasksReducer} from './tasks-reducer';
import {v1} from 'uuid';
import {TasksType, TodolistType} from '../App';
import {addTodolistAC, todolistsReducer} from './todolists-reducer';

test('IDs should be the same', () => {
    const todolistID1 = v1();
    const todolistID2 = v1();
    const todolistID3 = v1();

    const startTodolistsState: Array<TodolistType> = [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'active'},
        {id: todolistID3, title: 'What to sell', filter: 'complete'},
    ];

    const startTasksState: TasksType = {
        [todolistID1]: [
            {id: '1', title: 'HTML&CSS', isDone: true},
            {id: '2', title: 'JS', isDone: false},
            {id: '3', title: 'REACT', isDone: false},
            {id: '4', title: 'REDUX', isDone: false},
        ],

        [todolistID2]: [
            {id: '1', title: 'OK', isDone: true},
            {id: '2', title: 'KEK', isDone: false},
        ],

        [todolistID3]: [
            {id: '1', title: 'NOT_OK', isDone: false},
            {id: '2', title: 'LOL', isDone: true},
        ],
    };

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