import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './components/app/app';
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux';
import dataReducer from './reducers/dataSlice';


//Redux store
const store = configureStore({
  reducer:{
    data:dataReducer
  }
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider  store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

