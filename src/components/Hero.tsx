import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative min-h-[100dvh] flex items-center pt-20 md:pt-0" style={{ backgroundColor: '#FAF8F5' }}>
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-64 -right-64 w-[40rem] h-[40rem] rounded-full bg-accent/10 blur-3xl"></div>
        <div className="absolute top-1/3 -left-96 w-[50rem] h-[50rem] rounded-full bg-accent/5 blur-3xl"></div>
      </div>

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <div className="inline-flex items-center bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-accent mr-2" />
              <span className="text-sm font-medium">Naujausia kolekcija</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-serif tracking-wide mb-6 leading-tight">
              Atrask savo<br />
              <span className="text-accent">grožio ritualą</span>
            </h1>

            <p className="text-lg md:text-xl text-text-secondary mb-8 max-w-lg mx-auto lg:mx-0">
              Prabangūs produktai, sukurti iš natūralių ingredientų, skirti jūsų odos priežiūrai ir švytėjimui
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/collections" className="btn-primary">Peržiūrėti kolekciją</Link>
              <Link to="/about" className="btn-secondary">Sužinoti daugiau</Link>
            </div>

            <div className="grid grid-cols-3 gap-4 sm:gap-8 mt-12 sm:mt-16">
              <div>
                <h4 className="text-2xl sm:text-3xl font-serif mb-2">150+</h4>
                <p className="text-text-secondary text-xs sm:text-sm">Produktų</p>
              </div>
              <div>
                <h4 className="text-2xl sm:text-3xl font-serif mb-2">98%</h4>
                <p className="text-text-secondary text-xs sm:text-sm">Natūralūs ingredientai</p>
              </div>
              <div>
                <h4 className="text-2xl sm:text-3xl font-serif mb-2">24/7</h4>
                <p className="text-text-secondary text-xs sm:text-sm">Klientų aptarnavimas</p>
              </div>
            </div>
          </motion.div>

          {/* Image Column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative block"
          >
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://i.imgur.com/peBunNH.png"
                alt="Luxury beauty products"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent"></div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent"></div>
    </section>
  );
};

export default Hero;