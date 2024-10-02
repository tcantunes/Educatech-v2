import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Cursos from './pages/Cursos';
import VideoPage from './pages/Videos';
import UserProfile from './pages/PaginaUsuario';
import Contact from './pages/Contato';
import VerifyLogin from './pages/VerifyLogin'; 
import ProtectedRoute from './components/ProtectedRoute';
import PartnersPage from './pages/Parceiros';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-login" element={<VerifyLogin />} />
        <Route
          path="/cursos"
          element={
            <ProtectedRoute>
              <Cursos />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/videos/:curso"
          element={
            <ProtectedRoute>
              <VideoPage />
            </ProtectedRoute>
          }
        />
        <Route path="/contact" element={<Contact />} />
        <Route path="/parceiros" element={<PartnersPage />} />
      </Routes>
    </Router>
  );
};

export default App;

