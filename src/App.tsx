import { BrowserRouter, Routes, Route } from "react-router-dom"

import Login from "./pages/Login/Login"
import Dashboard from "./pages/Dashboard/Dashboard"
import ProtectedRoute from "./routes/ProtectedRoute"
import CartaDerechos from "./pages/CartaDerechos/CartaDerechos"

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/login" element={<Login />} />
        <Route path="/carta-derechos" element={<CartaDerechos />} />
      <Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>

      </Routes>

    </BrowserRouter>
  )
}

export default App