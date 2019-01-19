import React from 'react';
export default function newelemReducer(state={}, action) {
    switch (action.type) {
        case 'текст':
            return { title: 'текст', node: 'input', id: '', type: 'text', required: false, placeholder: '', stored: false, dragged: false};
        case 'телефон':
            return { title: 'телефон', node: 'input', id: '', type: 'tel', required: false, placeholder: '', stored: false, dragged: false };
        case 'email':
            return { title: 'email', node: 'input', id: '', type: 'email', required: false, placeholder: '', stored: false, dragged: false};
        case 'пароль':
            return { title: 'пароль', node: 'input', type: 'password', id: '', required: false, placeholder: '', stored: false, dragged: false};
        case 'текстовое поле':
            return { title: 'текстовое поле', node: 'textarea', id: '', required: false, placeholder: '', stored: false, dragged: false};
        case 'список':
            return { title: 'список', node: 'select', type: 'select', id: '', required: false, params: ['Поле 1', 'Поле 2'], stored: false, dragged: false };
        case 'радиокнопки':
            return { title: 'радиокнопки', node: 'input', type: 'radio', id: '', required: false, params: ['Поле 1', 'Поле 2'], stored: false, dragged: false };
        case 'флажки':
            return { title: 'флажки', node: 'input', type: 'checkbox', id: '', required: false, params: ['Поле 1', 'Поле 2'], stored: false, dragged: false };
        case 'required':
            return { ...state, required: action.payload }; 
        case 'id':
            return { ...state, id: action.payload };
        case 'placeholder':
            return { ...state, placeholder: action.payload };
        case 'ADD_ELEM':
            if (action.payload.id) { return { title: 'текст', node: 'input', id: '', type: 'text', required: false, placeholder: '', stored: false, dragged: false } }
            else { return state; }
        case 'EDIT_FORM_NODE':
            return {...action.payload.el, stored: true};
        case 'CANCEL_ELEM':
            return { title: 'текст', node: 'input', id: '', type: 'text', required: false, placeholder: '', stored: false, dragged: false };
        case 'ADD_LOCAL_FIELD':
            return { ...state, params: [...state.params, `Поле ${state.params.length + 1}`] };
        case 'EDIT_FIELD':
            return state.params.every(el => el !== action.payload.value)
                ? { ...state, params: state.params.map((el, i) => i != action.payload.index ? el : action.payload.value) }
                : state;
        case 'DELETE_FIELD':
            return { ...state, params: state.params.filter((el, i) => i != action.payload.index ? true : false) };
        default:
            return state;
    }
}