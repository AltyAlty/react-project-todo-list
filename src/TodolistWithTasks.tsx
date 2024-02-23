import {FilterValuesType} from './AppWithReduxNoTasks';
import React, {useCallback} from 'react';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {Button, IconButton} from '@mui/material';
import {Delete} from '@mui/icons-material';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from './state/tasks-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootState} from './state/store';
import {Task} from './Task';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
};

type PropsType = {
    id: string
    title: string
    changeFilter: (value: FilterValuesType, todolistID: string) => void
    filter: FilterValuesType
    removeTodolist: (todolistID: string) => void
    changeTodolistTitle: (newTitleValue: string, todolistID: string) => void
};

export const TodolistWithTasks = React.memo((
    /*Сделали деструктуризацию пропсов в целях указания зависимостей для хука "useCallback".*/
    {id, title, changeFilter, filter, removeTodolist, changeTodolistTitle}: PropsType) => {
    console.log('TodolistWithTasks was called');
    const dispatch = useDispatch();
    const tasks = useSelector<AppRootState, Array<TaskType>>(state => state.tasks[id]);

    const addTask = useCallback((title: string) => {
        const action = addTaskAC(title, id);
        dispatch(action);
    }, [dispatch, id]);

    const removeTask = useCallback((id: string, todolistID: string) => {
        const action = removeTaskAC(id, todolistID);
        dispatch(action);
    }, [dispatch]);

    const changeTaskTitle = useCallback((newTitleValue: string, taskID: string, todolistID: string) => {
        const action = changeTaskTitleAC(taskID, todolistID, newTitleValue);
        dispatch(action);
    }, [dispatch]);

    const changeTaskStatus = useCallback((taskID: string, isDone: boolean, todolistID: string) => {
        const action = changeTaskStatusAC(taskID, todolistID, isDone);
        dispatch(action);
    }, [dispatch]);

    const onAllClickHandler = useCallback(() => {
        changeFilter('all', id);
    }, [changeFilter, id]);

    const onActiveClickHandler = useCallback(() => {
        changeFilter('active', id);
    }, [changeFilter, id]);

    const onCompleteClickHandler = useCallback(() => {
        changeFilter('complete', id);
    }, [changeFilter, id]);

    const removeTodolistClickHandler = useCallback(() => {
        removeTodolist(id);
    }, [removeTodolist, id]);

    const onChangeTodolistTitleHandler = useCallback((newTitleValue: string) => {
        changeTodolistTitle(newTitleValue, id);
    }, [changeTodolistTitle, id]);

    let tasksForTodolist = tasks;

    if (filter === 'complete') {
        tasksForTodolist = tasksForTodolist.filter((t) => {
            return t.isDone === true;
        });
    }

    if (filter === 'active') {
        tasksForTodolist = tasksForTodolist.filter((t) => {
            return t.isDone === false;
        });
    }

    return (
        <div>
            <h3>
                <EditableSpan inputText={title} onInputChangeCallback={onChangeTodolistTitleHandler}/>

                <IconButton aria-label={'delete'} onClick={removeTodolistClickHandler}>
                    <Delete/>
                </IconButton>
            </h3>

            <AddItemForm addItem={addTask}/>

            <div>
                {
                    tasksForTodolist.map((t) => {
                        return <Task
                            key={t.id}
                            task={t}
                            todolistID={id}
                            removeTask={removeTask}
                            changeTaskStatus={changeTaskStatus}
                            changeTaskTitle={changeTaskTitle}
                        />
                    })
                }
            </div>

            <div>
                <Button variant={filter === 'all' ? 'contained' : 'text'} color={'success'}
                        onClick={onAllClickHandler}>All
                </Button>

                <Button variant={filter === 'active' ? 'contained' : 'text'} color={'primary'}
                        onClick={onActiveClickHandler}>Active
                </Button>

                <Button variant={filter === 'complete' ? 'contained' : 'text'} color={'secondary'}
                        onClick={onCompleteClickHandler}>Complete
                </Button>
            </div>
        </div>
    );
});