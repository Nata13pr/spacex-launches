import React, { useEffect } from "react";
import { useGetLaunchesByNameQuery } from "./store/launches/launches.api";
import { useDispatch, useSelector } from "react-redux";
import {
  addLanches,
  setPage,
  setTotalPage,
} from "./store/launches/launchesSlice";
import { RootState } from "./store";
import LaunchesView from "./components/LaunchesView";

function App() {
  const page = useSelector((state: RootState) => state.launches.page);
  const totalPages = useSelector(
    (state: RootState) => state.launches.totalPages
  );

  const { data, error, isLoading } = useGetLaunchesByNameQuery(page);
  const dispatch = useDispatch();

  useEffect(() => {
    if (data) {
      dispatch(addLanches(data.docs));
      dispatch(setTotalPage(data.totalPages));
      dispatch(setPage(data.page));
    }
  }, [data]);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    if (nextPage > totalPages) {
      return;
    }
    dispatch(setPage(nextPage));
  };

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      <LaunchesView />
      <button onClick={handleLoadMore}>Load more</button>
    </div>
  );
}

export default App;
