import { useState } from 'react';
import toast from 'react-hot-toast';
import { Navigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ArrowLeft } from 'lucide-react';

export default function LoginPage() {
  const { login, isLoggedIn } = useAuth();
  const [form, setForm]       = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);

  if (isLoggedIn) return <Navigate to="/admin" replace />;

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
    <div className="min-vh-100 bg-light-cream d-flex align-items-center justify-content-center pt-5">
      <div className="container py-5">
        <div className="row justify-content-center">
            <div className="col-lg-5 col-md-8 col-11">
                <div className="bg-white rounded-4 shadow-xl p-5 border border-light text-center">
                    <div className="mb-5 py-4">
                        <Link to="/" className="btn btn-link text-decoration-none text-secondary text-uppercase fw-bold tracing-widest fs-small mb-4 d-flex align-items-center justify-content-center gap-2">
                            <ArrowLeft size={16} /> Home
                        </Link>
                        <h2 className="fw-bold text-dark mt-3">Admin Portal</h2>
                        <p className="text-secondary text-uppercase fw-bold tracing-widest fs-small mt-2 opacity-50">Authorized Personnel Only</p>
                    </div>

                    <form onSubmit={handleLogin} className="text-start">
                        <div className="mb-4">
                            <label className="text-secondary text-uppercase fw-bold tracking-widest fs-small mb-2 ms-2">Username</label>
                            <input
                                type="text"
                                required
                                placeholder="admin_freddo"
                                value={form.username}
                                onChange={(e) => setForm({ ...form, username: e.target.value })}
                                className="form-control form-control-lg rounded-pill px-4 fs-6 shadow-none border-light-subtle bg-light bg-opacity-10"
                            />
                        </div>

                        <div className="mb-5">
                            <label className="text-secondary text-uppercase fw-bold tracking-widest fs-small mb-2 ms-2">Password</label>
                            <input
                                type="password"
                                required
                                placeholder="••••••••"
                                value={form.password}
                                onChange={(e) => setForm({ ...form, password: e.target.value })}
                                className="form-control form-control-lg rounded-pill px-4 fs-6 shadow-none border-light-subtle bg-light bg-opacity-10"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="btn btn-dark btn-lg rounded-pill w-100 py-3 text-uppercase fw-bold shadow-sm mb-4"
                        >
                            {loading ? (
                                <span className="spinner-border spinner-border-sm me-2"></span>
                            ) : 'Unlock Dashboard'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
