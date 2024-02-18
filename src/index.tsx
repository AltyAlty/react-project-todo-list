/*
yarn create react-app . --template typescript

yarn add uuid
yarn add @types/uuid
yarn add @mui/material @emotion/react @emotion/styled
yarn add @mui/icons-material
yarn add redux react-redux @types/react-redux
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
