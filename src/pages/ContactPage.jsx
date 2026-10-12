import React from "react";

export default function ContactPage() {
  return (
    <div className="bg-white min-h-[60vh] flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-2xl w-full flex flex-col items-center text-center gap-8">
        {/* Başlık (Figma: Get answers to all your questions.) */}
        <h1 className="font-bold text-3xl sm:text-4xl lg:text-5xl text-[#252B42] tracking-tight leading-tight">
          Get answers to all your questions.
        </h1>

        {/* Alt Açıklama Metni */}
        <p className="text-sm sm:text-base text-[#737373] max-w-lg leading-relaxed">
          Problems trying to resolve the conflict between the two major realms of Classical physics:
        </p>

        {/* Mavi Aksiyon Butonu (Figma: CONTACT OUR COMPANY) */}
        <a
          href="mailto:contact@bandage.com"
          className="px-9 py-4 bg-[#23A6F0] hover:bg-[#1a8cd8] text-white text-sm font-bold tracking-wider rounded-md transition shadow-md cursor-pointer"
        >
          CONTACT OUR COMPANY
        </a>

        {/* Sosyal Medya İkonları (Figma: Twitter, Facebook, Instagram, LinkedIn) */}
        <div className="flex items-center gap-6 text-[#737373] pt-4">
          {/* Twitter */}
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-[#23A6F0] transition"
            aria-label="Twitter"
          >
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.936 9.936 0 0024 4.59z" />
            </svg>
          </a>

          {/* Facebook */}
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-[#23A6F0] transition"
            aria-label="Facebook"
          >
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          </a>

          {/* Instagram */}
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-[#23A6F0] transition"
            aria-label="Instagram"
          >
            <svg className="w-6 h-6 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
            </svg>
          </a>

          {/* LinkedIn */}
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-[#23A6F0] transition"
            aria-label="LinkedIn"
          >
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
