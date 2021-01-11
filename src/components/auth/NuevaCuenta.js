import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom'
import AlertaContext from '../../context/alertas/AlertaContext';
import AuthContext from '../../context/autenticacion/AuthContext';

const NuevaCuenta = (props) => {
  // Extraer valores del context
  const alertaContext = useContext(AlertaContext);
  const { alerta, mostrarAlerta } = alertaContext;

  const authContext = useContext(AuthContext);
  const { mensaje, autenticado, registrarUsuario } = authContext; 

  // En caso que el usuario este autenticado o registro duplicado
  useEffect(()=>{
    // 1- validar si el usuario esta autenticado
    if (autenticado){
      props.history.push('/proyectos');
    }

    if (mensaje){
      mostrarAlerta(mensaje.msg, mensaje.categoria); 
    }
    // eslint-disable-next-line
  }, [mensaje, autenticado, props.history])

  // state para iniciar sesión 
  const [usuario, setUsuario] = useState({
    nombre: '',
    email: '',
    password: '', 
    confirmar: ''
  });

  // Extrar var
  const { nombre, email, password, confirmar } = usuario;
  const handledChange = (e) => {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value
    })
  }
  // Iniciar sesión
  const handledSubmit = e => {

    e.preventDefault();

    // validar campos
    if (nombre.trim() === '' || email.trim() === '' ||
      password.trim() === '' || confirmar.trim() === '') {
      mostrarAlerta('Todos los campos son obligatorio', 'alerta-error');
      return;
    }

    // password minimo 6 caracteres
    if (password.length < 6) {
      mostrarAlerta('El campo password debe tener minimo 6 caracteres', 'alerta-error');
      return;
    }

    // dos pass equals
    if (password !== confirmar) {
      mostrarAlerta('Los passowrds no son iguales', 'alerta-error');
      return;
    }

    // Enviar el useContext
    registrarUsuario({nombre, email, password})

    // Reiniciar Form
  }

  return (
    <div className="form-usuario">
      {alerta
        ? (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>)
        : null
      }
      <div className="contenedor-form sombra-dark">

        <h1>Usuarios Nuevos</h1>

        <form onSubmit={handledSubmit}>

          <div className="campo-form">
            <label htmlFor="nombre">Nombre</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              placeholder="Nombre de pila"
              value={nombre}
              onChange={handledChange} />
          </div>

          <div className="campo-form">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="example@example.com"
              value={email}
              onChange={handledChange} />
          </div>
          <div className="campo-form">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password..."
              value={password}
              onChange={handledChange} />
          </div>
          <div className="campo-form">
            <label htmlFor="confirmar">Confirmar Password</label>
            <input
              type="password"
              id="confirmar"
              name="confirmar"
              placeholder="Confirmar Password..."
              value={confirmar}
              onChange={handledChange} />
          </div>

          <div className="campo-form">
            <input type="submit" className="btn btn-primario btn-block" value="Registrarme" />
          </div>

        </form>

        <Link to="/" className="enlace-cuenta">Iniciar Sesión</Link>

      </div>
    </div>
  );
}

export default NuevaCuenta;