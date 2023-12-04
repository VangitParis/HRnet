import { createSlice } from "@reduxjs/toolkit";

// fonction qui récupère le localstorage
const getEmployeesFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("employees")) || [];
};

// fonction qui sauvegarde la liste des employés
const saveEmployeesToLocalStorage = (employees) => {
  localStorage.setItem("employees", JSON.stringify(employees));
};

const employeesSlice = createSlice({
  name: "employees",
  initialState: {
    list: getEmployeesFromLocalStorage(),
  },
  reducers: {
    saveEmployee: (state, action) => {
      const employeeData = action.payload;
      state.list.push(employeeData);
      saveEmployeesToLocalStorage(state.list);
    },
    updateListEmployees: (state, action) => {
      const updatedList = action.payload;
      state.list = updatedList;
      saveEmployeesToLocalStorage(updatedList);
    },
  },
});

export const { saveEmployee, updateListEmployees } = employeesSlice.actions;
export default employeesSlice.reducer;
