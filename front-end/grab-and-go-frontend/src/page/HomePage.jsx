import {Col, Container, Row} from "react-bootstrap";
import MainNavbar from "../component/MainNavBar";
import DashboardContacts from "../component/layout/DashboardContacts";
import DashboardOrders from "../component/layout/DashboardOrders";
import React, { useEffect } from "react";
import {
    fetchAddNewOrder,
    fetchAllContacts,
    fetchAllOrders,
    fetchAllPriceCategories,
    fetchAllPrices, fetchAllProducts,
    fetchAllTags, fetchExistingOrder, fetchExistingOrderProduct, fetchSearchCompanyOrders
} from "../utility/fetchFromBackend";
import {Routes, Route, Navigate} from "react-router-dom";
function HomePage() {

    useEffect(() => {
        const fetchAllData = async () => {
            await fetchAllContacts();
            await fetchAllOrders();
            // await fetchAllTags();
            // await fetchAllPrices();
            // await fetchAllPriceCategories();
            await fetchAllProducts();
            // await fetchExistingOrder();
            // await fetchExistingOrderProduct();
            // await fetchSearchCompanyOrders();
            // await fetchAddNewOrder();
        }
        fetchAllData();
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
                      <Route path="/" element={<Navigate replace to="/contacts" />} />
                  </Routes>
              </Col>
          </Row>
      </Container>
  );
}

export default HomePage;