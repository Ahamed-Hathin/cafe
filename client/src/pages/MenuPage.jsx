import { useState, useEffect } from 'react';
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
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    setLoading(true);
    api.get('/menu')
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
    <div className="min-vh-100 bg-light-cream pt-5 mt-5">
      {/* Order Modal */}
      <OrderModal 
        show={showOrderModal} 
        onHide={() => setShowOrderModal(false)} 
        item={selectedItem} 
      />



      <div className="container pb-5">
        {/* Category Selection Filter */}
        <div className="d-flex flex-wrap justify-content-center gap-2 mb-5 fade-in-up" style={{ animationDelay: '0.1s' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`btn btn-sm rounded-pill px-4 py-2 fw-bold text-uppercase tracking-wide transition-all shadow-sm ${
                activeCategory === cat ? 'btn-primary' : 'btn-white bg-white text-secondary hover-bg-light'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Error Handling */}
        {error && (
            <div className="text-center py-5 bg-white rounded-4 shadow-sm my-5">
                <div className="fs-1 mb-4 text-primary opacity-25">❌</div>
                <h3 className="fw-bold mb-3">{error}</h3>
                <button onClick={() => window.location.reload()} className="btn btn-primary rounded-pill px-5 py-2">Retry</button>
            </div>
        )}

        {/* Main Grid */}
        <div className="position-relative">
            {loading ? (
                <div className="d-flex flex-column align-items-center justify-content-center py-5 my-5">
                    <div className="spinner-border text-primary" style={{width: '3rem', height: '3rem'}} role="status"></div>
                    <span className="mt-3 text-secondary text-uppercase fw-bold tracking-widest fs-small">Curating items...</span>
                    
                    <div className="row g-4 w-100 mt-5">
                        {[1,2,3,4].map(i => (
                            <div key={i} className="col-lg-3 col-md-6 col-sm-12">
                                <div className="card h-100 placeholder-glow shadow-sm border-0">
                                    <div className="placeholder col-12" style={{height: '240px'}}></div>
                                    <div className="card-body p-4">
                                        <h5 className="placeholder col-8 mb-3"></h5>
                                        <p className="placeholder col-4 mb-4"></p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="row g-4 g-lg-5">
                    {filtered.map((item, i) => (
                        <div key={item._id} className="col-lg-3 col-md-4 col-sm-6 col-12 fade-in-up" style={{ animationDelay: `${(i % 10) * 0.1}s` }}>
                            <MenuCard item={item} onOrder={handleOrderClick} />
                        </div>
                    ))}
                </div>
            )}
        </div>

        {/* Empty State */}
        {!loading && filtered.length === 0 && !error && (
            <div className="text-center py-5 my-5">
                <div className="fs-1 mb-3 text-secondary opacity-25">☕</div>
                <h2 className="fw-bold text-dark mb-2">Coming Soon</h2>
                <p className="text-secondary max-w-sm mx-auto">We're updating our signature selections. Check back shortly!</p>
            </div>
        )}
      </div>
    </div>
  );
}
