import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Categories from '../components/Categories';
import Newsletter from '../components/Newsletter';

const Home = () => {
  return (
    <>
      <Hero />
      <About />
      <Categories />
      <Newsletter />
    </>
  );
};

export default Home;