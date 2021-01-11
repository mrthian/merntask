import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import AlertaContext from '../../context/alertas/AlertaContext';
import AuthContext from '../../context/autenticacion/AuthContext';

const Login = (props) => {

  // Extraer valores del context
  const alertaContext = useContext(AlertaContext);
  const { alerta, mostrarAlerta } = alertaContext;

  const authContext = useContext(AuthContext);
  const { mensaje, autenticado, login } = authContext;

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
    email: '', password: ''
  });

  // Extrar var
  const { email, password } = usuario;
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
    if (email.trim() === '' || password.trim() === ''){
      mostrarAlerta('El email y password son obligatorios', 'alerta-error');
      return;
    }

    // pasar al action
    login(usuario);
  }

  return (
    <div className="form-usuario">
      {
        alerta
          ? (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>)
          : null
      }
      <div className="contenedor-form sombra-dark">

        <h1>Iniciar Sesión</h1>

        <form onSubmit={handledSubmit}>

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
            <input type="submit" className="btn btn-primario btn-block" value="Iniciar Sesión" />
          </div>

        </form>

        <Link to="/nueva-cuenta" className="enlace-cuenta">Registrarse</Link>

      </div>
    </div>
  );
}

export default Login;