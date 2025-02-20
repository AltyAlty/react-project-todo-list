import React, {useState} from 'react';
import './App.css'; // Не используется из-за использования Material UI.
import {v1} from 'uuid';
import {TaskType, Todolist} from './components/Todolist/Todolist';
import {AddItemForm} from './components/AddItemForm/AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@mui/material';
import {Menu} from '@mui/icons-material';

export type FilterValuesType = 'all' | 'active' | 'complete';

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
};

export type TasksType = { [key: string]: Array<TaskType> };

const App = () => {
    const todolistID1 = v1();
    const todolistID2 = v1();
    const todolistID3 = v1();

    const initialTodolistsState: Array<TodolistType> = [
        {id: todolistID1, title: 'TO STUDY', filter: 'all'},
        {id: todolistID2, title: 'TO BUY', filter: 'active'},
        {id: todolistID3, title: 'TO SELL', filter: 'complete'},
    ];

    const initialTasksState: TasksType = {
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

    let [todolists, setTodolists] = useState<Array<TodolistType>>(initialTodolistsState);
    let [tasks, setTasks] = useState<TasksType>(initialTasksState);

    /*Далее идет список callback-функций, которые меняют локальный state, используя хук "useState()". На основе этих
    callback-функций созданы "todolists-reducer.ts" и "tasks-reducer.ts", а также callback-функции в файле
    "AppWithReducers.tsx", использующие action creators и редьюсеры.*/
    function addTodolist(title: string) {
        const tempTodolist: TodolistType = {id: v1(), title: title, filter: 'all'};
        /*При помощи "..." делаем деструктуризацию массива, то есть кладем в новый пустой массив элементы другого уже
        существующего массива, чтобы потом передать этот новый массив в функцию "setTodolists()", так как только в этом
        случае хук "useState()" зарегистрирует изменение state и сделает перерисовку.*/
        setTodolists([tempTodolist, ...todolists]);
        setTasks({...tasks, [tempTodolist.id]: []});
    };

    function changeTodolistTitle(newTitleValue: string, todolistID: string) {
        const todolist = todolists.find((tl) => tl.id === todolistID);

        if (todolist && newTitleValue !== '') {
            todolist.title = newTitleValue;
            setTodolists([...todolists]);
        }
    };

    function changeFilter(value: FilterValuesType, todolistID: string) {
        const todolist = todolists.find((tl) => tl.id === todolistID);

        if (todolist) {
            todolist.filter = value;
            setTodolists([...todolists]);
        }
    };

    function removeTodolist(todolistID: string) {
        const tempTodolists = todolists.filter((tl) => tl.id !== todolistID);
        setTodolists(tempTodolists);
        delete tasks[todolistID];
        setTasks({...tasks})
    };

    function addTask(title: string, todolistID: string) {
        const newTask = {id: v1(), title: title, isDone: false};
        const tempTasks = tasks[todolistID];
        tasks[todolistID] = [newTask, ...tempTasks];
        setTasks({...tasks});
    };

    function changeTaskTitle(newTitleValue: string, taskID: string, todolistID: string) {
        const tempTasks = tasks[todolistID];
        const task = tempTasks.find((t) => t.id === taskID);

        if (task && newTitleValue !== '') {
            task.title = newTitleValue;
            setTasks({...tasks});
        }
    };

    function changeTaskStatus(taskID: string, isDone: boolean, todolistID: string) {
        const tempTasks = tasks[todolistID];
        const task = tempTasks.find((t) => t.id === taskID);

        if (task) {
            task.isDone = isDone;
            setTasks({...tasks});
        }
    };

    function removeTask(id: string, todolistID: string) {
        const tempTasks = tasks[todolistID];
        tasks[todolistID] = tempTasks.filter((t) => t.id !== id);
        setTasks({...tasks});
    };

    return <div className='App'>
        <AppBar position='static' style={{backgroundColor: '#7d5222'}}>
            <Toolbar>
                <Grid container alignItems='center'>
                    <Grid item>
                        <IconButton edge='start' color='inherit' aria-label='menu'>
                            <Menu/>
                        </IconButton>
                    </Grid>

                    <Grid item>
                        <Typography variant='h5'>Settings</Typography>
                    </Grid>

                    <Grid item style={{marginLeft: 'auto'}}>
                        <Button color='inherit'>Login</Button>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>

        <Container fixed>
            <Grid container style={{marginTop: '16px', marginBottom: '16px'}}>
                <Paper style={{padding: '26px', backgroundColor: '#fcece1'}}>
                    <AddItemForm addItem={addTodolist} itemType='todolist' buttonVariant='filled'/>
                </Paper>
            </Grid>

            <Grid container spacing={4}>
                {/*Фигурные скобки, указывают, что мы здесь будем работать с JS.*/}
                {
                    todolists.map((tl) => {
                        let tasksForTodolist = tasks[tl.id];
                        if (tl.filter === 'complete') tasksForTodolist = tasksForTodolist.filter((t) => t.isDone);
                        if (tl.filter === 'active') tasksForTodolist = tasksForTodolist.filter((t) => !t.isDone);

                        return <Grid item key={tl.id}>
                            <Paper style={{backgroundColor: '#fcece1'}}>
                                <Todolist
                                    key={tl.id}
                                    id={tl.id}
                                    title={tl.title}
                                    filter={tl.filter}
                                    tasks={tasksForTodolist}
                                    changeTodolistTitle={changeTodolistTitle}
                                    changeFilter={changeFilter}
                                    removeTodolist={removeTodolist}
                                    addTask={addTask}
                                    changeTaskTitle={changeTaskTitle}
                                    changeTaskStatus={changeTaskStatus}
                                    removeTask={removeTask}
                                />
                            </Paper>
                        </Grid>
                    })
                }
            </Grid>
        </Container>
    </div>
};

export default App;