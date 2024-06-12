import {EditableSpan} from './EditableSpan';
import {action} from '@storybook/addon-actions';

export default {
    title: 'EditableSpan Component',
    component: EditableSpan,
};

const onInputChangeCallback = action('Span edited: ');

export const EditableSpanBaseExample = () => {
    return <EditableSpan inputText={'OK'} onInputChangeCallback={onInputChangeCallback}/>
};