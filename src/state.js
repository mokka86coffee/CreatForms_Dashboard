import { createStore, combineReducers, applyMiddleware } from 'redux';
//reducers
import formReducer from './reducers/formReducer';
import newelemReducer from './reducers/newelemReducer';
import apiNovawebReducer from './reducers/apiNovawebReducer';
//middlewares
import sortingMiddleWare from './middlewares/sort';
import apiMiddleWare from './middlewares/api';
const reducer = combineReducers({
    newelem: newelemReducer,
    form: formReducer,
    projects: apiNovawebReducer
})

const savedForm = localStorage && localStorage.getItem('managerform') && JSON.parse(localStorage.getItem('managerform')).form || [];

const fromMiddleware = applyMiddleware(sortingMiddleWare, apiMiddleWare)(createStore);
const store = fromMiddleware(reducer, {
    newelem: { title: 'текст', node: 'input', id: '', type: 'text', required: false, placeholder: '', stored: false, dragged: false },
    form: savedForm,
    projects: { template: '', serverlist: [], indexDrag: -1, indexDrag: -1, error: null, coords: {x: 0, y: 0} }
});

export default store;