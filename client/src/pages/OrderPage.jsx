import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import toast from 'react-hot-toast';
import { ShoppingBag, ArrowLeft, ArrowRight, CheckCircle, Trash2 } from 'lucide-react';

export default function OrderPage() {
  const { cart, cartTotal, removeFromCart, updateQuantity, clearCart } = useCart();
  const [step, setStep]           = useState(cart.length > 0 ? 1 : 0);
  const [loading, setLoading]     = useState(false);
  const [orderId, setOrderId]     = useState(null);
  const [form, setForm]           = useState({ customerName: '', phone: '' });

  const handleCheckout = async (e) => {
    e.preventDefault();
    if (!form.customerName || !form.phone) { toast.error('Please fill in your details.'); return; }

    setLoading(true);
    try {
      const { data } = await api.post('/api/orders', {
        ...form,
        items: cart.map(i => ({ name: i.name, quantity: i.quantity, price: i.price })),
        totalPrice: cartTotal,
      });
      setOrderId(data.data._id);
      setStep(3);
      clearCart();
      toast.success('Order placed successfully! ☕');
    } catch {
      toast.error('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (step === 0 || (cart.length === 0 && step < 3)) {
    return (
      <div className="min-vh-100 bg-light-cream d-flex flex-column align-items-center justify-content-center pt-5 fade-in-up">
        <div className="bg-white rounded-circle p-5 shadow-sm mb-4">
            <span className="fs-1">☕</span>
        </div>
        <h2 className="fw-bold text-dark mb-4 display-5">Empty Bag</h2>
        <p className="text-secondary max-w-sm mx-auto mb-5 text-center fs-5">Your shopping bag is currently empty. Let's start brewing some memories!</p>
        <Link to="/menu" className="btn btn-primary rounded-pill px-5 py-3 fw-bold text-uppercase shadow-sm">Browse Menu</Link>
      </div>
    );
  }

  return (
    <div className="min-vh-100 bg-light-cream pt-5 mt-5">


      <div className="container py-5">
        {step < 3 && (
            <div className="row justify-content-center mb-5 g-0 fade-in-up" style={{ animationDelay: '0.1s' }}>
                <div className="col-12 col-md-8">
                    <div className="d-flex align-items-center justify-content-center gap-4 py-4 bg-white rounded-pill shadow-sm border border-light">
                        <span className={`fw-bold text-uppercase tracking-wider fs-small ${step === 1 ? 'text-primary' : 'text-secondary'}`}>1. Bag</span>
                        <div className="bg-light" style={{width: '20px', height: '2px'}}></div>
                        <span className={`fw-bold text-uppercase tracking-wider fs-small ${step === 2 ? 'text-primary' : 'text-secondary'}`}>2. Details</span>
                    </div>
                </div>
            </div>
        )}

        <div className="row g-5">
            {/* Step 1: Cart Items */}
            {step === 1 && (
                <>
                <div className="col-lg-8 order-2 order-md-1 fade-in-up" style={{ animationDelay: '0.2s' }}>
                    <div className="bg-white rounded-4 shadow-sm p-4 overflow-hidden border border-light transition-all">
                        <div className="table-responsive">
                            <table className="table align-middle">
                                <thead>
                                    <tr className="border-bottom border-light text-secondary text-uppercase fw-bold tracing-widest fs-small">
                                        <th className="px-4 py-4">Item</th>
                                        <th className="px-4 py-4 text-center">Quantity</th>
                                        <th className="px-4 py-4">Total</th>
                                        <th className="px-4 py-4 text-end">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cart.map((item) => (
                                        <tr key={item._id}>
                                            <td className="px-4 py-4">
                                                <div className="d-flex align-items-center gap-4">
                                                    <img src={item.image || '/menu_flatlay.png'} alt="" className="rounded-3 shadow-sm object-fit-cover" style={{width: '60px', height: '60px'}} />
                                                    <h6 className="fw-bold text-dark mb-0">{item.name}</h6>
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 text-center">
                                                <div className="d-inline-flex align-items-center bg-light rounded-pill px-3 py-1 gap-4 border border-1">
                                                    <button onClick={() => updateQuantity(item._id, item.quantity - 1)} className="btn btn-sm btn-link text-decoration-none text-dark fw-bold px-0">—</button>
                                                    <span className="fw-bold text-dark">{item.quantity}</span>
                                                    <button onClick={() => updateQuantity(item._id, item.quantity + 1)} className="btn btn-sm btn-link text-decoration-none text-dark fw-bold px-0">+</button>
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 fw-bold text-dark">₹{item.price * item.quantity}</td>
                                            <td className="px-4 py-4 text-end">
                                                <button onClick={() => removeFromCart(item._id)} className="btn btn-outline-danger btn-sm rounded-circle p-2 border-0">
                                                    <Trash2 size={18} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className="col-lg-4 order-1 order-md-2 sticky-top fade-in-up" style={{top: '100px', zIndex: 1, animationDelay: '0.3s'}}>
                    <div className="bg-white rounded-4 shadow-sm p-5 border border-light h-min transition-all">
                        <h4 className="fw-bold mb-4 text-dark text-uppercase d-block tracing-wide">Total Summary</h4>
                        <div className="row g-4 mb-5 border-bottom border-light pb-4">
                            <div className="col-6 text-secondary fs-small text-uppercase fw-bold tracking-widest">Subtotal</div>
                            <div className="col-6 text-end fw-bold text-dark fs-5">₹{cartTotal}</div>
                            <div className="col-6 text-secondary fs-small text-uppercase fw-bold tracking-widest">Taxes</div>
                            <div className="col-6 text-end fw-bold text-dark fs-small">Incl.</div>
                        </div>
                        <div className="row g-4 mb-5">
                            <div className="col-6 text-dark text-uppercase fw-bold tracking-widest">Total Pay</div>
                            <div className="col-6 text-end text-primary fs-3 fw-bold">₹{cartTotal}</div>
                        </div>
                        <button onClick={() => setStep(2)} className="btn btn-primary btn-lg rounded-pill w-100 py-3 text-uppercase fw-bold shadow-sm d-flex align-items-center justify-content-center gap-3">
                            Confirm Details <ArrowRight size={20} />
                        </button>
                        <Link to="/menu" className="btn btn-white text-secondary w-100 mt-3 text-uppercase fw-bold tracing-widest fs-small text-decoration-none">← Keep Ordering</Link>
                    </div>
                </div>
                </>
            )}

            {/* Step 2: Checkout Details */}
            {step === 2 && (
                <div className="col-lg-6 col-md-11 mx-auto fade-in-up" style={{ animationDelay: '0.2s' }}>
                    <div className="bg-white rounded-4 shadow-sm p-5 border border-light text-center transition-all">
                        <div className="mb-5 d-flex flex-column align-items-center justify-content-center">
                            <div className="bg-light-cream rounded-circle p-4 mb-4">
                                <ShoppingBag size={40} className="text-secondary" />
                            </div>
                            <h3 className="fw-bold mb-2">Order Authentication</h3>
                            <p className="text-secondary tracking-widest text-uppercase fw-bold fs-small opacity-50">Secure and Instant</p>
                        </div>

                        <form onSubmit={handleCheckout} className="text-start">
                            <div className="mb-4">
                                <label className="text-secondary text-uppercase fw-bold tracking-widest fs-small mb-2 ms-2">Full Name</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="Jane Doe"
                                    value={form.customerName}
                                    onChange={(e) => setForm({ ...form, customerName: e.target.value })}
                                    className="form-control form-control-lg rounded-pill px-4 fs-small"
                                />
                            </div>

                            <div className="mb-5">
                                <label className="text-secondary text-uppercase fw-bold tracking-widest fs-small mb-2 ms-2">Phone Number</label>
                                <input
                                    type="tel"
                                    required
                                    placeholder="+91 98765 43210"
                                    value={form.phone}
                                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                                    className="form-control form-control-lg rounded-pill px-4 fs-small"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="btn btn-primary btn-lg rounded-pill w-100 py-3 text-uppercase fw-bold shadow-sm mb-4 d-flex align-items-center justify-content-center gap-3"
                            >
                                {loading ? 'Processing Transaction…' : 'Place Order Now'}
                            </button>
                            <button onClick={() => setStep(1)} className="btn btn-link text-secondary text-decoration-none w-100 text-uppercase fw-bold fs-small tracking-widest">← Back to Bag</button>
                        </form>
                    </div>
                </div>
            )}

            {/* Step 3: Success Confirmation */}
            {step === 3 && (
                <div className="col-12 text-center py-5 fade-in-up">
                    <div className="bg-white rounded-circle p-5 shadow-sm mb-5 d-inline-flex align-items-center justify-content-center mx-auto" style={{width: '200px', height: '200px'}}>
                        <CheckCircle size={80} className="text-highlight" />
                    </div>
                    <h2 className="display-5 fw-bold text-dark mb-4">Authentic Brew Incoming</h2>
                    <p className="text-secondary tracking-widest text-uppercase fw-bold fs-small mb-2 opacity-50">Transaction Verified</p>
                    <p className="fs-5 text-secondary max-w-sm mx-auto mb-5 leading-relaxed">We've received your request! Your order ID is <span className="text-dark fw-bold">#{orderId?.slice(-6) || 'XXXXXX'}</span>. Sit back and relax while we brew some perfection.</p>
                    <div className="mt-5">
                        <Link to="/" className="btn btn-primary btn-lg rounded-pill px-5 py-3 text-uppercase fw-bold shadow-sm">Return Home</Link>
                    </div>
                </div>
            )}
        </div>
      </div>
    </div>
  );
}
