import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Coffee } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Menu', path: '/menu' },
    { name: 'Gallery', path: '/#gallery', hash: '#gallery' },
    { name: 'Contact', path: '/contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'py-2' : 'py-4'
        }`}
      >
        <div className="container mx-auto px-4 lg:px-0">
          <div className={`glass-nav mx-auto flex items-center justify-between px-6 py-3 rounded-[30px] lg:rounded-[40px] border border-white/50 backdrop-blur-md shadow-lg`}>
            {/* Brand */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="bg-primary p-1.5 rounded-full text-white group-hover:scale-110 transition-transform">
                <Coffee size={18} />
              </div>
              <span className="font-playfair text-xl font-bold tracking-tight text-primary">Freddo Bistro</span>
            </Link>

            {/* Desktop Links */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-sm font-medium uppercase tracking-wider transition-colors hover:text-secondary ${
                    (link.hash ? location.hash === link.hash : location.pathname === link.path)
                      ? 'text-secondary relative after:content-[""] after:absolute after:-bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-1 after:h-1 after:bg-accent after:rounded-full'
                      : 'text-dark/70'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden lg:block">
              <Link
                to="/menu"
                className="bg-primary text-white text-xs font-bold uppercase tracking-widest px-6 py-2.5 rounded-full hover:bg-secondary hover:-translate-y-0.5 transition-all shadow-md"
              >
                Order Now
              </Link>
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-primary focus:outline-none"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-40 lg:hidden flex items-center justify-center p-4"
          >
            <div 
              className="fixed inset-0 bg-primary/20 backdrop-blur-sm" 
              onClick={() => setIsOpen(false)}
            />
            <motion.div 
              className="relative w-full max-w-sm bg-light-cream rounded-[40px] p-8 shadow-2xl border border-white"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col items-center gap-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`text-2xl font-playfair font-bold transition-colors ${
                      (link.hash ? location.hash === link.hash : location.pathname === link.path)
                        ? 'text-primary'
                        : 'text-dark/40 active:text-primary'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
                <div className="w-12 h-0.5 bg-accent/30 rounded-full my-2"></div>
                <Link
                  to="/menu"
                  className="w-full bg-primary text-white text-center font-bold uppercase tracking-widest py-4 rounded-3xl shadow-xl active:scale-95 transition-transform"
                >
                  Order Now
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
