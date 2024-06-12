import {FilterValuesType} from '../../App';
import {ChangeEvent} from 'react';
import {AddItemForm} from '../AddItemForm/AddItemForm';
import {EditableSpan} from '../EditableSpan/EditableSpan';
import {Button, Checkbox, IconButton} from '@mui/material';
import {Delete} from '@mui/icons-material';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
};

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string, todolistID: string) => void
    changeFilter: (value: FilterValuesType, todolistID: string) => void
    addTask: (title: string, todolistID: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean, todolistID: string) => void
    filter: FilterValuesType
    removeTodolist: (todolistID: string) => void
    changeTaskTitle: (newTitleValue: string, taskID: string, todolistID: string) => void
    changeTodolistTitle: (newTitleValue: string, todolistID: string) => void
};

export const Todolist = (props: PropsType) => {

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

    const addTask = (title: string) => {
        props.addTask(title, props.id)
    };

    const onChangeTodolistTitleHandler = (newTitleValue: string) => {
        props.changeTodolistTitle(newTitleValue, props.id);
    };

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
                    props.tasks.map((t) => {
                        const onRemoveHandler = () => {
                            props.removeTask(t.id, props.id);
                        };

                        const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            /*"e.currentTarget.checked" будет меняться на противоположное значение
                            * в момент нажатия, так как чекбокс попробует измениться, поэтому в
                            * функцию будет приходить то значение, на которое мы хотим изменить
                            * чекбокс.*/
                            props.changeTaskStatus(t.id, e.currentTarget.checked, props.id);
                        };

                        const onChangeTaskTitleHandler = (newTitleValue: string) => {
                            props.changeTaskTitle(newTitleValue, t.id, props.id);
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

