import states from "../utils/states";

// Abbreviation
export function getAbbreviationFromState(state) {
  const stateEntry = states.find((entry) => entry.name === state);
  return stateEntry ? stateEntry.abbreviation : null;
}

// Validation form inputs

export const isNamesInputValid = (firstName, lastName) => {
  return /^[A-Za-z]+(['-][A-Za-z]+)?$/.test(firstName, lastName);
};

export const isZipCodeValid = (zipCode) => {
  return /^\d{5}(-\d{4})?$/.test(zipCode);
};
