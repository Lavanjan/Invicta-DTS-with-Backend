import {ADD_EMPLOYEE,FETCH_EMPLOYEE,UPDATE_EMPLOYEE} from './../type/TypesEmployee'

const initialState = {
    employees: [],
    msg:'' 
};

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_EMPLOYEE:
            return {
                ...state,
                employees: action.payload
            };
            case ADD_EMPLOYEE:
                return {
                  ...state,
                  msg:action.payload.msg,
                };
        default:
            return state;
    }
}