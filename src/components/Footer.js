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
  padding: 10px 0px;
`;

const Title = styled.h1`
  color: #fff;
  font-size: 10px;
  a {
    padding-left: 2px;
    text-decoration: none;
    color: #fff;
  }
`;

const Footer = () => (
  <Container>
    <Title>
      With Love by
      <a
        href="https://github.com/oeduardoal/"
        target="_blank"
        rel="noopener noreferrer"
      >
        @oeduardoal
      </a>
    </Title>
  </Container>
);

export default Footer;
