import React from 'react';
import { useNavigate } from 'react-router-dom';
import ManejoUsuarios from './manejoUsuarios.component';

const ManejoUsuariosWrapper = () => {
  const navigate = useNavigate();
  return <ManejoUsuarios navigate={navigate} />;
};

export default ManejoUsuariosWrapper;
