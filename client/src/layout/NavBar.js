import React from 'react';
import logo from '../logo.svg';
import { Navbar, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
  return (
    <Navbar collapseOnSelect expand='md' bg='dark' variant='dark' sticky='top'>
      <NavLink to='/' className='navbar-brand'>
        <img
          src={logo}
          className='d-inline-block align-top App-logo'
          width='40'
          height='40'
          alt='ApiHub Logo'
          draggable='false'
        />
      </NavLink>

      <Navbar.Toggle aria-controls='responsive-navbar-nav' />
      <Navbar.Collapse id='responsive-navbar-nav'>
        <Nav className='mr-auto'>
          <NavLink to='/github-jobs/' className='nav-link'>
            Github Jobs
          </NavLink>
          <NavLink to='/hacker-news/' className='nav-link'>
            Hacker News Clone
          </NavLink>
        </Nav>
        <Nav>⭐</Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
