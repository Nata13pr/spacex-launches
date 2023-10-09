import React, { useState } from "react";

import { IUser } from "../../models/models";
import Modal from "../Modal/Modal";
import noAvailableImage from "../launch.png";
import {
  NoAvailableImage,
  SmallPatchImage,
  Launch,
  Name,
} from "./LaunchesList.styled";

interface Props {
  launches: IUser[];
}

const LaunchList = ({ launches }: Props) => {
  const [showModal, setShowModal] = useState(false);
  const [details, setDetails] = useState<IUser | null>(null);

  const toggleModal = () => {
    setShowModal((prevState) => !prevState);
  };

  const addDetails = (item: IUser) => {
    setDetails(item);
  };

  return (
    <>
      {showModal && details && (
        <Modal onClose={toggleModal} detailsObject={details}></Modal>
      )}
      {launches.map((launch) => {
        return (
          <Launch key={launch.id} onClick={() => addDetails(launch)}>
            <div onClick={toggleModal}>
              {launch.links.patch.small ? (
                <SmallPatchImage
                  src={launch.links.patch.small}
                  alt={launch.name}
                />
              ) : (
                <NoAvailableImage
                  src={noAvailableImage}
                  alt="no picture available"
                />
              )}
              <Name>{launch.name}</Name>
            </div>
          </Launch>
        );
      })}
    </>
  );
};

export default LaunchList;
