import { useState } from 'react';
import toast from 'react-hot-toast';
import api from '../api/axios';

export default function ContactPage() {
  const [form, setForm]       = useState({ name: '', phone: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.message.trim()) { toast.error('Please enter a message.'); return; }

    setLoading(true);
    try {
      await api.post('/contact', form);
      toast.success('Message received! We\'ll be in touch soon. ☕');
      setForm({ name: '', phone: '', message: '' });
    } catch {
      toast.error('Could not send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100 bg-light-cream pt-5 mt-5">


      <div className="container py-5">
        <div className="row g-5 align-items-start">
          
          {/* Info Column */}
          <div className="col-lg-5 col-md-11 mx-auto text-center text-lg-start fade-in-up" style={{ animationDelay: '0.1s' }}>
            <div className="mb-5">
              <span className="badge bg-highlight px-3 py-2 rounded-pill text-uppercase mb-3">Visit Us Today</span>
              <h2 className="display-6 fw-bold text-dark mb-4">Our Bistro Location</h2>
              <p className="text-secondary fs-5 leading-relaxed">
                Whether you’re craving a quiet brew or a chat, our doors are always open for you. Find us at the heart of Trichy.
              </p>
            </div>

            <div className="row g-4">
                {[
                    { label: 'Official Address', val: '77 5-36 , west street,\nTrichy to dindigul road, polangulathupatti,\nAmmapettai, Trichy, Tamil Nadu 620009' },
                    { label: 'Customer Support', val: '+91 98765 43210\nhello@freddobistro.com' },
                    { label: 'Operation Hours', val: 'Mon - Sun: 7:00 AM – 11:00 PM' },
                ].map(({ label, val }) => (
                    <div key={label} className="col-12 border-bottom border-light pb-4">
                        <p className="text-primary text-uppercase fw-bold tracing-widest mb-2 fs-small">{label}</p>
                        <p className="text-dark fs-5 fw-bold leading-relaxed whitespace-pre-line mb-0">{val}</p>
                    </div>
                ))}
            </div>
          </div>

          {/* Form Column */}
          <div className="col-lg-7 fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="bg-white p-5 p-lg-5 rounded-4 shadow-sm border border-light transition-all">
                <h3 className="fw-bold mb-5 text-dark">Send an Inquiry</h3>
                <form onSubmit={handleSubmit} className="row g-4">
                    <div className="col-md-6 col-12">
                        <label className="text-secondary text-uppercase fw-bold tracking-widest fs-small mb-2 ms-2">Full Name</label>
                        <input
                            type="text"
                            required
                            placeholder="John Doe"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            className="form-control form-control-lg rounded-pill px-4 fs-small"
                        />
                    </div>

                    <div className="col-md-6 col-12">
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

                    <div className="col-12">
                        <label className="text-secondary text-uppercase fw-bold tracking-widest fs-small mb-2 ms-2">Your Message</label>
                        <textarea
                            rows={5}
                            required
                            placeholder="How can we help you?"
                            value={form.message}
                            onChange={(e) => setForm({ ...form, message: e.target.value })}
                            className="form-control form-control-lg rounded-4 px-4 fs-small"
                            style={{ resize: 'none' }}
                        />
                    </div>

                    <div className="col-12 mt-5">
                      <button
                          type="submit"
                          disabled={loading}
                          className="btn btn-primary btn-lg rounded-pill w-100 py-3 text-uppercase fw-bold shadow-sm"
                      >
                          {loading ? 'Sending Request…' : 'Submit Inquiry'}
                      </button>
                    </div>
                </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
