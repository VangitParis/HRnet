import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { saveEmployee } from "../../features/employeesSlice";
import "../../styles/sass/pages/_home.scss";

export default function Home() {
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [startDate, setStartDate] = useState("");
  const [department, setDepartment] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");


  const handleSaveEmployee = async (e) => {
    e.preventDefault();
    // Vérification des champs obligatoires
    if (!firstName || !lastName) {
      alert("Veuillez remplir tous les champs obligatoires.");
      return;
    }
    // Création de l'objet employeeData avec les valeurs des champs
    const newEmployeeData = {
      firstName,
      lastName,
      dateOfBirth,
      startDate,
      department,
      street,
      city,
      state,
      zipCode,
    };

    // Appel de l'action saveEmployee avec les données du nouvel employé
    dispatch(saveEmployee(newEmployeeData));

    // Réinitialisation des champs du formulaire après la soumission
    setFirstName("");
    setLastName("");
    setDateOfBirth("");
    setStartDate("");
    setDepartment("");
    setStreet("");
    setCity("");
    setState("");
    setZipCode("");

    // Affichage d'un message de confirmation !!!! à remplacer par la modal
    alert("Employee Created!");
  };

  return (
    <main className="container-fluid gradient-background mt-0 vh-100 d-flex flex-column justify-content">
      <h1 className="text-center">Create Employee</h1>
      <div className="d-flex align-items-center mt-5 flex-lg-row flex-column">
        <form className="row g-1 mb-md-0 mb-3 mx-auto" id="create-employee">
          <div className="col-md-6 p-1">
            <label htmlFor="first-name" className="form-label fw-bold">
              First Name
            </label>
            <input
              type="text"
              id="first-name"
              aria-label="First Name"
              className="form-control"
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
              required
            />
          </div>

          <div className="col-md-6 p-1">
            <label htmlFor="last-name" className="form-label fw-bold">
              Last Name
            </label>
            <input
              type="text"
              id="last-name"
              aria-label="Last Name"
              className="form-control"
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
              required
            />
          </div>

          <div className="col-md-6 p-1">
            <label htmlFor="date-of-birth" className="form-label fw-bold">
              Date of Birth
            </label>
            <input
              id="date-of-birth"
              type="text"
              className="form-control"
              onChange={(e) => setDateOfBirth(e.target.value)}
              value={dateOfBirth}
              required
            />
          </div>

          <div className="col-md-6 p-1">
            <label htmlFor="start-date" className="form-label fw-bold">
              Start Date
            </label>
            <input
              id="start-date"
              type="text"
              className="form-control"
              onChange={(e) => setStartDate(e.target.value)}
              value={startDate}
              required
            />
          </div>

          <fieldset className="row gy-2 gx-0 align-items-center">
            <legend className="p-1 mb-0">Address</legend>
            <div className="col-md-6 col-lg-12 p-1">
              <label htmlFor="street" className="form-label fw-bold">
                Street
              </label>
              <input id="street" type="text" className="form-control" />
            </div>
            <div className="row gx-0 gy-1">
              <div className="col-md-8 col-lg-4 p-1">
                <label className="form-label fw-bold" htmlFor="city">
                  City
                </label>
                <input
                  id="city"
                  type="text"
                  className="form-control"
                  onChange={(e) => setStreet(e.target.value)}
                  value={street}
                />
              </div>

              <div className="col-md-8 col-lg-4 p-1">
                <label className="form-label fw-bold" htmlFor="state">
                  State
                </label>
                <select
                  name="state"
                  id="state"
                  className="form-select form-control"
                ></select>
              </div>

              <div className="col-md-8 col-lg-4 p-1">
                <label className="form-label fw-bold" htmlFor="zip-code">
                  Zip Code
                </label>
                <input
                  id="zip-code"
                  type="number"
                  onChange={(e) => setZipCode(e.target.value)}
                  value={zipCode}
                  className="form-control"
                />
              </div>
            </div>
          </fieldset>

          <div className="col-auto col-md-12 col-lg-12 p-1 gx-0">
            <label htmlFor="department" className="form-label fw-bold">
              Department
            </label>
            <select
              name="department"
              id="department"
              className="form-select form-control"
              onChange={(e) => setDepartment(e.target.value)}
              value={department}
            >
              <option>Sales</option>
              <option>Marketing</option>
              <option>Engineering</option>
              <option>Human Resources</option>
              <option>Legal</option>
            </select>
          </div>
          <div className="col-12">
            <div className="d-grid gap-2 mx-auto mb-5 mt-5 col-md-3">
              <button
                className="btn custom-btn fw-bold"
                onClick={handleSaveEmployee}
              >
                Save
              </button>
            </div>
          </div>
        </form>
        <div id="confirmation" className="modal">
          Employee Created!
        </div>
      </div>
    </main>
  );
}
