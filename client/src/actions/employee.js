import axios from 'axios';
import { setAlert } from './alert';

import {
  ADD_EMPLOYEE,
  EMPLOYEE_ERROR,
  GET_EMPLOYEES,
  UPDATE_EMPLOYEE,
} from './types';

// Get employees
export const getEmployees = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/employee');
    dispatch({
      type: GET_EMPLOYEES,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
  }
};

// Create employee
export const addEmployee = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
    };

    const res = await axios.post('/api/employee', formData, config);

    dispatch({
      type: ADD_EMPLOYEE,
      payload: res.data,
    });

    dispatch(setAlert('Successfully Added Employee', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: EMPLOYEE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Create employee
export const updateEmployee = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
    };

    const res = await axios.put(
      `/api/Employee/${formData._id}`,
      formData,
      config
    );

    dispatch({
      type: UPDATE_EMPLOYEE,
      payload: res.data,
    });

    dispatch(setAlert('Successfully Updated Employee', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: EMPLOYEE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete employee
export const deleteEmployee = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/employee/${id}`);
    dispatch({
      type: UPDATE_EMPLOYEE,
      payload: res.data,
    });

    dispatch(setAlert('Successfully Deleted Employee', 'success'));
  } catch (err) {
    dispatch({
      type: EMPLOYEE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
