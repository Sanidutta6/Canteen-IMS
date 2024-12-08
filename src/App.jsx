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

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
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
        path: "/login",
        element: <Login />
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
    <RouterProvider router={router} />
  )
}

export default App