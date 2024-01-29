import { Container, Row, Col, Button, Table } from 'react-bootstrap';
import TestingTable from "../table/TestingTable";
import PaginationTool from "./PaginationTool";
// import json file
import ordersData from '../testing/testing-order-data.json';
function Dashboard() {
    return (
        <Container className="vh-100">
            {/* top：button */}
            <Row className="custom-height-10">
                <Col className="d-flex justify-content-center align-items-center">
                    <div>
                        <Button variant="primary">button1</Button>
                        <Button variant="secondary" className="ms-2">button2</Button>
                    </div>
                </Col>
            </Row>

            {/* medium：table */}
            <Row className="custom-height-80">
                <Col>
                    <Table striped bordered hover>
                        <TestingTable
                            ordersData={ordersData}
                        />
                    </Table>
                </Col>
            </Row>

            {/* bottom：pagination */}
            <Row>
                <Col className="d-flex justify-content-center align-items-center">
                    <PaginationTool />
                </Col>
            </Row>
        </Container>
    );
}

export default Dashboard;
