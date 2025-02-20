import React, {ChangeEvent, useCallback} from 'react';
import {TaskType} from '../TodolistWithTasks';
import {EditableSpan} from '../../EditableSpan/EditableSpan';
import {Checkbox, Grid, IconButton} from '@mui/material';
import {Delete} from '@mui/icons-material';

type PropsType = {
    task: TaskType
    todolistID: string
    changeTaskTitle: (newTitleValue: string, taskID: string, todolistID: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean, todolistID: string) => void
    removeTask: (id: string, todolistID: string) => void
};

/*Вывели создание задачи для списка задач в отдельную компоненту, чтобы избежать повторных перерисовок. Основные способы
избежания лишних перерисовок: HOC "React.memo()", хук "useCallback()", дробление на компоненты.*/
export const Task = React.memo(({
                                    task,
                                    todolistID,
                                    changeTaskTitle,
                                    changeTaskStatus,
                                    removeTask
                                }: PropsType) => {
    console.log('Task has been called');

    const onRemoveTaskClick = useCallback(
        () => { removeTask(task.id, todolistID) },
        [removeTask, task.id, todolistID]
    );

    const onTaskStatusChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => { changeTaskStatus(task.id, e.currentTarget.checked, todolistID) },
        [changeTaskStatus, task.id, todolistID]
    );

    const onTaskTitleChange = useCallback(
        (newTitleValue: string) => { changeTaskTitle(newTitleValue, task.id, todolistID) },
        [changeTaskTitle, task.id, todolistID]
    );

    return <Grid item key={task.id} className={task.isDone ? 'is-done' : ''}>
        <Checkbox checked={task.isDone}
                  style={{color: '#7d5222'}}
                  onChange={onTaskStatusChange}
        />

        <EditableSpan inputText={task.title} onInputChange={onTaskTitleChange}/>

        <IconButton aria-label={'delete'}
                    style={{color: '#7d5222'}}
                    onClick={onRemoveTaskClick}>
            <Delete/>
        </IconButton>
    </Grid>
});