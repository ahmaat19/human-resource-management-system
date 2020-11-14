import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import department from "./department";
import employee from "./employee";
import leave from "./leave";
import discount from "./discount";

export default combineReducers({
  alert,
  auth,
  department,
  employee,
  discount,
  leave,
});
