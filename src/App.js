import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Cursos from './pages/Cursos';
import VideoPage from './pages/Videos';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cursos" element={<Cursos />} />
        <Route path="/videos/:curso" element={<VideoPage />} />
      </Routes>
    </Router>
  );
};

export default App;

