import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import UserProvider, { UserContext } from './Contexts/UserContext.jsx'
import Router from './route/router.jsx'

createRoot(document.getElementById('root')).render(
<div>
<UserProvider>
      
      <Router />
        </UserProvider>
</div>
  
)
