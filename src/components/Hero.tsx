import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative min-h-[100dvh] bg-background">
      <div className="container-custom relative z-10 min-h-[100dvh] flex">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 py-32">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 max-w-2xl"
          >
            <div className="inline-flex items-center bg-white px-4 py-2 rounded-full shadow-soft mb-8">
              <Sparkles className="w-4 h-4 text-accent mr-2" />
              <span className="text-sm font-medium">Profesionali kosmetika</span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif tracking-tight mb-8 leading-[1.1]">
              Beauty by Ella - profesionalams,kuriantiems grožį rankomis. Kruopščiai atrinkti nagų priežiūros produktai,skirti meistrams,kurie vertina kokybę,estetiką ir patikimumą.
            </h1>

            <div className="flex flex-wrap gap-4 mb-12">
              <Link to="/collections" className="btn-primary group">
                Peržiūrėti kolekciją
                <span className="ml-2 transition-transform duration-300 inline-block group-hover:translate-x-1">→</span>
              </Link>
              <Link to="/about" className="btn-secondary">Sužinoti daugiau</Link>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <h4 className="text-3xl font-serif mb-1">150+</h4>
                <p className="text-text-secondary">Produktų</p>
              </div>
              <div>
                <h4 className="text-3xl font-serif mb-1">98%</h4>
                <p className="text-text-secondary">Natūralūs ingredientai</p>
              </div>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="flex-1 relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://i.imgur.com/tf8pHsZ.png"
                alt="Beauty by Ella product"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;