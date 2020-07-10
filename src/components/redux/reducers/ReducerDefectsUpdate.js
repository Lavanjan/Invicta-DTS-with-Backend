import React, { Component } from 'react'
import { GET_DEEFCTS } from './../type/TypesUpdateDefects';

const initialState = {
    defects_task:[],
}

export default function (state = initialState, action){
    switch(action.type){
        case GET_DEEFCTS:
            return{
                ...state,
                defects_task: action.payload
            };
            default:
                return state;
    }
}

 
