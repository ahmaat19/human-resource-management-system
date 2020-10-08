import React, { useEffect } from 'react';
import Spinner from '../layout/Spinner';
import { connect } from 'react-redux';
import { getLeaves } from '../../actions/leave';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import moment from 'moment';

const Dashboard = ({ leaves: { loading, leaves }, getLeaves }) => {
  useEffect(() => {
    getLeaves();
  }, []);

  return loading ? (
    <Spinner />
  ) : (
    <div className='mt-4'>
      <h3 className='text-center form-title mb-4'>Current on Leave</h3>
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
            {leaves &&
              leaves.map((leave) => {
                if (
                  moment(leave.end_date).format('YYYY-MM-DD') >=
                  moment(Date.now()).format('YYYY-MM-DD')
                ) {
                  return (
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
                  );
                }
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

Dashboard.propTypes = {
  getLeaves: PropTypes.func.isRequired,
  leaves: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  leaves: state.leave,
});

export default connect(mapStateToProps, { getLeaves })(Dashboard);
