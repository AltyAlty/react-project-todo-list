import React from 'react';
import './App.css';
import {TaskType, TodolistWithTasks} from './TodolistWithTasks';
import {AddItemForm} from './AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@mui/material';
import {Menu} from '@mui/icons-material';
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC
} from './state/todolists-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootState} from './state/store';


export type FilterValuesType = 'all' | 'active' | 'complete';

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
};

export type TasksType = {
    [key: string]: Array<TaskType>
}

function AppWithReduxNoTasks() {
    /*Чтобы создать dispatch-функцию используем хук "useDispatch" из React-Redux.*/
    const dispatch = useDispatch();

    /*Используем хук "useSelector" для получения state. Первым нужно уточнить тип state из Redux, вторым тип конкретного
    state, который хотим получить. В качестве параметра нужно указать функцию, которая получает весь state и берет из
    него нужную часть.*/
    const todolists = useSelector<AppRootState, Array<TodolistType>>(state => state.todolists);

    function removeTodolist(todolistID: string) {
        /*Получаем action-объект.*/
        const action = removeTodolistAC(todolistID);

        /*Диспатчим action-объект.*/
        dispatch(action);
    };

    function changeFilter(value: FilterValuesType, todolistID: string) {
        /*Получаем action-объект.*/
        const action = changeTodolistFilterAC(todolistID, value);

        /*Диспатчим action-объект.*/
        dispatch(action);
    };

    function addTodolist(title: string) {
        /*Получаем action-объект.*/
        const action = addTodolistAC(title);

        /*Диспатчим action-объект.*/
        dispatch(action);
    };

    function changeTodolistTitle(newTitleValue: string, todolistID: string) {
        /*Получаем action-объект.*/
        const action = changeTodolistTitleAC(todolistID, newTitleValue);

        /*Диспатчим action-объект.*/
        dispatch(action);
    };

    return (
        <div className='App'>
            <AppBar position='static'>
                <Toolbar>
                    <IconButton edge='start' color='inherit' aria-label='menu'>
                        <Menu/>
                    </IconButton>

                    <Typography variant='h6'> News </Typography>

                    <Button color='inherit'>Login</Button>
                </Toolbar>
            </AppBar>

            <Container fixed>
                <Grid container style={{padding: '10px'}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>

                <Grid container spacing={3}>
                    {
                        todolists.map((tl) => {
                            return (
                                <Grid item>
                                    <Paper style={{padding: '5px'}}>
                                        <TodolistWithTasks
                                            key={tl.id}
                                            id={tl.id}
                                            title={tl.title}
                                            changeFilter={changeFilter}
                                            filter={tl.filter}
                                            removeTodolist={removeTodolist}
                                            changeTodolistTitle={changeTodolistTitle}
                                        />
                                    </Paper>
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
};

export default AppWithReduxNoTasks;