/*
yarn create react-app . --template typescript

yarn add uuid
yarn add @types/uuid
yarn add @mui/material @emotion/react @emotion/styled
yarn add @mui/icons-material
yarn add redux react-redux @types/react-redux
npx storybook@latest init
yarn add @storybook/addon-storysource --dev
yarn add axios

Storybook - это библиотека для изолированного создания компонентов и страниц пользовательского интерфейса. Storybook
можно использовать для разработки пользовательского интерфейса, тестирования и документирования. Storybook позволяет
проводить snapshot-тестирование, где каждый снимок (snapshot) это отдельная история (story). Storybook для своей работы
поднимает отдельный сервер и ведет себя как отдельное приложение. При изменении настроек в Storybook, его нужно
перезапускать. Для запуска есть команда "storybook", которая запускает команду "storybook dev -p 6006", а для того,
чтобы собрать приложение на основе вашего Storybook, например, чтобы поделиться им с вашей командой, есть команда
"build-storybook", которая запускает ккоманду "storybook build". В данном приложении мы храним истории, как и тесты,
в том же месте, где и сам компонент. В папке ".storybook" есть файл "main.ts", в котором можно указывать настроки вашего
Storybook и конфигурировать аддоны.
*/
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import AppWithReducers from './AppWithReducers';
import AppWithRedux from './AppWithRedux';
import {Provider} from 'react-redux';
import {store} from './state/store';
import AppWithReduxNoTasks from './AppWithReduxNoTasks';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        {/*Используем для подключения store из Redux. Любая компонента в дереве сможет его использовать.*/}
        <Provider store={store}>
            <AppWithReduxNoTasks/>
        </Provider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
