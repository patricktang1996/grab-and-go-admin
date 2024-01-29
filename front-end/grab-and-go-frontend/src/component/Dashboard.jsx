import { Container, Row, Col, Button, Table } from 'react-bootstrap';
import TestingTable from "../table/TestingTable";
import PaginationTool from "./PaginationTool";
// import json file
import ordersData from '../testing/testing-order-data.json';
import {useEffect, useState} from "react";
function Dashboard() {
    // ... pagination start
    const [totalPages, setTotalPages] = useState(0);
    function countPageTotalNumber() {
        const totalNumber = ordersData.length;
        const totalPage = Math.ceil(totalNumber / 12);
        setTotalPages(totalPage);
    }

    useEffect(() => {
        countPageTotalNumber();
    }, []);

    useEffect(() => {
        console.log('totalPages: ', totalPages);
    }, [totalPages]);
    // ... pagination end ...
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
                    <PaginationTool
                        totalPages={totalPages}
                    />
                </Col>
            </Row>
        </Container>
    );
}

export default Dashboard;
