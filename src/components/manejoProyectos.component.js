import React, { useEffect, useState } from 'react';
import { obtenerProyectos, crearProyecto, eliminarProyecto } from '../services/proyectoService';

const ManejoProyectos = () => {
    const [proyectos, setProyectos] = useState([]);
    const [nuevoProyecto, setNuevoProyecto] = useState({ nombre: '', descripcion: '', fecha_inicio: '', fecha_fin: '' });

    useEffect(() => {
        cargarProyectos();
    }, []);

    const cargarProyectos = async () => {
        try {
            const proyectosObtenidos = await obtenerProyectos();
            setProyectos(proyectosObtenidos);
        } catch (error) {
            console.error('Error al cargar los proyectos', error);
        }
    };

    const manejarCambio = (e) => {
        const { name, value } = e.target;
        setNuevoProyecto({ ...nuevoProyecto, [name]: value });
    };

    const manejarSubmit = async (e) => {
        e.preventDefault();
        try {
            await crearProyecto(nuevoProyecto);
            cargarProyectos(); // Volver a cargar los proyectos
        } catch (error) {
            console.error('Error al crear el proyecto', error);
        }
    };

    const manejarEliminar = async (idProyecto) => {
        try {
            await eliminarProyecto(idProyecto);
            cargarProyectos();
        } catch (error) {
            console.error('Error al eliminar el proyecto', error);
        }
    };

    return (
        <div>
            <h2>Gestión de Proyectos</h2>

            <form onSubmit={manejarSubmit}>
                <input type="text" name="nombre" placeholder="Nombre" onChange={manejarCambio} />
                <input type="text" name="descripcion" placeholder="Descripción" onChange={manejarCambio} />
                <input type="date" name="fecha_inicio" onChange={manejarCambio} />
                <input type="date" name="fecha_fin" onChange={manejarCambio} />
                <button type="submit">Crear Proyecto</button>
            </form>

            <ul>
                {proyectos.map((proyecto) => (
                    <li key={proyecto.idProyecto}>
                        {proyecto.nombre} - {proyecto.descripcion}
                        <button onClick={() => manejarEliminar(proyecto.idProyecto)}>Eliminar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ManejoProyectos;
