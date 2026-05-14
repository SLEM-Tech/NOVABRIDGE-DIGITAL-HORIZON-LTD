import Link from "next/link";

export default function NewHero() {
  return (
    <>
    <main className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-10">
        
        {/* Small Tagline Sub-header */}
        <p className="text-[10px] sm:text-xs font-bold tracking-[0.4em] text-neutral-500 uppercase mb-4">
          Objects of Desire
        </p>

        {/* Large Main Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-neutral-200 leading-[1.15] mb-6 max-w-3xl">
          You Will Love This <br /> Awesome Handcraft
        </h1>

        {/* Placeholder Descriptive Body Text */}
        <p className="text-xs sm:text-sm text-neutral-400 max-w-2xl leading-relaxed mb-10 font-light">
          Source premium electronics, appliances, and more directly from China — delivered to your door across Nigeria with trusted quality and flexible payment plans.
        </p>

<Link href='/category' className="px-10 py-3 text-xs font-semibold text-black bg-neutral-100 rounded-md hover:bg-white transition-all duration-200 shadow-md tracking-wider"
        >
      
          
          Explore
        </Link>
      </main>
    
   
   
     </>
  );
}