/*
yarn create react-app . --template typescript

yarn add uuid
yarn add @types/uuid
*/

import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = 'all' | 'active' | 'complete';

function App() {
    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: false},
        {id: v1(), title: 'REACT', isDone: false},
        {id: v1(), title: 'REDUX', isDone: false},
    ]);

    let [filter, setFilter] = useState<FilterValuesType>('all');

    function removeTask(id: string) {
        let filteredTasks = tasks.filter((t) => {
            return t.id !== id;
        });

        setTasks(filteredTasks);
    };

    function addTask(title: string) {
        let newTask = {id: v1(), title: title, isDone: false};
        let newTasks = [newTask, ...tasks];
        setTasks(newTasks);
    };

    function changeFilter(value: FilterValuesType) {
        setFilter(value);
    };

    let tasksForTodolist = tasks;

    if (filter === 'complete') {
        tasksForTodolist = tasks.filter((t) => {
            return t.isDone === true;
        });
    }

    if (filter === 'active') {
        tasksForTodolist = tasks.filter((t) => {
            return t.isDone === false;
        });
    }

    return (
        <div className='App'>
            <Todolist
                title={'What to learn'}
                tasks={tasksForTodolist}
                removeTasks={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
            />
        </div>
    );
};

export default App;