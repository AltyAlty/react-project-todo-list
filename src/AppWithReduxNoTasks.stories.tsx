import AppWithReduxNoTasks from './AppWithReduxNoTasks';
import {ReduxStoreProviderDecorator} from './stories/decorators/ReduxStoreProviderDecorator';

/*Для создания историй для компонента "AppWithReduxNoTasks" нам нужен контекст, то есть нам нужно использовать
компонент "Provider" из React Redux. Но мы в данном случае будем использовать декоратор, чтобы передать в наш компонент
заранее заготовленный контекст.*/
export default {
    title: 'AppWithReduxNoTasks Component',
    component: AppWithReduxNoTasks,
    decorators: [ReduxStoreProviderDecorator]
};

export const AppWithReduxNoTasksBaseExample = () => <AppWithReduxNoTasks/>;