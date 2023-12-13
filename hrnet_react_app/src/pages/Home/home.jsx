import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "../../styles/sass/pages/_home.scss";
import { saveEmployee } from "../../features/employeesSlice";
import states from "../../utils/states";
import {
  isNamesInputValid,
  isZipCodeValid,
} from "../../modelisation/modelisation";

import ModalApp from "../../components/Modal/modal";

export default function Home() {
  const dispatch = useDispatch();

  const [modalIsOpen, setModalIsOpen] = useState(false);

  //Définition des champs
  const fieldNames = [
    "firstName",
    "lastName",
    "dateOfBirth",
    "startDate",
    "department",
    "street",
    "city",
    "state",
    "zipCode",
  ];
  //initialState créé avec la méthode reduce pour créer un objet d'état initial
  //avec chaque champ initialisé à une chaîne vide
  const initialState = fieldNames.reduce((state, fieldName) => {
    state[fieldName] = "";
    return state;
  }, {});

  //ÉTat global du formulaire avec useState
  const [formState, setFormState] = useState(initialState);
  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll(".needs-validation");

  //fonction pour mettre à jour un champ du formulaire sans modifier l'état
  const handleChange = (fieldName, value) => {
    setFormState((prevState) => ({
      ...prevState,
      [fieldName]: value,
    }));

    // Loop over them and prevent submission
    Array.prototype.slice.call(forms).forEach(function (form) {
      form.addEventListener(
        "submit",
        function (event) {
          if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
          }

          form.classList.add("was-validated");
        },
        false
      );
    });
  };

  const handleSaveEmployee = async (e) => {
    e.preventDefault();

    // Vérification des champs obligatoires
    if (!fieldNames) {
      return;
    } else {
      // Création de l'objet employeeData avec les valeurs des champs
      const newEmployeeData = {};
      fieldNames.forEach((fieldName) => {
        newEmployeeData[fieldName] = formState[fieldName];
      });

      // Réinitialisation des champs du formulaire après la soumission
      setFormState(initialState);
      
      // Ouvrir la Modal
      setModalIsOpen(true)
      console.log(modalIsOpen);

      // Appel de l'action createEmployeeData avec les données du nouvel employé
      dispatch(saveEmployee(newEmployeeData));
      return;
    }
  };
  useEffect(() => {
    // Remplir le menu déroulant des états après le rendu initial
    const stateSelect = document.getElementById("state");
    states.forEach((state) => {
      const option = document.createElement("option");
      option.value = state.abbreviation;
      option.text = state.name;
      stateSelect.appendChild(option);
    });
    
  }, []);

  return (
    <main className="container-fluid gradient-background mt-0 vh-100 d-flex flex-column justify-content">
      <h1 className="text-center">Create Employee</h1>
      <div className="d-flex align-items-center mt-5 flex-lg-row flex-column">
        <form
          className="row g-1 mb-md-0 mb-3 mx-auto needs-validation"
          id="create-employee"
          noValidate
        >
          <div className="col-md-6 p-1">
            <label htmlFor="first-name" className="form-label fw-bold">
              First Name
            </label>
            <input
              type="text"
              id="first-name"
              aria-label="First Name"
              className={`form-control ${
                formState.firstName &&
                !isNamesInputValid(formState.firstName) &&
                "is-invalid"
              }`}
              value={formState.firstName}
              onChange={(e) => handleChange("firstName", e.target.value)}
              required
            />
            {formState.firstName && !isNamesInputValid(formState.firstName) && (
              <div className="invalid-feedback display-block col-md-1">
                Please provide a valid First Name.
              </div>
            )}
          </div>

          <div className="col-md-6 p-1">
            <label htmlFor="last-name" className="form-label fw-bold">
              Last Name
            </label>
            <input
              type="text"
              id="last-name"
              aria-label="Last Name"
              className={`form-control ${
                formState.lastName &&
                !isNamesInputValid(formState.lastName) &&
                "is-invalid"
              }`}
              value={formState.lastName}
              onChange={(e) => handleChange("lastName", e.target.value)}
              required
            />
            {formState.lastName && !isNamesInputValid(formState.lastName) && (
              <>
                <div className="invalid-feedback display-block col-md-2">
                  Please provide a valid Last Name.
                </div>
                <div className="valid-feedback"> Ok!</div>
              </>
            )}
          </div>

          <div className="col-md-6 p-1">
            <label htmlFor="date-of-birth" className="form-label fw-bold">
              Date of Birth
            </label>
            <input
              id="date-of-birth"
              type="text"
              className={`form-control `}
              value={formState.dateOfBirth}
              onChange={(e) => handleChange("dateOfBirth", e.target.value)}
              required
            />
            {formState.dateOfBirth &&
              !isNamesInputValid(formState.dateOfBirth) && (
                <div className="invalid-feedback valid-feedback display-block col-md-2">
                  Please provide a valid Date.
                </div>
              )}
          </div>

          <div className="col-md-6 p-1">
            <label htmlFor="start-date" className="form-label fw-bold">
              Start Date
            </label>
            <input
              id="start-date"
              type="text"
              className="form-control"
              value={formState.startDate}
              onChange={(e) => handleChange("startDate", e.target.value)}
              required
            />
          </div>

          <fieldset className="row gy-2 gx-0 align-items-center">
            <legend className="p-1 mb-0">Address</legend>
            <div className="col-md-6 col-lg-12 p-1">
              <label htmlFor="street" className="form-label fw-bold">
                Street
              </label>
              <input
                id="street"
                type="text"
                className="form-control"
                value={formState.street}
                onChange={(e) => handleChange("street", e.target.value)}
              />
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
                  value={formState.city}
                  onChange={(e) => handleChange("city", e.target.value)}
                />
              </div>
              <div className="invalid-feedback">
                Please provide a valid city.
              </div>
              <div className="col-md-8 col-lg-4 p-1">
                <label className="form-label fw-bold" htmlFor="state">
                  State
                </label>
                <select
                  name="state"
                  id="state"
                  className="form-select form-control"
                  value={formState.state}
                  onChange={(e) => handleChange("state", e.target.value)}
                ></select>
              </div>

              <div className="col-md-8 col-lg-4 p-1">
                <label className="form-label fw-bold" htmlFor="zip-code">
                  Zip Code
                </label>
                <input
                  id="zip-code"
                  type="text"
                  value={formState.zipCode}
                  onChange={(e) => handleChange("zipCode", e.target.value)}
                  className={`form-control ${
                    formState.zipCode &&
                    !isZipCodeValid(formState.zipCode) &&
                    "is-invalid"
                  }`}
                />
              </div>

              {formState.zipCode && !isZipCodeValid(formState.zipCode) && (
                <p className="invalid-feedback display-block">
                  Please provide a valid zip code.
                </p>
              )}
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
              // onChange={(e) => setDepartment(e.target.value)}
              // value={department}
              value={formState.department}
              onChange={(e) => handleChange("department", e.target.value)}
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
                type="submit"
                className="btn custom-btn fw-bold"
                onClick={handleSaveEmployee}
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>

      <div>
      <ModalApp modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} />
      </div>
    </main>
  );
}
