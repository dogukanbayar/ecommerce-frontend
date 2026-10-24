import React, { useState, useEffect, useRef } from "react";
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
  Mail,
  Trash2,
  Package,
  Loader2,
} from "lucide-react";
import { setUser } from "../store/actions/clientActions";
import { fetchCategoriesThunk } from "../store/actions/productActions";
import { removeFromCart } from "../store/actions/shoppingCartActions";
import { api } from "../api/api";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [shopDropdownOpen, setShopDropdownOpen] = useState(false);
  const [cartDropdownOpen, setCartDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  // Canlı arama durumları
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const searchInputRef = useRef(null);
  const searchContainerRef = useRef(null);

  const user = useSelector((state) => state.client.user);
  const categories = useSelector((state) => state.product.categories);
  const cart = useSelector((state) => state.shoppingCart.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchCategoriesThunk());
  }, [dispatch]);

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  // Dışarı tıklandığında arama kutusunu kapatma
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(e.target)
      ) {
        setSearchOpen(false);
        setSearchResults([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Canlı Arama Debounce İsteği
  useEffect(() => {
    if (!searchQuery.trim() || searchQuery.trim().length < 2) {
      setSearchResults([]);
      setSearchLoading(false);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        setSearchLoading(true);
        const res = await api.get(`/products?filter=${encodeURIComponent(searchQuery.trim())}&limit=5`);
        const list = res.data?.products || (Array.isArray(res.data) ? res.data : []);
        setSearchResults(list);
      } catch (err) {
        console.error("Live search error:", err);
      } finally {
        setSearchLoading(false);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?filter=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
      setSearchResults([]);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    delete api.defaults.headers.common["Authorization"];
    dispatch(setUser(null));
    setUserDropdownOpen(false);
    navigate("/login");
  };

  const slugify = (text) => {
    const trMap = { ç: "c", ğ: "g", ı: "i", ö: "o", ş: "s", ü: "u", Ç: "c", Ğ: "g", İ: "i", Ö: "o", Ş: "s", Ü: "u" };
    return (text || "")
      .replace(/[çğıöşüÇĞİÖŞÜ]/g, (m) => trMap[m])
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9 -]/g, "")
      .replace(/\s+/g, "-");
  };

  const kadinCategories = categories.filter((c) => c.gender === "k");
  const erkekCategories = categories.filter((c) => c.gender === "e");

  const totalItemCount = cart.reduce((acc, item) => acc + item.count, 0);
  const totalPrice = cart.reduce(
    (acc, item) => acc + Number(item.product.price) * item.count,
    0
  );

  return (
    <header className="flex flex-col w-full bg-white sticky top-0 z-50 font-sans">
      {/* Top Bar (#23856D) */}
      <div className="hidden lg:flex bg-[#23856D] text-white text-xs font-bold py-3.5 px-8 justify-between items-center">
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
          <div className="flex items-center gap-3">
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
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between border-b border-gray-100">
        <div className="flex items-center gap-14">
          <Link to="/" className="text-2xl font-black text-[#252B42] tracking-tight">
            Bandage
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm font-bold text-[#737373]">
            <Link to="/" className="hover:text-[#23A6F0] transition">Home</Link>

            <div
              className="relative py-2"
              onMouseEnter={() => setShopDropdownOpen(true)}
              onMouseLeave={() => setShopDropdownOpen(false)}
            >
              <Link
                to="/shop"
                className="hover:text-[#23A6F0] transition flex items-center gap-1 text-[#252B42]"
              >
                Shop <ChevronDown className="w-3.5 h-3.5" />
              </Link>

              {shopDropdownOpen && (
                <div className="absolute top-full -left-6 w-80 bg-white border border-gray-100 rounded-sm shadow-2xl p-6 grid grid-cols-2 gap-8 z-50">
                  <div className="flex flex-col gap-3">
                    <h4 className="font-extrabold text-[#252B42] text-sm tracking-tight">Kadın</h4>
                    <div className="flex flex-col gap-2.5 max-h-64 overflow-y-auto pr-1">
                      {kadinCategories.map((c) => (
                        <Link
                          key={c.id}
                          to={`/shop/kadin/${slugify(c.title)}/${c.id}`}
                          onClick={() => setShopDropdownOpen(false)}
                          className="text-xs text-[#737373] hover:text-[#23A6F0] transition font-normal"
                        >
                          {c.title}
                        </Link>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <h4 className="font-extrabold text-[#252B42] text-sm tracking-tight">Erkek</h4>
                    <div className="flex flex-col gap-2.5 max-h-64 overflow-y-auto pr-1">
                      {erkekCategories.map((c) => (
                        <Link
                          key={c.id}
                          to={`/shop/erkek/${slugify(c.title)}/${c.id}`}
                          onClick={() => setShopDropdownOpen(false)}
                          className="text-xs text-[#737373] hover:text-[#23A6F0] transition font-normal"
                        >
                          {c.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link to="/about" className="hover:text-[#23A6F0] transition">About</Link>
            <Link to="/blog" className="hover:text-[#23A6F0] transition">Blog</Link>
            <Link to="/contact" className="hover:text-[#23A6F0] transition">Contact</Link>
            <Link to="/team" className="hover:text-[#23A6F0] transition">Pages</Link>
          </nav>
        </div>

        {/* Sağ Alan */}
        <div className="flex items-center gap-5 text-sm font-bold text-[#23A6F0]">
          {user ? (
            <div
              className="relative py-2"
              onMouseEnter={() => setUserDropdownOpen(true)}
              onMouseLeave={() => setUserDropdownOpen(false)}
            >
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 cursor-pointer focus:outline-none"
              >
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
                <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
              </button>

              {userDropdownOpen && (
                <div className="absolute right-0 top-full w-52 bg-white border border-gray-100 rounded-md shadow-xl py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <span className="text-[11px] text-gray-400 block font-normal">Hesap</span>
                    <span className="text-xs font-bold text-[#252B42] truncate block">
                      {user.email}
                    </span>
                  </div>

                  <Link
                    to="/previous-orders"
                    onClick={() => setUserDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-bold text-[#252B42] hover:bg-gray-50 hover:text-[#23A6F0] transition"
                  >
                    <Package className="w-4 h-4 text-[#F27A1A]" />
                    <span>Siparişlerim</span>
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs font-bold text-red-600 hover:bg-red-50 transition text-left cursor-pointer border-t border-gray-50 mt-1"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Çıkış Yap</span>
                  </button>
                </div>
              )}
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
            {/* CANLI ARAMA ALANI (AUTOCOMPLETE DROPDOWN) */}
            <div ref={searchContainerRef} className="relative flex items-center">
              {searchOpen ? (
                <div className="relative">
                  <form
                    onSubmit={handleSearchSubmit}
                    className="flex items-center bg-gray-50 border border-[#23A6F0] rounded-full px-3 py-1.5 text-xs shadow-xs animate-in fade-in zoom-in-95 duration-150"
                  >
                    <input
                      ref={searchInputRef}
                      type="text"
                      placeholder="Ürün adı yazın..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="bg-transparent border-none text-[#252B42] focus:outline-none w-44 sm:w-60 text-xs"
                    />

                    {searchLoading ? (
                      <Loader2 className="w-3.5 h-3.5 text-[#23A6F0] animate-spin ml-1" />
                    ) : (
                      <button type="submit" className="text-[#23A6F0] hover:opacity-80 p-0.5 cursor-pointer ml-1">
                        <Search className="w-3.5 h-3.5" />
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => {
                        setSearchOpen(false);
                        setSearchQuery("");
                        setSearchResults([]);
                      }}
                      className="text-gray-400 hover:text-gray-600 ml-1.5 p-0.5 cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </form>

                  {/* Canlı Sonuç Dropdown Menüsü */}
                  {searchQuery.trim().length >= 2 && (
                    <div className="absolute right-0 top-full mt-2 w-72 sm:w-80 bg-white border border-gray-100 rounded-md shadow-2xl overflow-hidden z-50 text-[#252B42]">
                      {searchLoading && searchResults.length === 0 ? (
                        <div className="p-4 text-center text-xs text-gray-400 flex items-center justify-center gap-2">
                          <Loader2 className="w-3.5 h-3.5 animate-spin text-[#23A6F0]" />
                          Aranıyor...
                        </div>
                      ) : searchResults.length === 0 ? (
                        <div className="p-4 text-center text-xs text-gray-400">
                          "{searchQuery}" ile eşleşen ürün bulunamadı.
                        </div>
                      ) : (
                        <div className="divide-y divide-gray-50 max-h-72 overflow-y-auto">
                          {searchResults.map((prod) => (
                            <Link
                              key={prod.id}
                              to={`/product/${prod.id}`}
                              onClick={() => {
                                setSearchOpen(false);
                                setSearchQuery("");
                                setSearchResults([]);
                              }}
                              className="p-3 flex items-center gap-3 hover:bg-gray-50 transition"
                            >
                              <img
                                src={prod.images?.[0]?.url || prod.image || "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=100&q=80"}
                                alt={prod.name}
                                className="w-11 h-11 object-contain rounded border border-gray-100 flex-shrink-0 bg-[#F9F9F9]"
                              />
                              <div className="flex-1 min-w-0">
                                <h5 className="font-bold text-xs truncate text-[#252B42]">
                                  {prod.name}
                                </h5>
                                <span className="text-[11px] font-extrabold text-[#23856D]">
                                  ${Number(prod.price).toFixed(2)}
                                </span>
                              </div>
                            </Link>
                          ))}

                          <button
                            type="button"
                            onClick={handleSearchSubmit}
                            className="w-full p-2.5 bg-gray-50 hover:bg-gray-100 text-[#23A6F0] font-bold text-xs text-center transition block cursor-pointer"
                          >
                            Tüm sonuçları gör ({searchResults.length}+) &gt;
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setSearchOpen(true)}
                  className="hover:opacity-80 transition cursor-pointer text-[#23A6F0] p-1"
                  title="Ürün Ara"
                >
                  <Search className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Sepet Dropdown */}
            <div
              className="relative py-2"
              onMouseEnter={() => setCartDropdownOpen(true)}
              onMouseLeave={() => setCartDropdownOpen(false)}
            >
              <button
                onClick={() => setCartDropdownOpen(!cartDropdownOpen)}
                className="flex items-center gap-1.5 hover:opacity-80 transition cursor-pointer text-[#23A6F0]"
              >
                <ShoppingCart className="w-4 h-4" />
                <span className="text-xs bg-[#23A6F0] text-white rounded-full px-1.5 py-0.2">
                  {totalItemCount}
                </span>
              </button>

              {cartDropdownOpen && (
                <div className="absolute right-0 top-full w-80 sm:w-96 bg-white border border-gray-100 rounded-md shadow-2xl p-5 z-50 text-[#252B42]">
                  <h4 className="font-extrabold text-sm pb-3 border-b border-gray-100 flex items-center justify-between">
                    <span>Sepetim ({totalItemCount} Ürün)</span>
                    <span className="text-xs font-bold text-[#23856D]">${totalPrice.toFixed(2)}</span>
                  </h4>

                  {cart.length === 0 ? (
                    <div className="py-8 text-center text-gray-400 text-xs">
                      Sepetinizde henüz ürün bulunmamaktadır.
                    </div>
                  ) : (
                    <>
                      <div className="flex flex-col gap-3 py-3 max-h-64 overflow-y-auto">
                        {cart.map((item) => (
                          <div
                            key={item.product.id}
                            className="flex items-center gap-3 border-b border-gray-50 pb-2.5"
                          >
                            <img
                              src={
                                item.product.images?.[0]?.url ||
                                item.product.image ||
                                "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=200&q=80"
                              }
                              alt={item.product.name}
                              className="w-14 h-14 object-cover rounded-xs border border-gray-100 flex-shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                              <h5 className="font-bold text-xs truncate">{item.product.name}</h5>
                              <p className="text-[11px] text-gray-400 mt-0.5">
                                Adet: {item.count}
                              </p>
                              <span className="text-xs font-extrabold text-[#23856D]">
                                ${(Number(item.product.price) * item.count).toFixed(2)}
                              </span>
                            </div>
                            <button
                              onClick={() => dispatch(removeFromCart(item.product.id))}
                              className="text-gray-300 hover:text-red-500 transition p-1 cursor-pointer"
                              title="Sil"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>

                      <div className="pt-3 grid grid-cols-2 gap-3">
                        <Link
                          to="/cart"
                          onClick={() => setCartDropdownOpen(false)}
                          className="py-2.5 px-3 border border-gray-200 text-center text-xs font-bold rounded-sm text-[#737373] hover:bg-gray-50 transition"
                        >
                          Sepete Git
                        </Link>
                        <Link
                          to="/order"
                          onClick={() => setCartDropdownOpen(false)}
                          className="py-2.5 px-3 bg-[#E77C40] hover:bg-[#d66b2f] text-white text-center text-xs font-bold rounded-sm transition shadow-xs block"
                        >
                          Siparişi Tamamla
                        </Link>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>

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

      {mobileMenuOpen && (
        <div className="md:hidden flex flex-col items-center gap-5 py-8 bg-white border-t border-gray-100 text-lg font-bold text-[#737373]">
          <Link to="/" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#23A6F0]">Home</Link>
          <Link to="/shop" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#23A6F0]">Shop</Link>
          <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#23A6F0]">About</Link>
          <Link to="/blog" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#23A6F0]">Blog</Link>
          <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#23A6F0]">Contact</Link>
          <Link to="/team" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#23A6F0]">Pages</Link>
          {user && (
            <Link to="/previous-orders" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#F27A1A]">
              Siparişlerim
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
