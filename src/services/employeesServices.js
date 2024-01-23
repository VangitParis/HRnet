import { createAsyncThunk } from "@reduxjs/toolkit";
import { mockTableData } from "../utils/tableData";
import { callApi } from "./apicall";
import { getAbbreviationFromState } from "../modelisation/modelisation";

// Déterminer si l'application est en mode développement
const isDevelopment = process.env.NODE_ENV === "development";

// Base URL pour le mode de développement
const developmentBaseUrl = "http://localhost:3000/HRnet/";

// Base URL pour le mode de production (Netlify)
const productionBaseUrl = "/";

// Activation du mock ==>  true === 1 === actif, false === 0 === inactif
let shouldUseMockData = Boolean(Number(process.env.REACT_APP_SHOULD_USE_MOCK_DATA));

// Création du thunk
export const getMockEmployeeData = createAsyncThunk(
  "employees/getEmployeesMockList",
  async (_, { rejectWithValue }) => {
    const baseUrl = isDevelopment ? developmentBaseUrl : productionBaseUrl;
    const url = baseUrl;


    if (shouldUseMockData) {
      // Utiliser updatedDates pour créer mockData avec les dates formatées
      const mockData = mockTableData.employees.map((employee) => {
        // Copier les propriétés de l'employé
        const formattedEmployee = { ...employee };
    
        // Formater l'État
        formattedEmployee.state = getAbbreviationFromState(employee.state);
    
        // Retourner l'employé formaté
        return formattedEmployee;
      });
    
      // Utiliser mockData comme données formatées
      console.log("Mock Data avec dates formatées et État abrégé:", mockData);
    
      // Vérifiez si mockData est défini avant de l'utiliser
      if (!mockData) {
        throw new Error("Données non reconnues");
      }
    
      // Utiliser mockData comme données formatées 
      return mockData;
    }
    
    try {
      const response = await callApi(url);
      return response.status === 200 ? response.data : [];
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue("Invalid Fields");
      } else {
        return rejectWithValue("Internal Server Error");
      }
    }
  }
);
