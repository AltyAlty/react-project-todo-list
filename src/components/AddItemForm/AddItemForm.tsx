import React, {ChangeEvent, KeyboardEvent, useCallback, useState} from 'react';
import {Grid, IconButton, TextField, Tooltip} from '@mui/material';
import {ControlPoint} from '@mui/icons-material';

export type AddItemFormPropsType = {
    addItem: (title: string) => void
    itemType: string
    buttonVariant: 'standard' | 'outlined' | 'filled'
};

export const AddItemForm = React.memo(({addItem, itemType, buttonVariant}: AddItemFormPropsType) => {
    console.log('AddItemForm has been called');
    let [newTitle, setNewTitle] = useState<string>('');
    let [inputError, setInputError] = useState<string | null>(null);

    /*Здесь в зависимостях пусто, так как указанная callback-функция не использует данные из props, данные из локального
    state или dispatch-функцию.*/
    const onNewTitleChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => { setNewTitle(e.currentTarget.value) },
        []
    );

    /*Указываем в зависимостях "newTitle" и "inputError", так как они берутся из локального state.*/
    const onNewTitleKeyPress = useCallback(
        (e: KeyboardEvent<HTMLInputElement>) => {
            /*Это условие нужно, чтобы избежать лишних перерисовок, когда мы зануляем ошибку, хотя ее и не было.*/
            if (inputError !== null) setInputError(null);

            if (e.ctrlKey && e.key === 'Enter' && newTitle !== '') {
                addItem(newTitle);
                setNewTitle('');
            } else if (e.ctrlKey && e.key === 'Enter' && newTitle === '') {
                setInputError('Title is required');
            }
        },
        [addItem, newTitle, inputError]
    );

    const onAddItemClick = useCallback(
        () => {
            if (inputError !== null) setInputError(null);

            if (newTitle.trim() !== '') {
                addItem(newTitle);
                setNewTitle('');
            } else {
                setInputError('Title is required');
            }
        },
        [addItem, newTitle, inputError]
    );

    return <div>
        <Grid container alignItems="center">
            <Grid item>
                <TextField variant={`${buttonVariant}`}
                           label={`New ${itemType}`}
                           value={newTitle}
                           onChange={onNewTitleChange}
                           onKeyDown={onNewTitleKeyPress}
                           error={!!inputError}
                           helperText={inputError}
                           style={{height: '56px'}}
                           sx={{
                               /*Стили для outlined. "& fieldset" - это стили для внутреннего элемента "fieldset",
                               который отвечает за отрисовку рамки.*/
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

                               /*Стили для filled. В Material-UI псевдоэлементы "::before" и "::after" используются для
                               создания анимаций и стилей нижней полоски (underline) у компонента "FilledInput".*/
                               '& .MuiFilledInput-root': {
                                   /*Цвет фона по умолчанию.*/
                                   backgroundColor: '#fde3d2',
                                   /*Размер, тип и цвет нижней полоски без фокуса.*/
                                   '&::before': {borderBottom: '3px solid #e7ba86'},
                                   /*Цвет фона при наведении.*/
                                   '&:hover': {backgroundColor: '#faddca'},
                                   '&.Mui-focused': {
                                       /*Цвет фона при фокусе.*/
                                       backgroundColor: '#faddca',
                                       /*Размер, тип и цвет нижней полоски при фокусе.*/
                                       '&::after': {borderBottom: '3px solid #7d5222'}
                                   },
                                   '&.Mui-error': {
                                       /*Цвет фона при ошибке.*/
                                       backgroundColor: '#faddca',
                                       /*Размер, тип и цвет нижней полоски при ошибке без фокуса.*/
                                       '&::before': {borderBottom: '1px solid #f85e1c'},
                                       /*Размер, тип и цвет нижней полоски при ошибке при фокусе.*/
                                       '&::after': {borderBottom: '3px solid #f85e1c'}
                                   },
                                   /*Убирает черную нижнюю полоску в 1 пиксель при первой загрузке приложения.*/
                                   '&:hover:not(.Mui-disabled, .Mui-error):before': {borderBottom: '3px solid #7d5222'}
                               },

                               /*Стили для нижней полоски filled при потере фокуса.*/
                               '& .MuiFilledInput-underline:after': {
                                   /*Цвет сворачивающейся нижней полоски при потере фокуса.*/
                                   borderBottomColor: '#7d5222'
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
                />
            </Grid>

            <Grid item>
                <Tooltip title={`Press Ctrl+Enter to add ${itemType}`} style={{color: '#fcece1'}}>
                    <IconButton onClick={onAddItemClick} style={{color: '#7d5222'}}>
                        <ControlPoint/>
                    </IconButton>
                </Tooltip>
            </Grid>
        </Grid>
    </div>
});