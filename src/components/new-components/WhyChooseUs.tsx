import React from 'react';

export default function WhyChooseUs() {
  return (
    <section className="w-full bg-white text-black py-20 px-6 sm:px-12 font-sans select-none">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        
        {/* Section Title */}
        <h2 className="text-3xl sm:text-4xl font-normal font-serif tracking-tight text-neutral-900 text-center mb-16">
          Why Choose Us?
        </h2>

        {/* Features Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start w-full">
          
          {/* Feature 1: Secure Payment */}
          <div className="flex flex-col items-start text-left">
            <div className="flex items-center space-x-2 text-neutral-800 mb-3">
              {/* Credit Card / Secure Payment Icon */}
              <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
              </svg>
              <h3 className="text-sm font-semibold tracking-wide text-neutral-900">
                Secure Payment
              </h3>
            </div>
            <p className="text-xs text-neutral-600 leading-relaxed font-light">
              Provide you with peace of mind while making purchases on here with our 
              commitment to secure payments, you can confidently shop for your favorite 
              accessory without any worries.
            </p>
          </div>

          {/* Feature 2: Fast Delivery */}
          <div className="flex flex-col items-start text-left">
            <div className="flex items-center space-x-2 text-neutral-800 mb-3">
              {/* Delivery Truck Icon */}
              <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0zM19.5 18.75a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0zM2.25 15h13.5m3 0h2.25a1.5 1.5 0 001.5-1.5V10.5A1.5 1.5 0 0021 9h-3.75M15.75 9H9m0 0V4.5A1.5 1.5 0 007.5 3h-3M9 9h6.75M15.75 9v6" />
              </svg>
              <h3 className="text-sm font-semibold tracking-wide text-neutral-900">
                Fast delivery
              </h3>
            </div>
            <p className="text-xs text-neutral-600 leading-relaxed font-light">
              Allowing you to enjoy your new accessory without unnecessary delays, with our 
              commitment to fast delivery, you can expect your latest purchase to arrive in no 
              time.
            </p>
          </div>

          {/* Feature 3: Return Guarantee */}
          <div className="flex flex-col items-start text-left">
            <div className="flex items-center space-x-2 text-neutral-800 mb-3">
              {/* Quality Seal / Return Guarantee Icon */}
              <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
              </svg>
              <h3 className="text-sm font-semibold tracking-wide text-neutral-900">
                Return Guarantee
              </h3>
            </div>
            <p className="text-xs text-neutral-600 leading-relaxed font-light">
              Hassle-free return guarantee, we want you to be thrilled with your purchases from us 
              and in the unlikely event that you are not fully satisfied
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
