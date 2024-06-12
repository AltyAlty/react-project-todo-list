import {Task} from './Task';
import {action} from '@storybook/addon-actions';

export default {
    title: 'Task Component',
    component: Task,
};

const removeTaskCallback = action('Task removed: ');
const changeTaskStatusCallback = action('Status changed: ');
const changeTaskTitleCallback = action('Title changed: ');

export const TaskBaseExample = () => {
    return <>
        <Task
            key={'1'}
            task={{id: '1', title: 'OK', isDone: true}}
            todolistID={'todolistID1'}
            removeTask={removeTaskCallback}
            changeTaskStatus={changeTaskStatusCallback}
            changeTaskTitle={changeTaskTitleCallback}
        />

        <Task
            key={'2'}
            task={{id: '2', title: 'NOT OK', isDone: false}}
            todolistID={'todolistID2'}
            removeTask={removeTaskCallback}
            changeTaskStatus={changeTaskStatusCallback}
            changeTaskTitle={changeTaskTitleCallback}
        />
    </>
};