import departments from "../utils/departments";
import states from "../utils/states";

/**
 * Formats a given date object into a string with the specified format.
 *
 * @param {{ Date: Date, format: string }} props - The properties object
 * @returns {string} - The formatted date string dd/MM/yyyy.
 */
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

/**
 * Validates if a given text input contains only valid characters (alphabetical, spaces, hyphens, and apostrophes).
 *
 * @param {string} text - The text input to be validated.
 * @returns {boolean} - True if the text is valid, false otherwise.
 */
export const isTextInputValid = (text) => {
  const regex = /^[A-Za-z\u00C0-\u017F\s]+(['-][A-Za-z\u00C0-\u017F]+)?$/;
  return regex.test(text);
};
/**
 * Validates if a given street address input contains only valid characters.
 *
 * @param {string} street - The street address input to be validated.
 * @returns {boolean} - True if the street address is valid, false otherwise.
 */
export const isAddressInputValid = (street) => {
  return /^(?:[A-Za-z]+\s*|\d+\s*[A-Za-z]+\s*)*$/.test(street);
};
/**
 * Validates if a given zip code input is in the correct format.
 *
 * @param {string} zipCode - The zip code input to be validated.
 * @returns {boolean} - True if the zip code is valid, false otherwise.
 */
export const isZipCodeValid = (zipCode) => {
  return /^\d{5}(-\d{4})?$/.test(zipCode);
};
/**
 * Validates if a given date input is in the format "DD/MM/YYYY".
 *
 * @param {string} date - The date input to be validated.
 * @returns {boolean} - True if the date is valid, false otherwise.
 */
export const isDateInputValid = (date) => {
  // Regex for format "DD/MM/YYYY"
  const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}(?![\s\S]*#)[\s\S]*$/;
  return regex.test(date);
};

/**
 * Validates and formats a date string into a Date object.
 *
 * @param {string} dateString - The date string to be validated and formatted.
 * @returns {Date|string} - The formatted Date object if valid, otherwise returns the original date string.
 */
export const validateAndFormatDate = (dateString) => {
  const [day, month, year] = dateString.split("/").map(Number);
  // Build date object month -1
  const dateValue = new Date(year, month - 1, day);
  // check if dateValue is valid
  const isValid = dateValue instanceof Date && !isNaN(dateValue);

  return isValid ? dateValue : dateString;
};
/**
 * Validates if a given birth date corresponds to an age of 18 years or older.
 *
 * @param {Date} birthDate - The birth date to be validated.
 * @returns {boolean} - True if the age is 18 or older, false otherwise.
 */
export const isAgeValid = (birthDate) => {
  if (!birthDate) {
    return false;
  }

  const today = new Date();
  const age = today.getFullYear() - birthDate.getFullYear();

  return age >= 18;
};

// Sort departments alphabetically
departments.sort(function (a, b) {
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  }
  return 0;
});

 // Custom sorting logic for date columns
export const customDateSort = (rowA, rowB, columnId, sortDesc) => {
  const dateA = validateAndFormatDate(rowA.values[columnId], "dd/MM/yyyy", new Date());
  const dateB = validateAndFormatDate(rowB.values[columnId], "dd/MM/yyyy", new Date());

  // On soustrait dateB de dateA pour obtenir l'ordre correct
  const comparison = dateA - dateB;

  if (sortDesc) {
    return comparison * -1; // Inverser l'ordre pour le tri descendant
  } else {
    return comparison;
  }
};

/**
 * Gets the state abbreviation from the provided state name.
 *
 * @param {string} state - The full name of the state.
 * @returns {string|null} - The abbreviation of the state or null if not found.
 */
export function getAbbreviationFromState(state) {
  const stateEntry = states.find((entry) => entry.name === state);
  return stateEntry ? stateEntry.abbreviation : null;
}