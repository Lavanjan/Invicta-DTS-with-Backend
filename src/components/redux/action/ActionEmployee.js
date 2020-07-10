import {ADD_EMPLOYEE,FETCH_EMPLOYEE,UPDATE_EMPLOYEE} from './../type/TypesEmployee'
import axios from 'axios';

export const fetchemployee = () => dispatch => {
    axios.get('http://localhost:5000/employees')
      .then(res =>     
        dispatch({
          type: FETCH_EMPLOYEE,
          payload: res.data        
        })
      )
      .catch(error => {
        console.log(error)
      })
  };

  export const addemployee = employee => dispatch => {
    axios.post('http://localhost:5000/employees/add', employee)
      .then(res =>
        dispatch({
          type: ADD_EMPLOYEE,
          payload: {msg:'Successfully add a employee',data:employee}
        })
      )
      .catch(err =>
        dispatch({
          type: ADD_EMPLOYEE,
          payload: {msg:'Error to add a defect',data:null}
        })
      );
  }; 

