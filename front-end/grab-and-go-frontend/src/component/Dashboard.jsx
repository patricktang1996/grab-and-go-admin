import { Container, Row, Col, Button, Table, Pagination } from 'react-bootstrap';
import TestingTable from "../table/TestingTable";

function Dashboard() {
    return (
        <Container className="vh-100">
            {/* top：button */}
            <Row className="custom-height-20">
                <Col className="d-flex justify-content-center align-items-center">
                    <div>
                        <Button variant="primary">button1</Button>
                        <Button variant="secondary" className="ms-2">button2</Button>
                        {/* more button */}
                    </div>
                </Col>
            </Row>

            {/* medium：table */}
            <Row className="custom-height-60">
                <Col>
                    <Table striped bordered hover>
                        <TestingTable />
                    </Table>
                </Col>
            </Row>

            {/* bottom：pagination */}
            <Row className="custom-height-20">
                <Col className="d-flex justify-content-center align-items-center">
                    <Pagination>
                        <Pagination.First />
                        <Pagination.Prev />
                        <Pagination.Item active>{1}</Pagination.Item>
                        <Pagination.Item>{2}</Pagination.Item>
                        <Pagination.Item>{3}</Pagination.Item>
                        <Pagination.Ellipsis />
                        <Pagination.Next />
                        <Pagination.Last />
                    </Pagination>
                </Col>
            </Row>
        </Container>
    );
}

export default Dashboard;
