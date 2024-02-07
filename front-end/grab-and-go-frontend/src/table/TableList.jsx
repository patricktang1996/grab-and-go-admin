import React, { useState } from 'react';
import { Table, Modal, Button } from 'react-bootstrap';
import DetailsPop from "../popupDiagram/DetailsPop";
import GeneratePDFPop from "../popupDiagram/GeneratePDFPop";
import PDFEditForm from "../popupDiagram/PDFEditForm";


function TableList({ ordersData, currentPage, itemsPerPage}) {
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
        setIsShowPdfPopup(true);
    };

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

export default TableList;
