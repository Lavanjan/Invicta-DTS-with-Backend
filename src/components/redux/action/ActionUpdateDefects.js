import React, { Component } from "react";
import axios from "axios";
import { GET_DEEFCTS } from "../type/TypesUpdateDefects";

export const ActionUpdateDefects = (dt_id, history) => async (dispatch) => {
  try {
    const res = await axios.get(`http://localhost:5000/defects/${dt_id}`);
    dispatch({
      type: GET_DEEFCTS,
      payload: res.data,
    });
  } catch (error) {}
};
export const addDefects = (defects_task, history) => async (dispatch) => {
  // try {
  //   await axios.post("http://localhost:5000/defects/", defects_task);
  //   history.push();
  // }
};

export default ActionUpdateDefects;
