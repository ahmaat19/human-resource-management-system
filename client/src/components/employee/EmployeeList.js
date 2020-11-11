import React from "react";
import Moment from "react-moment";
import moment from "moment";
import { Link } from "react-router-dom";

import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EditIcon from "@material-ui/icons/Edit";
import SendIcon from "@material-ui/icons/Send";

const EmployeeList = ({ handleUpdate, employees, deleteEmployee }) => {
  return (
    <div>
      <h3 className='text-center form-title mb-4'>Employee List</h3>
      <hr />
      <div className='table-responsive'>
        <table className='table table-sm table-hover table-bordered caption-top'>
          <caption>{employees && employees.length} records were found</caption>
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
            {employees &&
              employees.map(
                (employee) =>
                  employee.active === "Yes" && (
                    <tr
                      key={employee._id}
                      id={employee._id % 2 === 0 ? "orange" : "green"}
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
                      <td>
                        <button
                          onClick={() => handleUpdate(employee)}
                          className='btn btn-outline-info btn-sm'
                        >
                          <EditIcon fontSize='small' />
                        </button>{" "}
                        <button
                          onClick={() => deleteEmployee(employee._id)}
                          className='btn btn-outline-danger btn-sm'
                        >
                          <DeleteForeverIcon fontSize='small' />
                        </button>{" "}
                        <Link
                          to={`/leave/${employee._id}`}
                          className='btn btn-outline-info btn-sm'
                        >
                          <SendIcon fontSize='small' />
                        </Link>
                      </td>
                    </tr>
                  )
              )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeList;
