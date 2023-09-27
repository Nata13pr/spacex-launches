import React from 'react';
import { useGetLaunchesByNameQuery } from './store/launches/launches.api';



function App() {
  const { data, error, isLoading } = useGetLaunchesByNameQuery(1);
console.log(data);

  return (
    <div >
      <h1>hello</h1>
    </div>
  );
}

export default App;
