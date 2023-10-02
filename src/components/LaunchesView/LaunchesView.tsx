import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import Filter from "../Filter";
import LaunchList from "../LaunchesList";
import { IFilter, IUser } from "../../models/models";
import { FilterWrapper, ListWrapper } from "./LaunchesView.styled";

export default function LaunchesView() {
  const [name, setName] = useState("");
  const [flightNumber, setFlightNumber] = useState("");
  const [date, setDate] = useState("");
  const launches = useSelector((state: RootState) => state.launches.launches);

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    switch (name) {
      case "name":
        setName(value);
        break;

      case "flightNumber":
        setFlightNumber(value);
        break;

      case "date":
        setDate(value);
        break;

      default:
        return;
    }
  };

  const filterByName = (launches: IUser[]) => {
    return launches.filter((launch) => {
      return launch.name.toLowerCase().includes(name.toLowerCase().trim());
    });
  };

  const filterByFlightNumber = (launches: IUser[]) => {
    if (flightNumber === "") {
      return launches;
    }

    return launches.filter((launch) => {
      return String(launch.flight_number).includes(flightNumber.trim());
    });
  };

  const filterByDate = (launches: IUser[]) => {
    if (date) {
      return launches.filter((launch) => {
        return launch.date_utc.slice(0, 4).includes(date.toLowerCase().trim());
      });
    }
    return launches;
  };

  const launchesFilterByName = filterByName(launches);
  const launchesFilterByFlightNumber =
    filterByFlightNumber(launchesFilterByName);
  const launchesFilterByDate = filterByDate(launchesFilterByFlightNumber);

  const filtersInfo: IFilter[] = [
    { name: "name", value: name, title: "Flight Name" },
    { name: "flightNumber", value: flightNumber, title: "Flight Number" },
    { name: "date", value: date, title: "Year of the flight" },
  ];

  return (
    <div>
      <FilterWrapper>
        {filtersInfo.map((item) => {
          return (
            <Filter
              key={item.name}
              name={item.name}
              value={item.value}
              title={item.title}
              onFilterChange={handleFilterChange}
            />
          );
        })}
      </FilterWrapper>
      <ListWrapper>
        <LaunchList launches={launchesFilterByDate} />
      </ListWrapper>
    </div>
  );
}
