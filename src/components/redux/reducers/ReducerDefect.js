import {ADD_DEFECT } from './../type/TypesDefect';

const initialState = {
    defect: [],
    msg:'' 
};

export default function (state = initialState, action) {
    switch (action.type) {        
            case ADD_DEFECT:
                return {
                  ...state,
                  msg:action.payload.msg,
                };
        default:
            return state;
    }
} 