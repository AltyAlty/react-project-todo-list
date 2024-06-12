import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from '@mui/material';
import {ControlPoint} from '@mui/icons-material';

export type AddItemFormPropsType = {
    addItem: (title: string) => void
};

export const AddItemForm = React.memo((props: AddItemFormPropsType) => {
    console.log('AddItemForm was called');
    let [newTaskTitle, setNewTaskTitle] = useState<string>('');
    let [inputError, setInputError] = useState<string | null>(null);

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value);
    };

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        /*Это условие нужно, чтобы избежать лишних перерисовок, когда мы зануляем ошибку, хотя ее и не было.*/
        if (inputError !== null) {
            setInputError(null);
        }

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
            <TextField variant={'outlined'}
                       label={'Enter title'}
                       value={newTaskTitle}
                       onChange={onNewTitleChangeHandler}
                       onKeyPress={onKeyPressHandler}
                       error={!!inputError}
                       helperText={inputError}
            />

            <IconButton onClick={addItem} color={'primary'}>
                <ControlPoint/>
            </IconButton>
        </div>
    )
});