import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Files from './pages/Files';
import Excellence from './pages/Excellence';
import Courses from './pages/Courses';
import Research from './pages/Research';
import Enrichment from './pages/Enrichment';
import Inquiries from './pages/Inquiries';
import AdminDashboard from './pages/AdminDashboard';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <AuthProvider>
          <ToastProvider>
            <Router>
              <div className="App">
                <Navbar />
                <main>
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
                    <Route path="/admin" element={<AdminDashboard />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </main>
                <Footer />
              </div>
            </Router>
          </ToastProvider>
        </AuthProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
