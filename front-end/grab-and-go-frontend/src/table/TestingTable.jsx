import React from 'react';
import { Table } from 'react-bootstrap';
import ordersData from '../testing/testing-order-data.json';

function TestingTable(props) {
    return (
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
                <tr key={index}>
                    <td>{order.orderNumber}</td>
                    <td>{order.customerName}</td>
                    <td>{order.orderID}</td>
                    <td>{order.itemPurchased}</td>
                </tr>
            ))}
            </tbody>
        </Table>
    );
}

export default TestingTable;
