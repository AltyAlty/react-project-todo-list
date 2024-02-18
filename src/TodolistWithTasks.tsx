import {FilterValuesType} from './AppWithReduxNoTasks';
import {ChangeEvent} from 'react';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {Button, Checkbox, IconButton} from '@mui/material';
import {Delete} from '@mui/icons-material';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from './state/tasks-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootState} from './state/store';

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

export const TodolistWithTasks = (props: PropsType) => {
    const dispatch = useDispatch();
    const tasks = useSelector<AppRootState, Array<TaskType>>(state => state.tasks[props.id]);

    function addTask(title: string) {
        const action = addTaskAC(title, props.id);
        dispatch(action);
    };

    function removeTask(id: string, todolistID: string) {
        const action = removeTaskAC(id, todolistID);
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

    const onAllClickHandler = () => {
        props.changeFilter('all', props.id);
    };

    const onActiveClickHandler = () => {
        props.changeFilter('active', props.id);
    };

    const onCompleteClickHandler = () => {
        props.changeFilter('complete', props.id);
    };

    const removeTodolist = () => {
        props.removeTodolist(props.id);
    };

    const onChangeTodolistTitleHandler = (newTitleValue: string) => {
        props.changeTodolistTitle(newTitleValue, props.id);
    };

    let tasksForTodolist = tasks;

    if (props.filter === 'complete') {
        tasksForTodolist = tasksForTodolist.filter((t) => {
            return t.isDone === true;
        });
    }

    if (props.filter === 'active') {
        tasksForTodolist = tasksForTodolist.filter((t) => {
            return t.isDone === false;
        });
    }

    return (
        <div>
            <h3>
                <EditableSpan inputText={props.title} onInputChangeCallback={onChangeTodolistTitleHandler}/>

                <IconButton aria-label={'delete'} onClick={removeTodolist}>
                    <Delete/>
                </IconButton>
            </h3>

            <AddItemForm addItem={addTask}/>

            <div>
                {
                    tasksForTodolist.map((t) => {
                        const onRemoveHandler = () => {
                            removeTask(t.id, props.id);
                        };

                        const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            /*"e.currentTarget.checked" будет меняться на противоположное значение
                            * в момент нажатия, так как чекбокс попробует измениться, поэтому в
                            * функцию будет приходить то значение, на которое мы хотим изменить
                            * чекбокс.*/
                            changeTaskStatus(t.id, e.currentTarget.checked, props.id);
                        };

                        const onChangeTaskTitleHandler = (newTitleValue: string) => {
                            changeTaskTitle(newTitleValue, t.id, props.id);
                        };

                        return (
                            <div key={t.id} className={t.isDone ? 'is-done' : ''}>
                                <Checkbox checked={t.isDone}
                                          onChange={onChangeStatusHandler}
                                />

                                <EditableSpan inputText={t.title} onInputChangeCallback={onChangeTaskTitleHandler}/>

                                <IconButton aria-label={'delete'} onClick={onRemoveHandler}>
                                    <Delete/>
                                </IconButton>
                            </div>
                        );
                    })
                }
            </div>

            <div>
                <Button variant={props.filter === 'all' ? 'contained' : 'text'} color={'success'}
                        onClick={onAllClickHandler}>All
                </Button>

                <Button variant={props.filter === 'active' ? 'contained' : 'text'} color={'primary'}
                        onClick={onActiveClickHandler}>Active
                </Button>

                <Button variant={props.filter === 'complete' ? 'contained' : 'text'} color={'secondary'}
                        onClick={onCompleteClickHandler}>Complete
                </Button>
            </div>
        </div>
    );
};

