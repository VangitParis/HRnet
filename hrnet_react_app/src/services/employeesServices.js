import { createAsyncThunk } from "@reduxjs/toolkit";
import { mockTableData } from "../utils/tableData";
import { callApi } from "./apicall";
import { getAbbreviationFromState } from "../modelisation/modelisation";


// Activation du mock ==>  true === 1 === actif, false === 0 === inactif
let shouldUseMockData = Boolean(
  Number(process.env.REACT_APP_SHOULD_USE_MOCK_DATA)
);
const baseUrl = `http://localhost:3000`;

// Création du thunk
export const getMockEmployeeData = createAsyncThunk( 
  "employees/getEmployeesMockList",
    async (employeeData , { rejectWithValue }) => {
        const url = `${ baseUrl }/employees-list`;
        const data = { employeeData };

        if (shouldUseMockData) {
            const mockData = mockTableData.employees.map(employee => ({
                ...employee,
                state: getAbbreviationFromState(employee.state),
            }))
            if (!mockData) {
                throw new Error("Données non reconnues");
            }
            return mockData;
        }
        try {
            const response = await callApi(url, data);
            if (response.status === 200) {
                return data.body;
            }
        } catch (error) {
            if (error.response && error.response.data.message) {
                return rejectWithValue("Invalid Fields");
            } else {
                return rejectWithValue("Internal Server Error");
            }
        }
    }
);

