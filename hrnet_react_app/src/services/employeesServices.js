import { createAsyncThunk } from "@reduxjs/toolkit";
import { mockTableData } from "../utils/tableData";
import employeesData from '../mocks/data.json';
import { callApi } from "./apicall";

// Activation du mock ==>  true === 1 === actif, false === 0 === inactif
let shouldUseMockData = Boolean(
  Number(process.env.REACT_APP_SHOULD_USE_MOCK_DATA)
);
const baseUrl = `http://localhost:3000`;

// Création du thunk
export const getMockEmployeeData = createAsyncThunk(
  "employees/getEmployeesMockList",
  async () => {
    if (shouldUseMockData) {
      const data = mockTableData.employees;
      if (!data) {
        throw new Error("Données non reconnues");
      }
      return data;
    }
    try {
      const url = `${baseUrl}/employees-list`;
      const response = await callApi(url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Erreur lors du chargement des données :", error);
      throw error;
    }
  }
);

// // Ajout du thunk pour sauvegarder un nouvel employé
// export const createEmployeeData = createAsyncThunk(
//   "employees/createEmployees",
//   async (newEmployee) => {
//     if (shouldUseMockData) {
//         const data = newEmployee;
//         console.log(data);
//       if (!data) {
//         throw new Error("Données non reconnues");
//       }
//       return data;
//     }
//     try {
//       // Requête API pour sauvegarder le nouvel employé
//       const url = `${baseUrl}`;
//         const response = await callApi(url)
//         console.log(response);
//         const data = await response.json();
//         console.log(data);
//       return data;
//     } catch (error) {
//       console.error("Erreur lors de la sauvegarde de l'employé :", error);
//       throw error;
//     }
//   }
// );
