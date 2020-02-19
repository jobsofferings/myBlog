import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux'
// import Head from './page/head'
import todoApp from './store/reducer'
import MyRouter from './page/router'

const store = createStore(todoApp)

ReactDOM.render(
    <MyRouter store={store} />,
    document.getElementById('root')
);