import { useState } from 'react';
import toast from 'react-hot-toast';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Coffee } from 'lucide-react';

export default function LoginPage() {
  const { login, isLoggedIn } = useAuth();
  const [form, setForm]       = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);

  if (isLoggedIn) return <Navigate to="/dashboard" replace />;

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(form.username, form.password);
      toast.success('Welcome back, Admin! ☕');
    } catch {
      toast.error('Identity unverified.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100 bg-light d-flex align-items-center justify-content-center p-4" style={{ backgroundColor: '#F5F3EF' }}>
      <div className="card border-0 shadow-lg rounded-4 overflow-hidden" style={{ maxWidth: '450px', width: '100%' }}>
          <div className="p-5 text-center">
              <div className="mb-4 d-inline-flex bg-light p-3 rounded-circle text-primary" style={{ color: '#D3543F' }}>
                  <Coffee size={40} />
              </div>
              <h2 className="fw-bold text-dark mb-1">Admin Portal</h2>
              <p className="text-secondary small text-uppercase fw-bold tracking-widest opacity-50 mb-5">Freddo Bistro Coffee</p>

              <form onSubmit={handleLogin} className="text-start">
                  <div className="mb-3">
                      <label className="text-secondary small fw-bold mb-2 ms-1">USERNAME</label>
                      <input
                          type="text"
                          required
                          placeholder="admin@freddobistro.com"
                          value={form.username}
                          onChange={(e) => setForm({ ...form, username: e.target.value })}
                          className="form-control form-control-lg border-0 bg-light rounded-3"
                          style={{ fontSize: '0.9rem' }}
                      />
                  </div>

                  <div className="mb-4">
                      <label className="text-secondary small fw-bold mb-2 ms-1">PASSWORD</label>
                      <input
                          type="password"
                          required
                          placeholder="••••••••"
                          value={form.password}
                          onChange={(e) => setForm({ ...form, password: e.target.value })}
                          className="form-control form-control-lg border-0 bg-light rounded-3"
                          style={{ fontSize: '0.9rem' }}
                      />
                  </div>

                  <button
                      type="submit"
                      disabled={loading}
                      className="btn btn-primary btn-lg w-100 py-3 rounded-3 fw-bold shadow-sm border-0"
                      style={{ backgroundColor: '#D3543F' }}
                  >
                      {loading ? (
                          <span className="spinner-border spinner-border-sm me-2"></span>
                      ) : 'Unlock Dashboard'}
                  </button>
              </form>
          </div>
          <div className="bg-light p-3 text-center border-top">
             <small className="text-secondary opacity-75">Secure Access Protocol Enabled</small>
          </div>
      </div>
    </div>
  );
}
