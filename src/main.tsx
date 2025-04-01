import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './global.css'
import './index.css'
import App from './App.tsx'
import { Provider } from './components/ui/provider.tsx'
import { Box } from '@chakra-ui/react'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider>
      <Box overflowX={"hidden"}>
        <App />
      </Box>
    </Provider>
  </StrictMode>,
)
