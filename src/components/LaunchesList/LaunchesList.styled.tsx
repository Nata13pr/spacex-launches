import styled from "@emotion/styled";

export const LaunchLi = styled.li`
  box-sizing: border-box;
  display: block;
  position: relative;
  list-style: none;
  background-color: grey;
  width: 300px;

  float: left;

  border-radius: 15px;
  margin: 15px;
  padding: 15px;
  &:hover {
    cursor: pointer;
  }
`;

export const SmallPatchImg = styled.img`
  display: block;
  margin: auto;
  width: 250px;
`;

export const NameP = styled.p`
  text-align: center;
  font-size: 25px;
  font-weight: bold;
`;

export const NoAvailableImg = styled.img`
  background-color: grey;
  display: block;
  margin: auto;
  width: 250px;
  heighr: 250px;
`;
