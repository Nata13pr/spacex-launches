import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetLaunchesByNameQuery } from "./api/launches.api";
import { addLaunches } from "./store/launches/launchesSlice";
import LaunchesView from "./components/LaunchesView";
import { ContainerDiv } from "./App.styled";
import { RootState } from "./store";
import { useDebounce } from "./hooks/debounced";

function App() {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [scrollTop, setScrollTop] = useState(0);

  const flightName = useSelector(
    (state: RootState) => state.launches.flightName
  );
  const flightNumber = useSelector(
    (state: RootState) => state.launches.flightNumber
  );
  const rocketNumber = useSelector(
    (state: RootState) => state.launches.rocketNumber
  );
  const debouncedName = useDebounce(flightName, 100);
  const debouncedRocketNumber = useDebounce(rocketNumber, 100);
  const debouncedFlightNumber = useDebounce(flightNumber, 100);
  const flightnumberNumber = Number(flightNumber);
  const { data, isLoading, isFetching } = useGetLaunchesByNameQuery({
    page,

    flightnumberNumber,
    debouncedRocketNumber,
    debouncedName,
  });
  const dispatch = useDispatch();
  console.log(data);

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

  return (
    <ContainerDiv>
      {isLoading && <p>Loading...</p>}
      <LaunchesView />
    </ContainerDiv>
  );
}

export default App;
