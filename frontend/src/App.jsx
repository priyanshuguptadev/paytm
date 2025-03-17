import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Signup } from './pages/Signup'
import { Signin } from './pages/Signin'
import { Dashboard } from './pages/Dashboard'
import { Send } from './pages/Send'
import { Balance } from './pages/Balance'
import { ProtectedRoute } from './pages/ProtectedRoute'
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/signup' element={<Signup />}/>
        <Route path='/signin' element={<Signin />}/>
        <Route element={<ProtectedRoute />}>
          <Route path='/dashboard' element={<Dashboard />}/>
          <Route path='/send/:id' element={<Send />}/>
        <Route path='/balance' element={<Balance />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
