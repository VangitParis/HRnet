import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import EmployeeTable from "../../components/Tables/employeeTable";
import { selectEmployees } from "../../utils/selectors";
import "../../styles/sass/pages/_employeesList.scss";
import { getMockEmployeeData } from "../../services/employeesServices";

export default function EmployeeList() {
  const dispatch = useDispatch();
  const { loading, error } = useSelector(selectEmployees);
  const newEmployeeList = useSelector((state) => state.employees.list);

  useEffect(() => {
    // Mettre à jour la liste des employés dans le store Redux
    dispatch(getMockEmployeeData());
  }, [dispatch]);

  return loading ? (
    <main className="main">Loading...</main>
  ) : error ? (
    <main className="main">Error: {error}</main>
  ) : (
    <main className="container-fluid gradient-background_employeeList mt-0 d-flex flex-column justify-content">
      <h1 className="mt-1 text-center">Current Employees</h1>
      <EmployeeTable data={newEmployeeList} />
    </main>
  );
}
