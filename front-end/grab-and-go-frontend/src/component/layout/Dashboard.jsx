import {Container, Row, Col, Button, Table, Dropdown} from 'react-bootstrap';
import PaginationTool from "../PaginationTool";
import localAllConcat from '../../testing/local_test_file.json';

import {useEffect, useState} from "react";
import useSearch from '../../customHook/useSearch';
import TableContacts from "../../table/TableContacts";
import { loadData, initDB } from '../../utility/indexedDB';


function Dashboard() {
    const itemsPerPage = 12;
    const [currentPage, setCurrentPage] = useState(1);
    const [pageContent, setPageContent] = useState([]);
    // const [idbData, setIdbData] = useState(localAllConcat); //use local data for testing
    const [idbData, setIdbData] = useState([]); //use fetch data from back-end for testing

    useEffect(() => {
        const fetchData = async () => {
            try {
                const db = await initDB();
                const loadedData = await loadData(db, 'contacts');
                setIdbData(loadedData);
            } catch (error) {
                console.error('Failed to load data from IndexedDB:', error);
            }
        };

        fetchData();
    }, []);

    const {searchTerm, setSearchTerm, searchCategory, setSearchCategory, filteredData} = useSearch(idbData, 'None');

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    useEffect(() => {
        setPageContent(filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage));
    }, [currentPage, filteredData]);

    const handlePageChangeCallback = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleSearchTypeChange = (type) => {
        setSearchCategory(type);
        setSearchTerm('');
    };

    return (
        <Container className="vh-100">
            <Row className="custom-height-10 align-items-center">
                <Col xs={6} md={4} className="d-flex justify-content-end pe-2">
                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            Choose Category: {searchCategory}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => handleSearchTypeChange('None')}>None</Dropdown.Item>
                            <Dropdown.Item onClick={() => handleSearchTypeChange('Organisation')}>Organisation</Dropdown.Item>
                            <Dropdown.Item onClick={() => handleSearchTypeChange('Contact Person')}>Contact Person</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
                <Col xs={6} md={4} className="d-flex justify-content-start ps-2">
                    <input
                        type="text"
                        id="searchInput"
                        className="form-control"
                        placeholder={`Search by ${searchCategory}...`}
                        value={searchTerm} // use searchTerm from useSearch
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </Col>
                <Col className="d-flex justify-content-center align-items-center">
                    <div>
                        <Button variant="primary">button1</Button>
                        <Button variant="secondary" className="ms-2">button2</Button>
                    </div>
                </Col>
            </Row>

            {/* Table */}
            <Row className="custom-height-80">
                <Col>
                    <TableContacts
                        ordersData={pageContent}
                        currentPage={currentPage}
                        itemsPerPage={itemsPerPage}
                    />
                </Col>
            </Row>

            {/* Pagination */}
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
