import {Col, Container, Row} from "react-bootstrap";
import MainNavbar from "../component/MainNavBar";
import Dashboard from "../component/layout/Dashboard";
import React, { useEffect } from "react";
import { initDB, clearData, saveData } from '../utility/indexedDB';

function HomePage() {

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/getAllContacts');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log(data);
                const db = await initDB();
                await clearData(db, 'contacts');
                await saveData(db, 'contacts', data);
            } catch (error) {
                console.error('Failed to fetch and save contacts:', error);
            }
        };
        fetchData();
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