import Link from "@node_modules/next/link";

export default function NewHero() {
  return (
    <div className="absolute inset-0 flex flex-col justify-center items-center gap-8 md:gap-12 px-4 md:px-8 lg:px-16 py-12 md:py-20 z-10">
      <div className="flex flex-col items-center gap-6 md:gap-8 max-w-5xl">
        <h1 className="text-white font-gilroyBold text-3xl md:text-5xl lg:text-7xl xl:text-[80px] leading-tight md:leading-[1.1] text-center tracking-[-0.06em]">
          Your Top Technology Service Provider
        </h1>
        <p className="text-white font-gilroyRegular text-lg md:text-xl lg:text-2xl leading-relaxed text-center tracking-[-0.02em] max-w-2xl">
          Your top technology service provider
        </p>
        <Link href='/category'>
                 <button className="cursor-pointer flex py-3.5 px-8 md:px-10 justify-center items-center gap-2 rounded-[5px] bg-[#D92D20] hover:bg-[#b82419] transition-colors mt-4 z-20">
          <span className="text-white font-gilroyRegular text-base md:text-lg leading-[1.4em] tracking-[0.0002em]">
            Shop Now
          </span>
        </button>
        </Link>
   
      </div>
    </div>
  );
}