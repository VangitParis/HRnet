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

export const isDateInputValid = (dateOfBirth, startDate) => {
  return /\d{4}(.\d{2}){2}(\s|T)(\d{2}.){2}\d{2}/.test(dateOfBirth, startDate)
}
