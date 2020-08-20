import React from 'react'
import Settings from '../../../Settings.json'
import { Navbar, Nav, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Header: React.FC = () => {
  const [expanded, setexpanded] = React.useState(false)
  return (
    <Navbar expanded={expanded} style={{ backgroundColor: 'lightgreen' }} expand='lg' variant='dark'>
      <Col md='2' />
      <Navbar.Brand className='text-dark'>{Settings.ProjectName}</Navbar.Brand>
      <Navbar.Toggle
        onClick={() => setexpanded((prevExpanded) => (prevExpanded = !prevExpanded))}
        aria-controls='basic-navbar-nav'
      />
      <Navbar.Collapse id='basic-navbar-nav'>
        <Nav className='mr-auto ' onClick={() => setexpanded(false)}>
          <Link className='text-dark nav-link' to='/'>
            Home
          </Link>
        </Nav>
        <Link className='text-dark nav-link' to='/login'>
          Login
        </Link>
        <Link className='text-dark nav-link' to='/signup'>
          Signup
        </Link>
        <Link to='/myaccount'>
          Username
          <img src={' '} alt='Profile Pic' height={50} style={{ borderRadius: 50 }}></img>
        </Link>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Header
