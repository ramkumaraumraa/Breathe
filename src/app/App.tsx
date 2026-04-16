import { RouterProvider } from 'react-router'
import { router } from './routes'
import { ProductThemeProvider } from './context/ProductThemeContext'

export default function App() {
  return (
    <ProductThemeProvider>
      <RouterProvider router={router} />
    </ProductThemeProvider>
  )
}
