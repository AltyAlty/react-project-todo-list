import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import reportWebVitals from './reportWebVitals';
import './index.css';
// import App from './App';
// import App from './AppWithReducers';
// import App from './AppWithRedux';
import App from './AppWithReduxNoTasks';
import {store} from './state/store';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
console.log(process.env.NODE_ENV); // 'development'

/*Включаем режим "StrictMode" только в режиме разработки приложения. Во время этого режима все компоненты запускаются по
два раза. Также подключаем глобальный store из Redux при помощи компонента "Provider" из React Redux. Любой компонент в
дереве сможет использовать этот глобальный store из Redux.*/
if (process.env.NODE_ENV === 'development') {
    root.render(
        <React.StrictMode>
            <Provider store={store}>
                <App/>
            </Provider>
        </React.StrictMode>
    );
} else {
    root.render(
        <Provider store={store}>
            <App/>
        </Provider>
    );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();