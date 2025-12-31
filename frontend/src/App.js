import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Files from './pages/Files';
import Excellence from './pages/Excellence';
import Courses from './pages/Courses';
import Research from './pages/Research';
import Enrichment from './pages/Enrichment';
import Inquiries from './pages/Inquiries';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="App">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/files" element={<Files />} />
              <Route path="/excellence" element={<Excellence />} />
              <Route path="/excellence/courses" element={<Courses />} />
              <Route path="/excellence/research" element={<Research />} />
              <Route path="/excellence/enrichment" element={<Enrichment />} />
              <Route path="/excellence/inquiries" element={<Inquiries />} />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
