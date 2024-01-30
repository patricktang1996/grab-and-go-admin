import { Container, Row, Col, Button, Table } from 'react-bootstrap';
import PaginationTool from "./PaginationTool";

import ordersData from '../testing/my_file.json';

import {useEffect, useState} from "react";
import TableCompany from "../table/TableCompany";
function Dashboard() {
    const itemsPerPage = 12;
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageContent, setPageContent] = useState([]);
    const [entities, setEntities] = useState([]);

    useEffect(() => {
        // convert json object to array
        const entitiesArray = Object.keys(ordersData).map(key => ({
            ...ordersData[key],
            entityName: key
        }));
        setEntities(entitiesArray);
    }, []);

    useEffect(() => {
        setTotalPages(Math.ceil(entities.length / itemsPerPage));
    }, [entities]);

    useEffect(() => {
        setPageContent(entities.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage));
    }, [currentPage, totalPages]);

    useEffect(() => {
        console.log('totalPages: ', totalPages);
        console.log('pageContent: ', pageContent);
        console.log('entities: ', entities);
    }, [pageContent, totalPages, entities]);

    function handlePageChangeCallback(pageNumber) {
        console.log('pageNumber: ', pageNumber);
        setCurrentPage(pageNumber);
    }
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
                        <TableCompany
                            ordersData={pageContent}
                            currentPage={currentPage}
                            itemsPerPage={itemsPerPage}
                        />
                    </Table>
                </Col>
            </Row>

            {/* bottom：pagination */}
            <Row>
                <Col className="d-flex justify-content-center align-items-center">
                    <PaginationTool
                        totalPages={totalPages}
                        onPageChange={handlePageChangeCallback}
                    />
                </Col>
            </Row>
        </Container>
    );
}

export default Dashboard;
