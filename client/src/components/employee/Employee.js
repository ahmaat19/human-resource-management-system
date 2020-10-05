import React, { useState, useEffect } from 'react';
import EmployeeForm from './EmployeeForm';
import EmployeeList from './EmployeeList';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  getEmployees,
  addEmployee,
  deleteEmployee,
  updateEmployee,
} from '../../actions/employee';
import { getDepartments } from '../../actions/department';
import Spinner from '../layout/Spinner';

const initialValues = {
  name: '',
  emp_id: '',
  mobile: '',
  gender: '',
  department: '',
};

function Employee({
  employees: { loading, employees },
  departments,
  deleteEmployee,
  getEmployees,
  addEmployee,
  updateEmployee,
  getDepartments,
}) {
  const [values, setValues] = useState(initialValues);
  const [edit, setEdit] = useState(false);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleUpdate = (e) => {
    setValues({
      ...values,
      _id: e._id,
      name: e.name,
      emp_id: e.emp_id,
      mobile: e.mobile,
      gender: e.gender,
      department: e.department._id,
    });
    setEdit(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    edit ? updateEmployee(values) : addEmployee(values);
  };

  useEffect(() => {
    getEmployees();
    getDepartments();
  }, []);

  return loading ? (
    <Spinner />
  ) : (
    <div className='row pt-4'>
      <div className='col-md-4'>
        <EmployeeForm
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          values={values}
          departments={departments}
        />
      </div>
      <div className='col-md-8'>
        <EmployeeList
          handleUpdate={handleUpdate}
          deleteEmployee={deleteEmployee}
          employees={employees}
        />
      </div>
    </div>
  );
}

Employee.propTypes = {
  getEmployees: PropTypes.func.isRequired,
  getDepartments: PropTypes.func.isRequired,
  addEmployee: PropTypes.func.isRequired,
  deleteEmployee: PropTypes.func.isRequired,
  updateEmployee: PropTypes.func.isRequired,
  employees: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  employees: state.employee,
  departments: state.department.departments,
});

export default connect(mapStateToProps, {
  getEmployees,
  getDepartments,
  addEmployee,
  updateEmployee,
  deleteEmployee,
})(Employee);
