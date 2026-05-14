import React from 'react';
import Link from 'next/link';

export default function ContactBanner() {
  return (
    <section className="w-full bg-[#1b1c1c] text-white py-24 px-4 text-center font-sans flex flex-col items-center justify-center">
      <div className="max-w-3xl mx-auto flex flex-col items-center">
        
        {/* Main Heading */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#c7d1cc] mb-6">
          Feel Free To Contact Us
        </h2>

        {/* Description Text */}
        <p className="text-xs sm:text-sm text-neutral-400 max-w-xl leading-relaxed mb-8 font-light">
          Have questions about our products, pricing, or importation process? Our team is ready to assist you every step of the way — from procurement to delivery at your doorstep.
        </p>

        {/* Social Media SVG Icons Row */}
        <div className="flex items-center space-x-6 text-neutral-400 mb-10">
          {/* Facebook */}
          <Link href="#" aria-label="Facebook" className="hover:text-white transition-colors">
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/>
            </svg>
          </Link>

          {/* Twitter / X */}
          <Link href="#" aria-label="Twitter" className="hover:text-white transition-colors">
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </Link>

          {/* Instagram */}
          <Link href="#" aria-label="Instagram" className="hover:text-white transition-colors">
            <svg className="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
          </Link>

          {/* TikTok */}
          <Link href="#" aria-label="TikTok" className="hover:text-white transition-colors">
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M12.525.01c1.306-.022 2.616-.01 3.921-.01.103 1.748.94 3.324 2.308 4.394.025.82-.016 1.647-.01 2.47-1.14-.08-2.22-.525-3.075-1.274-.06 1.76-.02 3.522-.043 5.28-.11 3.473-2.83 6.44-6.326 6.41-3.593.102-6.736-2.583-6.826-6.19-.19-4.22 3.63-7.51 7.643-6.612.008 1.135-.015 2.274-.003 3.41-1.636-.502-3.52.264-4.04 1.877-.66 1.765.45 3.822 2.296 4.133 1.956.443 4.02-.916 4.144-2.92.05-3.322.015-6.647.022-9.972z"/>
            </svg>
          </Link>

          {/* YouTube */}
          <Link href="#" aria-label="YouTube" className="hover:text-white transition-colors">
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
          </Link>
        </div>

        {/* Contact Us Action Button */}
        <Link 
          href="#" 
          className="px-12 py-2.5 text-xs font-semibold text-neutral-800 bg-[#e3e6e4] rounded hover:bg-white transition-colors duration-200 tracking-wide"
        >
          Contact us
        </Link>

      </div>
    </section>
  );
}
