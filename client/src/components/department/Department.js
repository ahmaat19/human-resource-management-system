import React, { useState, useEffect } from 'react';
import DepartmentForm from './DepartmentForm';
import DepartmentList from './DepartmentList';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  getDepartments,
  addDepartment,
  deleteDepartment,
  updateDepartment,
} from '../../actions/department';
import Spinner from '../layout/Spinner';

const initialValues = {
  name: '',
};

function Department({
  departments: { loading, departments },
  deleteDepartment,
  getDepartments,
  addDepartment,
  updateDepartment,
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
    });
    setEdit(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    edit ? updateDepartment(values) : addDepartment(values);
  };

  useEffect(() => {
    getDepartments();
  }, [getDepartments]);

  return loading ? (
    <Spinner />
  ) : (
    <div className='row pt-4'>
      <div className='col-md-4'>
        <DepartmentForm
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          values={values}
        />
      </div>
      <div className='col-md-8'>
        <DepartmentList
          handleUpdate={handleUpdate}
          deleteDepartment={deleteDepartment}
          departments={departments}
        />
      </div>
    </div>
  );
}

Department.propTypes = {
  getDepartments: PropTypes.func.isRequired,
  addDepartment: PropTypes.func.isRequired,
  deleteDepartment: PropTypes.func.isRequired,
  updateDepartment: PropTypes.func.isRequired,
  departments: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  departments: state.department,
});

export default connect(mapStateToProps, {
  getDepartments,
  addDepartment,
  updateDepartment,
  deleteDepartment,
})(Department);
