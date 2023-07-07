import {FilterValuesType} from './App';
import {ChangeEvent, KeyboardEvent, useState} from 'react';

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
};

export const Todolist = (props: PropsType) => {
    let [newTaskTitle, setNewTaskTitle] = useState<string>('');
    let [inputError, setInputError] = useState<string | null>(null);

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value);
    };

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setInputError(null);

        if (e.ctrlKey === true && e.charCode === 13) {
            props.addTask(newTaskTitle, props.id);
            setNewTaskTitle('');
        }
    };

    const addTask = () => {
        /*Метод "trim()" удаляет пробельные символы с начала и конца строки.*/
        if (newTaskTitle.trim() !== '') {
            props.addTask(newTaskTitle, props.id);
            setNewTaskTitle('');
        } else {
            setInputError('Title is required');
        }
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

    return (
        <div>
            <h3>{props.title} <button onClick={removeTodolist}>x</button></h3>

            <div>
                <input type='text'
                       value={newTaskTitle}
                       onChange={onNewTitleChangeHandler}
                       onKeyPress={onKeyPressHandler}
                       className={inputError ? 'error' : ''}
                />

                <button onClick={addTask}>+</button>

                {inputError && <div className='error-message'>{inputError}</div>}
            </div>

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

                        return (
                            <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                                <input type='checkbox'
                                       checked={t.isDone}
                                       onChange={onChangeStatusHandler}
                                />

                                <span>{t.title}</span>

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