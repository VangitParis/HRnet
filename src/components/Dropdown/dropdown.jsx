import React, { useState, useEffect } from "react";
import Select from "react-select";
import states from "../../utils/states";
import departments from "../../utils/departments";

export default function Dropdown({ value, onChange, id }) {
    const [selectedOption, setSelectedOption] = useState(value || null);
    
    
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    // Affiche le premier élément de la liste au montage du composant
    const firstOption =
      id === "state" ? states[0] : id === "department" ? departments[0] : null;

    setSelectedOption({
      value: firstOption ? firstOption.value : null,
      label: firstOption ? firstOption.name : null,
    });
  }, [id]);

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
    setInputValue(selectedOption ? selectedOption.label : "");
    onChange(selectedOption);
  };

  return (
    <Select
      onChange={handleChange}
      options={options}
      value={selectedOption}
      hideSelectedOptions={false}
    />
  );
}
