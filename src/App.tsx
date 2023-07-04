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

    function changeTaskStatus(taskID: string, isDone: boolean) {
        let task = tasks.find((t) => t.id === taskID);

        if (task) {
            task.isDone = isDone;
        }

        /*При помощи "..." делаем деструктуризацию массива, то кладем в новый массив элементы
        * другого уже существующего массива, чтобы потом передать новый массив в "setTasks()", так как
        * только в этом случае хук "useState()" зарегистрирует изменение и сделает ререндер.*/
        setTasks([...tasks]);
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
                changeTaskStatus={changeTaskStatus}
                filter={filter}
            />
        </div>
    );
};

export default App;