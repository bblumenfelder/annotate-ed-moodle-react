import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './annotateed.css'
import '@moodlehq/design-system/css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
