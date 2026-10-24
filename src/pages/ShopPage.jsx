import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchCategoriesThunk,
  fetchProductsThunk,
} from "../store/actions/productActions";
import {
  ChevronRight,
  LayoutGrid,
  Menu,
  Loader2,
  PackageX,
  X,
} from "lucide-react";
import ProductCard from "../components/ProductCard";
import Clients from "../components/Clients";

export default function ShopPage() {
  const { categoryId, categoryName, gender } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // URL'deki query parametrelerini oku (?filter=tisort gibi)
  const searchParams = new URLSearchParams(location.search);
  const urlFilter = searchParams.get("filter") || "";

  const { categories, productList, total, fetchState } = useSelector(
    (state) => state.product
  );

  const [sortOption, setSortOption] = useState("Popularity");
  const [filterInput, setFilterInput] = useState(urlFilter);
  const [viewMode, setViewMode] = useState("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 25;

  const slugify = (text) => {
    const trMap = { ç: "c", ğ: "g", ı: "i", ö: "o", ş: "s", ü: "u", Ç: "c", Ğ: "g", İ: "i", Ö: "o", Ş: "s", Ü: "u" };
    return (text || "")
      .replace(/[çğıöşüÇĞİÖŞÜ]/g, (m) => trMap[m])
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9 -]/g, "")
      .replace(/\s+/g, "-");
  };

  useEffect(() => {
    dispatch(fetchCategoriesThunk());
  }, [dispatch]);

  // URL'den filter parametresi değiştiğinde input'u güncelle
  useEffect(() => {
    setFilterInput(urlFilter);
  }, [urlFilter]);

  useEffect(() => {
    const offset = (currentPage - 1) * limit;
    const params = {
      limit,
      offset,
    };

    if (categoryId) {
      params.category = categoryId;
    }
    if (sortOption && sortOption !== "Popularity") {
      params.sort = sortOption;
    }
    if (urlFilter) {
      params.filter = urlFilter;
    }

    dispatch(fetchProductsThunk(params));
    window.scrollTo({ top: 300, behavior: "smooth" });
  }, [dispatch, categoryId, sortOption, currentPage, urlFilter]);

  const handleCategorySelect = (cat) => {
    const genderSlug = cat.gender === "k" ? "kadin" : "erkek";
    const titleSlug = slugify(cat.title);
    setCurrentPage(1);
    navigate(`/shop/${genderSlug}/${titleSlug}/${cat.id}`);
  };

  const handleFilterSubmit = (e) => {
    if (e) e.preventDefault();
    setCurrentPage(1);
    const newQuery = filterInput.trim() ? `?filter=${encodeURIComponent(filterInput.trim())}` : "";
    navigate(`/shop${newQuery}`);
  };

  const handleClearFilter = () => {
    setFilterInput("");
    navigate("/shop");
  };

  const topCategories = categories
    .slice()
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, 5);

  const totalPages = Math.max(1, Math.ceil((total || 0) / limit));

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="bg-white min-h-screen font-sans">
      {/* 1. ÜST ALAN: Gri Zeminli Shop Başlığı ve 5 Kategori Kartı */}
      <section className="bg-[#FAFAFA] py-8 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between pb-8 gap-4">
            <h2 className="text-2xl font-bold text-[#252B42]">
              {urlFilter ? `Arama Sonuçları: "${urlFilter}"` : "Shop"}
            </h2>
            <nav className="flex items-center gap-2 text-sm font-bold">
              <Link to="/" className="text-[#252B42] hover:text-[#23A6F0]">Home</Link>
              <ChevronRight className="w-4 h-4 text-[#BDBDBD]" />
              <Link to="/shop" className="text-[#737373] hover:text-[#23A6F0]">Shop</Link>
              {categoryName && (
                <>
                  <ChevronRight className="w-4 h-4 text-[#BDBDBD]" />
                  <span className="text-[#23A6F0] capitalize">{categoryName}</span>
                </>
              )}
            </nav>
          </div>

          {/* 5 Kategori Kartı */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {topCategories.map((cat) => (
              <div
                key={cat.id}
                onClick={() => handleCategorySelect(cat)}
                className="relative aspect-[4/5] overflow-hidden cursor-pointer group shadow-xs hover:opacity-95 transition"
              >
                <img
                  src={cat.img || "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500&q=80"}
                  alt={cat.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500 brightness-90"
                />
                <div className="absolute inset-0 bg-black/25 flex flex-col items-center justify-center text-white text-center p-3">
                  <h3 className="font-extrabold text-base tracking-wider uppercase">
                    {cat.title}
                  </h3>
                  <span className="text-sm font-semibold text-white/90 mt-1">
                    5 Items
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. MAĞAZA VE TOOLBAR ALANI */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white py-4 flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          <div className="text-sm font-bold text-[#737373]">
            Showing all <span className="text-[#252B42]">{productList.length}</span> of{" "}
            <span className="text-[#252B42]">{total}</span> results
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm font-bold text-[#737373]">Views:</span>
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2.5 rounded-sm border ${
                viewMode === "grid"
                  ? "border-[#252B42] text-[#252B42]"
                  : "border-gray-200 text-[#737373] hover:border-gray-400"
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2.5 rounded-sm border ${
                viewMode === "list"
                  ? "border-[#252B42] text-[#252B42]"
                  : "border-gray-200 text-[#737373] hover:border-gray-400"
              }`}
            >
              <Menu className="w-4 h-4" />
            </button>
          </div>

          {/* Filtre ve Arama Alanı */}
          <form onSubmit={handleFilterSubmit} className="flex items-center gap-3 w-full md:w-auto">
            <input
              type="text"
              placeholder="Ürün filtrele..."
              value={filterInput}
              onChange={(e) => setFilterInput(e.target.value)}
              className="py-2 px-3 bg-[#F9F9F9] border border-[#DDDDDD] rounded-sm text-xs text-[#252B42] focus:outline-none focus:border-[#23A6F0]"
            />

            <select
              value={sortOption}
              onChange={(e) => {
                setSortOption(e.target.value);
                setCurrentPage(1);
              }}
              className="py-2 px-3 bg-[#F9F9F9] border border-[#DDDDDD] rounded-sm text-xs font-normal text-[#737373] focus:outline-none focus:border-[#23A6F0] cursor-pointer"
            >
              <option value="Popularity">Popularity</option>
              <option value="price:asc">Price: Low to High</option>
              <option value="price:desc">Price: High to Low</option>
              <option value="rating:desc">Rating: High to Low</option>
            </select>

            <button
              type="submit"
              className="py-2 px-5 bg-[#23A6F0] hover:bg-[#1a8cd8] text-white font-bold text-xs rounded-sm transition cursor-pointer"
            >
              Filter
            </button>

            {urlFilter && (
              <button
                type="button"
                onClick={handleClearFilter}
                className="p-2 text-gray-400 hover:text-red-500 transition cursor-pointer"
                title="Filtreyi Temizle"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </form>
        </div>

        {/* Ürün Listesi */}
        {fetchState === "FETCHING" ? (
          <div className="min-h-[50vh] flex flex-col items-center justify-center gap-4">
            <Loader2 className="w-12 h-12 text-[#23A6F0] animate-spin" />
            <span className="text-sm font-bold text-[#737373]">Ürünler yükleniyor...</span>
          </div>
        ) : productList.length === 0 ? (
          <div className="bg-[#FAFAFA] rounded-lg border border-gray-100 p-16 text-center my-8 shadow-xs flex flex-col items-center">
            <PackageX className="w-16 h-16 text-gray-300 mb-4" />
            <h3 className="text-[#252B42] font-black text-xl mb-2">Aradığınız Ürün Bulunamadı</h3>
            <p className="text-gray-400 text-xs mb-6 max-w-md">
              Arama kriterlerinize uygun ürün bulunamadı. Lütfen farklı bir arama terimi deneyin.
            </p>
            <button
              onClick={handleClearFilter}
              className="px-6 py-2.5 bg-[#23A6F0] text-white text-xs font-bold rounded-sm hover:bg-[#1a8cd8] transition cursor-pointer"
            >
              Tüm Ürünleri Gör
            </button>
          </div>
        ) : (
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-16"
                : "flex flex-col gap-6 mb-16"
            }
          >
            {productList.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        )}

        {/* Sayfalama */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center mb-16">
            <div className="inline-flex rounded-sm border border-[#BDBDBD] bg-white overflow-hidden text-sm font-bold shadow-xs">
              <button
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
                className="px-6 py-4 border-r border-[#BDBDBD] text-[#23A6F0] hover:bg-gray-50 transition disabled:text-gray-300 disabled:cursor-not-allowed cursor-pointer"
              >
                First
              </button>

              {getPageNumbers().map((num) => (
                <button
                  key={num}
                  onClick={() => setCurrentPage(num)}
                  className={`px-5 py-4 border-r border-[#BDBDBD] transition cursor-pointer ${
                    currentPage === num
                      ? "bg-[#23A6F0] text-white"
                      : "text-[#23A6F0] hover:bg-gray-50"
                  }`}
                >
                  {num}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-6 py-4 text-[#23A6F0] hover:bg-gray-50 transition disabled:text-gray-300 disabled:cursor-not-allowed cursor-pointer"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Orijinal Figma Logoları */}
      <Clients />
    </div>
  );
}
