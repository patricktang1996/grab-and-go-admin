import React, { useState } from 'react';
import { Table, Modal, Button } from 'react-bootstrap';

function TestingTable(props) {
    const [showModal, setShowModal] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const handleRowClick = (order) => {
        setSelectedOrder(order);
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
                    <th>Order Number</th>
                    <th>Customer Name</th>
                    <th>Order ID</th>
                    <th>Item Purchased</th>
                </tr>
                </thead>
                <tbody>
                {props.ordersData.map((order, index) => (
                    <tr key={index} onClick={() => handleRowClick(order)}>
                        <td>{order.orderNumber}</td>
                        <td>{order.customerName}</td>
                        <td>{order.orderID}</td>
                        <td>{order.itemPurchased}</td>
                    </tr>
                ))}
                </tbody>
            </Table>

            {/* popup */}
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Order Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedOrder && (
                        <>
                            <p><strong>Order Number:</strong> {selectedOrder.orderNumber}</p>
                            <p><strong>Customer Name:</strong> {selectedOrder.customerName}</p>
                            <p><strong>Order ID:</strong> {selectedOrder.orderID}</p>
                            <p><strong>Item Purchased:</strong> {selectedOrder.itemPurchased}</p>
                        </>
                    )}
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

export default TestingTable;
