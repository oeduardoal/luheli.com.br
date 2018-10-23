import React from "react";
import Color from "color";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  background-color: ${Color("#fa6666")
    .lighten(0.1)
    .hex()
    .toString()};
  justify-content: center;
  align-items: center;
  padding: 20px 0px;
`;

const Title = styled.h1`
  color: #fff;
  font-size: 15px;
`;

const Header = () => (
  <Container>
    <Title>Quero de Casamento - Elielson e Luana</Title>
  </Container>
);

export default Header;
