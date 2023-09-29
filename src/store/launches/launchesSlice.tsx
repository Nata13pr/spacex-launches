import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../models/models";
import type { PayloadAction } from "@reduxjs/toolkit";

interface Props {
  launches: IUser[];
  totalPages: number;
}

const initialState: Props = {
  launches: [],
  totalPages: 1,
} as Props;

export const launchesSlice = createSlice({
  name: "launches",
  initialState,
  reducers: {
    addLaunches: (state, action: PayloadAction<IUser[]>) => {
      state.launches = [...state.launches, ...action.payload];
    },
    setTotalPage: (state, action: PayloadAction<number>) => {
      state.totalPages = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addLaunches, setTotalPage } = launchesSlice.actions;

export default launchesSlice.reducer;
