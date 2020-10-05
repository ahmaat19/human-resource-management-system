import axios from 'axios';
import { setAlert } from './alert';

import {
  ADD_DEPARTMENT,
  DEPARTMENT_ERROR,
  GET_DEPARTMENTS,
  UPDATE_DEPARTMENT,
} from './types';

// Get departments
export const getDepartments = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/department');
    dispatch({
      type: GET_DEPARTMENTS,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
  }
};

// Create department
export const addDepartment = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
    };

    const res = await axios.post('/api/department', formData, config);

    dispatch({
      type: ADD_DEPARTMENT,
      payload: res.data,
    });

    dispatch(setAlert('Successfully Added Department', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: DEPARTMENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Update department
export const updateDepartment = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
    };

    const res = await axios.put(
      `/api/department/${formData._id}`,
      formData,
      config
    );

    dispatch({
      type: UPDATE_DEPARTMENT,
      payload: res.data,
    });

    dispatch(setAlert('Successfully Updated Department', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: DEPARTMENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete department
export const deleteDepartment = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/department/${id}`);
    dispatch({
      type: UPDATE_DEPARTMENT,
      payload: res.data,
    });

    dispatch(setAlert('Successfully Deleted Department', 'success'));
  } catch (err) {
    dispatch({
      type: DEPARTMENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
