import {v1} from 'uuid';
import {TasksType} from '../App';
import {
    removeTaskAC, addTaskAC,
    changeTaskTitleAC,
    changeTaskStatusAC,
    tasksReducer
} from './tasks-reducer';
import {addTodolistAC, removeTodolistAC} from './todolists-reducer';

describe('TasksReducer tests', () => {
    const todolistID1 = v1();
    const todolistID2 = v1();
    const todolistID3 = v1();

    const startState: TasksType = {
        [todolistID1]: [
            {id: '1', title: 'HTML&CSS', isDone: true},
            {id: '2', title: 'Javascript', isDone: true},
            {id: '3', title: 'Typescript', isDone: false},
            {id: '4', title: 'React', isDone: false},
            {id: '5', title: 'Redux', isDone: false},
        ],

        [todolistID2]: [
            {id: '1', title: 'GTX 6090', isDone: false},
            {id: '2', title: '8K Monitor', isDone: true},
        ],

        [todolistID3]: [
            {id: '1', title: 'Old PC', isDone: false},
            {id: '2', title: 'Soul', isDone: true},
        ],
    };

    test('a correct task should be removed from a correct array', () => {
        const endState = tasksReducer(startState, removeTaskAC('2', todolistID2));
        expect(endState[todolistID1].length).toBe(5);
        expect(endState[todolistID2].length).toBe(1);
        expect(endState[todolistID3].length).toBe(2);
        /*Метод "every()" проверяет, удовлетворяют ли все элементы массива условию, заданному в переданной функции.*/
        expect(endState[todolistID2].every(t => t.id !== '2')).toBeTruthy();
    });

    test('a correct task should be added to a correct array', () => {
        const newTaskTitle = 'New One';
        const endState = tasksReducer(startState, addTaskAC(newTaskTitle, todolistID3));
        expect(endState[todolistID1].length).toBe(5);
        expect(endState[todolistID2].length).toBe(2);
        expect(endState[todolistID3].length).toBe(3);
        expect(endState[todolistID3][2].id).toBeDefined();
        expect(endState[todolistID3][2].title).toBe(newTaskTitle);
        expect(endState[todolistID3][2].isDone).toBe(false);
    });

    test('a title of a correct task should be changed in a correct array', () => {
        const taskTitle = 'New One';
        const endState = tasksReducer(startState, changeTaskTitleAC('2', todolistID1, taskTitle));
        expect(endState[todolistID1][0].title).toBe('HTML&CSS');
        expect(endState[todolistID1][1].title).toBe(taskTitle);
        expect(endState[todolistID1][2].title).toBe('Typescript');
        expect(endState[todolistID1][3].title).toBe('React');
        expect(endState[todolistID1][4].title).toBe('Redux');
        expect(endState[todolistID2][0].title).toBe('GTX 6090');
        expect(endState[todolistID2][1].title).toBe('8K Monitor');
        expect(endState[todolistID3][0].title).toBe('Old PC');
        expect(endState[todolistID3][1].title).toBe('Soul');
    });

    test('a status of a correct task should be changed in a correct array', () => {
        const taskStatus = true;
        const endState = tasksReducer(startState, changeTaskStatusAC('1', todolistID3, taskStatus));
        expect(endState[todolistID1][0].isDone).toBe(true);
        expect(endState[todolistID1][1].isDone).toBe(true);
        expect(endState[todolistID1][2].isDone).toBe(false);
        expect(endState[todolistID1][3].isDone).toBe(false);
        expect(endState[todolistID1][4].isDone).toBe(false);
        expect(endState[todolistID2][0].isDone).toBe(false);
        expect(endState[todolistID2][1].isDone).toBe(true);
        expect(endState[todolistID3][0].isDone).toBe(taskStatus);
        expect(endState[todolistID3][1].isDone).toBe(true);
    });

    test('a new array of tasks should be added when a new todolist is added', () => {
        const newTodolistTitle = 'New One';
        const endState = tasksReducer(startState, addTodolistAC(newTodolistTitle));
        const newKey = Object.keys(endState)
            .find(k => k !== todolistID1 && k !== todolistID2 && k !== todolistID3);

        if (!newKey) throw Error('new key has not been created');
        expect(Object.keys(endState).length).toBe(4);
        expect(endState[newKey]).toEqual([]);
    });

    test('tasks should be deleted when a todolist is deleted', () => {
        const endState = tasksReducer(startState, removeTodolistAC(todolistID2));
        expect(Object.keys(endState).length).toBe(2);
        expect(endState[todolistID2]).toBeUndefined();
    });
});