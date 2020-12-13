import axios from 'axios'
import {
  EMPLOYEE_REQUEST,
  EMPLOYEE_SUCCESS,
  EMPLOYEE_FAIL,
  EMPLOYEE_CREATE_FAIL,
  EMPLOYEE_CREATE_REQUEST,
  EMPLOYEE_CREATE_SUCCESS,
  EMPLOYEE_UPDATE_FAIL,
  EMPLOYEE_UPDATE_SUCCESS,
  EMPLOYEE_UPDATE_REQUEST,
  EMPLOYEE_DELETE_REQUEST,
  EMPLOYEE_DELETE_SUCCESS,
  EMPLOYEE_DELETE_FAIL,
} from '../constants/employeeConstants'

export const listEmployee = () => async (dispatch) => {
  try {
    dispatch({ type: EMPLOYEE_REQUEST })

    const { data } = await axios.get(`/api/employee`)

    dispatch({
      type: EMPLOYEE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: EMPLOYEE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const createEmployee = (empData) => async (dispatch, getState) => {
  try {
    dispatch({ type: EMPLOYEE_CREATE_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post(`/api/employee`, empData, config)

    dispatch({
      type: EMPLOYEE_CREATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: EMPLOYEE_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const updateEmployee = (empData) => async (dispatch, getState) => {
  try {
    dispatch({ type: EMPLOYEE_UPDATE_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.put(`/api/employee/${empData._id}`, empData, config)

    dispatch({
      type: EMPLOYEE_UPDATE_SUCCESS,
    })
  } catch (error) {
    dispatch({
      type: EMPLOYEE_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deleteEmployee = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: EMPLOYEE_DELETE_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete(`/api/employee/${id}`, config)

    dispatch({
      type: EMPLOYEE_DELETE_SUCCESS,
    })
  } catch (error) {
    dispatch({
      type: EMPLOYEE_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
