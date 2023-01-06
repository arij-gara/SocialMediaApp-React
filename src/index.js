import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Authcontextprovider} from './context/authcontext'
ReactDOM.render(
  <React.StrictMode>
    <Authcontextprovider>
    <App />
    </Authcontextprovider>
  
  </React.StrictMode>,
  document.getElementById('root')
);
