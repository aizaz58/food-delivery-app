import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { StateProvider } from './context/StateProvider';
import reducer from './context/reducer';
import { InitialState } from './context/initialState';
import { ScrollProvider } from './context/valueProvider';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <BrowserRouter>
<StateProvider initialState={InitialState} reducer={reducer}>
<ScrollProvider>
    <App />
    </ScrollProvider>
</StateProvider>
  </BrowserRouter>
  </React.StrictMode>
);

