import React, { useReducer } from 'react';
import AuthReducer from './AuthReducer'
import AuthContext from './AuthContext'

// importar tipos
import {
  REGISTRO_OK,
  REGISTRO_ERROR,
  OBTENER_USUARIO,
  LOGIN_EXITOSO,
  LOGIN_ERROR,
  CERRAR_SESION
} from '../../types'

import clienteAxios from '../../config/axios';
import tokenAuth from '../../config/tokenAuth';

const AuthState = (props) => {

  // Iniciacilzar el reducer
  const initialState = {
    token: localStorage.getItem('token'), // tomar token de localStorage
    autenticado: null,
    usuario: null,
    mensaje: null,
    cargando: true
  }

  // State
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  // Funciones
  const registrarUsuario = async (datos) => {
    try {
      const respuesta = await clienteAxios.post('/api/users', datos);
      //console.log(respuesta);
      dispatch({
        type: REGISTRO_OK,
        payload: respuesta.data
      })

      // GetDatos Usuario
      if (respuesta.data.ok) {
        getUsuario();
      }
    } catch (err) {
      // para acceder a los mensajes de error de axios se hace con 'axios'.response
      //console.log(err.response)
      const alerta = {
        msg: err.response.data.msg,
        categoria: 'alerta-error'
      }
      dispatch({
        type: REGISTRO_ERROR,
        payload: alerta
      })
    }
  }

  // Retornar el usuario autenticado
  const getUsuario = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      //TODO: Función para enviar el token por headers
      tokenAuth(token);
    }

    try {
      // Autenticar con el BACKEND
      const resp = await clienteAxios.get('/api/auth');
      //console.log(resp);
      dispatch({
        type: OBTENER_USUARIO,
        payload: resp.data.usuario
      })
    } catch (err) {
      console.log(err.response)
      dispatch({
        type: LOGIN_ERROR
      })
    }
  }

  // Iniciar Sessión
  const login = async (datos) => {
    try {
      const resp = await clienteAxios.post('/api/auth', datos)
      dispatch({
        type: LOGIN_EXITOSO,
        payload: resp.data
      })

      // GetDatos Usuario
      if (resp.data.ok) {
        getUsuario();
      }
    } catch (err) {
      // preparar mensaje de error 
      console.log(err.response)

      if (err.response) {
        const alerta = {
          msg: err.response.data.msg,
          categoria: 'alerta-error'
        }
        dispatch({
          type: LOGIN_ERROR,
          payload: alerta
        })
      }
    }
  }

  const cerrarSesion = () => {
    dispatch({
      type: CERRAR_SESION
    })
  }

  // Retornar el provider
  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        autenticado: state.autenticado,
        usuario: state.usuario,
        mensaje: state.mensaje,
        cargado: state.cargando,
        registrarUsuario, login, getUsuario, cerrarSesion
      }}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthState;