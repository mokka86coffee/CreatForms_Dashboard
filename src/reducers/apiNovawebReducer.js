import { getCiphers } from "crypto";

const apiNovawebReducer = function (state = {},action){
    switch (action.type) {
        case 'EDIT_COMMENT': return { ...state, template: action.payload.el };
        case 'SUBMIT_COMMENT': return {...state, template: ''};
        case 'SORT_ARRAY': return { ...state, serverlist: action.payload.serverlist, error: null };
        case 'DRAG_START': return { ...state, indexDrag: action.payload.index };
        case 'DRAG_ENTER': return { ...state, indexDragTo: action.payload.index };
        case 'DRAG_END': return { ...state, serverlist: action.payload.serverlist, indexDrag: -1, indexDragTo: -1  };
        case 'TOUCH_START': return { ...state, indexDrag: action.payload.index, indexDragTo: action.payload.index, coords: {x: action.payload.coords.x, y: action.payload.coords.y}  };
        case 'TOUCH_MOVE': return { ...state, coords: {x: action.payload.coords.x, y: action.payload.coords.y} };
        case 'TOUCH_END': return { ...state, indexDrag: -1, indexDragTo: -1  };
        case 'FETCH_ERROR': return { ...state, error: action.payload.error };
        default: return state;
    }
}

export default apiNovawebReducer;