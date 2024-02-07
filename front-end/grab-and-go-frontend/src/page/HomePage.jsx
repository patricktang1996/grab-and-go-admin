import {Col, Container, Row} from "react-bootstrap";
import MainNavbar from "../component/MainNavBar";
import DashboardContacts from "../component/layout/DashboardContacts";
import DashboardOrders from "../component/layout/DashboardOrders";
import DashboardPrices from "../component/layout/DashboardPrices";
import React, { useEffect } from "react";
import {fetchAllContacts} from "../utility/fetchFromBackend";
import {Routes, Route} from "react-router-dom";
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
                  <Routes>
                      <Route path="/contacts" element={<DashboardContacts />} />
                      <Route path="/orders" element={<DashboardOrders />} />
                      <Route path="/prices" element={<DashboardPrices />} />
                  </Routes>
              </Col>
          </Row>
      </Container>
  );
}

export default HomePage;