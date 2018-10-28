import React, { Component } from "react";
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
window.now = new Date();

export default class Noivos extends Component {
  state = {};

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    console.log("asddas");

    let countDownDate = new Date("Nov 24, 2018 09:00:00").getTime();

    let x = setInterval(function() {
      let now = new Date().getTime();

      let distance = countDownDate - now;

      let days = Math.floor(distance / (1000 * 60 * 60 * 24));
      let hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((distance % (1000 * 60)) / 1000);

      document.getElementById("contagem-regressiva-js").innerHTML =
        days +
        " Dias " +
        hours +
        " Horas " +
        minutes +
        " Minutos " +
        seconds +
        "s ";

      if (distance < 0) {
        clearInterval(x);
        document.getElementById("contagem-regressiva-js").innerHTML =
          "JÁ É HOJE! #luheli";
      }
    }, 1000);
  };

  render() {
    return (
      <Container banner={bg}>
        <NoivosImg src={noivos} />
        <NomeNoivos>Elielson e Luana</NomeNoivos>
        <Descricao>
          Por trás de um grande amor, <br />
          existe uma grande história!
        </Descricao>
        <Descricao>
          <h1 id="contagem-regressiva-js">Carregando...</h1>
          <br />
          <strong>Local: Rua Ceará 535, Centro-Eusébio - CE</strong>
          <br />
          <br />
          <strong>Horário: 24/11/2018 - às 09:00</strong>
          <br />
          <br />
          <strong>Traje: Esporte Fino</strong>
        </Descricao>
      </Container>
    );
  }
}
