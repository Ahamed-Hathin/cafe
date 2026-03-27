import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar navbar-expand-lg navbar-light fixed-top glass-nav my-4">
      <div className="container">
        {/* Brand */}
        <Link to="/" className="navbar-brand d-flex align-items-center">
          <span className="fw-bold tracking-tight text-dark transition-all">Freddo Bistro</span>
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Links */}
        <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
          <ul className="navbar-nav gap-lg-4">
            <li className="nav-item">
              <Link to="/" className={`nav-link text-uppercase tracking-wider ${location.pathname === '/' ? 'text-primary fw-bold active' : 'text-secondary opacity-75'}`}>Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/menu" className={`nav-link text-uppercase tracking-wider ${location.pathname === '/menu' ? 'text-primary fw-bold active' : 'text-secondary opacity-75'}`}>Menu</Link>
            </li>
            <li className="nav-item">
              <Link to="/#gallery" className={`nav-link text-uppercase tracking-wider ${location.hash === '#gallery' ? 'text-primary fw-bold active' : 'text-secondary opacity-75'}`}>Gallery</Link>
            </li>
            <li className="nav-item">
              <Link to="/contact" className={`nav-link text-uppercase tracking-wider ${location.pathname === '/contact' ? 'text-primary fw-bold active' : 'text-secondary opacity-75'}`}>Contact</Link>
            </li>
          </ul>
        </div>

        <div className="d-none d-lg-block">
          <Link to="/menu" className="btn btn-primary rounded-pill px-4 text-uppercase fw-bold fs-7 shadow-sm">Order Now</Link>
        </div>
      </div>
    </nav>
  );
}
