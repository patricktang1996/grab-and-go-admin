import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Stack } from 'react-bootstrap';

function MainNavbar() {
    return (
        <Navbar className="vh-100" data-bs-theme="dark" bg="dark">
            <Stack gap={3} className="w-100 d-flex my-auto align-items-center">
                <Navbar.Brand href="#home">Grab&Go</Navbar.Brand>
                <Nav className="flex-column">
                    <Nav.Link href="contacts">Contacts</Nav.Link>
                    <Nav.Link href="orders">Orders</Nav.Link>
                </Nav>
            </Stack>
        </Navbar>
    );
}

export default MainNavbar;
