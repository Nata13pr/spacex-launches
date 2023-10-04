import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import Filter from "../Filter";
import LaunchList from "../LaunchesList";
import { IFilter, IUser } from "../../models/models";
import { FilterWrapper, ListWrapper } from "./LaunchesView.styled";
import { useDebounce } from "../../hooks/debounced";
import {
  changeFlightName,
  changeFlightNumber,
  changeRocketNumber,
} from "../../store/launches/launchesSlice";

export default function LaunchesView() {
  const launches = useSelector((state: RootState) => state.launches.launches);
  const flightName = useSelector(
    (state: RootState) => state.launches.flightName
  );
  const flightNumber = useSelector(
    (state: RootState) => state.launches.flightNumber
  );
  const rocketNumber = useSelector(
    (state: RootState) => state.launches.rocketNumber
  );
  const dispatch = useDispatch();

  console.log(launches);

  return (
    <div>
      <FilterWrapper>
        <label>
          Flight name
          <input
            type="text"
            value={flightName}
            onChange={(e) => dispatch(changeFlightName(e.target.value))}
          ></input>
        </label>
        <label>
          Flight Number
          <input
            type="text"
            value={flightNumber}
            onChange={(e) => dispatch(changeFlightNumber(e.target.value))}
          ></input>
        </label>
        <label>
          Rocket Name
          <input
            type="text"
            value={rocketNumber}
            onChange={(e) => dispatch(changeRocketNumber(e.target.value))}
          ></input>
        </label>
      </FilterWrapper>
      <ListWrapper>
        <LaunchList launches={launches} />
      </ListWrapper>
    </div>
  );
}
