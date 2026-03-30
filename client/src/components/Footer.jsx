import { Link } from 'react-router-dom';
import { 
  MapPin, Phone, Mail, Instagram, Facebook, Twitter, 
  ChevronRight, Coffee 
} from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-b from-[#2C1810] to-[#1a0f0a] text-white pt-20 pb-8 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent to-transparent opacity-30" />
      
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* 1. BRAND SECTION */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-2 mb-4">
              <Coffee className="text-accent" size={32} />
              <span className="font-playfair text-2xl font-bold tracking-tighter text-white">Freddo Bistro</span>
            </div>
            <p className="text-white/60 text-sm mb-6 font-playfair italic max-w-xs">
              Crafted coffee experience, roasting memories one cup at a time.
            </p>
            <div className="inline-block bg-accent/10 text-accent border border-accent/25 px-4 py-2 rounded-full text-xs font-black uppercase tracking-[0.2em]">
              EST. 1999
            </div>
          </div>

          {/* 2. QUICK LINKS */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h6 className="text-white text-[10px] font-black uppercase tracking-[0.2em] mb-6 md:border-l-2 md:border-accent md:pl-3 w-full">
              Explore
            </h6>
            <nav className="flex flex-col gap-4">
              {[
                ['/', 'Home'],
                ['/menu', 'Menu Selections'],
                ['/contact', 'Contact Us'],
                ['/login', 'Admin Access']
              ].map(([path, label]) => (
                <Link 
                  key={path} 
                  to={path} 
                  className="group flex items-center justify-center md:justify-start gap-2 text-white/60 text-sm hover:text-accent transition-colors"
                >
                  <ChevronRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all text-accent" />
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* 3. CONTACT INFO */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h6 className="text-white text-[10px] font-black uppercase tracking-[0.2em] mb-6 md:border-l-2 md:border-accent md:pl-3 w-full">
              Get in Touch
            </h6>
            <div className="flex flex-col gap-4 text-white/60 text-sm">
              <div className="flex gap-3 items-start justify-center md:justify-start">
                <MapPin size={18} className="text-accent shrink-0 mt-0.5" />
                <span className="max-w-[200px]">77 5-36, West Street, Trichy to Dindigul Road, Ammapettai, Trichy 620009</span>
              </div>
              <div className="flex gap-3 items-center justify-center md:justify-start">
                <Phone size={18} className="text-accent shrink-0" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex gap-3 items-center justify-center md:justify-start">
                <Mail size={18} className="text-accent shrink-0" />
                <span>hello@freddobistro.com</span>
              </div>
            </div>
          </div>

          {/* 4. SOCIAL MEDIA */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h6 className="text-white text-[10px] font-black uppercase tracking-[0.2em] mb-6 md:border-l-2 md:border-accent md:pl-3 w-full">
              Follow Us
            </h6>
            <p className="text-white/60 text-sm mb-6 max-w-[200px]">
              Stay updated with our latest blends and events.
            </p>
            <div className="flex gap-4">
              {[
                { icon: Instagram, label: 'Instagram' },
                { icon: Facebook, label: 'Facebook' },
                { icon: Twitter, label: 'Twitter' }
              ].map((social) => (
                <a 
                  key={social.label} 
                  href="#" 
                  className="w-10 h-10 flex items-center justify-center bg-white/5 border border-white/10 rounded-full hover:bg-accent hover:border-accent group hover:-translate-y-1 transition-all"
                  aria-label={social.label}
                >
                  <social.icon size={18} className="text-white/60 group-hover:text-primary transition-colors" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* COPYRIGHT SECTION */}
        <div className="border-t border-white/10 pt-8 mt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-[10px] md:text-xs font-medium text-center md:text-left uppercase tracking-widest">
            © {currentYear} Freddo Bistro Coffee. All rights reserved.
          </p>
          <div className="flex gap-6 text-[10px] md:text-xs font-medium uppercase tracking-widest text-white/40">
            <span className="cursor-pointer hover:text-accent transition-colors">Privacy Policy</span>
            <span className="cursor-pointer hover:text-accent transition-colors">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
