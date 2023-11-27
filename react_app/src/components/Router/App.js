import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../../pages/Home/home";
import EmployeeList from "../../pages/EmployeeList/employeeList";
import Error from "../../pages/Error/error";
export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/employee-list" element={<EmployeeList />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}
