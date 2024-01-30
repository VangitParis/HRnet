import { configureStore } from "@reduxjs/toolkit";
import employeesReducer from "../features/employeesSlice";

/**
 * Redux store configuration using the `configureStore` function from `@reduxjs/toolkit`.
 *
 * @namespace
 * @name redux
 * @type {Object}
 *
 * @property {Object} reducer - The root reducer object containing all the slice reducers.
 * @property {Object} reducer.employees - The reducer for managing employee data.
 * @property {Function} reducer.employeesReducer - The reducer function for employee data.
 *
 */
const store = configureStore({
  reducer: {
    employees: employeesReducer,
    },
    
});

export { store };
