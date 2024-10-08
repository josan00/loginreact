import React from 'react';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
    const navigate = useNavigate();

    const handleLogout = () =>{
        localStorage.removeItem('token');//Elimina token para autenticar
        navigate('/'); //redirige a inicio
    };

    const handleUserManagement = () => {
        navigate('/manejoUsuarios');
    };

    const handleProjectManagement = () => {
        navigate('/manejoProyectos');
    };

  return (
        <div>
            <h2>Pagina Admin</h2>
            <p>Bienvenido al panel de administracion.</p>
            <h3>Que deseas hacer?</h3>
            <div className="d-grid">
          <button onClick={handleUserManagement} className="btn btn-primary">
            Menu de usuarios usuarios
          </button><br/>
        </div>
            <div className="d-grid">
          <button onClick={handleProjectManagement} className="btn btn-primary">
            Menu de proyectos
          </button><br/>
        </div>
            <button onClick={handleLogout} className='btn btn-danger'>Salir</button>
        </div>
    );
};

export default Admin;
