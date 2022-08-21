import React from 'react'
import ReactDOM from 'react-dom/client'
import { SnackbarProvider } from 'notistack';
import { App } from './App'
import "./global.css"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SnackbarProvider maxSnack={3} autoHideDuration={2500}>
      <App />
    </SnackbarProvider>
  </React.StrictMode>
)
