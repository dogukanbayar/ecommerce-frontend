import React from "react";

const clientLogos = [
  { name: "Hooli", src: "/clients/hooli.png", height: "h-14 sm:h-16" },
  { name: "Lyft", src: "/clients/lyft.png", height: "h-12 sm:h-14" },
  { name: "Pied Piper", src: "/clients/piedpiper.png", height: "h-14 sm:h-16" },
  { name: "Stripe", src: "/clients/stripe.png", height: "h-11 sm:h-12" },
  { name: "AWS", src: "/clients/aws.png", height: "h-14 sm:h-16" },
  { name: "Reddit", src: "/clients/reddit.png", height: "h-16 sm:h-[72px]" },
];

export default function Clients({ className = "" }) {
  return (
    <section className={`bg-[#FAFAFA] py-16 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8 sm:gap-12 items-center justify-items-center">
          {clientLogos.map((client) => (
            <div
              key={client.name}
              className="flex items-center justify-center h-20 transition-transform duration-200 hover:scale-105"
            >
              <img
                src={client.src}
                alt={client.name}
                className={`${client.height} w-auto object-contain`}
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
