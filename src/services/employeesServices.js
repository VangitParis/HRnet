import { createAsyncThunk } from "@reduxjs/toolkit";
import { mockTableData } from "../mocks/data";
import { callApi } from "./apicall";
import { getAbbreviationFromState } from "../modelisation/modelisation";

// Determine if the application is in development mode
const isDevelopment = process.env.NODE_ENV === "development";

// Base URL for development mode
const developmentBaseUrl = "http://localhost:3000/HRnet/";

// Base URL for production mode
const productionBaseUrl = "/";

// Activate the mock: true (1) for active, false (0) for inactive
let shouldUseMockData = Boolean(
  Number(process.env.REACT_APP_SHOULD_USE_MOCK_DATA)
);

/**
 * Redux thunk for fetching employee data. Handles both mock data and actual API calls.
 *
 * @function
 * @async
 * @name getMockEmployeeData
 * @memberof module:redux/thunks
 * @param {Object} _ - Unused parameter (convention for actions that don't require input).
 * @param {Object} options - Options provided by Redux Toolkit, including `rejectWithValue`.
 * @param {Function} options.rejectWithValue - Function to reject the promise with a specific value.
 * @returns {Promise<Array<Object>>} - A promise that resolves to an array of formatted employee data.
 * @throws {string} - Rejected promise with an error message if the request fails.
 *
 * @example
 * // Dispatch the thunk to fetch employee data
 * dispatch(getMockEmployeeData());
 */
export const getMockEmployeeData = createAsyncThunk(
  "employees/getEmployeesMockList",
  async (_, { rejectWithValue }) => {
    // Determine base URL based on development or production environment
    const baseUrl = isDevelopment ? developmentBaseUrl : productionBaseUrl;
    const url = baseUrl;

    if (shouldUseMockData) {
      // Use updatedDates to create mockData with formatted dates
      const mockData = mockTableData.employees.map((employee) => {
        // Copy employee properties
        const formattedEmployee = { ...employee };

        // Format the state
        formattedEmployee.state = getAbbreviationFromState(employee.state);

        // Return the formatted employee
        return formattedEmployee;
      });

      // Check if mockData is defined before using it
      if (!mockData) {
        throw new Error("Données non reconnues");
      }

      // Use mockData as formatted data
      return mockData;
    }

    try {
      // Make an API call to retrieve employee data
      const response = await callApi(url);

      // Check if the response status is 200 and return the data or an empty array
      return response.status === 200 ? response.data : [];
    } catch (error) {
      // Handle errors during the API call
      if (error.response && error.response.data.message) {
        // Reject the promise with a specific value for invalid fields
        return rejectWithValue("Invalid Fields");
      } else {
        // Reject the promise with a generic error message for internal server errors
        return rejectWithValue("Internal Server Error");
      }
    }
  }
);
