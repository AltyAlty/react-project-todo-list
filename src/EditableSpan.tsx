import {ChangeEvent, KeyboardEvent, useState} from 'react';
import {TextField} from '@mui/material';

type EditableSpanPropsType = {
    inputText: string
    onInputChangeCallback: (newTextValue: string) => void
};
export const EditableSpan = (props: EditableSpanPropsType) => {
    let [editMode, setEditMode] = useState<boolean>(false);
    let [inputText, setInputText] = useState<string>('');

    const activateEditMode = () => {
        setEditMode(true);
        setInputText(props.inputText);
    };

    const deactivateEditMode = () => {
        setEditMode(false);
        props.onInputChangeCallback(inputText);
    };

    const onChangeInputTextHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setInputText(e.currentTarget.value);
    };

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.ctrlKey === true && e.key === 'Enter') {
            setEditMode(false);
            props.onInputChangeCallback(inputText);
        }
    };

    return (
        editMode ?
            <TextField
                onBlur={deactivateEditMode}
                onChange={onChangeInputTextHandler}
                onKeyDown={onKeyDownHandler}
                value={inputText}
                autoFocus={true}
            /> :
            <span onDoubleClick={activateEditMode}>{props.inputText}</span>
    );
};