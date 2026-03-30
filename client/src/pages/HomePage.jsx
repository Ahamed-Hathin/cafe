import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../api/axios';
import MenuCard from '../components/MenuCard';
import OrderModal from '../components/OrderModal';
import { ArrowRight, Star, Clock, MapPin } from 'lucide-react';

/* ── 1. Hero Section (Scale from Mobile to Desktop) ────────────── */
function Hero() {
  return (
    <section className="relative pt-24 md:pt-32 pb-16 md:pb-24 lg:pt-40 lg:pb-32 overflow-hidden bg-bg/50">
      <div className="absolute top-[-10%] left-[-10%] w-[150%] h-[150%] md:w-[60%] md:h-[100%] bg-radial-gradient(circle, rgba(164,113,72,0.1) 0%, transparent 70%) blur-3xl z-0" />
      <div className="texture-overlay" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Content */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-4 py-1.5 rounded-full mb-6">
              <span className="w-1.5 h-1.5 bg-secondary rounded-full animate-pulse" />
              <span className="text-[10px] md:text-sm font-black uppercase tracking-widest leading-none">Since 1999</span>
            </div>
            
            <h1 className="font-playfair text-4xl md:text-6xl lg:text-7xl font-black text-primary leading-tight mb-6">
              The Best <span className="text-secondary italic">Kaapi</span> in Town.
            </h1>
            
            <p className="text-base md:text-xl text-dark/70 leading-relaxed max-w-2xl mx-auto lg:mx-0 mb-10">
              Experience the authentic soul of South Indian filter coffee. We blend tradition with premium craftsmanship for true coffee lovers.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link 
                to="/menu" 
                className="inline-flex h-12 md:h-14 items-center justify-center px-8 lg:px-10 bg-primary text-white text-xs lg:text-sm font-black uppercase tracking-widest rounded-full hover:bg-secondary hover:shadow-xl hover:shadow-primary/20 transition-all active:scale-95 group"
              >
                Explore Menu
                <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                to="/menu" 
                className="inline-flex h-12 md:h-14 items-center justify-center px-8 lg:px-10 border-2 border-primary text-primary text-xs lg:text-sm font-black uppercase tracking-widest rounded-full hover:bg-primary hover:text-white transition-all active:scale-95 shadow-md bg-white/50"
              >
                View Specials
              </Link>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-1 w-full max-w-lg lg:max-w-none"
          >
            <div className="relative group">
              <div className="absolute inset-0 bg-secondary/10 rounded-[40px] md:rounded-[60px] blur-3xl group-hover:scale-110 transition-transform duration-700" />
              <div className="relative rounded-[40px] md:rounded-[60px] overflow-hidden shadow-2xl border-4 border-white/40 rotate-[2deg] group-hover:rotate-0 transition-transform duration-700">
                <img 
                  src="/hero_bg.png" 
                  alt="Specialty Coffee" 
                  className="w-full h-full object-cover aspect-video lg:aspect-auto min-h-[300px] md:min-h-[400px]" 
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ── 2. About Section (2-Column Desktop, 1-Column Mobile) ────────────── */
function About() {
  return (
    <section className="py-20 lg:py-32 bg-light-cream">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
          {/* Image Side */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full md:w-1/2"
          >
            <div className="relative overflow-hidden rounded-[40px] shadow-lg group">
              <img
                src="/experience_section.png"
                alt="Coffee Tradition"
                className="w-full h-full object-cover aspect-[4/3] group-hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
            </div>
          </motion.div>

          {/* Text Side */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full md:w-1/2"
          >
            <span className="inline-block px-4 py-1.5 bg-primary text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-6">Our Legacy</span>
            <h2 className="font-playfair text-3xl md:text-5xl font-black text-primary leading-tight mb-6">Heritage & Love in Every Cup</h2>
            <p className="text-base md:text-lg text-dark/70 leading-relaxed max-w-lg mb-8">
              At Freddo Bistro, we believe in the art of slow-brewing. Every cup tells a story of tradition, heritage, and the perfect blend of beans.
            </p>
            <div className="flex flex-col gap-6 mb-10">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-accent text-primary flex items-center justify-center shrink-0">
                  <Star size={18} fill="currentColor" />
                </div>
                <div>
                  <h4 className="font-bold text-primary mb-1">Premium Sourcing</h4>
                  <p className="text-sm text-dark/60">Hand-picked beans from the finest estates of Coorg.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-secondary text-white flex items-center justify-center shrink-0">
                  <Clock size={18} />
                </div>
                <div>
                  <h4 className="font-bold text-primary mb-1">Slow Brewed</h4>
                  <p className="text-sm text-dark/60">Filtered naturally for maximum aroma and thickness.</p>
                </div>
              </div>
            </div>
            <Link to="/contact" className="group text-secondary font-black text-xs uppercase tracking-widest flex items-center gap-2">
              Our Journey <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ── 3. Featured Menu (Grid Layout) ──────────────────── */
function FeaturedMenu({ items, loading, onOrder }) {
  return (
    <section className="py-20 lg:py-32 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 md:mb-20 max-w-2xl mx-auto"
        >
          <span className="text-secondary font-black text-[10px] uppercase tracking-[0.3em] mb-4 block">Recommendations</span>
          <h2 className="font-playfair text-3xl md:text-5xl font-black text-primary leading-tight mb-8">Signature Flavours</h2>
          <div className="w-16 h-1.5 bg-accent mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {loading
            ? Array(3).fill(0).map((_, i) => (
              <div key={i} className="bg-light-cream/30 rounded-[32px] p-8 animate-pulse">
                <div className="w-full aspect-[4/3] bg-primary/5 rounded-2xl mb-8" />
                <div className="h-6 w-3/4 bg-primary/5 mx-auto rounded-full mb-4" />
                <div className="h-4 w-1/4 bg-primary/5 mx-auto rounded-full mb-8" />
                <div className="h-12 w-full bg-primary/5 rounded-full" />
              </div>
            ))
            : items.map((item) => (
              <MenuCard key={item._id} item={item} onOrder={onOrder} />
            ))
          }
        </div>

        <div className="mt-16 md:mt-24">
          <Link 
            to="/menu" 
            className="inline-flex h-14 items-center justify-center px-10 border-2 border-primary text-primary text-xs font-black uppercase tracking-widest rounded-full hover:bg-primary hover:text-white transition-all shadow-md group"
          >
            Explore Complete Menu
            <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ── 4. Gallery Section (Responsive Grid) ────────────────── */
function Gallery() {
  const images = ['/hero_bg.png', '/coffee_pour.png', '/menu_flatlay.png', '/filter_coffee.png', '/masala_dosa.png', '/idly_sambar.png'];
  return (
    <section id="gallery" className="py-20 lg:py-32 bg-light-cream scroll-mt-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-end justify-between mb-12 md:mb-20 gap-8">
          <div className="max-w-xl text-center lg:text-left mx-auto lg:mx-0">
            <span className="text-secondary font-black text-[10px] uppercase tracking-[0.2em] mb-4 block">Visual Experience</span>
            <h2 className="font-playfair text-3xl md:text-5xl font-black text-primary leading-tight">Every Corner has a Story</h2>
          </div>
          <p className="text-dark/50 italic text-sm md:text-base max-w-sm text-center lg:text-right mx-auto lg:mx-0">
            A blend of retro charm and modern elegance. Tag us with #FreddoBistro for a feature.
          </p>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 lg:gap-8">
          {images.map((src, i) => (
            <motion.div 
              key={src}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative aspect-square overflow-hidden rounded-2xl md:rounded-[40px] shadow-sm"
            >
              <img
                src={src}
                alt="Cafe Gallery"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── 5. Testimonials (Touch Optimized Carousel) ─────────────────── */
function Testimonials() {
  const reviews = [
    { name: "Anita Rao", star: 5, text: "The most authentic filter coffee experience in Chennai. It's truly consistent every time." },
    { name: "Siddharth", star: 5, text: "Minimal decor, impeccable coffee. Exactly how a modern bistro should feel." },
    { name: "Maya S.", star: 5, text: "Crispy dosas, heavenly sambar, and the smell of fresh beans everywhere. Love it!" }
  ];
  return (
    <section className="py-20 lg:py-32 bg-white border-b border-black/5 overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="font-playfair text-center text-2xl md:text-4xl font-black text-primary mb-16 uppercase tracking-widest">Guest Experiences</h2>
        <div className="flex flex-col md:flex-row gap-6 lg:gap-10">
          {reviews.map((r, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex-1 p-8 md:p-10 bg-light-cream rounded-[40px] text-center border border-primary/5 hover:border-secondary/20 transition-colors shadow-sm h-full"
            >
              <div className="flex justify-center gap-1 text-accent mb-6">
                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
              </div>
              <p className="text-primary italic text-lg leading-relaxed mb-8">"{r.text}"</p>
              <div className="flex items-center justify-center gap-3">
                <div className="w-1 h-1 rounded-full bg-secondary" />
                <h6 className="font-black text-primary text-xs uppercase tracking-widest">{r.name}</h6>
                <div className="w-1 h-1 rounded-full bg-secondary" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── 6. Final CTA (Premium Dark Section) ────────────────────── */
function FinalCTA() {
  return (
    <section className="py-24 md:py-40 bg-primary relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-[url('/coffee_pour.png')] bg-cover opacity-10 md:opacity-20 pointer-events-none" />
      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
        >
          <h2 className="font-playfair text-4xl md:text-7xl font-black text-white mb-8 leading-tight">Visit Freddo <br className="hidden md:block" /> Bistro Today</h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-white/50 mb-12">
            <div className="flex items-center gap-2">
              <Clock size={16} />
              <span className="text-xs uppercase tracking-widest font-bold">Open Daily: 7 AM - 10 PM</span>
            </div>
            <div className="hidden md:block w-1.5 h-1.5 rounded-full bg-accent" />
            <div className="flex items-center gap-2">
              <MapPin size={16} />
              <span className="text-xs uppercase tracking-widest font-bold">Anna Nagar, Chennai</span>
            </div>
          </div>
          <Link 
            to="/menu" 
            className="inline-flex h-14 md:h-16 items-center justify-center px-10 md:px-16 bg-accent text-primary text-xs md:text-sm font-black uppercase tracking-widest rounded-full hover:scale-105 hover:shadow-2xl hover:shadow-accent/20 transition-all active:scale-95"
          >
            Order your cup Now
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════ */
export default function HomePage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleOrderClick = (item) => {
    setSelectedItem(item);
    setShowOrderModal(true);
  };

  useEffect(() => {
    api.get('/api/menu').then(({ data }) => {
      setItems(data.data?.slice(0, 3) || []);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  return (
    <div className="bg-white overflow-x-hidden">
      <OrderModal
        show={showOrderModal}
        onHide={() => setShowOrderModal(false)}
        item={selectedItem}
      />
      <Hero />
      <About />
      <FeaturedMenu items={items} loading={loading} onOrder={handleOrderClick} />
      <Gallery />
      <Testimonials />
      <FinalCTA />
    </div>
  );
}
