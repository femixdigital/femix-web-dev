import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { ThemeProvider } from './components/ThemeProvider';
import { Home } from './pages/Home';
import Contact from './pages/Contact';
import { AdminDashboard } from './pages/AdminDashboard';
import { Portfolio } from './pages/Portfolio';
import About from './pages/About';
import Services from './pages/Services';
import { NotFound } from './pages/NotFound';
import StartProject from './pages/StartProject';
import ServiceDetail from './pages/ServiceDetail';
import Payment from './pages/Payment';


export function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-[var(--app-bg)] font-sans text-[var(--app-text)] antialiased">
          <Navbar />

          <main className="min-h-screen pt-16">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/services" element={<Services />} />
              <Route path="/services/:service" element={<ServiceDetail />} />
              <Route path="/about" element={<About />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/start-project" element={<StartProject />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
