import { configureStore } from "@reduxjs/toolkit";
import employeesReducer from "../features/employeesSlice";

const store = configureStore({
  reducer: {
    employees: employeesReducer,
    },
    
});

export { store };
