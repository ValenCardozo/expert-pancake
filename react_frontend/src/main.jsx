import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Importaciones de PrimeReact
import "primereact/resources/themes/lara-light-indigo/theme.css"; // tema por defecto
import "primereact/resources/primereact.min.css"; // estilos core
import "primeicons/primeicons.css"; // iconos
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
