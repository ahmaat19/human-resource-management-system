import {
  ADD_LEAVE,
  GET_LEAVES,
  LEAVE_ERROR,
  UPDATE_LEAVE,
} from '../actions/types';

const initialState = {
  leaves: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_LEAVES:
    case ADD_LEAVE:
    case UPDATE_LEAVE:
      return {
        ...state,
        leaves: payload,
        loading: false,
      };

    case LEAVE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };

    default:
      return state;
  }
}
