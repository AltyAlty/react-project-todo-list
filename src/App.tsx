/*
yarn create react-app . --template typescript

yarn add uuid
yarn add @types/uuid
yarn add @mui/material @emotion/react @emotion/styled
yarn add @mui/icons-material
*/

import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@mui/material';
import {Menu} from '@mui/icons-material';

export type FilterValuesType = 'all' | 'active' | 'complete';

type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
};

type TasksType = {
    [key: string]: Array<TaskType>
}

function App() {
    let todolistID1 = v1();
    let todolistID2 = v1();
    let todolistID3 = v1();

    let [todolists, setTodolists] = useState<Array<TodolistType>>(
        [
            {id: todolistID1, title: 'What to learn', filter: 'all'},
            {id: todolistID2, title: 'What to buy', filter: 'active'},
            {id: todolistID3, title: 'What to sell', filter: 'complete'},
        ]
    );

    /*Здесь используем ассоциативный массив.*/
    let [tasks, setTasks] = useState<TasksType>({
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
        let tempTasks = tasks[todolistID];

        let filteredTasks = tempTasks.filter((t) => {
            return t.id !== id;
        });

        tasks[todolistID] = filteredTasks;
        /*Делаем это, чтобы указать React, что объект в state изменился, поэтому нужна
        * перерисовка.*/
        setTasks({...tasks});
    };

    function addTask(title: string, todolistID: string) {
        let newTask = {id: v1(), title: title, isDone: false};
        let tempTasks = tasks[todolistID];
        let newTasks = [newTask, ...tempTasks];
        tasks[todolistID] = newTasks;
        /*Делаем это, чтобы указать React, что объект в state изменился, поэтому нужна
        * перерисовка.*/
        setTasks({...tasks});
    };

    function changeTaskStatus(taskID: string, isDone: boolean, todolistID: string) {
        let tempTasks = tasks[todolistID];
        let task = tempTasks.find((t) => t.id === taskID);

        if (task) {
            task.isDone = isDone;

            /*При помощи "..." делаем деструктуризацию массива, то кладем в новый массив элементы
            * другого уже существующего массива, чтобы потом передать новый массив в "setTasks()", так как
            * только в этом случае хук "useState()" зарегистрирует изменение и сделает ререндер.*/
            setTasks({...tasks});
        }
    };

    function removeTodolist(todolistID: string) {
        let tempTodolists = todolists.filter((tl) => {
            return tl.id !== todolistID;
        });

        setTodolists(tempTodolists);
        delete tasks[todolistID];
        setTasks({...tasks})
    };

    function changeFilter(value: FilterValuesType, todolistID: string) {
        let todolist = todolists.find((tl) => tl.id === todolistID);

        if (todolist) {
            todolist.filter = value;

            setTodolists([...todolists]);
        }
    };

    function addTodolist(title: string) {
        let tempTodolist: TodolistType = {id: v1(), title: title, filter: 'all'};

        setTodolists([tempTodolist, ...todolists]);

        setTasks({...tasks, [tempTodolist.id]: []});
    };

    function changeTaskTitle(newTitleValue: string, taskID: string, todolistID: string) {
        let tempTasks = tasks[todolistID];
        let task = tempTasks.find((t) => t.id === taskID);

        if (task && newTitleValue !== '') {
            task.title = newTitleValue;

            setTasks({...tasks});
        }
    };

    function changeTodolistTitle(newTitleValue: string, todolistID: string) {
        let todolist = todolists.find((tl) => tl.id === todolistID);

        if (todolist && newTitleValue !== '') {
            todolist.title = newTitleValue;

            setTodolists([...todolists]);
        }
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
                                            removeTasks={removeTask}
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

export default App;