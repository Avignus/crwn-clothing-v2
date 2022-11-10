import styled from "styled-components";

export const ProductCardContainer = styled.div`
  width: 100%;
  display: flex;
  margin: 20px;
  flex-direction: column;
  height: 350px;
  align-items: center;
  justify-content: flex-end;
  position: relative;
  left: 35px;
  button {
    width: 80%;
    opacity: 0.7;
    position: absolute;
    top: 255px;
    display: none;
  }
  &:hover {
    img {
      opacity: 0.8;
    }
    button {
      opacity: 0.85;
      display: flex;
    }
  }
`;
export const Footer = styled.div`
  width: 80%;
  height: 5%;
  display: flex;
  justify-content: space-between;
  font-size: 18px;
`;
export const Name = styled.span`
  width: 70%;
  margin-bottom: 15px;
  font-size: 30px;
`;

export const Price = styled.span`
  text-align: right;
  width: 30%;
  font-size: 30px;
`;
