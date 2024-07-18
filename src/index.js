import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import store from './utils/store';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

const root = ReactDOM.createRoot(document.getElementById('root'));
let persist = persistStore(store)
root.render(
  <BrowserRouter>
  <Provider store={store}>
    <PersistGate persistor={persist}>
    <App />
    </PersistGate>
    </Provider>
  </BrowserRouter>
);
