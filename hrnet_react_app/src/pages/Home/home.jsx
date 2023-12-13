import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "../../styles/sass/pages/_home.scss";
import { saveEmployee } from "../../features/employeesSlice";
import states from "../../utils/states";
import {
  isTextInputValid,
  isAddressInputValid,
  isZipCodeValid,
  isDateInputValid,
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

  //État global du formulaire avec useState
  const [formState, setFormState] = useState(initialState);

  // Bootstrap validation des champs pour appliquer le style
  const forms = document.querySelectorAll(".needs-validation");

  //fonction pour mettre à jour un champ du formulaire sans modifier l'état
  const handleChange = (fieldName, value) => {
    setFormState((prevState) => ({
      ...prevState,
      [fieldName]: value,
    }));
  };

  // Fonction pour créer un employé
  const handleSaveEmployee = async (e) => {
    e.preventDefault();

    Array.from(forms).forEach((form) => {
      if (!form.checkValidity()) {
        e.preventDefault();
        e.stopPropagation();
      }

      form.classList.add("was-validated");
    });

    // Vérification des champs obligatoires => aucuns champs vide
    const areFieldsValid = fieldNames.every((fieldName) => {
      return formState[fieldName].trim() !== "";
    });
    // Si vide ne renvoie rien
    if (!areFieldsValid) {
      // console.log(areFieldsValid);
      return;
    }
    // Création de l'objet employeeData avec les valeurs des champs
    const newEmployeeData = {};
    fieldNames.forEach((fieldName) => {
      newEmployeeData[fieldName] = formState[fieldName];
    });

    // Ouvrir la Modal
    setModalIsOpen(true);

    // Appel de l'action createEmployeeData avec les données du nouvel employé
    dispatch(saveEmployee(newEmployeeData));

    // Réinitialisation des champs du formulaire après la soumission
    setFormState(initialState);
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
    <main className="container-fluid gradient-background mt-0 d-flex flex-column justify-content">
      <h1 className="text-center">Create Employee</h1>
      <div className="d-flex align-items-center mt-5 flex-lg-row flex-column">
        <form
          className="row g-1 mb-md-0 mb-3 mx-auto needs-validation"
          id="create-employee"
          noValidate
          onSubmit={handleSaveEmployee}
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
                !isTextInputValid(formState.firstName) &&
                "is-invalid"
              }`}
              value={formState.firstName}
              onChange={(e) => handleChange("firstName", e.target.value)}
              required
            />
            {formState.firstName && !isTextInputValid(formState.firstName) && (
              <div className="invalid-feedback col-md-1">
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
                !isTextInputValid(formState.lastName) &&
                "is-invalid"
              }`}
              value={formState.lastName}
              onChange={(e) => handleChange("lastName", e.target.value)}
              required
            />
            {formState.lastName && !isTextInputValid(formState.lastName) && (
              <div className="invalid-feedback col-md-1">
                Please provide a valid Last Name.
              </div>
            )}
          </div>

          <div className="col-md-6 p-1">
            <label htmlFor="date-of-birth" className="form-label fw-bold">
              Date of Birth
            </label>
            <input
              id="date-of-birth"
              type="date"
              className={`form-control ${
                formState.dateOfBirth &&
                !isDateInputValid(formState.dateOfBirth) &&
                "is-invalid"
              }`}
              value={formState.dateOfBirth}
              onChange={(e) => handleChange("dateOfBirth", e.target.value)}
              required
            />
            {formState.dateOfBirth &&
              !isDateInputValid(formState.dateOfBirth) && (
                <div className="invalid-feedback col-md-1">
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
              type="date"
              className={`form-control ${
                formState.startDate &&
                !isDateInputValid(formState.startDate) &&
                "is-invalid"
              }`}
              value={formState.startDate}
              onChange={(e) => handleChange("startDate", e.target.value)}
              required
            />
            {formState.startDate && !isDateInputValid(formState.startDate) && (
              <div className="invalid-feedback col-md-1">
                Please provide a valid Date.
              </div>
            )}
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
                className={`form-control ${
                  formState.street &&
                  !isAddressInputValid(formState.street) &&
                  "is-invalid"
                }`}
                value={formState.street}
                onChange={(e) => handleChange("street", e.target.value)}
                required
              />
              {formState.street && !isAddressInputValid(formState.street) && (
                <div className="invalid-feedback col-md-1">
                  Please provide a valid Street.
                </div>
              )}
            </div>
            <div className="row gx-0 gy-1">
              <div className="col-md-8 col-lg-4 p-1">
                <label className="form-label fw-bold" htmlFor="city">
                  City
                </label>
                <input
                  id="city"
                  type="text"
                  className={`form-control ${
                    formState.city &&
                    !isTextInputValid(formState.city) &&
                    "is-invalid"
                  }`}
                  value={formState.city}
                  onChange={(e) => handleChange("city", e.target.value)}
                  required
                />
                {formState.city && !isTextInputValid(formState.city) && (
                  <div className="invalid-feedback col-md-1">
                    Please provide a valid City.
                  </div>
                )}
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
                  required
                ></select>
                <div className="invalid-tooltip">Please select a valid state.</div>
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
                  required
                  className={`form-control ${
                    formState.zipCode &&
                    !isZipCodeValid(formState.zipCode) &&
                    "is-invalid"
                  }`}
                />
                {formState.zipCode && !isZipCodeValid(formState.zipCode) && (
                  <p className="invalid-feedback col-md-1">
                    Please provide a valid zip code.
                  </p>
                )}
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
              value={formState.department}
              onChange={(e) => handleChange("department", e.target.value)}
              required
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
