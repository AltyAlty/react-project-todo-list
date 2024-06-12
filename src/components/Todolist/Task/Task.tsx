import React, {ChangeEvent, useCallback} from 'react';
import {EditableSpan} from '../../EditableSpan/EditableSpan';
import {Checkbox, IconButton} from '@mui/material';
import {Delete} from '@mui/icons-material';
import {TaskType} from '../TodolistWithTasks';

type PropsType = {
    task: TaskType
    todolistID: string
    removeTask: (id: string, todolistID: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean, todolistID: string) => void
    changeTaskTitle: (newTitleValue: string, taskID: string, todolistID: string) => void
};

/*Вывели в отдельную компоненту, чтобы избежать повторных перерисовок. Основные способы избежания лишних перерисовок:
HOC "React.memo()", хук "useCallback()", дробление на компоненты.*/
export const Task = React.memo((
    {task, todolistID, removeTask, changeTaskStatus, changeTaskTitle}: PropsType) => {
    const onRemoveHandler = useCallback(() => {
        removeTask(task.id, todolistID);
    }, [removeTask, task.id, todolistID]);

    const onChangeStatusHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        /*"e.currentTarget.checked" будет меняться на противоположное значение в момент нажатия, так как чекбокс
        попробует измениться, поэтому в функцию будет приходить то значение, на которое мы хотим изменить чекбокс.*/
        changeTaskStatus(task.id, e.currentTarget.checked, todolistID);
    }, [changeTaskStatus, task.id, todolistID]);

    const onChangeTaskTitleHandler = useCallback((newTitleValue: string) => {
        changeTaskTitle(newTitleValue, task.id, todolistID);
    }, [changeTaskTitle, task.id, todolistID]);

    return (
        <div key={task.id} className={task.isDone ? 'is-done' : ''}>
            <Checkbox checked={task.isDone}
                      onChange={onChangeStatusHandler}
            />

            <EditableSpan inputText={task.title} onInputChangeCallback={onChangeTaskTitleHandler}/>

            <IconButton aria-label={'delete'} onClick={onRemoveHandler}>
                <Delete/>
            </IconButton>
        </div>
    )
});