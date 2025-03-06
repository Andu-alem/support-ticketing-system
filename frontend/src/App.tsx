import { Routes, Route } from 'react-router'
import './App.css'

import Dashboard from './pages/Dashboard'
import Login from './pages/LogIn'
import Signup from './pages/Signup'

function App() {
  return (
    <Routes>
      <Route path='/' element={ <Dashboard /> }/>
      <Route path='/login' element={ <Login /> }/>
      <Route path='/signup' element={ <Signup /> } />
    </Routes>
  )
}

export default App
