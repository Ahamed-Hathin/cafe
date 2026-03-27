import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './admin/LoginPage';
import AdminDashboard from './admin/AdminDashboard';
import { useEffect } from 'react';

// Route helper to scroll to top on every navigation
function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
        const el = document.getElementById(hash.replace('#', ''));
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
        window.scrollTo(0, 0);
    }
  }, [pathname, hash]);
  return null;
}

// Protected Route Component
function ProtectedRoute({ children }) {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? children : <Navigate to="/login" replace />;
}

// Main Layout Wrapper
function Layout({ children }) {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin') || location.pathname === '/login';

  return (
    <div className="d-flex flex-column min-vh-100 bg-light-cream">
      {!isAdminPage && <Navbar />}
      <main className="flex-grow-1">
        {children}
      </main>
      {!isAdminPage && <Footer />}
    </div>
  );
}

function AppRoutes() {
  return (
    <Layout>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/login" element={<LoginPage />} />
        
        {/* Admin Secret Route */}
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />

        {/* Catch all redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
        <Toaster 
          position="bottom-right"
          toastOptions={{
            duration: 3000,
            className: 'border border-light shadow-sm rounded-pill fw-bold text-uppercase fs-small tracking-widest',
            style: {
              background: '#FFFFFF',
              color: '#3A3A3A',
              padding: '12px 24px',
              fontSize: '11px',
              border: '1px solid rgba(0,0,0,0.05)',
            },
            success: {
              iconTheme: {
                primary: '#8BC34A',
                secondary: '#FFFFFF',
              },
            },
            error: {
              iconTheme: {
                primary: '#D3543F',
                secondary: '#FFFFFF',
              },
            },
          }}
        />
      </BrowserRouter>
    </AuthProvider>
  );
}
