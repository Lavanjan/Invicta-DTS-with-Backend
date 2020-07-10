import { ADD_PROJECT } from "./../type/TypesProjects";

const initialState = {
  projects: [],
  msg: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_PROJECT:
      return {
        ...state,
        msg: action.payload.msg,
      };
    default:
      return state;
  }
}
