/*В данном декораторе имитируем наш глобальный store из Redux, указывая его начальное состояние. Декоратор на входе
принимает какую-то историю и "декорирует" ее какими-то данными.*/

import {ReactElement, JSXElementConstructor, ReactNode, ReactPortal} from 'react';
import {combineReducers, createStore} from 'redux';
import {Provider} from 'react-redux';
import {v1} from 'uuid';
import {todolistID1, todolistID2, todolistID3, todolistsReducer} from '../../state/todolists-reducer';
import {tasksReducer} from '../../state/tasks-reducer';
import {AppRootState} from '../../state/store';

const rootReducer = combineReducers({tasks: tasksReducer, todolists: todolistsReducer});

const initialGlobalState = {
    todolists: [
        {id: todolistID1, title: 'TO STUDY', filter: 'all'},
        {id: todolistID2, title: 'TO BUY', filter: 'active'},
        {id: todolistID3, title: 'TO SELL', filter: 'complete'},
    ],

    tasks: {
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'Javascript', isDone: true},
            {id: v1(), title: 'Typescript', isDone: false},
            {id: v1(), title: 'React', isDone: false},
            {id: v1(), title: 'Redux', isDone: false},
        ],

        [todolistID2]: [
            {id: v1(), title: 'GTX 6090', isDone: false},
            {id: v1(), title: '8K Monitor', isDone: true},
        ],

        [todolistID3]: [
            {id: v1(), title: 'Old PC', isDone: false},
            {id: v1(), title: 'Soul', isDone: true},
        ],
    }
};

// @ts-ignore
export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootState);

type StoryFnType = () => string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> |
    Iterable<ReactNode> | ReactPortal | null | undefined;

export const ReduxStoreProviderDecorator = (storyFn: StoryFnType) => {
    return <Provider
        store={storyBookStore}> {storyFn()}
    </Provider>;
};