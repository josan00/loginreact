import React from 'react';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
    const navigate = useNavigate();

    const handleLogout = () =>{
        localStorage.removeItem('token');//Elimina token para autenticar
        navigate('/'); //redirige a inicio
    };

  return (
        <div>
            <h2>Pagina Admin</h2>
            <p>Bienvenido al panel de administracion.</p>
            <h3>Que deseas hacer?</h3>
            <button>Menu de usuarios usuarios</button><br/><br/>
            <button>Menu de proyectos</button><br/><br/>
            <button onClick={handleLogout} className='btn btn-danger'>Salir</button>
        </div>
    );
};

export default Admin;
