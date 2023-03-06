import {FilterValuesType} from './App';
import {ChangeEvent, KeyboardEvent, useState} from 'react';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
};

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTasks: (id: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
};

export const Todolist = (props: PropsType) => {
    let [newTaskTitle, setNewTaskTitle] = useState<string>('');

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value);
    };

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.ctrlKey === true && e.charCode === 13) {
            props.addTask(newTaskTitle);
            setNewTaskTitle('');
        }
    };

    const addTask = () => {
        props.addTask(newTaskTitle);
        setNewTaskTitle('');
    };

    const onAllClickHandler = () => {
        props.changeFilter('all');
    };

    const onActiveClickHandler = () => {
        props.changeFilter('active');
    };


    const onCompleteClickHandler = () => {
        props.changeFilter('complete');
    };


    return (
        <div>
            <h3>{props.title}</h3>

            <div>
                <input type='text'
                       value={newTaskTitle}
                       onChange={onNewTitleChangeHandler}
                       onKeyPress={onKeyPressHandler}
                />

                <button onClick={addTask}>+</button>
            </div>

            <ul>
                {
                    props.tasks.map((t) => {
                        const onRemoveHandler = () => {
                            props.removeTasks(t.id);
                        };

                        return (
                            <li key={t.id}>
                                <input type='checkbox' checked={t.isDone}/><span>{t.title}</span>
                                <button onClick={onRemoveHandler}>x</button>
                            </li>
                        );
                    })
                }
            </ul>

            <div>
                <button onClick={onAllClickHandler}>All</button>
                <button onClick={onActiveClickHandler}>Active</button>
                <button onClick={onCompleteClickHandler}>Complete</button>
            </div>
        </div>
    );
};