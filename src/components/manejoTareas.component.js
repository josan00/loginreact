import React, { useState, useEffect } from 'react';
import { getTareas, createTarea, updateTarea, deleteTarea } from '../services/tareasService';

const manejoTareas = () => {
    const [tareas, setTareas] = useState([]);
    const [newTarea, setNewTarea] = useState({ nombreT: '', descripcionT: '', idProyecto: '', estado: '' });
    const [editTarea, setEditTarea] = useState(null);

    useEffect(() => {
        fetchTareas();
    }, []);

    const fetchTareas = async () => {
        try {
            const tareasData = await getTareas();
            setTareas(tareasData);
        } catch (error) {
            console.error('Error al obtener las tareas', error);
        }
    };

    const handleCreate = async () => {
        try {
            await createTarea(newTarea);
            fetchTareas();
            setNewTarea({ nombreT: '', descripcionT: '', idProyecto: '', estado: '' });
        } catch (error) {
            console.error('Error al crear tarea', error);
        }
    };

    const handleUpdate = async (id) => {
        try {
            await updateTarea(id, editTarea);
            fetchTareas();
            setEditTarea(null);
        } catch (error) {
            console.error('Error al actualizar tarea', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteTarea(id);
            fetchTareas();
        } catch (error) {
            console.error('Error al eliminar tarea', error);
        }
    };

    return (
        <div>
            <h1>Gestión de Tareas</h1>

            {/* Formulario para crear nueva tarea */}
            <h2>Crear Nueva Tarea</h2>
            <input
                type="text"
                placeholder="Nombre"
                value={newTarea.nombreT}
                onChange={(e) => setNewTarea({ ...newTarea, nombreT: e.target.value })}
            />
            <input
                type="text"
                placeholder="Descripción"
                value={newTarea.descripcionT}
                onChange={(e) => setNewTarea({ ...newTarea, descripcionT: e.target.value })}
            />
            <input
                type="number"
                placeholder="ID Proyecto"
                value={newTarea.idProyecto}
                onChange={(e) => setNewTarea({ ...newTarea, idProyecto: e.target.value })}
            />
            <input
                type="text"
                placeholder="Estado"
                value={newTarea.estado}
                onChange={(e) => setNewTarea({ ...newTarea, estado: e.target.value })}
            />
            <button onClick={handleCreate}>Agregar Tarea</button>

            {/* Lista de tareas */}
            <h2>Tareas</h2>
            <ul>
                {tareas.map((tarea) => (
                    <li key={tarea.idTarea}>
                        {editTarea?.idTarea === tarea.idTarea ? (
                            <div>
                                <input
                                    type="text"
                                    value={editTarea.nombreT}
                                    onChange={(e) =>
                                        setEditTarea({ ...editTarea, nombreT: e.target.value })
                                    }
                                />
                                <input
                                    type="text"
                                    value={editTarea.descripcionT}
                                    onChange={(e) =>
                                        setEditTarea({ ...editTarea, descripcionT: e.target.value })
                                    }
                                />
                                <input
                                    type="number"
                                    value={editTarea.idProyecto}
                                    onChange={(e) =>
                                        setEditTarea({ ...editTarea, idProyecto: e.target.value })
                                    }
                                />
                                <input
                                    type="text"
                                    value={editTarea.estado}
                                    onChange={(e) =>
                                        setEditTarea({ ...editTarea, estado: e.target.value })
                                    }
                                />
                                <button onClick={() => handleUpdate(tarea.idTarea)}>Guardar</button>
                            </div>
                        ) : (
                            <div>
                                <span>{tarea.nombreT} - {tarea.descripcionT}</span>
                                <button onClick={() => setEditTarea(tarea)}>Editar</button>
                                <button onClick={() => handleDelete(tarea.idTarea)}>Eliminar</button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default manejoTareas;
