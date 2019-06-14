import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

import Avatar from './Avatar';

const NavBar = () => {
  return (
    <Navbar
      sticky='top'
      bg='light'
      expand='lg'
    >
      <Navbar.Brand><Avatar /></Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav>
          <Nav.Link href='/home'>Home</Nav.Link>
          <Nav.Link href='/appointments'>Appointments</Nav.Link>
          <Nav.Link href='/names'>Names</Nav.Link>
          <Nav.Link href='/shoppinglist'>Shopping List</Nav.Link>
          <Nav.Link href='/todo'>To Do</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;