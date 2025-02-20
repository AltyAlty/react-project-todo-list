import React, {useReducer} from 'react';
import './App.css';
import {v1} from 'uuid';
import {TaskType, Todolist} from './components/Todolist/Todolist';
import {AddItemForm} from './components/AddItemForm/AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@mui/material';
import {Menu} from '@mui/icons-material';
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from './state/todolists-reducer';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from './state/tasks-reducer';

export type FilterValuesType = 'all' | 'active' | 'complete';

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
};

export type TasksType = { [key: string]: Array<TaskType> };

const AppWithReducers = () => {
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

    /*Хук "useReducer()" первым параметром принимает редьюсер, а вторым параметром изначальное состояние state, который
    будет обрабатываться этим редьюсером. Этот хук в первую переменную положит локальный state, а во вторую переменную
    dispatch-функцию, которая при вызове будет диспатчить action-объект в редьюсер.*/
    let [todolists, dispatchToTodolistsReducer] = useReducer(todolistsReducer, initialTodolistsState);
    let [tasks, dispatchToTasksReducer] = useReducer(tasksReducer, initialTasksState);

    /*Далее идет список callback-функций, которые получают action-объекты, используя action creators, и диспатчат эти
    action-объекты в редьюсеры, при помощи хука "useReducer()".*/
    function addTodolist(title: string) {
        /*Получаем action-объект, используя action creator.*/
        const action = addTodolistAC(title);
        /*Диспатчим action-объекты в редьюсеры.*/
        dispatchToTasksReducer(action);
        dispatchToTodolistsReducer(action);
    };

    function changeTodolistTitle(newTitleValue: string, todolistID: string) {
        const action = changeTodolistTitleAC(todolistID, newTitleValue);
        dispatchToTodolistsReducer(action);
    };

    function changeFilter(value: FilterValuesType, todolistID: string) {
        const action = changeTodolistFilterAC(todolistID, value);
        dispatchToTodolistsReducer(action);
    };

    function removeTodolist(todolistID: string) {
        const action = removeTodolistAC(todolistID);
        dispatchToTasksReducer(action);
        dispatchToTodolistsReducer(action);
    };

    function addTask(title: string, todolistID: string) {
        const action = addTaskAC(title, todolistID);
        dispatchToTasksReducer(action);
    };

    function changeTaskTitle(newTitleValue: string, taskID: string, todolistID: string) {
        const action = changeTaskTitleAC(taskID, todolistID, newTitleValue);
        dispatchToTasksReducer(action);
    };

    function changeTaskStatus(taskID: string, isDone: boolean, todolistID: string) {
        const action = changeTaskStatusAC(taskID, todolistID, isDone);
        dispatchToTasksReducer(action);
    };

    function removeTask(id: string, todolistID: string) {
        const action = removeTaskAC(id, todolistID);
        dispatchToTasksReducer(action);
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
                                    changeTaskStatus={changeTaskStatus}
                                    changeTaskTitle={changeTaskTitle}
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

export default AppWithReducers;