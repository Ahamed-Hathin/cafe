import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2 } from 'lucide-react';
import api from '../api/axios';
import toast from 'react-hot-toast';

export default function OrderModal({ show, onHide, item }) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    customerName: '',
    phone: '',
    quantity: 1
  });

  // Reset form when modal opens
  useEffect(() => {
    if (show) {
      setForm({ customerName: '', phone: '', quantity: 1 });
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [show]);

  if (!item) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        customerName: form.customerName,
        phone: form.phone,
        items: [
          {
            name: item.name,
            price: item.price,
            quantity: Number(form.quantity)
          }
        ],
        totalPrice: item.price * Number(form.quantity)
      };

      await api.post('/api/orders', payload);
      toast.success('Order placed successfully! ☕');
      onHide();
    } catch (err) {
      console.error(err);
      toast.error('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {show && (
        <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-0 md:p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onHide}
            className="fixed inset-0 bg-primary/40 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="w-full max-w-lg bg-white rounded-t-[40px] md:rounded-[40px] shadow-2xl relative z-10 flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="px-6 md:px-10 pt-8 pb-4 flex justify-between items-center border-b border-black/5 shrink-0">
              <h2 className="font-playfair text-3xl font-black text-primary">Order Now</h2>
              <button
                onClick={onHide}
                className="w-10 h-10 rounded-full bg-light-cream text-dark/50 flex items-center justify-center hover:bg-black/5 hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                <X size={20} />
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="px-6 md:px-10 py-6 overflow-y-auto w-full">
              {/* Item Summary */}
              <div className="flex items-center gap-5 p-4 bg-light-cream rounded-3xl mb-8 border border-black/5">
                <img
                  src={item.image || '/menu_flatlay.png'}
                  alt={item.name}
                  className="w-20 h-20 rounded-2xl object-cover shadow-sm"
                />
                <div>
                  <h5 className="font-playfair text-lg font-bold text-primary mb-1 uppercase tracking-wide">
                    {item.name}
                  </h5>
                  <p className="text-secondary font-black text-xl">₹{item.price}</p>
                </div>
              </div>

              {/* Form */}
              <form id="order-form" onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-dark/50 ml-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: John Doe"
                    value={form.customerName}
                    onChange={(e) => setForm({ ...form, customerName: e.target.value })}
                    className="h-14 w-full px-6 rounded-2xl bg-white border-2 border-light-cream text-primary text-sm font-medium placeholder:text-dark/30 focus:outline-none focus:border-secondary/30 focus:ring-4 focus:ring-secondary/10 transition-all"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-dark/50 ml-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="Ex: 9876543210"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="h-14 w-full px-6 rounded-2xl bg-white border-2 border-light-cream text-primary text-sm font-medium placeholder:text-dark/30 focus:outline-none focus:border-secondary/30 focus:ring-4 focus:ring-secondary/10 transition-all"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-dark/50 ml-2">
                    Quantity
                  </label>
                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      onClick={() => setForm(f => ({ ...f, quantity: Math.max(1, f.quantity - 1) }))}
                      className="w-14 h-14 rounded-2xl bg-light-cream text-primary font-black text-xl flex items-center justify-center hover:bg-black/5 active:scale-95 transition-all"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min="1"
                      required
                      value={form.quantity}
                      onChange={(e) => setForm({ ...form, quantity: Math.max(1, Number(e.target.value)) })}
                      className="h-14 w-24 text-center rounded-2xl bg-white border-2 border-light-cream text-primary text-xl font-black focus:outline-none focus:border-secondary/30"
                    />
                    <button
                      type="button"
                      onClick={() => setForm(f => ({ ...f, quantity: f.quantity + 1 }))}
                      className="w-14 h-14 rounded-2xl bg-light-cream text-primary font-black text-xl flex items-center justify-center hover:bg-black/5 active:scale-95 transition-all"
                    >
                      +
                    </button>
                  </div>
                </div>
              </form>
            </div>

            {/* Footer / Action */}
            <div className="px-6 md:px-10 py-6 border-t border-black/5 bg-white rounded-b-[40px] shrink-0 mt-auto">
              <button
                form="order-form"
                type="submit"
                disabled={loading}
                className="w-full h-16 flex items-center justify-center gap-3 bg-primary text-white text-xs md:text-sm font-black uppercase tracking-widest rounded-full hover:bg-secondary transition-all shadow-xl shadow-primary/20 active:scale-95 disabled:opacity-60"
              >
                {loading ? (
                  <Loader2 size={24} className="animate-spin" />
                ) : (
                  `Confirm Order - ₹${item.price * Number(form.quantity)}`
                )}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
