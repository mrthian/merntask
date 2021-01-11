import React, { useReducer } from 'react';
import AlertaContext from './AlertaContext';
import AlertaReducer from './AlertaReducer';

// Importar acciones
import { MOSTRAR_ALERTA, OCULTAR_ALERTA } from "../../types";

const AlertaState = (props) => {

  // InitialState | Inicializador
  const initialState = { alerta: null }

  // Dispatch para ejecutar las acciones.
  const [state, dispatch] = useReducer(AlertaReducer, initialState);

  // Funciones 
  const mostrarAlerta = (msg, categoria) => {
    dispatch({
      type: MOSTRAR_ALERTA,
      payload: {
        msg,
        categoria
      }
    });

    // La misma función oculta la alerta despues de 5"
    setTimeout(() => {
      dispatch({
        type: OCULTAR_ALERTA,
      });
    }, 5000);
  }

  // Retornar el context
  return (
    <AlertaContext.Provider value={{ alerta: state.alerta, mostrarAlerta }}>
      {props.children}
    </AlertaContext.Provider>
  )

}

export default AlertaState;



