import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Stack } from 'react-bootstrap';

function MainNavbar() {
    return (
        <Navbar className="custom-bg-color vh-100 custom-fixed-width-side">
            <Stack gap={3} className="w-100 d-flex my-auto align-items-center">
                <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                <Nav className="flex-column">
                    <Nav.Link href="#home">Home</Nav.Link>
                    <Nav.Link href="#link">Link</Nav.Link>
                    <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Stack>
        </Navbar>
    );
}

export default MainNavbar;
