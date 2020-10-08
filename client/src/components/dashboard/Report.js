import React, { useEffect, useState } from 'react';
import Spinner from '../layout/Spinner';
import { connect } from 'react-redux';
import { getLeaves } from '../../actions/leave';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import moment from 'moment';

const Report = ({ leaves: { loading, leaves }, getLeaves }) => {
  const [employee, setEmployee] = useState(' ');

  useEffect(() => {
    getLeaves();
  }, []);
  return loading ? (
    <Spinner />
  ) : (
    <div className='row pt-4'>
      <div className='col-lg-2 mt-4'>
        <h3 className='text-center form-title mb-4'>Search</h3>
        <hr />
        <div className='input-group'>
          <span className='input-group-text' id='basic-addon1'>
            <svg
              viewBox='0 0 20 20'
              fill='currentColor'
              className='identification w-6 h-6'
            >
              <path
                fillRule='evenodd'
                d='M10 2a1 1 0 00-1 1v1a1 1 0 002 0V3a1 1 0 00-1-1zM4 4h3a3 3 0 006 0h3a2 2 0 012 2v9a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm2.5 7a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm2.45 4a2.5 2.5 0 10-4.9 0h4.9zM12 9a1 1 0 100 2h3a1 1 0 100-2h-3zm-1 4a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z'
                clipRule='evenodd'
              />
            </svg>
          </span>
          <input
            name='employee'
            onChange={(e) => setEmployee(e.target.value)}
            type='text'
            className='form-control py-2'
            placeholder='Enter employee ID'
          />
        </div>
      </div>

      <div className='col-lg-10'>
        <div className='mt-4'>
          <h3 className='text-center form-title mb-4'>Leave Report</h3>
          <hr />
          <div className='table-responsive'>
            <table className='table table-sm table-hover caption-top'>
              <caption>
                {leaves && leaves.length} records were found on leave
              </caption>
              <thead>
                <tr>
                  <th>Emp. Name</th>
                  <th>Department</th>
                  <th>Leave Type</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {leaves.map((leave) =>
                  leave.employee.emp_id.includes(
                    employee.toLocaleUpperCase()
                  ) ? (
                    <tr
                      key={leave._id}
                      id={leave._id % 2 === 0 ? 'orange' : 'green'}
                    >
                      <td>{leave.employee.name}</td>
                      <td>@TODO</td>
                      <td>{leave.leave}</td>
                      <td>
                        <Moment format='YYYY-MM-DD'>
                          {moment(leave.start_date)}
                        </Moment>
                      </td>
                      <td>
                        <Moment format='YYYY-MM-DD'>
                          {moment(leave.end_date)}
                        </Moment>
                      </td>
                      <td>{leave.description}</td>
                    </tr>
                  ) : (
                    leaves.map(
                      (leave) =>
                        employee === '' && (
                          <tr
                            key={leave._id}
                            id={leave._id % 2 === 0 ? 'orange' : 'green'}
                          >
                            <td>{leave.employee.name}</td>
                            <td>@TODO</td>
                            <td>{leave.leave}</td>
                            <td>
                              <Moment format='YYYY-MM-DD'>
                                {moment(leave.start_date)}
                              </Moment>
                            </td>
                            <td>
                              <Moment format='YYYY-MM-DD'>
                                {moment(leave.end_date)}
                              </Moment>
                            </td>
                            <td>{leave.description}</td>
                          </tr>
                        )
                    )
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

Report.propTypes = {
  getLeaves: PropTypes.func.isRequired,
  leaves: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  leaves: state.leave,
});

export default connect(mapStateToProps, { getLeaves })(Report);
