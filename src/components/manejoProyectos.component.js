import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManejoProyectos = () => {
    // Estado para los proyectos
    const [proyectos, setProyectos] = useState([]);
    const [nombreProyecto, setNombreProyecto] = useState('');
    const [editando, setEditando] = useState(false);
    const [proyectoActual, setProyectoActual] = useState(null);

    // Simulación de llamada a la API para cargar proyectos
    useEffect(() => {
        const fetchProyectos = async () => {
            try {
                const response = await axios.get('https://localhost:5000/api/proyectos');
                setProyectos(response.data);
            } catch (error) {
                console.error('Error cargando proyectos:', error);
            }
        };
        fetchProyectos();
    }, []);

    // Manejar la creación o edición de un proyecto
    const manejarSubmit = async (e) => {
        e.preventDefault();
        if (editando) {
            // Editar un proyecto
            try {
                await axios.put(`http://localhost:5000/api/proyectos/${proyectoActual.id}`, { nombre: nombreProyecto });
                setProyectos(proyectos.map((proyecto) =>
                    proyecto.id === proyectoActual.id ? { ...proyecto, nombre: nombreProyecto } : proyecto
                ));
                setEditando(false);
                setProyectoActual(null);
                setNombreProyecto('');
            } catch (error) {
                console.error('Error editando proyecto:', error);
            }
        } else {
            // Crear un nuevo proyecto
            try {
                const response = await axios.post('http://localhost:5000/api/proyectos', { nombre: nombreProyecto });
                setProyectos([...proyectos, response.data]);
                setNombreProyecto('');
            } catch (error) {
                console.error('Error creando proyecto:', error);
            }
        }
    };

    // Manejar la eliminación de un proyecto
    const eliminarProyecto = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/proyectos/${id}`);
            setProyectos(proyectos.filter((proyecto) => proyecto.id !== id));
        } catch (error) {
            console.error('Error eliminando proyecto:', error);
        }
    };

    // Manejar la edición de un proyecto
    const iniciarEdicion = (proyecto) => {
        setEditando(true);
        setProyectoActual(proyecto);
        setNombreProyecto(proyecto.nombre);
    };

    return (
        <div className="container">
            <h2 className="mt-4">Manejo de Proyectos</h2>

            {/* Formulario para crear/editar proyectos */}
            <form onSubmit={manejarSubmit} className="my-4">
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Nombre del Proyecto"
                        value={nombreProyecto}
                        onChange={(e) => setNombreProyecto(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    {editando ? 'Guardar Cambios' : 'Crear Proyecto'}
                </button>
                {editando && (
                    <button
                        type="button"
                        className="btn btn-secondary ml-2"
                        onClick={() => {
                            setEditando(false);
                            setNombreProyecto('');
                        }}
                    >
                        Cancelar
                    </button>
                )}
            </form>

            {/* Listado de proyectos */}
            <div className="mt-4">
                <h3>Proyectos</h3>
                <ul className="list-group">
                    {proyectos.map((proyecto) => (
                        <li key={proyecto.id} className="list-group-item d-flex justify-content-between align-items-center">
                            {proyecto.nombre}
                            <div>
                                <button className="btn btn-sm btn-info" onClick={() => iniciarEdicion(proyecto)}>
                                    Editar
                                </button>
                                <button className="btn btn-sm btn-danger ml-2" onClick={() => eliminarProyecto(proyecto.id)}>
                                    Eliminar
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ManejoProyectos;

