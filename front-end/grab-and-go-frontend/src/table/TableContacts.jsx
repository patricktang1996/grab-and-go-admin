import React, { useState } from 'react';
import { Table, Modal, Button } from 'react-bootstrap';
import CompanyDetailsPop from "../popupDiagram/CompanyDetailsPop";

function TableContacts({ ordersData, currentPage, itemsPerPage}) {
    const [showModal, setShowModal] = useState(false);
    const [isShowPdfPopup, setIsShowPdfPopup] = useState(false);
    const [selectedDetail, setSelectedDetail] = useState(null);

    const handleRowClick = (detail) => {
        setSelectedDetail(detail);
        setShowModal(true);
    };

    const handleClose = () => {
        setShowModal(false);
    };

    const handleGeneratePDF = () => {
        setShowModal(false);
    }

    return (
        <>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Index</th>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Organisation</th>
                </tr>
                </thead>
                <tbody>
                {Object.entries(ordersData).map(([key, value], index) => (
                    <tr  key={index} onClick={() => handleRowClick(value)}>
                        <td>{index + (currentPage - 1) * itemsPerPage + 1}</td>
                        <td>{value.ID}</td>
                        <td>{value.Name}</td>
                        <td>{value.Type}</td>
                        <td>{value.Organisation}</td>
                    </tr>
                ))}
                </tbody>
            </Table>


            {/* Modal */}
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedDetail && <CompanyDetailsPop details={selectedDetail} />}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Generate PDF
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default TableContacts;
