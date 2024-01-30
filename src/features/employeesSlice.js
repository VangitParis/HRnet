import { createSlice } from "@reduxjs/toolkit";
import { getMockEmployeeData } from "../services/employeesServices";

const initialState = {
  loading: false,
  error: null,
  list: [],
};
/**
 * Redux slice for managing employee data.
 *
 * @type {import("@reduxjs/toolkit").Slice}
 */
const employeesSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    /**
     * Adds the created employee to the employee list.
     *
     * @param {object} currentState - The current state of the employees slice.
     * @param {object} action - The action containing the payload with employee data.
     */
    saveEmployee: (currentState, action) => {
      currentState.list = [...currentState.list, action.payload];
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getMockEmployeeData.pending, (currentState) => {
        currentState.loading = true;
        currentState.error = null;
      })
      .addCase(getMockEmployeeData.fulfilled, (currentState, action) => {
        currentState.loading = false;
        const mockListData = action.payload;

        // Check if each new employee is not already present in the list to avoid duplicating data
        const filteredMockListData = mockListData.filter(
          (newEmployee) =>
            !currentState.list.some(
              (existingEmployee) => existingEmployee.id === newEmployee.id
            )
        );

        // Update the list with the new filtered employees
        currentState.list = [...currentState.list, ...filteredMockListData];
      })

      .addCase(getMockEmployeeData.rejected, (currentState, action) => {
        currentState.loading = false;
        currentState.error = action.error.message;
      });
  },
});

export const { saveEmployee } = employeesSlice.actions;
export default employeesSlice.reducer;
