import axios from "axios";
import { setAlert } from "./alert";

import {
  ADD_DISCOUNT,
  DISCOUNT_ERROR,
  GET_DISCOUNTS,
  UPDATE_DISCOUNT,
} from "./types";

// Get discounts
export const getDiscounts = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/discount");
    dispatch({
      type: GET_DISCOUNTS,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
  }
};

// Create discount
export const addDiscount = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const res = await axios.post("/api/discount", formData, config);

    dispatch({
      type: ADD_DISCOUNT,
      payload: res.data,
    });

    dispatch(setAlert("Successfully Added Discount", "success"));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: DISCOUNT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Update discount
export const updateDiscount = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const res = await axios.put(
      `/api/discount/${formData._id}`,
      formData,
      config
    );

    dispatch({
      type: UPDATE_DISCOUNT,
      payload: res.data,
    });

    dispatch(setAlert("Successfully Updated Discount", "success"));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: DISCOUNT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete discount
export const deleteDiscount = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/discount/${id}`);
    dispatch({
      type: UPDATE_DISCOUNT,
      payload: res.data,
    });

    dispatch(setAlert("Successfully Deleted Discount", "success"));
  } catch (err) {
    dispatch({
      type: DISCOUNT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
