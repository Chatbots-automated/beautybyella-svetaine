import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative min-h-[100dvh] flex items-center bg-gradient-to-br from-background via-white to-accent/10">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-1/3 w-64 h-64 bg-accent/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container-custom relative z-10">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="inline-flex items-center bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full mb-8">
              <Sparkles className="w-4 h-4 text-accent mr-2" />
              <span className="text-sm font-medium">Profesionali kosmetika</span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-serif tracking-tight mb-8 leading-[1.1]">
              Atraskite savo
              <span className="block text-accent mt-2">natūralų grožį</span>
            </h1>

            <p className="text-lg sm:text-xl text-text-secondary mb-12 max-w-2xl mx-auto leading-relaxed">
              Aukščiausios kokybės produktai, sukurti iš natūralių ingredientų, 
              skirti profesionaliai odos priežiūrai ir švytėjimui
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link 
                to="/collections" 
                className="btn-primary group"
              >
                Peržiūrėti kolekciją
                <span className="ml-2 transition-transform duration-300 inline-block group-hover:translate-x-1">→</span>
              </Link>
              <Link to="/about" className="btn-secondary">Sužinoti daugiau</Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div className="bg-white/50 backdrop-blur-sm p-6 rounded-2xl">
                <h4 className="text-3xl sm:text-4xl font-serif mb-2">150+</h4>
                <p className="text-text-secondary">Produktų</p>
              </div>
              <div className="bg-white/50 backdrop-blur-sm p-6 rounded-2xl">
                <h4 className="text-3xl sm:text-4xl font-serif mb-2">98%</h4>
                <p className="text-text-secondary">Natūralūs ingredientai</p>
              </div>
              <div className="bg-white/50 backdrop-blur-sm p-6 rounded-2xl">
                <h4 className="text-3xl sm:text-4xl font-serif mb-2">24/7</h4>
                <p className="text-text-secondary">Klientų aptarnavimas</p>
              </div>
              <div className="bg-white/50 backdrop-blur-sm p-6 rounded-2xl">
                <h4 className="text-3xl sm:text-4xl font-serif mb-2">5★</h4>
                <p className="text-text-secondary">Klientų įvertinimas</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent"></div>
    </section>
  );
};

export default Hero;