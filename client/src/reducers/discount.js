import {
  ADD_DISCOUNT,
  DISCOUNT_ERROR,
  GET_DISCOUNTS,
  UPDATE_DISCOUNT,
} from "../actions/types";

const initialState = {
  discounts: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_DISCOUNTS:
    case ADD_DISCOUNT:
    case UPDATE_DISCOUNT:
      return {
        ...state,
        discounts: payload,
        loading: false,
      };

    case DISCOUNT_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };

    default:
      return state;
  }
}
