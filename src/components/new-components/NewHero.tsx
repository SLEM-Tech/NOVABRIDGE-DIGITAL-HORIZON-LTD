import Image from "@node_modules/next/image";
import Link from "next/link";

export default function NewHero() {
  return (
    <>
<main className="flex-1 w-full max-w-7xl mx-auto pt-[200px] pb-[200px] px-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Typography Column */}
        <div className="flex flex-col items-start max-w-xl">
          {/* Main Serif Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-normal font-serif tracking-tight text-neutral-900 leading-[1.15] mb-6">
            Explore The Latest <br /> 
            Empowering <br /> 
            Trends
          </h1>

          {/* Descriptive Body Text */}
          <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mb-8 max-w-md">
            The ultimate destination for fashion forward individuals seeking to 
            elevate their style game! our mission is to empower you with the 
            latest and most inspiring fashion trends.
          </p>

          {/* Outline Call To Action Button */}
          <Link 
            href="/category" 
            className="group flex items-center space-x-2 px-6 py-3 border border-neutral-400 text-xs font-medium tracking-wide text-neutral-800 rounded-none hover:border-black hover:text-black transition-colors duration-200"
          >
            <span>Explore More</span>
            <span className="transform group-hover:translate-x-1 transition-transform duration-200">→</span>
          </Link>
        </div>

        {/* Right Feature Graphic Column */}
        <div className="w-full flex justify-center lg:justify-end">
          <div className="relative w-full max-w-lg aspect-[16/10] drop-shadow-[0_20px_35px_rgba(0,0,0,0.15)] transform -rotate-[12deg] hover:rotate-0 transition-transform duration-500 ease-out">
            <Image
              src="/images/bridgelinebackground.png" // Replace with your targeted local source pathway
              alt="Zebronics RGB Gaming Keyboard"
              fill
              sizes="(max-w-7xl) 50vw, 100vw"
              className="object-contain"
              priority
            />
          </div>
        </div>

      </main>
    
   
   
     </>
  );
}