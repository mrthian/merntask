import React, { Fragment, useState, useContext } from 'react';

// IMPORTAR EL CONTEXT
import ProyectoContext from '../../context/proyectos/ProyectoContext'


// Componente
const NuevoProyecto = () => {

  // obtener el state del formulario 
  const proyectoContext = useContext(ProyectoContext);

  const { formulario, errorFormulario, showFormProject, addProyecto, showError } = proyectoContext;

  // STATE PARA PROYECTO
  const [project, setProject] = useState({
    nombre: ''
  });

  // capturar lo que se digita en el Text
  const handledOnChange = e => {
    setProject({
      ...project,
      [e.target.name]: e.target.value
    })
  }

  // Extraer nombre del proyecto
  const { nombre } = project;

  // FUNCIÓN DE FORMULARIOS
  const handledOnSubmit = e => {
    e.preventDefault();

    // validar el nuevo valor
    if (nombre === '') {
      showError();
      return;
    }

    // add al state.
    addProyecto(project);

    // Reiniciar el form
    setProject({ nombre: '' });
  }

  return (
    <Fragment>
      <button
        className="btn btn-block btn-primario"
        type="button"
        onClick={() => showFormProject()}>
        Nuevo Proyecto
      </button>

      {
        formulario
          ? (
            <form className="formulario-nuevo-proyecto" onSubmit={handledOnSubmit}>
              <input
                type="text"
                className="input-text"
                placeholder="Nombre Proyecto"
                name="nombre"
                id="nombre"
                value={nombre}
                onChange={handledOnChange}
                autoFocus/>
              <input type="submit" className="btn btn-block btn-primario" value="Agregar Proyecto" />

            </form>
          )
          : null
      }
      { errorFormulario ? <p className="mensaje error">El nombre del proyecto es obligatorio</p> : null}
    </Fragment>
  );
}

export default NuevoProyecto;