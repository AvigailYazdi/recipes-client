import { createRoot } from 'react-dom/client'
import { TanstackProvider } from './QueryClientProvider.jsx'
import { Router } from './Router.jsx'
import { AuthProvider } from './context/AuthProvider.jsx'

createRoot(document.getElementById('root')).render(
  <TanstackProvider>
    <AuthProvider>
      <Router />
    </AuthProvider>
  </TanstackProvider>,
)
