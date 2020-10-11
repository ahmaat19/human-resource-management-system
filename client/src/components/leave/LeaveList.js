import React from 'react';
import Moment from 'react-moment';
import moment from 'moment';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';

const LeaveList = ({ handleUpdate, leaves, deleteLeave }) => {
  return (
    <div>
      <h3 className='text-center form-title mb-4'>Leave Request List</h3>
      <hr />
      <div className='table-responsive'>
        <table className='table table-sm table-hover table-bordered caption-top'>
          <caption>{leaves && leaves.length} records were found</caption>
          <thead>
            <tr>
              <th>Emp. ID</th>
              <th>Emp. Name</th>
              <th>Leave</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {leaves &&
              leaves.map((leave) => {
                return (
                  <tr
                    key={leave._id}
                    id={leave._id % 2 === 0 ? 'orange' : 'green'}
                  >
                    <td>{leave.employee.emp_id}</td>
                    <td>{leave.employee.name}</td>
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
                    <td>
                      <button
                        onClick={() => handleUpdate(leave)}
                        className='btn btn-outline-info btn-sm'
                      >
                        <EditIcon fontSize='small' />
                      </button>{' '}
                      <button
                        onClick={() => deleteLeave(leave._id)}
                        className='btn btn-outline-danger btn-sm'
                      >
                        <DeleteForeverIcon fontSize='small' />
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaveList;
