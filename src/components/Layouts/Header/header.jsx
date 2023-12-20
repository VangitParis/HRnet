import React from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import "../../../styles/sass/layouts/_header.scss";

export default function Header() {
  const location = useLocation();

  // Si l'emplacement actuel est "/employee-list"
  const isEmployeeListPage = location.pathname === "/employee-list";

  return (
    <header className="custom-border border-3">
      <nav className="navbar navbar-expand-lg navbar-custom navbar-light">
        <div className="container-fluid">
          <Link className="navbar-brand fs-2" to="/HRnet">
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
                  >
                    View Current Employees
                  </Link>
                </li>
              )}
              {isEmployeeListPage && (
                <li className="nav-item ">
                  <Link className="nav-link active" aria-current="page" to="/HRnet">
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
