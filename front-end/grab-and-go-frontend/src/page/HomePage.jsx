import {Col, Container, Row} from "react-bootstrap";
import MainNavbar from "../component/MainNavBar";
import Dashboard from "../component/layout/Dashboard";
import React, { useEffect } from "react";
import {fetchAllContacts} from "../utility/fetchFromBackend";
function HomePage() {

    useEffect(() => {
        fetchAllContacts();
    }, []);

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