import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import UploadPage from './pages/UploadPage.jsx'
import NotificationsPage from './pages/NotificationsPage.jsx'

const router = createBrowserRouter([
  {
    path: "/demo",
    element: <App />,
    children: [
      { index: true, element: <UploadPage /> },
      { path: "notifications", element: <NotificationsPage /> },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)