import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Obtener todos los proyectos
export const obtenerProyectos = async () => {
    try {
        const response = await axios.get(`${API_URL}/proyectos`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener los proyectos:', error);
        throw error;
    }
};

// Crear un nuevo proyecto
export const crearProyecto = async (proyecto) => {
    try {
        const response = await axios.post(`${API_URL}/proyectos`, proyecto);
        return response.data;
    } catch (error) {
        console.error('Error al crear el proyecto:', error);
        throw error;
    }
};

// Actualizar un proyecto
export const actualizarProyecto = async (idProyecto, proyecto) => {
    try {
        const response = await axios.put(`${API_URL}/proyectos/${idProyecto}`, proyecto);
        return response.data;
    } catch (error) {
        console.error('Error al actualizar el proyecto:', error);
        throw error;
    }
};

// Eliminar un proyecto
export const eliminarProyecto = async (idProyecto) => {
    try {
        const response = await axios.delete(`${API_URL}/proyectos/${idProyecto}`);
        return response.data;
    } catch (error) {
        console.error('Error al eliminar el proyecto:', error);
        throw error;
    }
};
