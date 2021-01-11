import {
  REGISTRO_OK,
  REGISTRO_ERROR,
  OBTENER_USUARIO,
  LOGIN_EXITOSO,
  LOGIN_ERROR,
  CERRAR_SESION
} from '../../types'

export default (state, action) => {
  switch (action.type) {
    case LOGIN_EXITOSO:
    case REGISTRO_OK:
      // Poner dato en storage
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        autenticado: true,
        mensaje: null, 
        cargando: false
      }
    case LOGIN_ERROR:
    case REGISTRO_ERROR:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        autenticado: false,
        usuario: null,
        mensaje: action.payload
      }
    case OBTENER_USUARIO:
      return {
        ...state,
        autenticado: true, 
        usuario: action.payload,
        cargando: false
      }
    case CERRAR_SESION:
      localStorage.removeItem('token');
      return {
        ...state,
        autenticado: false,
        usuario: null,
        mensaje: null,
        token: null,
        cargando: false
      }
    default:
      return { ...state }
  }
}