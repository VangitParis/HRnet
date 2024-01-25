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

  const [resetState, setResetDatePicker] = useState(false);


  // initialState créé avec la méthode reduce pour créer un objet d'état initial
  // avec chaque champ initialisé à une chaîne vide
  const initialState = {
    firstName: "",
    lastName: "",
    dateOfBirth: "" || formatDate(new Date()),
    startDate: "" || formatDate(new Date()),
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

  const handleDateChange = (fieldName, date, minYear, maxYear) => {
    const formattedDate = formatDate(date);
    let isValidField;

    if (fieldName === "dateOfBirth") {
      if (formState.dateOfBirth === null) {
        console.error("Date of Birth is null.");
        return;
      }
      const minDateOfBirth = new Date();
      minDateOfBirth.setFullYear(minDateOfBirth.getFullYear() - 18);
      console.log("Min Date of Birth:", formatDate(minDateOfBirth));
      console.log("Selected Date of Birth:", formattedDate);
      isValidField =
        isDateInputValid(formattedDate) &&
        date &&
        date <= minDateOfBirth &&
        date.getFullYear() <= minDateOfBirth.getFullYear();
      console.log("Is Date of Birth Valid:", isValidField);
      setFormState((prevFormState) => ({
        ...prevFormState,
        dateOfBirth: formattedDate,
      }));
      setDateOfBirthError(
        isValidField
          ? null
          : "The date of birth must be a valid date, and you must be at least 18 years old."
      );
    } else if (fieldName === "startDate") {
      if (formState.startDate === null) {
        console.error("StartDate is null.");
        return;
      }
      const minStartDate = new Date(formState.dateOfBirth);
      minStartDate.setFullYear( (minStartDate.getFullYear()) + 18);
      console.log("Min Start Date:", formatDate(minStartDate));
      console.log("Selected Start Date:", formattedDate);
      isValidField =
        isDateInputValid(formattedDate) &&
        date &&
        date >= minStartDate &&
        date.getFullYear() >= minStartDate.getFullYear();
      console.log("Is Start Date Valid:", isValidField);
      setFormState((prevFormState) => ({
        ...prevFormState,
        startDate: formatDate(minStartDate),
      }));
      setStartDateError(
        isValidField
          ? null
          : "Start date must be a valid date and later than your date of birth."
      );
    } else {
      // Appel de validateDateField avec la valeur de validation préalable si disponible
      isValidField = validateDateField(
        formattedDate,
        date,
        minYear,
        maxYear,
        isValidField
      );
    }

    updateValidationState(fieldName, isValidField);
  };

  const validateDateField = (
    formattedDate,
    date,
    minYear,
    maxYear,
    isValid
  ) => {
    console.log("Selected Date:", formattedDate);

    // Utilisez la valeur de validation préalable si elle est fournie
    if (isValid !== undefined && isValid !== null) {
      return isValid;
    }

    // Sinon, effectuez la validation habituelle
    return (
      isDateInputValid(formattedDate) &&
      date &&
      !isNaN(date.getTime()) &&
      date.getFullYear() >= minYear &&
      date.getFullYear() <= maxYear &&
      date.getMonth() >= 0 &&
      date.getMonth() <= 11 &&
      date.getDate() >= 1 &&
      date.getDate() <=
        new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
    );
  };

  const updateValidationState = (fieldName, isValid) => {
    if (fieldName === "dateOfBirth") {
      setIsDateOfBirthValid(isValid);
    } else if (fieldName === "startDate") {
      setIsStartDateValid(isValid);
    }
  };

  const handleResetForm = () => {
    setFormState({ ...initialState });
    formState.dateOfBirth = ""
    formState.startDate =""
    // Définir la prop resetState pour déclencher la réinitialisation de DatePicker
    setResetDatePicker(true);
    console.log("DATES AFTER RESET", formState.dateOfBirth);
    console.log("DATES AFTER RESET", initialState);
  };
  
  

  const handleSaveEmployee = async (e) => {
    e.preventDefault();

    console.log("dates value", formState.dateOfBirth, formState.startDate);
    // Vérifier si la date de naissance est vide ou non valide
    if (!formState.dateOfBirth || !isDateOfBirthValid) {
      console.error("Date of Birth is invalid or empty.");
      return;
    }

    // Vérifier si la date de début est vide ou non valide
    if (!isStartDateValid) {
      console.error("Start Date is invalid or empty.");
      return;
    }

    // Vérifier la validité des champs
    if (!isStateSelected || !isDepartmentSelected) {
      console.error("State and Department are required.");
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
      console.error("One or more fields are invalid.");
      console.log(formState.dateOfBirth);
      console.log("arefieldvalid", areFieldsValid);
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

    // Réinitialiser les champs
    handleResetForm();
  };

  return (
    <form
      ref={formRef}
      className={formClasses.join(" ")}
      id="create-employee"
      onSubmit={handleSaveEmployee}
      data-testid="create-employee-form"
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
        {formState.firstName && !isTextInputValid(formState.firstName) && (
          <div
            className="invalid-feedback col-md-1"
            data-testid="error-message"
          >
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
      <div className="col-md-6 p-1">
        <label htmlFor="date-of-birth" className="form-label fw-bold">
          Date of Birth
        </label>

        <InputDatePicker
          name="date-of-birth"
          id="date-of-birth"
          fieldName="dateOfBirth"
          value={formState.dateOfBirth}
          onChange={(date) => handleDateChange("dateOfBirth", date, 1950, 2024)}
          isDateValid={isDateOfBirthValid}
          className={`form-control ${ !isDateOfBirthValid ? "is-invalid" : "" }`}
          resetState={resetState}
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
      <div className="col-md-6 p-1">
        <label htmlFor="start-date" className="form-label fw-bold">
          Start Date
        </label>
        <InputDatePicker
          name="start-date"
          id="start-date"
          fieldName="startDate"
          value={formState.dateOfBirth}
          minYear={2000}
          maxYear={2024}
          onChange={(date) => handleDateChange("startDate", date, 2000, 2024)}
          isDateValid={isStartDateValid}
          className={`form-control ${ !isStartDateValid ? "is-invalid" : "" }`}
          resetState={resetState}
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
      <fieldset className="row gx-0 align-items-center">
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
          <div className="col-md-8 col-lg-4 p-1">
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
          <div className="col-md-8 col-lg-4 p-1">
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
      </fieldset>
      {/* End Fieldset */}

      {/* Dropdown department */}
      <div className="col-auto col-md-12 col-lg-12 p-1 gx-0">
        <label htmlFor="department-input" className="form-label fw-bold">
          Department
        </label>
        <DropdownList
          id="department"
          name="department"
          inputId="department-input"
          value={formState.department}
          onChange={(selectedValue) =>
            handleChange("department", selectedValue.value)
          }
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
            Please select a State.
          </div>
        )}
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
