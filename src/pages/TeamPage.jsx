import React from "react";

const teamMembers = [
  {
    name: "Gökhan Özdemir",
    role: "Project Manager",
    company: "Workintech",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&q=80",
    bgColor: "bg-[#E0A899]",
  },
  {
    name: "Doğukan Bayar",
    role: "Full Stack Developer",
    company: "Bandage",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
    bgColor: "bg-[#79B4D9]",
  },
  {
    name: "Ronald Richards",
    role: "Frontend Developer",
    company: "Starbucks",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&q=80",
    bgColor: "bg-[#E2B93B]",
  },
  {
    name: "Floyd Miles",
    role: "Backend Developer",
    company: "Facebook",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=80",
    bgColor: "bg-[#5D8AA8]",
  },
  {
    name: "Jane Cooper",
    role: "UI/UX Designer",
    company: "Mitsubishi",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=600&q=80",
    bgColor: "bg-[#E77C40]",
  },
  {
    name: "Robert Fox",
    role: "QA Engineer",
    company: "IBM",
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&q=80",
    bgColor: "bg-[#74A9CF]",
  },
  {
    name: "Leslie Alexander",
    role: "DevOps Engineer",
    company: "The Walt Disney Company",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&q=80",
    bgColor: "bg-[#8C92AC]",
  },
  {
    name: "Jacob Jones",
    role: "Product Owner",
    company: "Starbucks",
    image: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=600&q=80",
    bgColor: "bg-[#F3C053]",
  },
];

export default function TeamPage() {
  return (
    <div className="bg-white min-h-screen py-16 sm:py-24 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        {/* Başlık Alanı (Figma Meet Our Team) */}
        <div className="text-center mb-16 sm:mb-24 flex flex-col gap-3 max-w-lg">
          <h1 className="font-bold text-3xl sm:text-4xl text-[#252B42] tracking-tight">
            Meet Our Team
          </h1>
          <p className="text-sm font-normal text-[#737373] leading-relaxed">
            Problems trying to resolve the conflict between the two major realms of Classical physics: Newtonian mechanics
          </p>
        </div>

        {/* 8'li Ekip Üyeleri Grid'i (Masaüstü: 4 sütun x 2 satır, Mobil: 1 sütun) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 sm:gap-10 w-full max-w-6xl">
          {teamMembers.map((member, idx) => (
            <div key={idx} className="flex flex-col items-center text-center group">
              {/* Portre Kartı */}
              <div className="w-full aspect-square overflow-hidden bg-gray-100 mb-6">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition duration-500"
                />
              </div>

              {/* Bilgiler */}
              <h5 className="font-bold text-base text-[#252B42] tracking-tight mb-1">
                {member.name}
              </h5>
              <p className="text-xs font-bold text-[#737373] mb-1">
                {member.role}
              </p>
              <span className="text-xs font-medium text-[#BDBDBD]">
                {member.company}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
