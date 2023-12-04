import React from "react";
import { Link } from "react-router-dom";
import EmployeeTable from "../../components/Tables/employeeTable";
import { useSelector } from "react-redux";
import { selectEmployees } from "../../utils/selectors";
import '../../styles/sass/pages/_employeesList.scss';


export default function EmployeeList() {

  const employeesList = useSelector(selectEmployees);
  return (
    <main className="container-fluid gradient-background_employeeList mt-0 d-flex flex-column justify-content vh-100">
      <h1 className="mt-1 text-center">Current Employees</h1>
      <EmployeeTable employees={employeesList}/>
      <Link to="/" className="mt-1 text-center">Home</Link>
    </main>
  );
}
