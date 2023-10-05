import styled from "@emotion/styled";

export const ContainerDiv = styled.div`
  margin: 0 auto;
  padding-left: 20px;
  padding-right: 20px;

  @media screen and (max-width: 767px) {
    max-width: 360px;
    margin-left: auto;
    margin-right: auto;
  }

  @media screen and (min-width: 768px) {
    max-width: 768px;
    padding-left: 20px;
    padding-right: 20px;
    margin-left: auto;
    margin-right: auto;
  }

  @media screen and (min-width: 1320px) {
    max-width: 1320px;
    padding-left: 20px;
    padding-right: 20px;
    margin-left: auto;
    margin-right: auto;
  }
`;
