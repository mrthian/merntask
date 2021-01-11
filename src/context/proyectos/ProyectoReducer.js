// Importar types
import {
  FORMULARIO_PROYECTO,
  GET_PROYECTOS,
  ADD_PROYECTO,
  VALIDAR_FORMULARIO,
  PROYECTO_ACTUAL,
  ELIMINAR_PROYECTO,
  PROYECTO_ERROR
} from '../../types'


export default (state, action) => {

  switch (action.type) {
    case FORMULARIO_PROYECTO:
      return {
        ...state,
        formulario: true
      }
    case GET_PROYECTOS:
      return {
        ...state,
        proyectos: action.payload
      }
    case ADD_PROYECTO:
      return {
        ...state,
        proyectos: [...state.proyectos, action.payload], // agregar projecto nuevo al project
        formulario: false,
        errorFormulario: false
      }
    case VALIDAR_FORMULARIO:
      return {
        ...state,
        errorFormulario: true
      }
    case PROYECTO_ACTUAL:
      return {
        ...state,
        proyecto: state.proyectos.filter(proyecto => proyecto._id === action.payload)
      }
    case ELIMINAR_PROYECTO:
      return {
        ...state,
        proyectos: state.proyectos.filter(proyecto => proyecto._id !== action.payload),
        proyecto: null
      }
    case PROYECTO_ERROR:
      return {
        ...state,
        mensaje: action.payload
      }
    default: return state;
  }
}