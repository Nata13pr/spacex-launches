import { useEffect, useState } from "react";
import { useGetLaunchesByNameQuery } from "./api/launches.api";
import { useDispatch, useSelector } from "react-redux";
import { addLaunches, setTotalPage } from "./store/launches/launchesSlice";
import { RootState } from "./store";
import LaunchesView from "./components/LaunchesView";

function App() {
  const totalPages = useSelector(
    (state: RootState) => state.launches.totalPages
  );
  const [page, setPage] = useState(1);
  const { data, isLoading } = useGetLaunchesByNameQuery(page);
  const dispatch = useDispatch();

  useEffect(() => {
    if (data) {
      dispatch(addLaunches(data.docs));
      dispatch(setTotalPage(data.totalPages));
      setPage(data.page);
    }
  }, [data, dispatch]);

  const handleButtonLoadMore = () => {
    const nextPage = page + 1;
    if (nextPage > totalPages) {
      return;
    }
    setPage(nextPage);
  };

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      <LaunchesView />
      <button onClick={handleButtonLoadMore}>Load more</button>
    </div>
  );
}

export default App;
