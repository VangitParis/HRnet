import { createSlice } from "@reduxjs/toolkit";

const employeesSlice = createSlice({
  name: "employees",
  initialState: {
    list: [],
  },
  reducers: {
    saveEmployee: (state, action) => {
      state.list.push(action.payload);
    },
  },
});

export const { saveEmployee } = employeesSlice.actions;
export default employeesSlice.reducer;
