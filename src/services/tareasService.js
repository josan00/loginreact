import axios from 'axios';

const API_URL = 'http://localhost:5000/api/tareas';

export const getTareas = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error al obtener las tareas', error);
        throw error;
    }
};

export const createTarea = async (tarea) => {
    try {
        const response = await axios.post(API_URL, tarea);
        return response.data;
    } catch (error) {
        console.error('Error al crear la tarea', error);
        throw error;
    }
};

export const updateTarea = async (id, tarea) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, tarea);
        return response.data;
    } catch (error) {
        console.error('Error al actualizar la tarea', error);
        throw error;
    }
};

export const deleteTarea = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error al eliminar la tarea', error);
        throw error;
    }
};