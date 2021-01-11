import React, { useState, useContext, useEffect } from 'react';

// Import Hook Context
import ProyectoContext from '../../context/proyectos/ProyectoContext';
import TareaContext from '../../context/tareas/TareaContext';

const FormTarea = () => {

  const proyectoContext = useContext(ProyectoContext)
  const { proyecto } = proyectoContext

  const tareaContext = useContext(TareaContext);
  const { tareaActual, setTareas, errorTarea, validarTarea, getTareas, actualizarTarea } = tareaContext;

  // state del formulario
  const [task, setTask] = useState({ nombre: '' });
  const { nombre } = task;

  // effect que detecta si hay tarea seleccionada
  useEffect(() => {
    if (tareaActual !== null) {
      setTask(tareaActual)
    } else {
      setTask({ nombre: '' })
    }
    if (!tareaActual) return;
  }, [tareaActual])

  if (!proyecto) {
    return null;
  }

  const [proyectoActual] = proyecto;

  const handledOnChange = e => {
    setTask({
      ...task,
      [e.target.name]: e.target.value
    });
  }

  const handledOnSubmit = e => {
    e.preventDefault();

    // validar formulario
    if (nombre.trim() === '') {
      validarTarea();
      return;
    }

    // Verificar si es edición de la tarea 
    if (tareaActual === null) {
      // setData
      task.estado = false;
      task.proyectoId = proyectoActual._id;

      // adicionar tarea al context 
      setTareas(task);
    } else {
      // actualizar tarea existente
      actualizarTarea(task)
    }

    // ACTUALIZAR TODAS LAS TAREAS
    getTareas(proyectoActual._id);

    // reiniciar form
    setTask({ nombre: '' });
  }

  return (
    <div className="formulario">
      <form className="" onSubmit={handledOnSubmit}>

        <div className="contenedor-input">
          <input
            className="input-text"
            type="text"
            placeholder="Nombre tarea..."
            name="nombre"
            value={nombre}
            onChange={handledOnChange} />
        </div>
        <div className="contenedor-input">
          <input
            className="btn btn-primario btn-submit btn-block"
            type="submit"
            value={tareaActual ? 'Editar Tarea' : 'Agregar Tarea'} />
        </div>

      </form>
      {errorTarea ? <p className="mensaje error">El nombre de la tarea es obligatorio</p> : null}
    </div>

  );
}

export default FormTarea;