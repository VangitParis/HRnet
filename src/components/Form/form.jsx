import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { saveEmployee } from "../../features/employeesSlice";
import { parse, isAfter, isBefore } from "date-fns";

import {
  formatDate,
  isTextInputValid,
  isAddressInputValid,
  isZipCodeValid,
  isDateInputValid,
} from "../../modelisation/modelisation";
import ModalApp from "../../components/Modal/modal";
import DropdownList from "../DropdownList/dropdownList";

import InputDatePicker from "../InputDatePicker/inputDatePicker";
import "../../styles/sass/components/_form.scss";

export default function Form() {
  const dispatch = useDispatch();
  const formRef = useRef(null);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isDateOfBirthValid, setIsDateOfBirthValid] = useState(true);
  const [isStartDateValid, setIsStartDateValid] = useState(true);
  const [isStateSelected, setIsStateSelected] = useState(true);
  const [isDepartmentSelected, setIsDepartmentSelected] = useState(true);

  const [dateOfBirthError, setDateOfBirthError] = useState(null);
  const [startDateError, setStartDateError] = useState(null);
  const [generalError, setGeneralError] = useState(null);

  const [resetDatePickerState, setResetDatePicker] = useState(false);

  // initialState créé avec la méthode reduce pour créer un objet d'état initial
  // avec chaque champ initialisé à une chaîne vide
  const initialState = {
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    startDate: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    department: "",
  };

  const fieldNames = [
    "firstName",
    "lastName",
    "dateOfBirth",
    "startDate",
    "street",
    "city",
    "state",
    "zipCode",
    "department",
  ];
  const [formState, setFormState] = useState(initialState);
  const formClasses = ["row", "g-1", "mb-md-0", "mb-3", "mx-auto"];

  const handleChange = (fieldName, value) => {
    setFormState((prevState) => ({
      ...prevState,
      [fieldName]: value,
    }));
  };
  const updateDate = (newDate, fieldName, minYear, maxYear) => {
    const isValidDate =
      newDate &&
      !isNaN(newDate.getTime()) &&
      newDate.getFullYear() >= minYear &&
      newDate.getFullYear() <= maxYear &&
      newDate.getMonth() >= 0 &&
      newDate.getMonth() <= 11 &&
      newDate.getDate() >= 1 &&
      newDate.getDate() <=
        new Date(newDate.getFullYear(), newDate.getMonth() + 1, 0).getDate();

    setIsDateOfBirthValid(
      fieldName === "dateOfBirth" ? isValidDate : isDateOfBirthValid
    );
    setIsStartDateValid(
      fieldName === "startDate" ? isValidDate : isStartDateValid
    );
    if (!isValidDate) {
      const errorMessage =
        fieldName === "dateOfBirth"
          ? "Please provide a valid date of birth."
          : "Please provide a valid start date.";
      if (fieldName === "dateOfBirth") {
        setDateOfBirthError(errorMessage);
      } else if (fieldName === "startDate") {
        setStartDateError(errorMessage);
      }
    } else {
      setDateOfBirthError(null);
      setStartDateError(null);
    }
  };

  const handleDateChange = (fieldName, date, minYear, maxYear) => {
    const formattedDate = formatDate(date);
    const isValidField = isDateInputValid(formattedDate);

    handleChange(fieldName, formattedDate);
    const ageValid = isAgeValid(date);
    if (fieldName === "dateOfBirth") {
      setIsDateOfBirthValid(isValidField && ageValid);
      setDateOfBirthError(
        isValidField && ageValid
          ? null
          : "The date of birth must be a valid date, and you must be at least 18 years old."
      );
      if (ageValid) {
        updateDate(date, "dateOfBirth", minYear, maxYear);
      }
    } else if (fieldName === "startDate") {
      const minAge = 18;
      const minStartDate = parse(
        formState.dateOfBirth,
        "dd/MM/yyyy",
        new Date()
      );
      minStartDate.setFullYear(minStartDate.getFullYear() + 18);
      const currentDate = new Date();
      const startDate = parse(formattedDate, "dd/MM/yyyy", new Date());
      const startDateValid =
        isDateInputValid(formattedDate) &&
        isAfter(startDate, minStartDate) &&
        isBefore(startDate, currentDate);

      setIsStartDateValid(isValidField && startDateValid);
      setStartDateError(
        isValidField && startDateValid
          ? null
          : `Start date must be valid, at least ${minAge} years after your date of birth, and not exceed the current date.`
      );
      if (fieldName === "startDate" && startDateValid) {
        updateDate(startDate, "startDate", minYear, maxYear);
      }
    }
  };
  const isAgeValid = (birthDate) => {
    if (!birthDate) {
      return false;
    }

    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();

    return age >= 18;
  };

  const handleResetForm = () => {
    // Réinitialiser la prop resetState pour déclencher la réinitialisation de DatePicker
    setResetDatePicker(true);

    setFormState(initialState);
    formState.dateOfBirth = "";
    formState.startDate = "";
    setIsDateOfBirthValid(true);
    setIsStartDateValid(true);
    setDateOfBirthError(null);
    setStartDateError(null);
  };

  const handleSaveEmployee = async (e) => {
    e.preventDefault();

    setGeneralError(null);

    // Vérifier si la date de naissance est vide ou non valide
    if (!isDateOfBirthValid) {
      return;
    }

    // Vérifier si la date de début est vide ou non valide
    if (!isStartDateValid) {
      return;
    }
    // Vérifier la validité des champs
    if (!isStateSelected || !isDepartmentSelected) {
      setIsStateSelected(true);
      setIsDepartmentSelected(true);
      return;
    }

    const areFieldsValid = fieldNames.every((fieldName) => {
      const fieldValue = formState[fieldName];

      switch (fieldName) {
        case "dateOfBirth":
        case "startDate":
          return (
            fieldValue !== "" &&
            fieldValue !== undefined &&
            isDateInputValid(fieldValue)
          );
        case "street":
          return fieldValue && isAddressInputValid(fieldValue);
        case "state":
        case "department":
          return fieldValue !== null && fieldValue !== undefined;
        case "zipCode":
          return fieldValue && isZipCodeValid(fieldValue);

        default:
          return (
            fieldValue.toString().trim() !== "" && isTextInputValid(fieldValue)
          );
      }
    });

    // Si des champs ne sont pas valides, interrompre la soumission du formulaire
    if (!areFieldsValid) {
      setGeneralError("Please fill in all required fields.");
      return;
    }
    if (!formRef.current.reportValidity()) {
      return;
    }
    // Création de l'objet employeeData avec les valeurs des champs
    const newEmployeeData = {};
    fieldNames.forEach((fieldName) => {
      newEmployeeData[fieldName] = formState[fieldName];
    });

    // Appel de l'action createEmployeeData avec les données du nouvel employé
    dispatch(saveEmployee(newEmployeeData));

    // Réinitialiser les champs
    handleResetForm();

    // Ouvrir la Modal
    setModalIsOpen(true);
  };

  return (
    <form
      ref={formRef}
      className={formClasses.join(" ")}
      id="create-employee"
      onSubmit={handleSaveEmployee}
      data-testid="create-employee-form"
      noValidate
    >
      {/* FirstName */}
      <div className="col-md-12 col-lg-6 p-1 ">
        <label htmlFor="first-name" className="form-label fw-bold">
          First Name
        </label>
        <input
          type="text"
          id="first-name"
          aria-label="First Name"
          value={formState.firstName}
          onChange={(e) => handleChange("firstName", e.target.value)}
          className={`form-control ${
            formState.firstName && !isTextInputValid(formState.firstName)
              ? "is-invalid"
              : ""
          }`}
          autoComplete="given-name"
          required
        />
        {formState.firstName && (
          <div
            className="invalid-feedback col-md-1"
            data-testid="error-message"
          >
            Please provide a valid First Name.
          </div>
        )}
      </div>

      {/* LastName */}

      <div className="col-md-12 col-lg-6  p-1">
        <label htmlFor="last-name" className="form-label fw-bold">
          Last Name
        </label>
        <input
          type="text"
          id="last-name"
          aria-label="Last Name"
          className={`form-control ${
            formState.lastName && !isTextInputValid(formState.lastName)
              ? "is-invalid"
              : ""
          }`}
          value={formState.lastName}
          onChange={(e) => handleChange("lastName", e.target.value)}
          required
          autoComplete="family-name"
        />
        {formState.lastName && (
          <div className="invalid-feedback col-md-1">
            Please provide a valid Last Name.
          </div>
        )}
      </div>

      {/* DatePicker Input dateOfBirth */}
      <div className="col-md-12 col-lg-6 p-1 component-date">
        <label htmlFor="date-of-birth" className="form-label fw-bold">
          Date of Birth
        </label>

        <InputDatePicker
          name="date-of-birth"
          type="date"
          id="date-of-birth"
          fieldName="dateOfBirth"
          value={formState.dateOfBirth}
          minYear={1950}
          maxYear={2024}
          onChange={(date) => handleDateChange("dateOfBirth", date, 1950, 2024)}
          isDateValid={isDateOfBirthValid}
          className={`form-control ${!isDateOfBirthValid ? "is-invalid" : ""}`}
          resetState={resetDatePickerState}
          required
        />
        {dateOfBirthError && (
          <p
            className={`invalid-feedback col md-1 ${
              dateOfBirthError ? "d-block" : "d-none"
            }`}
          >
            {dateOfBirthError}
          </p>
        )}
      </div>

      {/* DatePicker Input startDate*/}
      <div className="col-md-12 col-lg-6 p-1 component-date" >
        <label htmlFor="start-date" className="form-label fw-bold">
          Start Date
        </label>
        <InputDatePicker
          name="start-date"
          type="date"
          id="start-date"
          fieldName="startDate"
          dateFormat="dd/MM/yyyy"
          value={formState.startDate}
          minYear={2000}
          maxYear={2024}
          onChange={(date) => handleDateChange("startDate", date, 2000, 2024)}
          isDateValid={isStartDateValid}
          className={`form-control ${!isStartDateValid ? "is-invalid" : ""}`}
          resetState={resetDatePickerState}
          required
        />
        {startDateError && (
          <p
            className={`invalid-feedback col md-1 ${
              startDateError ? "d-block" : "d-none"
            }`}
          >
            {startDateError}
          </p>
        )}{" "}
      </div>

      {/* Start Fieldset : Address */}
      <fieldset className=" gx-0 align-items-center">
        <legend className="p-1 mb-0 col-md-6">Address</legend>

        {/* Street */}
        <div className="col-md-12 col-lg-12 p-1">
          <label htmlFor="street" className="form-label fw-bold">
            Street
          </label>
          <input
            id="street"
            type="text"
            className={`form-control ${
              formState.street && !isAddressInputValid(formState.street)
                ? "is-invalid"
                : ""
            }`}
            value={formState.street}
            onChange={(e) => handleChange("street", e.target.value)}
            required
            autoComplete="address-line1"
          />
          {formState.street && (
            <div className="invalid-feedback col-md-1">
              Please provide a valid Street (ex: 123 Main Street ).
            </div>
          )}
        </div>

        {/* City */}
        <div className="row gx-0 gy-1">
          <div className="col-md-12 col-lg-4 p-1">
            <label className="form-label fw-bold" htmlFor="city">
              City
            </label>
            <input
              id="city"
              type="text"
              className={`form-control ${
                formState.city && !isTextInputValid(formState.city)
                  ? "is-invalid"
                  : ""
              }`}
              value={formState.city}
              onChange={(e) => handleChange("city", e.target.value)}
              required
              autoComplete="address-level2"
            />
            {formState.city && (
              <div className="invalid-feedback col-md-1">
                Please provide a valid City.
              </div>
            )}
          </div>

          {/* Dropdown State */}
          <div className="col-md-12 col-lg-4 p-1">
            <label className="form-label fw-bold" htmlFor="state-input">
              State
            </label>
            <DropdownList
              id="state"
              inputId="state-input"
              name="state"
              value={formState.state}
              className={`form-control ${
                formState.state === "" && !isStateSelected ? "is-invalid" : ""
              }`}
              autoComplete="address-level1"
              onChange={(selectedValue) => {
                handleChange("state", selectedValue.value);
              }}
            />
            {!isStateSelected && (
              <div className="invalid-feedback col-md-1">
                Please select a State.
              </div>
            )}
          </div>

          {/* Zip code */}
          <div className="col-md-12 col-lg-4 p-1">
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
                formState.zipCode && !isZipCodeValid(formState.zipCode)
                  ? "is-invalid"
                  : ""
              }`}
            />
            {formState.zipCode && (
              <div className="invalid-feedback col-md-1">
                Please provide a valid zip code.
              </div>
            )}
          </div>
        </div>
     

      {/* Dropdown department */}
      <div className="col-md-12 col-lg-12 p-1 gx-0">
        <label htmlFor="department-input" className="form-label fw-bold">
          Department
        </label>
        <DropdownList
          id="department"
          name="department"
          inputId="department-input"
          value={formState.department}
          onChange={(selectedValue) => {
            handleChange("department", selectedValue.value);
          }}
          className={`form-control ${
            formState.department === "" && !isDepartmentSelected
              ? "is-invalid"
              : ""
          }`}
          required
          autoComplete="off"
        />
        {!isDepartmentSelected && (
          <div className="invalid-feedback col-md-1">
            Please select a Department.
          </div>
        )}
        </div>
        </fieldset>
      {/* End Fieldset */}
     
      {/* Button Submit */}
        <div className="d-grid gap-2 mt-4 mx-auto col-md-3" >
          <button type="submit" className="btn custom-btn fw-bold">
            Save
          </button>
    
      </div>
      {generalError && (
          <div className="mx-auto col-md-12 text-center text-danger general-error">{generalError}</div>
      )}
      {/* Modal */}
      <div>
        <ModalApp modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} />
      </div>
    </form>
  );
}
