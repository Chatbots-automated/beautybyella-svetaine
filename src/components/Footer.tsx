import React from 'react';
import { Facebook, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer id="contact" className="bg-background pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-4 mb-6">
              <img 
                src="/beautybyellalogo.jpg" 
                alt="Beauty by Ella Logo" 
                className="h-16 w-16 rounded-full"
              />
              <h2 className="text-2xl font-serif">Beauty by Ella</h2>
            </div>
            <p className="text-text-secondary mb-6 max-w-xs">
              Beauty by Ella - tai vieta,kur kokybė susitinka su estetika.
            </p>
            <div className="flex items-center space-x-4">
              <a 
                href="https://www.facebook.com/profile.php?id=100083485518751" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-text-primary hover:text-accent transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="https://www.instagram.com/estetine_kosmetologija_evelina/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-text-primary hover:text-accent transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-serif mb-4">Greita navigacija</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-text-secondary hover:text-accent transition-colors">Pagrindinis</a></li>
              <li><a href="#about" className="text-text-secondary hover:text-accent transition-colors">Apie Mus</a></li>
              <li><a href="#categories" className="text-text-secondary hover:text-accent transition-colors">Kategorijos</a></li>
              <li><a href="#contact" className="text-text-secondary hover:text-accent transition-colors">Kontaktai</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-serif mb-4">Kategorijos</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-text-secondary hover:text-accent transition-colors">Manikiūrui / Pedikiūrui</a></li>
              <li><a href="#" className="text-text-secondary hover:text-accent transition-colors">Dulkių ištraukėjai</a></li>
              <li><a href="#" className="text-text-secondary hover:text-accent transition-colors">Rinkiniai pigiau</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-serif mb-4">Kontaktai</h3>
            <address className="not-italic text-text-secondary">
              <p className="mb-2">Giraitės g. 60A, Rubežius</p>
              <p className="mb-2">info@beautybyella.lt</p>
              <p><a href="tel:+37064027403" className="hover:text-accent transition-colors">+370 640 27403</a></p>
            </address>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-8 text-center">
          <p className="text-sm text-text-secondary">
            &copy; {new Date().getFullYear()} Beauty by Ella. Visos teisės saugomos.
          </p>
          <p className="text-sm text-text-secondary mt-2">
            Svetainę kūrė <a href="https://pagalvosiu.lt" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">Pagalvosiu.lt</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;