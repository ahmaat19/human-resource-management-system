import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getDepartments } from '../../actions/department';
import {
  getDiscounts,
  updateDiscount,
  deleteDiscount,
  addDiscount,
} from '../../actions/discount';
import DiscountValidate from '../../validations/DiscountValidate';
import Moment from 'react-moment';
import moment from 'moment';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import InfoIcon from '@material-ui/icons/Info';
import DiscountInfo from './DiscountInfo';

const Discount = ({
  getDepartments,
  departments,
  getDiscounts,
  discounts,
  updateDiscount,
  deleteDiscount,
  addDiscount,
  isAuthenticated,
}) => {
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [edit, setEdit] = useState(false);
  const [dInfo, setDInfo] = useState({});

  const [formData, setFormData] = useState({
    empId: '',
    empName: '',
    department: '',
    fatherName: '',
    motherName: '',
    isSingle: true,
    isMale: true,
    wives: '',
    husband: '',
    hasChildren: false,
    children: '',
  });

  const {
    empId,
    empName,
    department,
    fatherName,
    motherName,
    isSingle,
    isMale,
    wives,
    husband,
    hasChildren,
    children,
  } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = (e) => {
    setFormData({
      ...formData,
      _id: e._id,
      empId: e.empId,
      empName: e.empName,
      department: e.department,
      fatherName: e.fatherName,
      motherName: e.motherName,
      isSingle: e.isSingle,
      isMale: e.isMale,
      wives: e.wives,
      husband: e.husband,
      hasChildren: e.hasChildren,
      children: e.children,
    });
    setEdit(true);
  };

  useEffect(() => {
    getDepartments();
    getDiscounts();
  }, [getDepartments, getDiscounts]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(DiscountValidate(formData));
    setIsSubmitting(true);
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      edit ? updateDiscount(formData) : addDiscount(formData);

      setFormData({
        ...formData,
        empId: '',
        empName: '',
        department: '',
        fatherName: '',
        motherName: '',
        isSingle: true,
        isMale: true,
        wives: '',
        husband: '',
        hasChildren: false,
        children: '',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errors]);

  const discountInfo = (e) => {
    setDInfo(e);
  };

  return (
    <div className='container mt-2'>
      <h5 className='text-center'>Employee Discount Form Request</h5> <hr />
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className='row'>
          <div className='col-lg-10 col-md-12 col-sm-12 col-12 mx-auto'>
            {/* Employee Info */}
            <div className='row my-2 border border-secondary'>
              <h5 className='text-center text-uppercase text-light  '>
                Employee Info
              </h5>
              <div className='col-lg-4 col-md-4 col-sm-12 col-12 '>
                <div className='form-group'>
                  <label htmlFor=''>Emp. ID</label>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='Enter your ID'
                    name='empId'
                    value={empId}
                    onChange={(e) => handleChange(e)}
                  />
                  {errors.empId && (
                    <div className='form-text text-danger'>{errors.empId}</div>
                  )}
                </div>
              </div>
              <div className='col-lg-4 col-md-4 col-sm-12 col-12 '>
                <label htmlFor=''>Emp. Name</label>
                <div className='form-group'>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='Enter your name'
                    name='empName'
                    value={empName}
                    onChange={(e) => handleChange(e)}
                  />
                  {errors.empName && (
                    <div className='form-text text-danger'>
                      {errors.empName}
                    </div>
                  )}
                </div>
              </div>
              <div className='col-lg-4 col-md-4 col-sm-12 col-12 '>
                <div className='form-group'>
                  <label htmlFor=''>Department</label>
                  <select
                    name='department'
                    value={department}
                    onChange={(e) => handleChange(e)}
                    className='form-control py-2'
                  >
                    <option value='' disabled>
                      Department...
                    </option>
                    {departments &&
                      departments.map((department) => {
                        return (
                          <option
                            key={department._id}
                            value={department._id}
                            onChange={(e) => handleChange(e)}
                          >
                            {department.name}
                          </option>
                        );
                      })}
                  </select>
                  {errors.department && (
                    <div className='form-text text-danger'>
                      {errors.department}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Parent Info */}
            <div className='row my-2 border border-secondary'>
              <h5 className='text-center text-uppercase text-light  '>
                Parent Info
              </h5>
              <div className='col-lg-6 col-md-6 col-sm-12 col-12 '>
                <div className='form-group'>
                  <label htmlFor=''>Father Name</label>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='Enter your father name'
                    name='fatherName'
                    value={fatherName}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
              </div>
              <div className='col-lg-6 col-md-6 col-sm-12 col-12 '>
                <label htmlFor=''>Mother Name</label>
                <div className='form-group'>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='Enter your mother name'
                    name='motherName'
                    value={motherName}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
              </div>
            </div>

            <div className='form-check form-switch'>
              <input
                className='form-check-input'
                type='checkbox'
                id='genderSwitchCheckChecked'
                name='isMale'
                checked={isMale}
                onChange={(e) => setFormData({ ...formData, isMale: !isMale })}
              />
              <label
                className='form-check-label'
                htmlFor='genderSwitchCheckChecked'
              >
                Are you male?{' '}
                <span role='img' aria-label='img'>
                  👨
                </span>
              </label>
            </div>

            <div className='form-check form-switch'>
              <input
                className='form-check-input'
                type='checkbox'
                id='statusSwitchCheckChecked'
                name='isSingle'
                checked={isSingle}
                onChange={(e) =>
                  setFormData({ ...formData, isSingle: !isSingle })
                }
              />
              <label
                className='form-check-label'
                htmlFor='statusSwitchCheckChecked'
              >
                Are you still single?{' '}
                <span role='img' aria-label='img'>
                  😂
                </span>
              </label>
            </div>

            {!isSingle && (
              <>
                {isMale ? (
                  <>
                    {/* Wives Info */}
                    <div className='row my-2 border border-secondary'>
                      <h5 className='text-center text-uppercase text-light  '>
                        Wives Info
                      </h5>
                      <div className='col-12 '>
                        <label htmlFor=''>Wives Name</label>
                        <div className='form-group'>
                          <input
                            type='text'
                            className='form-control'
                            placeholder='Enter the name of your wives'
                            name='wives'
                            value={wives}
                            onChange={(e) => handleChange(e)}
                            id='wives'
                          />
                          <div id='wives' className='form-text'>
                            Please use comma separated wives name if you have
                            more than one wife (eg. Fatima,Zahra,Maria,Sophia)
                          </div>
                          {errors.wives && (
                            <div className='form-text text-danger'>
                              {errors.wives}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Husband Info */}
                    <div className='row my-2 border border-secondary'>
                      <h5 className='text-center text-uppercase text-light  '>
                        Husband Info
                      </h5>
                      <div className='col-12 '>
                        <label htmlFor=''>Husband Name</label>
                        <div className='form-group'>
                          <input
                            type='text'
                            className='form-control'
                            placeholder='Enter the name of your husband'
                            name='husband'
                            value={husband}
                            onChange={(e) => handleChange(e)}
                          />
                          {errors.husband && (
                            <div className='form-text text-danger'>
                              {errors.husband}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </>
                )}

                <div className='form-check form-switch'>
                  <input
                    className='form-check-input'
                    type='checkbox'
                    id='childrenSwitchCheckChecked'
                    name='hasChildren'
                    checked={hasChildren}
                    onChange={(e) =>
                      setFormData({ ...formData, hasChildren: !hasChildren })
                    }
                  />
                  <label
                    className='form-check-label'
                    htmlFor='childrenSwitchCheckChecked'
                  >
                    Do you have any children?{' '}
                    <span role='img' aria-label='img'>
                      🧒
                    </span>
                  </label>
                </div>

                {hasChildren && (
                  <>
                    {/* Children Info */}
                    <div className='row my-2 border border-secondary'>
                      <h5 className='text-center text-uppercase text-light  '>
                        Children Info
                      </h5>
                      <div className='col-12 '>
                        <label htmlFor=''>Children's Name</label>
                        <div className='form-group'>
                          <input
                            type='text'
                            className='form-control'
                            placeholder='Enter the name of your children'
                            name='children'
                            value={children}
                            onChange={(e) => handleChange(e)}
                            id='children'
                          />
                          <div id='children' className='form-text'>
                            Please use comma separated children's name if you
                            have more than one child (eg.
                            Mohamed,Fatima,Ahmed,Leila)
                          </div>
                          {errors.children && (
                            <div className='form-text text-danger'>
                              {errors.children}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </>
            )}

            <div className='row mb-5'>
              <div className='col-12'>
                <button className='btn btn-outline-success btn-sm form-control'>
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
      {/* tables */}
      {isAuthenticated && (
        <>
          <h3 className='text-center form-title mb-4'>
            Employee Discount List
          </h3>
          <hr />
          <div className='table-responsive'>
            <table className='table table-sm table-hover table-bordered caption-top'>
              <caption>
                {discounts && discounts.length} records were found
              </caption>
              <thead>
                <tr>
                  <th>Date & Time</th>
                  <th>Employee ID</th>
                  <th>Employee Name</th>
                  <th>Department</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {discounts &&
                  discounts.map((discount) => {
                    return (
                      <tr
                        key={discount._id}
                        id={discount._id % 2 === 0 ? 'orange' : 'green'}
                      >
                        <td>
                          <Moment format='YYYY-MM-DD HH:mm:ss'>
                            {moment(discount.date)}
                          </Moment>
                        </td>
                        <td>{discount.empId}</td>
                        <td>{discount.empName}</td>
                        <td>{discount.department.name}</td>
                        <td>
                          <button
                            onClick={() => handleUpdate(discount)}
                            className='btn btn-outline-info btn-sm'
                          >
                            <EditIcon fontSize='small' />
                          </button>{' '}
                          <button
                            onClick={() => deleteDiscount(discount._id)}
                            className='btn btn-outline-danger btn-sm'
                          >
                            <DeleteForeverIcon fontSize='small' />
                          </button>{' '}
                          <button
                            className='btn btn-outline-success btn-sm'
                            data-toggle='modal'
                            data-target='#discountInfoModal'
                            onClick={() => discountInfo(discount)}
                          >
                            <InfoIcon fontSize='small' />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>

            <div
              className='modal fade'
              id='discountInfoModal'
              data-backdrop='static'
              data-keyboard='false'
              tabIndex='-1'
              aria-labelledby='staticBackdropLabel'
              aria-hidden='true'
            >
              <div className='modal-dialog modal-lg'>
                <div className='modal-content'>
                  <div className='modal-header'>
                    <h5 className='modal-title' id='staticBackdropLabel'>
                      {dInfo.empId && dInfo.empName} - Discount Details
                    </h5>
                    <button
                      type='button'
                      className='btn-close'
                      data-dismiss='modal'
                      aria-label='Close'
                    ></button>
                  </div>
                  <div className='modal-body'>
                    <DiscountInfo info={dInfo} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  departments: state.department.departments,
  discounts: state.discount.discounts,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {
  getDepartments,
  getDiscounts,
  updateDiscount,
  addDiscount,
  deleteDiscount,
})(Discount);
