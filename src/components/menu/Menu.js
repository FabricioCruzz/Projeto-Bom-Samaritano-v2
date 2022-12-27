import React from 'react'
import logo from '../../assets/logos/pbs-sem-fundo.svg'
import './Menu.scss'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { LinkContainer } from 'react-router-bootstrap'
import { FaHome, FaBoxes } from 'react-icons/fa'
import { ImAddressBook } from 'react-icons/im'
import { FiLogOut } from 'react-icons/fi'


const Menu = () => {
    
    const pathDashboard = '/dashboard'
    const pathCadastros = '/cadastros'
    const pathEstoque = '/estoque'
    const pathLogin = '/'

    return (
        <Navbar>
        <Container className="side-margin">
            <LinkContainer to={ pathDashboard }>
                <Navbar.Brand>
                    <img
                    alt="Logo Projeto Bom Samaritano"
                    src={ logo }
                    className="d-inline-block align-top"
                    />
                </Navbar.Brand>
            </LinkContainer>
        </Container>
        
        <Container className="pbs-flex">
            <LinkContainer to={ pathDashboard }>
                <Nav.Link>
                    <FaHome className="pbs-icon"/>
                    Dashboard
                </Nav.Link>
            </LinkContainer>
        </Container>

        <Container className="pbs-flex">
            <LinkContainer to={ pathCadastros }>
                <Nav.Link>
                    <ImAddressBook className="pbs-icon"/>
                    Cadastros
                </Nav.Link>
            </LinkContainer>
        </Container>

        <Container className="pbs-flex">
            <LinkContainer to={ pathEstoque }>
                <Nav.Link>
                    <FaBoxes className="pbs-icon"/>
                    Estoque
                </Nav.Link>
            </LinkContainer>
        </Container>

        <Container className="pbs-logout">
            <LinkContainer to={ pathLogin }>
                <Nav.Link>
                    Sair
                    <FiLogOut className="logout-icon"/>
                </Nav.Link>
            </LinkContainer>
        </Container>
    </Navbar>
    )
}

export default Menu