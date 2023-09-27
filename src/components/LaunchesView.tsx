import {  useState } from "react";
import { useSelector } from "react-redux";
import { IUser } from "../models/models";

import { RootState } from "../store";
import Filter from "./Filter";
import LaunchList from "./LaunchesList";
import Modal from "./Modal/Modal";
import styled from '@emotion/styled'

const  ListWrapper =styled.ul`
display: grid;
grid-template-columns: 1fr 1fr 1fr 1fr;
`;


export default function LaunchesView() {
  const [showModal, setShowModal] = useState(false);
  const [details, setDetails] = useState("");
  const [name, setName] = useState("");
  const [flightNumber, setFlightNumber] = useState("");
  const [date, setDate] = useState("");
  const launches = useSelector((state: RootState) => state.launches.lanches);

  const toggleModal = () => {
    setShowModal((prevState) => !prevState);
  };

  const handlerOnClick = (item: string ) => {
    setDetails(item);
  };

  const handleChangeFIlter = (event: React.ChangeEvent<HTMLInputElement>) => {
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

  const filtredByName = (lanches: IUser[]) => {
    return lanches.filter((launch) => {
      return launch.name.toLowerCase().includes(name.toLowerCase().trim());
    });
  };

  const filtredByFlightNumber = (lanches: IUser[]) => {
    if (flightNumber === "") {
      return lanches;
    }

    return lanches.filter((launch) => {
      return launch.flight_number === Number(flightNumber);
    });
  };

  const filtredByDate = (launches: IUser[]) => {
    return launches.filter((launch) => {
      const newDate = new Date(launch.date_unix);

      return newDate.toLocaleDateString().includes(date.toLowerCase().trim());
    });
  };
  const launchesFilteredByName = filtredByName(launches);
  const launchesFilteredByFlightNumber = filtredByFlightNumber(
    launchesFilteredByName
  );
  const launchesFilteredByDate = filtredByDate(launchesFilteredByFlightNumber);

  return (
    <div>
      <Filter
        name="name"
        value={name}
        title="Name"
        onChange={handleChangeFIlter}
      />
      <Filter
        name="flightNumber"
        value={flightNumber}
        title=" Flight Number"
        onChange={handleChangeFIlter}
      />
      <Filter
        name="date"
        value={date}
        title="Date"
        onChange={handleChangeFIlter}
      />

      {showModal && (
        <Modal onClose={toggleModal}>
          {details ? details : "No details available"}
        </Modal>
      )}
      <ListWrapper>
        <LaunchList
          handlerOnClick={handlerOnClick}
          toggleModal={toggleModal}
          launches={launchesFilteredByDate}
        />
      </ListWrapper>
    </div>
  );
}
