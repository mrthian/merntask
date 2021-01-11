/**
 * Reducer
 */
import {
  TAREAS_PROYECTO,
  AGREGAR_TAREA,
  VALIDAR_TAREA,
  ELIMINAR_TAREA,
  TAREA_ACTUAL,
  ACTUALIZAR_TAREA,
  LIMPIAR_TAREAS
} from '../../types';

export default (state, action) => {
  switch (action.type) {
    case LIMPIAR_TAREAS: 
    return {
      ...state,
      tareasProyecto: []
    }
    case TAREAS_PROYECTO:
      return {
        ...state,
        tareasProyecto: action.payload,
        tareaActual: null
      }
    case AGREGAR_TAREA:
      return {
        ...state,
        tareasProyecto: [...state.tareasProyecto, action.payload],
        errorTarea: false,
        tareaActual: null
      }
    case VALIDAR_TAREA:
      return {
        ...state,
        errorTarea: true
      }
    case ELIMINAR_TAREA:
      return {
        ...state,
        tareasProyecto: state.tareasProyecto.filter(tarea => tarea._id !== action.payload),
        tareaActual: null
      }
    case ACTUALIZAR_TAREA:
      return {
        ...state,
        tareasProyecto: state.tareasProyecto.map(tarea => tarea._id === action.payload._id ? action.payload : tarea),
        //tareasProyecto: state.tareasProyecto.map(tarea => tarea.id === action.payload.id ? action.payload : tarea),
        tareaActual: null
      }
    case TAREA_ACTUAL:
      return {
        ...state,
        tareaActual: action.payload
      }
    default:
      break;
  }
}