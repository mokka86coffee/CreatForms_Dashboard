export default function formReducer(state=[], action) {
    switch (action.type) {
        case 'ADD_ELEM':
            return  action.payload.stored
                ? state.map((el,i) => el.stored ? ({...action.payload, stored: false}) : el)
                : action.payload.id && state.every(el => el.id !== action.payload.id)
                    ? [...state, action.payload]
                    : state;
        case 'CANCEL_ELEM': 
            return state;
        case 'EDIT_FORM_NODE':
            return state.map((el, i) => i == action.payload.index ? { ...el, stored: true } : el);
        case 'DRAG_FORM_NODE':
            return state.map((el, i) => i == action.payload.index ? { ...el, dragged: true } : el);
        case 'DRAG_ENTER_FORM_NODE':
            return state.map((el, i) => el.dragged ? { ...el, dragged: action.payload.index } : el);
        case 'DRAG_END_FORM_NODE':
            const {index} = action.payload;
            const elem = state[index];
            const newPos = elem.dragged;
            if (index == newPos) return state;
            const arr = state.reduce((res,el,i)=> 
                    i==index 
                        ? res
                        : i==newPos
                            ? newPos<index
                                ? [...res, { ...elem, dragged: false }, el]
                                : [...res, el, { ...elem, dragged: false }]
                            : [...res, el]                
            ,[]);

            return arr;
        case 'REMOVE_FORM_NODE':
            return state.filter((el, i) => i != action.payload ? true : false);
        default:
            return state;
    }
}