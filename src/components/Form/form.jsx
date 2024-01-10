import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { saveEmployee } from "../../features/employeesSlice";
import {
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

  const handleDateChange = (fieldName, date, classList) => {
    if (isDateInputValid(date)) {
      handleChange(fieldName, date);
    } else {
      console.error("Invalid date format");
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

      <div className="col-md-6 p-1">
        <label htmlFor="date-of-birth" className="form-label fw-bold">
          Date of Birth
        </label>
        <DatePicker
          inputRef={inputRef}
          dateFormat={"dd/MM/yyyy"}
          fontSize="1rem"
          id="date-of-birth"
          minYear={2000}
          maxYear={2025}
          language={"en-EN"}
          errorClass="invalid-feedback col-md-1"
          value={formState.dateOfBirth}
          calendarWidth="330px"
          onSelect={(selectedDate) =>
            handleDateChange("dateOfBirth", selectedDate)
          }
          inputClassName={`form-control ${
            formState.dateOfBirth &&
            !isDateInputValid(formState.dateOfBirth) &&
            "is-invalid"
          } `}
          onChange={(e) => handleDateChange("dateOfBirth", e.target.value)}
          monthSelectClass="custom-month-select-class"
          yearSelectClass="custom-year-select-class"
          required
        />
        {formState.dateOfBirth && !isDateInputValid(formState.dateOfBirth) && (
          <div className={`errorClass`}>
            Please provide a valid Date of Birth.
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
          onChange={(e) => handleDateChange("startDate", e.target.value)}
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
            autoComplete="address-line1"
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
              autoComplete="address-level2"
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
            <Dropdown
              id="state"
              name="state"
              value={formState.state !== undefined ? formState.state : null}
              autoComplete="address-level1"
              onChange={(selectedValue) => {
                handleChange("state", selectedValue.value.toString());
              }}
            />
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
          required
          autoComplete="off"
        />
        <div className="invalid-tooltip">Please select a valid state.</div>
      </div>
      <div className="col-12">
        <div className="d-grid gap-2 mx-auto mb-5 mt-5 col-md-3">
          <button type="submit" className="btn custom-btn fw-bold">
            Save
          </button>
        </div>
      </div>
      <div>
        <ModalApp modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} />
      </div>
    </form>
  );
}
