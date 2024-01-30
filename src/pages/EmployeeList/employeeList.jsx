import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import EmployeeTable from "../../components/Tables/employeeTable";
import { selectEmployees } from "../../utils/selectors";
import { getMockEmployeeData } from "../../services/employeesServices";
import "../../styles/sass/pages/_employeesList.scss";
import backgroundImage from "../../assets/wave.png";

/**
 * Functional component representing the Employee List page.
 *
 * @component
 * @returns {JSX.Element} - Employee List page component.
 */
export default function EmployeeList() {
  const dispatch = useDispatch();
  const [imageLoaded, setImageLoaded] = useState(false);

  // Select relevant data from the Redux store
  const { loading, error } = useSelector(selectEmployees);
  const newEmployeeList = useSelector((state) => state.employees.list);

  useEffect(() => {
    // Create an image element to preload the background image
    const image = new Image();
    // Set the source of the image to the background image
    image.src = backgroundImage;
    // Callback function when the image is loaded
    image.onload = () => {
      setImageLoaded(true);
    };
    // Dispatch action to fetch mock employee data
    dispatch(getMockEmployeeData());
    // Cleanup function to remove the onload event listener
    return () => {
      image.onload = null;
    };
  }, [dispatch]);

  // Style for the gradient background
  const gradientBackgroundStyle = {
    backgroundImage: imageLoaded ? `url(${backgroundImage})` : "none",
  };
  // Render the component based on loading and error states
  return loading ? (
    <main className="spinner-border text-secondary" role="status">
      <span className="visually-hidden">Loading...</span>
    </main>
  ) : error ? (
    <main className="main">Error: {error}</main>
  ) : (
    <main className=" mt-0 d-flex flex-column justify-content">
      <h1
        className="mt-1 text-center gradient-background"
        style={gradientBackgroundStyle}
      >
        Current Employees
      </h1>
      <EmployeeTable data={newEmployeeList} />
    </main>
  );
}
