import React from "react";
import ApiMoneda from "./ApiMoneda";
import UltimasNoticias from "./UltimasNoticias";
import ApiClima from "./ApiClima";
//import NoticiasCategorias from "./NoticiasCategorias";
//import BannerCovid from "./BannerCovid";
import { Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Inicio = (props) => {
  return (
    <section>
      <div className="container-fluid pre-footer">
        <Container>
          <Row>
            <Col className="d-none d-lg-block">
              <ApiClima></ApiClima>
            </Col>
            <Col>
              <ApiMoneda></ApiMoneda>
            </Col>
          </Row>
        </Container>
      </div>

      <div className="p-3 my-3">
        <UltimasNoticias noticias={props.noticias}></UltimasNoticias>
      </div>

      {/* <BannerCovid className="container"></BannerCovid> */}

      {/* <div className="p-3 my-3 mx-5">
        <Container fluid>
          <Row className="d-flex justify-content-around">
            <Col md={8}>
              <NoticiasCategorias className="shadow border rounded p-3"></NoticiasCategorias>
            </Col>
            <Col md={3}>
              <h1>PUBLICIDAD</h1>
            </Col>
          </Row>
        </Container>
      </div> */}
    </section>
  );
};

export default Inicio;
