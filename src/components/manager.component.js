import React from 'react';
import { useNavigate } from 'react-router-dom';

const Manager = () => {
    const navigate = useNavigate();

    const handleLogout = () =>{
        localStorage.removeItem('token');//Elimina token para autenticar
        navigate('/'); //redirige a inicio
    };

  return (
        <div>
            <h2>Vista Manager</h2>
            <p>Bienvenido al panel de administracion para managers.</p>
            <button onClick={handleLogout} className='btn btn-danger'>Salir</button>
        </div>
    );
};

export default Manager;