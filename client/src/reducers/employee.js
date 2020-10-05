import {
  ADD_EMPLOYEE,
  EMPLOYEE_ERROR,
  GET_EMPLOYEES,
  UPDATE_EMPLOYEE,
} from '../actions/types';

const initialState = {
  employees: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_EMPLOYEES:
    case ADD_EMPLOYEE:
    case UPDATE_EMPLOYEE:
      return {
        ...state,
        employees: payload,
        loading: false,
      };

    case EMPLOYEE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };

    default:
      return state;
  }
}
