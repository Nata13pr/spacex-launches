import React, { useState } from "react";
import { IUser } from "../../models/models";
import Modal from "../Modal/Modal";
import noAvailableImage from "../launch.png";

import {
  SmallPatchImg,
  LaunchLi,
  NameP,
  NoAvailableImg,
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
    console.log(item);

    setDetails(item);
  };

  return (
    <>
      {showModal && details && (
        <Modal onClose={toggleModal} detailsObject={details}></Modal>
      )}
      {launches.map((launch) => {
        return (
          <LaunchLi key={launch.id} onClick={() => addDetails(launch)}>
            <div onClick={toggleModal}>
              {launch.links.patch.small ? (
                <SmallPatchImg
                  src={launch.links.patch.small}
                  alt={launch.name}
                />
              ) : (
                <NoAvailableImg
                  src={noAvailableImage}
                  alt="no picture available"
                />
              )}
              <NameP>{launch.rocket.name}</NameP>
            </div>
          </LaunchLi>
        );
      })}
    </>
  );
};

export default LaunchList;
