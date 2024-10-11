import React, { Component } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Modal, Button, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class ManejoUsuarios extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      name: '',
      lastname: '',
      role: 'Member',
      error: '',
      success: '',
      showModal: false,
      users: []
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password, name, lastname, role } = this.state;

    if (!username.trim() || !password.trim() || !name.trim() || !lastname.trim()) {
      this.setState({ error: 'Todos los campos son obligatorios y no pueden estar vacíos.', success: '' });
      return;
    }

    try {
      const res = await axios.post('http://localhost:3000/register', {
        username,
        password,
        name,
        lastname,
        role
      });
      this.setState({
        username: '',
        password: '',
        name: '',
        lastname: '',
        role: 'Member',
        success: 'Usuario registrado exitosamente',
        error: ''
      });
    } catch (err) {
      console.error('Error registrando usuario:', err);
      this.setState({ error: 'Error registrando usuario', success: '' });
    }
  };

  handleBack = () => {
    this.props.navigate('/admin');
  };

  handleShowModal = async () => {
    try {
      const res = await axios.get('http://localhost:3000/users');
      this.setState({ users: res.data, showModal: true });
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:3000/users/${userId}`);
      this.setState({ users: this.state.users.filter(user => user.id !== userId) });
    } catch (err) {
      console.error('Error deleting user:', err);
    }
  };

  render() {
    return (
      <>
        <div className="button-container">
          <button type="button" className="btn btn-info" onClick={this.handleShowModal}>
            Buscar usuarios
          </button>
        </div>

        <Modal show={this.state.showModal} onHide={this.handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Lista de Usuarios</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Apellido</th>
                  <th>Correo Electrónico</th>
                  <th>Rol</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {this.state.users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.lastname}</td>
                    <td>{user.username}</td>
                    <td>{user.role}</td>
                    <td>
                      <Button variant="warning" onClick={() => console.log('Editar usuario', user.id)}>Editar</Button>{' '}
                      <Button variant="danger" onClick={() => this.handleDeleteUser(user.id)}>Eliminar</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleCloseModal}>
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>

        <hr />

        <div className="form-container">
          <form onSubmit={this.handleSubmit}>
            <h3>Registrar Usuario</h3>

            <div className="mb-3">
              <label>Nombre</label>
              <input
                type="text"
                className="form-control"
                placeholder="Nombre"
                name="name"
                value={this.state.name}
                onChange={this.handleChange}
              />
            </div>

            <div className="mb-3">
              <label>Apellido</label>
              <input
                type="text"
                className="form-control"
                placeholder="Apellido"
                name="lastname"
                value={this.state.lastname}
                onChange={this.handleChange}
              />
            </div>

            <div className="mb-3">
              <label>Correo Electrónico</label>
              <input
                type="email"
                className="form-control"
                placeholder="Correo Electrónico"
                name="username"
                value={this.state.username}
                onChange={this.handleChange}
              />
            </div>

            <div className="mb-3">
              <label>Contraseña</label>
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                name="password"
                value={this.state.password}
                onChange={this.handleChange}
              />
            </div>

            <div className="mb-3">
              <label>Rol</label>
              <select
                className="form-control"
                name="role"
                value={this.state.role}
                onChange={this.handleChange}
              >
                <option value="Admin">Administrador</option>
                <option value="Manager">Manager</option>
                <option value="Member">Member</option>
              </select>
            </div>

            {this.state.error && <div className="alert alert-danger">{this.state.error}</div>}
            {this.state.success && <div className="alert alert-success">{this.state.success}</div>}

            <div className="d-grid">
              <button type="submit" className="btn btn-primary">
                Registrar
              </button>
            </div>

            <div className="d-grid mt-3">
              <button type="button" className="btn btn-danger" onClick={this.handleBack}>
                Regresar
              </button>
            </div>
          </form>
        </div>
      </>
    );
  }
}
