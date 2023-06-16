import './App.css'
import Login from './pages/Login';
import Home from './pages/Home';

import Navbar from './components/Navbar';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useUserAuth } from './context/UserAuthContext';
function App() {
  const {user} = useUserAuth();
  return (
    <>
      <div className = "app">
        <div className = "">
        <Navbar />
        <Routes>

            <Route 
              path="/"
              element={user ? <Home /> : <Navigate to = "/login" />}
            />
            <Route 
              path="/login"
              element={!user ? <Login /> : <Navigate to = "/" />}
            />
          </Routes>
        </div>
        
      </div>
    </>
  )
}

export default App
