import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../models/models";
import type { PayloadAction } from "@reduxjs/toolkit";

interface Props {
  lanches: IUser[];
  page: number;
  totalPages: number;
}

const initialState = {
  lanches: [],
  page: 1,
  totalPages: 1,
} as Props;

export const launchesSlice = createSlice({
  name: "launches",
  initialState,
  reducers: {
    addLanches: (state, action: PayloadAction<IUser[]>) => {
      state.lanches = [...state.lanches, ...action.payload];
    },
    setTotalPage: (state, action: PayloadAction<number>) => {
      state.totalPages = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addLanches, setTotalPage, setPage } = launchesSlice.actions;

export default launchesSlice.reducer;
