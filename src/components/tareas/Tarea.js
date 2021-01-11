import React, { useContext } from 'react';
import ProyectoContext from '../../context/proyectos/ProyectoContext';
import TareaContext from '../../context/tareas/TareaContext';

const Tarea = ({ tarea }) => {

  // Importar el proyecto actual
  const proyectoContext = useContext(ProyectoContext);
  const { proyecto } = proyectoContext;
  const [proyectoActual] = proyecto;

  // importar las funciones del context
  const tareaContext = useContext(TareaContext);
  const { borrarTarea, getTareas, actualizarTarea, guardarTareaActual } = tareaContext

  const handleClickEliminar = id => {
    borrarTarea(id, proyectoActual._id);
    getTareas(proyectoActual._id);
  }

  const handleClicEstado = (tarea) => {
    tarea.estado = !tarea.estado;
    actualizarTarea(tarea);
    //cambiarEstadoTarea(tarea);
  }

  const handleEditar = tarea => {
    guardarTareaActual(tarea)
  }

  return (
    <li className="tarea sombra">
      <p>{tarea.nombre}</p>
      <div className="estado">
        {
          tarea.estado
            ? (<button type="button" className="completo" onClick={() => handleClicEstado(tarea)} >Completo</button>)
            : (<button type="button" className="incompleto" onClick={() => handleClicEstado(tarea)}>Incompleto</button>)
        }
      </div>

      <div className="acciones">
        <button type="button" className="btn btn-primario" onClick={() => handleEditar(tarea)}>Editar</button>
        <button type="button" className="btn btn-secundario" onClick={() => handleClickEliminar(tarea._id)}>Eliminar</button>
      </div>
    </li>
  );
}

export default Tarea;