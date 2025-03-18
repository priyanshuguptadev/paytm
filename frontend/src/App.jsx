import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Signup } from './pages/Signup'
import { Signin } from './pages/Signin'
import { Dashboard } from './pages/Dashboard'
import { ProtectedRoute } from './pages/ProtectedRoute'
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/signup' element={<Signup />}/>
        <Route path='/signin' element={<Signin />}/>
        <Route element={<ProtectedRoute />}>
          <Route path='/' element={<Dashboard />}/>
          <Route path='/dashboard' element={<Dashboard />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
