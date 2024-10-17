import React from 'react';
import { useNavigate, Link, Outlet } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';

const Manager = () => {
    const navigate = useNavigate();

    const handleLogout = () =>{
        localStorage.removeItem('token');//Elimina token para autenticar
        navigate('/'); //redirige a inicio
    };

    return (
        <div>
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container>
                    <Navbar.Brand href="/member">Manager</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/manager/dashboard">Dashboard</Nav.Link>
                            <Nav.Link as={Link} to="/manager/projects">Proyectos</Nav.Link>
                        </Nav>
                        <button onClick={handleLogout} className="btn btn-danger">Salir</button>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <div className="container mt-4">
                {/* Aquí se renderizan los componentes de las rutas hijas */}
                <Outlet />
            </div>
        </div>
    );
};

export default Manager;