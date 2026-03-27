import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import MenuCard from '../components/MenuCard';

/* ── 1. Hero Section (Clean & Centered) ────────────── */
function Hero() {
  return (
    <section className="hero-wrapper pt-5">
      <div className="hero-bg-shape-1"></div>
      <div className="hero-bg-shape-2"></div>
      <div className="texture-overlay"></div>

      <div className="container min-vh-75 d-flex align-items-center position-relative my-4 py-5" style={{ zIndex: 5 }} >
        <div className="row align-items-center justify-content-between w-100 g-5">
          {/* Left: Content */}
          <div className="col-lg-6 col-md-12 text-center text-lg-start fade-in-up">
            <p className="text-secondary text-uppercase fw-bold tracing-wide mb-3 d-inline-flex align-items-center gap-2">
              <span className="bg-accent rounded-circle" style={{ width: '8px', height: '8px' }}></span>
              Since 1999
            </p>
            <h1 className="h1 display-3 fw-bold mb-4 text-gradient py-2">Freddo Bistro Coffee</h1>
            <p className="fs-4 text-secondary mb-5 leading-relaxed">
              The Best Kaapi in Town, crafted for true coffee lovers. Experience authentic South Indian brews in a modern, professional setting.
            </p>
            <div className="d-flex flex-column flex-sm-row justify-content-center justify-content-lg-start gap-4">
              <Link to="/menu" className="btn btn-primary d-flex align-items-center justify-content-center px-5 py-3 rounded-pill fw-bold shadow-sm">
                Explore Menu
              </Link>
              <Link to="/menu" className="btn btn-outline-dark d-flex align-items-center justify-content-center px-5 py-3 rounded-pill fw-bold shadow-sm bg-white">
                View Specials
              </Link>
            </div>
          </div>
          {/* Right: Image */}
          <div className="col-lg-5 col-md-11 mx-auto fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="hero-image-wrapper">
              <div className="hero-image-card">
                <img src="/hero_bg.png" alt="Café Ambiance" className="img-fluid w-100" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── 2. About Section (2-Column & Simple) ────────────── */
function About() {
  return (
    <section className="py-5 bg-light-cream border-top border-bottom">
      <div className="container py-5">
        <div className="row align-items-center g-5">
          <div className="col-md-6 order-2 order-md-1 fade-in-up">
            <img
              src="/experience_section.png"
              alt="Our Story"
              className="img-fluid rounded-4 shadow-sm"
            />
          </div>
          <div className="col-md-6 order-1 order-md-2 fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="ps-md-5">
              <span className="badge bg-highlight text-white px-3 py-2 rounded-pill text-uppercase mb-3 shadow-sm">Our Legacy</span>
              <h2 className="display-5 fw-bold text-dark mb-4">Tradition & Love</h2>
              <p className="text-secondary fs-5 leading-relaxed mb-4">
                At Freddo Bistro, we believe in the art of slow-brewing. Every cup tells a story of tradition, heritage, and the perfect blend of beans.
              </p>
              <p className="text-secondary fs-6 leading-relaxed mb-4 opacity-75">
                From our signature filter kaapi to our modern specialty brews, we serve more than just caffeine — we serve a memory. Stop by and experience the Freddo difference today.
              </p>
              <Link to="/contact" className="text-primary fw-bold text-decoration-none border-bottom border-primary border-2 pb-1 hover-opacity">
                Read our story →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── 3. Featured Menu (Grid Layout) ──────────────────── */
function FeaturedMenu({ items, loading }) {
  return (
    <section className="py-5 bg-white">
      <div className="container py-5 text-center">
        <div className="mb-5 fade-in-up">
          <span className="text-primary text-uppercase fw-bold tracking-widest mb-2 d-block">Recommendations</span>
          <h2 className="display-5 fw-bold text-dark mb-3">Signature Flavours</h2>
          <div className="bg-primary mx-auto mb-5" style={{ width: '60px', height: '4px', borderRadius: '2px' }}></div>
        </div>

        <div className="row g-4 justify-content-center">
          {loading
            ? Array(3).fill(0).map((_, i) => (
              <div key={i} className="col-lg-4 col-md-6">
                <div className="card h-100 placeholder-glow shadow-sm border-0">
                  <div className="placeholder col-12 h-240px" style={{ height: '240px' }}></div>
                  <div className="card-body p-4">
                    <h5 className="placeholder col-8 mb-3"></h5>
                    <p className="placeholder col-4 mb-4"></p>
                    <button className="placeholder col-12 btn btn-primary disabled"></button>
                  </div>
                </div>
              </div>
            ))
            : items.map((item) => (
              <div key={item._id} className="col-lg-4 col-md-6">
                <MenuCard item={item} />
              </div>
            ))
          }
        </div>

        <div className="mt-5 text-center">
          <Link to="/menu" className="btn btn-outline-dark px-4 py-2 rounded-pill fw-bold text-uppercase border-2">
            View Full Menu
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ── 4. Gallery Section (Clean Grid) ────────────────── */
function Gallery() {
  const images = ['/hero_bg.png', '/coffee_pour.png', '/menu_flatlay.png', '/filter_coffee.png', '/masala_dosa.png', '/idly_sambar.png'];
  return (
    <section id="gallery" className="py-5 bg-light-cream border-top">
      <div className="container py-5 text-center">
        <div className="mb-5 fade-in-up">
          <span className="text-primary text-uppercase fw-bold tracking-widest mb-2 d-block">Memories</span>
          <h2 className="display-5 fw-bold text-dark mb-3">Our Gallery</h2>
          <div className="bg-primary mx-auto mb-5" style={{ width: '60px', height: '4px', borderRadius: '2px' }}></div>
        </div>
        <div className="row g-4 justify-content-center">
          {images.map((src, i) => (
            <div key={src} className="col-lg-4 col-md-6 col-sm-12">
              <div className="ratio ratio-4x3 overflow-hidden rounded-4 shadow-sm group">
                <img
                  src={src}
                  alt="Cafe Experience"
                  className="img-fluid object-fit-cover transition-transform"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── 5. Testimonials (Simple Cards) ─────────────────── */
function Testimonials() {
  const reviews = [
    { name: "Anita Rao", star: 5, text: "The most authentic filter coffee experience in Chennai. It's truly consistent every time." },
    { name: "Siddharth", star: 5, text: "Minimal decor, impeccable coffee. Exactly how a modern bistro should feel." },
    { name: "Maya S.", star: 5, text: "Crispy dosas, heavenly sambar, and the smell of fresh beans everywhere. Love it!" }
  ];
  return (
    <section className="py-5 bg-white border-bottom">
      <div className="container py-5 text-center fade-in-up">
        <h2 className="display-6 fw-bold text-dark mb-5 text-uppercase tracing-wide">Guest Experiences</h2>
        <div className="row g-4 justify-content-center">
          {reviews.map((r, i) => (
            <div key={i} className="col-lg-4 col-md-6 fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="p-4 bg-light-cream rounded-4 h-100 card text-center shadow-sm">
                <div className="text-highlight fs-6 mb-3">
                  {[...Array(r.star)].map((_, i) => <span key={i}>★</span>)}
                </div>
                <p className="text-secondary fst-italic mb-3">"{r.text}"</p>
                <h6 className="fw-bold text-dark mb-0">— {r.name}</h6>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── 6. Final CTA (Clean Section) ────────────────────── */
function FinalCTA() {
  return (
    <section className="py-10 bg-dark text-white text-center">
      <div className="container py-5 my-5 fade-in-up">
        <h2 className="display-4 fw-bold mb-4">Visit Freddo Bistro Today</h2>
        <p className="fs-5 text-white-50 mb-5 max-w-lg mx-auto">Instant availability, fresh brew. We're open from 7:00 AM to 10:00 PM every day.</p>
        <Link to="/order" className="btn btn-primary px-5 py-3 rounded-pill fw-bold text-uppercase shadow-lg">Order Now</Link>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════ */
export default function HomePage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/menu').then(({ data }) => {
      setItems(data.data?.slice(0, 3) || []);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  return (
    <div className="homepage-bootstrap overflow-hidden">
      <Hero />
      <About />
      <FeaturedMenu items={items} loading={loading} />
      <Gallery />
      <Testimonials />
      <FinalCTA />
    </div>
  );
}
