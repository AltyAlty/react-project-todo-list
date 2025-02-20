import React, {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import './App.css';
import {TaskType, TodolistWithTasks} from './components/Todolist/TodolistWithTasks';
import {AddItemForm} from './components/AddItemForm/AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@mui/material';
import {Menu} from '@mui/icons-material';
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC
} from './state/todolists-reducer';
import {AppRootState} from './state/store';

export type FilterValuesType = 'all' | 'active' | 'complete';

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
};

const AppWithReduxNoTasks = () => {
    console.log('AppWithReduxNoTasks has been called');
    const dispatch = useDispatch();
    const todolists = useSelector<AppRootState, Array<TodolistType>>(state => state.todolists);

    /*Мы отправляем callback-функцию "addTodolist()" через пропсы компоненту "AddItemForm". Каждый раз когда
    перезапускается компонент "AppWithReduxNoTasks" эта callback-функция создается заново и при сравнении пропсов
    получается, что функции разные, поэтому происходит перерисовка компонента "AddItemForm", поскольку получается, что
    новые пропсы отличаются от старых. Чтобы этого избежать мы используем хук "useCallback()". Первым параметром этот
    хук принимает функцию, которая будет кэшироваться или проходить мемоизацию, чтобы в случаях описанных выше не было
    лишних перерисовок. Вторым параметром указываются зависимости, обычно там указывают dispatch-функцию, данные props
    или данные из локального state, которые используются в callback-функции. Этот хук стоит использовать если какая-то
    callback-функция передается в компонент, а не в элемент.*/
    const addTodolist = useCallback(
        (title: string) => {
            /*Получаем action-объект, используя action creator.*/
            const action = addTodolistAC(title);
            /*Диспатчим action-объект в редьюсеры, при помощи хука "useDispatch()".*/
            dispatch(action);
        },
        [dispatch]
    );

    const changeTodolistTitle = useCallback(
        (newTitleValue: string, todolistID: string) => {
            const action = changeTodolistTitleAC(todolistID, newTitleValue);
            dispatch(action);
        },
        [dispatch]
    );

    const changeFilter = useCallback(
        (value: FilterValuesType, todolistID: string) => {
            const action = changeTodolistFilterAC(todolistID, value);
            dispatch(action);
        },
        [dispatch]
    );

    const removeTodolist = useCallback(
        (todolistID: string) => {
            const action = removeTodolistAC(todolistID);
            dispatch(action);
        },
        [dispatch]
    );

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
                        return <Grid item key={tl.id}>
                            <Paper style={{backgroundColor: '#fcece1'}}>
                                <TodolistWithTasks
                                    key={tl.id}
                                    id={tl.id}
                                    title={tl.title}
                                    filter={tl.filter}
                                    changeTodolistTitle={changeTodolistTitle}
                                    changeFilter={changeFilter}
                                    removeTodolist={removeTodolist}
                                />
                            </Paper>
                        </Grid>
                    })
                }
            </Grid>
        </Container>
    </div>
};

export default AppWithReduxNoTasks;