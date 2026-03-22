import { createRoot } from 'react-dom/client'
import { TanstackProvider } from './QueryClientProvider.jsx'
import { Router } from './Router.jsx'
import { AuthProvider } from './context/AuthProvider.jsx'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { CacheProvider } from '@emotion/react'
import createCache from '@emotion/cache'
import rtlPlugin from 'stylis-plugin-rtl'

const theme = createTheme({
  direction: 'rtl',
  typography: {
    fontFamily: '"Open Sans",Arial, sans-serif',
  },
  palette:{
    primary:{
      main: "#996666",
      dark: "#7E5454"
    }
  }
})

const rtlCache = createCache({
  key: 'muirtl',
  stylisPlugins: [rtlPlugin],
})

createRoot(document.getElementById('root')).render(
  <CacheProvider value={rtlCache}>
    <ThemeProvider theme={theme}>
      <TanstackProvider>
        <AuthProvider>
          <Router />
        </AuthProvider>
      </TanstackProvider>
    </ThemeProvider>
  </CacheProvider>,
)