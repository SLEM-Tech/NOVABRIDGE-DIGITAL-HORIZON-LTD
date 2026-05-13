import Link from "@node_modules/next/link";

export default function Subscribe() {
  return (
    <div className="w-full px-4 md:px-8 lg:px-[110px] py-8 md:py-12">
      <div className="relative flex flex-col items-start gap-5 py-8 md:py-12 lg:py-[44px] px-6 md:px-12 lg:px-[78px] rounded-[20px] bg-[#8326A1] overflow-hidden">
        {/* <img
          src="/Rectangle920434.png"
          className="absolute right-0 top-0 w-[300px] md:w-[400px] lg:w-[559px] h-auto opacity-50 md:opacity-100"
          alt="Rectangle 920434"
        /> */}
        <div className="relative z-10 flex flex-col items-start gap-5 w-full">
          <h2 className="text-white font-quicksand text-3xl md:text-5xl lg:text-5xl font-bold leading-tight">
            Stay home &amp; get your order Delivered
          </h2>
          <p className="text-white/80 font-lato text-base md:text-lg leading-7">
            Start Your Daily Shopping Now
          </p>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto mt-4">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 py-4 px-6 rounded-[50px] bg-white text-[#838383] font-lato text-base outline-none min-w-0 sm:min-w-[300px]"
            />
            <Link href='/user/register'>
                <button className="py-4 px-8 rounded-[50px] bg-[#D92D20] text-white font-quicksand text-base font-medium whitespace-nowrap hover:bg-[#b82419] transition-colors">
                  Subscribe
                </button>
            </Link>
          
          </div>
        </div>
      </div>
    </div>
  );
}