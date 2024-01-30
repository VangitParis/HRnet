import React, { useState, useEffect } from "react";
import Select from "react-select";
import states from "../../utils/states";
import departments from "../../utils/departments";
import "../../styles/sass/components/_dropdownList.scss";

/**
 * DropdownList component for selecting states or departments.
 *
 * @param {{ value:string, onChange:Function, id:string,className:string,inputId:string}} props - The component properties.
 * @returns {JSX.Element} - The rendered DropdownList component.
 */
export default function DropdownList({
  value,
  onChange,
  id,
  className,
  inputId,
}) {
  // State to manage the selected option and input value
  const [selectedOption, setSelectedOption] = useState(null);
  const [inputValue, setInputValue] = useState("");

  /**
   * useEffect hook to handle initial rendering and value changes.
   */
  useEffect(() => {
    // Show the first element of the list on component mount
    const firstOption =
      id === "state" ? states[0] : id === "department" ? departments[0] : null;

    const defaultOption = {
      value: firstOption ? firstOption.abbreviation || firstOption.value : null,
      label: firstOption ? firstOption.name || firstOption.value : null,
    };

    // Validate and store the first value if it's different from the current value
    if (
      !selectedOption &&
      (defaultOption.value !== selectedOption?.value ||
        defaultOption.name !== selectedOption?.name)
    ) {
      setSelectedOption(defaultOption);
      setInputValue(defaultOption.value);
      onChange(defaultOption);
    }
    // Reset to default option if the value is an empty string
    if (value === "") {
      setSelectedOption(defaultOption);
      setInputValue(defaultOption.value);
      onChange(defaultOption);
    }
  }, [id, selectedOption, onChange, value]);

  // Generate options based on the dropdown type (state or department)
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

  /**
   * Handle change event when an option is selected.
   *
   * @param {Object} selectedOption - The selected option.
   */
  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    setInputValue(selectedOption || inputValue);
    onChange(selectedOption);
  };
  // Custom styles for react-select component
  const customStyles = {
    control: (baseStyles, state) => ({
      ...baseStyles,
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

  // Render the react-select component with specified props and style
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
