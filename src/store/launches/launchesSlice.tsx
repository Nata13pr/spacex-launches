import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../models/models";

interface Props {
  launches: IUser[];
  totalPages: number;
  flightName: string;
  yearOfTheFlight: string;
  flightNumber: string;
}

const initialState: Props = {
  launches: [],
  totalPages: 1,
  flightName: "",
  yearOfTheFlight: "",
  flightNumber: "",
} as Props;

export const launchesSlice = createSlice({
  name: "launches",
  initialState,
  reducers: {
    addLaunches: (state, action: PayloadAction<IUser[]>) => {
      state.launches = [...state.launches, ...action.payload];
    },
    changeRocketNumber: (state, action: PayloadAction<string>) => {
      state.yearOfTheFlight = action.payload;
      state.launches = [];
    },
    changeFlightNumber: (state, action: PayloadAction<string>) => {
      state.flightNumber = action.payload;
      state.launches = [];
    },
    changeFlightName: (state, action: PayloadAction<string>) => {
      state.flightName = action.payload;
      state.launches = [];
    },
  },
});

export const {
  addLaunches,
  changeRocketNumber,
  changeFlightNumber,
  changeFlightName,
} = launchesSlice.actions;

export default launchesSlice.reducer;
