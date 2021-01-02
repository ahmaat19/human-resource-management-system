import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
  userLogHistoryReducer,
} from './reducers/userReducers'

import {
  departmentListReducer,
  departmentCreateReducer,
  departmentUpdateReducer,
  departmentDeleteReducer,
} from './reducers/departmentReducers'

import {
  discountListReducer,
  discountCreateReducer,
  discountUpdateReducer,
  discountDeleteReducer,
} from './reducers/discountReducers'

import {
  employeeListReducer,
  employeeCreateReducer,
  employeeUpdateReducer,
  employeeDeleteReducer,
} from './reducers/employeeReducers'

import {
  leaveListReducer,
  leaveCreateReducer,
  leaveUpdateReducer,
  leaveDeleteReducer,
} from './reducers/leaveReducers'

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  userLogHistory: userLogHistoryReducer,

  departmentList: departmentListReducer,
  departmentCreate: departmentCreateReducer,
  departmentUpdate: departmentUpdateReducer,
  departmentDelete: departmentDeleteReducer,

  discountList: discountListReducer,
  discountCreate: discountCreateReducer,
  discountUpdate: discountUpdateReducer,
  discountDelete: discountDeleteReducer,

  employeeList: employeeListReducer,
  employeeCreate: employeeCreateReducer,
  employeeUpdate: employeeUpdateReducer,
  employeeDelete: employeeDeleteReducer,

  leaveList: leaveListReducer,
  leaveCreate: leaveCreateReducer,
  leaveUpdate: leaveUpdateReducer,
  leaveDelete: leaveDeleteReducer,
})

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
}
const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
