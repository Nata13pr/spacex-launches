import { IUser } from "../../models/models";
import noImage from "../noImage.png";
import styled from "@emotion/styled";

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
  addDetails: (item: string) => void;
  toggleModal: () => void;
}

const LaunchList = ({ launches, addDetails, toggleModal }: Props) => {
  return (
    <>
      {launches.map((launch) => {
        return (
          <ListItem key={launch.id} onClick={() => addDetails(launch.name)}>
            <div onClick={toggleModal}>
              {launch.links.patch.small ? (
                <Image src={launch.links.patch.small} alt={launch.name} />
              ) : (
                <Image src={noImage} alt="no picture available" />
              )}

              <div>Name: {launch.name}</div>
              <div>Flight Number: {launch.flight_number}</div>
              <div>Data: {launch.date_utc.slice(0, 4)}</div>
            </div>
          </ListItem>
        );
      })}
    </>
  );
};

export default LaunchList;
