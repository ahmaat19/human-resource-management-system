import {
  ADD_DEPARTMENT,
  DEPARTMENT_ERROR,
  GET_DEPARTMENTS,
  UPDATE_DEPARTMENT,
} from '../actions/types';

const initialState = {
  departments: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_DEPARTMENTS:
    case ADD_DEPARTMENT:
    case UPDATE_DEPARTMENT:
      return {
        ...state,
        departments: payload,
        loading: false,
      };

    case DEPARTMENT_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };

    default:
      return state;
  }
}
