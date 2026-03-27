export default function MenuCard({ item, onOrder }) {
  return (
    <div className="card h-100 border-0 shadow-sm transition-all text-center">
      {/* Product Image */}
      <div className="position-relative overflow-hidden">
        <img
          src={item.image || '/menu_flatlay.png'}
          className="card-img-top w-100 object-fit-cover"
          alt={item.name}
          style={{height: '240px'}}
        />
        
        {!item.availability && (
          <div className="position-absolute top-0 start-0 w-100 h-100 bg-white/60 d-flex align-items-center justify-content-center" style={{ backdropFilter: 'blur(2px)' }}>
            <span className="badge bg-dark rounded-pill px-3 py-2 text-uppercase fw-bold shadow-sm">Out of Stock</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="card-body px-4 py-5 flex-grow-1 d-flex flex-column justify-content-between">
        <div className="mb-4">
            <h5 className="card-title fw-bold text-dark mb-2 text-uppercase tracking-wide">
                {item.name}
            </h5>
            <p className="card-text fw-bold text-primary fs-5 mb-0">₹{item.price}</p>
        </div>
        
        <button
          onClick={() => item.availability && onOrder(item)}
          disabled={!item.availability}
          className={`btn btn-primary w-100 rounded-pill py-3 text-uppercase fw-bold shadow-sm ${
            !item.availability ? 'opacity-50 disabled cursor-not-allowed' : ''
          }`}
        >
          {item.availability ? 'Order Now' : 'Unavailable'}
        </button>
      </div>
    </div>
  );
}
