import {FilterValuesType} from './App';
import {ChangeEvent} from 'react';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from "./EditableSpan";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
};

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTasks: (id: string, todolistID: string) => void
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
            <h3><EditableSpan inputText={props.title} onInputChangeCallback={onChangeTodolistTitleHandler}/>
                <button onClick={removeTodolist}>x</button>
            </h3>

            <AddItemForm addItem={addTask}/>

            <ul>
                {
                    props.tasks.map((t) => {
                        const onRemoveHandler = () => {
                            props.removeTasks(t.id, props.id);
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
                            <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                                <input type='checkbox'
                                       checked={t.isDone}
                                       onChange={onChangeStatusHandler}
                                />

                                <EditableSpan inputText={t.title} onInputChangeCallback={onChangeTaskTitleHandler}/>

                                <button onClick={onRemoveHandler}>x</button>
                            </li>
                        );
                    })
                }
            </ul>

            <div>
                <button className={props.filter === 'all' ? 'active-filter' : ''}
                        onClick={onAllClickHandler}>All
                </button>

                <button className={props.filter === 'active' ? 'active-filter' : ''}
                        onClick={onActiveClickHandler}>Active
                </button>

                <button className={props.filter === 'complete' ? 'active-filter' : ''}
                        onClick={onCompleteClickHandler}>Complete
                </button>
            </div>
        </div>
    );
};

