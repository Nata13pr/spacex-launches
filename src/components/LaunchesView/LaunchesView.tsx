import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import LaunchList from "../LaunchesList";
import { FilterWrapper, ListWrapper } from "./LaunchesView.styled";
import {
  addLaunches,
  changeFlightName,
  changeFlightNumber,
  changeYearOfTheFlight,
} from "../../store/launches/launchesSlice";
import useDebounce from "../../hooks/useDebounce";
import { useGetLaunchesByNameQuery } from "../../api/launches.api";
import Filter from "../Filter";

export default function LaunchesView() {
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [scrollTop, setScrollTop] = useState<number>(0);
  const [searchFlightName, setSearchFlightName] = useState<string>("");
  const [searchFlightNumber, setSearchFlightNumber] = useState<string>("");
  const [searchYearOfTheFlight, setSearchearOfTheFlight] = useState<string>("");

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

  const debouncedFlightName = useDebounce(flightName, 900);
  const debouncedFlightNumber = useDebounce(flightNumber, 900);
  const debouncedYearOfTheFlight = useDebounce(yearOfTheFlight, 900);

  const { data, isLoading, isFetching } = useGetLaunchesByNameQuery({
    page,
    searchYearOfTheFlight,
    searchFlightNumber,
    searchFlightName,
  });

  useEffect(() => {
    setSearchFlightName(debouncedFlightName);
  }, [debouncedFlightName]);

  useEffect(() => {
    setSearchFlightNumber(debouncedFlightNumber);
  }, [debouncedFlightNumber]);

  useEffect(() => {
    setSearchearOfTheFlight(debouncedYearOfTheFlight);
  }, [debouncedYearOfTheFlight]);

  useEffect(() => {
    if (data && !isFetching) {
      dispatch(addLaunches(data.docs));
      setTotalPages(data.totalPages);
      setPage(data.page);
    }
  }, [isFetching]);

  useEffect(() => {
    const onScroll = (e: any) => {
      setScrollTop(e.target.documentElement.scrollTop);
    };
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollTop]);

  useEffect(() => {
    const windowHeight = Math.max(
      document.body.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.scrollHeight,
      document.documentElement.offsetHeight
    );
    if (
      scrollTop !== 0 &&
      scrollTop + window.innerHeight > windowHeight - window.innerHeight &&
      !isFetching &&
      page < totalPages
    ) {
      setPage(page + 1);
      setScrollTop(0);
    }
  }, [scrollTop]);

  const filtersInput = [
    {
      title: "Flight name",
      value: flightName,
      onChange: function (e: React.ChangeEvent<HTMLInputElement>) {
        dispatch(changeFlightName(e.target.value));
      },
    },

    {
      title: "Flight Number",
      value: flightNumber,
      onChange: function (e: React.ChangeEvent<HTMLInputElement>) {
        dispatch(changeFlightNumber(e.target.value));
      },
    },
    {
      title: " Year of the flight",
      value: yearOfTheFlight,
      onChange: function (e: React.ChangeEvent<HTMLInputElement>) {
        dispatch(changeYearOfTheFlight(e.target.value));
      },
    },
  ];

  return (
    <>
      <FilterWrapper>
        {filtersInput.map((filter) => (
          <Filter
            key={filter.title}
            title={filter.title}
            value={filter.value}
            onFilterChange={filter.onChange}
          />
        ))}
      </FilterWrapper>
      {isLoading && <p>Loading...</p>}
      <ListWrapper>
        <LaunchList launches={launches} />
      </ListWrapper>
    </>
  );
}
