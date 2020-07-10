import { createStore, applyMiddleware, compose } from 'redux';
import allReducer from './../reducers/index';
import thunk from 'redux-thunk';


const middleware = [thunk];

const store = createStore(
    allReducer,
  
    applyMiddleware(thunk),
  
);

export  {store};