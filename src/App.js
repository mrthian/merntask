import React from 'react'

// routing 
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

// componentes
import Login from './components/auth/Login'
import NuevaCuenta from './components/auth/NuevaCuenta'
import Proyectos from './components/proyectos/Proyectos'

// importar reducer
import ProyectoState from './context/proyectos/ProyectoState'
import TareaState from './context/tareas/TareaState';
import AlertaState from './context/alertas/AlertaState';
import AuthState from './context/autenticacion/AuthState'

// config || helpers
import tokenAuth from './config/tokenAuth';
import RutaPrivada from './rutas/RutasPrivada';

// Verificar si tenemos Token
const token = localStorage.getItem('token')
if (token) {
  tokenAuth(token);
}

function App() {
  console.log(process.env.REACT_APP_BACKEND_URL);
  return (
    <ProyectoState>
      <TareaState>
        <AlertaState>
          <AuthState>
            <Router>
              <Switch>
                <Route exact path="/" component={Login} />
                <Route exact path="/nueva-cuenta" component={NuevaCuenta} />
                <RutaPrivada exact path="/proyectos" component={Proyectos} />
              </Switch>
            </Router>
          </AuthState>
        </AlertaState>
      </TareaState>
    </ProyectoState>
  );

}

export default App;
