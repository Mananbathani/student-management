import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/actions';

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const linkClass = ({ isActive }) => 'nav-link' + (isActive ? ' active fw-semibold' : '');

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/students">
          🎓 Student Manager
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNav"
          aria-controls="mainNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="mainNav">
          {user && (
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className={linkClass} to="/students" end>
                  Students
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={linkClass} to="/students/add">
                  Add Student
                </NavLink>
              </li>
            </ul>
          )}

          <ul className="navbar-nav ms-auto align-items-lg-center">
            {user ? (
              <>
                <li className="nav-item text-white me-lg-3">👤 {user}</li>
                <li className="nav-item">
                  <button className="btn btn-light btn-sm" onClick={handleLogout}>
                    Sign out
                  </button>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <NavLink className={linkClass} to="/login">
                  Login
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
