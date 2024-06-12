import React, {useReducer} from 'react';
import './App.css';
import {TaskType, Todolist} from './components/Todolist/Todolist';
import {v1} from 'uuid';
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

export type TasksType = {
    [key: string]: Array<TaskType>
}

function AppWithReducers() {
    let todolistID1 = v1();
    let todolistID2 = v1();
    let todolistID3 = v1();

    /*Хук "useReducer" первым параметром принимает редьюсер, а вторым параметром стейт, который будет обрабатываться
    этим редьюсером. Это хук создаст dispatch-функцию, которая при вызове задиспатчит action-объект. В первой
    переменной, которую создат этот хук, будет state.*/
    let [todolists, dispatchToTodolistsReducer] = useReducer(todolistsReducer,
        [
            {id: todolistID1, title: 'What to learn', filter: 'all'},
            {id: todolistID2, title: 'What to buy', filter: 'active'},
            {id: todolistID3, title: 'What to sell', filter: 'complete'},
        ]
    );

    /*Здесь используем ассоциативный массив.*/
    let [tasks, dispatchToTasksReducer] = useReducer(tasksReducer,
        {
            [todolistID1]: [
                {id: v1(), title: 'HTML&CSS', isDone: true},
                {id: v1(), title: 'JS', isDone: false},
                {id: v1(), title: 'REACT', isDone: false},
                {id: v1(), title: 'REDUX', isDone: false},
            ],

            [todolistID2]: [
                {id: v1(), title: 'OK', isDone: true},
                {id: v1(), title: 'KEK', isDone: false},
            ],

            [todolistID3]: [
                {id: v1(), title: 'NOT_OK', isDone: false},
                {id: v1(), title: 'LOL', isDone: true},
            ],
        });

    function removeTask(id: string, todolistID: string) {
        /*Получаем action-объект.*/
        const action = removeTaskAC(id, todolistID);

        /*Диспатчим action-объект.*/
        dispatchToTasksReducer(action);
    };

    function addTask(title: string, todolistID: string) {
        /*Получаем action-объект.*/
        const action = addTaskAC(title, todolistID);

        /*Диспатчим action-объект.*/
        dispatchToTasksReducer(action);
    };

    function changeTaskTitle(newTitleValue: string, taskID: string, todolistID: string) {
        /*Получаем action-объект.*/
        const action = changeTaskTitleAC(taskID, todolistID, newTitleValue);

        /*Диспатчим action-объект.*/
        dispatchToTasksReducer(action);
    };

    function changeTaskStatus(taskID: string, isDone: boolean, todolistID: string) {
        /*Получаем action-объект.*/
        const action = changeTaskStatusAC(taskID, todolistID, isDone);

        /*Диспатчим action-объект.*/
        dispatchToTasksReducer(action);
    };

    function removeTodolist(todolistID: string) {
        /*Получаем action-объект.*/
        const action = removeTodolistAC(todolistID);

        /*Диспатчим action-объект.*/
        dispatchToTasksReducer(action);
        dispatchToTodolistsReducer(action);
    };

    function changeFilter(value: FilterValuesType, todolistID: string) {
        /*Получаем action-объект.*/
        const action = changeTodolistFilterAC(todolistID, value);

        /*Диспатчим action-объект.*/
        dispatchToTodolistsReducer(action);
    };

    function addTodolist(title: string) {
        /*Получаем action-объект.*/
        const action = addTodolistAC(title);

        /*Диспатчим action-объект.*/
        dispatchToTasksReducer(action);
        dispatchToTodolistsReducer(action);
    };

    function changeTodolistTitle(newTitleValue: string, todolistID: string) {
        /*Получаем action-объект.*/
        const action = changeTodolistTitleAC(todolistID, newTitleValue);

        /*Диспатчим action-объект.*/
        dispatchToTodolistsReducer(action);
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
                            let tasksForTodolist = tasks[tl.id];

                            if (tl.filter === 'complete') {
                                tasksForTodolist = tasksForTodolist.filter((t) => {
                                    return t.isDone === true;
                                });
                            }

                            if (tl.filter === 'active') {
                                tasksForTodolist = tasksForTodolist.filter((t) => {
                                    return t.isDone === false;
                                });
                            }

                            return (
                                <Grid item>
                                    <Paper style={{padding: '5px'}}>
                                        <Todolist
                                            key={tl.id}
                                            id={tl.id}
                                            title={tl.title}
                                            tasks={tasksForTodolist}
                                            removeTask={removeTask}
                                            changeFilter={changeFilter}
                                            addTask={addTask}
                                            changeTaskStatus={changeTaskStatus}
                                            filter={tl.filter}
                                            removeTodolist={removeTodolist}
                                            changeTaskTitle={changeTaskTitle}
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

export default AppWithReducers;