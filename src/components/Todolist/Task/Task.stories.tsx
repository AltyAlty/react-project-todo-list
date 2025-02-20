import {Task} from './Task';
import {action} from '@storybook/addon-actions';

export default {title: 'Task Component', component: Task};
const removeTaskCallback = action('Task removed: ');
const changeTaskStatusCallback = action('Status changed: ');
const changeTaskTitleCallback = action('Title changed: ');

export const TaskBaseExample = () => {
    return <>
        <Task
            key={'1'}
            task={{id: '1', title: 'Soul', isDone: true}}
            todolistID={'todolistID1'}
            changeTaskTitle={changeTaskTitleCallback}
            changeTaskStatus={changeTaskStatusCallback}
            removeTask={removeTaskCallback}
        />

        <Task
            key={'2'}
            task={{id: '2', title: 'GTX 6090', isDone: false}}
            todolistID={'todolistID2'}
            changeTaskTitle={changeTaskTitleCallback}
            changeTaskStatus={changeTaskStatusCallback}
            removeTask={removeTaskCallback}
        />
    </>
};