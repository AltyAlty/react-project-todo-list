import {combineReducers, createStore} from 'redux';
import {todolistID1, todolistID2, todolistID3, todolistsReducer} from '../../state/todolists-reducer';
import {tasksReducer} from '../../state/tasks-reducer';
import {v1} from 'uuid';
import {AppRootState} from '../../state/store';
import {Provider} from 'react-redux';

const rootReducer = combineReducers(
    {
        tasks: tasksReducer,
        todolists: todolistsReducer
    }
);

const initialGlobalState = {
    todolists: [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'active'},
        {id: todolistID3, title: 'What to sell', filter: 'complete'},
    ],

    tasks: {
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: false},
            {id: v1(), title: 'REACT', isDone: false},
            {id: v1(), title: 'REDUX', isDone: false},
        ],

        [todolistID2]: [
            {id: v1(), title: 'OK', isDone: true},
            {id: v1(), title: 'KEK', isDone: false},
        ],

        [todolistID3]: [
            {id: v1(), title: 'NOT_OK', isDone: false},
            {id: v1(), title: 'LOL', isDone: true},
        ],
    }
};

// @ts-ignore
export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootState);

/*В данном декораторе имитируем наш "store", указывая его начальное состояние. Декоратор на входе принимает какую-то
историю и "декорирует" ее какими-то данными.*/
export const ReduxStoreProviderDecorator = (storyFn: any) => {
    return <Provider store={storyBookStore}>
        {storyFn()}
    </Provider>
};

