import React from 'react'
import Logo from '../../assets/logos/pbs-sem-fundo.svg'
import './Menu.scss'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { FaHome, FaBoxes } from 'react-icons/fa'
import { ImAddressBook } from 'react-icons/im'
import { FiLogOut } from 'react-icons/fi'

const Menu = () => {
    
    return (
        <Navbar>
        <Container className="side-margin">
          <Navbar.Brand href="/dashboard">
            <img
              alt="Logo Projeto Bom Samaritano"
              src={ Logo }
              className="d-inline-block align-top"
              />
          </Navbar.Brand>
        </Container>

        <Container className="pbs-flex">
            <Nav.Link href="/dashboard">
                <FaHome className="pbs-icon"/>
                Dashboard
            </Nav.Link>
        </Container>

        <Container className="pbs-flex">
            <Nav.Link href="/cadastros">
                <ImAddressBook className="pbs-icon"/>
                Cadastros
            </Nav.Link>
        </Container>

        <Container className="pbs-flex">
            <Nav.Link href="#">
                <FaBoxes className="pbs-icon"/>
                Estoque
            </Nav.Link>
        </Container>

        <Container className="pbs-logout">
            <Nav.Link href="#">
                Sair
                <FiLogOut className="logout-icon"/>
            </Nav.Link>    
        </Container>
    </Navbar>
    )
}

export default Menu