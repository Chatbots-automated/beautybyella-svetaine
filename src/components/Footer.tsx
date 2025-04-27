import React from 'react';

const Footer = () => {
  return (
    <footer id="contact" className="bg-background pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-serif mb-4">Beauty by Ella</h2>
            <p className="text-text-secondary mb-6 max-w-xs">
              Natūrali kosmetika jūsų grožiui ir švytinčiai odai. Aukščiausia kokybė ir rūpestis jumis.
            </p>
            <div className="flex items-center space-x-4">
              <a href="#" className="text-text-primary hover:text-accent transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                </svg>
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
              <p>+370 600 00000</p>
            </address>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-8 text-center">
          <p className="text-sm text-text-secondary">
            &copy; {new Date().getFullYear()} Beauty by Ella. Visos teisės saugomos.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;