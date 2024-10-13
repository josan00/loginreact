import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Obtener usuarios
export const obtenerUsuarios = async () => {
    try {
        const response = await axios.get(`${API_URL}/usuarios`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener los usuarios:', error);
        throw error;
    }
};

// Crear un nuevo usuarios
export const crearUsuario = async (usuarios) => {
    try {
        const response = await axios.post(`${API_URL}/usuarios`, usuarios);
        return response.data;
    } catch (error) {
        console.error('Error al crear el usuario:', error);
        throw error;
    }
};

// Actualizar un usuario
export const actualizarUsuario = async (idUsuario, usuario) => {
    try {
        const response = await axios.put(`${API_URL}/usuarios/${idUsuario}`, usuario);
        return response.data;
    } catch (error) {
        console.error('Error al actualizar usuario:', error);
        throw error;
    }
};

// Eliminar un proyecto
export const eliminarUsuario = async (idUsuario) => {
    try {
        const response = await axios.delete(`${API_URL}/usuarios/${idUsuario}`);
        return response.data;
    } catch (error) {
        console.error('Error al eliminar usuario:', error);
        throw error;
    }
};
