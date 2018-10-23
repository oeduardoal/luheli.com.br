import React from "react";
import styled from "styled-components";
import noivos from "../assets/eles.jpg";
import bg from "../assets/bg.jpg";

const Container = styled.div`
  background: url(${props => props.banner}) no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px;
  min-height: 80vh;
`;

const NoivosImg = styled.div`
  background: url(${props => props.src}) no-repeat;
  background-position: center;
  background-size: cover;
  border-radius: 50%;
  width: 250px;
  height: 250px;
`;

const NomeNoivos = styled.h3`
  color: #fff;
  margin-top: 10px;
`;

const Descricao = styled.p`
  color: #fff;
  margin-top: 10px;
  text-align: center;
`;

const Noivos = () => (
  <Container banner={bg}>
    <NoivosImg src={noivos} />
    <NomeNoivos>Elielson e Luana</NomeNoivos>
    <Descricao>
      Por trás de um grande amor, <br />
      existe uma grande história!
    </Descricao>
    <br />
    <br />
    <Descricao>
      <strong>Local: Rua Ceará 535, Centro-Eusébio - CE</strong>
      <br />
      <br />
      <strong>Horário: às 09:00</strong>
      <br />
      <br />
      <strong>Traje: Esporte Fino</strong>
    </Descricao>
  </Container>
);

export default Noivos;
