import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../../pages/Home/home";
import EmployeeList from "../../pages/EmployeeList/employeeList";
import Error from "../../pages/Error/error";

/**
 * App component serving as the main entry point for the application.
 *
 * @component
 *
 * @returns {JSX.Element} - The App component.
 */
export default function App() {
  return (
    <Routes>
       {/* Home Page */}
      <Route path="/" element={<Home />} />
       {/* Employee List Page */}
      <Route path="/employee-list" element={<EmployeeList />} />
       {/* Error Page for undefined routes */}
      <Route path="*" element={<Error />} />
    </Routes>
  );
}
