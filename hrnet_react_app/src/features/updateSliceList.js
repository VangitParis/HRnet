import { createSlice } from "@reduxjs/toolkit";

const updateSliceList = createSlice({
  name: "updateList",
  initialState: {
    list: [],
  },
  reducers: {
    updateListEmployees: (state, action) => {
      state.list = action.payload;
    },
  },
});

export const { updateListEmployees } = updateSliceList.actions;
export default updateSliceList.reducer;