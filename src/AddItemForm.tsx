import {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button, IconButton, TextField} from '@mui/material';
import {ControlPoint} from '@mui/icons-material';

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
};