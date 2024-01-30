import React from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import "../../../styles/sass/layouts/_header.scss";

/**
 * Header component for the navigation bar.
 *
 * @component
 *
 * @returns {JSX.Element} - The Header component.
 */
export default function Header() {
   /**
   * React Hook for accessing the current location object.
   *
   * @type {Object}
   */
  const location = useLocation();

   /**
   * Checks if the current page is the Employee List page.
   *
   * @type {boolean}
   */
  const isEmployeeListPage = location.pathname === "/employee-list";

 // JSX rendering of the Header
  return (
    <header className="custom-border border-3">
      <nav className="navbar navbar-expand-lg navbar-custom navbar-light">
        <div className="container-fluid">
          <Link className="navbar-brand fs-2" to="/">
            HRnet
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarText"
            aria-controls="navbarText"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {!isEmployeeListPage && (
                <li className="nav-item ">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to="/employee-list"
                    data-testid="employee-list-link"
                  >
                    View Current Employees
                  </Link>
                </li>
              )}
              {isEmployeeListPage && (
                <li className="nav-item ">
                  <Link className="nav-link active" aria-current="page" to="/">
                    Home
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
