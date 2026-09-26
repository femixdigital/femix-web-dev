import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastProvider } from './components/Toast';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import AdminDashboard from './pages/AdminDashboard';

export const App: React.FC = () => {
  return (
    <ToastProvider>
      <Router>
        <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between">
          <div>
            <Navbar />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/admin" element={<AdminDashboard />} />
              </Routes>
            </main>
          </div>

          <footer className="border-t border-slate-900 py-6 text-center text-xs text-slate-500">
            &copy; {new Date().getFullYear()} Femix Digital. All rights reserved.
          </footer>
        </div>
      </Router>
    </ToastProvider>
  );
};

export default App;
