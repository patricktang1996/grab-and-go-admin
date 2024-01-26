import {Col, Container, Row} from "react-bootstrap";
import MainNavbar from "../component/MainNavBar";
import Dashboard from "../component/Dashboard";
import React from "react";

function HomePage() {
  return (
      <Container fluid>
          <Row>
              <Col md={2}>
                  <MainNavbar />
              </Col>
              <Col md={10}>
                  <Dashboard />
              </Col>
          </Row>
      </Container>
  );
}

export default HomePage;