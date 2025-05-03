import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Tag } from 'lucide-react';

const DiscountNotification = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Reset localStorage for testing
    localStorage.removeItem('discount-notification-shown');
    
    const hasSeenNotification = localStorage.getItem('discount-notification-shown');
    
    if (!hasSeenNotification) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 2000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem('discount-notification-shown', 'true');
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={handleClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-xl mx-4"
          >
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-gray-400" />
              </button>
              
              <div className="flex flex-col items-center text-center gap-6">
                <div className="bg-accent/10 p-4 rounded-full">
                  <Tag className="w-10 h-10 text-accent" />
                </div>
                
                <div>
                  <p className="text-xl font-serif mb-4">
                    Įveskite šį nuolaidos kodą darant apmokėjimą ir gaukite 5eur nuolaidą nuo galutinės sumos!
                  </p>
                  <div className="bg-background p-6 rounded-xl">
                    <span className="font-mono text-2xl font-medium">viešas123</span>
                  </div>
                </div>

                <button
                  onClick={handleClose}
                  className="btn-primary mt-2"
                >
                  Supratau
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default DiscountNotification;