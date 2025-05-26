import React from 'react';

const Hero = () => {
  return (
    <section className="text-gray-800 body-font bg-teal-800">
      <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
        <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left  md:mb-0 items-center text-center">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
            Welcome to the concept store
          </h1>
          <p className="mb-8 leading-relaxed">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum, sequi sapiente itaque ad voluptatibus modi laudantium, alias voluptates minus accusamus temporibus recusandae, quas necessitatibus eos odit illo corporis? Veritatis, pariatur?
          </p>
          <div className="flex justify-center">
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
