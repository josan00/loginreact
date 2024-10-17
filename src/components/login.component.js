import React, { Component } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";

// Función personalizada withRouter
const withRouter = (Component) => {
  const Wrapper = (props) => {
    const navigate = useNavigate();
    return <Component navigate={navigate} {...props} />;
  };
  return Wrapper;
};

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: "",
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    try {
      console.log('Enviando solicitud de inicio de sesión');
      const res = await axios.post('https://34.45.234.180:3000/login', { username: email, password });//Prueba GCS login
      console.log('Respuesta del servidor:', res.data);
      if (res.data.token) {
        localStorage.setItem("token", res.data.token); // Guarda el token en localStorage
        const decodedToken = jwtDecode(res.data.token);
        const role = decodedToken.role;
        console.log("Rol del usuario:", role);
        if (role === "Administrador") {
          console.log("Redirigiendo a /admin");
          this.props.navigate("/admin"); // Redirige a /admin
        } else if (role === "Manager") {
          console.log("Redirigiendo a /manager");
          this.props.navigate("/manager"); // Redirige a /manager
        } else {
          console.log("Redirigiendo a /");
          this.props.navigate("/"); // Redirige a la página principal o a otra ruta por defecto
        }
      } else {
        this.setState({ error: "Credenciales incorrectas" });
      }
    } catch (err) {
      console.log("Error en el inicio de sesión:", err);
      this.setState({ error: "Credenciales incorrectas" });
    }
  };

  render() {
    return (
      <div className="App">
        <div className="auth-wrapper login">
          <div className="auth-inner">
            <form onSubmit={this.handleSubmit}>
              <h3>Ingresar</h3>
              <div className="mb-3">
                <label>Correo Electronico</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter email"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                />
              </div>

              <div className="mb-3">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                />
              </div>

              <div className="mb-3">
                <div className="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="customCheck1"
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="customCheck1"
                  >
                    Recuerdame
                  </label>
                </div>
              </div>

              {this.state.error && (
                <div className="alert alert-danger">{this.state.error}</div>
              )}

              <div className="d-grid">
                <button type="submit" className="btn btn-primary">
                  Enviar
                </button>
              </div>
              <Link to={"/sign-up"}>Registrarse</Link>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);