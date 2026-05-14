import Image from "@node_modules/next/image";
import Link from "next/link";

export default function NewHero() {
  return (
    <>
<section className="w-full bg-white pt-[200px] pb-[50px] px-4 md:px-8 font-sans select-none">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Primary Hero Card */}
        <div className="lg:col-span-2 bg-[#5151fa] rounded-[32px] p-8 sm:p-12 md:p-16 flex flex-col justify-between items-start text-white min-h-[380px]">
          <div className="max-w-xl">
            {/* Main Catchy Heading */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 sm:mb-6 leading-[1.1]">
              Dress Your Tech in Color.
            </h2>
            
            {/* Descriptive Body Copy */}
            <p className="text-sm sm:text-base font-normal opacity-90 leading-relaxed max-w-md">
              Ultra-protective cases for the chronically vibrant. 
              Engineered for drops, designed for double-takes.
            </p>
          </div>

          {/* Action Navigation Link */}
          <Link 
            href="/category" 
            className="mt-8 px-8 py-3.5 bg-white text-[#5151fa] font-semibold text-sm rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.1)] hover:bg-neutral-50 hover:shadow-[0_6px_16px_rgba(0,0,0,0.15)] transition-all duration-200"
          >
            Shop Collection
          </Link>
        </div>

        {/* Right Eco Feature Card */}
        <div className="bg-[#008743] rounded-[32px] p-8 sm:p-12 flex flex-col items-center justify-center text-center text-white min-h-[380px]">
          {/* Minimal Leaf Graphic Icon */}
          <div className="mb-6 text-white transform hover:scale-105 transition-transform duration-200">
            <svg className="w-14 h-14 fill-current" viewBox="0 0 24 24">
              <path d="M17.11 3.17A10.87 10.87 0 0 0 12 4.5a10.87 10.87 0 0 0-5.11-1.33A10.89 10.89 0 0 0 2 12.39a11 11 0 0 0 11 11h.61a11 11 0 0 0 11-11 10.89 10.89 0 0 0-7.5-9.22zm-4.5 18.22a8.87 8.87 0 0 1-6.61-3A10.86 10.86 0 0 0 12 15.5a10.86 10.86 0 0 0 6 2.89 8.87 8.87 0 0 1-6.39 3z"/>
            </svg>
          </div>

          {/* Eco Card Subheading */}
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight mb-3">
            Plant-Based Protection
          </h3>

          {/* Eco Sub-paragraph Text */}
          <p className="text-xs sm:text-sm font-normal opacity-85 leading-relaxed max-w-[240px]">
            100% Compostable cases that don't cost the earth.
          </p>
        </div>

      </div>
    </section>
    
   
   
     </>
  );
}