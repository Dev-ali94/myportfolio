import { useState } from 'react'
import {Routes, Route } from 'react-router-dom';
import Login from './AdminPages/Login';
import Dashboard from './AdminPages/Dashboard';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Routes>
       <Route path="/login" element={<Login />} />
        <Route path="/" element={<Dashboard />} />

      </Routes>
    </div>
  )
}

export default App
