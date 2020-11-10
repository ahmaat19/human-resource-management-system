import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Login from "../auth/Login";
import ChangePassword from "../auth/ChangePassword";
import Register from "../auth/Register";
import Alert from "../layout/Alert";
import Dashboard from "../dashboard/Dashboard";
import Department from "../department/Department";
import Employee from "../employee/Employee";
import Leave from "../leave/Leave";
import Report from "../dashboard/Report";
import NotFound from "../layout/NotFound";

import PrivateRoute from "../routes/PrivateRoute";
import AdminPrivateRoute from "../routes/AdminPrivateRoute";
import Discount from "../discount/Discount";

const Routes = () => {
  return (
    <div className='container'>
      <Alert />
      <Switch>
        <Route path='/login' component={Login} />
        <AdminPrivateRoute path='/register' component={Register} />
        <PrivateRoute path='/change-password' component={ChangePassword} />
        <PrivateRoute exact path='/' component={Dashboard} />
        <PrivateRoute exact path='/department' component={Department} />
        <PrivateRoute exact path='/employee' component={Employee} />
        <PrivateRoute exact path='/leave/:id' component={Leave} />
        <PrivateRoute exact path='/report' component={Report} />

        <Route exact path='/discount' component={Discount} />

        <Route component={NotFound} />
      </Switch>
    </div>
  );
};

export default Routes;
