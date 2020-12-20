import React, { useEffect, useState } from 'react'
import Moment from 'react-moment'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listLeave } from '../actions/leaveActions'

const ReportScreen = () => {
  const [search, setSearch] = useState('')

  const dispatch = useDispatch()
  const leaveList = useSelector((state) => state.leaveList)
  const { leaves, error, loading } = leaveList

  useEffect(() => {
    dispatch(listLeave())
  }, [dispatch])

  const submitHandler = (e) => {
    e.preventDefault()
  }

  const newSearchedArray =
    leaves &&
    leaves.filter(
      (lea) => lea.employee.emp_id.toLowerCase() === search.toLowerCase()
    )

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <>
      <form onSubmit={submitHandler}>
        <label htmlFor='search'>Search Employee By ID</label>
        <div className='input-group mb-3'>
          <input
            required
            name='search'
            onChange={(e) => setSearch(e.target.value)}
            type='text'
            value={search}
            className='form-control '
            placeholder='e.g. YH-A###'
          />

          <span
            className='input-group-text bg-dark text-light'
            id='basic-addon2'
          >
            <i className='fa fa-search'></i>
          </span>
        </div>
      </form>

      {newSearchedArray.length > 0 ? (
        newSearchedArray.map((data, index) => (
          <div className='row' key={data._id}>
            <div className='col-12'>
              <h5 className='text-center text-uppercase text-light bg-dark p-3'>
                {index + 1} - Leave -
                {moment(data.start_date).format('Do MMM YYYY ')}
              </h5>
            </div>

            <div className='col-4'>
              <label htmlFor='' className='font-weight-bolder'>
                Employee ID
              </label>
            </div>
            <div className='col-8 text-primary'>
              {data.employee && data.employee.emp_id}
            </div>

            <div className='col-4'>
              <label htmlFor='' className='font-weight-bolder'>
                Employee Name
              </label>
            </div>
            <div className='col-8 text-primary'>
              {data.employee && data.employee.name}
            </div>

            <div className='col-4'>
              <label htmlFor='' className='font-weight-bolder'>
                Department
              </label>
            </div>
            <div className='col-8 text-primary'>
              {data.employee && data.employee.department.name}
            </div>

            <div className='col-4'>
              <label htmlFor='' className='font-weight-bolder'>
                Leave Type
              </label>
            </div>
            <div className='col-8 text-primary'> {data.leave}</div>

            <div className='col-4'>
              <label htmlFor='' className='font-weight-bolder'>
                Date
              </label>
            </div>
            <div className='col-8 text-primary'>
              <Moment format='YYYY-MM-DD '>{moment(data.start_date)}</Moment>-
              <Moment format=' YYYY-MM-DD '>{moment(data.start_date)}</Moment>
            </div>

            <div className='col-4'>
              <label htmlFor='' className='font-weight-bolder'>
                Description
              </label>
            </div>
            <div className='col-8 text-primary'>{data.description}</div>
          </div>
        ))
      ) : (
        <p className='text-center text-danger'>No leave records was found!</p>
      )}
    </>
  )
}

export default ReportScreen
