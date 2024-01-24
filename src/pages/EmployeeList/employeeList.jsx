import React from "react";
import { useDispatch, useSelector  } from "react-redux";
import { useEffect, useState } from "react";
import EmployeeTable from "../../components/Tables/employeeTable";
import { selectEmployees } from "../../utils/selectors";
import { getMockEmployeeData } from "../../services/employeesServices";
import '../../styles/sass/pages/_employeesList.scss'
import backgroundImage from '../../assets/wave.png';

export default function EmployeeList() {
  const dispatch = useDispatch();
  const [imageLoaded, setImageLoaded] = useState(false);

  const { loading, error } = useSelector(selectEmployees);
  const newEmployeeList = useSelector((state) => state.employees.list);

  useEffect(() => {
    const image = new Image();

    image.src = backgroundImage;

    image.onload = () => {
      setImageLoaded(true);
    };

    // Mettre à jour la liste des employés dans le store Redux
      dispatch(getMockEmployeeData());
    return () => {
      image.onload = null;
    }
  }, [dispatch, imageLoaded]);
  const gradientBackgroundStyle = {
    backgroundImage: imageLoaded ? `url(${backgroundImage})` : 'none' ,
  };
  return loading ? (
    <main className="spinner-border text-secondary" role="status">
      <span className="visually-hidden">Loading...</span>
    </main>
  ) : error ? (
    <main className="main">Error: {error}</main>
  ) : (
    <main className="container-fluid gradient-background mt-0 d-flex flex-column justify-content" style={gradientBackgroundStyle}>
      <h1 className="mt-1 text-center">Current Employees</h1>
      <EmployeeTable data={newEmployeeList} />
    </main>
  );
}
