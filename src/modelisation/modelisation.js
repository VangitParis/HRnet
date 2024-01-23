import departments from "../utils/departments";
import states from "../utils/states";
// import { parse } from "date-fns";

// Abbreviation
export function getAbbreviationFromState(state) {
  const stateEntry = states.find((entry) => entry.name === state);
  return stateEntry ? stateEntry.abbreviation : null;
}

export const formatDate = (date, format = "dd/MM/yyyy") => {
  if (!date) {
    return ""; // Retourne une chaîne vide si la date est null ou undefined
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

// Validation form inputs avec des Regex

export const isTextInputValid = (text) => {
  const regex = /^[A-Za-z\s]+(['-][A-Za-z]+)?$/;
  return regex.test(text);
};

export const isAddressInputValid = (street) => {
  return /^\s*\d+(?:\s+[A-Za-z]+\s*)+$/.test(street);
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
// export const isDateValid = (dateString) => {
//   const dateObject = parse(dateString, "dd/MM/yyyy", new Date());
//   const isValid = !isNaN(dateObject.getTime());

//   if (!isValid) {
//     // console.log("Invalid Date:", dateString);
//   }

//   return isValid;
// };

export const parseDateString = (dateString) => {
  const dateObject = new Date(dateString);

  if (isNaN(dateObject.getTime())) {
    // Si la date n'est pas valide, retourne la chaîne d'origine
    return dateString;
  }

  // Formate la date
  const options = { year: "numeric", month: "numeric", day: "numeric" };
  const formattedDate = dateObject.toLocaleDateString("default", options);

  return formattedDate;
};

// Fonction générique pour valider et formater une date
export const validateAndFormatDate = (dateString) => {
  const [day, month, year] = dateString.split("/").map(Number);

  // Construire l'objet Date avec le mois réduit de 1
  const dateValue = new Date(year, month - 1, day);

  // Vérifie si dateValue est une date valide
  const isValid = dateValue instanceof Date && !isNaN(dateValue);

  if (isValid) {
    // console.log("Date valide :", dateValue);
    return dateValue; // Retourne l'objet Date
  } else {
    // console.log("Date non valide : ", dateString);
    return dateString;
  }
};

// Exemple d'utilisation
const dateString =
  "Sat Jan 30 2003 00:00:00 GMT+0100 (heure normale d’Europe centrale)";

// Vérifier si la date est valide
// const isValid = validateAndFormatDate(dateString);
// console.log("Date valide:", isValid);

// Formater la date
export const formattedDate = parseDateString(dateString);
// console.log("Date formatée:", formattedDate);

export const formatDateString = (dateString) => {
  const [day, month, year] = dateString.split("/");
  return `${day}/${month}/${year}`;
};
