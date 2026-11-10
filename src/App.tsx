import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import Footer from './components/Footer';
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
import Estimator from './pages/Estimator';
import AdminPasswordRecovery from './pages/AdminPasswordRecovery';

function AppLayout() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen bg-[var(--app-bg)] font-sans text-[var(--app-text)] antialiased">
      <Navbar />
      <main className="min-h-screen pb-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:service" element={<ServiceDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/estimator" element={<Estimator />} />
          <Route path="/start-project" element={<StartProject />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin/reset-password" element={<AdminPasswordRecovery />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {!isAdminRoute && <Footer />}
    </div>
  );
}

export function App() {
  return (
    <ThemeProvider>
      <Router basename={import.meta.env.BASE_URL}>
        <AppLayout />
      </Router>
    </ThemeProvider>
  );
}

export default App;
