import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import LaunchList from "../LaunchesList";
import { FilterWrapper, ListWrapper } from "./LaunchesView.styled";

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
  const yearOfTheFlight = useSelector(
    (state: RootState) => state.launches.yearOfTheFlight
  );
  const dispatch = useDispatch();

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
          Year of the flight
          <input
            type="text"
            value={yearOfTheFlight}
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
