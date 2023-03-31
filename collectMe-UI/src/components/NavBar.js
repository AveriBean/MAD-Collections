import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function NavBar () {
    return (

        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand href="#home"><h1 className="text-white">Field Agents Inventory</h1></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-navt" />
                <Navbar.Collapse id="basic-light-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link className="text-secondary" href="/">Home</Nav.Link>
                    <Nav.Link className="text-secondary" href="/add">Add Agent</Nav.Link>
                    <Nav.Link className="text-secondary" href="/agents">Agents</Nav.Link>
                    <Nav.Link className="text-secondary" href="/construction">Agencies</Nav.Link>
                    <Nav.Link className="text-secondary" href="/construction">Alias</Nav.Link>
                    <Nav.Link className="text-secondary" href="/construction">Locations</Nav.Link>
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>

    )
}

export default NavBar;