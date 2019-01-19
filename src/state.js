import { createStore, combineReducers, applyMiddleware } from 'redux';
import formReducer from './reducers/formReducer';
import newelemReducer from './reducers/newelemReducer';
const reducer = combineReducers({
    newelem: newelemReducer,
    form: formReducer
})

const middleWare = store => next => action => { next(action); }
const savedForm = localStorage && localStorage.getItem('managerform') && JSON.parse(localStorage.getItem('managerform')).form || [];

const fromMiddleware = applyMiddleware(middleWare)(createStore);
const store = fromMiddleware(reducer, {
    newelem: { title: 'текст', node: 'input', id: '', type: 'text', required: false, placeholder: '', stored: false, dragged: false },
    form: savedForm
});

export default store;