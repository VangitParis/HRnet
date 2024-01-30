import React, { useRef, useState, useEffect } from "react";
import DatePicker from "plugin-datepicker";
import "../../styles/sass/components/_form.scss";

/**
 * InputDatePicker component for selecting dates with validation and error handling.
 *
 * @component
 * @example usage of InputDatePicker component
 * <InputDatePicker
 *   id="date-of-birth"
 *   value={selectedDate}
 *   onChange={(newDate) => handleDateChange("dateOfBirth", newDate)}
 *   className="custom-datepicker"
 *   fieldName="dateOfBirth"
 *   resetState={resetDatePickerState}
 *   required={true}
 *   minYear={1950}
 *   maxYear={new Date().getFullYear()}
 * />
 *
 * @param {{id: string, value: string, onChange: Function, className: string, fieldName: string, resetState: boolean, required: boolean, minYear: number, maxYear: number}} props - The properties object.
 *
 * @returns {JSX.Element} - The InputDatePicker component.
 */
export default function InputDatePicker({
  id,
  value,
  onChange,
  className,
  fieldName,
  resetState,
  required,
  minYear,
  maxYear,
}) {
  const inputRef = useRef(null);
  const [isErrorVisible, setIsErrorVisible] = useState(false);
  const [localValue, setLocalValue] = useState("");
  const [customKey, setCustomKey] = useState(Date.now());
  const [wasResetBefore, setWasResetBefore] = useState(false);
  useEffect(() => {
    // If resetState transitions from false to true, clear the localValue
    if (resetState && !wasResetBefore) {
      setCustomKey((prevKey) => prevKey + 1);
      setLocalValue("");
      setWasResetBefore(true); // Set a flag to indicate that reset has occurred
    } else if (resetState && !wasResetBefore) {
      // Reset the flag when resetState goes back to false
      setWasResetBefore(false);
      setCustomKey((prevKey) => prevKey + 1);
      setLocalValue("");
    }

    // Update isErrorVisible based on the validation logic
    setIsErrorVisible(!required && !value);
  }, [
    required,
    value,
    fieldName,
    onChange,
    resetState,
    localValue,
    wasResetBefore,
  ]);

  const customStyles = {
    className: `form-control custom-input-class ${className || ""} ${
      required && !value
    }`,
  };

  const customErrorClass = `invalid-feedback col-md-1 ${
    isErrorVisible ? "d-block" : "d-none"
  }`;

  const customMessage = "Please provide a valid Date of Birth.";

  return (
    <>
      <DatePicker
        key={customKey}
        inputRef={inputRef}
        id={id}
        type="text"
        placeholder=""
        showCurrentDateOnMount={false}
        dateFormat={"dd/MM/yyyy"}
        minYear={minYear}
        maxYear={maxYear}
        language={"en-EN"}
        monthSelectClass="custom-month-select-style"
        yearSelectClass="custom-year-select-style"
        showError={true}
        customInputClass={customStyles}
        errorClass={customErrorClass}
        errorMessage={customMessage}
        value={resetState ? "" : value}
        onChange={onChange}
        required={required}
      />
      {!required && !value && (
        <div className={customErrorClass}>{customMessage}</div>
      )}
    </>
  );
}
