import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { FaEdit, FaExclamationTriangle, FaShare, FaTrash } from 'react-icons/fa'
import {
  listEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from '../actions/employeeActions'
import { confirmAlert } from 'react-confirm-alert'
import { Confirm } from '../components/Confirm'
import { listDepartment } from '../actions/departmentActions'
import { listPosition } from '../actions/positionActions'
import { FaMinus, FaPlus } from 'react-icons/fa'
import Pagination from '../components/Pagination'

const EmployeeScreen = () => {
  const [activeProfile, setActiveProfile] = useState(true)
  const [activePrivate, setActivePrivate] = useState(false)
  const [activeDocuments, setActiveDocuments] = useState(false)

  const [employeeId, setEmployeeId] = useState('')
  const [employeeName, setEmployeeName] = useState('')
  const [employmentType, setEmploymentType] = useState('')
  const [department, setDepartment] = useState('')
  const [position, setPosition] = useState('')
  const [hiredDate, setHiredDate] = useState('')
  const [national, setNational] = useState('')
  const [birthday, setBirthday] = useState('')
  const [address, setAddress] = useState('')
  const [mobile, setMobile] = useState('')
  const [email, setEmail] = useState('')
  const [gender, setGender] = useState('')
  const [document, setDocument] = useState('')
  const [edit, setEdit] = useState(false)
  const [active, setActive] = useState(true)
  const [_id, set_id] = useState(null)

  const dispatch = useDispatch()

  const departmentList = useSelector((state) => state.departmentList)
  const { departments } = departmentList

  const positionList = useSelector((state) => state.positionList)
  const { positions } = positionList

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
    setEmployeeId('')
    setEmployeeName('')
    setEmploymentType('')
    setDepartment('')
    setPosition('')
    setHiredDate('')
    setNational()
    setBirthday('')
    setAddress('')
    setMobile('')
    setEmail('')
    setGender('')
    setDocument('')
    setActive(true)
    setEdit(false)
  }

  useEffect(() => {
    dispatch(listEmployee())
    dispatch(listDepartment())
    dispatch(listPosition())
    if (successCreate || successUpdate) {
      formCleanHandler()
    }
    // eslint-disable-next-line
  }, [dispatch, successCreate, successUpdate, successDelete])

  const deleteHandler = (id) => {
    confirmAlert(Confirm(() => dispatch(deleteEmployee(id))))
  }

  const submitHandler = (e) => {
    e.preventDefault()

    const formData = new FormData()

    formData.append('employeeId', employeeId)
    formData.append('employeeName', employeeName)
    formData.append('gender', gender)
    formData.append('mobile', mobile)
    formData.append('employmentType', employmentType)
    formData.append('hiredDate', hiredDate)
    formData.append('national', national)
    formData.append('birthday', birthday)
    formData.append('position', position)
    formData.append('address', address)
    formData.append('email', email)
    formData.append('department', department)
    formData.append('active', active)
    formData.append('document', document)

    edit
      ? dispatch(updateEmployee(formData, _id))
      : dispatch(createEmployee(formData))
    console.log('form submitted')
  }

  const editHandler = (e) => {
    console.log(e)
    setEmployeeId(e.employeeId)
    setEmployeeName(e.employeeName)
    setEmploymentType(e.employmentType)
    setDepartment(e.department._id)
    setPosition(e.position._id)
    setHiredDate(moment(e.hiredDate).format('YYYY-MM-DD'))
    setNational(e.national)
    setBirthday(moment(e.birthday).format('YYYY-MM-DD'))
    setAddress(e.address)
    setMobile(e.mobile)
    setEmail(e.email)
    setGender(e.gender)
    set_id(e._id)

    setActive(e.active)
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
        <div className='modal-dialog modal-lg modal-dialog-scrollable'>
          <div className='modal-content modal-background '>
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
                <div>
                  <form onSubmit={(e) => submitHandler(e)}>
                    <div className='row g-3'>
                      <div className='col-12'>
                        <span className='form-control text-center bg-dark text-light fs-6 fw-light'>
                          PROFILE INFO
                          <span className='float-end'>
                            {activeProfile ? (
                              <FaMinus
                                onClick={() => setActiveProfile(false)}
                              />
                            ) : (
                              <FaPlus onClick={() => setActiveProfile(true)} />
                            )}
                          </span>
                        </span>
                      </div>
                      {activeProfile && (
                        <>
                          <div className='col-lg-4 col-md-6 col-sm-12 col-12'>
                            <label htmlFor='employeeId'>Employee ID</label>
                            <input
                              type='text'
                              className='form-control'
                              placeholder='Employee ID'
                              name='employeeId'
                              value={employeeId}
                              onChange={(e) => setEmployeeId(e.target.value)}
                            />
                          </div>

                          <div className='col-lg-4 col-md-6 col-sm-12 col-12'>
                            <label htmlFor='employeeName'>Employee Name</label>
                            <input
                              type='text'
                              className='form-control'
                              placeholder='Employee Name'
                              name='employeeName'
                              value={employeeName}
                              onChange={(e) => setEmployeeName(e.target.value)}
                            />
                          </div>

                          <div className='col-lg-4 col-md-6 col-sm-12 col-12'>
                            <label htmlFor='employmentType'>
                              Employment Type
                            </label>
                            <select
                              type='text'
                              className='form-control'
                              name='employmentType'
                              value={employmentType}
                              onChange={(e) =>
                                setEmploymentType(e.target.value)
                              }
                            >
                              <option value=''>---------</option>
                              <option value='Permanent'>Permanent</option>
                              <option value='Temporary'>Temporary</option>
                            </select>
                          </div>

                          <div className='col-lg-4 col-md-6 col-sm-12 col-12'>
                            <label htmlFor='department'>Department</label>
                            <select
                              type='text'
                              className='form-control'
                              name='department'
                              value={department}
                              onChange={(e) => setDepartment(e.target.value)}
                            >
                              <option value=''>---------</option>
                              {departments &&
                                departments.map((department) => (
                                  <option
                                    key={department._id}
                                    value={department._id}
                                  >
                                    {department.name}
                                  </option>
                                ))}
                            </select>
                          </div>

                          <div className='col-lg-4 col-md-6 col-sm-12 col-12'>
                            <label htmlFor='position'>Position</label>
                            <select
                              type='text'
                              className='form-control'
                              name='position'
                              value={position}
                              onChange={(e) => setPosition(e.target.value)}
                            >
                              <option value=''>---------</option>
                              {positions &&
                                positions.map((position) => (
                                  <option
                                    key={position._id}
                                    value={position._id}
                                  >
                                    {position.name}
                                  </option>
                                ))}
                            </select>
                          </div>

                          <div className='col-lg-4 col-md-6 col-sm-12 col-12'>
                            <label htmlFor='hiredDate'>Hired Date</label>
                            <input
                              type='date'
                              className='form-control'
                              name='hiredDate'
                              value={hiredDate}
                              onChange={(e) => setHiredDate(e.target.value)}
                            />
                          </div>
                        </>
                      )}
                      <div className='col-12'>
                        <span className='form-control text-center bg-dark text-light fs-6 fw-light'>
                          PRIVATE INFO
                          <span className='float-end'>
                            {activePrivate ? (
                              <FaMinus
                                onClick={() => setActivePrivate(false)}
                              />
                            ) : (
                              <FaPlus onClick={() => setActivePrivate(true)} />
                            )}
                          </span>
                        </span>
                      </div>

                      {activePrivate && (
                        <>
                          <div className='col-lg-4 col-md-6 col-sm-12 col-12'>
                            <label htmlFor='national'>National</label>
                            <input
                              type='text'
                              className='form-control'
                              placeholder='National'
                              name='national'
                              value={national}
                              onChange={(e) => setNational(e.target.value)}
                            />
                          </div>

                          <div className='col-lg-4 col-md-6 col-sm-12 col-12'>
                            <label htmlFor='birthday'>Birthday</label>
                            <input
                              type='date'
                              className='form-control'
                              name='birthday'
                              value={birthday}
                              onChange={(e) => setBirthday(e.target.value)}
                            />
                          </div>

                          <div className='col-lg-4 col-md-6 col-sm-12 col-12'>
                            <label htmlFor='address'>Address</label>
                            <input
                              type='text'
                              className='form-control'
                              placeholder='Address'
                              name='address'
                              value={address}
                              onChange={(e) => setAddress(e.target.value)}
                            />
                          </div>

                          <div className='col-lg-4 col-md-6 col-sm-12 col-12'>
                            <label htmlFor='mobile'>Mobile</label>
                            <input
                              type='number'
                              min='0'
                              className='form-control'
                              placeholder='Mobile'
                              name='mobile'
                              value={mobile}
                              onChange={(e) => setMobile(e.target.value)}
                            />
                          </div>

                          <div className='col-lg-4 col-md-6 col-sm-12 col-12'>
                            <label htmlFor='email'>Email</label>
                            <input
                              type='email'
                              className='form-control'
                              placeholder='Email'
                              name='email'
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                            />
                          </div>

                          <div className='col-lg-4 col-md-6 col-md-12 col-sm-12 col-12'>
                            <label htmlFor='gender'>Gender</label>
                            <select
                              type='text'
                              className='form-control'
                              name='gender'
                              value={gender}
                              onChange={(e) => setGender(e.target.value)}
                            >
                              <option value=''>---------</option>
                              <option value='Male'>Male</option>
                              <option value='Female'>Female</option>
                            </select>
                          </div>
                        </>
                      )}
                      <div className='col-12'>
                        <span className='form-control text-center bg-dark text-light fs-6 fw-light'>
                          DOCUMENTS INFO
                          <span className='float-end'>
                            {activeDocuments ? (
                              <FaMinus
                                onClick={() => setActiveDocuments(false)}
                              />
                            ) : (
                              <FaPlus
                                onClick={() => setActiveDocuments(true)}
                              />
                            )}
                          </span>
                        </span>
                      </div>
                      {activeDocuments && (
                        <div className='col-12'>
                          <label htmlFor='document formFile'>
                            Upload Employee Related Documents
                          </label>
                          <input
                            type='file'
                            className='form-control'
                            id='formFile'
                            name='document'
                            onChange={(e) => setDocument(e.target.files[0])}
                          />
                        </div>
                      )}

                      <div className='col-12 text-right'>
                        <button className='btn btn-dark  '>Submit</button>
                      </div>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className='d-flex justify-content-between align-items-center'>
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
                  <th>Emp. ID</th>
                  <th>Name</th>
                  <th>Department</th>
                  <th>Mobile</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {currentItems &&
                  currentItems.map((employee) => (
                    <tr
                      key={employee._id}
                      id={!employee.active ? 'inActiveRow' : ''}
                    >
                      <td>{employee.employeeId}</td>
                      <td>{employee.employeeName}</td>
                      <td>{employee.department.name}</td>
                      <td>{employee.mobile}</td>
                      <td className='btn-group'>
                        <button
                          onClick={() => editHandler(employee)}
                          className='btn btn-light btn-sm'
                          data-bs-toggle='modal'
                          data-bs-target='#employeeModal'
                        >
                          <FaEdit /> Edit
                        </button>{' '}
                        {userInfo && userInfo.isAdmin && (
                          <button
                            className='btn btn-danger btn-sm'
                            onClick={() => deleteHandler(employee._id)}
                          >
                            <FaTrash /> Delete
                          </button>
                        )}
                        {employee.active && (
                          <>
                            <Link
                              to={`/leave/${employee._id}`}
                              className='btn btn-dark btn-sm'
                            >
                              <FaShare /> L. Request
                            </Link>
                            <Link
                              to={`/write-up/${employee._id}`}
                              className='btn btn-warning btn-sm'
                            >
                              <FaExclamationTriangle /> Write Up
                            </Link>
                          </>
                        )}
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
              <Pagination
                setCurrentPage={setCurrentPage}
                totalItems={totalItems}
                arrayLength={employees && employees.length}
                itemsPerPage={itemsPerPage}
              />
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default EmployeeScreen
