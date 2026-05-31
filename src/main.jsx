import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles.css';

// prevent flash — set body bg immediately from saved theme
const saved = localStorage.getItem('theme') || 'dark';
document.body.style.background = saved === 'light' ? '#ffffff' : '#0d1117';
document.body.style.margin = '0';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
