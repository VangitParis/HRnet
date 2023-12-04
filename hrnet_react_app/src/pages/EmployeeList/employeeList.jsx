import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import EmployeeTable from "../../components/Tables/employeeTable";
// import { updateListEmployees } from "../../features/updateSliceList";
import { selectEmployees } from "../../utils/selectors";
export default function EmployeeList() {
  const dispatch = useDispatch();
  const employeesList = useSelector(selectEmployees);
  useEffect(() => {
    dispatch(employeesList)
  },[dispatch, employeesList])

  return (
    <main className="container-fluid gradient-background mt-0">
      <h1 className="mt-1 text-center">Current Employees</h1>
      <EmployeeTable />
      <Link to="/" className="mt-1 text-center">Home</Link>
    </main>
  );
}
