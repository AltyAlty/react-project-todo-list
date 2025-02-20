/*
Создание шаблона проекта: yarn create react-app . --template typescript

Установка uuid: yarn add uuid
Установка типов для uuid: yarn add @types/uuid
Установка Material UI: yarn add @mui/material @emotion/react @emotion/styled
Установка иконок из Material UI: yarn add @mui/icons-material
Установка Redux, React Redux и типов для них: yarn add redux react-redux @types/react-redux
Установка Storybook: npx storybook@latest init
Установка аддона Storysource для Storybook: yarn add @storybook/addon-storysource --dev
Установка аддона Chromatic для Storybook (не работает): yarn add @chromatic-com/storybook --dev
Установка аддона Docs для Storybook (не используется): yarn add @storybook/addon-docs --dev
Установка Axios: yarn add axios

Установка всех модулей (если необходимо): yarn install
Запуск приложения: yarn start
Запуск тестов: yarn test
Запуск Storybook: storybook dev -p 6006
Запуск Storybook для тестирования API через Axios: storybook dev -p 9009
Собрать билд Storybook: storybook build
*/

/*Файл "index.tsx" является точкой входа проекта.*/

/*Storybook - это библиотека для изолированного создания компонентов и страниц пользовательского интерфейса. Storybook
можно использовать для разработки пользовательского интерфейса, тестирования и документирования. Storybook позволяет
проводить snapshot-тестирование, где каждый снимок (snapshot) это отдельная история (story). Storybook для своей работы
поднимает отдельный сервер и ведет себя как отдельное приложение.

При изменении настроек в Storybook, его нужно перезапускать.

Для запуска есть команда "storybook", которая запускает команду "storybook dev -p 6006", а для того, чтобы собрать
приложение на основе вашего Storybook, например, чтобы поделиться им с вашей командой, есть команда "build-storybook",
запускающая команду "storybook build".

В данном приложении мы храним истории, как и тесты, в том же месте, где и сам компонент. В папке ".storybook" есть файл
"main.ts", в котором можно указывать настройки вашего Storybook и конфигурировать аддоны. Также в папке ".storybook"
можно создать файл "preview-head.html", чтобы подключить шрифты и стили.

Детали того как работать с Storybook можно посмотреть в файлах историй.

Аддон Storysource для Storybook позволяет видеть исходный код истории. Инструкция для аддона:
https://github.com/storybookjs/storybook/tree/next/code/addons/storysource

Аддона Chromatic для Storybook позволяет проводить визуальные тесты. Инструкция для аддона:
https://storybook.js.org/docs/writing-tests/visual-testing

API: https://social-network.samuraijs.com/docs?type=todolist
Инструкция по доступу к API: https://social-network.samuraijs.com/article/avtorizaciya_third_party_cookie_bearer_token
*/

/*В этом проекте есть несколько вариантов компонента "App", каждый вариант описывает разную версию приложения
касательно работы с данными и структуры приложения:

1. Компонент "App.tsx" создает локальный state при помощи хука "useState()" для хранения и управления данными по
листам и задачам. То есть этот компонент не использует глобальный store, action creators, редьюсеры или Redux.

Также этот компонент использует компонент "Todolist.tsx" для отрисовки листов с задачами, компонент "AddItemForm.tsx"
для создания новых листов, и готовые компоненты из библиотеки Material UI для структуризации интерфейса приложения.

Компоненты "AddItemForm.tsx" и "EditableSpan.tsx" используют хук "useCallback()", но это относится к четвертому варианту
компонента "App", хоть и приносит свою пользу в уменьшении лишних перерисовок другим версиям компонента "App", так как
они тоже используют компоненты "AddItemForm.tsx" и "EditableSpan.tsx".

Дерево компонентов:
App.tsx => Todolist.tsx
App.tsx => AddItemForm.tsx

           Todolist.tsx => AddItemForm.tsx
           Todolist.tsx => EditableSpan.tsx

2. Компонент "AppWithReducers.tsx" создает локальный state при помощи хука "useReducer()" и использует action creators
вместе с редьюсерами из файлов "todolists-reducer.ts" и "tasks-reducer.ts" для хранения и управления данными по листам и
задачам. То есть этот компонент не использует глобальный store или Redux. Хук "useState()" подходит для небольших данных
и данных связанных с UI, а хук "useReducer()" наоборот удобен для работы с большими данными и данными, связанными с
бизнес-логикой.

Также этот компонент использует компонент "Todolist.tsx" для отрисовки листов с задачами, компонент "AddItemForm.tsx"
для создания новых листов, и готовые компоненты из библиотеки Material UI для структуризации интерфейса приложения.

Компоненты "AddItemForm.tsx" и "EditableSpan.tsx" используют хук "useCallback()", но это относится к четвертому варианту
компонента "App", хоть и приносит свою пользу в уменьшении лишних перерисовок другим версиям компонента "App", так как
они тоже используют компоненты "AddItemForm.tsx" и "EditableSpan.tsx".

Дерево компонентов:
AppWithReducers.tsx => Todolist.tsx
AppWithReducers.tsx => AddItemForm.tsx

                       Todolist.tsx => AddItemForm.tsx
                       Todolist.tsx => EditableSpan.tsx

3. Компонент "AppWithRedux.tsx" для хранения и управления данными по листам и задачам получает нужные части глобального
store из Redux при помощи хука "useSelector()" и использует dispatch-функцию, созданную при помощи хука "useDispatch()",
целью которой является диспатчить action-объекты сразу в весь глобальный store из Redux, а не в какой-то отдельный
редьюсер. При помощи Redux все редьюсеры из файлов "todolists-reducer.ts" и "tasks-reducer.ts" комбинируются в единый
редьюсер, на основе которого создается глобальный store. Чтобы компоненту "App" был доступен глобальный store из Redux,
нужно обвернуть его в компонент "Provider" из React Redux, указав аттрибут "store={store}". То есть компонент
"AppWithRedux.tsx" не использует локальный state. Dispatch-функция, полученная при помощи хука "useSelector()", умеет
сама общаться за кадром с глобальным store из Redux.

Также этот компонент использует компонент "Todolist.tsx" для отрисовки листов с задачами, компонент "AddItemForm.tsx"
для создания новых листов, и готовые компоненты из библиотеки Material UI для структуризации интерфейса приложения.

Компоненты "AddItemForm.tsx" и "EditableSpan.tsx" используют хук "useCallback()", но это относится к четвертому варианту
компонента "App", хоть и приносит свою пользу в уменьшении лишних перерисовок другим версиям компонента "App", так как
они тоже используют компоненты "AddItemForm.tsx" и "EditableSpan.tsx".

Дерево компонентов:
AppWithRedux.tsx => Todolist.tsx
AppWithRedux.tsx => AddItemForm.tsx

                    Todolist.tsx => AddItemForm.tsx
                    Todolist.tsx => EditableSpan.tsx

4. Компонент "AppWithReduxNoTasks.tsx" для хранения и управления данными по листам и задачам делает то же самое, что и
компонент "AppWithRedux.tsx". Главное отличие компонента "AppWithReduxNoTasks.tsx" состоит в том, что он более
оптимизирован в плане лишних перерисовок. Его дочерние компоненты "TodolistWithTasks.tsx", "Task.tsx", "AddItemForm.tsx"
и "EditableSpan.tsx" обернуты в HOC "React.memo". Также в случае компонента "AppWithReduxNoTasks.tsx" по сравнению с
другими версиями компонента "App" была проведена работа по дроблению компонентов - был выделен компонент "Task.tsx".
Дробление на компоненты также уменьшает количество лишних перерисовок. Также в перечисленных компонентах используется
хук "useCallback()". Данный хук позволяет избежать лишних перерисовок, когда мы передаем в другие компоненты через props
callback-функции.

Также этот компонент использует компонент "TodolistWithTasks.tsx" для отрисовки листов с задачами, компонент
"AddItemForm.tsx" для создания новых листов, и готовые компоненты из библиотеки Material UI для структуризации
интерфейса приложения.

Дерево компонентов:
AppWithReduxNoTasks.tsx => TodolistWithTasks.tsx
AppWithReduxNoTasks.tsx => AddItemForm.tsx

                           TodolistWithTasks.tsx => Task.tsx
                           TodolistWithTasks.tsx => AddItemForm.tsx
                           TodolistWithTasks.tsx => EditableSpan.tsx

                                                    Task.tsx => EditableSpan.tsx*/

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