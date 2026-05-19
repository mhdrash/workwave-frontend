import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter} from 'react-router'
import axios from 'axios'
import apiClient from './services/api'

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
apiClient.defaults.baseURL = process.env.REACT_APP_API_URL;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
        <App />
    </BrowserRouter>
  </StrictMode>,
)
