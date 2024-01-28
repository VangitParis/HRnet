import departments from "../utils/departments";
import states from "../utils/states";

export const formatDate = (date, format = "dd/MM/yyyy") => {
  if (!date) {
    return ""; 
  }

  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();

  // Replace placeholders in the format with actual values
  let formattedDate = format.replace("dd", day);
  formattedDate = formattedDate.replace("MM", month);
  formattedDate = formattedDate.replace("yyyy", year);

  return formattedDate;
};

// Validation form inputs with Regex 

export const isTextInputValid = (text) => {
  const regex = /^[A-Za-z\u00C0-\u017F\s]+(['-][A-Za-z\u00C0-\u017F]+)?$/;
  return regex.test(text);
};

export const isAddressInputValid = (street) => {
  return /^(?:[A-Za-z]+\s*|\d+\s*[A-Za-z]+\s*)*$/.test(street);
};

export const isZipCodeValid = (zipCode) => {
  return /^\d{5}(-\d{4})?$/.test(zipCode);
};

export const isDateInputValid = (date) => {
  // Regex for format "DD/MM/YYYY"
  const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}(?![\s\S]*#)[\s\S]*$/;
  return regex.test(date);
};


// Validate and format Date
export const validateAndFormatDate = (dateString) => {
  const [day, month, year] = dateString.split("/").map(Number);

  // Build date object month -1
  const dateValue = new Date(year, month - 1, day);

  // check if dateValue is valid
  const isValid = dateValue instanceof Date && !isNaN(dateValue);

  if (isValid) {
    return dateValue; 
  } else {
    return dateString;
  }
};

//Sort departments 
departments.sort(function (a, b) {
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  }
  return 0;
});

// Abbreviation
export function getAbbreviationFromState(state) {
  const stateEntry = states.find((entry) => entry.name === state);
  return stateEntry ? stateEntry.abbreviation : null;
}