import styled from 'styled-components';

export const CategoryContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 20px;
  row-gap: 50px;

  @media screen and (max-width: 800px) {
    grid-template-columns: repeat(2, 1fr) !important;
  }
`;

export const Title = styled.h2`
  font-size: 35px;
  margin-bottom: 25px;
  cursor: pointer;
  text-align: center;
`;
