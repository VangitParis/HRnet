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
  const formRef = useRef(null);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isDateOfBirthValid, setIsDateOfBirthValid] = useState(true);
  const [isStartDateValid, setIsStartDateValid] = useState(true);
  const [isStateSelected, setIsStateSelected] = useState(true);
  const [isDepartmentSelected, setIsDepartmentSelected] = useState(true);

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
    department:""
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
    "department"
    
  ];
  const [formState, setFormState] = useState(initialState);

  const handleChange = (fieldName, value) => {

    setFormState((prevState) => ({
      ...prevState,
      [fieldName]: value,
    }));
  };

  const handleDateChange = (fieldName, date, minYear, maxYear) => {
    const formattedDate = formatDate(date);

    let isValidField;

    if (
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
    ) {
      handleChange(fieldName, formattedDate);
      isValidField = true;
    } else {
      isValidField = false;
    }
    if (fieldName === "dateOfBirth") {
      setIsDateOfBirthValid(isValidField);
    } else if (fieldName === "startDate") {
      setIsStartDateValid(isValidField);
    }
  };

  const handleSaveEmployee = async (e) => {
    e.preventDefault();
    // Vérifier si la date de naissance est vide ou non valide
    if (!isDateOfBirthValid) {
      console.log("Date of Birth is invalid.");
      return;
    }

    // Vérifier si la date de début est vide ou non valide
    if (!isStartDateValid) {
      console.log("Start Date is invalid or empty.");
      return;
    }
    console.log("Value of formState.state:", formState.state);
    if (!formState.state) {
      console.log("State is required.");
      setIsStateSelected(false);
      return;
    }
    if (!formState.department) {
      console.log("Department is required.");
      setIsDepartmentSelected(false);
      return;
    }
    const areFieldsValid = fieldNames.every((fieldName) => {
      const fieldValue = formState[fieldName];

      switch (fieldName) {
        case "dateOfBirth":
        case "startDate":
          return fieldValue && isDateInputValid(fieldValue);
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
  };

  return (
    <form
      ref={formRef}
      className="row g-1 mb-md-0 mb-3 mx-auto "
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
          <div className="invalid-feedback col-md-1" data-testid="error-message">
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
        <DatePicker
          id="date-of-birth"
          type="text"
          placeholder=""
          inputRef={inputRef}
          showCurrentDateOnMount={false}
          dateFormat={"dd/MM/yyyy"}
          minYear={1980}
          maxYear={2024}
          language={"en-EN"}
          value={formState.dateOfBirth}
          onChange={(date) => {
            handleDateChange("dateOfBirth", date, 1980, 2024);
          }}
          customInputClass={{
            className: `form-control custom-input-class ${
              formState.dateOfBirth && !isDateOfBirthValid ? "is-invalid" : ""
            }`,
          }}
          monthSelectClass="custom-month-select-style"
          yearSelectClass="custom-year-select-style"
          showError={true}
          errorClass={`invalid-feedback col-md-1 ${
            !isDateOfBirthValid ? "d-block" : "d-none"
            } `}
          errorMessage="Please provide a valid Date of Birth."
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
          placeholder=""
          inputRef={inputRef}
          showCurrentDateOnMount={false}
          dateFormat={"dd/MM/yyyy"}
          minYear={2000}
          maxYear={2024}
          language={"en-EN"}
          value={formState.startDate}
          onChange={(date) => {
            handleDateChange("startDate", date, 2000, 2024);
          }}
          customInputClass={{
            className: `form-control custom-input-class ${
              formState.startDate && !isStartDateValid ? "is-invalid" : ""
            }`,
          }}
          monthSelectClass="custom-month-select-style"
          yearSelectClass="custom-year-select-style"
          showError={true}
          errorClass={`invalid-feedback col-md-1 ${
            !isStartDateValid ? "d-block" : "d-none"
          }`}
          errorMessage="Please provide a valid Start Date."
          required
        />
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
            <Dropdown
              id="state"
              inputId="state-input"
              name="state"
              value={formState.state}
              className={`form-control ${formState.state === "" && !isStateSelected ? "is-invalid" : ""}`}
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
        <Dropdown
          id="department"
          name="department"
          inputId="department-input"
          value={formState.department}
          onChange={(selectedValue) =>
            handleChange("department", selectedValue.value)
          }
          className={`form-control ${formState.department === "" && !isDepartmentSelected ? "is-invalid" : ""}`}
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
