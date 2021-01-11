import React, { useContext } from 'react';

// Importar el context
import ProyectoContext from '../../context/proyectos/ProyectoContext'
import TareaContext from '../../context/tareas/TareaContext';

const Proyecto = ({ proyecto }) => {

  const valueContext = useContext(ProyectoContext);
  const { proyectoActual } = valueContext;

  // OBTENER TAREAS POR PROYECTOS 
  const tareaContext = useContext(TareaContext);
  const { getTareas } = tareaContext;

  // Función para add el proyecto actual
  const handleClick = id => {

    // Proyecto actual
    proyectoActual(id);

    // Filtrar taraes por Id
    getTareas(id, true); 
  }

  return (
    <li>
      <button
        type="button"
        className="btn btn-blank"
        onClick={() => handleClick(proyecto._id)} >
        {proyecto.nombre}
      </button>
    </li >

  );
}

export default Proyecto;