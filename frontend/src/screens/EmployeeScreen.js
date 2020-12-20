import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ReactPaginate from 'react-paginate'
import Moment from 'react-moment'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {
  listEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from '../actions/employeeActions'

import { listDepartment } from '../actions/departmentActions'

const initialValues = {
  _id: null,
  name: '',
  emp_id: '',
  mobile: '',
  gender: '',
  department: '',
}

const EmployeeScreen = () => {
  const [values, setValues] = useState(initialValues)
  const [edit, setEdit] = useState(false)

  const dispatch = useDispatch()

  const departmentList = useSelector((state) => state.departmentList)
  const { departments } = departmentList

  const employeeList = useSelector((state) => state.employeeList)
  const { employees, error, loading } = employeeList

  const employeeCreate = useSelector((state) => state.employeeCreate)
  const {
    error: errorCreate,
    loading: loadingCreate,
    success: successCreate,
  } = employeeCreate

  const employeeUpdate = useSelector((state) => state.employeeUpdate)
  const {
    error: errorUpdate,
    loading: loadingUpdate,
    success: successUpdate,
  } = employeeUpdate

  const employeeDelete = useSelector((state) => state.employeeDelete)
  const {
    error: errorDelete,
    loading: loadingDelete,
    success: successDelete,
  } = employeeDelete

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const formCleanHandler = () => {
    setValues({
      ...values,
      _id: '',
      name: '',
      emp_id: '',
      mobile: '',
      gender: '',
      department: '',
    })
    setEdit(false)
  }

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  useEffect(() => {
    dispatch(listEmployee())
    dispatch(listDepartment())
    if (successCreate || successUpdate) {
      formCleanHandler()
    }
    // eslint-disable-next-line
  }, [dispatch, successCreate, successUpdate, successDelete])

  const deleteHandler = (id) => {
    if (window.confirm('Are you use?')) {
      dispatch(deleteEmployee(id))
    }
  }

  const submitHandler = (e) => {
    e.preventDefault()

    edit ? dispatch(updateEmployee(values)) : dispatch(createEmployee(values))
  }

  const editHandler = (e) => {
    setValues({
      ...values,
      _id: e._id,
      name: e.name,
      emp_id: e.emp_id,
      mobile: e.mobile,
      gender: e.gender,
      department: e.department._id,
    })
    setEdit(true)
  }

  const [currentPage, setCurrentPage] = useState(1)

  const itemsPerPage = 5
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems =
    employees && employees.slice(indexOfFirstItem, indexOfLastItem)
  const totalItems = employees && Math.ceil(employees.length / itemsPerPage)

  return (
    <>
      <div
        className='modal fade'
        id='employeeModal'
        data-bs-backdrop='static'
        data-bs-keyboard='false'
        tabIndex='-1'
        aria-labelledby='employeeModalLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog'>
          <div className='modal-content modal-background'>
            <div className='modal-header'>
              <h5 className='modal-title' id='employeeModalLabel'>
                {edit ? 'Edit Employee' : 'Add Employee'}
              </h5>
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'
                onClick={formCleanHandler}
              ></button>
            </div>
            <div className='modal-body'>
              {successCreate && (
                <Message variant='success'>
                  Employee Registered Successfully
                </Message>
              )}
              {loadingCreate ? (
                <Loader />
              ) : (
                errorCreate && <Message variant='danger'>{errorCreate}</Message>
              )}

              {successUpdate && (
                <Message variant='success'>
                  Employee Updated Successfully
                </Message>
              )}
              {loadingUpdate ? (
                <Loader />
              ) : (
                errorUpdate && <Message variant='danger'>{errorUpdate}</Message>
              )}
              {loading ? (
                <Loader />
              ) : error ? (
                <Message variant='danger'>{error}</Message>
              ) : (
                <form onSubmit={submitHandler}>
                  <div className='row gy-2'>
                    <div className='form-group'>
                      <label htmlFor='emp_id'>Employee ID</label>
                      <input
                        name='emp_id'
                        onChange={handleChange}
                        type='text'
                        value={values.emp_id}
                        className='form-control py-2'
                        placeholder='Enter employee ID'
                      />
                    </div>

                    <div className='form-group'>
                      <label htmlFor='name'>Employee Name</label>
                      <input
                        name='name'
                        onChange={handleChange}
                        type='text'
                        value={values.name}
                        className='form-control py-2'
                        placeholder='Enter employee name'
                      />
                    </div>

                    <div className='form-group'>
                      <label htmlFor='gender'>Gender</label>
                      <select
                        name='gender'
                        onChange={handleChange}
                        value={values.gender}
                        className='form-control py-2'
                      >
                        <option value='' disabled>
                          Gender...
                        </option>
                        <option value='Male'>Male</option>
                        <option value='Female'>Female</option>
                      </select>
                    </div>

                    <div className='form-group'>
                      <label htmlFor='mobbile'>Mobile</label>
                      <input
                        name='mobile'
                        onChange={handleChange}
                        type='text'
                        value={values.mobile}
                        className='form-control py-2'
                        placeholder='Enter mobile'
                      />
                    </div>

                    <div className='form-group'>
                      <label htmlFor='department'>Department Name</label>
                      <select
                        name='department'
                        onChange={handleChange}
                        value={values.department}
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
                              >
                                {department.name}
                              </option>
                            )
                          })}
                      </select>
                    </div>

                    <div className='modal-footer'>
                      <button
                        type='button'
                        className='btn btn-secondary'
                        data-bs-dismiss='modal'
                        onClick={formCleanHandler}
                      >
                        Close
                      </button>
                      <button type='submit' className='btn btn-primary'>
                        Submit
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className='d-flex justify-content-between'>
        <h1>Employee</h1>
        <button
          className='btn btn-light btn-sm'
          data-bs-toggle='modal'
          data-bs-target='#employeeModal'
        >
          {' '}
          <i className='fas fa-plus'></i> REGISTER NEW EMPLOYEE
        </button>
      </div>

      {successDelete && (
        <Message variant='success'>Employee Deleted Successfully</Message>
      )}
      {loadingDelete ? (
        <Loader />
      ) : (
        errorDelete && <Message variant='danger'>{errorDelete}</Message>
      )}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <div className='table-responsive'>
            <table className='table table-sm hover bordered striped'>
              <thead>
                <tr>
                  <th>Date & Time</th>
                  <th>Emp. ID</th>
                  <th>Name</th>
                  <th>Mobile</th>
                  <th>Department</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {currentItems &&
                  currentItems.map((employee) => (
                    <tr
                      key={employee._id}
                      id={employee._id % 2 === 0 ? 'orange' : 'green'}
                    >
                      <td>
                        <Moment format='YYYY-MM-DD HH:mm:ss'>
                          {moment(employee.date)}
                        </Moment>
                      </td>
                      <td>{employee.emp_id}</td>
                      <td>{employee.name}</td>
                      <td>{employee.mobile}</td>
                      <td>{employee.department.name}</td>
                      <td className='btn-group'>
                        <button
                          onClick={() => editHandler(employee)}
                          className='btn btn-light btn-sm'
                          data-bs-toggle='modal'
                          data-bs-target='#employeeModal'
                        >
                          <i className='fas fa-edit'></i>
                        </button>{' '}
                        {userInfo && userInfo.isAdmin && (
                          <button
                            className='btn btn-danger btn-sm'
                            onClick={() => deleteHandler(employee._id)}
                          >
                            <i className='fas fa-trash'></i>
                          </button>
                        )}
                        <Link
                          to={`/leave/${employee._id}`}
                          className='btn btn-dark btn-sm'
                        >
                          <i className='fas fa-share'></i>
                        </Link>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            {departments && !loading && departments.length === 0 && (
              <span className='text-danger d-flex justify-content-center'>
                No data found!
              </span>
            )}
            <div className='d-flex justify-content-center'>
              <ReactPaginate
                previousLabel='previous'
                previousClassName='page-item'
                previousLinkClassName='page-link'
                nextLabel='next'
                nextClassName='page-item'
                nextLinkClassName='page-link'
                pageClassName='page-item'
                pageLinkClassName='page-link'
                activeClassName='page-item active'
                activeLinkClassName={'page-link'}
                breakLabel={'...'}
                breakClassName={'page-item'}
                breakLinkClassName={'page-link'}
                pageCount={totalItems && totalItems}
                marginPagesDisplayed={2}
                pageRangeDisplayed={2}
                onPageChange={(e) => setCurrentPage(e.selected + 1)}
                containerClassName={'page pagination'}
              />
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default EmployeeScreen
