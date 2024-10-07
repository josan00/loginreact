import React, { Component } from 'react';
import axios from 'axios';
import {bcrypt} from 'bcryptjs';

export default class ManejoUsuarios extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      nombre: '',
      apellido: '',
      error: '',
      success: ''
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password, nombre, apellido } = this.state;
    try {
      const hashedPassword = bcrypt.hashSync(password, 10); // Usar hashSync para encriptar la contraseña
      console.log('hashed password:', hashedPassword);
      const res = await axios.post('http://localhost:3000/register', {
        username,
        password: hashedPassword,
        nombre,
        apellido
      });
      this.setState({ success: 'Usuario registrado exitosamente', error: '' });
    } catch (err) {
      console.error('Error registrando usuario:', err);
      this.setState({ error: 'Error registrando usuario', success: '' });
    }
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h3>Registrar Usuario</h3>

        <div className="mb-3">
          <label>Nombre</label>
          <input
            type="text"
            className="form-control"
            placeholder="Nombre"
            name="nombre"
            value={this.state.nombre}
            onChange={this.handleChange}
          />
        </div>

        <div className="mb-3">
          <label>Apellido</label>
          <input
            type="text"
            className="form-control"
            placeholder="Apellido"
            name="apellido"
            value={this.state.apellido}
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

        {this.state.error && <div className="alert alert-danger">{this.state.error}</div>}
        {this.state.success && <div className="alert alert-success">{this.state.success}</div>}

        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Registrar
          </button>
        </div>
      </form>
    );
  }
}
