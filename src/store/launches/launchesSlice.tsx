import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../models/models";

interface Props {
  launches: IUser[];
  totalPages: number;
  flightName: string;
  rocketNumber: string;
  flightNumber: string;
}

const initialState: Props = {
  launches: [],
  totalPages: 1,
  flightName: "",
  rocketNumber: "",
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
      state.rocketNumber = action.payload;
    },
    changeFlightNumber: (state, action: PayloadAction<string>) => {
      state.flightNumber = action.payload;
    },
    changeFlightName: (state, action: PayloadAction<string>) => {
      state.flightName = action.payload;
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

//GPT
// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { IUser } from "../../models/models";

// interface Props {
//   launches: IUser[];
//   totalPages: number;
//   flightName: string;
//   rocketName: string;
//   flightNumber: string;
// }

// const initialState: Props = {
//   launches: [],
//   totalPages: 1,
//   flightName: "",
//   rocketName: "",
//   flightNumber: "",
// };

// const launchesSlice = createSlice({
//   name: "launches",
//   initialState,
//   reducers: {
//     addLaunches: (state, action: PayloadAction<IUser[]>) => {
//       state.launches = [...state.launches, ...action.payload];
//     },
//     changeRocketName: (state, action: PayloadAction<string>) => {
//       state.rocketName = action.payload;
//     },
//     changeFlightNumber: (state, action: PayloadAction<string>) => {
//       state.flightNumber = action.payload;
//     },
//     changeFlightName: (state, action: PayloadAction<string>) => {
//       state.flightName = action.payload;
//     },
//   },
// });

// export const {
//   addLaunches,
//   changeRocketName,
//   changeFlightNumber,
//   changeFlightName,
// } = launchesSlice.actions;

// export default launchesSlice.reducer;
