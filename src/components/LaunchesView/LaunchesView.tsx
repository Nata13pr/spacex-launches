import { useState } from "react";
import { useSelector } from "react-redux";
import { IUser } from "../../models/models";
import { RootState } from "../../store";
import Filter from "../Filter";
import Modal from "../Modal/Modal";
import styled from "@emotion/styled";
import LaunchList from "../LaunchesList";

const ListWrapper = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
`;

export default function LaunchesView() {
  const [showModal, setShowModal] = useState(false);
  const [details, setDetails] = useState("");
  const [name, setName] = useState("");
  const [flightNumber, setFlightNumber] = useState("");
  const [date, setDate] = useState("");
  const launches = useSelector((state: RootState) => state.launches.launches);

  const toggleModal = () => {
    setShowModal((prevState) => !prevState);
  };

  const addDetails = (item: string) => {
    setDetails(item);
  };

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

  return (
    <div>
      <Filter
        name="name"
        value={name}
        title="Name"
        onFilterChange={handleFilterChange}
      />
      <Filter
        name="flightNumber"
        value={flightNumber}
        title="Flight Number"
        onFilterChange={handleFilterChange}
      />
      <Filter
        name="date"
        value={date}
        title="Date"
        onFilterChange={handleFilterChange}
      />

      {showModal && (
        <Modal onClose={toggleModal}>{details || "No details available"}</Modal>
      )}
      <ListWrapper>
        <LaunchList
          addDetails={addDetails}
          toggleModal={toggleModal}
          launches={launchesFilterByDate}
        />
      </ListWrapper>
    </div>
  );
}
