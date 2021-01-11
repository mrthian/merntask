import React, { useContext, useEffect } from 'react';
import Proyecto from './Proyecto';

// Importar el context 
import ProyectoContext from '../../context/proyectos/ProyectoContext'
import AlertaContext from '../../context/alertas/AlertaContext'

// importar componentes  de tercero 
import { CSSTransition, TransitionGroup } from 'react-transition-group'


const ListadoProyectos = () => {

  // importar el context de PROYECTO 
  const context = useContext(ProyectoContext)
  const { mensaje, proyectos, getProyectos } = context;

  const alertaContext = useContext(AlertaContext)
  const { alerta, mostrarAlerta } = alertaContext;

  useEffect(() => {
    if (mensaje) {
      mostrarAlerta(mensaje.msg, mensaje.categoria);
    }
    getProyectos()
    // eslint-disable-next-line
  }, [mensaje]);

  if (proyectos.length === 0) return null;
  return (
    <ul className="listado-proyectos">
      {alerta
        ? (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>)
        : null
      }
      <TransitionGroup>
        {proyectos.map(proyecto => (
          <CSSTransition key={proyecto._id} timeout={500} className="proyecto">
            <Proyecto proyecto={proyecto} />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </ul>
  );
}

export default ListadoProyectos;