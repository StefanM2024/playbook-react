import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Navbar from './components/Navbar.tsx'
import './index.css'

import AppRouter from './routes.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Navbar />
    <AppRouter />
  </StrictMode>,
)
