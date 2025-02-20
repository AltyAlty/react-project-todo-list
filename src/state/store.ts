import {combineReducers, createStore} from 'redux';
import {todolistsReducer} from './todolists-reducer';
import {tasksReducer} from './tasks-reducer';
import {TasksType, TodolistType} from '../AppWithRedux';

/*Собираем все наши редьюсеры в один. Итоговый редьюсер будет раскидывать action-объекты в каждый редьюсер, а не в
какой-то конкретный.*/
export const rootReducer = combineReducers({tasks: tasksReducer, todolists: todolistsReducer});

/*Выводим тип итогового редьюсера. Это понадобиться в хуке "useSelector()" для уточнения глобального store из Redux.*/
// export type AppRootState = { todolists: Array<TodolistType>, tasks: TasksType };
export type AppRootState = ReturnType<typeof rootReducer>;

/*Создаем глобальный store в Redux. В Redux есть объект store, в котором всегда есть один объект state. Store может
преобразовывать state при помощи редьюсеров. Также в store есть и другие методы. React Redux соединяет React и Redux. В
Redux есть хуки и, например, функция "connect()". Вместо функции "createStore()" лучше использовать функцию
"configureStore" из библиотеки Redux Toolkit: yarn add @reduxjs/toolkit react-redux.*/
export const store = createStore(rootReducer);

// @ts-ignore
window.store = store; // Это нужно, чтобы в консоли работать со store.