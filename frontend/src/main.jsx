import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { StacksProvider } from './context/StacksContext';
import { Toaster } from 'react-hot-toast';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <StacksProvider>
      <Toaster position="bottom-right" />
      <App />
    </StacksProvider>
  </React.StrictMode>,
);

