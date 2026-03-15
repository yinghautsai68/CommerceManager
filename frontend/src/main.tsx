import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { UtilsProvider } from './context/UtilsContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <UtilsProvider>
        <App />
      </UtilsProvider>
    </BrowserRouter>
  </StrictMode>,
)
