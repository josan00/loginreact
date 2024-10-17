import React from "react";
import { Button, Modal, Form, Card } from "react-bootstrap";
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  obtenerProyectos,
  crearProyecto,
  eliminarProyecto,
} from "../../services/proyectoService";
import {
  getTareas,
  createTarea,
  updateTarea,
  deleteTarea,
} from "../../services/tareasService";

import { obtenerUsuarios } from "../../services/usuarioService"

const Projects = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [projects, setProjects] = useState([]);
  const [idProject, setId] = useState(0);
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectStartDate, setProjectStartDate] = useState(null);
  const [projectEndDate, setProjectEndDate] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null); // Proyecto seleccionado para ver detalles

  const [tareas, setTareas] = useState([]);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskStatus, setTaskStatus] = useState('No iniciado');

  const [showModal, setShowModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false); // Modal para detalles del proyecto

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    loadProjects();
    fetchTareas();
    getUsers();
  }, []);

  const getUsers = async () => {
    try{
      const data = await obtenerUsuarios();
      setUsuarios(data);
      console.log("Usuarios", usuarios)
    } catch (error) {
      console.error("Error al cargar los proyectos", error);
    }
  }

  const loadProjects = async () => {
    try {
      const data = await obtenerProyectos();
      setProjects(data);
    } catch (error) {
      console.error("Error al cargar los proyectos", error);
    }
  };

  const fetchTareas = async () => {
    try {
      const tareasData = await getTareas();
      setTareas(tareasData);
    } catch (error) {
      console.error("Error al obtener las tareas", error);
    }
  };

  const handleDeleteProject = async (idProyecto) => {
    try {
      await eliminarProyecto(idProyecto);
      loadProjects();
    } catch (error) {
      console.error("Error al eliminar el proyecto", error);
    }
  };

  const handleAddProject = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSaveProject = async (e) => {
    e.preventDefault();
    // Agrega el nuevo proyecto al array de proyectos
    const newProject = {
      idProyecto: idProject,
      nombre: projectName,
      descripcion: projectDescription,
      fecha_inicio: projectStartDate,
      fecha_fin: projectEndDate,
    };

    try {
      await crearProyecto(newProject);
      handleCloseModal();
      loadProjects(); // Volver a cargar los proyectos
      setProjectName("");
      setProjectDescription("");
      setProjectStartDate(null);
      setProjectEndDate(null);
    } catch (error) {
      console.error("Error al crear el proyecto", error);
    }
  };

  const handleShowDetails = (project) => {
    setSelectedProject(project);
    setShowDetailsModal(true);
    setStartDate(project.fecha_inicio);
    setEndDate(project.fecha_fin);
  };

  const handleCloseDetailsModal = () => {
    setShowDetailsModal(false);
  };

  const handleShowTaskModal = (project) => {
    setSelectedProject(project);
    setShowTaskModal(true);
  };

  const handleCloseTaskModal = () => {
    setShowTaskModal(false);
    setShowDetailsModal(false);
    setTaskName('');
    setTaskDescription('');
    setTaskStatus('No iniciado');
  };

  const handleSaveTask = async () => {
    const newTask = {
        nombreT: taskName,
        descripcionT: taskDescription,
        idProyecto: selectedProject.idProyecto,
        estado: taskStatus,
    };

    try {
        await createTarea(newTask); 
        handleCloseTaskModal(); 
        fetchTareas();
        loadProjects();    
    } catch (error) {
        console.error('Error al crear la tarea', error);
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between">
        <h1>Proyectos</h1>
        <Button
          variant="primary"
          onClick={handleAddProject}
          className="small-button"
        >
          Agregar Proyecto
        </Button>
      </div>

      {/* Modal para agregar un proyecto */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar Nuevo Proyecto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formProjectName">
              <Form.Label>Nombre del Proyecto</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese el nombre del proyecto"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formProjectDescription" className="mt-3">
              <Form.Label>Descripción del Proyecto</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Ingrese la descripción del proyecto"
                value={projectDescription}
                onChange={(e) => setProjectDescription(e.target.value)}
              />
            </Form.Group>

            <Form.Group
              className="mt-3 d-flex justify-content-between align-items-center"
              controlId="formProjectStartDate"
            >
              <Form.Label>Fecha de Inicio</Form.Label>
              <DatePicker
                selected={projectStartDate}
                onChange={(date) => setProjectStartDate(date)}
                className="form-control"
                value={projectStartDate}
                dateFormat="dd/MM/yyyy"
              />
            </Form.Group>

            <Form.Group
              className="mt-3 d-flex justify-content-between align-items-center"
              controlId="formProjectEndDate"
            >
              <Form.Label>Fecha de Fin</Form.Label>
              <DatePicker
                selected={projectEndDate}
                onChange={(date) => setProjectEndDate(date)}
                className="form-control"
                value={projectEndDate}
                dateFormat="dd/MM/yyyy"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSaveProject}>
            Guardar Proyecto
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Sección de tarjetas con los proyectos */}
      <div className="mt-4">
        {projects.length > 0 ? (
          projects.map((project, index) => (
            <Card key={index} className="mb-3">
              <Card.Body className="d-flex flex-column gap-3 flex-md-row gap-md-0 justify-content-between">
                <div className="d-flex flex-column">
                  <Card.Title>{project.nombre}</Card.Title>
                  <Card.Text>{project.descripcion}</Card.Text>
                </div>
                <div className="d-flex gap-2 align-items-center">
                  <Button
                    variant="info"
                    onClick={() => handleShowDetails(project)}
                  >
                    Ver Detalles
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDeleteProject(project.idProyecto)}
                  >
                    Eliminar
                  </Button>
                </div>
              </Card.Body>
            </Card>
          ))
        ) : (
          <p>No hay proyectos agregados aún.</p>
        )}
      </div>

      {/* Modal para ver detalles del proyecto */}
      <Modal show={showDetailsModal} onHide={handleCloseDetailsModal}>
        <Modal.Header closeButton>
          <Modal.Title>Detalles del Proyecto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedProject && (
            <>
              <h4>Nombre: {selectedProject.nombre}</h4>
              <p>Descripción: {selectedProject.descripcion}</p>
              <Form>
                <Form.Group className="d-flex justify-content-between align-items-center">
                  <Form.Label>Fecha de Inicio</Form.Label>
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    className="form-control"
                    dateFormat="dd/MM/yyyy"
                  />
                </Form.Group>
                <Form.Group className="mt-3 d-flex justify-content-between align-items-center">
                  <Form.Label>Fecha de Fin</Form.Label>
                  <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    className="form-control"
                    dateFormat="dd/MM/yyyy"
                  />
                </Form.Group>
              </Form>

              {/* Lista de Tareas */}
              <h5 className="mt-4">Tareas del Proyecto</h5>
                <div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Nombre</th>
                                <th scope="col">Descripcion</th>
                                <th scope="col">Estado</th>
                            </tr>  
                        </thead>
                        <tbody>
                    {tareas
                        .filter((tarea) => tarea.idProyecto === selectedProject.idProyecto) // Filtra por idProyecto
                        .map((tarea, index) => (
                            <tr>
                                <td>
                                    <p key={index}>{tarea.nombreT}</p>
                                </td>
                                <td>
                                    <p>{tarea.descripcionT}</p>
                                </td>
                                <td>
                                    <p>{tarea.estado}</p>
                                </td>
                            </tr>
                        ))
                    }
                        </tbody>
                    </table>
                    {tareas.filter(tarea => tarea.idProyecto === selectedProject.idProyecto).length === 0 && (
                        <p>No hay tareas asignadas a este proyecto.</p>
                    )}
                </div>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDetailsModal}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={() => handleShowTaskModal(selectedProject)}>
            Agregar Tarea
          </Button>
        </Modal.Footer>
      </Modal>

        {/* Modal para agregar tareas al proyecto */}
      <Modal show={showTaskModal} onHide={handleCloseTaskModal}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar Nueva Tarea</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formTaskName">
              <Form.Label>Nombre de la Tarea</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese el nombre de la tarea"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formTaskDescription" className="mt-3">
              <Form.Label>Descripción de la Tarea</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Ingrese la descripción de la tarea"
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formTaskStatus" className="mt-3">
              <Form.Label>Estado de la Tarea</Form.Label>
              <Form.Control
                as="select"
                value={taskStatus}
                onChange={(e) => setTaskStatus(e.target.value)}
              >
                <option value="No iniciado">No iniciado</option>
                <option value="En proceso">En proceso</option>
                <option value="Terminado">Terminado</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formIdUser" className="mt-3">
              <Form.Label>Asignar Usuario</Form.Label>
              <Form.Control
                as="select"
                value={selectedUser}
                onChange={(e) => setSelectedUser(e.target.value)}
              >
                <option value="">Seleccione un usuario</option> {/* Opción por defecto */}
    {usuarios.map((usuario) => (
      <option key={usuario.idUsuario} value={usuario.idUsuario}>
        {usuario.nombreUsuario} {/* Aquí usas el nombre del usuario */}
      </option>
    ))}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formProjectId" className="mt-3">
              <Form.Label>ID del Proyecto</Form.Label>
              <Form.Control
                type="text"
                value={selectedProject ? selectedProject.idProyecto : ""}
                readOnly
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseTaskModal}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSaveTask}>
            Guardar Tarea
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Projects;
