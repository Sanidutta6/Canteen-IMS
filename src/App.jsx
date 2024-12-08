import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import RootLayout from './layouts/layout'
import {
  Dashboard,
  InventoryItem,
  InventoryPage,
  Login,
  Orders,
  Reports,
  Settings,
  Suppliers
} from "@/pages/index"
import { AuthProvider } from './contexts/AuthContext'
import { Toaster } from './components/ui/toaster'
import { ThemeProvider } from './contexts/theme-provider'
import Protected from './components/Protected'

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/",
    element: <Protected authRequired={true}><RootLayout /></Protected>,
    children: [
      {
        path: "/",
        element: <Dashboard />
      },
      {
        path: "/inventory",
        element: <InventoryPage />
      },
      {
        path: "/inventory/:id", // Corrected typo
        element: <InventoryItem />
      },
      {
        path: "/orders",
        element: <Orders />
      },
      {
        path: "/reports",
        element: <Reports />
      },
      {
        path: "/settings",
        element: <Settings />
      },
      {
        path: "/suppliers",
        element: <Suppliers />
      },
    ]
  }
])

function App() {
  return (
    <AuthProvider>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <RouterProvider router={router} />
        <Toaster />
      </ThemeProvider>
    </AuthProvider>
  )
}

export default App