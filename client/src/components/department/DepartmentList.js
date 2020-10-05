import React, { Fragment } from 'react';
import Moment from 'react-moment';
import moment from 'moment';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';

const DepartmentList = ({ handleUpdate, departments, deleteDepartment }) => {
  return (
    <div>
      <h3 className='text-center form-title mb-4'>Department List</h3>
      <hr />
      <div className='table-responsive'>
        <table className='table table-sm table-hover table-bordered caption-top'>
          <caption>
            {departments && departments.length} records were found
          </caption>
          <thead>
            <tr>
              <th>Date & Time</th>
              <th>Department</th>
              <>Action</>
            </tr>
          </thead>
          <tbody>
            {departments &&
              departments.map((department) => {
                return (
                  <tr
                    key={department._id}
                    id={department._id % 2 === 0 ? 'orange' : 'green'}
                  >
                    <td>
                      <Moment format='YYYY-MM-DD HH:mm:ss'>
                        {moment(department.date)}
                      </Moment>
                    </td>
                    <td>{department.name}</td>
                    <td>
                      <button
                        onClick={() => handleUpdate(department)}
                        className='btn btn-outline-info btn-sm'
                      >
                        <EditIcon fontSize='small' />
                      </button>{' '}
                      <button
                        onClick={() => deleteDepartment(department._id)}
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

export default DepartmentList;
