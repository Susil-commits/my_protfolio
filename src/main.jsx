import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { LightboxProvider } from './context/LightboxProvider.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <LightboxProvider>
        <App />
      </LightboxProvider>
    </ThemeProvider>
  </StrictMode>,
)
