import { motion } from 'framer-motion';

export default function MenuCard({ item, onOrder }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      className="bg-white rounded-[32px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col group border border-black/5"
    >
      {/* Product Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={item.image || '/menu_flatlay.png'}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          alt={item.name}
        />
        
        {!item.availability && (
          <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] flex items-center justify-center">
            <span className="bg-primary text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 md:p-8 flex-grow flex flex-col justify-between">
        <div className="text-center mb-6">
          <h3 className="font-playfair text-lg md:text-xl font-bold text-primary mb-2 uppercase tracking-wide group-hover:text-secondary transition-colors">
            {item.name}
          </h3>
          <p className="text-primary font-bold text-xl">₹{item.price}</p>
        </div>
        
        <button
          onClick={() => item.availability && onOrder(item)}
          disabled={!item.availability}
          className={`w-full h-12 flex items-center justify-center rounded-full text-[11px] font-black uppercase tracking-widest transition-all shadow-md active:scale-95 ${
            item.availability 
              ? 'bg-primary text-white hover:bg-secondary shadow-primary/20' 
              : 'bg-dark/10 text-dark/40 cursor-not-allowed shadow-none'
          }`}
        >
          {item.availability ? 'Quick Order' : 'Unavailable'}
        </button>
      </div>
    </motion.div>
  );
}
