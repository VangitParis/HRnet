import { createSlice } from "@reduxjs/toolkit";
import { getMockEmployeeData } from "../services/employeesServices";

const initialState = {
  loading: false,
  error: null,
  list: [],
};

const employeesSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    //on ajoute l'employé créé à la liste
    saveEmployee: (currentState, action) => {
      // Utilisation des données dans l'action.payload
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

        // Vérifier si chaque nouvel employé n'est pas déjà présent dans la liste affin d'éviter de dupliquer les données
        const filteredMockListData = mockListData.filter(
          (newEmployee) =>
            !currentState.list.some(
              (existingEmployee) => existingEmployee.id === newEmployee.id
            )
        );

        // Mettre à jour la liste avec les nouveaux employés filtrés
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
