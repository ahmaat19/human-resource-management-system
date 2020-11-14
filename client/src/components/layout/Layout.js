import React from "react";
import { Link } from "react-router-dom";
import { logout } from "../../actions/auth";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import logo from "./logo.png";

// Material UI Icons
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import ReportIcon from "@material-ui/icons/Report";

const Navbar = ({
  logout,
  auth: { isAuthenticated, loading, user },
  children,
}) => {
  const authLinks = (
    <ul className='navbar-nav mr-right mb-2 mb-lg-0'>
      <li className='nav-item'>
        {" "}
        <Link to='?#' className='nav-link text-muted'>
          {" "}
          Welcome {user && user.name}
        </Link>
      </li>

      <li className='nav-item'>
        <Link to='/discount' className='nav-link'>
          Discount
        </Link>
      </li>

      <li className='nav-item dropdown'>
        <span
          disabled
          className='nav-link dropdown-toggle'
          id='navbarDropdown'
          role='button'
          data-toggle='dropdown'
          aria-expanded='false'
        >
          <svg viewBox='0 0 20 20' fill='currentColor' className='cog w-6 h-6'>
            <path
              fillRule='evenodd'
              d='M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z'
              clipRule='evenodd'
            />
          </svg>{" "}
          Basic Settings
        </span>
        <ul className='dropdown-menu' aria-labelledby='navbarDropdown'>
          <li>
            <Link to='/department' className='dropdown-item'>
              <svg
                viewBox='0 0 20 20'
                fill='currentColor'
                className='office-building w-6 h-6'
              >
                <path
                  fillRule='evenodd'
                  d='M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z'
                  clipRule='evenodd'
                />
              </svg>
              Department
            </Link>
          </li>

          <li>
            <Link to='/employee' className='dropdown-item'>
              <svg
                viewBox='0 0 20 20'
                fill='currentColor'
                className='user-group w-6 h-6'
              >
                <path d='M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z' />
              </svg>
              Employee
            </Link>
          </li>
          <li>
            <Link to='/resign' className='dropdown-item'>
              <svg
                className='w-6 h-6'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636'
                />
              </svg>
              Resign
            </Link>
          </li>
        </ul>
      </li>

      <li className='nav-item'>
        <Link to='/report' className='nav-link'>
          <ReportIcon fontSize='small' />
          Report
        </Link>
      </li>

      <li className='nav-item'>
        <Link to='/change-password' className='nav-link'>
          <LockOpenIcon fontSize='small' />
          Change Password
        </Link>
      </li>
      {user && user.role === "Admin" && (
        <li className='nav-item'>
          <Link to='/register' className='nav-link'>
            <PersonAddIcon fontSize='small' />
            Signup
          </Link>
        </li>
      )}

      <li className='nav-item'>
        <Link to='/login' onClick={logout} className='nav-link'>
          <ExitToAppIcon fontSize='small' />
          Logout
        </Link>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul className='navbar-nav mr-right mb-2 mb-lg-0'>
      <li className='nav-item'>
        <Link to='/discount' className='nav-link'>
          Discount
        </Link>
      </li>
      <li className='nav-item'>
        <Link to='/login' onClick={logout} className='nav-link'>
          <ExitToAppIcon fontSize='small' />
          Login
        </Link>
      </li>
    </ul>
  );

  return (
    <>
      <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
        <div className='container-fluid'>
          <Link to='/' className='navbar-brand'>
            <img
              src={logo}
              width='30'
              height='30'
              className='d-inline-block align-top mr-2 logo'
              alt=''
              loading='lazy'
            />
            LEAVE MANAGEMENT
          </Link>
          <button
            className='navbar-toggler'
            type='button'
            data-toggle='collapse'
            data-target='#navbarSupportedContent'
            aria-controls='navbarSupportedContent'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <span className='navbar-toggler-icon'></span>
          </button>
          <div className='collapse navbar-collapse' id='navbarSupportedContent'>
            <ul className='navbar-nav mr-auto mb-2 mb-lg-0'></ul>

            {!loading && <>{isAuthenticated ? authLinks : guestLinks}</>}
          </div>
        </div>
      </nav>

      <div className='container'>{children}</div>

      <div className='text-muted card-footer  text-center'>
        Developer Contact -{" "}
        <strong>
          <a href='mailto:ahmaat19@gmail.com'>ahmaat19@gmail.com</a>
        </strong>
      </div>
    </>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
