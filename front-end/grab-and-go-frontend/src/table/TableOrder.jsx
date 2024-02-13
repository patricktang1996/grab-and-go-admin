import React, { useState } from 'react';
import { Table, Modal, Button } from 'react-bootstrap';
import DetailsPop from "../popupDiagram/DetailsPop";
import GeneratePDFPop from "../popupDiagram/GeneratePDFPop";
import PDFEditForm from "../popupDiagram/PDFEditForm";


function TableOrder({ ordersData, currentPage, itemsPerPage}) {
    const [showOrderModal, setShowOrderModal] = useState(false);
    const [isShowPdfPopup, setIsShowPdfPopup] = useState(false);
    const [selectedDetail, setSelectedDetail] = useState(null);

    const handleRowClick = (detail) => {
        // console.log("detail", detail);
        setSelectedDetail(detail);
        setShowOrderModal(true);
    };

    const handleClose = () => {
        setShowOrderModal(false);
    };

    const handleGeneratePDF = () => {
        setShowOrderModal(false);
        setIsShowPdfPopup(true);
    };

    return (
        <>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Job_Number</th>
                    <th>Purchase_Order</th>
                    <th>Date</th>
                    <th>Paid</th>
                    <th>Customer ID</th>
                </tr>
                </thead>
                <tbody>
                {Object.entries(ordersData).map(([key, value], index) => (
                    <tr key={index} onClick={() => handleRowClick(value)}>
                        <td>{value["job_number"]}</td>
                        <td>{value["purchase_order"]}</td>
                        <td>{value.date}</td>
                        <td>{value.paid}</td>
                        <td>{value["customer_id"]}</td>
                    </tr>
                ))}
                </tbody>
            </Table>


            {/* Modal */}
            <Modal show={showOrderModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedDetail && <DetailsPop details={selectedDetail} />}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleGeneratePDF}>
                        Generate PDF
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            {isShowPdfPopup && (
                <PDFEditForm
                    selectedDetail={selectedDetail}
                    setIsShowPdfPopup={setIsShowPdfPopup}
                />
            )}
        </>
    );
}

export default TableOrder;
