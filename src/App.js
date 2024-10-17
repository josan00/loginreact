import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Login from './components/login.component';
import SignUp from './components/signup.component';
import Admin from './components/admin.component';
//import Manager from './components/manager.component';
import ManejoUsuariosWrapper from './components/manejoUsuariosWrapper';
import ManejoProyectos from './components/manejoProyectos.component';
import Manager from './components/manager/manager.component.js';
import Dashboard from './components/manager/dashboard.component.js';
import Projects from './components/manager/projects.component.js';
import PrivateRoute from './components/PrivateRoute';
import ManejoTareas from './components/manejoTareas.component';
/*import PrivateRoute from './components/PrivateRoute';*/

function App() {
  return (
    <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="/sign-in" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/manejoUsuarios" element={<ManejoUsuariosWrapper />} />
          <Route path="/manager" element={<Manager />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="projects" element={<Projects />} />
          </Route>
          <Route path="/manejoUsuarios" element={<ManejoUsuariosWrapper />} />
          <Route path="/manejoProyectos" element={<ManejoProyectos />} />
          <Route path="/manejoTareas" element={<ManejoTareas />} />
        </Routes>
      {/*<div className="App">
         <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container">
            <Link className="navbar-brand" to={'/sign-in'}>
              Universidad Don Bosco
            </Link>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link" to={'/sign-in'}>
                    Ingresar
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={'/sign-up'}>
                    Registrarse
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="auth-wrapper">
          <div className="auth-inner">
            <Routes>
              <Route exact path="/" element={<Login />} />
              <Route path="/sign-in" element={<Login />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/manager" element={<Manager />} />
              <Route path="/manejoUsuarios" element={<ManejoUsuariosWrapper />} />
              <Route path="/manejoProyectos" element={<ManejoProyectos />} />
              <Route path="/manejoTareas" element={<ManejoTareas />} />
          </div>
        </div> 
      </div>*/}
    </Router>
  );
}

export default App;
