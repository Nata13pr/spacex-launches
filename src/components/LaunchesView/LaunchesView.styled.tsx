import styled from "@emotion/styled";

export const ListWrapper = styled.ul`
  @media screen and (max-width: 767px) {
    max-width: 360px;
    list-style-type: none;
    padding: 0px;
    margin: 0px;
    display: grid;
    grid-template-columns: 1fr;
  }

  @media screen and (min-width: 768px) {
    max-width: 768px;
    list-style-type: none;
    margin: 0px;
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  @media screen and (min-width: 1320px) {
    max-width: 1320px;
    list-style-type: none;
    padding: 0px;
    margin: 0px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;

export const FilterWrapper = styled.div`
  display:block;
  
  align-items: center;
  padding-top: 20px;
  margin-bottom: 25px;
  padding-left:20px;
  margin-left:20px;

  @media screen and (min-width: 768px) {
    display: flex;
    justify-content: space-between;
    padding-top: 21px;
    margin-bottom: 39px;
    padding-bottom:30px;
  }

  @media screen and (min-width: 1320px) {
    padding-top: 10px;
    margin-bottom: 39px;
  }
}
`;
