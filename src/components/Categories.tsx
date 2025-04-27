import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const featuredCategories = [
  {
    title: "Veido priežiūra",
    image: "https://images.pexels.com/photos/3762892/pexels-photo-3762892.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description: "Prabangūs serumai ir kremai jūsų odos švytėjimui"
  },
  {
    title: "Makiažas",
    image: "https://images.pexels.com/photos/2688991/pexels-photo-2688991.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description: "Profesionalūs makiažo produktai"
  },
  {
    title: "Plaukų priežiūra",
    image: "https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description: "Šampūnai ir priemonės plaukų sveikatai"
  }
];

const Categories = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h6 className="text-accent uppercase tracking-widest text-sm font-medium mb-3">
            Kategorijos
          </h6>
          <h2 className="text-3xl md:text-4xl font-serif mb-6">Atraskite savo grožio ritualą</h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Tyrinėkite mūsų kruopščiai atrinktą prabangios kosmetikos kolekciją, sukurtą išryškinti jūsų natūralų grožį
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link 
                to={`/collections?category=${encodeURIComponent(category.title)}`}
                className="group block"
              >
                <div className="relative h-[400px] overflow-hidden rounded-2xl mb-6">
                  <img
                    src={category.image}
                    alt={category.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent transition-opacity duration-300 group-hover:opacity-70" />
                  <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                    <h3 className="text-2xl font-serif mb-2">{category.title}</h3>
                    <p className="text-white/80 text-sm">{category.description}</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link 
            to="/collections" 
            className="btn-primary inline-flex items-center group"
          >
            Visos kategorijos
            <span className="ml-2 transform transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Categories;