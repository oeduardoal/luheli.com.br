import React, { Component } from "react";
import pagseguro from "../services/pagseguro";
import Color from "color";
import styled from "styled-components";
import Image from "react-shimmer";

const ColorDefault = Color("#fa6666")
  .lighten(0.1)
  .hex()
  .toString();

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  margin-bottom: 10px;
  padding: 20px;
`;

const Content = styled.div`
  padding-top: 10px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  height: 100%;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Preco = styled.span`
  color: ${ColorDefault};
  font-size: 30px;
  font-weight: 600;
  margin-bottom: 10px;
`;

const Title = styled.h4`
  color: ${ColorDefault};
  margin-bottom: 5px;
`;

const Button = styled.button`
  cursor: pointer;
  background: ${props =>
    props.active
      ? Color("#fa6666")
          .lighten(0.2)
          .hex()
          .toString()
      : ColorDefault};
  color: #fff;
  border: none;
  font-size: 15px;
  padding: 10px 40px;
  transition: all 0.2s ease 0s;
  font-weight: 600;
  &:hover {
    background: ${Color("#fa6666")
      .lighten(0.2)
      .hex()
      .toString()};
  }
`;

const Descricao = styled.div`
  color: ${ColorDefault};
  p {
    margin-bottom: 10px;
  }
`;

export default class Item extends Component {
  state = {
    item: false,
    loading: false,
    active: false,
    imageProduto: "",
    presentear: false
  };

  toggleButton = () => {
    if (this.state.item) {
      this.setState({
        loading: false,
        presentear: false,
        active: false,
        item: false
      });
    } else {
      this.setState({
        loading: true,
        presentear: true,
        active: true,
        item: true
      });
    }
  };

  toPrice = price => {
    price = price.replace(".", "").replace(",", ".");
    price = Number(price).toFixed(2);
    return price;
  };

  presentear = item => {
    this.toggleButton();

    const dados = pagseguro.post("/pagseguro.php", {
      nome: "Digite seu nome",
      preco: this.toPrice(item.acf.preco),
      presente: item.title.rendered
    });
    dados
      .then(token => {
        this.toggleButton();
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

  renderContent = content => {
    return {
      __html: content.rendered
    };
  };

  renderGetName = () => <h1> Edu </h1>;

  render() {
    const { item } = this.props;
    const { title, content, acf, _embedded } = item;

    const {
      media_details: {
        sizes: {
          full: { source_url }
        }
      }
    } = _embedded["wp:featuredmedia"][0];

    return (
      <Container>
        <Wrapper>
          <Image
            src={`${source_url}`}
            width={300}
            height={300}
            color="#ccc"
            style={{ objectFit: "cover" }} // Style your <img>
            delay={25}
            duration={1.6} // Customize the animation duration (s).
          />
          <Content>
            <Title> {title.rendered} </Title>
            <Descricao dangerouslySetInnerHTML={this.renderContent(content)} />
            <Preco>RS {acf.preco}</Preco>
            <Button
              active={this.state.active}
              onClick={() => this.presentear(item)}
            >
              {this.state.loading ? "Carregando" : "Presentear"}
            </Button>
          </Content>
        </Wrapper>
      </Container>
    );
  }
}
