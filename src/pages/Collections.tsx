import React from 'react';
import { motion } from 'framer-motion';
import ProductGrid from '../components/ProductGrid';

const Collections = () => {
  return (
    <div className="py-32 bg-background min-h-screen">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h6 className="text-accent uppercase tracking-widest text-sm font-medium mb-3">
            Mūsų Kolekcija
          </h6>
          <h1 className="text-4xl md:text-5xl font-serif mb-6">Atraskite Mūsų Produktus</h1>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Tyrinėkite mūsų kruopščiai atrinktą prabangios kosmetikos kolekciją, sukurtą išryškinti jūsų natūralų grožį ir patobulinti odos priežiūros rutiną.
          </p>
        </motion.div>

        <ProductGrid />
      </div>
    </div>
  );
};

export default Collections;