import {combineReducers, createStore} from 'redux';
import {tasksReducer} from './tasks-reducer';
import {todolistsReducer} from './todolists-reducer';
import {TasksType, TodolistType} from '../AppWithRedux';

/*Собираем все наши редбюсеры в один. В итоге этот редьюсер будет раскидывать action-объекты в каждый редьюсер, а не в
какой-то конкретный.*/
export const rootReducer = combineReducers(
    {
        tasks: tasksReducer,
        todolists: todolistsReducer
    }
);

// export type AppRootState = {
//     todolists: Array<TodolistType>,
//     tasks: TasksType
// };

export type AppRootState = ReturnType<typeof rootReducer>;

/*Создание store в Redux. В Redux есть объект store, в котором всегда есть один объект state. Store может
преобразовывать state при помощи редьюсеров. Также в store есть и другие методы. React-Redux соединяет React и Redux, в
нем есть хуки и функция "connect()".*/
export const store = createStore(rootReducer);

// @ts-ignore
window.store = store; // Это чтобы в консоли работать со store.