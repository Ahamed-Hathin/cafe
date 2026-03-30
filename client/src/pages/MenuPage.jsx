import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SlidersHorizontal } from 'lucide-react';
import api from '../api/axios';
import MenuCard from '../components/MenuCard';
import OrderModal from '../components/OrderModal';

export default function MenuPage() {
  const [items, setItems]           = useState([]);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState(null);
  const [activeCategory, setActive] = useState('All');
  const [categories, setCategories] = useState(['All']);

  // Order Modal State
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [selectedItem, setSelectedItem]     = useState(null);

  useEffect(() => {
    setLoading(true);
    api.get('/api/menu')
      .then(({ data }) => {
        const all = data.data || [];
        setItems(all);
        const cats = ['All', ...new Set(all.map((i) => i.category))];
        setCategories(cats);
      })
      .catch(() => setError('Failed to load menu. Please check your connection.'))
      .finally(() => setLoading(false));
  }, []);

  const handleOrderClick = (item) => {
    setSelectedItem(item);
    setShowOrderModal(true);
  };

  const filtered = activeCategory === 'All'
    ? items
    : items.filter((i) => i.category === activeCategory);

  return (
    <div className="min-h-screen bg-light-cream pt-28 md:pt-36 pb-20 overflow-x-hidden">
      {/* Order Modal */}
      <OrderModal
        show={showOrderModal}
        onHide={() => setShowOrderModal(false)}
        item={selectedItem}
      />

      <div className="container mx-auto px-4">

        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="text-secondary font-black text-[10px] uppercase tracking-[0.3em] mb-3 block">
            Freshly Crafted
          </span>
          <h1 className="font-playfair text-4xl md:text-6xl font-black text-primary leading-tight mb-4">
            Our Menu
          </h1>
          <div className="w-16 h-1.5 bg-accent mx-auto rounded-full" />
        </motion.div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 md:gap-3 flex-wrap justify-center mb-10 md:mb-14">
          <div className="flex items-center gap-2 text-dark/40 mr-1">
            <SlidersHorizontal size={14} />
            <span className="text-[10px] font-black uppercase tracking-widest hidden sm:block">Filter</span>
          </div>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`h-10 md:h-11 px-5 md:px-6 rounded-full text-[10px] font-black uppercase tracking-widest transition-all active:scale-95 shadow-sm ${
                activeCategory === cat
                  ? 'bg-primary text-white shadow-primary/20 shadow-md'
                  : 'bg-white text-dark/60 hover:text-primary border border-black/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Error State */}
        {error && (
          <div className="text-center py-20 bg-white rounded-[40px] shadow-sm my-10 px-8">
            <div className="text-6xl mb-6 opacity-20">❌</div>
            <h3 className="font-playfair text-2xl font-bold text-primary mb-4">{error}</h3>
            <button
              onClick={() => window.location.reload()}
              className="h-12 px-10 bg-primary text-white text-xs font-black uppercase tracking-widest rounded-full hover:bg-secondary transition-all shadow-md active:scale-95"
            >
              Retry
            </button>
          </div>
        )}

        {/* Loading Skeleton */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="bg-white rounded-[32px] overflow-hidden animate-pulse">
                <div className="aspect-[4/3] bg-primary/5" />
                <div className="p-6">
                  <div className="h-5 w-3/4 bg-primary/5 mx-auto rounded-full mb-4" />
                  <div className="h-4 w-1/3 bg-primary/5 mx-auto rounded-full mb-8" />
                  <div className="h-11 w-full bg-primary/5 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Menu Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {filtered.map((item, i) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (i % 8) * 0.05 }}
              >
                <MenuCard item={item} onOrder={handleOrderClick} />
              </motion.div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && filtered.length === 0 && (
          <div className="text-center py-24">
            <div className="text-6xl mb-6 opacity-20">☕</div>
            <h2 className="font-playfair text-3xl font-bold text-primary mb-3">Coming Soon</h2>
            <p className="text-dark/50 max-w-sm mx-auto">
              We're perfecting our signature selections. Check back shortly!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
