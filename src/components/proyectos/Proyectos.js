import React, { useContext, useEffect } from 'react';
import Barra from '../layout/Barra';
import Sidebar from '../layout/Sidebar';
import FormTarea from '../tareas/FormTarea';
import ListadoTareas from '../tareas/ListadoTareas';

// Context | helpers
import AuthContext from '../../context/autenticacion/AuthContext';

const Proyectos = () => {

  // extraer información del context.
  const authContext = useContext(AuthContext);
  const { getUsuario } = authContext;

  useEffect(() => {
    getUsuario()
    // eslint-disable-next-line
  }, [])

  return (
    <div className="contenedor-app">
      <Sidebar />

      <div className="seccion-principal">
        <Barra />
        <main>
          <FormTarea />
          <div className="contenedor-tareas">
            <ListadoTareas />
          </div>
        </main>
      </div>


    </div>
  );
}

export default Proyectos;