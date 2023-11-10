import {
    removeTaskAC, addTaskAC,
    changeTaskTitleAC,
    changeTaskStatusAC,
    tasksReducer
} from './tasks-reducer';
import {v1} from 'uuid';
import {TasksType} from '../App';
import {addTodolistAC, removeTodolistAC} from './todolists-reducer';

test('correct task should be removed from correct array', () => {
    const todolistID1 = v1();
    const todolistID2 = v1();
    const todolistID3 = v1();

    const startState: TasksType = {
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

    const endState = tasksReducer(startState, removeTaskAC('2', todolistID2));
    expect(endState[todolistID1].length).toBe(4);
    expect(endState[todolistID2].length).toBe(1);
    expect(endState[todolistID3].length).toBe(2);
    /*Метод "every()" проверяет, удовлетворяют ли все элементы массива условию, заданному в передаваемой функции.*/
    expect(endState[todolistID2].every(t => t.id !== '2')).toBeTruthy();
});

test('correct task should be added to correct array', () => {
    const todolistID1 = v1();
    const todolistID2 = v1();
    const todolistID3 = v1();

    const startState: TasksType = {
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

    const newTaskTitle = 'New One';

    const endState = tasksReducer(startState, addTaskAC(newTaskTitle, todolistID3));
    expect(endState[todolistID1].length).toBe(4);
    expect(endState[todolistID2].length).toBe(2);
    expect(endState[todolistID3].length).toBe(3);
    expect(endState[todolistID3][2].id).toBeDefined();
    expect(endState[todolistID3][2].title).toBe(newTaskTitle);
    expect(endState[todolistID3][2].isDone).toBe(false);
});

test('title of correct task should be changed in correct array', () => {
    const todolistID1 = v1();
    const todolistID2 = v1();
    const todolistID3 = v1();

    const startState: TasksType = {
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

    const taskTitle = 'New One';

    const endState = tasksReducer(startState, changeTaskTitleAC('2', todolistID1, taskTitle));
    expect(endState[todolistID1][0].title).toBe('HTML&CSS');
    expect(endState[todolistID1][1].title).toBe(taskTitle);
    expect(endState[todolistID1][2].title).toBe('REACT');
    expect(endState[todolistID1][3].title).toBe('REDUX');
    expect(endState[todolistID2][0].title).toBe('OK');
    expect(endState[todolistID2][1].title).toBe('KEK');
    expect(endState[todolistID3][0].title).toBe('NOT_OK');
    expect(endState[todolistID3][1].title).toBe('LOL');
});

test('status of correct task should be changed in correct array', () => {
    const todolistID1 = v1();
    const todolistID2 = v1();
    const todolistID3 = v1();

    const startState: TasksType = {
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

    const taskStatus = true;

    const endState = tasksReducer(startState, changeTaskStatusAC('1', todolistID3, taskStatus));
    expect(endState[todolistID1][0].isDone).toBe(true);
    expect(endState[todolistID1][1].isDone).toBe(false);
    expect(endState[todolistID1][2].isDone).toBe(false);
    expect(endState[todolistID1][3].isDone).toBe(false);
    expect(endState[todolistID2][0].isDone).toBe(true);
    expect(endState[todolistID2][1].isDone).toBe(false);
    expect(endState[todolistID3][0].isDone).toBe(taskStatus);
    expect(endState[todolistID3][1].isDone).toBe(true);
});

test('new array of tasks should be added when new todolist is added', () => {
    const todolistID1 = v1();
    const todolistID2 = v1();
    const todolistID3 = v1();

    const startState: TasksType = {
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

    const endState = tasksReducer(startState, addTodolistAC(newTodolistTitle));
    const newKey = Object.keys(endState)
        .find(k => k !== todolistID1 && k !== todolistID2 && k !== todolistID3);

    if (!newKey) {
        throw Error('new key was not created');
    }

    expect(Object.keys(endState).length).toBe(4);
    expect(endState[newKey]).toEqual([]);
});

test('tasks should be deleted when todolist is deleted', () => {
    const todolistID1 = v1();
    const todolistID2 = v1();
    const todolistID3 = v1();

    const startState: TasksType = {
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

    const endState = tasksReducer(startState, removeTodolistAC(todolistID2));
    expect(Object.keys(endState).length).toBe(2);
    expect(endState[todolistID2]).toBeUndefined();
});