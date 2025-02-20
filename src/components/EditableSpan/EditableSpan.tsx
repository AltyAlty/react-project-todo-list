import React, {ChangeEvent, KeyboardEvent, useCallback, useState} from 'react';
import {TextField} from '@mui/material';

type EditableSpanPropsType = {
    inputText: string
    onInputChange: (newTextValue: string) => void
};

export const EditableSpan = React.memo(({inputText, onInputChange}: EditableSpanPropsType) => {
    console.log('EditableSpan has been called');
    let [editMode, setEditMode] = useState<boolean>(false);
    let [newInputText, setNewNewInputText] = useState<string>('');
    let [inputError, setInputError] = useState<string | null>(null);

    /*Здесь не используем хук "useCallback()", так как указанную callback-функцию не передаем в какой-то дочерний
    компонент, а в HTML-элемент "span".*/
    const onActivateEditModeDoubleClick = () => {
        setEditMode(true);
        setNewNewInputText(inputText);
    };

    const onDeactivateEditModeBlur = useCallback(
        () => {
            if (inputError !== null) setInputError(null);

            if (newInputText !== '') {
                setEditMode(false);
                onInputChange(newInputText);
            } else {
                setInputError('Title is required');
            }
        },
        [onInputChange, newInputText, inputError]
    );

    const onInputTextChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => { setNewNewInputText(e.currentTarget.value) },
        []
    );

    const onDeactivateEditModeKeyDown = useCallback(
        (e: KeyboardEvent<HTMLInputElement>) => {
            if (inputError !== null) setInputError(null);

            if (e.ctrlKey && e.key === 'Enter' && newInputText !== '') {
                setEditMode(false);
                onInputChange(newInputText);
            } else if (e.ctrlKey && e.key === 'Enter' && newInputText === '') {
                setInputError('Title is required');
            }
        },
        [onInputChange, newInputText, inputError]
    );

    return editMode ?
        <TextField
            value={newInputText}
            autoFocus={true}
            onBlur={onDeactivateEditModeBlur}
            onChange={onInputTextChange}
            onKeyDown={onDeactivateEditModeKeyDown}
            error={!!inputError}
            helperText={inputError}
            sx={{
                /*Стили для outlined.*/
                '& .MuiOutlinedInput-root': {
                    /*Цвет рамки по умолчанию.*/
                    '& fieldset': {borderColor: '#e7ba86'},
                    /*Цвет рамки при наведении.*/
                    '&:hover fieldset': {borderColor: '#7d5222'},
                    /*Цвет рамки при фокусе.*/
                    '&.Mui-focused fieldset': {borderColor: '#7d5222'},
                    /*Цвет рамки при ошибке.*/
                    '&.Mui-error fieldset': {borderColor: '#f85e1c'}
                },

                /*Стили для текста label.*/
                '& .MuiInputLabel-root': {
                    /*Цвет текста по умолчанию.*/
                    color: 'gray',
                    /*Цвет текста при фокусе.*/
                    '&.Mui-focused': {color: '#7d5222'},
                    /*Цвет текста при ошибке.*/
                    '&.Mui-error': {color: '#f85e1c'}
                },

                /*Стили для текста ошибки.*/
                '& .MuiFormHelperText-root.Mui-error': {
                    /*Цвет текста ошибки.*/
                    color: inputError ? '#f85e1c' : 'inherit'
                }
            }}
        /> :
        <span onDoubleClick={onActivateEditModeDoubleClick}>{inputText}</span>
});