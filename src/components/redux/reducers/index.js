import { combineReducers } from "redux";
import ReducerDefect from '../reducers/ReducerDefect';
import ReducerProject from './../reducers/ReducerProjects';
import DefectUpdate from './../reducers/ReducerDefectsUpdate';
import ReducerEmployee from './../reducers/ReducerEmployee';


const allReducer = combineReducers({
    ReducerDefect,
    ReducerProject,
    defects_task: DefectUpdate,
    ReducerEmployee

});

export default allReducer; 