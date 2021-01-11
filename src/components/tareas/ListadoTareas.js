import React, { Fragment, useContext } from 'react';
import Tarea from './Tarea';

// importar el context
import ProyectoContext from '../../context/proyectos/ProyectoContext';
import TareaContext from '../../context/tareas/TareaContext'

// importar componentes  de tercero 
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const ListadoTareas = () => {

  // Importar State del useContext
  const proyectoContext = useContext(ProyectoContext);
  const { proyecto, eliminarProyecto } = proyectoContext

  const tareaContext = useContext(TareaContext);
  const { tareasProyecto } = tareaContext;

  // validar si hay proyecto seleccionado
  if (!proyecto) {
    return (<h2>Selecciona un proyecto</h2>);
  }

  const [proyectoActual] = proyecto;
  //const tareasProyecto = tareas;

  const handleClick = () => {
    eliminarProyecto(proyectoActual._id);
  }

  return (
    <Fragment>
      <h2>Proyecto: {proyectoActual.nombre}</h2>
      <ul className="listado-tareas">
        {
          tareasProyecto.length === 0
            ? (<li className="tarea"><p>No hay tareas</p></li>)
            :
            (
              <TransitionGroup>
                {tareasProyecto.map(tarea => (
                  <CSSTransition
                    key={tarea._id}
                    timeout={500}
                    unmountOnExit
                    className="tarea">
                    <Tarea tarea={tarea} />
                  </CSSTransition>
                ))}
              </TransitionGroup>
            )
        }
      </ul>

      <button type="button" className="btn btn-eliminar" onClick={handleClick}>Eliminar proyecto &times;</button>
    </Fragment>
  );
}

export default ListadoTareas;