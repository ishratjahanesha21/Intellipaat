import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import Work from './pages/Work';
import Process from './pages/Process';
import About from './pages/About';
import Blog from './pages/Blog';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="shell">
          <div className="glow-lime" style={{ top: '-100px', left: '-100px' }} />
          <div className="glow-lime" style={{ bottom: '200px', right: '-100px', opacity: 0.7 }} />
          <div className="glow-emerald" style={{ top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />

          <Navbar />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/work" element={<Work />} />
            <Route path="/process" element={<Process />} />
            <Route path="/about" element={<About />} />
            <Route path="/blog" element={<Blog />} />
          </Routes>

          <Footer />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
