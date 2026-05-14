import React from 'react';
import Image from 'next/image';

const services = [
  {
    title: 'COMPUTER MAINTENANCE',
    image: '/images/item 1.png', // Replace with your image paths
  },
  {
    title: 'COMPUTER HARDWARE SALES',
    image: '/images/item 2.png',
  },
  {
    title: 'COMPUTER HARDWARE SUPPLY',
    image: '/images/item 3.png',
  },
  {
    title: 'WEB DESIGN SERVICE',
    image: '/images/item 4.png',
  },
];

export default function ServicesSection() {
  return (
    <section className="w-full bg-[#f9f9f9] py-16 px-4 md:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Heading */}
        <h2 className="text-xl sm:text-2xl font-bold text-[#8fa296] uppercase tracking-wide mb-10 pl-2">
          Our Services
        </h2>

        {/* Services Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="flex flex-col bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border border-neutral-100"
            >
              {/* Image Container */}
              <div className="relative aspect-[4/3] w-full bg-neutral-200">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  sizes="(max-w-7xl) 25vw, 100vw"
                  className="object-cover"
                  priority={index === 0}
                />
              </div>

              {/* Title Text Area */}
              <div className="bg-[#f0f0f0] py-5 px-4 text-center border-t border-neutral-200">
                <h3 className="text-[11px] sm:text-xs font-bold text-neutral-800 tracking-wider uppercase">
                  {service.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
