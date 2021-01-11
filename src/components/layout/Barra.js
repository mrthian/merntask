import React, { useContext, useEffect } from 'react';
import AuthContext from '../../context/autenticacion/AuthContext';

const Barra = (props) => {

  // Importar datos de usuario del reducer
  const authContext = useContext(AuthContext);
  const { usuario, getUsuario, cerrarSesion } = authContext;

  useEffect(() => {
    const consultarUsuario = () => {
      getUsuario()
    }
    consultarUsuario();
    // eslint-disable-next-line
  }, [])

  const handleSalir = () => {
    cerrarSesion();
  }

  return (
    <header className="app-header">
      <p className="nombre-usuario">Hola <span>{usuario ? usuario.nombre : ''}</span></p>

      <nav className="nav-principal">
        <button
          className="btn btn-blank cerrar-sesion"
          onClick={() => handleSalir()}>
          Cerrar Sesión
        </button>
      </nav>
    </header>

  );
}

export default Barra;