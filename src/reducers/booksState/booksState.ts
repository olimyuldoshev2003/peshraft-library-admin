import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../store/store";

const initialState: any = {
  booksForEditing: {},
};

export const booksSlice = createSlice({
  name: "booksState",
  initialState,
  reducers: {
    setBooksForEditing(state: any, action: any) {
      state.booksForEditing = action.payload;
    },
  },
});

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.booksState;
export const { setBooksForEditing } = booksSlice.actions;

export default booksSlice.reducer;
