/**
 * State tarea
 */
import React, { useReducer } from 'react';
import TareaContext from './TareaContext';
import TareaReducer from './TareaReducer';
import clienteAxios from '../../config/axios'

// Componentes externos
//import { v4 as uuid } from 'uuid';

// importar el type
import {
  TAREAS_PROYECTO,
  AGREGAR_TAREA,
  VALIDAR_TAREA,
  ELIMINAR_TAREA,
  TAREA_ACTUAL,
  ACTUALIZAR_TAREA,
  LIMPIAR_TAREAS
} from '../../types';

var resourceAPI = '/api/task/'

// CREAR EL STATE
const TareaState = props => {

  // State Inicial
  const initialState = {
    tareasProyecto: [],
    errorTarea: false,
    tareaActual: null,
    mensaje: null
  }

  // Crear el reducer dispatch | reducer
  const [state, dispatch] = useReducer(TareaReducer, initialState);

  // funciones del disparador
  const getTareas = async (proyecto, limpiar = false) => {
    /** LISTAR TODAS LAS TAREAS DE UN PROYECTO */

    // Limpiar el array 
    if (limpiar)
      limpiarTareas();

    try {
      const resp = await clienteAxios.get(resourceAPI, { params: { proyecto } });
      dispatch({
        type: TAREAS_PROYECTO,
        payload: resp.data.tareas
      })
    } catch (err) {
      console.log('getTareas: ', err)
      if (err.response) console.log('err.response: ', err.response)
    }
  }

  // Crear tareas
  const setTareas = async (tarea) => {
    const task = {
      nombre: tarea.nombre,
      proyecto: tarea.proyectoId
    }

    try {
      const resp = await clienteAxios.post(resourceAPI, task)
      dispatch({
        type: AGREGAR_TAREA,
        payload: resp.data.tarea
      })
    } catch (err) {
      console.log('setTareas: ', err)
    }
  }

  // VALIDAR Y MUESTRA ERROR
  const validarTarea = () => {
    dispatch({ type: VALIDAR_TAREA })
  }

  // Eliminar una tarea
  const borrarTarea = async (id, proyecto) => {
    try {
      await clienteAxios.delete(`${resourceAPI}${id}`, { params: { proyecto } })
      dispatch({
        type: ELIMINAR_TAREA,
        payload: id
      })
    } catch (err) {
      console.log(err);
      console.log('borrarTarea: ', (err.response, err));
    }
  }

  // cambiar estadode una tarea.
  //const cambiarEstadoTarea = async (tarea) => {  
  //  dispatch({ type: ESTADO_TAREA, payload: tarea })
  //}

  // Extrae una tarea para edición
  const guardarTareaActual = tarea => {    
    dispatch({ type: TAREA_ACTUAL, payload: tarea })
  }

  // Actualizar | Editar una tarea
  const actualizarTarea = async (tarea) => {
    // Actualizar tarea 
    try {
      const resp = await clienteAxios.put(`${resourceAPI}${tarea._id}`, tarea); 
      
      // enviar al reducer
      dispatch({ 
        type: ACTUALIZAR_TAREA, 
        payload: resp.data.tarea
      })
    } catch (err) {
      console.log(err)
    }    
  }

  // Limpiar array de tareas
  const limpiarTareas = () => {
    dispatch({ type: LIMPIAR_TAREAS })
  }


  return (
    <TareaContext.Provider
      value={{
        tareas: state.tareas,
        tareasProyecto: state.tareasProyecto,
        errorTarea: state.errorTarea,
        tareaActual: state.tareaActual,
        mensaje: state.mensaje,
        getTareas,
        setTareas,
        validarTarea,
        borrarTarea,
        //cambiarEstadoTarea,
        guardarTareaActual,
        actualizarTarea
      }}
    >
      {props.children}
    </TareaContext.Provider>
  )
}

export default TareaState;