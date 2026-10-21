import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 mt-auto">
      {/* Üst Kısım: Logo & Sosyal Medya */}
      <div className="bg-[#FAFAFA] py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link to="/" className="text-2xl font-extrabold text-[#252B42] tracking-tight">
            Bandage
          </Link>
          <div className="flex items-center gap-5 text-[#23A6F0]">
            {/* Facebook */}
            <a href="#" className="hover:opacity-80 transition" aria-label="Facebook">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
            {/* Instagram */}
            <a href="#" className="hover:opacity-80 transition" aria-label="Instagram">
              <svg className="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </a>
            {/* Twitter */}
            <a href="#" className="hover:opacity-80 transition" aria-label="Twitter">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.936 9.936 0 0024 4.59z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Orta Kısım: Link Grupları */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 text-sm">
          <div>
            <h5 className="font-bold text-[#252B42] mb-4">Company Info</h5>
            <ul className="space-y-2.5 font-semibold text-gray-500">
              <li><Link to="#" className="hover:text-[#23A6F0] transition">About Us</Link></li>
              <li><Link to="#" className="hover:text-[#23A6F0] transition">Carrier</Link></li>
              <li><Link to="#" className="hover:text-[#23A6F0] transition">We are hiring</Link></li>
              <li><Link to="#" className="hover:text-[#23A6F0] transition">Blog</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-[#252B42] mb-4">Legal</h5>
            <ul className="space-y-2.5 font-semibold text-gray-500">
              <li><Link to="#" className="hover:text-[#23A6F0] transition">About Us</Link></li>
              <li><Link to="#" className="hover:text-[#23A6F0] transition">Carrier</Link></li>
              <li><Link to="#" className="hover:text-[#23A6F0] transition">We are hiring</Link></li>
              <li><Link to="#" className="hover:text-[#23A6F0] transition">Blog</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-[#252B42] mb-4">Features</h5>
            <ul className="space-y-2.5 font-semibold text-gray-500">
              <li><Link to="#" className="hover:text-[#23A6F0] transition">Business Marketing</Link></li>
              <li><Link to="#" className="hover:text-[#23A6F0] transition">User Analytics</Link></li>
              <li><Link to="#" className="hover:text-[#23A6F0] transition">Live Chat</Link></li>
              <li><Link to="#" className="hover:text-[#23A6F0] transition">Unlimited Support</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-[#252B42] mb-4">Resources</h5>
            <ul className="space-y-2.5 font-semibold text-gray-500">
              <li><Link to="#" className="hover:text-[#23A6F0] transition">IOS & Android</Link></li>
              <li><Link to="#" className="hover:text-[#23A6F0] transition">Watch a Demo</Link></li>
              <li><Link to="#" className="hover:text-[#23A6F0] transition">Customers</Link></li>
              <li><Link to="#" className="hover:text-[#23A6F0] transition">API</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-[#252B42] mb-4">Get In Touch</h5>
            <div className="flex flex-col gap-2">
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your Email"
                  className="px-3 py-2 bg-gray-50 border border-gray-300 rounded-l-md text-xs focus:outline-none focus:border-[#23A6F0] w-full"
                />
                <button className="px-4 py-2 bg-[#23A6F0] text-white text-xs font-semibold rounded-r-md hover:bg-[#1a8cd8] transition">
                  Subscribe
                </button>
              </div>
              <p className="text-[11px] text-gray-400">Lore imp sum dolor Amit</p>
            </div>
          </div>
        </div>
      </div>

      {/* Alt Telif */}
      <div className="bg-[#FAFAFA] py-6 text-center text-xs font-semibold text-gray-500">
        Made With Love By Finland All Right Reserved
      </div>
    </footer>
  );
}
