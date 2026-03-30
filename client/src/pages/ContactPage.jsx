import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../api/axios';

const INFO_ITEMS = [
  {
    icon: MapPin,
    label: 'Official Address',
    value: '77 5-36, West Street, Trichy to Dindigul Road,\nPolangulathupatti, Ammapettai,\nTrichy, Tamil Nadu 620009',
  },
  {
    icon: Phone,
    label: 'Customer Support',
    value: '+91 98765 43210\nhello@freddobistro.com',
  },
  {
    icon: Clock,
    label: 'Operation Hours',
    value: 'Mon – Sun: 7:00 AM – 11:00 PM',
  },
];

export default function ContactPage() {
  const [form, setForm]       = useState({ name: '', phone: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.message.trim()) { toast.error('Please enter a message.'); return; }
    setLoading(true);
    try {
      await api.post('/api/contact', form);
      toast.success("Message received! We'll be in touch soon. ☕");
      setForm({ name: '', phone: '', message: '' });
    } catch {
      toast.error('Could not send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-light-cream pt-28 md:pt-36 pb-20 overflow-x-hidden">
      <div className="container mx-auto px-4">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16 md:mb-20"
        >
          <span className="text-secondary font-black text-[10px] uppercase tracking-[0.3em] mb-3 block">
            We'd love to hear from you
          </span>
          <h1 className="font-playfair text-4xl md:text-6xl font-black text-primary leading-tight mb-4">
            Get In Touch
          </h1>
          <div className="w-16 h-1.5 bg-accent mx-auto rounded-full" />
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start max-w-6xl mx-auto">

          {/* ── Info Column ── */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="w-full lg:w-5/12"
          >
            {/* Map Embed Placeholder */}
            <div className="relative aspect-video w-full rounded-[32px] overflow-hidden shadow-lg mb-8 bg-primary/5">
              <iframe
                title="Freddo Bistro Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.7!2d78.68!3d10.85!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTDCsDUxJzAwLjAiTiA3OMKwNDAnNDguMCJF!5e0!3m2!1sen!2sin!4v1680000000000!5m2!1sen!2sin"
                className="w-full h-full border-0 grayscale hover:grayscale-0 transition-all duration-700"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Info Items */}
            <div className="flex flex-col gap-0 divide-y divide-black/5">
              {INFO_ITEMS.map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-start gap-4 py-6">
                  <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon size={16} className="text-secondary" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary mb-1">{label}</p>
                    <p className="text-primary font-bold text-sm md:text-base whitespace-pre-line leading-relaxed">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── Form Column ── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="w-full lg:w-7/12"
          >
            <div className="bg-white rounded-[40px] p-8 md:p-12 shadow-sm border border-black/5">
              <h2 className="font-playfair text-2xl md:text-3xl font-black text-primary mb-8">Send an Inquiry</h2>

              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                {/* Name + Phone row: stacked on mobile, side-by-side on md+ */}
                <div className="flex flex-col md:flex-row gap-5">
                  <div className="flex-1 flex flex-col gap-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-dark/50">
                      Full Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      placeholder="John Doe"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="h-12 md:h-13 w-full px-5 rounded-2xl bg-light-cream border border-black/5 text-primary text-sm font-medium placeholder:text-dark/30 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                    />
                  </div>
                  <div className="flex-1 flex flex-col gap-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-dark/50">
                      Phone Number
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="h-12 md:h-13 w-full px-5 rounded-2xl bg-light-cream border border-black/5 text-primary text-sm font-medium placeholder:text-dark/30 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                    />
                  </div>
                </div>

                {/* Message */}
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-dark/50">
                    Your Message
                  </label>
                  <textarea
                    id="contact-message"
                    rows={6}
                    required
                    placeholder="How can we help you?"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    style={{ resize: 'none' }}
                    className="w-full px-5 py-4 rounded-2xl bg-light-cream border border-black/5 text-primary text-sm font-medium placeholder:text-dark/30 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>

                {/* Submit */}
                <button
                  id="contact-submit"
                  type="submit"
                  disabled={loading}
                  className="h-14 w-full flex items-center justify-center gap-3 bg-primary text-white text-xs font-black uppercase tracking-widest rounded-2xl hover:bg-secondary transition-all shadow-lg shadow-primary/10 active:scale-95 disabled:opacity-60 mt-2"
                >
                  {loading ? (
                    <span className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
                  ) : (
                    <>
                      <Send size={16} />
                      Submit Inquiry
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
