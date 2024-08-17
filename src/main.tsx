import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './app.tsx'
import './styles/index.css'
import {ThemeProvider} from "@/components/providers/theme-provider.tsx";
import {BrowserRouter} from "react-router-dom";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <ThemeProvider defaultTheme='dark'>
      <App />
    </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)
