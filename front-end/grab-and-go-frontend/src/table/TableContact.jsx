import React, { useState } from 'react';
import { Table, Modal, Button } from 'react-bootstrap';
import DetailsPop from "../popupDiagram/DetailsPop";

function TableContact({ ordersData, currentPage, itemsPerPage}) {
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

    return (
        <>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Organisation_Name</th>
                    <th>Email</th>
                    <th>Shipping address</th>
                </tr>
                </thead>
                <tbody>
                {Object.entries(ordersData).map(([key, value], index) => (
                    <tr key={index} onClick={() => handleRowClick(value)}>
                        <td>{value.id}</td>
                        <td>{value.name}</td>
                        <td>{value.organisation_name}</td>
                        <td>{value.email}</td>
                        <td>{value["shipping_address"]}</td>
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
                    {selectedDetail && <DetailsPop details={selectedDetail} />}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default TableContact;
