import React, { useRef, useState, useEffect } from "react";
import DatePicker from "plugin-datepicker"
import "../../styles/sass/components/_form.scss";

export default function InputDatePicker({
  id,
  value,
  onChange,
  className,
  fieldName,
  resetState,
  required,
  minYear,
  maxYear
}) {
  const inputRef = useRef(null);
  const [isErrorVisible, setIsErrorVisible] = useState(false);
  // const [minYear, setMinYear] = useState(1950);
  // const [maxYear, setMaxYear] = useState(new Date().getFullYear());
  const [localValue, setLocalValue] = useState("");
  const [customKey, setCustomKey] = useState(Date.now());
  const [wasResetBefore, setWasResetBefore] = useState(false);
  useEffect(() => {
    // Set minYear and maxYear based on the field
    // if (fieldName === "startDate") {
    //   setMinYear(2000);
     
    // }
    // if (fieldName === "dateOfBirth") {
    //   setMinYear(1950);
    
    // }
    
// If resetState transitions from false to true, clear the localValue
if (resetState && !wasResetBefore) {
  setCustomKey((prevKey) => prevKey + 1);
  setLocalValue("");
  setWasResetBefore(true); // Set a flag to indicate that reset has occurred
} else if (resetState && !wasResetBefore) {
  // Reset the flag when resetState goes back to false
  setWasResetBefore(false);
  setCustomKey((prevKey) => prevKey + 1);
  setLocalValue("")
}

  
  // Update isErrorVisible based on the validation logic
  setIsErrorVisible(!required && !value);

   
    
  }, [required, value, fieldName, onChange, resetState, localValue, wasResetBefore]);

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
