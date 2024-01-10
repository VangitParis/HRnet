import departments from "../utils/departments";
import states from "../utils/states";

// Abbreviation
export function getAbbreviationFromState(state) {
  const stateEntry = states.find((entry) => entry.name === state);
  return stateEntry ? stateEntry.abbreviation : null;
}

// Validation form inputs avec des Regex

export const isTextInputValid = (firstName, lastName, city) => {
  return /^[A-Za-z]+(['-][A-Za-z]+)?$/.test(firstName, lastName, city);
};

export const isAddressInputValid = (street) => {
  return /^\s*\S+(?:\s+\S+){2}/.test(street);
};

export const isZipCodeValid = (zipCode) => {
  return /^\d{5}(-\d{4})?$/.test(zipCode);
};

export const isDateInputValid = (date) => {
  // Expression régulière pour le format "DD/MM/YYYY"
  const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
  return regex.test(date);
};

//trier par ordre alphabétique les departmemnts

departments.sort(function (a, b) {
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  }
  return 0;
});

