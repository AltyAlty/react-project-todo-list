import {ChangeEvent, KeyboardEvent, useState} from 'react';

export type AddItemFormPropsType = {
    addItem: (title: string) => void
};

export const AddItemForm = (props: AddItemFormPropsType) => {
    let [newTaskTitle, setNewTaskTitle] = useState<string>('');
    let [inputError, setInputError] = useState<string | null>(null);

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value);
    };

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setInputError(null);

        if (e.ctrlKey === true && e.charCode === 13) {
            props.addItem(newTaskTitle);
            setNewTaskTitle('');
        }
    };

    const addItem = () => {
        /*Метод "trim()" удаляет пробельные символы с начала и конца строки.*/
        if (newTaskTitle.trim() !== '') {
            props.addItem(newTaskTitle);
            setNewTaskTitle('');
        } else {
            setInputError('Title is required');
        }
    };

    return (
        <div>
            <input type='text'
                   value={newTaskTitle}
                   onChange={onNewTitleChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={inputError ? 'error' : ''}
            />

            <button onClick={addItem}>+</button>

            {inputError && <div className='error-message'>{inputError}</div>}
        </div>
    )
};