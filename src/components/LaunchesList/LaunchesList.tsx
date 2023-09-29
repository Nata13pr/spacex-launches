import { IUser } from "../../models/models";
import noAvailableImage from "../noAvailableImage.png";
import styled from "@emotion/styled";
import { useState } from "react";
import Modal from "../Modal/Modal";

const ListItem = styled.li`
  box-sizing: border-box;
  display: block;
  position: relative;
  list-style: none;
  width: 150px;

  float: left;

  margin: 15px;
  padding: 15px;
`;

const Image = styled.img`
  width: 300px;
  height: 300px;
  z-index: 1;
`;

interface Props {
  launches: IUser[];
  // addDetails: ({ flightName: string }) => void;
  // toggleModal: () => void;
}

const LaunchList = ({
  launches,
}: // addDetails, toggleModal
Props) => {
  const [showModal, setShowModal] = useState(false);
  const [details, setDetails] = useState([""]);

  const toggleModal = () => {
    setShowModal((prevState) => !prevState);
  };

  const addDetails = (item: string[]) => {
    setDetails(item);
  };

  return (
    <>
      {showModal && (
        <Modal onClose={toggleModal}>
          {details.map((detail) => <div key={detail}>{detail}</div>) ||
            "No details available"}
        </Modal>
      )}
      {launches.map((launch) => {
        return (
          <ListItem
            key={launch.id}
            onClick={() =>
              addDetails([
                `Flight Name: ${launch.name}`,
                `Flight number :`,
                String(launch.flight_number),
                launch.details || "No details available",
                `Year of flight: ${launch.date_utc.slice(0, 4)}`,
              ])
            }
          >
            <div onClick={toggleModal}>
              {launch.links.patch.small ? (
                <Image src={launch.links.patch.small} alt={launch.name} />
              ) : (
                <Image src={noAvailableImage} alt="no picture available" />
              )}
            </div>
          </ListItem>
        );
      })}
    </>
  );
};

export default LaunchList;
