import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { saveEmployee } from "../../features/employeesSlice";
import { parse, isAfter, isBefore } from "date-fns";

// Import functions from modelisation
import {
  formatDate,
  isTextInputValid,
  isAddressInputValid,
  isZipCodeValid,
  isDateInputValid,
  isAgeValid,
} from "../../modelisation/modelisation";
// Imports components
import ModalApp from "../../components/Modal/modal";
import DropdownList from "../DropdownList/dropdownList";
import InputDatePicker from "../InputDatePicker/inputDatePicker";
import "../../styles/sass/components/_form.scss";

/**
 * Form component for creating and saving employee information.
 *
 * @returns {JSX.Element} - The rendered Form component.
 */
export default function Form() {
  const dispatch = useDispatch();
  const formRef = useRef(null);

  // State variables for managing form and validation
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isDateOfBirthValid, setIsDateOfBirthValid] = useState(true);
  const [isStartDateValid, setIsStartDateValid] = useState(true);
  const [isStateSelected, setIsStateSelected] = useState(true);
  const [isDepartmentSelected, setIsDepartmentSelected] = useState(true);

  const [dateOfBirthError, setDateOfBirthError] = useState(null);
  const [startDateError, setStartDateError] = useState(null);
  const [generalError, setGeneralError] = useState(null);

  const [resetDatePickerState, setResetDatePicker] = useState(false);

  // Initial state for form fields
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
  // Field names and form state initialization
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

  /**
   * Handle change event for form fields.
   *
   * @param {string} fieldName - The name of the form field.
   * @param {string} value - The new value of the form field.
   */
  const handleChange = (fieldName, value) => {
    setFormState((prevState) => ({
      ...prevState,
      [fieldName]: value,
    }));
  };
  /**
   * Update date and perform validation for date fields.
   *
   * @param {Date} newDate - The new date value.
   * @param {string} fieldName - The name of the date field.
   * @param {number} minYear - The minimum allowed year.
   * @param {number} maxYear - The maximum allowed year.
   */
  const updateDate = (newDate, fieldName, minYear, maxYear) => {
    // Validation for date fields
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

    // Update state variables based on the date field
    setIsDateOfBirthValid(
      fieldName === "dateOfBirth" ? isValidDate : isDateOfBirthValid
    );
    setIsStartDateValid(
      fieldName === "startDate" ? isValidDate : isStartDateValid
    );
    // Handle error messages if the date is not valid
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
  /**
   * Handle date change event for date fields.
   *
   * @param {string} fieldName - The name of the date field.
   * @param {Date} date - The new date value.
   * @param {number} minYear - The minimum allowed year.
   * @param {number} maxYear - The maximum allowed year.
   */
  const handleDateChange = (fieldName, date, minYear, maxYear) => {
    const formattedDate = formatDate(date);
    const isValidField = isDateInputValid(formattedDate);

    // Update form state with the formatted date
    handleChange(fieldName, formattedDate);

    // Perform additional validation for date fields
    const ageValid = isAgeValid(date);

    if (fieldName === "dateOfBirth") {
      setIsDateOfBirthValid(isValidField && ageValid);
      setDateOfBirthError(
        isValidField && ageValid
          ? null
          : "The date of birth must be a valid date, and employee must be at least 18 years old."
      );
      // Update date for age calculation if age is valid
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
          : `Start date must be valid, at least ${minAge} years after employee date of birth, and not exceed the current date.`
      );
      // Update start date if it is valid
      if (fieldName === "startDate" && startDateValid) {
        updateDate(startDate, "startDate", minYear, maxYear);
      }
    }
  };

  /**
   * Handle form reset event.
   */
  const handleResetForm = () => {
    // Reset DatePicker state to trigger reset
    setResetDatePicker(true);

    // Reset form state and related variables
    setFormState(initialState);
    formState.dateOfBirth = "";
    formState.startDate = "";
    setIsDateOfBirthValid(true);
    setIsStartDateValid(true);
    setDateOfBirthError(null);
    setStartDateError(null);
  };

  /**
   * Handle employee save event.
   *
   * @param {Event} e - The form submit event.
   */
  const handleSaveEmployee = async (e) => {
    e.preventDefault();

    // Reset general error
    setGeneralError(null);

    // Check if date of birth is empty or not valid
    if (!isDateOfBirthValid) {
      return;
    }

    // Check if start date is empty or not valid
    if (!isStartDateValid) {
      return;
    }
    // Check validity of fields state and departments
    if (!isStateSelected || !isDepartmentSelected) {
      setIsStateSelected(true);
      setIsDepartmentSelected(true);
      return;
    }

    // Check if all fields are valid
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

    // If some fields are not valid, interrupt form submission
    if (!areFieldsValid) {
      setGeneralError("Please fill in all required fields.");
      return;
    }
    // Check form validity using HTML5 validation
    if (!formRef.current.reportValidity()) {
      return;
    }

    // Create employee data object with field values
    const newEmployeeData = {};
    fieldNames.forEach((fieldName) => {
      newEmployeeData[fieldName] = formState[fieldName];
    });

    // Dispatch action to save employee data
    dispatch(saveEmployee(newEmployeeData));

    // Reset form fields
    handleResetForm();

    // Open the modal
    setModalIsOpen(true);
  };

  // JSX rendering of the form
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
      <div className="col-md-12 col-lg-6 p-1 component-date">
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
      <div className="d-grid gap-2 mt-4 mx-auto col-md-3">
        <button type="submit" className="btn custom-btn fw-bold">
          Save
        </button>
      </div>

      {/* General Error */}
      {generalError && (
        <div className="mx-auto col-md-12 text-center text-danger general-error">
          {generalError}
        </div>
      )}

      {/* Modal */}
      <div>
        <ModalApp modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} />
      </div>
    </form>
  );
}
