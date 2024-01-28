import React, { useState, useEffect } from "react";
import Select from "react-select";
import states from "../../utils/states";
import departments from "../../utils/departments";
import "../../styles/sass/components/_dropdownList.scss";

export default function DropdownList({
  value,
  onChange,
  id,
  className,
  inputId,
}) {
  const [selectedOption, setSelectedOption] = useState( null);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    // Affiche le premier élément de la liste au montage du composant
    const firstOption =
      id === "state" ? states[0] : id === "department" ? departments[0] : null;

    const defaultOption = {
      value: firstOption ? firstOption.abbreviation || firstOption.value : null,
      label: firstOption ? firstOption.name || firstOption.value : null,
    };

    // Valide et stocke la première valeur si elle est différente de la valeur actuelle
    if (
      !selectedOption && 
      (defaultOption.value !== selectedOption?.value ||
        defaultOption.name !== selectedOption?.name)
    ) {
      setSelectedOption(defaultOption);
      setInputValue(defaultOption.value);
      onChange(defaultOption);
    }
    if (value === "") {
      setSelectedOption(defaultOption);
      setInputValue(defaultOption.value);
      onChange(defaultOption);
    }
  }, [id, selectedOption, onChange, value]);

  const options =
    id === "state"
      ? states.map((state) => ({
          value: state.abbreviation,
          label: state.name,
        }))
      : departments.map((department) => ({
          value: department.value,
          label: department.name,
        }));

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    setInputValue(selectedOption || inputValue);
    onChange(selectedOption);
  };
  const customStyles = {
    control: (baseStyles, state) => ({
      ...baseStyles,
      //   border: "none",
      minHeight: 0,
      boxShadow: state.isFocused ? "0 0 0 0.25rem rgba(13,110,253,.25)" : "",
      borderRadius: "0.2rem",
      outline: "0",
      border: state.isFocused ? "1px solid #86b7fe" : "none",
      cursor: "pointer",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#596F07" : "white",
      color: state.isFocused ? "white" : "",
      cursor: state.isFocused ? "pointer" : "default",
    }),
  };

  return (
    <Select
      id={id}
      inputId={inputId}
      onChange={handleChange}
      options={options}
      value={selectedOption || inputValue}
      hideSelectedOptions={false}
      className={`custom-dropdown ${className}`}
      styles={customStyles}
    />
  );
}
