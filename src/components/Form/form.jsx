import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { saveEmployee } from "../../features/employeesSlice";
import {
  formatDate,
  isTextInputValid,
  isAddressInputValid,
  isZipCodeValid,
  isDateInputValid,
} from "../../modelisation/modelisation";
import ModalApp from "../../components/Modal/modal";
import Dropdown from "../Dropdown/dropdown";
import DatePicker from "plugin-datepicker";
import "../../styles/sass/components/_form.scss";

export default function Form() {
  const dispatch = useDispatch();
  const inputRef = useRef(null);

  const [modalIsOpen, setModalIsOpen] = useState(false);

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

  const handleChange = (fieldName, value) => {
    setFormState((prevState) => ({
      ...prevState,
      [fieldName]: value,
    }));
  };

  // Utilisation de la fonction de formatage dans handleDateChange
  const handleDateChange = (fieldName, date) => {
    const formattedDate = formatDate(date);
    if (isDateInputValid(formattedDate)) {
      handleChange(fieldName, formattedDate)
    }
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

    const areFieldsValid = fieldNames.every((fieldName) => {
      const fieldValue = formState[fieldName];
      // Vérifier si le champ est de type chaîne de caractères
      return fieldValue.toString().trim() !== "";
    });

    // Si des champs ne sont pas valides, interrompre la soumission du formulaire
    if (!areFieldsValid) {
      console.log(areFieldsValid);
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

  return (
    <form
      className="row g-1 mb-md-0 mb-3 mx-auto needs-validation"
      id="create-employee"
      noValidate
      onSubmit={handleSaveEmployee}
    >
      {/* FirstName */}
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
          autoComplete="given-name"
        />
        {formState.firstName && !isTextInputValid(formState.firstName) && (
          <div className="invalid-feedback col-md-1">
            Please provide a valid First Name.
          </div>
        )}
      </div>

      {/* LastName */}
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
          autoComplete="family-name"
        />
        {formState.lastName && !isTextInputValid(formState.lastName) && (
          <div className="invalid-feedback col-md-1">
            Please provide a valid Last Name.
          </div>
        )}
      </div>

      {/* DatePicker Input dateOfBirth*/}
      <div className="col-md-6 p-1">
        <label htmlFor="date-of-birth" className="form-label fw-bold">
          Date of Birth
        </label>
        <DatePicker
          id="date-of-birth"
          type="text"
          showCurrentDateOnMount={false}
          dateFormat={"dd/MM/yyyy"}
          minYear={1980}
          maxYear={2024}
          language={"en-EN"}
          value={formState.dateOfBirth}
          onChange={(date) => {
            console.log(
              "DatePicker value changed. New value:",
              !isDateInputValid(date)
            );
            handleDateChange("dateOfBirth", date);
          }}
          customInputClass={{
            className: `form-control custom-input-class ${
              formState.dateOfBirth && !isDateInputValid(formState.dateOfBirth) &&
                "is-invalid"
                
            }`,
          }}
          monthSelectClass="custom-month-select-style"
          yearSelectClass="custom-year-select-style"
          errorClass={`invalid-feedback col-md-12
  ${
    formState.dateOfBirth && !isDateInputValid(formState.dateOfBirth)
      ? "d-none"
      : "d-block"
  }`}
          errorMessage="Please provide a valid Date of Birth"
          required
        />
      </div>

      {/* DatePicker Input startDate*/}
      <div className="col-md-6 p-1">
        <label htmlFor="start-date" className="form-label fw-bold">
          Start Date
        </label>
        <DatePicker
          id="start-date"
          type="text"
          showCurrentDateOnMount={false}
          inputRef={inputRef}
          dateFormat={"dd/MM/yyyy"}
          minYear={2000}
          maxYear={2025}
          language={"en-EN"}
          value={formState.startDate}
          onChange={(date) => handleDateChange("startDate", date)}
          customInputClass={{
            className: `form-control custom-input-class 
            ${
              formState.startDate && !isDateInputValid(formState.startDate)
                ? "is-invalid"
                : ""
            }`,
          }}
          monthSelectClass="custom-month-select-style"
          yearSelectClass="custom-year-select-style"
          errorClass={`invalid-feedback col-md-12
          ${
            formState.startDate && !isDateInputValid(formState.startDate)
              ? "d-none"
              : "d-block"
          }`}
          errorMessage="Please provide a valid Date of Birth"
          required
        />
      </div>
      {/* Start Fieldset : Address */}
      <fieldset className="row gy-2 gx-0 align-items-center">
        <legend className="p-1 mb-0">Address</legend>

        {/* Street */}
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
            autoComplete="address-line1"
          />
          {formState.street && !isAddressInputValid(formState.street) && (
            <div className="invalid-feedback col-md-1">
              Please provide a valid Street.
            </div>
          )}
        </div>

        {/* City */}
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
              autoComplete="address-level2"
            />
            {formState.city && !isTextInputValid(formState.city) && (
              <div className="invalid-feedback col-md-1">
                Please provide a valid City.
              </div>
            )}
          </div>

          {/* Dropdown State */}
          <div className="col-md-8 col-lg-4 p-1">
            <label className="form-label fw-bold" htmlFor="state">
              State
            </label>
            <Dropdown
              id="state"
              name="state"
              value={formState.state !== undefined ? formState.state : null}
              className={`form-control ${
                formState.state &&
                !isTextInputValid(formState.state) &&
                "is-invalid"
              }`}
              autoComplete="address-level1"
              onChange={(selectedValue) => {
                handleChange("state", selectedValue.value.toString());
              }}
            />
            <div className="invalid-tooltip">Please select a valid state.</div>
          </div>

          {/* Zip code */}
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
              autoComplete="postal-code"
              className={`form-control ${
                formState.zipCode &&
                !isZipCodeValid(formState.zipCode) &&
                "is-invalid"
              }`}
            />
            {formState.zipCode && !isZipCodeValid(formState.zipCode) && (
              <div className="invalid-feedback col-md-1">
                Please provide a valid zip code.
              </div>
            )}
          </div>
        </div>
      </fieldset>
      {/* End Fieldset */}

      {/* Dropdown department */}
      <div className="col-auto col-md-12 col-lg-12 p-1 gx-0">
        <label htmlFor="department" className="form-label fw-bold">
          Department
        </label>
        <Dropdown
          name="department"
          id="department"
          value={formState.department}
          onChange={(selectedValue) =>
            handleChange("department", selectedValue.value)
          }
          className={`form-control ${
            formState.department &&
            !isTextInputValid(formState.department) &&
            "is-invalid"
          }`}
          required
          autoComplete="off"
        />
        <div className="invalid-tooltip">Please select a valid state.</div>
      </div>

      {/* Button Submit */}
      <div className="col-12">
        <div className="d-grid gap-2 mx-auto mb-5 mt-5 col-md-3">
          <button type="submit" className="btn custom-btn fw-bold">
            Save
          </button>
        </div>
      </div>

      {/* Modal */}
      <div>
        <ModalApp modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} />
      </div>
    </form>
  );
}
