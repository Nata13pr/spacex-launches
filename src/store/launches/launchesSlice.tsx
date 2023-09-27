import { createSlice } from "@reduxjs/toolkit";
import { IUser, ServerResponse } from "../../models/models";

interface Props{
  lanches: IUser[],
  page: number;
  totalPages: number;
}

const initialState:Props  = {
  lanches: [],
  page: 1,
  totalPages: 1,
};

export const launchesSlice = createSlice({
  name: "launches",
  initialState,
  reducers: {
    addLanches: (state, action) => {
      state.lanches = [...state.lanches, ...action.payload.docs];
    },
    setTotalPage: (state, action) => {
      state.totalPages = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addLanches, setTotalPage, setPage } = launchesSlice.actions;

export default launchesSlice.reducer;