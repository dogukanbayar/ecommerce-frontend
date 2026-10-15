import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Search,
  ShoppingCart,
  Heart,
  Menu,
  X,
  User as UserIcon,
  LogOut,
  ChevronDown,
  Phone,
  Mail
} from "lucide-react";
import { setUser } from "../store/actions/clientActions";
import { api } from "../api/api";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const user = useSelector((state) => state.client.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    delete api.defaults.headers.common["Authorization"];
    dispatch(setUser(null));
    navigate("/login");
  };

  return (
    <header className="flex flex-col w-full bg-white border-b border-gray-100 sticky top-0 z-50">
      {/* Top Bar (Desktop) */}
      <div className="hidden lg:flex bg-[#252B42] text-white text-xs font-bold py-3 px-8 justify-between items-center">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-1.5">
            <Phone className="w-4 h-4 text-white" />
            <span>(225) 555-0118</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Mail className="w-4 h-4 text-white" />
            <span>michelle.rivera@example.com</span>
          </div>
        </div>

        <div>
          <span>Follow Us and get a chance to win 80% off</span>
        </div>

        <div className="flex items-center gap-3">
          <span>Follow Us :</span>
          <div className="flex items-center gap-2.5">
            <a href="#" className="hover:opacity-80 transition" aria-label="Instagram">
              <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </a>
            <a href="#" className="hover:opacity-80 transition" aria-label="Youtube">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>
            <a href="#" className="hover:opacity-80 transition" aria-label="Facebook">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
            <a href="#" className="hover:opacity-80 transition" aria-label="Twitter">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.936 9.936 0 0024 4.59z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Ana Navbar */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-12">
          <Link to="/" className="text-2xl font-black text-[#252B42] tracking-tight">
            Bandage
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm font-bold text-[#737373]">
            <Link to="/" className="hover:text-[#23A6F0] transition">Home</Link>
            <div className="flex items-center gap-1 group relative cursor-pointer py-2">
              <Link to="/shop" className="hover:text-[#23A6F0] transition flex items-center gap-1">
                Shop <ChevronDown className="w-3.5 h-3.5" />
              </Link>
            </div>
            <Link to="#" className="hover:text-[#23A6F0] transition">About</Link>
            <Link to="#" className="hover:text-[#23A6F0] transition">Blog</Link>
            <Link to="/contact" className="hover:text-[#23A6F0] transition">Contact</Link>
            <Link to="/team" className="hover:text-[#23A6F0] transition">Team</Link>
          </nav>
        </div>

        {/* Sağ Alan */}
        <div className="flex items-center gap-5 text-sm font-bold text-[#23A6F0]">
          {user ? (
            <div className="flex items-center gap-3">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name || "User"}
                  className="w-8 h-8 rounded-full border border-[#23A6F0] object-cover"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-[#23A6F0] text-white flex items-center justify-center font-bold">
                  {(user.name || user.email || "U")[0].toUpperCase()}
                </div>
              )}
              <span className="hidden sm:inline text-[#252B42] font-semibold">
                {user.name || user.email}
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 text-red-500 hover:text-red-700 transition cursor-pointer"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <UserIcon className="w-4 h-4" />
              <Link to="/login" className="hover:underline">Login</Link>
              <span>/</span>
              <Link to="/signup" className="hover:underline">Register</Link>
            </div>
          )}

          <div className="hidden sm:flex items-center gap-4">
            <button className="hover:opacity-80 transition cursor-pointer"><Search className="w-4 h-4" /></button>
            <Link to="#" className="flex items-center gap-1 hover:opacity-80 transition">
              <ShoppingCart className="w-4 h-4" />
              <span className="text-xs">1</span>
            </Link>
            <Link to="#" className="flex items-center gap-1 hover:opacity-80 transition">
              <Heart className="w-4 h-4" />
              <span className="text-xs">1</span>
            </Link>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-[#252B42] focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobil Açılır Menü */}
      {mobileMenuOpen && (
        <div className="md:hidden flex flex-col items-center gap-5 py-8 bg-white border-t border-gray-100 text-lg font-bold text-[#737373]">
          <Link to="/" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#23A6F0]">Home</Link>
          <Link to="/shop" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#23A6F0]">Shop</Link>
          <Link to="#" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#23A6F0]">About</Link>
          <Link to="#" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#23A6F0]">Blog</Link>
          <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#23A6F0]">Contact</Link>
          <Link to="/team" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#23A6F0]">Team</Link>
        </div>
      )}
    </header>
  );
}
