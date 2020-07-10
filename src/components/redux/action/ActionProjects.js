import { ADD_PROJECT } from './../type/TypesProjects'; 
import axios from 'axios';

export const addProjects = projects => dispatch => {
    axios.post ('http://localhost:5000/projects/add', projects)
    .then(res => {
        dispatch({
            type: ADD_PROJECT,
            payload: {msg:"success", data: projects}
        })
    })
    .catch(err => ({
        type: ADD_PROJECT,
        payload: {msg:'err', data: null}
    })
    );
}