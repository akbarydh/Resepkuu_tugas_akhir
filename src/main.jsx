import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // Tambahkan import BrowserRouter
import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename="/Resepkuu_tugas_akhir"> {/* Tambahkan basename */}
      <App />
    </BrowserRouter>
  </StrictMode>,
);
