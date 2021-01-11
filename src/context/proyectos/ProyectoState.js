
import React, { useReducer } from 'react';
import ProyectoContext from './ProyectoContext';
import ProyectoReducer from './ProyectoReducer';
import clienteAxios from '../../config/axios'

// Componentes externos
//import { v4 as uuid } from 'uuid';

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

var resource = '/api/project/';

// state inicial del proyecto 
const ProyectoState = props => {

  const initialState = {
    proyectos: [],
    formulario: false,
    errorFormulario: false,
    proyecto: null, // PROYECTO SEECCIONADO
    mensaje: null
  }

  // Dispatch para ejecutar las acciones.
  const [state, dispatch] = useReducer(ProyectoReducer, initialState);

  // Funciones para el CRUD del proyecto
  const showFormProject = () => {
    dispatch({
      type: FORMULARIO_PROYECTO
    })
  }

  // obtener los proyectos | Ejemplo Dispacht
  const getProyectos = async () => {
    try {
      const resp = await clienteAxios.get(resource);
      dispatch({
        type: GET_PROYECTOS,
        payload: resp.data
      })
    } catch (err) {
      const alerta = {
        msg: err.response ? err.response.data.msg : err,
        categoria: 'alerta-error'
      }
      dispatch({
        type: PROYECTO_ERROR,
        payload: alerta
      })
    }
  }

  // Agregar nuevo proyecto
  const addProyecto = async project => {
    try {

      const resp = await clienteAxios.post('/api/project', project)      
      // INSERT project en el state
      dispatch({
        type: ADD_PROYECTO,
        payload: resp.data.proyecto
      });

    } catch (err) {
      const alerta = {
        msg: err.response ? err.response.data.msg : err,
        categoria: 'alerta-error'
      }
      dispatch({
        type: PROYECTO_ERROR,
        payload: alerta
      })
    }
  }

  const showError = () => {
    dispatch({
      type: VALIDAR_FORMULARIO
    })
  }

  // selecciona el proyecto que el usuario dio CLIC
  const proyectoActual = id => {
    dispatch({
      type: PROYECTO_ACTUAL,
      payload: id
    })
  }

  const eliminarProyecto = async proyectoId => {
    try {
      await clienteAxios.delete(`${resource}${proyectoId}`);
      dispatch({
        type: ELIMINAR_PROYECTO,
        payload: proyectoId
      })
    } catch (err) {
      const alerta = {
        msg: 'Hubo un error', // err.response ? err.response.data.msg : err,
        categoria: 'alerta-error'
      }
      dispatch({
        type: PROYECTO_ERROR,
        payload: alerta
      })
    }    
  }

  // retornar el context 
  return (
    <ProyectoContext.Provider
      value={{
        proyectos: state.proyectos,
        formulario: state.formulario,
        errorFormulario: state.errorFormulario,
        proyecto: state.proyecto,
        mensaje: state.mensaje,
        showFormProject,
        getProyectos,
        addProyecto,
        showError,
        proyectoActual,
        eliminarProyecto
      }}>
      {props.children}
    </ProyectoContext.Provider>
  )
}

export default ProyectoState;