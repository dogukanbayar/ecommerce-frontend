import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchCategoriesThunk,
  fetchProductsThunk,
} from "../store/actions/productActions";
import {
  Search,
  SlidersHorizontal,
  ChevronRight,
  LayoutGrid,
  List,
  Loader2,
  Star
} from "lucide-react";

export default function ShopPage() {
  const { categoryId, gender, categoryName } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { categories, productList, total, fetchState } = useSelector(
    (state) => state.product
  );

  // Filtreleme State'leri
  const [filterText, setFilterText] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [viewMode, setViewMode] = useState("grid"); // grid | list

  // 1. Kategorileri ilk yüklemede çek
  useEffect(() => {
    dispatch(fetchCategoriesThunk());
  }, [dispatch]);

  // 2. Kategori, Sıralama veya Filtre Değiştiğinde İstek At (T14 Kriteri)
  useEffect(() => {
    const params = {};
    if (categoryId) params.category = categoryId;
    if (sortOption) params.sort = sortOption;
    if (filterText) params.filter = filterText;

    dispatch(fetchProductsThunk(params));
  }, [dispatch, categoryId, sortOption]);

  // Filtre inputunda butona basıldığında tetikleme
  const handleFilterSubmit = (e) => {
    e.preventDefault();
    const params = {};
    if (categoryId) params.category = categoryId;
    if (sortOption) params.sort = sortOption;
    if (filterText) params.filter = filterText;

    dispatch(fetchProductsThunk(params));
  };

  // Kategori seçilince URL değiştir (shop/:gender/:categoryName/:categoryId)
  const handleCategorySelect = (cat) => {
    const genderSlug = cat.gender === "k" ? "kadin" : "erkek";
    const titleSlug = cat.title.toLowerCase().replace(/\s+/g, "-");
    navigate(`/shop/${genderSlug}/${titleSlug}/${cat.id}`);
  };

  // En popüler 5 kategoriyi al (Figma tasarımı üst kartlar)
  const topCategories = categories
    .slice()
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 5);

  return (
    <div className="bg-[#FAFAFA] min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Üst Bar: Başlık & Breadcrumb */}
        <div className="flex flex-col sm:flex-row items-center justify-between pb-6 border-b border-gray-200 gap-4">
          <h1 className="text-2xl font-black text-[#252B42]">Shop</h1>
          <nav className="flex items-center gap-2 text-xs sm:text-sm font-bold text-gray-400">
            <Link to="/" className="text-[#252B42] hover:text-[#23A6F0]">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-400">Shop</span>
            {categoryName && (
              <>
                <ChevronRight className="w-4 h-4" />
                <span className="text-[#23A6F0] capitalize">{categoryName}</span>
              </>
            )}
          </nav>
        </div>

        {/* Kategori Kartları (Figma Banner Grubu) */}
        {topCategories.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 my-8">
            {topCategories.map((cat) => (
              <div
                key={cat.id}
                onClick={() => handleCategorySelect(cat)}
                className="relative aspect-4/3 rounded-xl overflow-hidden cursor-pointer group shadow-sm hover:shadow-md transition"
              >
                <img
                  src={cat.img || "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500&q=80"}
                  alt={cat.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
                <div className="absolute inset-0 bg-black/35 group-hover:bg-black/45 transition flex flex-col items-center justify-center text-white text-center p-3">
                  <h3 className="font-extrabold text-base tracking-tight">{cat.title}</h3>
                  <p className="text-xs font-medium text-slate-200 mt-1">
                    {cat.gender === "k" ? "Kadın" : "Erkek"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Filtre ve Kontrol Barı (Figma Toolbar) */}
        <div className="bg-white p-4 sm:p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4 my-6">
          <div className="text-xs sm:text-sm font-bold text-gray-500">
            Showing all <span className="text-[#252B42]">{productList.length}</span> of{" "}
            <span className="text-[#252B42]">{total}</span> results
          </div>

          {/* Orta Kısım: Görünüm Butonları */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-gray-500 mr-2">Views:</span>
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-lg border ${
                viewMode === "grid"
                  ? "border-[#23A6F0] text-[#23A6F0] bg-sky-50"
                  : "border-gray-200 text-gray-500 hover:bg-gray-50"
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-lg border ${
                viewMode === "list"
                  ? "border-[#23A6F0] text-[#23A6F0] bg-sky-50"
                  : "border-gray-200 text-gray-500 hover:bg-gray-50"
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          {/* Sağ Kısım: Arama & Sıralama (T14 Gereksinimi) */}
          <form onSubmit={handleFilterSubmit} className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
            {/* Filter Input */}
            <div className="relative flex-1 sm:w-48">
              <input
                type="text"
                placeholder="Search products..."
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
                className="w-full pl-8 pr-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-xs focus:bg-white focus:outline-none focus:border-[#23A6F0] transition"
              />
              <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            </div>

            {/* Sort Dropdown */}
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="py-2 px-3 bg-gray-50 border border-gray-300 rounded-lg text-xs font-medium text-gray-700 focus:bg-white focus:outline-none focus:border-[#23A6F0] transition"
            >
              <option value="">Sort by...</option>
              <option value="price:asc">Price: Low to High</option>
              <option value="price:desc">Price: High to Low</option>
              <option value="rating:asc">Rating: Low to High</option>
              <option value="rating:desc">Rating: High to Low</option>
            </select>

            {/* Filter Button */}
            <button
              type="submit"
              className="py-2 px-4 bg-[#23A6F0] hover:bg-[#1a8cd8] text-white text-xs font-bold rounded-lg transition shadow-sm cursor-pointer"
            >
              Filter
            </button>
          </form>
        </div>

        {/* Ürün Listesi Grid / List */}
        {fetchState === "FETCHING" ? (
          <div className="min-h-[40vh] flex items-center justify-center">
            <Loader2 className="w-8 h-8 text-[#23A6F0] animate-spin" />
          </div>
        ) : productList.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center my-8">
            <p className="text-gray-500 font-medium text-sm">No products found matching your filters.</p>
            <Link
              to="/shop"
              onClick={() => {
                setFilterText("");
                setSortOption("");
              }}
              className="mt-3 inline-block text-xs font-bold text-[#23A6F0] hover:underline"
            >
              Clear all filters
            </Link>
          </div>
        ) : (
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-8"
                : "flex flex-col gap-4 my-8"
            }
          >
            {productList.map((prod) => {
              const image =
                prod.images && prod.images.length > 0
                  ? typeof prod.images[0] === "string"
                    ? prod.images[0]
                    : prod.images[0].url
                  : "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80";

              return (
                <Link
                  key={prod.id}
                  to={`/product/${prod.id}`}
                  className={
                    viewMode === "grid"
                      ? "bg-white rounded-xl overflow-hidden border border-gray-100 shadow-xs hover:shadow-md transition flex flex-col group"
                      : "bg-white rounded-xl overflow-hidden border border-gray-100 shadow-xs hover:shadow-md transition flex flex-col sm:flex-row group p-4 gap-6"
                  }
                >
                  <div
                    className={
                      viewMode === "grid"
                        ? "aspect-3/4 w-full bg-gray-100 overflow-hidden"
                        : "w-full sm:w-48 aspect-square bg-gray-100 rounded-lg overflow-hidden shrink-0"
                    }
                  >
                    <img
                      src={image}
                      alt={prod.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                  </div>

                  <div className="p-4 flex flex-col flex-grow justify-between text-center sm:text-left">
                    <div>
                      <h4 className="font-bold text-sm text-[#252B42] line-clamp-1 group-hover:text-[#23A6F0] transition">
                        {prod.name}
                      </h4>
                      <p className="text-xs text-gray-400 mt-1 line-clamp-2">
                        {prod.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-gray-50 flex items-center justify-between">
                      <div className="flex text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${i < Math.floor(prod.rating || 4) ? "fill-current" : "text-gray-300"}`}
                          />
                        ))}
                      </div>
                      <span className="font-bold text-sm text-[#252B42]">
                        ${Number(prod.price).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
