import {Col, Container, Row} from "react-bootstrap";
import MainNavbar from "../component/MainNavBar";
import Dashboard from "../component/Dashboard";
import React from "react";

function HomePage() {
  return (
      <Container fluid>
          <Row>
              <Col>
                  <MainNavbar />
              </Col>
              <Col md={9}>
                  <Dashboard />
              </Col>
          </Row>
      </Container>
  );
}

export default HomePage;