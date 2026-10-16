import React from "react";
import { Link } from "react-router-dom";
import { Play } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="bg-white flex flex-col w-full font-sans">
      {/* 1. HERO BÖLÜMÜ */}
      <section className="py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-6">
            <h5 className="font-bold text-sm tracking-wider uppercase text-[#252B42]">
              ABOUT COMPANY
            </h5>
            <h1 className="font-black text-4xl sm:text-5xl lg:text-6xl text-[#252B42] tracking-tight">
              ABOUT US
            </h1>
            <p className="text-base text-[#737373] max-w-sm">
              We know how large objects will act, but things on a small scale.
            </p>
            <Link
              to="/contact"
              className="px-8 py-3.5 bg-[#23A6F0] hover:bg-[#1a8cd8] text-white font-bold text-sm rounded-md transition shadow-md cursor-pointer"
            >
              Get Quote Now
            </Link>
          </div>

          <div className="flex justify-center relative">
            <div className="relative w-full max-w-md aspect-square">
              <div className="absolute inset-0 bg-[#FFE9EA] rounded-full scale-95 -z-10" />
              <img
                src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80"
                alt="About Hero Model"
                className="w-full h-full object-cover object-top rounded-full shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. PROBLEM & DESCRIPTION */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          <div className="flex flex-col gap-4">
            <span className="text-xs font-bold text-[#E74040]">Problems trying</span>
            <h2 className="font-bold text-2xl text-[#252B42] leading-snug">
              Met minim Mollie non desert Alamo est sit cliquey dolor do met sent.
            </h2>
          </div>
          <div>
            <p className="text-sm text-[#737373] leading-relaxed">
              Problems trying to resolve the conflict between the two major realms of Classical physics: Newtonian mechanics
            </p>
          </div>
        </div>
      </section>

      {/* 3. STATS (METRİKLER) */}
      <section className="py-16 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="flex flex-col gap-1">
            <span className="font-black text-5xl text-[#252B42]">15K</span>
            <span className="font-bold text-sm text-[#737373]">Happy Customers</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-black text-5xl text-[#252B42]">150K</span>
            <span className="font-bold text-sm text-[#737373]">Monthly Visitors</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-black text-5xl text-[#252B42]">15</span>
            <span className="font-bold text-sm text-[#737373]">Countries Worldwide</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-black text-5xl text-[#252B42]">100+</span>
            <span className="font-bold text-sm text-[#737373]">Top Partners</span>
          </div>
        </div>
      </section>

      {/* 4. MEET OUR TEAM (Figma'da Stats'ın hemen altında) */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
          <div className="text-center mb-16 flex flex-col gap-2 max-w-md">
            <h2 className="font-black text-3xl text-[#252B42]">Meet Our Team</h2>
            <p className="text-sm text-[#737373]">
              Problems trying to resolve the conflict between the two major realms of Classical physics
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl">
            {[
              {
                name: "Gökhan Özdemir",
                role: "Project Manager",
                image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&q=80",
              },
              {
                name: "Doğukan Bayar",
                role: "Full Stack Developer",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
              },
              {
                name: "Floyd Miles",
                role: "UI/UX Designer",
                image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=80",
              },
            ].map((m, idx) => (
              <div key={idx} className="flex flex-col items-center text-center">
                <div className="w-full aspect-square overflow-hidden bg-gray-100 mb-4">
                  <img src={m.image} alt={m.name} className="w-full h-full object-cover" />
                </div>
                <h5 className="font-bold text-base text-[#252B42]">{m.name}</h5>
                <span className="text-xs font-bold text-[#737373] mt-1">{m.role}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. BIG COMPANIES ARE HERE (Marka Logoları) */}
      <section className="bg-[#FAFAFA] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
          <div className="text-center mb-12 flex flex-col gap-2">
            <h2 className="font-black text-3xl text-[#252B42]">Big Companies Are Here</h2>
            <p className="text-sm text-[#737373] max-w-md">
              Problems trying to resolve the conflict between the two major realms of Classical physics
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-10 items-center justify-items-center w-full text-[#737373]">
            {/* Hooli */}
            <div className="h-10 flex items-center justify-center">
              <svg className="h-8 fill-current" viewBox="0 0 100 35">
                <circle cx="16" cy="17" r="14" fill="none" stroke="currentColor" strokeWidth="4" />
                <circle cx="16" cy="17" r="6" fill="currentColor" />
                <text x="36" y="24" fontSize="18" fontWeight="bold" fontFamily="sans-serif" fill="currentColor">hooli</text>
              </svg>
            </div>
            {/* Lyft */}
            <div className="h-10 flex items-center justify-center">
              <svg className="h-7 fill-current" viewBox="0 0 70 30">
                <path d="M12 4v16a6 6 0 0 1-6 6H2v-4h4a2 2 0 0 0 2-2V4h4zm16 6h-4v14h4v-14zm-4-4a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm14 4h-4v4h-2v4h2v6h4v-6h4v-4h-4v-4zm18 4h-4l-3 7-3-7h-4l5 11-3 7h4l9-18z" />
              </svg>
            </div>
            {/* Pied Piper */}
            <div className="h-10 flex items-center justify-center">
              <svg className="h-9 fill-current" viewBox="0 0 110 35">
                <path d="M6 26c8-2 14-8 16-16-4 6-10 10-16 12v4zm18-18C20 4 14 2 8 2c2 6 6 11 12 14l4-8z" />
                <text x="30" y="24" fontSize="15" fontWeight="900" letterSpacing="-0.5" fontFamily="sans-serif" fill="currentColor">Pied Piper</text>
              </svg>
            </div>
            {/* Stripe */}
            <div className="h-10 flex items-center justify-center">
              <svg className="h-7 fill-current" viewBox="0 0 75 30">
                <path d="M11 12c-2.4-.8-3.4-1.3-3.4-2.3 0-1 1-1.6 2.7-1.6 2.3 0 4.6.8 6.4 1.8V4.5C14.7 3.6 12.5 3.2 10.2 3.2 5 3.2 1.5 5.9 1.5 10.3c0 4.2 2.6 6 6.8 7.3 2.8.9 3.7 1.6 3.7 2.6 0 1.2-1.2 1.8-3 1.8-2.6 0-5.3-1.1-7.4-2.4v5.4c2.3 1 4.9 1.5 7.4 1.5 5.5 0 9.2-2.7 9.2-7.2 0-4.3-2.6-6-7.2-7.1zM23 4.2v21.5h6V4.2h-6zm15 6.2c-1.8 0-3.3.4-4.5 1V3l-6 1.3v21.4h6v-10c1.2-.7 2.6-1.1 4-1.1v-4.2zm11 4.5v-4.3h-4.2V4.2l-6 1.3v5.1h-3v4.3h3v10.8h6V14.9h4.2zm15-4.5c-2.2 0-4 .9-5.1 2.3V4.2l-6 1.3v20.2h6v-8.8c0-2.3 1.6-3.8 3.6-3.8.5 0 1 .1 1.5.2V10.4z" />
              </svg>
            </div>
            {/* AWS */}
            <div className="h-10 flex items-center justify-center">
              <svg className="h-8 fill-current" viewBox="0 0 70 35">
                <text x="2" y="20" fontSize="18" fontWeight="bold" fontFamily="sans-serif" fill="currentColor">aws</text>
                <path d="M4 27c18 6 38 6 56-2-2 3-5 5-9 6-15 4-33 3-47-4z" />
                <path d="M62 23l2 4-5 1 3-5z" />
              </svg>
            </div>
            {/* Reddit */}
            <div className="h-10 flex items-center justify-center">
              <svg className="h-8 fill-current" viewBox="0 0 85 30">
                <circle cx="12" cy="15" r="9" fill="none" stroke="currentColor" strokeWidth="2.5" />
                <circle cx="8" cy="13" r="1.5" />
                <circle cx="16" cy="13" r="1.5" />
                <path d="M9 18c2 2 4 2 6 0" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <text x="26" y="21" fontSize="16" fontWeight="bold" fontFamily="sans-serif" fill="currentColor">reddit</text>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* 6. VIDEO SECTION (Marka logolarının hemen altında) */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl group flex items-center justify-center">
            <img
              src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&q=80"
              alt="Video Showcase"
              className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
            />
            <div className="absolute inset-0 bg-black/20" />
            <button
              className="relative w-16 h-16 sm:w-20 sm:h-20 bg-[#23A6F0] text-white rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition cursor-pointer"
              aria-label="Play Video"
            >
              <Play className="w-8 h-8 fill-current ml-1" />
            </button>
          </div>
        </div>
      </section>

      {/* 7. WORK WITH US BANNER (En alttaki mavi sol alan ve pembe kazaklı kadın görseli) */}
      <section className="bg-white overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[500px]">
          <div className="lg:col-span-7 bg-[#2A7CC7] text-white flex flex-col justify-center items-center lg:items-start text-center lg:text-left p-8 sm:p-16 lg:p-24 gap-6">
            <h5 className="font-bold text-sm tracking-wider uppercase text-sky-100">
              WORK WITH US
            </h5>
            <h2 className="font-black text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-tight">
              Now Let's grow Yours
            </h2>
            <p className="text-sm sm:text-base text-sky-100 max-w-md">
              The gradual accumulation of information about atomic and small-scale behavior during the first quarter of the 20th
            </p>
            <button className="px-8 py-3 border border-white text-white font-bold text-sm rounded-md hover:bg-white hover:text-[#2A7CC7] transition cursor-pointer">
              Button
            </button>
          </div>

          <div className="lg:col-span-5 bg-gray-100 flex items-center justify-center overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80"
              alt="Work With Us Model"
              className="w-full h-full object-cover min-h-[350px]"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
