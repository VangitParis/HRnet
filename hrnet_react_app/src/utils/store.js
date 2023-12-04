import { configureStore } from '@reduxjs/toolkit';
import employeesReducer from '../features/employeesSlice';
import updateListReducer from '../features/updateSliceList';

const store = configureStore({
  reducer: {
        employees: employeesReducer,
        updateListEmployees : updateListReducer,
  },
});

export default store;