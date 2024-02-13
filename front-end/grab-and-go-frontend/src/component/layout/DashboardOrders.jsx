import {Container, Row, Col, Button, Table, Dropdown} from 'react-bootstrap';
import PaginationTool from "../PaginationTool";
import localAllConcat from '../../testing/local_test_file.json';

import {useEffect, useState} from "react";
import useSearch from '../../customHook/useSearch';
import TableContact from "../../table/TableContact";
import { loadData, initDB } from '../../utility/indexedDB';
import TableOrder from "../../table/TableOrder";


function DashboardOrders() {
    const itemsPerPage = 12;
    const [currentPage, setCurrentPage] = useState(1);
    const [pageContent, setPageContent] = useState([]);
    const [idbData, setIdbData] = useState([]); //use fetch data from back-end for testing

    useEffect(() => {
        const fetchData = async () => {
            try {
                const db = await initDB();
                const loadedData = await loadData(db, 'orders');
                setIdbData(loadedData);
            } catch (error) {
                console.error('Failed to load data from IndexedDB:', error);
            }
        };

        fetchData();
    }, []);

    const {searchTerm, setSearchTerm, searchCategory, setSearchCategory, filteredData} = useSearch(idbData, 'Job Number');

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    useEffect(() => {
        setPageContent(filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage));
    }, [currentPage, filteredData]);

    const handlePageChangeCallback = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <Container className="vh-100">
            <Row className="custom-height-10 align-items-center">
                <Col xs={6} md={4} className="d-flex justify-content-end pe-2">
                    <Dropdown variant="success" id="custom-search-dropdown-basic">
                        Choose Category: {searchCategory}
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
            </Row>

            {/* Table */}
            <Row className="custom-height-80">
                <Col>
                    <TableOrder
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

export default DashboardOrders;
