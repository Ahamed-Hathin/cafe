import { Link } from 'react-router-dom';
import { 
  MapPin, Phone, Mail, Instagram, Facebook, Twitter, 
  ChevronRight, Coffee 
} from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-premium pt-5 pb-3">
      <div className="container pt-5">
        <div className="row g-4 mb-5">
          {/* 1. BRAND SECTION */}
          <div className="col-lg-3 col-md-6">
            <div className="mb-4">
              <div className="d-flex align-items-center gap-2 mb-3">
                <Coffee className="text-accent" size={28} />
                <span className="h4 fw-bold text-white mb-0 tracking-tighter">Freddo Bistro</span>
              </div>
              <p className="text-white-50 small mb-4 font-playfair italic">
                Crafted coffee experience, roasting memories one cup at a time.
              </p>
              <div className="badge bg-accent bg-opacity-10 text-accent border border-accent border-opacity-25 px-3 py-2 rounded-pill small tracking-widest">
                EST. 1999
              </div>
            </div>
          </div>

          {/* 2. QUICK LINKS */}
          <div className="col-lg-3 col-md-6">
            <h6 className="text-white text-uppercase fw-bold tracking-widest mb-4 small border-start border-accent border-3 ps-3">
              Explore
            </h6>
            <nav className="nav flex-column gap-2">
              {[
                ['/', 'Home'],
                ['/menu', 'Menu Selections'],
                ['/contact', 'Contact Us'],
                ['/login', 'Admin Access']
              ].map(([path, label]) => (
                <Link 
                  key={path} 
                  to={path} 
                  className="footer-link d-flex align-items-center gap-2 text-white-50 text-decoration-none transition-all"
                >
                  <ChevronRight size={14} className="link-arrow" />
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* 3. CONTACT INFO */}
          <div className="col-lg-3 col-md-6">
            <h6 className="text-white text-uppercase fw-bold tracking-widest mb-4 small border-start border-accent border-3 ps-3">
              Get in Touch
            </h6>
            <div className="d-flex flex-column gap-3 text-white-50 small">
              <div className="d-flex gap-3 align-items-start">
                <MapPin size={18} className="text-accent flex-shrink-0" />
                <span>77 5-36 , west street, Trichy to dindigul road, polangulathupatti, Ammapettai, Trichy, Tamil Nadu 620009</span>
              </div>
              <div className="d-flex gap-3 align-items-center">
                <Phone size={18} className="text-accent flex-shrink-0" />
                <span>+91 98765 43210</span>
              </div>
              <div className="d-flex gap-3 align-items-center">
                <Mail size={18} className="text-accent flex-shrink-0" />
                <span>hello@freddobistro.com</span>
              </div>
            </div>
          </div>

          {/* 4. SOCIAL MEDIA */}
          <div className="col-lg-3 col-md-6">
            <h6 className="text-white text-uppercase fw-bold tracking-widest mb-4 small border-start border-accent border-3 ps-3">
              Follow Us
            </h6>
            <p className="text-white-50 small mb-4">
              Stay updated with our latest blends and events.
            </p>
            <div className="d-flex gap-3">
              {[
                { icon: Instagram, label: 'Instagram' },
                { icon: Facebook, label: 'Facebook' },
                { icon: Twitter, label: 'Twitter' }
              ].map((social) => (
                <a 
                  key={social.label} 
                  href="#" 
                  className="social-icon-btn d-flex align-items-center justify-content-center border border-white border-opacity-10 rounded-circle transition-all"
                  aria-label={social.label}
                >
                  <social.icon size={18} className="text-white-50" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* COPYRIGHT SECTION */}
        <div className="border-top border-white border-opacity-10 pt-4 mt-5">
          <div className="row align-items-center">
            <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
              <p className="text-white-50 small mb-0 opacity-75">
                © {currentYear} Freddo Bistro Coffee. All rights reserved.
              </p>
            </div>
            <div className="col-md-6 text-center text-md-end">
              <div className="d-flex gap-4 justify-content-center justify-content-md-end small">
                <span className="text-white-50 opacity-50 cursor-pointer hover-accent transition-all">Privacy Policy</span>
                <span className="text-white-50 opacity-50 cursor-pointer hover-accent transition-all">Terms of Service</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .footer-premium {
          background: linear-gradient(to bottom, #2C1810, #1a0f0a);
          color: #fff;
          position: relative;
          overflow: hidden;
        }

        .footer-premium::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg, transparent, var(--accent-color), transparent);
          opacity: 0.3;
        }

        .text-accent { color: var(--accent-color) !important; }
        .bg-accent { background-color: var(--accent-color) !important; }
        
        .footer-link {
          font-size: 0.9rem;
          padding: 2px 0;
        }

        .footer-link:hover {
          color: var(--accent-color) !important;
          padding-left: 8px;
        }

        .link-arrow {
          opacity: 0;
          transform: translateX(-10px);
          transition: all 0.3s ease;
        }

        .footer-link:hover .link-arrow {
          opacity: 1;
          transform: translateX(0);
        }

        .social-icon-btn {
          width: 40px;
          height: 40px;
          background: rgba(255, 255, 255, 0.03);
        }

        .social-icon-btn:hover {
          background: var(--accent-color);
          transform: translateY(-3px) scale(1.1);
          border-color: var(--accent-color) !important;
        }

        .social-icon-btn:hover svg {
          color: #2C1810 !important;
        }

        .hover-accent:hover { color: var(--accent-color) !important; }
        
        .font-playfair { font-family: 'Playfair Display', serif; }
        .cursor-pointer { cursor: pointer; }
      `}} />
    </footer>
  );
}
