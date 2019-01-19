import { getCiphers } from "crypto";

const apiNovawebReducer = function (state = { template: '', serverlist: [], indexDrag: false, indexDragTo: false},action){
    switch (action.type) {
        case 'EDIT_COMMENT': return { ...state, template: action.payload.el };
        case 'SUBMIT_COMMENT': return {...state, template: ''};
        case 'SORT_ARRAY': return { ...state, serverlist: action.payload.serverlist };
        case 'DRAG_START': return { ...state, indexDrag: action.payload.index };
        case 'DRAG_ENTER': return { ...state, indexDragTo: action.payload.index };
        case 'DRAG_END': return { ...state, serverlist: action.payload.serverlist };
        default: return state;
    }
}

export default apiNovawebReducer;