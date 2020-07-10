import {ADD_DEFECT} from './../type/TypesDefect'
import axios from 'axios';

export const adddefect = defect => dispatch => {
    axios.post('http://localhost:5000/defects/add', defect)
      .then(res =>
        dispatch({
          type: ADD_DEFECT,
          payload: {msg:'Successfully add a defect',data:defect}
        })
      )
      .catch(err =>
        dispatch({
          type: ADD_DEFECT,
          payload: {msg:'Error to add a defect',data:null}
        })
      );
  }; 