import {ChangeEvent} from 'react';
import {FilterValuesType} from '../../App';
import {AddItemForm} from '../AddItemForm/AddItemForm';
import {EditableSpan} from '../EditableSpan/EditableSpan';
import {Button, Checkbox, Container, Grid, IconButton} from '@mui/material';
import {Delete} from '@mui/icons-material';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
};

type PropsType = {
    id: string
    title: string
    filter: FilterValuesType
    tasks: Array<TaskType>
    addTask: (title: string, todolistID: string) => void
    changeTaskTitle: (newTitleValue: string, taskID: string, todolistID: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean, todolistID: string) => void
    removeTask: (id: string, todolistID: string) => void
    changeTodolistTitle: (newTitleValue: string, todolistID: string) => void
    changeFilter: (value: FilterValuesType, todolistID: string) => void
    removeTodolist: (todolistID: string) => void
};

export const Todolist = (props: PropsType) => {
    const onAllFilterClick = () => { props.changeFilter('all', props.id) };
    const onActiveFilterClick = () => { props.changeFilter('active', props.id) };
    const onCompleteFilterClick = () => { props.changeFilter('complete', props.id) };
    const onTodolistTitleChange = (newTitleValue: string) => { props.changeTodolistTitle(newTitleValue, props.id) };
    const onRemoveTodolistClick = () => { props.removeTodolist(props.id) };
    const addTask = (title: string) => { props.addTask(title, props.id) };

    return <div>
        <Container fixed>
            <Grid container direction='column' alignItems='flex-start'>
                <Grid item style={{alignSelf: 'center'}}>
                    <h3>
                        <EditableSpan inputText={props.title} onInputChange={onTodolistTitleChange}/>

                        <IconButton aria-label={'delete'} onClick={onRemoveTodolistClick} style={{color: '#7d5222'}}>
                            <Delete/>
                        </IconButton>
                    </h3>
                </Grid>

                <Grid item style={{marginBottom: '16px'}}>
                    <AddItemForm addItem={addTask} itemType='task' buttonVariant='outlined'/>
                </Grid>

                <Grid item style={{marginTop: '16px'}}>
                    <Grid container>
                        <Grid item>
                            <Button variant={props.filter === 'all' ? 'contained' : 'text'}
                                    style={props.filter === 'all' ?
                                        {width: '100px', backgroundColor: '#7d5222', color: '#fcece1'} :
                                        {width: '100px', backgroundColor: '#fcece1', color: '#7d5222'}}
                                    onClick={onAllFilterClick}>All
                            </Button>
                        </Grid>

                        <Grid item style={{marginLeft: '6px', marginRight: '6px'}}>
                            <Button variant={props.filter === 'active' ? 'contained' : 'text'}
                                    style={props.filter === 'active' ?
                                        {width: '100px', backgroundColor: '#81a94d', color: '#fcece1'} :
                                        {width: '100px', backgroundColor: '#fcece1', color: '#81a94d'}}
                                    onClick={onActiveFilterClick}>Active
                            </Button>
                        </Grid>

                        <Grid item>
                            <Button variant={props.filter === 'complete' ? 'contained' : 'text'}

                                    style={props.filter === 'complete' ?
                                        {width: '100px', backgroundColor: '#65439d', color: '#fcece1'} :
                                        {width: '100px', backgroundColor: '#fcece1', color: '#65439d'}}
                                    onClick={onCompleteFilterClick}>Complete
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item style={{marginTop: '21px', marginBottom: '16px'}}>
                    <Grid container direction='column' alignItems='flex-start'>
                        {
                            props.tasks.map((t) => {
                                const onTaskTitleChange = (newTitleValue: string) => {
                                    props.changeTaskTitle(newTitleValue, t.id, props.id)
                                };

                                const onTaskStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
                                    /*"e.currentTarget.checked" будет меняться на противоположное значение в момент
                                    нажатия, так как чекбокс попробует измениться, поэтому в функцию будет приходить то
                                    значение, на которое мы хотим изменить чекбокс.*/
                                    props.changeTaskStatus(t.id, e.currentTarget.checked, props.id);
                                };

                                const onRemoveTaskClick = () => { props.removeTask(t.id, props.id) };

                                return <Grid item key={t.id} className={t.isDone ? 'is-done' : ''}>
                                    <Checkbox checked={t.isDone}
                                              style={{color: '#7d5222'}}
                                              onChange={onTaskStatusChange}
                                    />

                                    <EditableSpan inputText={t.title} onInputChange={onTaskTitleChange}/>

                                    <IconButton aria-label={'delete'}
                                                style={{color: '#7d5222'}}
                                                onClick={onRemoveTaskClick}>
                                        <Delete/>
                                    </IconButton>
                                </Grid>
                            })
                        }
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    </div>
};