import React, {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {FilterValuesType} from '../../AppWithReduxNoTasks';
import {Task} from './Task/Task';
import {AddItemForm} from '../AddItemForm/AddItemForm';
import {EditableSpan} from '../EditableSpan/EditableSpan';
import {Button, Container, Grid, IconButton} from '@mui/material';
import {Delete} from '@mui/icons-material';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from '../../state/tasks-reducer';
import {AppRootState} from '../../state/store';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
};

type PropsType = {
    id: string
    title: string
    filter: FilterValuesType
    changeTodolistTitle: (newTitleValue: string, todolistID: string) => void
    changeFilter: (value: FilterValuesType, todolistID: string) => void
    removeTodolist: (todolistID: string) => void
};

/*Сделали деструктуризацию пропсов в целях указания зависимостей для хука "useCallback()".*/
export const TodolistWithTasks = React.memo(({
                                                 id,
                                                 title,
                                                 filter,
                                                 changeTodolistTitle,
                                                 changeFilter,
                                                 removeTodolist
                                             }: PropsType) => {
    console.log('TodolistWithTasks has been called');
    const dispatch = useDispatch();
    const tasks = useSelector<AppRootState, Array<TaskType>>(state => state.tasks[id]);

    /*Указываем "id" в зависимостях, так как "id" здесь приходит не напрямую через параметры, а извне через props.*/
    const addTask = useCallback(
        (title: string) => {
            const action = addTaskAC(title, id);
            dispatch(action);
        },
        [dispatch, id]
    );

    const changeTaskTitle = useCallback(
        (newTitleValue: string, taskID: string, todolistID: string) => {
            const action = changeTaskTitleAC(taskID, todolistID, newTitleValue);
            dispatch(action);
        },
        [dispatch]
    );

    const changeTaskStatus = useCallback(
        (taskID: string, isDone: boolean, todolistID: string) => {
            const action = changeTaskStatusAC(taskID, todolistID, isDone);
            dispatch(action);
        },
        [dispatch]
    );

    const removeTask = useCallback(
        (id: string, todolistID: string) => {
            const action = removeTaskAC(id, todolistID);
            dispatch(action);
        },
        [dispatch]
    );

    /*Здесь не указываем dispatch-функцию в зависимостях, так как здесь мы не используем ее. Но при этом указываем
    callback-функцию "changeFilter()" и "id", так как они приходят извне через props.*/
    const onAllFilterClick = useCallback(
        () => { changeFilter('all', id) },
        [changeFilter, id]
    );

    const onActiveFilterClick = useCallback(
        () => { changeFilter('active', id) },
        [changeFilter, id]
    );

    const onCompleteFilterClick = useCallback(
        () => { changeFilter('complete', id) },
        [changeFilter, id]
    );

    const onTodolistTitleChange = useCallback(
        (newTitleValue: string) => { changeTodolistTitle(newTitleValue, id) },
        [changeTodolistTitle, id]
    );

    const onRemoveTodolistClick = useCallback(
        () => { removeTodolist(id) },
        [removeTodolist, id]
    );

    let tasksForTodolist = tasks;
    if (filter === 'complete') tasksForTodolist = tasksForTodolist.filter((t) => t.isDone);
    if (filter === 'active') tasksForTodolist = tasksForTodolist.filter((t) => !t.isDone);

    return <div>
        <Container fixed>
            <Grid container direction='column' alignItems='flex-start'>
                <Grid item style={{alignSelf: 'center'}}>
                    <h3>
                        <EditableSpan inputText={title} onInputChange={onTodolistTitleChange}/>

                        <IconButton aria-label={'delete'} onClick={onRemoveTodolistClick} style={{color: '#7d5222'}}>
                            <Delete/>
                        </IconButton>
                    </h3>
                </Grid>

                <Grid item style={{marginBottom: '16px'}}>
                    <AddItemForm addItem={addTask} itemType='task' buttonVariant='outlined'/>
                </Grid>

                <Grid item style={{marginTop: '16px'}}>
                    <Grid container>
                        <Grid item>
                            <Button variant={filter === 'all' ? 'contained' : 'text'}
                                    style={filter === 'all' ?
                                        {width: '100px', backgroundColor: '#7d5222', color: '#fcece1'} :
                                        {width: '100px', backgroundColor: '#fcece1', color: '#7d5222'}}
                                    onClick={onAllFilterClick}>All
                            </Button>
                        </Grid>

                        <Grid item style={{marginLeft: '6px', marginRight: '6px'}}>
                            <Button variant={filter === 'active' ? 'contained' : 'text'}
                                    style={filter === 'active' ?
                                        {width: '100px', backgroundColor: '#81a94d', color: '#fcece1'} :
                                        {width: '100px', backgroundColor: '#fcece1', color: '#81a94d'}}
                                    onClick={onActiveFilterClick}>Active
                            </Button>
                        </Grid>

                        <Grid item>
                            <Button variant={filter === 'complete' ? 'contained' : 'text'}

                                    style={filter === 'complete' ?
                                        {width: '100px', backgroundColor: '#65439d', color: '#fcece1'} :
                                        {width: '100px', backgroundColor: '#fcece1', color: '#65439d'}}
                                    onClick={onCompleteFilterClick}>Complete
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item style={{marginTop: '21px', marginBottom: '16px'}}>
                    <Grid container direction='column' alignItems='flex-start'>
                        {
                            tasksForTodolist.map((t) => {
                                return <Task
                                    key={t.id}
                                    task={t}
                                    todolistID={id}
                                    changeTaskTitle={changeTaskTitle}
                                    changeTaskStatus={changeTaskStatus}
                                    removeTask={removeTask}
                                />
                            })
                        }
                    </Grid>
                </Grid>

            </Grid>
        </Container>
    </div>
});