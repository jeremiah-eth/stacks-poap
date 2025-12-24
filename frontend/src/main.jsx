import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { StacksProvider } from './context/StacksContext';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <StacksProvider>
      <App />
    </StacksProvider>
  </React.StrictMode>,
);
