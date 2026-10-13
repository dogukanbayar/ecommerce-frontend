import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
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
} from "lucide-react";
import ProductCard from "../components/ProductCard";

// Figma'daki 5 kategori
const defaultCategories = [
  { id: 1, title: "CLOTHS", items: "5 Items", img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80" },
  { id: 2, title: "CLOTHS", items: "5 Items", img: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=600&q=80" },
  { id: 3, title: "CLOTHS", items: "5 Items", img: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&q=80" },
  { id: 4, title: "CLOTHS", items: "5 Items", img: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&q=80" },
  { id: 5, title: "CLOTHS", items: "5 Items", img: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&q=80" },
];

export default function ShopPage() {
  const { categoryId, categoryName } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { categories, productList, total, fetchState } = useSelector(
    (state) => state.product
  );

  const [sortOption, setSortOption] = useState("Popularity");
  const [viewMode, setViewMode] = useState("grid");
  const [currentPage, setCurrentPage] = useState(2);

  useEffect(() => {
    dispatch(fetchCategoriesThunk());
  }, [dispatch]);

  useEffect(() => {
    const params = {};
    if (categoryId) params.category = categoryId;
    if (sortOption && sortOption !== "Popularity") params.sort = sortOption;

    dispatch(fetchProductsThunk(params));
  }, [dispatch, categoryId, sortOption]);

  const handleCategorySelect = (cat) => {
    const genderSlug = cat.gender === "k" ? "kadin" : "erkek";
    const titleSlug = (cat.title || "kategori").toLowerCase().replace(/\s+/g, "-");
    navigate(`/shop/${genderSlug}/${titleSlug}/${cat.id}`);
  };

  const displayCategories = categories.length >= 5 ? categories.slice(0, 5) : defaultCategories;

  return (
    <div className="bg-[#FAFAFA] min-h-screen py-8 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Üst Başlık & Breadcrumb */}
        <div className="flex flex-col sm:flex-row items-center justify-between pb-8 gap-4">
          <h2 className="text-2xl font-bold text-[#252B42]">Shop</h2>
          <nav className="flex items-center gap-2 text-sm font-bold">
            <Link to="/" className="text-[#252B42] hover:text-[#23A6F0]">Home</Link>
            <ChevronRight className="w-4 h-4 text-[#BDBDBD]" />
            <span className="text-[#BDBDBD]">Shop</span>
            {categoryName && (
              <>
                <ChevronRight className="w-4 h-4 text-[#BDBDBD]" />
                <span className="text-[#23A6F0] capitalize">{categoryName}</span>
              </>
            )}
          </nav>
        </div>

        {/* 5'li Kategori Vitrini */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-12">
          {displayCategories.map((cat, index) => (
            <div
              key={cat.id || index}
              onClick={() => handleCategorySelect(cat)}
              className="relative aspect-[4/5] rounded-none overflow-hidden cursor-pointer group shadow-sm hover:opacity-95 transition"
            >
              <img
                src={cat.img || defaultCategories[index % 5].img}
                alt={cat.title || "Category"}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
              <div className="absolute inset-0 bg-black/25 flex flex-col items-center justify-center text-white text-center p-3">
                <h3 className="font-bold text-base tracking-wider uppercase">
                  {cat.title || "CLOTHS"}
                </h3>
                <span className="text-sm font-normal text-slate-100 mt-1">
                  5 Items
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Filtre ve Kontrol Barı */}
        <div className="bg-white px-6 py-6 border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          <div className="text-sm font-bold text-[#737373]">
            Showing all {productList.length > 0 ? productList.length : 12} results
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

          <div className="flex items-center gap-3 w-full md:w-auto">
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="py-2.5 px-4 bg-[#F9F9F9] border border-[#DDDDDD] rounded-sm text-sm font-normal text-[#737373] focus:outline-none focus:border-[#23A6F0]"
            >
              <option value="Popularity">Popularity</option>
              <option value="price:asc">Price: Low to High</option>
              <option value="price:desc">Price: High to Low</option>
              <option value="rating:desc">Rating: High to Low</option>
            </select>

            <button
              type="button"
              className="py-2.5 px-6 bg-[#23A6F0] hover:bg-[#1a8cd8] text-white text-sm font-bold rounded-sm transition cursor-pointer"
            >
              Filter
            </button>
          </div>
        </div>

        {/* 12'li Ürün Grid */}
        {fetchState === "FETCHING" ? (
          <div className="min-h-[40vh] flex items-center justify-center">
            <Loader2 className="w-8 h-8 text-[#23A6F0] animate-spin" />
          </div>
        ) : (
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-16"
                : "flex flex-col gap-6 mb-16"
            }
          >
            {(productList.length > 0 ? productList : Array(12).fill({})).map((prod, idx) => (
              <ProductCard
                key={prod.id || idx}
                product={{
                  id: prod.id || idx + 1,
                  name: prod.name || "Graphic Design",
                  department: prod.department || "English Department",
                  price: prod.price || 6.48,
                  images: prod.images || [
                    {
                      url: [
                        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&q=80",
                        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&q=80",
                        "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&q=80",
                        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
                        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=80",
                        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&q=80",
                        "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=600&q=80",
                        "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=600&q=80",
                        "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&q=80",
                        "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=600&q=80",
                        "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=600&q=80",
                        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&q=80",
                      ][idx % 12],
                    },
                  ],
                }}
              />
            ))}
          </div>
        )}

        {/* Sayfalama (Pagination) */}
        <div className="flex justify-center items-center mb-16">
          <div className="inline-flex rounded-sm border border-[#BDBDBD] bg-white overflow-hidden text-sm font-bold shadow-xs">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="px-6 py-4 border-r border-[#BDBDBD] text-[#23A6F0] hover:bg-gray-50 transition cursor-pointer"
            >
              First
            </button>
            <button
              onClick={() => setCurrentPage(1)}
              className={`px-5 py-4 border-r border-[#BDBDBD] transition cursor-pointer ${
                currentPage === 1 ? "bg-[#23A6F0] text-white" : "text-[#23A6F0] hover:bg-gray-50"
              }`}
            >
              1
            </button>
            <button
              onClick={() => setCurrentPage(2)}
              className={`px-5 py-4 border-r border-[#BDBDBD] transition cursor-pointer ${
                currentPage === 2 ? "bg-[#23A6F0] text-white" : "text-[#23A6F0] hover:bg-gray-50"
              }`}
            >
              2
            </button>
            <button
              onClick={() => setCurrentPage(3)}
              className={`px-5 py-4 border-r border-[#BDBDBD] transition cursor-pointer ${
                currentPage === 3 ? "bg-[#23A6F0] text-white" : "text-[#23A6F0] hover:bg-gray-50"
              }`}
            >
              3
            </button>
            <button
              onClick={() => setCurrentPage((p) => p + 1)}
              className="px-6 py-4 text-[#23A6F0] hover:bg-gray-50 transition cursor-pointer"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Figma Orijinal Marka Logoları Bandı */}
      <section className="bg-[#FAFAFA] py-14 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-12 items-center justify-items-center text-[#737373]">
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
    </div>
  );
}
