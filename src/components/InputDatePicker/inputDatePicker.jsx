// InputDatePicker.jsx

import React, { useRef, useState, useEffect } from "react";
import DatePicker from "plugin-datepicker";
import "../../styles/sass/components/_form.scss";
import { formatDate } from "../../modelisation/modelisation";

export default function InputDatePicker({ id, value, onChange, className,fieldName,resetState, required }) {
  const inputRef = useRef(null);
    const [isErrorVisible, setIsErrorVisible] = useState(false);
    const [minYear, setMinYear] = useState(1950);
    const [maxYear, setMaxYear] = useState(new Date().getFullYear())
    const [localValue, setLocalValue] =  useState("", formatDate(new Date()));
    
    useEffect(() => {
      // Set minYear and maxYear based on the field
      if (fieldName === "startDate") {
        setMinYear(2000);
       
      } else {
        setMinYear(1950);
       
      }
     
        if (localValue) {
          console.log(formatDate(localValue));
        setLocalValue("");
      }
    
      // Update isErrorVisible based on the validation logic
      setIsErrorVisible(!required && !value);
    }, [required, value, fieldName, resetState, localValue]);
   
 

  const customStyles = {
    className: `form-control custom-input-class ${className || ""} ${required && !value ? "is-invalid" : ""}`,
  };

  const customErrorClass = `invalid-feedback col-md-1 ${!isErrorVisible ? "d-block" : "d-none"}`;

  const customMessage = "Please provide a valid Date of Birth.";

  return (
    <>
      <DatePicker
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
        value={value}
        onChange={(newValue) => {
            setLocalValue("");
            onChange(newValue); 
          }}
        resetState={resetState}
        required={required}
      />
      {!required && !value && (
        <div className={customErrorClass}>
          {customMessage}
        </div>
      )}
    </>
  );
}
