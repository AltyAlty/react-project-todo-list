import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import './App.css';
import {TaskType, Todolist} from './components/Todolist/Todolist';
import {AddItemForm} from './components/AddItemForm/AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@mui/material';
import {Menu} from '@mui/icons-material';
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC
} from './state/todolists-reducer';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from './state/tasks-reducer';
import {AppRootState} from './state/store';

export type FilterValuesType = 'all' | 'active' | 'complete';

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
};

export type TasksType = { [key: string]: Array<TaskType> };

const AppWithRedux = () => {
    /*Чтобы создать dispatch-функцию используем хук "useDispatch()" из React Redux. Эта dispatch-функция будет
    диспатчить action-объекты сразу в весь глобальный store из Redux, а не в какой-то отдельный редьюсер.*/
    const dispatch = useDispatch();

    /*Используем хук "useSelector()" из React Redux для получения нужной части глобального store из Redux. В этом хуке
    первым нужно уточнить тип глобального store из Redux, а вторым тип конкретной части этого глобального store, которую
    мы хотим получить. В качестве параметра нужно указать функцию, которая будет получать весь глобальный store и брать
    из него нужную нам часть этого глобального store.*/
    const todolists = useSelector<AppRootState, Array<TodolistType>>(state => state.todolists);
    const tasks = useSelector<AppRootState, TasksType>(state => state.tasks);

    /*Далее идет список callback-функций, которые получают action-объекты, используя action creators, и диспатчат эти
    action-объекты в редьюсеры, при помощи хука "useDispatch()".*/
    function addTodolist(title: string) {
        /*Получаем action-объект, используя action creator.*/
        const action = addTodolistAC(title);
        /*Диспатчим action-объект в редьюсеры, при помощи хука "useDispatch()".*/
        dispatch(action);
    };

    function changeTodolistTitle(newTitleValue: string, todolistID: string) {
        const action = changeTodolistTitleAC(todolistID, newTitleValue);
        dispatch(action);
    };

    function changeFilter(value: FilterValuesType, todolistID: string) {
        const action = changeTodolistFilterAC(todolistID, value);
        dispatch(action);
    };

    function removeTodolist(todolistID: string) {
        const action = removeTodolistAC(todolistID);
        dispatch(action);
    };

    function addTask(title: string, todolistID: string) {
        const action = addTaskAC(title, todolistID);
        dispatch(action);
    };

    function changeTaskTitle(newTitleValue: string, taskID: string, todolistID: string) {
        const action = changeTaskTitleAC(taskID, todolistID, newTitleValue);
        dispatch(action);
    };

    function changeTaskStatus(taskID: string, isDone: boolean, todolistID: string) {
        const action = changeTaskStatusAC(taskID, todolistID, isDone);
        dispatch(action);
    };

    function removeTask(id: string, todolistID: string) {
        const action = removeTaskAC(id, todolistID);
        dispatch(action);
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

export default AppWithRedux;