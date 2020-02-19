import { createStore, applyMiddleware, compose } from 'redux';
import reducer from './reducer'
import thunk from 'redux-thunk'

//增强函数 一步方法，执行两个函数
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

//中间件 
const enhancer = composeEnhancers(applyMiddleware(thunk));

const store = createStore(
    reducer, /* preloadedState, */
    enhancer
);

export default store;