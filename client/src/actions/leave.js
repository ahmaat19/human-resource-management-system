import axios from "axios";
import { setAlert } from "./alert";

import { ADD_LEAVE, GET_LEAVES, LEAVE_ERROR, UPDATE_LEAVE } from "./types";

// Get leaves
export const getLeaves = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/leave");
    dispatch({
      type: GET_LEAVES,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
  }
};

// Create leave
export const addLeave = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const res = await axios.post("/api/leave", formData, config);

    dispatch({
      type: ADD_LEAVE,
      payload: res.data,
    });

    dispatch(setAlert("Successfully Added Leave", "success"));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: LEAVE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Update leave
export const updateLeave = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const res = await axios.put(`/api/leave/${formData._id}`, formData, config);

    dispatch({
      type: UPDATE_LEAVE,
      payload: res.data,
    });

    dispatch(setAlert("Successfully Updated Leave", "success"));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: LEAVE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete leave
export const deleteLeave = (id) => async (dispatch) => {
  if (window.confirm("Are you sure? This can NOT be undone!")) {
    try {
      const res = await axios.delete(`/api/leave/${id}`);
      dispatch({
        type: UPDATE_LEAVE,
        payload: res.data,
      });

      dispatch(setAlert("Successfully Deleted Leave", "success"));
    } catch (err) {
      dispatch({
        type: LEAVE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};
