import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../models/models";

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
  },
});

export const { addLaunches } = launchesSlice.actions;

export default launchesSlice.reducer;
