import React, { Component } from "react";
import Color from "color";
import api from "./services/api";
import pagseguro from "./services/pagseguro";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Noivos from "./components/Noivos";
import Item from "./components/Item";
import Fade from "react-reveal/Fade";
import styled, { injectGlobal } from "styled-components";

injectGlobal`
  *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Montserrat', sans-serif;
    }
    *:focus, *:active{
        outline: none;
    }
    body{
        background: #FFF;
        text-rendering: optimizeLegibility !important;
        -webkit-font-smoothing: antialiased !important;
    }
    html, body, #root{
      width: 100%;
      height: 100%;
    }
    .active{
    }
`;

const Container = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  background-color: #fff;
  justify-content: space-between;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow-y: scroll;
`;

const Items = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
`;
const DoarButton = styled.button`
  cursor: pointer;
  border: none;
  min-height: 100%;
  max-height: 30px;
  min-height: 30px;
  width: 60px;
  border: none;
  background-color: transparent;
  color: #fff;
  margin-right: 5px;
  font-size: 15px;
  width: 10%;
  &:hover {
    background-color: ${Color("#fa6666")
      .lighten(0.1)
      .hex()
      .toString()};
  }
`;

const Doar = styled.div`
  cursor: pointer;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 15px;
  font-weight: 600;
  background-color: ${Color("#fa6666")
    .lighten(0.2)
    .hex()
    .toString()};
  color: #fff;
  justify-content: center;
  align-items: center;
  max-height: 30px;
  min-height: 30px;
  &:hover {
    background-color: ${Color("#fa6666")
      .lighten(0.2)
      .hex()
      .toString()};
  }
`;

const DoarInput = styled.div`
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 15px;
  font-weight: 600;
  background-color: ${Color("#fa6666")
    .lighten(0.2)
    .hex()
    .toString()};
  color: #fff;
  justify-content: center;
  align-items: center;
  max-height: 30px;
  min-height: 30px;
  input {
    width: 90%;
    max-height: 30px;
    min-height: 30px;
    border: none;
    background: #fff;
    padding: 0 5px;
  }
  &:hover {
    background-color: ${Color("#fa6666")
      .lighten(0.2)
      .hex()
      .toString()};
  }
`;

class App extends Component {
  async componentDidMount() {
    let request = await api.get("wp-json/wp/v2/produtos?_embed&per_page=100");
    const { data } = request;

    this.setState({ items: data });
  }

  presentearQualquerValor = () => {
    this.setState({ presentear: this.state.presentear ? false : true });
  };

  toPrice = price => {
    price = price.replace(".", "").replace(",", ".");
    price = Number(price).toFixed(2);
    return price;
  };

  presentear = value => {
    if (value === "" || parseInt(value) === 0) return;
    if (isNaN(value)) {
      this.setState({ value: "" });
      alert("Digite um numero!");
      return;
    }
    this.setState({
      presentear: this.state.presentear ? false : true,
      value: ""
    });
    const dados = pagseguro.post("/pagseguro.php", {
      nome: "Digite seu nome",
      preco: this.toPrice(value),
      presente: `Dar de presente: ${this.toPrice(value)} R$`
    });
    dados
      .then(token => {
        var isOpenLightbox = window.PagSeguroLightbox(
          {
            code: `${token.data.code}`
          },
          {
            success: function(transactionCode) {
              // alert("Tudo certo!");
              window.location.reload();
            },
            abort: function() {
              alert("Oooh, não foi possível concluir a compra!");
            }
          }
        );
        if (!isOpenLightbox) {
          window.location.href =
            "https://pagseguro.uol.com.br/v2/checkout/payment.html?code=" +
            `${token.data.code}`;
        }
      })
      .catch(err => console.log(err));
  };

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  state = {
    items: [],
    presentear: false,
    value: ""
  };

  render() {
    return (
      <Container>
        <Header />
        <Wrapper>
          <Noivos />
          <Items>
            {this.state.items.map(item => (
              <Fade key={item.id} {...(item.id % 2 === 0 ? "left" : "right")}>
                <Item item={item} />
              </Fade>
            ))}
          </Items>
        </Wrapper>
        {this.state.presentear ? (
          <DoarInput>
            <input
              placeholder="Presentear quanto? Ex: 9.999,99"
              value={this.state.value}
              onChange={event => this.handleChange(event)}
              name="presente"
            />
            <DoarButton onClick={() => this.presentear(this.state.value)}>
              Doar
            </DoarButton>
          </DoarInput>
        ) : (
          <Doar onClick={() => this.presentearQualquerValor()}>
            <h4>Presentear qualquer valor!</h4>
          </Doar>
        )}
        <Footer />
      </Container>
    );
  }
}

export default App;
