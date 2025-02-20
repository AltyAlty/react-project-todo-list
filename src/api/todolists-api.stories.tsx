import React, {useEffect, useState} from 'react';
import {TodolistAPIType, TaskAPIType, todolistsAPI, UpdateTaskAPIModelType} from './todolists-api';

export default {title: 'API'};

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null);

    useEffect(() => {
        todolistsAPI.getTodolists()
            .then((res) => {
                setState(res.data);
            })
            .catch((error) => {
                console.log('error: ', error);
            });
    }, []);

    return <div>
        <div>RAW DATA:</div>
        <br/>
        <div>{JSON.stringify(state)}</div>
        <hr/>

        <div>TODOLISTS:</div>
        <br/>
        {state && state.map((tl: TodolistAPIType) => (
            <div key={tl.id}>
                <div>Todolist id: {JSON.stringify(tl.id)}</div>
                <div>Todolist title: {JSON.stringify(tl.title)}</div>
                <div>Todolist addedDate: {JSON.stringify(tl.addedDate)}</div>
                <div>Todolist order: {JSON.stringify(tl.order)}</div>
                <br/>
            </div>
        ))}
    </div>
};

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null);
    const [todolistTitle, setTodolistTitle] = useState<string>('');

    // useEffect(() => {
    //     const todolistTitle = 'OK';
    //
    //     todolistsAPI.createTodolist(todolistTitle)
    //         .then((res) => {
    //             setState(res.data);
    //         })
    //         .catch((error) => {
    //             console.log('error: ', error);
    //         });
    // }, []);

    const createTodolistCallback = () => {
        todolistsAPI.createTodolist(todolistTitle)
            .then((res) => {
                setState(res.data);
            })
            .catch((error) => {
                console.log('error: ', error);
            });
    };

    return <div>
        <div>
            <input placeholder={'todolistTitle'} value={todolistTitle}
                   onChange={(e) => setTodolistTitle(e.currentTarget.value)}/>
            <button onClick={createTodolistCallback}>Create todolist</button>
        </div>

        <hr/>
        <div>RAW DATA:</div>
        <br/>
        <div>{JSON.stringify(state)}</div>
        <hr/>

        <div>CREATED TODOLIST:</div>
        <br/>
        {state && <div>
            <div>Created todolist data: {JSON.stringify(state.data)}</div>
            <div>Created todolist data.item: {JSON.stringify(state.data.item)}</div>
            <div>Created todolist data.item.id: {JSON.stringify(state.data.item.id)}</div>
            <div>Created todolist data.item.title: {JSON.stringify(state.data.item.title)}</div>
            <div>Created todolist data.item.addedDate: {JSON.stringify(state.data.item.addedDate)}</div>
            <div>Created todolist data.item.order: {JSON.stringify(state.data.item.order)}</div>
            <div>Created todolist messages: {JSON.stringify(state.messages)}</div>
            <div>Created todolist fieldsErrors: {JSON.stringify(state.fieldsErrors)}</div>
            <div>Created todolist resultCode: {JSON.stringify(state.resultCode)}</div>
        </div>}
    </div>
};

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null);
    const [todolistID, setTodolistID] = useState<string>('');

    // useEffect(() => {
    //     const todolistID = '';
    //
    //     todolistsAPI.deleteTodolist(todolistID)
    //         .then((res) => {
    //             setState(res.data);
    //         })
    //         .catch((error) => {
    //             console.log('error: ', error);
    //         });
    // }, []);

    const deleteTodolistCallback = () => {
        todolistsAPI.deleteTodolist(todolistID)
            .then((res) => {
                setState(res.data);
            })
            .catch((error) => {
                console.log('error: ', error);
            });
    };

    return <div>
        <div>
            <input placeholder={"todolistID"} value={todolistID}
                   onChange={(e) => setTodolistID(e.currentTarget.value)}/>
            <button onClick={deleteTodolistCallback}>Delete todolist</button>
        </div>

        <hr/>
        <div>RAW DATA:</div>
        <br/>
        <div>{JSON.stringify(state)}</div>
        <hr/>

        <div>DELETED TODOLIST:</div>
        <br/>
        {state && <div>
            <div>Deleted todolist data: {JSON.stringify(state.data)}</div>
            <div>Deleted todolist messages: {JSON.stringify(state.messages)}</div>
            <div>Deleted todolist fieldsErrors: {JSON.stringify(state.fieldsErrors)}</div>
            <div>Deleted todolist resultCode: {JSON.stringify(state.resultCode)}</div>
        </div>}
    </div>
};

export const UpdateTodolist = () => {
    const [state, setState] = useState<any>(null);
    const [todolistID, setTodolistID] = useState<string>('');
    const [todolistTitle, setTodolistTitle] = useState<string>('');

    // useEffect(() => {
    //     const todolistID = '';
    //     const todolistTitle = 'NOT_OK';
    //
    //     todolistsAPI.updateTodolist(todolistID, todolistTitle)
    //         .then((res) => {
    //             setState(res.data);
    //         })
    //         .catch((error) => {
    //             console.log('error: ', error);
    //         });
    // }, []);

    const updateTodolistCallback = () => {
        todolistsAPI.updateTodolist(todolistID, todolistTitle)
            .then((res) => {
                setState(res.data);
            })
            .catch((error) => {
                console.log('error: ', error);
            });
    };

    return <div>
        <div>
            <input placeholder={"todolistID"} value={todolistID}
                   onChange={(e) => setTodolistID(e.currentTarget.value)}/>
            <input placeholder={"todolistTitle"} value={todolistTitle}
                   onChange={(e) => setTodolistTitle(e.currentTarget.value)}/>
            <button onClick={updateTodolistCallback}>Update todolist</button>
        </div>

        <hr/>
        <div>RAW DATA:</div>
        <br/>
        <div>{JSON.stringify(state)}</div>
        <hr/>

        <div>UPDATED TODOLIST:</div>
        <br/>
        {state && <div>
            <div>Created todolist data: {JSON.stringify(state.data)}</div>
            <div>Created todolist messages: {JSON.stringify(state.messages)}</div>
            <div>Created todolist fieldsErrors: {JSON.stringify(state.fieldsErrors)}</div>
            <div>Created todolist resultCode: {JSON.stringify(state.resultCode)}</div>
        </div>}
    </div>
};

export const GetTasks = () => {
    const [state, setState] = useState<any>(null);
    const [todolistID, setTodolistID] = useState<string>('');

    // useEffect(() => {
    //     const todolistID = '';
    //
    //     todolistsAPI.getTasks(todolistID)
    //         .then((res) => {
    //             setState(res.data);
    //         })
    //         .catch((error) => {
    //             console.log('error: ', error);
    //         });
    // }, []);

    const getTasksCallback = () => {
        todolistsAPI.getTasks(todolistID)
            .then((res) => {
                setState(res.data);
            })
            .catch((error) => {
                console.log('error: ', error);
            });
    };

    return <div>
        <div>
            <input placeholder={"todolistID"} value={todolistID}
                   onChange={(e) => setTodolistID(e.currentTarget.value)}/>
            <button onClick={getTasksCallback}>Get tasks</button>
        </div>

        <hr/>
        <div>RAW DATA:</div>
        <br/>
        <div>{JSON.stringify(state)}</div>
        <hr/>

        <div>TASKS:</div>
        <br/>
        {state && <div>
            <div>Tasks items: {JSON.stringify(state.items)}</div>
            <br/>

            {state && state.items.length !== 0 && state.items.map((t: TaskAPIType) => (
                <div key={t.id}>
                    <div>Task items.id: {JSON.stringify(t.id)}</div>
                    <div>Task items.title: {JSON.stringify(t.title)}</div>
                    <div>Task items.description: {JSON.stringify(t.description)}</div>
                    <div>Task items.todoListId: {JSON.stringify(t.todoListId)}</div>
                    <div>Task items.order: {JSON.stringify(t.order)}</div>
                    <div>Task items.status: {JSON.stringify(t.status)}</div>
                    <div>Task items.priority: {JSON.stringify(t.priority)}</div>
                    <div>Task items.startDate: {JSON.stringify(t.startDate)}</div>
                    <div>Task items.deadline: {JSON.stringify(t.deadline)}</div>
                    <div>Task items.addedDate: {JSON.stringify(t.addedDate)}</div>
                    <br/>
                </div>
            ))}

            <div>Tasks totalCount: {JSON.stringify(state.totalCount)}</div>
            <div>Tasks error: {JSON.stringify(state.error)}</div>
        </div>}
    </div>
};

export const CreateTask = () => {
    const [state, setState] = useState<any>(null);
    const [todolistID, setTodolistID] = useState<string>('');
    const [taskTitle, setTaskTitle] = useState<string>('');

    // useEffect(() => {
    //     const todolistID = '';
    //     const taskTitle = 'OK';
    //
    //     todolistsAPI.createTask(todolistID, taskTitle)
    //         .then((res) => {
    //             setState(res.data);
    //         })
    //         .catch((error) => {
    //             console.log('error: ', error);
    //         });
    // }, []);

    const createTaskCallback = () => {
        todolistsAPI.createTask(todolistID, taskTitle)
            .then((res) => {
                setState(res.data);
            })
            .catch((error) => {
                console.log('error: ', error);
            });
    };

    return <div>
        <div>
            <input placeholder={"todolistID"} value={todolistID}
                   onChange={(e) => setTodolistID(e.currentTarget.value)}/>
            <input placeholder={"taskTitle"} value={taskTitle}
                   onChange={(e) => setTaskTitle(e.currentTarget.value)}/>
            <button onClick={createTaskCallback}>Create task</button>
        </div>

        <hr/>
        <div>RAW DATA:</div>
        <br/>
        <div>{JSON.stringify(state)}</div>
        <hr/>

        <div>CREATED TASK:</div>
        <br/>
        {state && <div>
            <div>Created task data: {JSON.stringify(state.data)}</div>
            <div>Created task data.item: {JSON.stringify(state.data.item)}</div>
            <div>Created task data.item.id: {JSON.stringify(state.data.item.id)}</div>
            <div>Created task data.item.title: {JSON.stringify(state.data.item.title)}</div>
            <div>Created task data.item.description: {JSON.stringify(state.data.item.description)}</div>
            <div>Created task data.item.todoListId: {JSON.stringify(state.data.item.todoListId)}</div>
            <div>Created task data.item.order: {JSON.stringify(state.data.item.order)}</div>
            <div>Created task data.item.status: {JSON.stringify(state.data.item.status)}</div>
            <div>Created task data.item.priority: {JSON.stringify(state.data.item.priority)}</div>
            <div>Created task data.item.startDate: {JSON.stringify(state.data.item.startDate)}</div>
            <div>Created task data.item.deadline: {JSON.stringify(state.data.item.deadline)}</div>
            <div>Created task data.item.addedDate: {JSON.stringify(state.data.item.addedDate)}</div>
            <div>Created task messages: {JSON.stringify(state.messages)}</div>
            <div>Created task fieldsErrors: {JSON.stringify(state.fieldsErrors)}</div>
            <div>Created task resultCode: {JSON.stringify(state.resultCode)}</div>
        </div>}
    </div>
};

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null);
    const [todolistID, setTodolistID] = useState<string>('');
    const [taskID, setTaskID] = useState<string>('');

    // useEffect(() => {
    //     const todolistID = '';
    //     const taskID = '';
    //
    //     todolistsAPI.deleteTask(todolistID, taskID)
    //         .then((res) => {
    //             setState(res.data);
    //         })
    //         .catch((error) => {
    //             console.log('error: ', error);
    //         });
    // }, []);

    const deleteTaskCallback = () => {
        todolistsAPI.deleteTask(todolistID, taskID)
            .then((res) => {
                setState(res.data);
            })
            .catch((error) => {
                console.log('error: ', error);
            });
    };

    return <div>
        <div>
            <input placeholder={"todolistID"} value={todolistID}
                   onChange={(e) => setTodolistID(e.currentTarget.value)}/>
            <input placeholder={"taskID"} value={taskID} onChange={(e) => setTaskID(e.currentTarget.value)}/>
            <button onClick={deleteTaskCallback}>Delete task</button>
        </div>

        <hr/>
        <div>RAW DATA:</div>
        <br/>
        <div>{JSON.stringify(state)}</div>
        <hr/>

        <div>DELETED TASK:</div>
        <br/>
        {state && <div>
            <div>Deleted task data: {JSON.stringify(state.data)}</div>
            <div>Deleted task messages: {JSON.stringify(state.messages)}</div>
            <div>Deleted task fieldsErrors: {JSON.stringify(state.fieldsErrors)}</div>
            <div>Deleted task resultCode: {JSON.stringify(state.resultCode)}</div>
        </div>}
    </div>
};

export const UpdateTask = () => {
    const [state, setState] = useState<any>(null);
    const [todolistID, setTodolistID] = useState<string>('');
    const [taskID, setTaskID] = useState<string>('');
    const [taskTitle, setTaskTitle] = useState<string>('');
    const [taskDescription, setTaskDescription] = useState<string>('');
    const [taskCompleted, setTaskCompleted] = useState<boolean>(false);
    const [taskStatus, setTaskStatus] = useState<number>(0);
    const [taskPriority, setTaskPriority] = useState<number>(0);
    const [taskStartDate, setTaskStartDate] = useState<string>('');
    const [taskDeadline, setTaskDeadline] = useState<string>('');

    const updateTaskCallback = () => {
        const tempTaskModel = {
            title: taskTitle,
            description: taskDescription,
            completed: taskCompleted,
            status: taskStatus,
            priority: taskPriority,
            startDate: taskStartDate,
            deadline: taskDeadline,
        };

        todolistsAPI.updateTask(todolistID, taskID, tempTaskModel)
            .then((res) => {
                setState(res.data);
            })
            .catch((error) => {
                console.log('error: ', error);
            });
    };

    return <div>
        <div>
            <div>
                <input placeholder={"todolistID"} value={todolistID}
                       onChange={(e) => setTodolistID(e.currentTarget.value)}/>
            </div>

            <div>
                <input placeholder={"taskID"} value={taskID}
                       onChange={(e) => setTaskID(e.currentTarget.value)}/>
            </div>

            <div>
                taskTitle <input placeholder={"taskTitle"} value={taskTitle}
                                 onChange={(e) => setTaskTitle(e.currentTarget.value)}/>
            </div>

            <div>
                taskDescription <input placeholder={"taskDescription"} value={taskDescription}
                                       onChange={(e) => setTaskDescription(e.currentTarget.value)}/>
            </div>

            {/*<div>*/}
            {/*    taskCompleted <input placeholder={"taskCompleted"} checked={taskCompleted} type="checkbox"*/}
            {/*                         onChange={(e) => setTaskCompleted(e.currentTarget.checked)}/>*/}
            {/*</div>*/}

            <div>
                taskStatus <input placeholder={"taskStatus"} value={taskStatus}
                                  onChange={(e) => setTaskStatus(+e.currentTarget.value)}/>
            </div>

            <div>
                taskPriority <input placeholder={"taskPriority"} value={taskPriority}
                                    onChange={(e) => setTaskPriority(+e.currentTarget.value)}/>
            </div>

            {/*<div>*/}
            {/*    taskStartDate <input placeholder={"taskStartDate"} value={taskStartDate}*/}
            {/*                         onChange={(e) => setTaskStartDate(e.currentTarget.value)}/>*/}
            {/*</div>*/}

            {/*<div>*/}
            {/*    taskDeadline <input placeholder={"taskDeadline"} value={taskDeadline}*/}
            {/*                        onChange={(e) => setTaskDeadline(e.currentTarget.value)}/>*/}
            {/*</div>*/}

            <button onClick={updateTaskCallback}>Update task</button>
        </div>

        <hr/>
        <div>RAW DATA:</div>
        <br/>
        <div>{JSON.stringify(state)}</div>
        <hr/>

        <div>UPDATED TASK:</div>
        <br/>
        {state && <div>
            <div>Updated task data: {JSON.stringify(state.data)}</div>

            {state.data.item && <div>
                <div>Updated task data.item: {JSON.stringify(state.data.item)}</div>
                <div>Updated task data.item.id: {JSON.stringify(state.data.item.id)}</div>
                <div>Updated task data.item.title: {JSON.stringify(state.data.item.title)}</div>
                <div>Updated task data.item.description: {JSON.stringify(state.data.item.description)}</div>
                <div>Updated task data.item.todoListId: {JSON.stringify(state.data.item.todoListId)}</div>
                <div>Updated task data.item.order: {JSON.stringify(state.data.item.order)}</div>
                <div>Updated task data.item.status: {JSON.stringify(state.data.item.status)}</div>
                <div>Updated task data.item.priority: {JSON.stringify(state.data.item.priority)}</div>
                <div>Updated task data.item.startDate: {JSON.stringify(state.data.item.startDate)}</div>
                <div>Updated task data.item.deadline: {JSON.stringify(state.data.item.deadline)}</div>
                <div>Updated task data.item.addedDate: {JSON.stringify(state.data.item.addedDate)}</div>
            </div>}

            <div>Updated task messages: {JSON.stringify(state.messages)}</div>
            <div>Updated task fieldsErrors: {JSON.stringify(state.fieldsErrors)}</div>
            <div>Updated task resultCode: {JSON.stringify(state.resultCode)}</div>
        </div>}
    </div>
};